import React, { useState } from 'react'
import { RiskBadge, SectionTitle, scoreColor, SparkLine } from '../shared/UI'

function HealthBar({ value, max = 25, label }) {
  const pct = Math.min(100, (value / max) * 100)
  const color = scoreColor((value / max) * 100)
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 11, color: '#8B949E' }}>{label}</span>
        <span style={{ fontSize: 11, color, fontFamily: 'JetBrains Mono' }}>{value}/{max}</span>
      </div>
      <div style={{ height: 3, background: '#21262D', borderRadius: 2 }}>
        <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 2, transition: 'width 0.6s ease' }} />
      </div>
    </div>
  )
}

function MachineCard({ machine, selected, onSelect }) {
  const color = scoreColor(machine.healthScore)
  const isSelected = selected === machine.id
  return (
    <div
      onClick={() => onSelect(isSelected ? null : machine.id)}
      style={{
        background: '#0D1117',
        border: `1px solid ${isSelected ? color + '66' : '#21262D'}`,
        borderRadius: 8,
        padding: '16px 18px',
        cursor: 'pointer',
        transition: 'border-color 0.2s, transform 0.15s',
        transform: isSelected ? 'scale(1.01)' : 'scale(1)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 500, color: '#E6EDF3', fontFamily: 'JetBrains Mono', marginBottom: 3 }}>
            {machine.name}
          </div>
          <div style={{ fontSize: 11, color: '#8B949E' }}>{machine.type}</div>
          <div style={{ fontSize: 11, color: '#484F58' }}>{machine.station}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
          <RiskBadge risk={machine.risk} />
          <div style={{
            fontSize: 26, fontWeight: 500, color, fontFamily: 'JetBrains Mono',
            transition: 'color 0.4s',
          }}>
            {machine.healthScore}
          </div>
          <div style={{ fontSize: 10, color: '#484F58' }}>/ 100</div>
        </div>
      </div>

      {/* Spark trend */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <span style={{ fontSize: 11, color: '#8B949E' }}>7-day trend</span>
        <SparkLine data={machine.trend} color={color} width={90} height={28} />
      </div>

      {/* Quick stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {[
          { label: 'Downtime today', value: `${machine.downtimeToday} min` },
          { label: 'Cycle vs takt',  value: `${machine.cycleTime}s / ${machine.taktTime}s` },
          { label: 'Failure freq',   value: `${machine.failureFreq}/100 cycles` },
          { label: 'Last maint.',    value: machine.lastMaintenance },
        ].map(item => (
          <div key={item.label} style={{ background: '#161B22', borderRadius: 5, padding: '7px 10px' }}>
            <div style={{ fontSize: 10, color: '#484F58', marginBottom: 2 }}>{item.label}</div>
            <div style={{ fontSize: 12, color: '#8B949E', fontFamily: 'JetBrains Mono' }}>{item.value}</div>
          </div>
        ))}
      </div>

      {/* Main factor */}
      <div style={{
        marginTop: 10,
        padding: '8px 10px',
        background: machine.risk === 'CRITICAL' ? 'rgba(255,69,96,0.06)' :
                    machine.risk === 'HIGH'     ? 'rgba(255,176,32,0.06)' : '#161B22',
        borderRadius: 5,
        borderLeft: `2px solid ${color}`,
        borderRadius: 0,
        borderRadius: '0 4px 4px 0',
      }}>
        <div style={{ fontSize: 10, color: '#8B949E', marginBottom: 2 }}>Top factor</div>
        <div style={{ fontSize: 11, color: '#E6EDF3' }}>{machine.mainFactor}</div>
      </div>

      {/* Expand prompt */}
      {isSelected && (
        <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid #21262D' }}>
          <div style={{ fontSize: 12, color: '#8B949E', marginBottom: 10 }}>Score breakdown (sub-scores)</div>
          <HealthBar value={machine.subScores.downtime}    max={25} label="Downtime trend (0–25)" />
          <HealthBar value={machine.subScores.failure}     max={25} label="Failure frequency (0–25)" />
          <HealthBar value={machine.subScores.stability}   max={20} label="Cycle stability (0–20)" />
          <HealthBar value={machine.subScores.quality}     max={15} label="Quality impact (0–15)" />
          <HealthBar value={machine.subScores.maintenance} max={15} label="Maintenance recency (0–15)" />
        </div>
      )}
    </div>
  )
}

export default function MachineHealth({ machines }) {
  const [selected, setSelected] = useState('mch_01') // open Press-04 by default

  const sorted = [...machines].sort((a, b) => a.healthScore - b.healthScore)
  const critical = sorted.filter(m => m.risk === 'CRITICAL').length
  const high     = sorted.filter(m => m.risk === 'HIGH').length

  return (
    <div style={{ padding: '24px 28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <SectionTitle accent>Machine health scores</SectionTitle>
          <div style={{ fontSize: 12, color: '#8B949E' }}>
            Composite 0–100 · updated every 15 min · {critical > 0 && <span style={{ color: '#FF4560' }}>{critical} CRITICAL </span>}
            {high > 0 && <span style={{ color: '#FFB020' }}>{high} HIGH</span>}
          </div>
        </div>
        <div style={{ fontSize: 11, color: '#484F58', fontFamily: 'JetBrains Mono' }}>
          Click any card to expand sub-scores
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        {sorted.map(machine => (
          <MachineCard
            key={machine.id}
            machine={machine}
            selected={selected}
            onSelect={setSelected}
          />
        ))}
      </div>
    </div>
  )
}
