# ROADMAP — Thrust 5.0 Registration Website
# Milestone 1

## Overview
**2 phases** | **21 requirements mapped** | All v1 requirements covered ✓

| # | Phase | Goal | Requirements | Status |
|---|-------|------|--------------|--------|
| 1 | Project Scaffold & Hero | Vite+React+Tailwind+Motion setup, Hero section, Event Details | TECH-01..06, HERO-01..04, DET-01..04 | Pending |
| 2 | Registration Form & Footer | Full form with validation, Footer, polish | FORM-01..15, FOOT-01..02 | Pending |

---

## Phase 1: Project Scaffold & Hero
**Goal:** Working Vite+React+Tailwind+Framer Motion app with Hero and Event Details sections rendered correctly.

**Requirements:** TECH-01..06, HERO-01..04, DET-01..04

**Success Criteria:**
1. `npm run dev` serves the page at localhost
2. Hero shows "THRUST 5.0" headline with correct brand colors
3. CTA button scrolls to #register section
4. Event details cards render Date/Time/Venue
5. Fonts (Space Grotesk, Inter) load correctly

---

## Phase 2: Registration Form & Footer
**Goal:** Complete registration form matching Google Form fields with validation, submission flow, and footer.

**Requirements:** FORM-01..15, FOOT-01..02

**Success Criteria:**
1. All 13 form fields render with correct labels and types
2. Required field validation fires on submit attempt
3. Submit redirects to Google Form (pre-filled where possible) or shows success modal
4. Footer shows AFC club name and contact info
5. Page is fully responsive on mobile (375px) and desktop (1280px)
