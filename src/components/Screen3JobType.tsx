'use client';

import { ArrowRight, ArrowLeft } from 'lucide-react';
import { ResumeConfig, JobCategory, jobCategoryLabels } from '@/types/resume';

interface Screen3Props {
  config: ResumeConfig;
  onChange: (config: ResumeConfig) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Screen3JobType({ config, onChange, onNext, onBack }: Screen3Props) {
  const categories = Object.entries(jobCategoryLabels) as [JobCategory, string][];

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
      <div className="win-window" style={{ width: '100%', maxWidth: '580px' }}>

        {/* Titlebar */}
        <div className="win-titlebar">
          <span>📄</span>
          <span>ResumeUp — Step 2 of 4: Select Job Type</span>
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
            <div style={{ fontSize: '13px', fontWeight: 700, marginBottom: '4px' }}>
              What Job Are You Applying For?
            </div>
            <div style={{ fontSize: '11px', color: 'var(--win-text)', marginBottom: '8px' }}>
              We&apos;ll tailor your resume language to match the industry.
            </div>
          </div>

          <hr className="win-separator" />

          {/* Dropdown */}
          <div style={{ marginBottom: '12px' }}>
            <div style={{ marginBottom: '4px', fontSize: '11px', fontWeight: 700 }}>Job Category:</div>
            <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
              <select
                value={config.jobCategory}
                onChange={e => onChange({ ...config, jobCategory: e.target.value as JobCategory })}
                className="win-select"
                style={{ height: '23px' }}
              >
                {categories.map(([id, label]) => (
                  <option key={id} value={id}>{label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Group box with category buttons */}
          <div className="win-groupbox" style={{ marginBottom: '12px' }}>
            <span className="win-groupbox-label">Or click to select quickly:</span>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
              gap: '4px',
            }}>
              {categories.map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => onChange({ ...config, jobCategory: id })}
                  className={config.jobCategory === id ? 'win-option-card selected' : 'win-option-card'}
                  style={{
                    fontSize: '11px',
                    textAlign: 'left',
                    fontFamily: 'var(--font-system)',
                    fontWeight: config.jobCategory === id ? 700 : 400,
                    padding: '3px 8px',
                  }}
                >
                  {config.jobCategory === id && '▶ '}{label}
                </button>
              ))}
            </div>
          </div>

          {/* Tip balloon */}
          <div className="win-balloon" style={{ marginBottom: '16px' }}>
            <span style={{ fontWeight: 700 }}>ℹ Tip:</span> Don&apos;t stress too much — you can always update this later.
            Our AI will adjust the language based on your selection.
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
            Step 2 of 4 — Category: {jobCategoryLabels[config.jobCategory]}
          </div>
        </div>
      </div>
    </div>
  );
}
