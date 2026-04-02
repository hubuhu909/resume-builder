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
    <div style={{ minHeight: '100vh', background: 'var(--paper)', padding: '40px 24px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>

        <button
          className="btn-outline"
          onClick={onBack}
          style={{ marginBottom: '40px', padding: '8px 16px', fontSize: '13px' }}
        >
          <ArrowLeft size={14} /> Back
        </button>

        <div className="animate-fade-up">
          <div className="section-label" style={{ marginBottom: '8px' }}>Step 2 of 4</div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '36px',
            fontWeight: 900,
            color: 'var(--navy)',
            margin: '0 0 8px',
          }}>
            What Job Are You Applying For?
          </h2>
          <p style={{ color: '#7a7268', fontSize: '15px', margin: '0 0 36px' }}>
            We'll tailor your resume language to match the industry.
          </p>
        </div>

        {/* Dropdown */}
        <div className="animate-fade-up delay-100" style={{ marginBottom: '32px' }}>
          <label style={{
            display: 'block',
            fontSize: '13px',
            fontWeight: 600,
            color: 'var(--navy)',
            marginBottom: '8px',
            letterSpacing: '0.03em',
          }}>
            Job Category
          </label>
          <div style={{ position: 'relative' }}>
            <select
              value={config.jobCategory}
              onChange={e => onChange({ ...config, jobCategory: e.target.value as JobCategory })}
              style={{
                width: '100%',
                padding: '14px 44px 14px 16px',
                border: '2px solid #e2ddd5',
                borderRadius: '10px',
                fontFamily: 'var(--font-body)',
                fontSize: '15px',
                color: 'var(--ink)',
                background: 'white',
                appearance: 'none',
                cursor: 'pointer',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => { e.target.style.borderColor = 'var(--gold)'; }}
              onBlur={e => { e.target.style.borderColor = '#e2ddd5'; }}
            >
              {categories.map(([id, label]) => (
                <option key={id} value={id}>{label}</option>
              ))}
            </select>
            <div style={{
              position: 'absolute',
              right: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
              fontSize: '18px',
              color: '#888',
            }}>▾</div>
          </div>
        </div>

        {/* Quick grid of categories */}
        <div className="animate-fade-up delay-200">
          <p style={{ fontSize: '13px', color: '#9a9288', marginBottom: '12px', fontWeight: 500 }}>Or click to select:</p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '10px',
            marginBottom: '40px',
          }}>
            {categories.map(([id, label]) => (
              <button
                key={id}
                onClick={() => onChange({ ...config, jobCategory: id })}
                style={{
                  background: config.jobCategory === id ? 'var(--navy)' : 'white',
                  color: config.jobCategory === id ? 'white' : 'var(--ink)',
                  border: `1.5px solid ${config.jobCategory === id ? 'var(--navy)' : '#ede9e0'}`,
                  borderRadius: '10px',
                  padding: '10px 14px',
                  fontSize: '13px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontFamily: 'var(--font-body)',
                  fontWeight: config.jobCategory === id ? 600 : 400,
                  transition: 'all 0.15s ease',
                  lineHeight: 1.4,
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Tip card */}
        <div
          className="animate-fade-up delay-300"
          style={{
            background: 'rgba(201,168,76,0.08)',
            border: '1px solid rgba(201,168,76,0.25)',
            borderRadius: '10px',
            padding: '16px 20px',
            marginBottom: '40px',
          }}
        >
          <p style={{ fontSize: '13px', color: '#6b5a28', margin: 0, lineHeight: 1.6 }}>
            💡 <strong>Pro tip:</strong> Don't stress too much — you can always update this later. Our AI will adjust the language based on your selection, but the core resume will be yours.
          </p>
        </div>

        <div className="animate-fade-up delay-400" style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn-primary" onClick={onNext} style={{ padding: '14px 32px' }}>
            Continue <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
