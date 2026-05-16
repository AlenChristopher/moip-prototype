import React, { useState } from 'react'
import Sidebar from './components/shared/Sidebar'
import Overview from './components/dashboard/Overview'
import MachineHealth from './components/machines/MachineHealth'
import BottleneckView from './components/bottleneck/BottleneckView'
import Recommendations from './components/recommendations/Recommendations'
import ShiftHandover from './components/dashboard/ShiftHandover'
import { useLiveData } from './hooks/useLiveData'
import { recommendations } from './data/factory'

export default function App() {
  const [page, setPage] = useState('overview')
  const { kpi, machines, stations, history } = useLiveData()

  const criticalCount = recommendations.filter(r =>
    r.priority === 'CRITICAL' || r.priority === 'HIGH'
  ).length

  const pages = {
    overview:        <Overview kpi={kpi} history={history} />,
    machines:        <MachineHealth machines={machines} />,
    bottleneck:      <BottleneckView stations={stations} />,
    recommendations: <Recommendations />,
    handover:        <ShiftHandover />,
  }

  return (
    <div className="scanline" style={{ display: 'flex', minHeight: '100vh', background: '#080C10' }}>
      <Sidebar active={page} onNav={setPage} alertCount={criticalCount} />

      <main style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        {/* Top header bar */}
        <div style={{
          position: 'sticky', top: 0, zIndex: 10,
          background: 'rgba(8,12,16,0.92)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid #161B22',
          padding: '10px 28px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 7, height: 7, borderRadius: '50%',
              background: '#00E5A0',
              boxShadow: '0 0 6px #00E5A0',
              animation: 'pulse 2s infinite',
            }} />
            <span style={{ fontSize: 12, color: '#8B949E' }}>
              Live data · refreshes every 5s · demo mode
            </span>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            {[
              { label: 'OEE',       value: `${kpi.oee}%`,       color: kpi.oee >= 75 ? '#00E5A0' : '#FFB020' },
              { label: 'Units',     value: kpi.throughput,       color: '#00D4FF' },
              { label: 'Downtime',  value: `${kpi.downtime}%`,   color: kpi.downtime > 5 ? '#FF4560' : '#00E5A0' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 11, color: '#484F58' }}>{item.label}</span>
                <span style={{
                  fontSize: 12, fontWeight: 500,
                  color: item.color,
                  fontFamily: 'JetBrains Mono',
                  transition: 'color 0.3s',
                }}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Page content */}
        <div style={{ animation: 'fadeIn 0.25s ease' }}>
          {pages[page]}
        </div>
      </main>
    </div>
  )
}
