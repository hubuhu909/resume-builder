'use client';

import { useState } from 'react';
import { Download, FileText, RotateCcw, Share2, Check } from 'lucide-react';
import { ResumeData, ResumeConfig } from '@/types/resume';

interface Screen6Props {
  data: ResumeData;
  config: ResumeConfig;
  generatedResume: string;
  onRestart: () => void;
}

export default function Screen6Download({ data, config, generatedResume, onRestart }: Screen6Props) {
  const [downloaded, setDownloaded] = useState(false);
  const [copyDone, setCopyDone] = useState(false);

  const downloadHTML = () => {
    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.firstName} ${data.lastName} - Resume</title>
  <style>
    body { margin: 0; padding: 20px; background: white; }
    @page { margin: 15mm; size: letter; }
    @media print { body { padding: 0; } }
  </style>
</head>
<body>
  ${generatedResume}
</body>
</html>`;

    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.firstName}_${data.lastName}_Resume.html`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
  };

  const printResume = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`<!DOCTYPE html>
<html><head>
  <title>${data.firstName} ${data.lastName} - Resume</title>
  <style>
    body { margin: 0; padding: 0; }
    @page { margin: 12mm; size: letter; }
  </style>
</head>
<body>${generatedResume}</body>
</html>`);
      printWindow.document.close();
      setTimeout(() => printWindow.print(), 500);
    }
  };

  const copyHTML = () => {
    navigator.clipboard.writeText(generatedResume);
    setCopyDone(true);
    setTimeout(() => setCopyDone(false), 2000);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)', padding: '60px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: '560px', width: '100%', textAlign: 'center' }}>

        {/* Confetti-like celebration */}
        <div className="animate-fade-up" style={{ marginBottom: '32px' }}>
          <div style={{
            fontSize: '72px',
            marginBottom: '16px',
            filter: 'drop-shadow(0 8px 20px rgba(201,168,76,0.3))',
          }}>
            🎉
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '42px',
            fontWeight: 900,
            color: 'var(--navy)',
            margin: '0 0 8px',
          }}>
            You're Ready!
          </h2>
          <p style={{ fontSize: '17px', color: '#7a7268', margin: '0 0 8px' }}>
            Your resume is complete, <strong>{data.firstName}</strong>. 🚀
          </p>
          <p style={{ fontSize: '14px', color: '#9a9288', margin: 0 }}>
            Download it below and start applying to {data.firstName}'s dream jobs!
          </p>
        </div>

        {/* Download card */}
        <div
          className="animate-fade-up delay-100"
          style={{
            background: 'white',
            border: '1.5px solid #ede9e0',
            borderRadius: '16px',
            padding: '28px',
            marginBottom: '20px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px',
            background: '#f9f7f3',
            borderRadius: '10px',
            marginBottom: '20px',
          }}>
            <div style={{
              width: '44px',
              height: '44px',
              background: 'var(--navy)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <FileText size={22} color="#c9a84c" />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--navy)' }}>
                {data.firstName}_{data.lastName}_Resume.html
              </div>
              <div style={{ fontSize: '12px', color: '#9a9288' }}>
                {config.style.charAt(0).toUpperCase() + config.style.slice(1)} style • Print-ready
              </div>
            </div>
            {downloaded && (
              <div style={{
                marginLeft: 'auto',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: '#22c55e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Check size={13} color="white" strokeWidth={3} />
              </div>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button className="btn-gold" onClick={downloadHTML} style={{ justifyContent: 'center', padding: '14px' }}>
              <Download size={18} />
              {downloaded ? 'Download Again' : 'Download Resume (.html)'}
            </button>
            <button className="btn-primary" onClick={printResume} style={{ justifyContent: 'center', padding: '14px' }}>
              🖨️ Print as PDF
            </button>
            <button
              onClick={copyHTML}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                padding: '12px', borderRadius: '8px', border: '1.5px solid #e2ddd5',
                background: 'white', cursor: 'pointer', fontSize: '14px',
                fontFamily: 'var(--font-body)', fontWeight: 500, color: 'var(--ink)',
                transition: 'all 0.15s ease',
              }}
            >
              <Share2 size={15} />
              {copyDone ? 'Copied! ✓' : 'Copy HTML Code'}
            </button>
          </div>
        </div>

        {/* Tips */}
        <div
          className="animate-fade-up delay-200"
          style={{
            background: 'rgba(26,39,68,0.04)',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '24px',
            textAlign: 'left',
          }}
        >
          <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--navy)', marginBottom: '10px', marginTop: 0 }}>
            📌 How to save as PDF:
          </p>
          <ol style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: '#6b6560', lineHeight: 1.8 }}>
            <li>Click "Print as PDF" above</li>
            <li>In the print dialog, change destination to <strong>"Save as PDF"</strong></li>
            <li>Click Save — done! 🎯</li>
          </ol>
        </div>

        {/* Tips cards */}
        <div
          className="animate-fade-up delay-300"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
            marginBottom: '28px',
          }}
        >
          {[
            { emoji: '📧', tip: 'Tailor your resume for each job application' },
            { emoji: '🔍', tip: 'Use keywords from the job description' },
            { emoji: '✅', tip: 'Proofread at least twice before sending' },
            { emoji: '💼', tip: 'Apply to 5+ jobs to improve your chances' },
          ].map(t => (
            <div key={t.tip} style={{
              background: 'white',
              border: '1px solid #ede9e0',
              borderRadius: '10px',
              padding: '14px',
              fontSize: '12px',
              color: '#6b6560',
              lineHeight: 1.5,
              textAlign: 'left',
            }}>
              <span style={{ fontSize: '18px', display: 'block', marginBottom: '4px' }}>{t.emoji}</span>
              {t.tip}
            </div>
          ))}
        </div>

        <div className="animate-fade-up delay-400">
          <button
            onClick={onRestart}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#9a9288', fontSize: '13px', fontFamily: 'var(--font-body)',
              textDecoration: 'underline', textDecorationColor: 'transparent',
              transition: 'color 0.15s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--navy)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#9a9288'; }}
          >
            <RotateCcw size={13} /> Start over with a new resume
          </button>
        </div>
      </div>
    </div>
  );
}
