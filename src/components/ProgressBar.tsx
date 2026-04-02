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
      background: 'var(--win-gray)',
      borderBottom: '2px solid var(--win-border-dark)',
      fontFamily: 'var(--font-system)',
    }}>
      {/* Titlebar strip */}
      <div style={{
        background: 'linear-gradient(to right, var(--win-titlebar-start), var(--win-titlebar-end))',
        color: 'white',
        padding: '3px 8px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '11px',
        fontWeight: 700,
      }}>
        <span>📄</span>
        <span>ResumeUp — AI Resume Builder</span>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 400 }}>
          <span style={{ opacity: 0.8 }}>
            Step: {screenLabels[currentScreen]}  ({currentScreen} / {totalScreens - 1})
          </span>
        </div>
      </div>

      {/* Progress track */}
      <div style={{ padding: '4px 8px 4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '11px', whiteSpace: 'nowrap' }}>Progress:</span>
        <div className="win-progress-track" style={{ flex: 1 }}>
          <div className="win-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <span style={{ fontSize: '11px', whiteSpace: 'nowrap', minWidth: '32px' }}>
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
}
