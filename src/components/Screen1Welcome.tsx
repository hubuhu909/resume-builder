'use client';

import { FileText, ArrowRight, Sparkles, MessageCircle, Download } from 'lucide-react';

interface Screen1Props {
  onNext: () => void;
}

export default function Screen1Welcome({ onNext }: Screen1Props) {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--win-desktop)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'var(--font-system)',
    }}>
      {/* Main Window */}
      <div className="win-window" style={{ width: '100%', maxWidth: '560px' }}>

        {/* Titlebar */}
        <div className="win-titlebar">
          <img
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 16 16'%3E%3Crect width='8' height='8' fill='%23ff0000'/%3E%3Crect x='8' width='8' height='8' fill='%2300ff00'/%3E%3Crect y='8' width='8' height='8' fill='%230000ff'/%3E%3Crect x='8' y='8' width='8' height='8' fill='%23ffff00'/%3E%3C/svg%3E"
            alt="icon"
            style={{ width: 14, height: 14, imageRendering: 'pixelated' }}
          />
          <span>ResumeUp — AI Resume Builder</span>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '2px' }}>
            {['_', '□', '✕'].map((ch, i) => (
              <button key={i} style={{
                width: 16, height: 14, background: 'var(--win-gray)',
                borderTop: '1px solid #fff', borderLeft: '1px solid #fff',
                borderRight: '1px solid #404040', borderBottom: '1px solid #404040',
                fontSize: '9px', cursor: 'default', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-system)', color: 'black', padding: 0, lineHeight: 1,
              }}>{ch}</button>
            ))}
          </div>
        </div>

        {/* Menu bar */}
        <div style={{
          background: 'var(--win-gray)',
          borderBottom: '1px solid var(--win-border-dark)',
          padding: '2px 4px',
          display: 'flex',
          gap: '2px',
        }}>
          {['File', 'Edit', 'View', 'Help'].map(m => (
            <button key={m} style={{
              background: 'none', border: 'none', padding: '2px 6px',
              fontFamily: 'var(--font-system)', fontSize: '11px', cursor: 'pointer',
              color: 'var(--win-text)',
            }}>{m}</button>
          ))}
        </div>

        {/* Body */}
        <div style={{ padding: '20px', background: 'var(--win-gray)' }}>

          {/* Header area with icon */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
            <div style={{ flexShrink: 0 }}>
              <div style={{
                width: '48px', height: '48px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '36px', lineHeight: 1,
              }}>
                📄
              </div>
            </div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 700, marginBottom: '4px', color: 'var(--win-text)' }}>
                Welcome to ResumeUp
              </div>
              <div style={{ fontSize: '11px', color: 'var(--win-text)', lineHeight: 1.5 }}>
                Build a professional resume in minutes — powered by AI,<br />
                designed for high school students ready to make their mark.
              </div>
            </div>
          </div>

          <hr className="win-separator" />

          {/* Feature list */}
          <div className="win-panel-inset" style={{ marginBottom: '12px', padding: '8px 12px' }}>
            <div style={{ fontWeight: 700, marginBottom: '6px', fontSize: '11px' }}>This wizard will help you:</div>
            {[
              { icon: '✨', text: 'Choose a professional resume style' },
              { icon: '🎯', text: 'Select your job category' },
              { icon: '📝', text: 'Enter your information' },
              { icon: '🤖', text: 'Generate an AI-powered resume' },
              { icon: '📥', text: 'Download your finished resume' },
            ].map(f => (
              <div key={f.text} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', fontSize: '11px' }}>
                <span>{f.icon}</span>
                <span>{f.text}</span>
              </div>
            ))}
          </div>

          {/* Steps indicator */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, marginBottom: '6px' }}>Steps:</div>
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center', flexWrap: 'wrap' }}>
              {[
                { num: '1', label: 'Style' },
                { num: '2', label: 'Job Type' },
                { num: '3', label: 'Your Info' },
                { num: '4', label: 'AI Build' },
                { num: '5', label: 'Download' },
              ].map((step, i) => (
                <div key={step.num} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '4px',
                    background: 'var(--win-gray)', padding: '2px 8px',
                    border: '1px solid var(--win-border-dark)',
                    fontSize: '11px',
                  }}>
                    <span style={{ fontWeight: 700, color: 'var(--win-blue)' }}>{step.num}.</span>
                    <span>{step.label}</span>
                  </div>
                  {i < 4 && <span style={{ color: 'var(--win-text)', fontSize: '11px' }}>▶</span>}
                </div>
              ))}
            </div>
          </div>

          <hr className="win-separator" />

          {/* Info balloon */}
          <div className="win-balloon" style={{ marginBottom: '16px' }}>
            <span style={{ fontWeight: 700 }}>ℹ Free to use</span> · No account required · Takes less than 10 minutes
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <button className="win-btn-primary" onClick={onNext} style={{ minWidth: '120px', justifyContent: 'center' }}>
              Next &gt;
            </button>
            <button className="win-btn" style={{ minWidth: '80px', justifyContent: 'center' }}>
              Cancel
            </button>
          </div>
        </div>

        {/* Status bar */}
        <div className="win-statusbar">
          <div style={{
            borderTop: '1px solid var(--win-border-dark)', borderLeft: '1px solid var(--win-border-dark)',
            borderRight: '1px solid var(--win-hilight)', borderBottom: '1px solid var(--win-hilight)',
            padding: '1px 8px', flex: 1,
          }}>
            Ready
          </div>
          <div style={{
            borderTop: '1px solid var(--win-border-dark)', borderLeft: '1px solid var(--win-border-dark)',
            borderRight: '1px solid var(--win-hilight)', borderBottom: '1px solid var(--win-hilight)',
            padding: '1px 8px',
          }}>
            AI-Powered
          </div>
        </div>
      </div>
    </div>
  );
}
