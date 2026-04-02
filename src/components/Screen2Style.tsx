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
      <div style={{ padding: '6px', fontFamily: 'sans-serif', background: 'white', height: '100%' }}>
        <div style={{ height: '5px', background: '#1a2744', marginBottom: '4px' }} />
        <div style={{ height: '8px', background: '#1a2744', width: '55%', marginBottom: '3px' }} />
        <div style={{ height: '3px', background: '#c9a84c', width: '75%', marginBottom: '6px' }} />
        {[80, 90, 70, 85].map((w, i) => (
          <div key={i} style={{ height: '2px', background: '#aaa', width: `${w}%`, marginBottom: '3px' }} />
        ))}
      </div>
    ),
  },
  {
    id: 'classic',
    name: 'Classic',
    desc: 'Traditional & timeless for formal roles',
    preview: (
      <div style={{ padding: '6px', background: 'white', height: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '4px' }}>
          <div style={{ height: '6px', background: '#333', width: '50%', margin: '0 auto 3px' }} />
          <div style={{ height: '1px', background: '#333', marginBottom: '3px' }} />
          <div style={{ height: '2px', background: '#999', width: '70%', margin: '0 auto' }} />
        </div>
        {[70, 85, 60, 75].map((w, i) => (
          <div key={i} style={{ height: '2px', background: '#ccc', width: `${w}%`, marginBottom: '3px' }} />
        ))}
      </div>
    ),
  },
  {
    id: 'creative',
    name: 'Creative',
    desc: 'Bold sidebar layout that stands out',
    preview: (
      <div style={{ display: 'flex', height: '100%', background: 'white' }}>
        <div style={{ width: '35%', background: '#0d9488', padding: '6px 4px' }}>
          <div style={{ height: '14px', width: '14px', borderRadius: '50%', background: 'rgba(255,255,255,0.4)', margin: '0 auto 4px' }} />
          {[70, 80, 60].map((w, i) => (
            <div key={i} style={{ height: '2px', background: 'rgba(255,255,255,0.3)', width: `${w}%`, marginBottom: '3px' }} />
          ))}
        </div>
        <div style={{ flex: 1, padding: '6px 4px' }}>
          <div style={{ height: '6px', background: '#0d9488', width: '70%', marginBottom: '4px' }} />
          {[90, 70, 80, 60].map((w, i) => (
            <div key={i} style={{ height: '2px', background: '#ccc', width: `${w}%`, marginBottom: '3px' }} />
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
      <div style={{ padding: '8px', background: 'white', height: '100%' }}>
        <div style={{ height: '5px', background: '#111', width: '45%', marginBottom: '3px' }} />
        <div style={{ height: '2px', background: '#bbb', width: '65%', marginBottom: '8px' }} />
        <div style={{ height: '1px', background: '#eee', marginBottom: '5px' }} />
        {[80, 65, 85, 70].map((w, i) => (
          <div key={i} style={{ height: '2px', background: '#e0e0e0', width: `${w}%`, marginBottom: '4px' }} />
        ))}
      </div>
    ),
  },
];

export default function Screen2Style({ config, onChange, onNext, onBack }: Screen2Props) {
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
      <div className="win-window" style={{ width: '100%', maxWidth: '640px' }}>

        {/* Titlebar */}
        <div className="win-titlebar">
          <span>📄</span>
          <span>ResumeUp — Step 1 of 4: Choose Resume Style</span>
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
            <div style={{ fontSize: '13px', fontWeight: 700, marginBottom: '4px' }}>Choose Your Style</div>
            <div style={{ fontSize: '11px', color: 'var(--win-text)', marginBottom: '8px' }}>
              Select a resume format that fits the job you&apos;re applying for.
            </div>
          </div>

          <hr className="win-separator" />

          {/* Style grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '8px',
            marginBottom: '12px',
          }}>
            {styles.map((style) => (
              <button
                key={style.id}
                onClick={() => onChange({ ...config, style: style.id })}
                style={{
                  background: 'var(--win-gray)',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  textAlign: 'left',
                  outline: config.style === style.id ? '2px solid var(--win-highlight)' : 'none',
                  outlineOffset: '1px',
                }}
              >
                <div style={{
                  borderTop: '2px solid var(--win-hilight)',
                  borderLeft: '2px solid var(--win-hilight)',
                  borderRight: '2px solid var(--win-border-dark)',
                  borderBottom: '2px solid var(--win-border-dark)',
                  overflow: 'hidden',
                }}>
                  {/* Preview */}
                  <div style={{
                    height: '80px',
                    background: '#f0ede8',
                    borderBottom: '1px solid var(--win-border-dark)',
                    overflow: 'hidden',
                  }}>
                    {style.preview}
                  </div>

                  {/* Label */}
                  <div style={{
                    padding: '4px 6px',
                    background: config.style === style.id ? 'var(--win-highlight)' : 'var(--win-gray)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}>
                    {config.style === style.id && (
                      <span style={{ color: 'white', fontSize: '10px' }}>✓</span>
                    )}
                    <span style={{
                      fontWeight: 700,
                      fontSize: '11px',
                      color: config.style === style.id ? 'white' : 'var(--win-text)',
                    }}>
                      {style.name}
                    </span>
                  </div>
                  <div style={{
                    padding: '2px 6px 5px',
                    background: config.style === style.id ? 'var(--win-highlight)' : 'var(--win-gray)',
                  }}>
                    <p style={{
                      fontSize: '10px',
                      color: config.style === style.id ? 'rgba(255,255,255,0.8)' : '#555',
                      margin: 0,
                      lineHeight: 1.3,
                    }}>
                      {style.desc}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <hr className="win-separator" />

          {/* Cover letter option */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, marginBottom: '6px' }}>Options:</div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <button
                onClick={() => onChange({ ...config, includeCoverLetter: !config.includeCoverLetter })}
                className="win-checkbox"
                style={{ marginTop: '1px' }}
              >
                {config.includeCoverLetter && (
                  <span style={{ fontSize: '10px', fontWeight: 900, lineHeight: 1 }}>✓</span>
                )}
              </button>
              <div>
                <div style={{ fontWeight: 700, fontSize: '11px', marginBottom: '2px' }}>
                  Include Cover Letter <span style={{ fontWeight: 400, color: '#555' }}>(optional)</span>
                </div>
                <div style={{ fontSize: '11px', color: '#555', lineHeight: 1.4 }}>
                  AI will generate a personalized cover letter based on your information.
                </div>
              </div>
            </div>
          </div>

          <hr className="win-separator" />

          {/* Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <button className="win-btn" onClick={onBack} style={{ minWidth: '80px', justifyContent: 'center' }}>
              &lt; Back
            </button>
            <button className="win-btn-primary" onClick={onNext} style={{ minWidth: '80px', justifyContent: 'center' }}>
              Next &gt;
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
            Step 1 of 4 — Style selected: {config.style}
          </div>
        </div>
      </div>
    </div>
  );
}
