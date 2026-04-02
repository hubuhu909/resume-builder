'use client';

import { useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
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
    <div style={{ marginBottom: '8px' }}>
      {/* Section header tab */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          background: open ? 'var(--win-highlight)' : 'var(--win-gray)',
          color: open ? 'white' : 'var(--win-text)',
          borderTop: open ? '1px solid var(--win-titlebar-end)' : '2px solid var(--win-hilight)',
          borderLeft: open ? '1px solid var(--win-titlebar-end)' : '2px solid var(--win-hilight)',
          borderRight: open ? '1px solid var(--win-titlebar-start)' : '2px solid var(--win-border-dark)',
          borderBottom: open ? '1px solid var(--win-titlebar-start)' : '2px solid var(--win-border-dark)',
          padding: '4px 10px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          textAlign: 'left',
          fontFamily: 'var(--font-system)',
          fontSize: '11px',
          fontWeight: 700,
        }}
      >
        <span>{icon}</span>
        <span style={{ flex: 1 }}>{title}</span>
        {open ? '▲' : '▼'}
      </button>
      {open && (
        <div style={{
          background: 'var(--win-gray)',
          borderTop: 'none',
          borderLeft: '2px solid var(--win-border-dark)',
          borderRight: '2px solid var(--win-hilight)',
          borderBottom: '2px solid var(--win-hilight)',
          padding: '10px 12px',
        }}>
          {children}
        </div>
      )}
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '8px' }}>
      <label style={{
        display: 'block',
        fontSize: '11px',
        fontWeight: 700,
        color: 'var(--win-text)',
        marginBottom: '3px',
      }}>
        {label}{required && <span style={{ color: 'red' }}> *</span>}
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
    <div style={{
      minHeight: '100vh',
      background: 'var(--win-desktop)',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: '20px',
      paddingTop: '80px',
      fontFamily: 'var(--font-system)',
    }}>
      <div className="win-window" style={{ width: '100%', maxWidth: '680px' }}>

        {/* Titlebar */}
        <div className="win-titlebar">
          <span>📄</span>
          <span>ResumeUp — Step 3 of 4: Your Information</span>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '2px' }}>
            {['_', '□', '✕'].map((ch, i) => (
              <button key={i} style={{
                width: 16, height: 14, background: 'var(--win-gray)',
                borderTop: '1px solid #fff', borderLeft: '1px solid #fff',
                borderRight: '1px solid #404040', borderBottom: '1px solid #404040',
                fontSize: '9px', cursor: 'default', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-system)', color: 'black', padding: 0,
              }}>{ch}</button>
            ))}
          </div>
        </div>

        <div style={{ padding: '16px', background: 'var(--win-gray)' }}>

          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, marginBottom: '4px' }}>Tell Us About Yourself</div>
            <div style={{ fontSize: '11px', color: 'var(--win-text)', marginBottom: '8px' }}>
              Don&apos;t worry about perfection — our AI will polish your writing!
            </div>
          </div>

          {/* Errors */}
          {errors.length > 0 && (
            <div className="win-error" style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ fontSize: '18px' }}>⚠️</span>
                <span style={{ fontWeight: 700 }}>Please correct the following errors:</span>
              </div>
              {errors.map(e => (
                <div key={e} style={{ fontSize: '11px', color: 'red', paddingLeft: '26px' }}>• {e}</div>
              ))}
            </div>
          )}

          {/* Personal Info */}
          <SectionCard title="Personal Information" icon="👤">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 12px' }}>
              <Field label="First Name" required>
                <input className="win-input" value={data.firstName} onChange={e => onChange({ ...data, firstName: e.target.value })} placeholder="Alex" />
              </Field>
              <Field label="Last Name" required>
                <input className="win-input" value={data.lastName} onChange={e => onChange({ ...data, lastName: e.target.value })} placeholder="Johnson" />
              </Field>
              <Field label="Email Address" required>
                <input className="win-input" type="email" value={data.email} onChange={e => onChange({ ...data, email: e.target.value })} placeholder="alex@email.com" />
              </Field>
              <Field label="Phone Number">
                <input className="win-input" value={data.phone} onChange={e => onChange({ ...data, phone: e.target.value })} placeholder="(555) 123-4567" />
              </Field>
              <Field label="City">
                <input className="win-input" value={data.city} onChange={e => onChange({ ...data, city: e.target.value })} placeholder="Seattle" />
              </Field>
              <Field label="State">
                <input className="win-input" value={data.state} onChange={e => onChange({ ...data, state: e.target.value })} placeholder="WA" />
              </Field>
            </div>
            <Field label="LinkedIn (Optional)">
              <input className="win-input" value={data.linkedIn} onChange={e => onChange({ ...data, linkedIn: e.target.value })} placeholder="linkedin.com/in/alexjohnson" />
            </Field>
          </SectionCard>

          {/* About */}
          <SectionCard title="About You" icon="✍️">
            <Field label="Brief Summary">
              <textarea
                className="win-input"
                value={data.aboutYou}
                onChange={e => onChange({ ...data, aboutYou: e.target.value })}
                placeholder="Write 2-3 sentences about yourself. AI will enhance this!"
                style={{ minHeight: '70px' }}
              />
            </Field>
            <div className="win-balloon">ℹ Even a rough draft works — AI will improve it!</div>
          </SectionCard>

          {/* Education */}
          <SectionCard title="Education" icon="🎓">
            {data.education.map((edu, i) => (
              <div key={i} style={{
                background: 'var(--win-gray-light)',
                borderTop: '2px solid var(--win-border-dark)',
                borderLeft: '2px solid var(--win-border-dark)',
                borderRight: '2px solid var(--win-hilight)',
                borderBottom: '2px solid var(--win-hilight)',
                padding: '8px 10px',
                marginBottom: '8px',
                position: 'relative',
              }}>
                {i > 0 && (
                  <button
                    onClick={() => removeEducation(i)}
                    className="win-btn"
                    style={{ position: 'absolute', top: '6px', right: '6px', padding: '2px 6px', fontSize: '10px' }}
                  >
                    <Trash2 size={10} /> Delete
                  </button>
                )}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 12px' }}>
                  <Field label="School Name" required>
                    <input className="win-input" value={edu.schoolName} onChange={e => updateEducation(i, 'schoolName', e.target.value)} placeholder="Lincoln High School" />
                  </Field>
                  <Field label="Expected Graduation Year">
                    <input className="win-input" value={edu.graduationYear} onChange={e => updateEducation(i, 'graduationYear', e.target.value)} placeholder="2026" />
                  </Field>
                  <Field label="GPA (Optional)">
                    <input className="win-input" value={edu.gpa} onChange={e => updateEducation(i, 'gpa', e.target.value)} placeholder="3.8" />
                  </Field>
                  <Field label="Honors / AP Classes">
                    <input className="win-input" value={edu.honors} onChange={e => updateEducation(i, 'honors', e.target.value)} placeholder="Honor Roll, AP English" />
                  </Field>
                </div>
                <Field label="Relevant Courses">
                  <input className="win-input" value={edu.relevantCourses} onChange={e => updateEducation(i, 'relevantCourses', e.target.value)} placeholder="Business, Computer Science, Marketing" />
                </Field>
              </div>
            ))}
            <button
              onClick={addEducation}
              className="win-btn"
              style={{ borderStyle: 'dashed', borderWidth: '2px', borderColor: 'var(--win-gray-dark)' }}
            >
              <Plus size={12} /> Add Another School
            </button>
          </SectionCard>

          {/* Experience */}
          <SectionCard title="Work Experience" icon="💼" defaultOpen={false}>
            <div className="win-balloon" style={{ marginBottom: '8px' }}>
              ℹ Include any jobs, part-time work, gigs, or freelance work.
            </div>
            {data.experience.map((exp, i) => (
              <div key={i} style={{
                background: 'var(--win-gray-light)',
                borderTop: '2px solid var(--win-border-dark)',
                borderLeft: '2px solid var(--win-border-dark)',
                borderRight: '2px solid var(--win-hilight)',
                borderBottom: '2px solid var(--win-hilight)',
                padding: '8px 10px',
                marginBottom: '8px',
                position: 'relative',
              }}>
                <button
                  onClick={() => removeExperience(i)}
                  className="win-btn"
                  style={{ position: 'absolute', top: '6px', right: '6px', padding: '2px 6px', fontSize: '10px' }}
                >
                  <Trash2 size={10} /> Delete
                </button>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 12px' }}>
                  <Field label="Job Title">
                    <input className="win-input" value={exp.jobTitle} onChange={e => updateExperience(i, 'jobTitle', e.target.value)} placeholder="Cashier" />
                  </Field>
                  <Field label="Employer">
                    <input className="win-input" value={exp.employer} onChange={e => updateExperience(i, 'employer', e.target.value)} placeholder="Target" />
                  </Field>
                  <Field label="Start Date">
                    <input className="win-input" value={exp.startDate} onChange={e => updateExperience(i, 'startDate', e.target.value)} placeholder="June 2024" />
                  </Field>
                  <Field label="End Date">
                    <input className="win-input" value={exp.endDate} onChange={e => updateExperience(i, 'endDate', e.target.value)} placeholder="Present" />
                  </Field>
                </div>
                <Field label="What did you do? (rough notes are fine)">
                  <textarea className="win-input" value={exp.description} onChange={e => updateExperience(i, 'description', e.target.value)} placeholder="Helped customers, operated the register, stocked shelves..." />
                </Field>
              </div>
            ))}
            <button onClick={addExperience} className="win-btn">
              <Plus size={12} /> Add Work Experience
            </button>
          </SectionCard>

          {/* Volunteering */}
          <SectionCard title="Volunteering & Community Service" icon="🤝" defaultOpen={false}>
            {data.volunteering.map((vol, i) => (
              <div key={i} style={{
                background: 'var(--win-gray-light)',
                borderTop: '2px solid var(--win-border-dark)',
                borderLeft: '2px solid var(--win-border-dark)',
                borderRight: '2px solid var(--win-hilight)',
                borderBottom: '2px solid var(--win-hilight)',
                padding: '8px 10px',
                marginBottom: '8px',
                position: 'relative',
              }}>
                <button
                  onClick={() => removeVolunteer(i)}
                  className="win-btn"
                  style={{ position: 'absolute', top: '6px', right: '6px', padding: '2px 6px', fontSize: '10px' }}
                >
                  <Trash2 size={10} /> Delete
                </button>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 12px' }}>
                  <Field label="Organization">
                    <input className="win-input" value={vol.organization} onChange={e => updateVolunteer(i, 'organization', e.target.value)} placeholder="Local Food Bank" />
                  </Field>
                  <Field label="Your Role">
                    <input className="win-input" value={vol.role} onChange={e => updateVolunteer(i, 'role', e.target.value)} placeholder="Volunteer" />
                  </Field>
                  <Field label="Total Hours">
                    <input className="win-input" value={vol.hours} onChange={e => updateVolunteer(i, 'hours', e.target.value)} placeholder="50" />
                  </Field>
                </div>
                <Field label="What did you do?">
                  <textarea className="win-input" value={vol.description} onChange={e => updateVolunteer(i, 'description', e.target.value)} placeholder="Sorted donations, helped serve meals..." />
                </Field>
              </div>
            ))}
            <button onClick={addVolunteer} className="win-btn">
              <Plus size={12} /> Add Volunteer Work
            </button>
          </SectionCard>

          {/* Skills */}
          <SectionCard title="Skills" icon="⚡" defaultOpen={false}>
            <div style={{ fontSize: '11px', marginBottom: '6px', color: '#555' }}>Click to toggle skills:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '10px' }}>
              {SKILLS_SUGGESTIONS.map(skill => (
                <button
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={data.skills.includes(skill) ? 'win-option-card selected' : 'win-option-card'}
                  style={{
                    padding: '2px 8px',
                    fontSize: '11px',
                    fontFamily: 'var(--font-system)',
                    cursor: 'pointer',
                  }}
                >
                  {data.skills.includes(skill) ? '☑ ' : '☐ '}{skill}
                </button>
              ))}
            </div>
            <Field label="Add Custom Skills (press Enter or comma to add)">
              <input
                className="win-input"
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
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '6px' }}>
                {data.skills.map(s => (
                  <span key={s} style={{
                    display: 'inline-flex', alignItems: 'center', gap: '4px',
                    background: 'var(--win-highlight)', color: 'white',
                    padding: '2px 6px', fontSize: '11px',
                    borderTop: '1px solid var(--win-titlebar-end)',
                    borderLeft: '1px solid var(--win-titlebar-end)',
                    borderRight: '1px solid var(--win-titlebar-start)',
                    borderBottom: '1px solid var(--win-titlebar-start)',
                  }}>
                    {s}
                    <button
                      onClick={() => onChange({ ...data, skills: data.skills.filter(x => x !== s) })}
                      style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        color: 'rgba(255,255,255,0.8)', lineHeight: 1, padding: '0 0 0 2px',
                        fontFamily: 'var(--font-system)', fontSize: '12px',
                      }}
                    >×</button>
                  </span>
                ))}
              </div>
            )}
          </SectionCard>

          {/* Awards & Clubs */}
          <SectionCard title="Awards & Clubs" icon="🏆" defaultOpen={false}>
            <Field label="Awards & Achievements">
              <textarea className="win-input" value={data.awards} onChange={e => onChange({ ...data, awards: e.target.value })} placeholder="Student of the Month (Oct 2024), 1st Place Science Fair..." />
            </Field>
            <Field label="Clubs & Extracurricular Activities">
              <textarea className="win-input" value={data.clubs} onChange={e => onChange({ ...data, clubs: e.target.value })} placeholder="Drama Club (2022-present), Student Council Secretary..." />
            </Field>
          </SectionCard>

          <hr className="win-separator" />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', paddingBottom: '4px' }}>
            <button className="win-btn" onClick={onBack} style={{ minWidth: '80px', justifyContent: 'center' }}>
              &lt; Back
            </button>
            <button className="win-btn-primary" onClick={validate} style={{ minWidth: '140px', justifyContent: 'center' }}>
              Build My Resume with AI
            </button>
            <button className="win-btn" style={{ minWidth: '80px', justifyContent: 'center' }}>
              Cancel
            </button>
          </div>
        </div>

        <div className="win-statusbar">
          <div style={{
            borderTop: '1px solid var(--win-border-dark)', borderLeft: '1px solid var(--win-border-dark)',
            borderRight: '1px solid var(--win-hilight)', borderBottom: '1px solid var(--win-hilight)',
            padding: '1px 8px',
          }}>
            Step 3 of 4 — Fill in your information
          </div>
        </div>
      </div>
    </div>
  );
}
