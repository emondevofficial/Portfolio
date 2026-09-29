# Alex Mercer | Senior Full-Stack Engineer & Architect Portfolio CMS

A modern, highly responsive, full-stack personal portfolio and Content Management System (CMS) for a Senior Full-Stack Web & Software Developer. Powered by React 19, TypeScript, Tailwind CSS, Motion, and Google Cloud Firestore.

## 🚀 Key Features

- **Fully Dynamic CMS**: Every piece of portfolio data (biography, profile picture, social accounts, skills, technologies, projects, experiences, certifications, services, and testimonials) is stored in the database and manageable via a private Admin Dashboard.
- **Real-Time Data Persistence**: Synchronized in real time with Google Cloud Firestore (`onSnapshot`).
- **Private Admin Portal (`#admin` or `Ctrl+Shift+A`)**:
  - Secure authentication via Google Sign-In and Admin Passkey fallback.
  - Complete CRUD for Projects (with live/draft status, tags, and metrics).
  - Work Experience timeline manager.
  - Interactive Skills proficiency and Category filter configuration.
  - Consulting Services and Deliverables manager.
  - Education, Certifications, and Milestone Achievements CRUD.
  - Endorsements & Testimonials manager.
  - Social Links and profile coordinates editor.
  - Contact Inquiries Inbox with read/unread flags and direct email reply.
  - Dynamic Site Settings & SEO metadata editor (with individual section visibility toggles).
  - Media Assets library with one-click path copying.
  - One-click Initial Data Seed / Sync button to populate or reset Firestore.
- **Top Bar Contract**: Adheres strictly to the 3-zone clean top bar standard (Brand wordmark — 4–6 text navigation links — Action & Theme switch).
- **Zero-Pill Anti-Slop Design**: Typography-first metadata with clean separators (`·`), avoiding generic AI badges, mechanical comment headers, or fake telemetry widgets.
- **Accessible & Responsive**: Keyboard navigable dialogs, WCAG AA contrast, and `prefers-reduced-motion` compliance.
- **Interactive Resume / CV**: Clean printable and PDF-exportable modal with career milestones.
- **Direct Contact System**: Form with honeypot spam protection, client-side validation, rate limiting, and celebratory confetti animation upon transmission.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Motion (Framer Motion), Tailwind CSS
- **Icons**: Lucide React with Dynamic Icon Resolver
- **Database**: Google Cloud Firestore (provisioned via AI Studio)
- **Authentication**: Firebase Auth (Google Sign-In + Admin Passkey)
- **Effects**: Canvas Confetti

---

## 🔐 Admin Access

To access the private administration portal:
1. Navigate to the app URL with `#admin` appended (e.g. `https://your-app-url/#admin`).
2. Alternatively, press **`Ctrl + Shift + A`** (or **`Cmd + Shift + A`** on Mac) anywhere on the portfolio.
3. Sign in using either:
   - **Google Sign-In**: with the authorized administrator email (`deve3859@gmail.com`).
   - **Admin Passkey**: enter `admin2026` or your administrator email.

---

## 📂 Project Architecture

```
/
├── firebase-applet-config.json  # Firebase project credentials
├── firestore.rules              # Deployed Firestore security rules
├── firebase-blueprint.json      # Intermediate schema definition
├── src/
│   ├── assets/images/           # High-resolution generated visual assets
│   ├── components/
│   │   ├── admin/               # Full-featured CMS Dashboard & CRUD panels
│   │   ├── navbar/              # Top Bar Contract header
│   │   ├── hero/                # Split-screen hero & live availability
│   │   ├── about/               # Biography & developer counters
│   │   ├── skills/              # Categorized proficiencies & stack
│   │   ├── projects/            # Project showcase & detail modal
│   │   ├── experience/          # Career timeline with highlights
│   │   ├── services/            # Consulting offerings & deliverables
│   │   ├── credentials/         # Education, Certifications & Honors
│   │   ├── testimonials/        # Attributable endorsements
│   │   ├── resume/              # Printable CV modal
│   │   ├── contact/             # Inquiries form & coordinates
│   │   ├── footer/              # Minimal copyright & links
│   │   └── shared/              # DynamicIcon resolver
│   ├── context/
│   │   ├── AuthContext.tsx      # Admin authentication state
│   │   └── ThemeContext.tsx     # Dark / Light / System theme engine
│   ├── lib/
│   │   ├── firebase.ts          # Firebase SDK initialization
│   │   ├── initialData.ts       # Production-grade seed dataset
│   │   └── portfolioService.ts  # Real-time Firestore CRUD & subscriptions
│   ├── types/
│   │   └── portfolio.ts         # TypeScript data model contracts
│   ├── App.tsx                  # Main router and controller
│   ├── index.css                # Tailwind CSS v4 styling
│   └── main.tsx                 # React entry point
```

---

## ⚡ Development & Production Build

### Running Dev Server
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Linting & Type Checking
```bash
npm run lint
```
