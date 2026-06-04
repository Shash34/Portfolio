import React from 'react';

const BackgroundNew = () => {
  const size = 580;
  const center = size / 2;
  const innerR = size * 0.11;
  const outerR = size * 0.47;
  const count = 28;
  const lines = [];
  for (let i = 0; i < count; i++) {
    const angle = (i * 360 / count) * (Math.PI / 180);
    lines.push({
      x1: center + innerR * Math.cos(angle),
      y1: center + innerR * Math.sin(angle),
      x2: center + outerR * Math.cos(angle),
      y2: center + outerR * Math.sin(angle),
    });
  }

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0,
      width: '100%', height: '100%',
      zIndex: -1,
      backgroundColor: '#f9fafb',
      backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 29px, rgba(203,213,225,0.35) 30px)`,
    }}>
      {/* Starburst centered on screen */}
      <div style={{
        position: 'absolute',
        top: '55%', left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        opacity: 0.08,
      }}>
        <svg width={size} height={size}>
          <circle cx={center} cy={center} r={innerR} fill="none" stroke="#0f172a" strokeWidth="1" strokeDasharray="3 3" />
          {lines.map((l, i) => (
            <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#0f172a" strokeWidth="0.8" strokeDasharray="5 5" />
          ))}
        </svg>
      </div>
    </div>
  );
};

export default BackgroundNew;
