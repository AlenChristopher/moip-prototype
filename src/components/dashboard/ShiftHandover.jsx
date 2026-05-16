import React from 'react'
import { SectionTitle } from '../shared/UI'
import { shiftHandover } from '../../data/factory'

export default function ShiftHandover() {
  const h = shiftHandover
  const pct = ((h.unitsGood / h.target) * 100).toFixed(1)

  return (
    <div style={{ padding: '24px 28px' }}>
      <SectionTitle accent>Auto-generated shift handover report</SectionTitle>
      <div style={{ fontSize: 12, color: '#8B949E', marginBottom: 20 }}>
        Generated 30 minutes before shift end · delivered to oncoming supervisor via Teams + email
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

        {/* Shift summary */}
        <div style={{ background: '#0D1117', border: '1px solid #21262D', borderRadius: 8, padding: '20px 22px' }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: '#E6EDF3', marginBottom: 16 }}>Shift summary</div>
          {[
            { label: 'Shift',          value: h.shift },
            { label: 'Supervisor',     value: h.supervisor },
            { label: 'Units good',     value: `${h.unitsGood.toLocaleString()} / ${h.target.toLocaleString()}` },
            { label: 'Target adherence', value: `${pct}%` },
            { label: 'Total downtime', value: `${h.totalDowntime} min` },
            { label: 'Open recs',      value: `${h.openRecs} unresolved` },
          ].map(item => (
            <div key={item.label} style={{
              display: 'flex', justifyContent: 'space-between',
              padding: '9px 0', borderBottom: '1px solid #161B22',
            }}>
              <span style={{ fontSize: 12, color: '#8B949E' }}>{item.label}</span>
              <span style={{ fontSize: 12, color: '#E6EDF3', fontFamily: 'JetBrains Mono' }}>{item.value}</span>
            </div>
          ))}

          {/* Burn-down bar */}
          <div style={{ marginTop: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 11, color: '#8B949E' }}>Shift target progress</span>
              <span style={{ fontSize: 11, color: '#FFB020', fontFamily: 'JetBrains Mono' }}>{pct}%</span>
            </div>
            <div style={{ height: 8, background: '#21262D', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{
                height: '100%', width: `${pct}%`,
                background: parseFloat(pct) >= 90 ? '#00E5A0' : '#FFB020',
                borderRadius: 4, transition: 'width 1s ease',
              }} />
            </div>
          </div>
        </div>

        {/* Critical notes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{
            background: 'rgba(255,69,96,0.06)',
            border: '1px solid rgba(255,69,96,0.35)',
            borderRadius: 8, padding: '18px 20px',
          }}>
            <div style={{ fontSize: 12, color: '#FF4560', fontWeight: 500, marginBottom: 8 }}>
              ⚠ Critical issue — action required
            </div>
            <div style={{ fontSize: 13, color: '#E6EDF3', lineHeight: 1.7 }}>
              {h.topIssue}
            </div>
          </div>

          <div style={{
            background: '#0D1117', border: '1px solid #21262D',
            borderRadius: 8, padding: '18px 20px', flex: 1,
          }}>
            <div style={{ fontSize: 12, color: '#00D4FF', fontWeight: 500, marginBottom: 8 }}>
              Notes for oncoming shift
            </div>
            <div style={{ fontSize: 13, color: '#8B949E', lineHeight: 1.7 }}>
              {h.forOncoming}
            </div>
          </div>

          {/* Acknowledgement */}
          <div style={{
            background: '#0D1117', border: '1px solid #21262D',
            borderRadius: 8, padding: '14px 18px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div>
              <div style={{ fontSize: 12, color: '#8B949E' }}>Handover status</div>
              <div style={{ fontSize: 13, color: '#FFB020', marginTop: 2 }}>⏳ Awaiting oncoming supervisor</div>
            </div>
            <button style={{
              background: 'rgba(0,212,255,0.1)', color: '#00D4FF',
              border: '1px solid rgba(0,212,255,0.35)', borderRadius: 6,
              padding: '8px 16px', fontSize: 12, cursor: 'pointer',
            }}>
              Acknowledge handover
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
