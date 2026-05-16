// Realistic fake data — designed to look exactly like a live factory

export const plantMeta = {
  name: 'Gothenburg Plant 1',
  line: 'Assembly Line A',
  shift: 'Morning Shift  06:00 – 14:00',
  date: 'Mon 12 May 2025',
}

export const kpiSummary = {
  oee:        71.3,
  throughput: 847,
  targetThroughput: 980,
  downtime:   4.8,
  activeAlerts: 3,
  mtbf:       38.4,
  mttr:       22.0,
  fpy:        96.2,
}

export const oeeBreakdown = {
  availability: 88.4,
  performance:  83.9,
  quality:      96.2,
}

// Last 9 hours throughput
export const throughputHistory = [
  { time: '06:00', actual: 94,  target: 109 },
  { time: '07:00', actual: 102, target: 109 },
  { time: '08:00', actual: 88,  target: 109 },
  { time: '09:00', actual: 79,  target: 109 },
  { time: '10:00', actual: 91,  target: 109 },
  { time: '11:00', actual: 103, target: 109 },
  { time: '12:00', actual: 97,  target: 109 },
  { time: '13:00', actual: 108, target: 109 },
  { time: '14:00', actual: 85,  target: 109 },
]

// Downtime reason Pareto
export const downtimePareto = [
  { reason: 'Mechanical failure',  minutes: 47, color: '#FF4560' },
  { reason: 'Material shortage',   minutes: 31, color: '#FFB020' },
  { reason: 'Changeover',          minutes: 24, color: '#00D4FF' },
  { reason: 'Operator delay',      minutes: 14, color: '#8B949E' },
  { reason: 'Quality rework',      minutes: 9,  color: '#00E5A0' },
]

// 6 machines — one CRITICAL, one HIGH, rest varying
export const machines = [
  {
    id: 'mch_01',
    name: 'Press-04',
    type: 'Hydraulic Press',
    station: 'Stamping Station 2',
    healthScore: 41,
    risk: 'CRITICAL',
    cycleTime: 28.4,
    taktTime: 26.0,
    downtimeToday: 47,
    failureFreq: 3.8,
    lastMaintenance: '18 days ago',
    mainFactor: 'Downtime rate 210% above 30-day baseline',
    subScores: { downtime: 8, failure: 9, stability: 8, quality: 9, maintenance: 7 },
    trend: [68, 63, 57, 52, 48, 44, 41],
    status: 'degrading',
  },
  {
    id: 'mch_02',
    name: 'Welder-07',
    type: 'MIG Welding Unit',
    station: 'Welding Station 3',
    healthScore: 67,
    risk: 'HIGH',
    cycleTime: 34.1,
    taktTime: 35.0,
    downtimeToday: 18,
    failureFreq: 1.9,
    lastMaintenance: '9 days ago',
    mainFactor: 'Cycle time variance 1.4× machine-type median',
    subScores: { downtime: 16, failure: 13, stability: 11, quality: 14, maintenance: 13 },
    trend: [71, 70, 68, 68, 67, 67, 67],
    status: 'watch',
  },
  {
    id: 'mch_03',
    name: 'Robot-Arm-02',
    type: 'Pick & Place Robot',
    station: 'Assembly Station 1',
    healthScore: 84,
    risk: 'LOW',
    cycleTime: 12.2,
    taktTime: 13.0,
    downtimeToday: 4,
    failureFreq: 0.4,
    lastMaintenance: '3 days ago',
    mainFactor: 'All sub-scores within baseline',
    subScores: { downtime: 22, failure: 21, stability: 17, quality: 14, maintenance: 10 },
    trend: [82, 83, 84, 84, 85, 84, 84],
    status: 'stable',
  },
  {
    id: 'mch_04',
    name: 'CNC-Mill-11',
    type: 'CNC Machining Centre',
    station: 'Machining Station 4',
    healthScore: 78,
    risk: 'MEDIUM',
    cycleTime: 91.3,
    taktTime: 90.0,
    downtimeToday: 11,
    failureFreq: 0.9,
    lastMaintenance: '6 days ago',
    mainFactor: 'Cycle time slightly above takt — monitor',
    subScores: { downtime: 20, failure: 19, stability: 14, quality: 13, maintenance: 12 },
    trend: [80, 80, 79, 79, 78, 78, 78],
    status: 'watch',
  },
  {
    id: 'mch_05',
    name: 'ConveyorB-3',
    type: 'Belt Conveyor',
    station: 'Transfer Station 5',
    healthScore: 91,
    risk: 'LOW',
    cycleTime: 8.1,
    taktTime: 8.5,
    downtimeToday: 0,
    failureFreq: 0.1,
    lastMaintenance: '1 day ago',
    mainFactor: 'All sub-scores within baseline',
    subScores: { downtime: 24, failure: 24, stability: 18, quality: 14, maintenance: 11 },
    trend: [90, 91, 91, 91, 91, 91, 91],
    status: 'stable',
  },
  {
    id: 'mch_06',
    name: 'Inspect-Cam-01',
    type: 'Vision Inspection System',
    station: 'QC Station 6',
    healthScore: 88,
    risk: 'LOW',
    cycleTime: 5.2,
    taktTime: 5.5,
    downtimeToday: 2,
    failureFreq: 0.2,
    lastMaintenance: '5 days ago',
    mainFactor: 'All sub-scores within baseline',
    subScores: { downtime: 23, failure: 23, stability: 18, quality: 13, maintenance: 11 },
    trend: [87, 88, 88, 89, 88, 88, 88],
    status: 'stable',
  },
]

