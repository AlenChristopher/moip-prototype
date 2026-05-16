import React, { useState } from 'react'
import { RiskBadge, SectionTitle, riskColor } from '../shared/UI'
import { recommendations } from '../../data/factory'

function RecCard({ rec, expanded, onToggle }) {
  const color = riskColor(rec.priority)
  return (
    <div style={{
      background: '#0D1117',
      border: `1px solid ${expanded ? color + '55' : '#21262D'}`,
      borderRadius: 8,
      overflow: 'hidden',
      transition: 'border-color 0.2s',
    }}>
      {/* Header */}
      <div
        onClick={onToggle}
        style={{
          padding: '16px 20px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'flex-start',
          gap: 14,
          borderLeft: `3px solid ${color}`,
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <RiskBadge risk={rec.priority} />
            <span style={{ fontSize: 11, color: '#00D4FF', fontFamily: 'JetBrains Mono' }}>{rec.machine}</span>
            <span style={{ fontSize: 11, color: '#484F58', marginLeft: 'auto' }}>{rec.age}</span>
          </div>
          <div style={{ fontSize: 14, fontWeight: 500, color: '#E6EDF3', marginBottom: 4 }}>{rec.title}</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 11, color: '#8B949E' }}>
              Action: <span style={{ color: '#00D4FF' }}>{rec.action}</span>
            </span>
            <span style={{ fontSize: 11, color: '#8B949E' }}>
              ETA: <span style={{ color: '#FFB020' }}>{rec.eta}</span>
            </span>
            <span style={{ fontSize: 11, color: '#8B949E' }}>
              Impact: <span style={{ color: '#00E5A0' }}>{rec.impact}</span>
            </span>
          </div>
        </div>
        <div style={{
          width: 24, height: 24, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#484F58', fontSize: 16,
          transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s',
        }}>
          ▾
        </div>
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div style={{ padding: '0 20px 18px 23px', borderTop: '1px solid #161B22' }}>
          <div style={{ paddingTop: 14, fontSize: 13, color: '#8B949E', lineHeight: 1.7 }}>
            {rec.detail}
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
            <button style={{
              background: color + '22', color, border: `1px solid ${color}55`,
              borderRadius: 6, padding: '8px 18px', fontSize: 12, fontWeight: 500, cursor: 'pointer',
            }}>
              ✓ Acknowledge & assign
            </button>
            <button style={{
              background: 'transparent', color: '#8B949E', border: '1px solid #30363D',
              borderRadius: 6, padding: '8px 18px', fontSize: 12, cursor: 'pointer',
            }}>
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Recommendations() {
  const [expanded, setExpanded] = useState('rec_01')

  const critical = recommendations.filter(r => r.priority === 'CRITICAL').length
  const high      = recommendations.filter(r => r.priority === 'HIGH').length

  return (
    <div style={{ padding: '24px 28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <SectionTitle accent>Recommendation queue</SectionTitle>
          <div style={{ fontSize: 12, color: '#8B949E' }}>
            Ranked by urgency × impact ·{' '}
            <span style={{ color: '#FF4560' }}>{critical} CRITICAL</span> ·{' '}
            <span style={{ color: '#FFB020' }}>{high} HIGH</span>
          </div>
        </div>
        <div style={{
          fontSize: 11, color: '#8B949E',
          background: '#161B22', borderRadius: 6, padding: '6px 12px',
        }}>
          Adoption rate this shift: <span style={{ color: '#00E5A0', fontFamily: 'JetBrains Mono' }}>62%</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {recommendations.map(rec => (
          <RecCard
            key={rec.id}
            rec={rec}
            expanded={expanded === rec.id}
            onToggle={() => setExpanded(expanded === rec.id ? null : rec.id)}
          />
        ))}
      </div>

      {/* Legend */}
      <div style={{
        marginTop: 20, padding: '14px 18px',
        background: '#0D1117', border: '1px solid #21262D', borderRadius: 8,
        fontSize: 12, color: '#8B949E', lineHeight: 1.7,
      }}>
        <span style={{ color: '#E6EDF3', fontWeight: 500 }}>How recommendations are generated:</span>{' '}
        Each recommendation is triggered when a KPI crosses a threshold — health score drops below 50,
        bottleneck sustained for more than 15 minutes, or a pattern is detected across 3+ shifts.
        Priority is weighted by urgency × estimated OEE impact. Every recommendation links to the
        specific data event that triggered it.
      </div>
    </div>
  )
}
