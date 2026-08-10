import React from 'react'

// ── Color helpers ─────────────────────────────────────────────────────────────

export function riskColor(risk) {
  return { CRITICAL:'#EF4444', HIGH:'#F59E0B', MEDIUM:'#60A5FA', LOW:'#22C55E', INFO:'#64748B' }[risk] || '#64748B'
}

export function riskBg(risk) {
  return {
    CRITICAL: 'rgba(239,68,68,0.08)',
    HIGH:     'rgba(245,158,11,0.08)',
    MEDIUM:   'rgba(96,165,250,0.08)',
    LOW:      'rgba(34,197,94,0.07)',
    INFO:     'rgba(100,116,139,0.08)',
  }[risk] || 'transparent'
}

export function scoreColor(score) {
  if (score < 50) return '#EF4444'
  if (score < 70) return '#F59E0B'
  if (score < 85) return '#60A5FA'
  return '#22C55E'
}

// ── Risk badge ────────────────────────────────────────────────────────────────

export function RiskBadge({ risk, small }) {
  const color = riskColor(risk)
  return (
    <span style={{
      color,
      background: riskBg(risk),
      border: `1px solid ${color}30`,
      borderRadius: 3,
      fontSize: small ? 10 : 11,
      fontWeight: 500,
      padding: small ? '1px 5px' : '2px 7px',
      letterSpacing: '0.06em',
      fontFamily: 'var(--font-mono)',
      textTransform: 'uppercase',
    }}>
      {risk}
    </span>
  )
}

// ── Section title ─────────────────────────────────────────────────────────────

export function SectionTitle({ children }) {
  return (
    <div style={{
      fontSize: 11,
      fontWeight: 500,
      color: 'var(--dim)',
      letterSpacing: '0.09em',
      textTransform: 'uppercase',
      marginBottom: 12,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    }}>
      <div style={{ width: 2, height: 12, background: 'var(--green)', borderRadius: 1 }} />
      {children}
    </div>
  )
}

// ── KPI stat card ─────────────────────────────────────────────────────────────

export function StatCard({ label, value, unit, sub, color }) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 6,
      padding: '14px 16px',
    }}>
      <div style={{ fontSize: 11, color: 'var(--dim)', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 6 }}>
        {label}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
        <span style={{
          fontSize: 26,
          fontWeight: 500,
          color: color || 'var(--text)',
          fontFamily: 'var(--font-mono)',
          letterSpacing: '-0.02em',
          transition: 'color 0.4s',
        }}>
          {value}
        </span>
        {unit && <span style={{ fontSize: 12, color: 'var(--dim)', fontFamily: 'var(--font-sans)' }}>{unit}</span>}
      </div>
      {sub && <div style={{ fontSize: 11, color: 'var(--dim)', marginTop: 3 }}>{sub}</div>}
    </div>
  )
}

// ── OEE circular gauge ────────────────────────────────────────────────────────

export function OeeGauge({ value, size = 110 }) {
  const r    = (size / 2) - 9
  const circ = 2 * Math.PI * r
  const pct  = Math.min(1, Math.max(0, value / 100))
  const color = value >= 80 ? '#22C55E' : value >= 65 ? '#60A5FA' : '#F59E0B'

  return (
    <svg width={size} height={size}>
      <circle cx={size/2} cy={size/2} r={r}
        fill="none" stroke="var(--border2)" strokeWidth={6} />
      <circle cx={size/2} cy={size/2} r={r}
        fill="none" stroke={color} strokeWidth={6}
        strokeDasharray={circ}
        strokeDashoffset={circ * (1 - pct)}
        strokeLinecap="round"
        transform={`rotate(-90 ${size/2} ${size/2})`}
        style={{ transition: 'stroke-dashoffset 0.9s ease, stroke 0.5s ease' }}
      />
      <text x={size/2} y={size/2 - 3}
        textAnchor="middle" dominantBaseline="middle"
        fill={color} fontSize={size * 0.17} fontWeight={500}
        fontFamily="var(--font-mono)"
        style={{ transition: 'fill 0.5s ease' }}>
        {value.toFixed(1)}%
      </text>
      <text x={size/2} y={size/2 + 14}
        textAnchor="middle" dominantBaseline="middle"
        fill="var(--dim)" fontSize={11} fontFamily="var(--font-sans)">
        OEE
      </text>
    </svg>
  )
}

// ── Spark line ────────────────────────────────────────────────────────────────

export function SparkLine({ data, color = '#22C55E', width = 80, height = 28 }) {
  if (!data || data.length < 2) return null
  const min = Math.min(...data), max = Math.max(...data)
  const range = max - min || 1
  const pts = data.map((v, i) =>
    `${(i / (data.length - 1)) * width},${height - ((v - min) / range) * (height - 4) - 2}`
  ).join(' ')
  const last = pts.split(' ').pop().split(',')

  return (
    <svg width={width} height={height} overflow="visible">
      <polyline points={pts} fill="none" stroke={color} strokeWidth={1.5}
        strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={last[0]} cy={last[1]} r={2.5} fill={color} />
    </svg>
  )
}
