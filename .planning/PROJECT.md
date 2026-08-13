# PROJECT: Thrust 5.0 Registration Website

## What This Is
A single-page registration website for "Thrust 5.0", an exclusive water rocket competition for first-year students organized by the Aero Fabrication Club at IIITDMJ. The site handles team registration by collecting all required form fields and directing to the Google Form backend.

## Core Value
A premium, high-impact landing + registration page that looks professional enough to match the event's prestige — converting visitors to registered teams instantly.

## Context
- **Event:** Thrust 5.0 — Water Rocket Competition
- **Organizer:** Aero Fabrication Club, IIITDMJ
- **Audience:** First-year engineering students
- **Tech Stack:** React + Tailwind CSS + Framer Motion
- **Design:** Clean, premium, dark-mode. NO gradients, NO AI-slusgish/cartoonish elements. Sharp, crisp engineering aesthetic.
- **Colors:** `#0D1117` (bg), `#1E6FBA` (mid blue), `#29ABE2` (accent/cyan), `#FFFFFF` (text)
- **Fonts:** Space Grotesk (headings), Inter (body)
- **Registration Fee:** ₹120 per team

## Requirements

### Active
- [ ] Hero section with bold headline, subheading, CTA button
- [ ] Event details cards (Date/Time/Venue)
- [ ] Registration form matching Google Form fields exactly
- [ ] Frontend validation (required fields, email format, phone)
- [ ] Form submission directs to Google Form or captures data
- [ ] Footer with AFC branding and contact info
- [ ] Fully responsive (mobile + desktop)
- [ ] Framer Motion animations (entrance only, no looping)
- [ ] Modular component structure

### Out of Scope
- Backend/database — form submits to Google Form
- Auth/login
- Admin panel

## Key Decisions
| Decision | Rationale | Outcome |
|----------|-----------|---------|
| React + Vite | Fast dev, modular components | Active |
| Tailwind CSS | Utility-first, consistent spacing | Active |
| Framer Motion | Lightweight entrance animations only | Active |
| No gradients | User constraint — sharp, crisp look | Active |
| Google Form embed/redirect | No backend needed | Active |

---
*Last updated: 2026-08-13 after initialization*
