# MOIP — Manufacturing Operational Intelligence Platform
### Prototype v1.0

> *"Most factories generate more data in one shift than their teams can read in a week. MOIP is what it looks like when that data actually talks back."*

---

## What is MOIP?

MOIP is a **concept prototype** for a manufacturing operational intelligence platform — the missing layer between factory data systems (ERP, MES, SCADA) and the decisions that production teams make every shift.

This prototype demonstrates the product vision, UX, and core intelligence modules with realistic simulated data. It is not connected to a live factory — it is a showcase of the **product concept, data model, and interaction design** behind a serious industrial product idea.

**Live demo →** [Your Vercel URL here]

---

## The Problem It Solves

| Today | With MOIP |
|-------|-----------|
| Downtime discovered 45 minutes late | Live alert within 30 seconds |
| Shift handover is verbal or paper | Auto-generated digital handover report |
| Bottleneck identified by walking the floor | Dynamic bottleneck heatmap, updated every 15 min |
| Machine fails without warning | Health score trending toward CRITICAL — inspection scheduled |
| Root cause analysis takes days | Correlated event chain surfaced in seconds |
| Dashboard shows data, not decisions | Ranked recommendation queue with owner + ETA |

---

## Prototype Modules

| Module | What it shows |
|--------|--------------|
| **Plant Overview** | Live OEE gauge, throughput chart, downtime Pareto, alert feed |
| **Machine Health** | 0–100 composite health score with sub-scores and 7-day trend |
| **Bottleneck Intelligence** | Dynamic station heatmap — identifies and explains the active constraint |
| **Recommendations** | Ranked, prioritised action queue with machine, rationale, and impact |
| **Shift Handover** | Auto-generated shift summary for oncoming supervisor |

---

## The Full Product Vision

This prototype represents **Phase 1 (MVP)** of a 4-phase product roadmap defined in a full [Product Requirements Document](./PRD_v2.0.md).

The complete platform includes:
- **15 modules** covering data integration, KPI computation, predictive maintenance (ML), AI assistant, simulation engine, and enterprise automation
- **Full data model** — 13 entities with defined schema, multi-tenant architecture, and Row Level Security
- **6 user personas** from shift operator (mobile PWA) to executive multi-site dashboard
- **Predictive intelligence layer** — ML models for failure prediction, throughput forecasting, and quality anomaly detection (requires 12 months of real operational data to train)

The platform cannot be built to production quality without:
1. **Real factory data** — predictive models require 12–24 months of labeled historical events
2. **ERP/MES integration budget** — SAP/D365 connectors are 3–6 month projects per customer
3. **Pilot customer** — operational intelligence only proves its value with real users making real decisions

This prototype exists to demonstrate the vision, validate the concept, and start that conversation.

---

## Tech Stack (Prototype)

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS |
| Charts | Recharts |
| Data | Realistic simulated JSON with live-ticking hooks |
| Deploy | Vercel |

**Production stack (planned):**
React/Next.js · ASP.NET Core 8 · PostgreSQL + TimescaleDB · Redis · Azure Service Bus · Python ML microservices · Microsoft Entra ID

---

## Running Locally

```bash
git clone https://github.com/YOUR_USERNAME/moip-prototype
cd moip-prototype
npm install
npm run dev
```

Open `http://localhost:5173`

---

## About This Project

Built by **Alen Christopher** as a product vision prototype.

Background: 
- Researched and documented a full industrial-grade PRD covering data model, KPI formulas, operator workflows, ML data strategy, risk register, and 4-phase roadmap
- Validated the product concept against both manufacturing engineering requirements and enterprise software architecture standards  
- Built this prototype to demonstrate what the product *feels like* before the industrial version can be built

**Open to conversations about:**
- Manufacturing technology and operational intelligence
- Product strategy and go-to-market for industrial SaaS
- Pilot partnerships with manufacturing operations teams

[LinkedIn](https://linkedin.com/in/YOUR_PROFILE) · [Email](mailto:YOUR_EMAIL)

---

*This is a prototype. All data is simulated. No real factory data is used or displayed.*
