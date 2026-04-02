'use client';

interface ProgressBarProps {
  currentScreen: number;
  totalScreens: number;
}

const screenLabels = ['Welcome', 'Style', 'Job Type', 'Your Info', 'AI Build', 'Download'];

export default function ProgressBar({ currentScreen, totalScreens }: ProgressBarProps) {
  if (currentScreen === 0) return null;

  const progress = ((currentScreen) / (totalScreens - 1)) * 100;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 999,
      background: 'rgba(255,252,245,0.95)',
      backdropFilter: 'blur(8px)',
      borderBottom: '1px solid rgba(0,0,0,0.06)',
      padding: '10px 24px',
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
      }}>
        {/* Logo */}
        <div style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '15px',
          color: 'var(--navy)',
          flexShrink: 0,
        }}>
          ResumeUp
        </div>

        {/* Progress track */}
        <div style={{ flex: 1, position: 'relative' }}>
          <div style={{
            background: '#e8e4de',
            borderRadius: '100px',
            height: '4px',
            overflow: 'hidden',
          }}>
            <div
              className="progress-bar"
              style={{ width: `${progress}%`, height: '100%' }}
            />
          </div>
        </div>

        {/* Step label */}
        <div style={{
          fontSize: '12px',
          color: '#9a9288',
          fontWeight: 500,
          flexShrink: 0,
        }}>
          {screenLabels[currentScreen]} · {currentScreen}/{totalScreens - 1}
        </div>
      </div>
    </div>
  );
}
