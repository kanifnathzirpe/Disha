# DISHA (दिशा) — Maharashtra Skill Outcome Intelligence Platform

<div align="center">
  <img src="public/logo.png" alt="DISHA Logo" width="140" height="140" />

  ### महाराष्ट्र शासन | Government of Maharashtra
  **Department of Skills, Employment, Entrepreneurship & Innovation**

  [![Next.js](https://img.shields.io/badge/Next.js-16.3.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19.3.0-blue?style=for-the-badge&logo=react)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
</div>

---

## 📌 Overview

**DISHA (दिशा)** is an outcome-driven Skilling Intelligence and Workforce Analytics Platform engineered for the **State of Maharashtra**. It bridges the gap between skill development initiatives (DVET, MSSDS, ITIs), industrial job market demand, and trainee career outcomes.

Unlike traditional skilling portals that stop at course enrollment or certification, DISHA tracks long-term employment outcomes, verified wage progression, retention benchmarks, and real-time curriculum-industry alignment across all 36 districts of Maharashtra.

---

## 🌟 Key Stakeholder Desks

The platform delivers specialized, role-tailored dashboards and workflows for four primary ecosystem stakeholders:

### 1. 🏛️ Government Desk (`/government`)
* **State & District Intelligence**: Live geospatial monitoring of skilling metrics, placement rates, and wage medians across 36 Maharashtra districts.
* **Curriculum Mismatch Diagnostics**: AI-driven analysis comparing vocational curricula against active industry hiring requirements.
* **Demand Forecasting**: Predictive modeling of emerging skills across manufacturing, IT, logistics, healthcare, and green energy sectors.
* **Policy Simulator & What-If Sandbox**: Simulates budget allocation impact on placement velocity and district employment targets.
* **Audit & RTI Dossiers**: Downloadable and verifiable outcome reports for legislative and public oversight.

### 2. 🏢 Employer Desk (`/employer`)
* **Intelligent Talent Search**: Semantic candidate search matching certified skills against active job descriptions.
* **Outcome Matching Score**: Calibrated scoring taking into account verified practical assessments and ITI credentials.
* **Hiring & Retention Tracking**: Tracks hired candidates through 30-day, 90-day, and 180-day retention milestones.
* **Industry Demand & Feedback Submission**: Allows enterprises to directly feed skill shortages and curriculum gap feedback to government agencies.

### 3. 🎓 Training Institution & ITI Desk (`/institution`)
* **Batch Analytics**: Tracking of batch completions, attendance, and practical assessment performance.
* **Placement & Wage Audits**: Verification of alumni employment status and salary bands.
* **Curriculum Alignment**: Guidance on modernizing ITI trades (e.g., CNC Machining, Electric Mobility, Industrial Automation) based on regional industrial clusters.

### 4. 🚀 Trainee Desk (`/trainee`)
* **SkillQuest Gamified Learning**: Interactive diagnostic assessments and skill-level progression badges.
* **AI Mock Interview Copilot**: Domain-specific interview simulations with real-time feedback.
* **Verified Digital Credentials**: Tamper-proof digital skill certificates and transcript registry.
* **Career & Wage Progression**: Longitudinal tracking of salary growth from entry-level apprenticeship to senior technical roles.

---

## 🚀 Key Features

* **Bilingual Localization (English & मराठी)**: Instant toggle between English and Marathi across all UI components and data labels.
* **DISHA AI Assistant Copilot**: Built-in intelligent chat copilot offering contextual state skilling data, policy insights, and role-based guidance.
* **National & State Identity Alignment**: Built in compliance with Government of Maharashtra and Skill India Digital (SIDH) visual identity guidelines.
* **Global Search & Command Palette (`Ctrl + K`)**: Keyboard-first navigation to instantly jump to districts, trades, reports, or candidates.
* **Interactive Visualizations**: High-performance charts powered by Recharts for district comparisons, wage distributions, and sector trends.

---

## 🛠️ Technology Stack

* **Framework**: [Next.js 16.3.6 (Turbopack & App Router)](https://nextjs.org/)
* **UI Library**: [React 19](https://react.dev/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **Component Primitives**: [Radix UI](https://www.radix-ui.com/)
* **Icons**: [Lucide React](https://lucide.dev/)
* **Data Visualization**: [Recharts](https://recharts.org/)
* **Type System**: [TypeScript 6](https://www.typescriptlang.org/)

---

## 📂 Project Structure

```text
Disha/
├── app/
│   ├── employer/           # Employer portal (talent search, matching, retention)
│   ├── government/         # Government portal (district heatmap, policy sandbox, audit)
│   ├── institution/        # Training institution & ITI desk
│   ├── trainee/            # Trainee portal (SkillQuest, applications, credentials)
│   ├── login/              # Stakeholder gateway & role switcher
│   ├── layout.tsx          # Root layout with providers & metadata
│   └── page.tsx            # DISHA public landing page
├── components/
│   ├── charts/             # Reusable data visualization components
│   ├── common/             # AIAssistantWidget and shared widgets
│   ├── dashboard/          # MetricCard, stat displays, KPI cards
│   ├── employer/           # Employer-specific components
│   ├── government/         # District intelligence & policy tools
│   ├── landing/            # Landing page hero, sectors, and features
│   ├── layout/             # DashboardLayout with sidebar & masthead
│   ├── navigation/         # Sidebar, TopBar, Masthead, Footer, CommandPalette
│   ├── trainee/            # SkillQuest and candidate components
│   └── ui/                 # Reusable UI primitives (Button, Card, Modal, etc.)
├── context/
│   └── AppContext.tsx      # Language (en/mr), active role, and notification state
├── data/                   # Mock state data for Maharashtra districts, jobs, trades
├── public/                 # Static assets (logo.png, govlogo.png, hero images)
├── tailwind.config.ts      # Custom theme, typography, and government colors
└── package.json
```

---

## 💻 Getting Started

### Prerequisites

* **Node.js**: `v18.17.0` or higher (Node 20+ recommended)
* **npm**: `v9.0.0` or higher

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd Disha
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Open [http://localhost:3000](http://localhost:3000) to view the application.

### Available Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| **Development** | `npm run dev` | Launches Next.js dev server with Turbopack |
| **Build** | `npm run build` | Compiles an optimized production build |
| **Start** | `npm run start` | Runs the production build server |
| **Lint** | `npm run lint` | Runs TypeScript type-checking without emit |

---

## 🏛️ Ecosystem Alignment

DISHA is conceptually aligned with:
* **DVET** — Directorate of Vocational Education & Training, Maharashtra
* **MSSDS** — Maharashtra State Skill Development Society
* **MahaSwayam** — Integrated Employment and Skilling Portal
* **MSDE / SIDH** — Skill India Digital Hub (Ministry of Skill Development & Entrepreneurship)

---

## 📄 License

This project is developed for the **Department of Skills, Employment, Entrepreneurship & Innovation, Government of Maharashtra**. All rights reserved.
