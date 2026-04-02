'use client';

import { useState } from 'react';
import { ArrowRight, ArrowLeft, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { ResumeData, Education, Experience, Volunteer } from '@/types/resume';

interface Screen4Props {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  onNext: () => void;
  onBack: () => void;
}

const SKILLS_SUGGESTIONS = [
  'Communication', 'Teamwork', 'Time Management', 'Problem Solving',
  'Customer Service', 'Microsoft Office', 'Google Workspace', 'Cash Handling',
  'Leadership', 'Adaptability', 'Social Media', 'Data Entry', 'Typing',
  'Organization', 'Critical Thinking', 'Multitasking', 'CPR Certified',
];

function SectionCard({ title, icon, children, defaultOpen = true }: {
  title: string;
  icon: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{
      background: 'white',
      border: '1.5px solid #ede9e0',
      borderRadius: '12px',
      marginBottom: '16px',
      overflow: 'hidden',
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          padding: '16px 20px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          textAlign: 'left',
          fontFamily: 'var(--font-body)',
        }}
      >
        <span style={{ fontSize: '18px' }}>{icon}</span>
        <span style={{ flex: 1, fontWeight: 700, fontSize: '15px', color: 'var(--navy)' }}>{title}</span>
        {open ? <ChevronUp size={16} color="#888" /> : <ChevronDown size={16} color="#888" />}
      </button>
      {open && (
        <div style={{ padding: '0 20px 20px' }}>
          {children}
        </div>
      )}
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '14px' }}>
      <label style={{
        display: 'block',
        fontSize: '12px',
        fontWeight: 600,
        color: '#4a4540',
        marginBottom: '5px',
        letterSpacing: '0.03em',
      }}>
        {label} {required && <span style={{ color: 'var(--coral)' }}>*</span>}
      </label>
      {children}
    </div>
  );
}

