'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Send, ChevronDown } from 'lucide-react';
import { ResumeData, ResumeConfig } from '@/types/resume';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatBoxProps {
  resumeData: ResumeData;
  config: ResumeConfig;
  currentScreen: number;
}

const WELCOME_MESSAGE = `Hello! I'm your AI Resume Assistant!

I can help you with:
• "How do I make my experience sound better?"
• "What skills should I add for retail jobs?"
• "How do I write a good objective statement?"

What would you like to improve?`;

export default function ChatBox({ resumeData, config, currentScreen }: ChatBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: WELCOME_MESSAGE }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const chatHistory = messages.slice(-8).map(m => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'chat',
          message: userMsg,
          resumeData,
          config,
          chatHistory,
        }),
      });

      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);

      if (!isOpen) setHasNewMessage(true);
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Error: Could not connect to AI assistant. Please try again.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickPrompts = [
    'How do I make my experience stronger?',
    'What skills should I highlight?',
    'How do I write a good summary?',
    'Tips for my first job resume',
  ];

  return (
    <>
      {/* Taskbar button */}
      {!isOpen && (
        <button
          onClick={() => { setIsOpen(true); setHasNewMessage(false); }}
          style={{
            position: 'fixed',
            bottom: '8px',
            right: '16px',
            background: 'var(--win-gray)',
            borderTop: '2px solid var(--win-hilight)',
            borderLeft: '2px solid var(--win-hilight)',
            borderRight: '2px solid var(--win-border-dark)',
            borderBottom: '2px solid var(--win-border-dark)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 10px',
            fontFamily: 'var(--font-system)',
            fontSize: '11px',
            fontWeight: 700,
            zIndex: 1000,
            color: 'var(--win-text)',
            minWidth: '140px',
          }}
        >
          <span>💬</span>
          <span>AI Resume Assistant</span>
          {hasNewMessage && (
            <span style={{
              background: 'red',
              color: 'white',
              borderRadius: '50%',
              width: '14px',
              height: '14px',
              fontSize: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              marginLeft: 'auto',
            }}>!</span>
          )}
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '8px',
            right: '16px',
            width: '340px',
            zIndex: 1000,
            fontFamily: 'var(--font-system)',
          }}
        >
          <div className="win-window" style={{ display: 'flex', flexDirection: 'column' }}>

            {/* Titlebar */}
            <div className="win-titlebar" style={{ flexShrink: 0 }}>
              <span style={{ fontSize: '12px' }}>💬</span>
              <span>AI Resume Assistant</span>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: '2px' }}>
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  style={{
                    width: 16, height: 14, background: 'var(--win-gray)',
                    borderTop: '1px solid #fff', borderLeft: '1px solid #fff',
                    borderRight: '1px solid #404040', borderBottom: '1px solid #404040',
                    fontSize: '9px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-system)', color: 'black', padding: 0,
                  }}
                >_</button>
                <button
                  onClick={() => setIsOpen(false)}
                  style={{
                    width: 16, height: 14, background: 'var(--win-gray)',
                    borderTop: '1px solid #fff', borderLeft: '1px solid #fff',
                    borderRight: '1px solid #404040', borderBottom: '1px solid #404040',
                    fontSize: '9px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-system)', color: 'black', padding: 0,
                  }}
                >✕</button>
              </div>
            </div>

            {/* Menu bar */}
            {!isMinimized && (
              <div style={{
                background: 'var(--win-gray)',
                borderBottom: '1px solid var(--win-border-dark)',
                padding: '2px 4px',
                display: 'flex',
                gap: '2px',
                flexShrink: 0,
              }}>
                {['File', 'View', 'Help'].map(m => (
                  <button key={m} style={{
                    background: 'none', border: 'none', padding: '1px 6px',
                    fontFamily: 'var(--font-system)', fontSize: '11px', cursor: 'pointer',
                    color: 'var(--win-text)',
                  }}>{m}</button>
                ))}
              </div>
            )}

            {!isMinimized && (
              <>
                {/* Messages area */}
                <div style={{
                  height: '340px',
                  overflowY: 'auto',
                  padding: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  background: 'var(--win-white)',
                  borderTop: '2px solid var(--win-border-dark)',
                  borderLeft: '2px solid var(--win-border-dark)',
                  borderRight: '2px solid var(--win-hilight)',
                  borderBottom: '2px solid var(--win-hilight)',
                  margin: '8px 8px 0',
                }}>
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}
                      style={{
                        alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                        whiteSpace: 'pre-wrap',
                      }}
                    >
                      {msg.role === 'assistant' && (
                        <div style={{ fontWeight: 700, fontSize: '10px', marginBottom: '2px', opacity: 0.7 }}>
                          AI Assistant:
                        </div>
                      )}
                      {msg.content}
                    </div>
                  ))}

                  {isLoading && (
                    <div className="chat-bubble-ai" style={{ alignSelf: 'flex-start' }}>
                      <div style={{ fontWeight: 700, fontSize: '10px', marginBottom: '2px', opacity: 0.7 }}>AI Assistant:</div>
                      <span className="loading-dot" />
                      <span className="loading-dot" />
                      <span className="loading-dot" />
                    </div>
                  )}

                  {/* Quick prompts */}
                  {messages.length === 1 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginTop: '4px' }}>
                      <div style={{ fontSize: '10px', color: '#555', fontWeight: 700 }}>Quick questions:</div>
                      {quickPrompts.map((prompt, i) => (
                        <button
                          key={i}
                          onClick={() => { setInput(prompt); inputRef.current?.focus(); }}
                          className="win-btn"
                          style={{
                            padding: '3px 8px',
                            fontSize: '11px',
                            textAlign: 'left',
                            justifyContent: 'flex-start',
                          }}
                        >
                          ▶ {prompt}
                        </button>
                      ))}
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input area */}
                <div style={{
                  padding: '6px 8px 8px',
                  background: 'var(--win-gray)',
                  display: 'flex',
                  gap: '4px',
                  alignItems: 'flex-end',
                }}>
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a question..."
                    rows={2}
                    className="win-input"
                    style={{
                      flex: 1,
                      resize: 'none',
                      maxHeight: '60px',
                      overflow: 'auto',
                      lineHeight: '1.4',
                      fontSize: '11px',
                    }}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim() || isLoading}
                    className="win-btn"
                    style={{
                      padding: '4px 8px',
                      opacity: input.trim() && !isLoading ? 1 : 0.5,
                      cursor: input.trim() && !isLoading ? 'pointer' : 'not-allowed',
                      height: '42px',
                      alignSelf: 'stretch',
                    }}
                  >
                    <Send size={12} />
                    <span style={{ fontSize: '10px' }}>Send</span>
                  </button>
                </div>
              </>
            )}

            {/* Statusbar */}
            <div className="win-statusbar" style={{ flexShrink: 0 }}>
              <div style={{
                borderTop: '1px solid var(--win-border-dark)', borderLeft: '1px solid var(--win-border-dark)',
                borderRight: '1px solid var(--win-hilight)', borderBottom: '1px solid var(--win-hilight)',
                padding: '1px 6px', flex: 1, fontSize: '10px',
              }}>
                {isLoading ? 'AI is typing...' : 'Ready'}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
