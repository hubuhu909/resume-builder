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

    // Animated progress
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
      setStatusMsg('Your resume is ready! 🎉');

      onResumeChange(resumeData.content || '');
      setEditContent(resumeData.content || '');
      if (coverData) {
        // handled by parent
      }

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
    <div style={{ minHeight: '100vh', background: 'var(--cream)', padding: '32px 24px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
          <button className="btn-outline" onClick={onBack} style={{ padding: '8px 16px', fontSize: '13px' }}>
            <ArrowLeft size={14} /> Back
          </button>
          <div style={{ flex: 1 }}>
            <div className="section-label">Step 4 of 4</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 900, color: 'var(--navy)', margin: '2px 0 0' }}>
              Your AI-Generated Resume
            </h2>
          </div>
        </div>

        {isGenerating ? (
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '80px 40px',
            textAlign: 'center',
            border: '1.5px solid #ede9e0',
          }}>
            {/* Animated progress */}
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'rgba(201,168,76,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 28px',
              animation: 'pulse 2s ease-in-out infinite',
            }}>
              <span style={{ fontSize: '36px' }}>✨</span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--navy)', margin: '0 0 8px' }}>
              Building Your Resume...
            </h3>
            <p style={{ color: '#7a7268', margin: '0 0 32px', fontSize: '15px' }}>{statusMsg}</p>

            {/* Progress bar */}
            <div style={{ background: '#f0ece6', borderRadius: '100px', height: '8px', maxWidth: '400px', margin: '0 auto 12px', overflow: 'hidden' }}>
              <div
                className="progress-bar"
                style={{ width: `${progress}%`, height: '100%', borderRadius: '100px', transition: 'width 0.8s ease' }}
              />
            </div>
            <p style={{ fontSize: '13px', color: '#b0a898', margin: 0 }}>{progress}% complete</p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '24px' }}>
              <span className="loading-dot" />
              <span className="loading-dot" />
              <span className="loading-dot" />
            </div>
          </div>
        ) : (
          <>
            {/* Tab bar */}
            {config.includeCoverLetter && (
              <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                {(['resume', 'cover'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      padding: '8px 20px',
                      borderRadius: '8px',
                      border: 'none',
                      background: activeTab === tab ? 'var(--navy)' : 'white',
                      color: activeTab === tab ? 'white' : 'var(--ink)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '13px',
                      fontWeight: activeTab === tab ? 600 : 400,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {tab === 'resume' ? '📄 Resume' : '✉️ Cover Letter'}
                  </button>
                ))}
              </div>
            )}

            {/* Toolbar */}
            <div style={{
              display: 'flex',
              gap: '8px',
              marginBottom: '12px',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}>
              <button
                onClick={() => { setIsEditing(!isEditing); setEditContent(generatedResume); }}
                className="btn-outline"
                style={{ padding: '8px 16px', fontSize: '13px' }}
              >
                <Edit3 size={14} /> {isEditing ? 'Preview' : 'Edit HTML'}
              </button>
              <button
                onClick={generateResume}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '8px 16px', borderRadius: '8px', border: '1.5px solid #e2ddd5',
                  background: 'white', cursor: 'pointer', fontSize: '13px', fontFamily: 'var(--font-body)',
                }}
              >
                <RefreshCw size={14} /> Regenerate
              </button>
              <div style={{ flex: 1 }} />
              <span style={{ fontSize: '12px', color: '#9a9288', fontStyle: 'italic' }}>
                ✅ You can edit directly below
              </span>
            </div>

            {/* Resume display */}
            <div style={{
              background: 'white',
              borderRadius: '12px',
              border: '1.5px solid #ede9e0',
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              marginBottom: '24px',
            }}>
              {isEditing ? (
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderBottom: '1px solid #ede9e0',
                    background: '#f9f7f3',
                  }}>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--navy)' }}>Edit HTML Source</span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={handleSaveEdit} className="btn-primary" style={{ padding: '6px 14px', fontSize: '12px' }}>
                        <Save size={12} /> Save Changes
                      </button>
                      <button onClick={() => setIsEditing(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888' }}>
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                  <textarea
                    value={editContent}
                    onChange={e => setEditContent(e.target.value)}
                    style={{
                      width: '100%',
                      height: '600px',
                      padding: '16px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      lineHeight: '1.6',
                      border: 'none',
                      outline: 'none',
                      resize: 'vertical',
                      color: '#333',
                    }}
                  />
                </div>
              ) : (
                <iframe
                  ref={iframeRef}
                  style={{
                    width: '100%',
                    height: '700px',
                    border: 'none',
                  }}
                  title="Resume Preview"
                />
              )}
            </div>

            {/* Tip */}
            <div style={{
              background: 'rgba(201,168,76,0.08)',
              border: '1px solid rgba(201,168,76,0.25)',
              borderRadius: '10px',
              padding: '14px 18px',
              marginBottom: '24px',
              fontSize: '13px',
              color: '#6b5a28',
              lineHeight: 1.6,
            }}>
              💡 <strong>Tip:</strong> Use the AI chatbox in the bottom right to ask for specific improvements — like "make my experience section stronger" or "add more action verbs."
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn-gold" onClick={onNext} style={{ padding: '14px 32px', fontSize: '15px' }}>
                Download Resume <ArrowRight size={16} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