// Bottleneck heatmap stations
export const stations = [
  { id: 'st_01', name: 'Stamping-2',   score: 61, queue: 14, cycleVsTakt: '+9%',  bottleneck: false },
  { id: 'st_02', name: 'Welding-3',    score: 74, queue: 22, cycleVsTakt: '-3%',  bottleneck: false },
  { id: 'st_03', name: 'Assembly-1',   score: 22, queue: 3,  cycleVsTakt: '-6%',  bottleneck: false },
  { id: 'st_04', name: 'Assembly-3',   score: 95, queue: 41, cycleVsTakt: '+18%', bottleneck: true  },
  { id: 'st_05', name: 'Machining-4',  score: 55, queue: 11, cycleVsTakt: '+1%',  bottleneck: false },
  { id: 'st_06', name: 'Transfer-5',   score: 18, queue: 1,  cycleVsTakt: '-5%',  bottleneck: false },
  { id: 'st_07', name: 'QC-6',         score: 33, queue: 6,  cycleVsTakt: '-5%',  bottleneck: false },
  { id: 'st_08', name: 'Dispatch',     score: 28, queue: 4,  cycleVsTakt: '-8%',  bottleneck: false },
]

// Ranked recommendations
export const recommendations = [
  {
    id: 'rec_01',
    priority: 'CRITICAL',
    machine: 'Press-04',
    title: 'Schedule bearing inspection immediately',
    detail: 'Downtime rate 210% above 30-day baseline. Historical pattern: 3 prior failures of this type preceded complete bearing seizure within 72 hours. Estimated production loss if failure occurs unplanned: 4.2 hours.',
    action: 'Maintenance inspection',
    eta: 'Before next shift',
    impact: '+6.1 OEE pts if resolved',
    age: '38 min ago',
  },
  {
    id: 'rec_02',
    priority: 'HIGH',
    machine: 'Assembly-3',
    title: 'Rebalance operator allocation to clear queue',
    detail: 'Assembly Station 3 is the active bottleneck — queue depth 41 units and rising. Moving one operator from Transfer-5 (utilisation 61%) could reduce queue by est. 18 units/hr.',
    action: 'Staffing rebalance',
    eta: 'Within 30 minutes',
    impact: '+8% throughput recovery',
    age: '12 min ago',
  },
  {
    id: 'rec_03',
    priority: 'HIGH',
    machine: 'Welder-07',
    title: 'Inspect welding wire feed tension',
    detail: 'Cycle time CoV is 1.4× machine-type median. Wire feed tension inconsistency is the most common cause for this machine class. Pattern detected on 3 of last 5 shifts.',
    action: 'Operator check',
    eta: 'Next break window',
    impact: 'Prevent potential quality defects',
    age: '1 hr ago',
  },
  {
    id: 'rec_04',
    priority: 'MEDIUM',
    machine: 'CNC-Mill-11',
    title: 'Schedule preventive maintenance',
    detail: 'Cycle time is 1.4% above takt. Combined with 6-day maintenance age, this machine is entering the early-degradation zone per historical cohort data.',
    action: 'Preventive maintenance',
    eta: 'This week',
    impact: 'Maintain current OEE',
    age: '3 hr ago',
  },
]

// Active alerts feed
export const alerts = [
  { id: 'al_01', level: 'CRITICAL', machine: 'Press-04',   message: 'Downtime event #7 this shift — threshold exceeded',    time: '13:42' },
  { id: 'al_02', level: 'HIGH',     machine: 'Assembly-3', message: 'Queue depth 41 units — bottleneck confirmed',            time: '13:55' },
  { id: 'al_03', level: 'HIGH',     machine: 'Welder-07',  message: 'Cycle time variance breach — 3rd occurrence this shift', time: '12:18' },
  { id: 'al_04', level: 'INFO',     machine: 'Plant',      message: 'Shift on track for 847 units — 87% of 980 target',      time: '11:00' },
]

// Shift handover data
export const shiftHandover = {
  shift:       'Morning  06:00–14:00',
  supervisor:  'Shift Lead: K. Eriksson',
  unitsGood:   847,
  target:      980,
  adherence:   86.4,
  totalDowntime: 124,
  topIssue:    'Press-04 bearing degradation — critical. DO NOT defer inspection.',
  openRecs:    4,
  forOncoming: 'Assembly-3 queue at 41 — rebalance ops immediately. Press-04 inspection is priority 1.',
}
