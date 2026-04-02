'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, ChevronDown } from 'lucide-react';
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

const WELCOME_MESSAGE = `Hi! 👋 I'm your AI resume coach! I'm here to help you craft the perfect resume.

Here are some things I can help with:
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
        content: "Oops! I had trouble connecting. Please try again in a moment! 🙏"
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
    "How do I make my experience stronger?",
    "What skills should I highlight?",
    "How do I write a good summary?",
    "Tips for my first job resume",
  ];

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => { setIsOpen(true); setHasNewMessage(false); }}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #1a2744 0%, #2d4068 100%)',
          border: 'none',
          cursor: 'pointer',
          display: isOpen ? 'none' : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(26, 39, 68, 0.4)',
          zIndex: 1000,
          transition: 'transform 0.2s ease',
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <MessageCircle size={24} color="white" />
        {hasNewMessage && (
          <span style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: '#e85d3a',
            border: '2px solid white',
          }} />
        )}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div
          className="animate-slide-in"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            width: '360px',
            height: isMinimized ? '56px' : '520px',
            background: '#fffcf5',
            borderRadius: '16px',
            boxShadow: '0 20px 60px rgba(15, 14, 23, 0.15), 0 4px 16px rgba(15, 14, 23, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 1000,
            transition: 'height 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            border: '1px solid #ede9e0',
          }}
        >
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #1a2744 0%, #2d4068 100%)',
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            flexShrink: 0,
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'rgba(201, 168, 76, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Sparkles size={16} color="#c9a84c" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: 'white', fontWeight: 600, fontSize: '14px', fontFamily: 'var(--font-body)' }}>
                AI Resume Coach
              </div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px' }}>
                Always here to help ✨
              </div>
            </div>
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.7)', display: 'flex' }}
            >
              <ChevronDown size={18} style={{ transform: isMinimized ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.7)', display: 'flex' }}
            >
              <X size={18} />
            </button>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}>
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}
                    style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start' }}
                  >
                    {msg.content}
                  </div>
                ))}

                {isLoading && (
                  <div className="chat-bubble-ai" style={{ alignSelf: 'flex-start' }}>
                    <span className="loading-dot" />
                    <span className="loading-dot" />
                    <span className="loading-dot" />
                  </div>
                )}

                {/* Quick prompts */}
                {messages.length === 1 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '4px' }}>
                    {quickPrompts.map((prompt, i) => (
                      <button
                        key={i}
                        onClick={() => { setInput(prompt); inputRef.current?.focus(); }}
                        style={{
                          background: 'white',
                          border: '1px solid #ede9e0',
                          borderRadius: '8px',
                          padding: '8px 12px',
                          fontSize: '12px',
                          cursor: 'pointer',
                          textAlign: 'left',
                          color: '#1a2744',
                          fontFamily: 'var(--font-body)',
                          transition: 'all 0.15s ease',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = '#c9a84c'; e.currentTarget.style.background = '#fdf9ef'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = '#ede9e0'; e.currentTarget.style.background = 'white'; }}
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div style={{
                padding: '12px 16px',
                borderTop: '1px solid #ede9e0',
                display: 'flex',
                gap: '8px',
                alignItems: 'flex-end',
                background: 'white',
              }}>
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask anything about your resume..."
                  rows={1}
                  style={{
                    flex: 1,
                    border: '1.5px solid #e2ddd5',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    resize: 'none',
                    outline: 'none',
                    maxHeight: '80px',
                    overflow: 'auto',
                    lineHeight: '1.5',
                    color: 'var(--ink)',
                  }}
                  onFocus={e => { e.target.style.borderColor = '#c9a84c'; }}
                  onBlur={e => { e.target.style.borderColor = '#e2ddd5'; }}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: input.trim() && !isLoading ? '#1a2744' : '#e2ddd5',
                    border: 'none',
                    cursor: input.trim() && !isLoading ? 'pointer' : 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                    flexShrink: 0,
                  }}
                >
                  <Send size={15} color={input.trim() && !isLoading ? 'white' : '#a09a90'} />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
