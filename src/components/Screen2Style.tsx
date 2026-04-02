'use client';

import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { ResumeStyle, ResumeConfig } from '@/types/resume';

interface Screen2Props {
  config: ResumeConfig;
  onChange: (config: ResumeConfig) => void;
  onNext: () => void;
  onBack: () => void;
}

const styles: { id: ResumeStyle; name: string; desc: string; preview: React.ReactNode }[] = [
  {
    id: 'modern',
    name: 'Modern',
    desc: 'Clean & professional with bold headers',
    preview: (
      <div style={{ padding: '12px', fontFamily: 'sans-serif' }}>
        <div style={{ height: '6px', background: '#1a2744', borderRadius: '2px', marginBottom: '8px' }} />
        <div style={{ height: '10px', background: '#1a2744', borderRadius: '2px', width: '60%', marginBottom: '6px' }} />
        <div style={{ height: '4px', background: '#c9a84c', borderRadius: '2px', width: '80%', marginBottom: '10px' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          {[80, 90, 70, 85].map((w, i) => (
            <div key={i} style={{ height: '3px', background: '#e2ddd5', borderRadius: '2px', width: `${w}%` }} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'classic',
    name: 'Classic',
    desc: 'Traditional & timeless for formal roles',
    preview: (
      <div style={{ padding: '12px', fontFamily: 'Georgia, serif' }}>
        <div style={{ textAlign: 'center', marginBottom: '8px' }}>
          <div style={{ height: '8px', background: '#333', borderRadius: '1px', width: '50%', margin: '0 auto 4px' }} />
          <div style={{ height: '1px', background: '#333', marginBottom: '4px' }} />
          <div style={{ height: '3px', background: '#999', borderRadius: '1px', width: '70%', margin: '0 auto' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginTop: '8px' }}>
          {[70, 85, 60, 75].map((w, i) => (
            <div key={i} style={{ height: '3px', background: '#ddd', borderRadius: '1px', width: `${w}%` }} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'creative',
    name: 'Creative',
    desc: 'Bold sidebar layout that stands out',
    preview: (
      <div style={{ padding: '0', display: 'flex', height: '100%', overflow: 'hidden', borderRadius: '6px' }}>
        <div style={{ width: '35%', background: '#0d9488', padding: '10px 8px' }}>
          <div style={{ height: '20px', width: '20px', borderRadius: '50%', background: 'rgba(255,255,255,0.4)', margin: '0 auto 8px' }} />
          {[70, 80, 60, 75, 65].map((w, i) => (
            <div key={i} style={{ height: '3px', background: 'rgba(255,255,255,0.3)', borderRadius: '1px', width: `${w}%`, marginBottom: '4px' }} />
          ))}
        </div>
        <div style={{ flex: 1, padding: '10px 8px' }}>
          <div style={{ height: '8px', background: '#0d9488', borderRadius: '2px', marginBottom: '8px', width: '70%' }} />
          {[90, 70, 80, 60].map((w, i) => (
            <div key={i} style={{ height: '3px', background: '#e2ddd5', borderRadius: '1px', width: `${w}%`, marginBottom: '4px' }} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'minimal',
    name: 'Minimal',
    desc: 'Ultra-clean whitespace focused design',
    preview: (
      <div style={{ padding: '14px' }}>
        <div style={{ height: '7px', background: '#111', borderRadius: '1px', width: '45%', marginBottom: '4px' }} />
        <div style={{ height: '3px', background: '#bbb', borderRadius: '1px', width: '65%', marginBottom: '12px' }} />
        <div style={{ height: '1px', background: '#eee', marginBottom: '8px' }} />
        {[80, 65, 85, 70].map((w, i) => (
          <div key={i} style={{ height: '3px', background: '#e8e8e8', borderRadius: '1px', width: `${w}%`, marginBottom: '5px' }} />
        ))}
      </div>
    ),
  },
];

export default function Screen2Style({ config, onChange, onNext, onBack }: Screen2Props) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)', padding: '40px 24px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>

        {/* Back */}
        <button
          className="btn-outline"
          onClick={onBack}
          style={{ marginBottom: '40px', padding: '8px 16px', fontSize: '13px' }}
        >
          <ArrowLeft size={14} /> Back
        </button>

        <div className="animate-fade-up">
          <div className="section-label" style={{ marginBottom: '8px' }}>Step 1 of 4</div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '36px',
            fontWeight: 900,
            color: 'var(--navy)',
            margin: '0 0 8px',
          }}>
            Choose Your Style
          </h2>
          <p style={{ color: '#7a7268', fontSize: '15px', margin: '0 0 40px' }}>
            Pick a format that fits the job you're applying for.
          </p>
        </div>

        {/* Style grid */}
        <div
          className="animate-fade-up delay-100"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '16px',
            marginBottom: '40px',
          }}
        >
          {styles.map((style) => (
            <button
              key={style.id}
              onClick={() => onChange({ ...config, style: style.id })}
              style={{
                background: config.style === style.id ? 'white' : 'white',
                border: `2px solid ${config.style === style.id ? 'var(--navy)' : '#ede9e0'}`,
                borderRadius: '12px',
                padding: '0',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease',
                overflow: 'hidden',
                boxShadow: config.style === style.id ? '0 4px 20px rgba(26,39,68,0.15)' : '0 2px 8px rgba(0,0,0,0.04)',
                position: 'relative',
              }}
            >
              {/* Preview box */}
              <div style={{
                height: '110px',
                background: '#f9f7f3',
                borderBottom: '1px solid #ede9e0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}>
                <div style={{ width: '100%', height: '100%' }}>{style.preview}</div>
              </div>

              {/* Label */}
              <div style={{ padding: '12px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '4px',
                }}>
                  <span style={{ fontWeight: 700, fontSize: '14px', color: 'var(--navy)' }}>{style.name}</span>
                  {config.style === style.id && (
                    <div style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      background: 'var(--navy)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <Check size={10} color="white" strokeWidth={3} />
                    </div>
                  )}
                </div>
                <p style={{ fontSize: '11px', color: '#9a9288', margin: 0, lineHeight: 1.4 }}>{style.desc}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Cover letter toggle */}
        <div
          className="animate-fade-up delay-200"
          style={{
            background: 'white',
            border: '1.5px solid #ede9e0',
            borderRadius: '12px',
            padding: '20px 24px',
            marginBottom: '40px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '16px',
          }}
        >
          <button
            onClick={() => onChange({ ...config, includeCoverLetter: !config.includeCoverLetter })}
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '4px',
              border: `2px solid ${config.includeCoverLetter ? 'var(--navy)' : '#d0cac0'}`,
              background: config.includeCoverLetter ? 'var(--navy)' : 'white',
              cursor: 'pointer',
              flexShrink: 0,
              marginTop: '2px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.15s ease',
            }}
          >
            {config.includeCoverLetter && <Check size={12} color="white" strokeWidth={3} />}
          </button>
          <div>
            <div style={{ fontWeight: 600, fontSize: '15px', color: 'var(--navy)', marginBottom: '4px' }}>
              Include a Cover Letter <span style={{ fontSize: '12px', color: 'var(--gold)', fontWeight: 500 }}>Optional</span>
            </div>
            <p style={{ fontSize: '13px', color: '#7a7268', margin: 0, lineHeight: 1.5 }}>
              A cover letter can make your application stand out! Our AI will write a personalized one based on your information.
            </p>
          </div>
        </div>

        {/* Next */}
        <div className="animate-fade-up delay-300" style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn-primary" onClick={onNext} style={{ padding: '14px 32px' }}>
            Continue <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
