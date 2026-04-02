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
      <div className="win-window" style={{ width: '100%', maxWidth: '520px' }}>

        {/* Titlebar */}
        <div className="win-titlebar">
          <span>📄</span>
          <span>ResumeUp — Download Your Resume</span>
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

        <div style={{ padding: '20px', background: 'var(--win-gray)' }}>

          {/* Celebration area */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
            <div style={{ fontSize: '48px', lineHeight: 1, flexShrink: 0 }}>🎉</div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 700, marginBottom: '4px' }}>
                Resume Complete!
              </div>
              <div style={{ fontSize: '11px', color: 'var(--win-text)', lineHeight: 1.5 }}>
                Your resume is ready, <strong>{data.firstName}</strong>!
                Download it below and start applying to jobs.
              </div>
            </div>
          </div>

          <hr className="win-separator" />

          {/* File info */}
          <div className="win-groupbox" style={{ marginBottom: '12px' }}>
            <span className="win-groupbox-label">File Details</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '32px' }}>📄</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: '11px' }}>
                  {data.firstName}_{data.lastName}_Resume.html
                </div>
                <div style={{ fontSize: '11px', color: '#555' }}>
                  {config.style.charAt(0).toUpperCase() + config.style.slice(1)} style · HTML Document · Print-ready
                </div>
                {downloaded && (
                  <div style={{ fontSize: '11px', color: 'green', fontWeight: 700, marginTop: '2px' }}>
                    ✓ Download complete
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Download buttons */}
          <div className="win-groupbox" style={{ marginBottom: '12px' }}>
            <span className="win-groupbox-label">Download Options</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <button
                className="win-btn-primary"
                onClick={downloadHTML}
                style={{ justifyContent: 'center', padding: '6px 16px', fontSize: '12px' }}
              >
                <Download size={14} />
                {downloaded ? 'Download Again (.html)' : 'Save Resume as .html File'}
              </button>
              <button
                className="win-btn"
                onClick={printResume}
                style={{ justifyContent: 'center', padding: '6px 16px', fontSize: '12px' }}
              >
                🖨️ Print / Save as PDF
              </button>
              <button
                className="win-btn"
                onClick={copyHTML}
                style={{ justifyContent: 'center', padding: '6px 16px', fontSize: '12px' }}
              >
                <Share2 size={12} />
                {copyDone ? 'Copied to Clipboard! ✓' : 'Copy HTML Source Code'}
              </button>
            </div>
          </div>

          {/* PDF instructions */}
          <div className="win-groupbox" style={{ marginBottom: '12px' }}>
            <span className="win-groupbox-label">How to save as PDF:</span>
            <ol style={{ margin: 0, paddingLeft: '16px', fontSize: '11px', color: '#333', lineHeight: 1.8 }}>
              <li>Click &quot;Print / Save as PDF&quot; above</li>
              <li>In the print dialog, set destination to <strong>&quot;Save as PDF&quot;</strong></li>
              <li>Click Save — done!</li>
            </ol>
          </div>

          {/* Tips */}
          <div className="win-groupbox" style={{ marginBottom: '16px' }}>
            <span className="win-groupbox-label">Job Application Tips</span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
              {[
                { icon: '📧', tip: 'Tailor your resume for each job' },
                { icon: '🔍', tip: 'Use keywords from the job description' },
                { icon: '✅', tip: 'Proofread at least twice before sending' },
                { icon: '💼', tip: 'Apply to 5+ jobs to improve chances' },
              ].map(t => (
                <div key={t.tip} style={{
                  background: 'var(--win-white)',
                  borderTop: '2px solid var(--win-border-dark)',
                  borderLeft: '2px solid var(--win-border-dark)',
                  borderRight: '2px solid var(--win-hilight)',
                  borderBottom: '2px solid var(--win-hilight)',
                  padding: '6px 8px',
                  fontSize: '11px',
                  color: '#333',
                  lineHeight: 1.4,
                }}>
                  <span style={{ marginRight: '4px' }}>{t.icon}</span>
                  {t.tip}
                </div>
              ))}
            </div>
          </div>

          <hr className="win-separator" />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              className="win-btn"
              onClick={onRestart}
              style={{ fontSize: '11px' }}
            >
              <RotateCcw size={11} /> Start Over
            </button>
            <div style={{ fontSize: '11px', color: '#555' }}>
              Good luck with your job search!
            </div>
          </div>
        </div>

        <div className="win-statusbar">
          <div style={{
            borderTop: '1px solid var(--win-border-dark)', borderLeft: '1px solid var(--win-border-dark)',
            borderRight: '1px solid var(--win-hilight)', borderBottom: '1px solid var(--win-hilight)',
            padding: '1px 8px', flex: 1,
          }}>
            {downloaded ? 'File saved successfully' : 'Ready to download'}
          </div>
          <div style={{
            borderTop: '1px solid var(--win-border-dark)', borderLeft: '1px solid var(--win-border-dark)',
            borderRight: '1px solid var(--win-hilight)', borderBottom: '1px solid var(--win-hilight)',
            padding: '1px 8px',
          }}>
            ResumeUp v1.0
          </div>
        </div>
      </div>
    </div>
  );
}
