import React from 'react'
import { SectionTitle } from '../shared/UI'

function heatColor(score) {
  if (score >= 85) return { bg: 'rgba(255,69,96,0.18)',  border: '#FF4560', text: '#FF4560' }
  if (score >= 65) return { bg: 'rgba(255,176,32,0.14)', border: '#FFB020', text: '#FFB020' }
  if (score >= 40) return { bg: 'rgba(0,212,255,0.10)',  border: '#00D4FF', text: '#00D4FF' }
  return                   { bg: 'rgba(0,229,160,0.08)', border: '#00E5A0', text: '#00E5A0' }
}

function StationCell({ station }) {
  const c = heatColor(station.score)
  const isHot = station.score >= 85
  return (
    <div style={{
      background: c.bg,
      border: `1px solid ${c.border}${isHot ? '' : '66'}`,
      borderRadius: 8,
      padding: '16px 14px',
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      position: 'relative',
      boxShadow: isHot ? `0 0 20px ${c.border}22` : 'none',
      transition: 'all 0.5s ease',
      animation: isHot ? 'pulse-glow 2s ease-in-out infinite' : 'none',
    }}>
      {station.bottleneck && (
        <div style={{
          position: 'absolute', top: -8, right: 10,
          background: '#FF4560', color: '#fff',
          fontSize: 9, fontWeight: 700,
          padding: '2px 8px', borderRadius: 10,
          letterSpacing: '0.08em',
        }}>
          ACTIVE BOTTLENECK
        </div>
      )}
      <div style={{ fontSize: 13, fontWeight: 500, color: '#E6EDF3', fontFamily: 'JetBrains Mono' }}>
        {station.name}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontSize: 28, fontWeight: 500, color: c.text, fontFamily: 'JetBrains Mono', lineHeight: 1 }}>
            {station.score}
          </div>
          <div style={{ fontSize: 10, color: '#8B949E', marginTop: 2 }}>bottleneck score</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 18, fontWeight: 500, color: c.text, fontFamily: 'JetBrains Mono' }}>
            {station.queue}
          </div>
          <div style={{ fontSize: 10, color: '#8B949E' }}>queue depth</div>
        </div>
      </div>
      <div style={{
        padding: '4px 8px',
        background: 'rgba(0,0,0,0.3)',
        borderRadius: 4,
        fontSize: 11,
        color: station.cycleVsTakt.startsWith('+') ? '#FFB020' : '#00E5A0',
        fontFamily: 'JetBrains Mono',
      }}>
        {station.cycleVsTakt} vs takt
      </div>
    </div>
  )
}

export default function BottleneckView({ stations }) {
  const active = stations.find(s => s.bottleneck)

  return (
    <div style={{ padding: '24px 28px' }}>
      <div style={{ marginBottom: 20 }}>
        <SectionTitle accent>Dynamic bottleneck intelligence</SectionTitle>
        <div style={{ fontSize: 12, color: '#8B949E' }}>
          Station scores updated every 15 min · weighted composite: queue 40% · cycle time 30% · downtime 20% · variance 10%
        </div>
      </div>

      {/* Active bottleneck callout */}
      {active && (
        <div style={{
          background: 'rgba(255,69,96,0.08)',
          border: '1px solid rgba(255,69,96,0.4)',
          borderRadius: 8,
          padding: '16px 20px',
          marginBottom: 20,
          display: 'flex',
          gap: 20,
          alignItems: 'center',
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: 8,
            background: 'rgba(255,69,96,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 24, flexShrink: 0,
          }}>
            ⚠
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500, color: '#FF4560', marginBottom: 4 }}>
              Active bottleneck detected — {active.name}
            </div>
            <div style={{ fontSize: 12, color: '#8B949E', lineHeight: 1.6 }}>
              Queue depth {active.queue} units and rising · cycle time {active.cycleVsTakt} above takt ·
              estimated throughput loss: <span style={{ color: '#FFB020' }}>+8 units/hr</span> if resolved.
              <br />Recommended action: <span style={{ color: '#00D4FF' }}>reallocate one operator from Transfer-5 (61% utilisation)</span>
            </div>
          </div>
        </div>
      )}

      {/* Heatmap grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
        {stations.map(station => (
          <StationCell key={station.id} station={station} />
        ))}
      </div>

      {/* Legend */}
      <div style={{
        display: 'flex', gap: 20, padding: '12px 16px',
        background: '#0D1117', borderRadius: 8, border: '1px solid #21262D',
        alignItems: 'center',
      }}>
        <span style={{ fontSize: 11, color: '#484F58' }}>SCORE SCALE</span>
        {[
          { range: '0–39',   label: 'LOW',      color: '#00E5A0' },
          { range: '40–64',  label: 'MODERATE', color: '#00D4FF' },
          { range: '65–84',  label: 'HIGH',     color: '#FFB020' },
          { range: '85–100', label: 'CRITICAL', color: '#FF4560' },
        ].map(item => (
          <div key={item.range} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: item.color }} />
            <span style={{ fontSize: 11, color: '#8B949E' }}>
              {item.range} <span style={{ color: item.color }}>{item.label}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