export default function Screen4Info({ data, onChange, onNext, onBack }: Screen4Props) {
  const [errors, setErrors] = useState<string[]>([]);

  const validate = () => {
    const errs: string[] = [];
    if (!data.firstName.trim()) errs.push('First name is required');
    if (!data.lastName.trim()) errs.push('Last name is required');
    if (!data.email.trim()) errs.push('Email is required');
    if (!data.education[0]?.schoolName.trim()) errs.push('School name is required');
    setErrors(errs);
    if (errs.length === 0) onNext();
  };

  const addEducation = () => onChange({ ...data, education: [...data.education, { schoolName: '', graduationYear: '', gpa: '', relevantCourses: '', honors: '' }] });
  const removeEducation = (i: number) => onChange({ ...data, education: data.education.filter((_, idx) => idx !== i) });
  const updateEducation = (i: number, field: keyof Education, value: string) => {
    const updated = data.education.map((e, idx) => idx === i ? { ...e, [field]: value } : e);
    onChange({ ...data, education: updated });
  };

  const addExperience = () => onChange({ ...data, experience: [...data.experience, { jobTitle: '', employer: '', startDate: '', endDate: '', description: '' }] });
  const removeExperience = (i: number) => onChange({ ...data, experience: data.experience.filter((_, idx) => idx !== i) });
  const updateExperience = (i: number, field: keyof Experience, value: string) => {
    const updated = data.experience.map((e, idx) => idx === i ? { ...e, [field]: value } : e);
    onChange({ ...data, experience: updated });
  };

  const addVolunteer = () => onChange({ ...data, volunteering: [...data.volunteering, { organization: '', role: '', hours: '', description: '' }] });
  const removeVolunteer = (i: number) => onChange({ ...data, volunteering: data.volunteering.filter((_, idx) => idx !== i) });
  const updateVolunteer = (i: number, field: keyof Volunteer, value: string) => {
    const updated = data.volunteering.map((v, idx) => idx === i ? { ...v, [field]: value } : v);
    onChange({ ...data, volunteering: updated });
  };

  const toggleSkill = (skill: string) => {
    const has = data.skills.includes(skill);
    onChange({ ...data, skills: has ? data.skills.filter(s => s !== skill) : [...data.skills, skill] });
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', padding: '40px 24px' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>

        <button className="btn-outline" onClick={onBack} style={{ marginBottom: '32px', padding: '8px 16px', fontSize: '13px' }}>
          <ArrowLeft size={14} /> Back
        </button>

        <div className="animate-fade-up" style={{ marginBottom: '32px' }}>
          <div className="section-label" style={{ marginBottom: '8px' }}>Step 3 of 4</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 900, color: 'var(--navy)', margin: '0 0 8px' }}>
            Tell Us About Yourself
          </h2>
          <p style={{ color: '#7a7268', fontSize: '15px', margin: 0 }}>
            Don't worry about perfection — our AI will polish your writing!
          </p>
        </div>

        {errors.length > 0 && (
          <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '8px', padding: '12px 16px', marginBottom: '20px' }}>
            {errors.map(e => <p key={e} style={{ margin: '0 0 4px', fontSize: '13px', color: '#dc2626' }}>• {e}</p>)}
          </div>
        )}

        {/* Personal Info */}
        <SectionCard title="Personal Information" icon="👤">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            <Field label="First Name" required>
              <input className="input-field" value={data.firstName} onChange={e => onChange({ ...data, firstName: e.target.value })} placeholder="Alex" />
            </Field>
            <Field label="Last Name" required>
              <input className="input-field" value={data.lastName} onChange={e => onChange({ ...data, lastName: e.target.value })} placeholder="Johnson" />
            </Field>
            <Field label="Email Address" required>
              <input className="input-field" type="email" value={data.email} onChange={e => onChange({ ...data, email: e.target.value })} placeholder="alex@email.com" />
            </Field>
            <Field label="Phone Number">
              <input className="input-field" value={data.phone} onChange={e => onChange({ ...data, phone: e.target.value })} placeholder="(555) 123-4567" />
            </Field>
            <Field label="City">
              <input className="input-field" value={data.city} onChange={e => onChange({ ...data, city: e.target.value })} placeholder="Seattle" />
            </Field>
            <Field label="State">
              <input className="input-field" value={data.state} onChange={e => onChange({ ...data, state: e.target.value })} placeholder="WA" />
            </Field>
          </div>
          <Field label="LinkedIn (Optional)">
            <input className="input-field" value={data.linkedIn} onChange={e => onChange({ ...data, linkedIn: e.target.value })} placeholder="linkedin.com/in/alexjohnson" />
          </Field>
        </SectionCard>

        {/* About */}
        <SectionCard title="About You" icon="✍️">
          <Field label="Brief Summary">
            <textarea
              className="input-field"
              value={data.aboutYou}
              onChange={e => onChange({ ...data, aboutYou: e.target.value })}
              placeholder="Write 2-3 sentences about yourself, your goals, and what makes you a great candidate. Our AI will enhance this!"
              style={{ minHeight: '100px' }}
            />
          </Field>
          <p style={{ fontSize: '12px', color: '#9a9288', margin: 0 }}>💡 Even a rough draft works — AI will improve it!</p>
        </SectionCard>

        {/* Education */}
        <SectionCard title="Education" icon="🎓">
          {data.education.map((edu, i) => (
            <div key={i} style={{
              background: '#f9f7f3',
              borderRadius: '8px',
              padding: '14px',
              marginBottom: '12px',
              position: 'relative',
            }}>
              {i > 0 && (
                <button onClick={() => removeEducation(i)} style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', cursor: 'pointer', color: '#ccc' }}>
                  <Trash2 size={14} />
                </button>
              )}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                <Field label="School Name" required>
                  <input className="input-field" value={edu.schoolName} onChange={e => updateEducation(i, 'schoolName', e.target.value)} placeholder="Lincoln High School" />
                </Field>
                <Field label="Expected Graduation Year">
                  <input className="input-field" value={edu.graduationYear} onChange={e => updateEducation(i, 'graduationYear', e.target.value)} placeholder="2026" />
                </Field>
                <Field label="GPA (Optional)">
                  <input className="input-field" value={edu.gpa} onChange={e => updateEducation(i, 'gpa', e.target.value)} placeholder="3.8" />
                </Field>
                <Field label="Honors/AP Classes">
                  <input className="input-field" value={edu.honors} onChange={e => updateEducation(i, 'honors', e.target.value)} placeholder="Honor Roll, AP English" />
                </Field>
              </div>
              <Field label="Relevant Courses">
                <input className="input-field" value={edu.relevantCourses} onChange={e => updateEducation(i, 'relevantCourses', e.target.value)} placeholder="Business, Computer Science, Marketing" />
              </Field>
            </div>
          ))}
          <button onClick={addEducation} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: '1.5px dashed #c9a84c', borderRadius: '8px', padding: '8px 16px', cursor: 'pointer', color: 'var(--gold)', fontSize: '13px', fontFamily: 'var(--font-body)', fontWeight: 500 }}>
            <Plus size={14} /> Add Another School
          </button>
        </SectionCard>

        {/* Experience */}
        <SectionCard title="Work Experience" icon="💼" defaultOpen={false}>
          <p style={{ fontSize: '13px', color: '#9a9288', marginBottom: '16px', marginTop: 0 }}>
            Include any jobs, part-time work, gigs, or freelance work you've done.
          </p>
          {data.experience.map((exp, i) => (
            <div key={i} style={{ background: '#f9f7f3', borderRadius: '8px', padding: '14px', marginBottom: '12px', position: 'relative' }}>
              <button onClick={() => removeExperience(i)} style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', cursor: 'pointer', color: '#ccc' }}>
                <Trash2 size={14} />
              </button>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                <Field label="Job Title">
                  <input className="input-field" value={exp.jobTitle} onChange={e => updateExperience(i, 'jobTitle', e.target.value)} placeholder="Cashier" />
                </Field>
                <Field label="Employer">
                  <input className="input-field" value={exp.employer} onChange={e => updateExperience(i, 'employer', e.target.value)} placeholder="Target" />
                </Field>
                <Field label="Start Date">
                  <input className="input-field" value={exp.startDate} onChange={e => updateExperience(i, 'startDate', e.target.value)} placeholder="June 2024" />
                </Field>
                <Field label="End Date">
                  <input className="input-field" value={exp.endDate} onChange={e => updateExperience(i, 'endDate', e.target.value)} placeholder="Present" />
                </Field>
              </div>
              <Field label="What did you do? (rough notes are fine)">
                <textarea className="input-field" value={exp.description} onChange={e => updateExperience(i, 'description', e.target.value)} placeholder="Helped customers, operated the register, stocked shelves..." />
              </Field>
            </div>
          ))}
          <button onClick={addExperience} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: '1.5px dashed #c9a84c', borderRadius: '8px', padding: '8px 16px', cursor: 'pointer', color: 'var(--gold)', fontSize: '13px', fontFamily: 'var(--font-body)', fontWeight: 500 }}>
            <Plus size={14} /> Add Work Experience
          </button>
        </SectionCard>

        {/* Volunteering */}
        <SectionCard title="Volunteering & Community Service" icon="🤝" defaultOpen={false}>
          {data.volunteering.map((vol, i) => (
            <div key={i} style={{ background: '#f9f7f3', borderRadius: '8px', padding: '14px', marginBottom: '12px', position: 'relative' }}>
              <button onClick={() => removeVolunteer(i)} style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', cursor: 'pointer', color: '#ccc' }}>
                <Trash2 size={14} />
              </button>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                <Field label="Organization">
                  <input className="input-field" value={vol.organization} onChange={e => updateVolunteer(i, 'organization', e.target.value)} placeholder="Local Food Bank" />
                </Field>
                <Field label="Your Role">
                  <input className="input-field" value={vol.role} onChange={e => updateVolunteer(i, 'role', e.target.value)} placeholder="Volunteer" />
                </Field>
                <Field label="Total Hours">
                  <input className="input-field" value={vol.hours} onChange={e => updateVolunteer(i, 'hours', e.target.value)} placeholder="50" />
                </Field>
              </div>
              <Field label="What did you do?">
                <textarea className="input-field" value={vol.description} onChange={e => updateVolunteer(i, 'description', e.target.value)} placeholder="Sorted donations, helped serve meals..." />
              </Field>
            </div>
          ))}
          <button onClick={addVolunteer} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: '1.5px dashed #c9a84c', borderRadius: '8px', padding: '8px 16px', cursor: 'pointer', color: 'var(--gold)', fontSize: '13px', fontFamily: 'var(--font-body)', fontWeight: 500 }}>
            <Plus size={14} /> Add Volunteer Work
          </button>
        </SectionCard>

        {/* Skills */}
        <SectionCard title="Skills" icon="⚡" defaultOpen={false}>
          <p style={{ fontSize: '13px', color: '#9a9288', marginBottom: '12px', marginTop: 0 }}>Click to add, or type your own below:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
            {SKILLS_SUGGESTIONS.map(skill => (
              <button
                key={skill}
                onClick={() => toggleSkill(skill)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '100px',
                  border: `1.5px solid ${data.skills.includes(skill) ? 'var(--navy)' : '#e2ddd5'}`,
                  background: data.skills.includes(skill) ? 'var(--navy)' : 'white',
                  color: data.skills.includes(skill) ? 'white' : 'var(--ink)',
                  fontSize: '12px',
                  fontFamily: 'var(--font-body)',
                  cursor: 'pointer',
                  fontWeight: data.skills.includes(skill) ? 600 : 400,
                  transition: 'all 0.15s ease',
                }}
              >
                {skill}
              </button>
            ))}
          </div>
          <Field label="Add Custom Skills (comma-separated)">
            <input
              className="input-field"
              placeholder="Photography, Graphic Design, Spanish..."
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ',') {
                  const val = (e.target as HTMLInputElement).value.replace(',', '').trim();
                  if (val && !data.skills.includes(val)) {
                    onChange({ ...data, skills: [...data.skills, val] });
                    (e.target as HTMLInputElement).value = '';
                  }
                  e.preventDefault();
                }
              }}
            />
          </Field>
          {data.skills.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
              {data.skills.map(s => (
                <span key={s} style={{
                  display: 'inline-flex', alignItems: 'center', gap: '4px',
                  background: 'var(--navy)', color: 'white', borderRadius: '100px',
                  padding: '4px 10px', fontSize: '12px', fontWeight: 500,
                }}>
                  {s}
                  <button onClick={() => onChange({ ...data, skills: data.skills.filter(x => x !== s) })}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.7)', lineHeight: 1, padding: '0 0 0 2px' }}>×</button>
                </span>
              ))}
            </div>
          )}
        </SectionCard>

        {/* Awards & Clubs */}
        <SectionCard title="Awards & Clubs" icon="🏆" defaultOpen={false}>
          <Field label="Awards & Achievements">
            <textarea className="input-field" value={data.awards} onChange={e => onChange({ ...data, awards: e.target.value })} placeholder="Student of the Month (Oct 2024), 1st Place Science Fair, Varsity Basketball..." />
          </Field>
          <Field label="Clubs & Extracurricular Activities">
            <textarea className="input-field" value={data.clubs} onChange={e => onChange({ ...data, clubs: e.target.value })} placeholder="Drama Club (2022-present), Student Council Secretary, Spanish Club..." />
          </Field>
        </SectionCard>

        <div className="animate-fade-up" style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '40px' }}>
          <button className="btn-gold" onClick={validate} style={{ padding: '14px 32px', fontSize: '15px' }}>
            Build My Resume with AI ✨
          </button>
        </div>
      </div>
    </div>
  );
}
