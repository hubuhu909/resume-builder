'use client';

import { Sparkles, FileText, MessageCircle, Download, ArrowRight } from 'lucide-react';

interface Screen1Props {
  onNext: () => void;
}

export default function Screen1Welcome({ onNext }: Screen1Props) {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--paper)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: '-200px',
        right: '-200px',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-100px',
        left: '-100px',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(26,39,68,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Nav */}
      <nav style={{
        padding: '20px 40px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
      }}>
        <div style={{
          width: '32px',
          height: '32px',
          background: 'var(--navy)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <FileText size={16} color="#c9a84c" />
        </div>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '18px',
          color: 'var(--navy)',
        }}>
          ResumeUp
        </span>
      </nav>

      {/* Hero */}
      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 24px',
        textAlign: 'center',
      }}>
        {/* Badge */}
        <div
          className="animate-fade-up"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(201,168,76,0.12)',
            border: '1px solid rgba(201,168,76,0.3)',
            borderRadius: '100px',
            padding: '6px 14px',
            marginBottom: '28px',
          }}
        >
          <Sparkles size={12} color="var(--gold)" />
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--gold)', letterSpacing: '0.05em' }}>
            AI-POWERED RESUME BUILDER
          </span>
        </div>

        {/* Headline */}
        <h1
          className="animate-fade-up delay-100"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(42px, 7vw, 80px)',
            fontWeight: 900,
            lineHeight: 1.05,
            color: 'var(--navy)',
            margin: '0 0 8px',
            maxWidth: '800px',
          }}
        >
          Your First Job
          <br />
          <span className="gradient-text">Starts Here.</span>
        </h1>

        <p
          className="animate-fade-up delay-200"
          style={{
            fontSize: '18px',
            color: '#6b6560',
            maxWidth: '500px',
            lineHeight: 1.7,
            margin: '20px auto 48px',
            fontWeight: 400,
          }}
        >
          Build a professional resume in minutes — powered by AI, designed for high school students ready to make their mark.
        </p>

        {/* CTA */}
        <div className="animate-fade-up delay-300">
          <button className="btn-gold" onClick={onNext} style={{ padding: '16px 40px', fontSize: '16px' }}>
            Build My Resume
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Feature pills */}
        <div
          className="animate-fade-up delay-400"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            justifyContent: 'center',
            marginTop: '48px',
          }}
        >
          {[
            { icon: '✨', text: 'AI-Enhanced Writing' },
            { icon: '🎨', text: '4 Professional Styles' },
            { icon: '💬', text: 'Live AI Coach' },
            { icon: '📥', text: 'Instant Download' },
          ].map((f) => (
            <div
              key={f.text}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'white',
                border: '1px solid #ede9e0',
                borderRadius: '100px',
                padding: '8px 16px',
                fontSize: '13px',
                color: 'var(--ink)',
                fontWeight: 500,
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}
            >
              <span>{f.icon}</span>
              <span>{f.text}</span>
            </div>
          ))}
        </div>

        {/* Steps */}
        <div
          className="animate-fade-up delay-500"
          style={{
            display: 'flex',
            gap: '4px',
            alignItems: 'center',
            marginTop: '64px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {[
            { num: '01', label: 'Choose Style' },
            { num: '02', label: 'Pick Your Job' },
            { num: '03', label: 'Fill Details' },
            { num: '04', label: 'AI Builds It' },
            { num: '05', label: 'Download!' },
          ].map((step, i) => (
            <div key={step.num} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 14px',
                borderRadius: '8px',
                background: 'white',
                border: '1px solid #ede9e0',
              }}>
                <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--gold)', fontFamily: 'var(--font-mono)' }}>
                  {step.num}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--ink)', fontWeight: 500 }}>{step.label}</span>
              </div>
              {i < 4 && <span style={{ color: '#ccc', fontSize: '16px', padding: '0 2px' }}>›</span>}
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '20px',
        fontSize: '12px',
        color: '#b0a898',
      }}>
        Free to use · No account required · Takes less than 10 minutes
      </footer>
    </div>
  );
}
