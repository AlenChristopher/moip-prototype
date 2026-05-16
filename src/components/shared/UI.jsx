import React from 'react'

export function riskColor(risk) {
  return {
    CRITICAL: '#FF4560',
    HIGH:     '#FFB020',
    MEDIUM:   '#00D4FF',
    LOW:      '#00E5A0',
    INFO:     '#8B949E',
  }[risk] || '#8B949E'
}

export function riskBg(risk) {
  return {
    CRITICAL: 'rgba(255,69,96,0.12)',
    HIGH:     'rgba(255,176,32,0.12)',
    MEDIUM:   'rgba(0,212,255,0.10)',
    LOW:      'rgba(0,229,160,0.10)',
    INFO:     'rgba(139,148,158,0.10)',
  }[risk] || 'transparent'
}

export function scoreColor(score) {
  if (score < 50) return '#FF4560'
  if (score < 70) return '#FFB020'
  if (score < 85) return '#00D4FF'
  return '#00E5A0'
}

export function RiskBadge({ risk, small }) {
  const color = riskColor(risk)
  const bg    = riskBg(risk)
  return (
    <span style={{
      background: bg,
      color,
      border: `1px solid ${color}44`,
      borderRadius: 4,
      fontSize: small ? 10 : 11,
      fontWeight: 600,
      padding: small ? '1px 6px' : '2px 8px',
      letterSpacing: '0.05em',
      fontFamily: 'JetBrains Mono, monospace',
    }}>
      {risk}
    </span>
  )
}

export function StatCard({ label, value, unit, sub, color, animate }) {
  return (
    <div style={{
      background: '#0D1117',
      border: '1px solid #21262D',
      borderRadius: 8,
      padding: '16px 18px',
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
    }}>
      <span style={{ fontSize: 11, color: '#8B949E', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
        {label}
      </span>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
        <span style={{
          fontSize: 28,
          fontWeight: 500,
          color: color || '#E6EDF3',
          fontFamily: 'JetBrains Mono, monospace',
          transition: 'color 0.3s',
        }}>
          {value}
        </span>
        {unit && <span style={{ fontSize: 13, color: '#8B949E' }}>{unit}</span>}
      </div>
      {sub && <span style={{ fontSize: 12, color: '#8B949E' }}>{sub}</span>}
    </div>
  )
}

export function SectionTitle({ children, accent }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
      {accent && (
        <div style={{ width: 3, height: 18, background: '#00D4FF', borderRadius: 2 }} />
      )}
      <span style={{ fontSize: 13, fontWeight: 500, color: '#8B949E', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
        {children}
      </span>
    </div>
  )
}

// Thin horizontal divider
export function Divider() {
  return <div style={{ height: 1, background: '#161B22', margin: '4px 0' }} />
}

// Circular OEE gauge using SVG
export function OeeGauge({ value, size = 120 }) {
  const r = (size / 2) - 10
  const circ = 2 * Math.PI * r
  const pct  = Math.min(100, Math.max(0, value)) / 100
  const color = value >= 80 ? '#00E5A0' : value >= 65 ? '#00D4FF' : '#FFB020'

  return (
    <svg width={size} height={size} style={{ display: 'block' }}>
      <circle cx={size/2} cy={size/2} r={r}
        fill="none" stroke="#21262D" strokeWidth={8} />
      <circle cx={size/2} cy={size/2} r={r}
        fill="none" stroke={color} strokeWidth={8}
        strokeDasharray={circ}
        strokeDashoffset={circ * (1 - pct)}
        strokeLinecap="round"
        transform={`rotate(-90 ${size/2} ${size/2})`}
        style={{ transition: 'stroke-dashoffset 0.8s ease, stroke 0.4s ease' }}
      />
      <text x={size/2} y={size/2 - 4}
        textAnchor="middle" dominantBaseline="middle"
        fill={color} fontSize={size * 0.18} fontWeight={500}
        fontFamily="JetBrains Mono, monospace"
        style={{ transition: 'fill 0.4s ease' }}>
        {value.toFixed(1)}%
      </text>
      <text x={size/2} y={size/2 + 16}
        textAnchor="middle" dominantBaseline="middle"
        fill="#8B949E" fontSize={size * 0.09}>
        OEE
      </text>
    </svg>
  )
}

// Mini spark line using SVG
export function SparkLine({ data, color = '#00D4FF', width = 80, height = 32 }) {
  if (!data || data.length < 2) return null
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - ((v - min) / range) * height
    return `${x},${y}`
  }).join(' ')

  return (
    <svg width={width} height={height} style={{ display: 'block', overflow: 'visible' }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={pts.split(' ').pop().split(',')[0]}
              cy={pts.split(' ').pop().split(',')[1]}
              r={3} fill={color} />
    </svg>
  )
}
