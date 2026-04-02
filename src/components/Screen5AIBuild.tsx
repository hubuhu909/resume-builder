'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, RefreshCw, Edit3, Save, X } from 'lucide-react';
import { ResumeData, ResumeConfig } from '@/types/resume';

interface Screen5Props {
  data: ResumeData;
  config: ResumeConfig;
  generatedResume: string;
  generatedCoverLetter: string;
  onResumeChange: (html: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Screen5AIBuild({
  data, config, generatedResume, generatedCoverLetter,
  onResumeChange, onNext, onBack
}: Screen5Props) {
  const [isGenerating, setIsGenerating] = useState(!generatedResume);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(generatedResume);
  const [activeTab, setActiveTab] = useState<'resume' | 'cover'>('resume');
  const [progress, setProgress] = useState(0);
  const [statusMsg, setStatusMsg] = useState('Analyzing your information...');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const statusMessages = [
    'Analyzing your information...',
    'Crafting compelling bullet points...',
    'Enhancing with powerful action verbs...',
    'Applying your chosen style...',
    'Adding final polish...',
    'Almost ready!',
  ];

  useEffect(() => {
    if (!generatedResume) {
      generateResume();
    }
  }, []);

  useEffect(() => {
    if (generatedResume && iframeRef.current) {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(`<!DOCTYPE html><html><head>
          <style>
            body { margin: 0; padding: 20px; font-family: sans-serif; background: white; }
            * { box-sizing: border-box; }
          </style>
        </head><body>${generatedResume}</body></html>`);
        doc.close();
      }
    }
  }, [generatedResume, isEditing]);

  const generateResume = async () => {
    setIsGenerating(true);
    setProgress(0);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      setProgress(Math.min(step * 15, 85));
      setStatusMsg(statusMessages[Math.min(step - 1, statusMessages.length - 1)]);
    }, 800);

