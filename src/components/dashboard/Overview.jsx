import React from 'react'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  Tooltip, ResponsiveContainer, Cell,
} from 'recharts'
import { OeeGauge, StatCard, SectionTitle, riskColor } from '../shared/UI'
import { oeeBreakdown, downtimePareto, alerts } from '../../data/factory'
import { RiskBadge } from '../shared/UI'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: '#161B22', border: '1px solid #30363D', borderRadius: 6, padding: '8px 12px', fontSize: 12 }}>
      <div style={{ color: '#8B949E', marginBottom: 4 }}>{label}</div>
      {payload.map(p => (
        <div key={p.name} style={{ color: p.color, display: 'flex', gap: 8, justifyContent: 'space-between' }}>
          <span>{p.name}</span><span style={{ fontFamily: 'JetBrains Mono' }}>{p.value}</span>
        </div>
      ))}
    </div>
  )
}

export default function Overview({ kpi, history }) {
  return (
    <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Top KPI strip */}
      <div>
        <SectionTitle accent>Live plant KPIs</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr 1fr 1fr 1fr 1fr', gap: 12, alignItems: 'start' }}>
          {/* OEE gauge */}
          <div style={{
            background: '#0D1117', border: '1px solid #21262D', borderRadius: 8,
            padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <OeeGauge value={kpi.oee} size={130} />
          </div>

          <StatCard
            label="Throughput"
            value={kpi.throughput}
            unit="units"
            sub={`Target: ${kpi.targetThroughput} units`}
            color={kpi.throughput / kpi.targetThroughput > 0.9 ? '#00E5A0' : '#FFB020'}
          />
          <StatCard
            label="Downtime"
            value={kpi.downtime}
            unit="%"
            sub="Target: < 5.0%"
            color={kpi.downtime < 5 ? '#00E5A0' : '#FF4560'}
          />
          <StatCard
            label="First Pass Yield"
            value={kpi.fpy}
            unit="%"
            sub="Target: ≥ 97%"
            color={kpi.fpy >= 97 ? '#00E5A0' : '#FFB020'}
          />
          <StatCard
            label="MTBF"
            value={kpi.mtbf}
            unit="hr"
            sub="Rolling 90-day"
            color="#00D4FF"
          />
          <StatCard
            label="Active Alerts"
            value={kpi.activeAlerts}
            sub="2 require action"
            color={kpi.activeAlerts > 0 ? '#FF4560' : '#00E5A0'}
          />
        </div>
      </div>

      {/* OEE breakdown + Throughput chart */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 16 }}>

        {/* OEE breakdown */}
        <div style={{ background: '#0D1117', border: '1px solid #21262D', borderRadius: 8, padding: '18px 20px' }}>
          <SectionTitle accent>OEE breakdown</SectionTitle>
          {[
            { label: 'Availability', value: oeeBreakdown.availability, color: '#00E5A0' },
            { label: 'Performance',  value: oeeBreakdown.performance,  color: '#00D4FF' },
            { label: 'Quality',      value: oeeBreakdown.quality,       color: '#7F77DD' },
          ].map(item => (
            <div key={item.label} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: '#8B949E' }}>{item.label}</span>
                <span style={{ fontSize: 13, color: item.color, fontFamily: 'JetBrains Mono' }}>
                  {item.value}%
                </span>
              </div>
              <div style={{ height: 4, background: '#21262D', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${item.value}%`,
                  background: item.color,
                  borderRadius: 2,
                  transition: 'width 0.8s ease',
                }} />
              </div>
            </div>
          ))}
          <div style={{ marginTop: 12, padding: '10px 12px', background: '#161B22', borderRadius: 6 }}>
            <div style={{ fontSize: 11, color: '#8B949E' }}>World class OEE benchmark</div>
            <div style={{ fontSize: 13, color: '#00E5A0', marginTop: 2 }}>≥ 85.0%</div>
          </div>
        </div>

        {/* Throughput chart */}
        <div style={{ background: '#0D1117', border: '1px solid #21262D', borderRadius: 8, padding: '18px 20px' }}>
          <SectionTitle accent>Throughput — units/hour</SectionTitle>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={history} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="gradActual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#00D4FF" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#00D4FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" tick={{ fill: '#8B949E', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#8B949E', fontSize: 11 }} axisLine={false} tickLine={false} domain={[60, 120]} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="target" name="Target" stroke="#30363D" strokeDasharray="4 3"
                fill="none" strokeWidth={1} dot={false} />
              <Area type="monotone" dataKey="actual" name="Actual" stroke="#00D4FF"
                fill="url(#gradActual)" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: '#00D4FF' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Downtime Pareto + Alert feed */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

        {/* Downtime pareto */}
        <div style={{ background: '#0D1117', border: '1px solid #21262D', borderRadius: 8, padding: '18px 20px' }}>
          <SectionTitle accent>Downtime causes — this shift</SectionTitle>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={downtimePareto} layout="vertical" margin={{ top: 0, right: 40, bottom: 0, left: 0 }}>
              <XAxis type="number" tick={{ fill: '#8B949E', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="reason" tick={{ fill: '#8B949E', fontSize: 11 }} axisLine={false} tickLine={false} width={120} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="minutes" name="Minutes" radius={[0, 3, 3, 0]}>
                {downtimePareto.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Alert feed */}
        <div style={{ background: '#0D1117', border: '1px solid #21262D', borderRadius: 8, padding: '18px 20px' }}>
          <SectionTitle accent>Active alerts</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {alerts.map(alert => (
              <div key={alert.id} style={{
                display: 'flex', alignItems: 'flex-start', gap: 10,
                padding: '10px 12px',
                background: '#161B22',
                borderRadius: 6,
                borderLeft: `3px solid ${riskColor(alert.level)}`,
              }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                    <RiskBadge risk={alert.level} small />
                    <span style={{ fontSize: 11, color: '#00D4FF', fontFamily: 'JetBrains Mono' }}>
                      {alert.machine}
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: '#8B949E', lineHeight: 1.4 }}>{alert.message}</div>
                </div>
                <span style={{ fontSize: 11, color: '#484F58', fontFamily: 'JetBrains Mono', flexShrink: 0 }}>
                  {alert.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