    try {
      const [resumeRes, coverRes] = await Promise.all([
        fetch('/api/ai', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'generate-resume', resumeData: data, config }),
        }),
        config.includeCoverLetter
          ? fetch('/api/ai', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'generate-cover-letter', resumeData: data, config }),
          })
          : Promise.resolve(null),
      ]);

      const resumeData = await resumeRes.json();
      const coverData = coverRes ? await coverRes.json() : null;

      clearInterval(interval);
      setProgress(100);
      setStatusMsg('Your resume is ready!');

      onResumeChange(resumeData.content || '');
      setEditContent(resumeData.content || '');

      setTimeout(() => setIsGenerating(false), 600);
    } catch (err) {
      clearInterval(interval);
      setIsGenerating(false);
      console.error('Generation failed:', err);
    }
  };

  const handleSaveEdit = () => {
    onResumeChange(editContent);
    setIsEditing(false);
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
      <div className="win-window" style={{ width: '100%', maxWidth: '900px' }}>

        {/* Titlebar */}
        <div className="win-titlebar">
          <span>📄</span>
          <span>ResumeUp — Step 4 of 4: Your AI-Generated Resume</span>
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

        {/* Toolbar */}
        <div style={{
          background: 'var(--win-gray)',
          borderBottom: '1px solid var(--win-border-dark)',
          padding: '4px 8px',
          display: 'flex',
          gap: '2px',
          alignItems: 'center',
        }}>
          <button className="win-btn" onClick={onBack} style={{ padding: '3px 10px' }}>
            &lt; Back
          </button>
          <div style={{
            width: '1px',
            height: '20px',
            borderLeft: '1px solid var(--win-border-dark)',
            borderRight: '1px solid var(--win-hilight)',
            margin: '0 4px',
          }} />
          {!isGenerating && (
            <>
              <button
                className="win-btn"
                onClick={() => { setIsEditing(!isEditing); setEditContent(generatedResume); }}
                style={{ padding: '3px 10px' }}
              >
                <Edit3 size={12} /> {isEditing ? 'Preview' : 'Edit HTML'}
              </button>
              <button
                className="win-btn"
                onClick={generateResume}
                style={{ padding: '3px 10px' }}
              >
                <RefreshCw size={12} /> Regenerate
              </button>
            </>
          )}
          {config.includeCoverLetter && !isGenerating && (
            <>
              <div style={{
                width: '1px', height: '20px',
                borderLeft: '1px solid var(--win-border-dark)', borderRight: '1px solid var(--win-hilight)',
                margin: '0 4px',
              }} />
              <button
                className={activeTab === 'resume' ? 'win-btn' : 'win-btn'}
                onClick={() => setActiveTab('resume')}
                style={{
                  padding: '3px 10px',
                  background: activeTab === 'resume' ? 'var(--win-white)' : 'var(--win-gray)',
                }}
              >
                📄 Resume
              </button>
              <button
                className="win-btn"
                onClick={() => setActiveTab('cover')}
                style={{
                  padding: '3px 10px',
                  background: activeTab === 'cover' ? 'var(--win-white)' : 'var(--win-gray)',
                }}
              >
                ✉️ Cover Letter
              </button>
            </>
          )}
        </div>

        <div style={{ padding: '16px', background: 'var(--win-gray)' }}>

          {isGenerating ? (
            <div style={{ padding: '32px 20px', textAlign: 'center' }}>
              {/* Classic Win2k wait dialog */}
              <div style={{
                display: 'inline-block',
                marginBottom: '20px',
                fontSize: '48px',
                lineHeight: 1,
              }}>
                🤖
              </div>
              <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '6px' }}>
                Building Your Resume...
              </div>
              <div style={{ fontSize: '11px', color: '#555', marginBottom: '20px' }}>{statusMsg}</div>

              {/* Progress bar */}
              <div style={{ maxWidth: '400px', margin: '0 auto 8px' }}>
                <div className="win-progress-track">
                  <div className="win-progress-fill" style={{ width: `${progress}%` }} />
                </div>
              </div>
              <div style={{ fontSize: '11px', color: '#555', marginBottom: '16px' }}>
                {progress}% complete
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '4px' }}>
                <span className="loading-dot" />
                <span className="loading-dot" />
                <span className="loading-dot" />
              </div>

              <div className="win-balloon" style={{ maxWidth: '360px', margin: '20px auto 0', textAlign: 'left' }}>
                ℹ Please wait while AI generates your professional resume. This may take a moment.
              </div>
            </div>
          ) : (
            <>
              {/* Resume display */}
              <div style={{
                background: 'var(--win-white)',
                borderTop: '2px solid var(--win-border-dark)',
                borderLeft: '2px solid var(--win-border-dark)',
                borderRight: '2px solid var(--win-hilight)',
                borderBottom: '2px solid var(--win-hilight)',
                marginBottom: '12px',
                overflow: 'hidden',
              }}>
                {isEditing ? (
                  <div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '4px 8px',
                      background: 'var(--win-gray)',
                      borderBottom: '1px solid var(--win-border-dark)',
                    }}>
                      <span style={{ fontSize: '11px', fontWeight: 700 }}>Edit HTML Source</span>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <button onClick={handleSaveEdit} className="win-btn" style={{ padding: '2px 8px', fontSize: '11px' }}>
                          <Save size={10} /> Save
                        </button>
                        <button onClick={() => setIsEditing(false)} className="win-btn" style={{ padding: '2px 6px', fontSize: '11px' }}>
                          <X size={10} />
                        </button>
                      </div>
                    </div>
                    <textarea
                      value={editContent}
                      onChange={e => setEditContent(e.target.value)}
                      style={{
                        width: '100%',
                        height: '600px',
                        padding: '8px',
                        fontFamily: 'Courier New, monospace',
                        fontSize: '11px',
                        lineHeight: '1.4',
                        border: 'none',
                        outline: 'none',
                        resize: 'vertical',
                        color: '#000',
                        background: 'var(--win-white)',
                      }}
                    />
                  </div>
                ) : (
                  <iframe
                    ref={iframeRef}
                    style={{
                      width: '100%',
                      height: '650px',
                      border: 'none',
                      display: 'block',
                    }}
                    title="Resume Preview"
                  />
                )}
              </div>

              {/* Tip */}
              <div className="win-balloon" style={{ marginBottom: '12px' }}>
                <span style={{ fontWeight: 700 }}>ℹ Tip:</span> Use the AI Assistant in the bottom-right to ask for
                improvements — like &quot;make my experience section stronger&quot; or &quot;add more action verbs.&quot;
              </div>

              <hr className="win-separator" />

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button className="win-btn-primary" onClick={onNext} style={{ minWidth: '160px', justifyContent: 'center' }}>
                  Download Resume &gt;
                </button>
                <button className="win-btn" style={{ minWidth: '80px', justifyContent: 'center' }}>
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>

        <div className="win-statusbar">
          <div style={{
            borderTop: '1px solid var(--win-border-dark)', borderLeft: '1px solid var(--win-border-dark)',
            borderRight: '1px solid var(--win-hilight)', borderBottom: '1px solid var(--win-hilight)',
            padding: '1px 8px', flex: 1,
          }}>
            {isGenerating ? `Generating... ${progress}%` : 'Resume generated successfully'}
          </div>
          <div style={{
            borderTop: '1px solid var(--win-border-dark)', borderLeft: '1px solid var(--win-border-dark)',
            borderRight: '1px solid var(--win-hilight)', borderBottom: '1px solid var(--win-hilight)',
            padding: '1px 8px',
          }}>
            Style: {config.style}
          </div>
        </div>
      </div>
    </div>
  );
}
