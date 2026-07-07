# Raaha — Wellbeing Navigation OS

Marketing site and clickable product demo for **Raaha**, an agentic AI wellbeing-navigation OS for the Middle East's multilingual workforce, launching from Qatar.

- **Live:** https://tajbellucci.github.io/raaha/
- **Demo:** https://tajbellucci.github.io/raaha/#demo

Employees reach a warm, voice-integrated assistant on WhatsApp, web, or phone — in Arabic, English, Urdu/Hindi, Malayalam, or Tagalog — for early support, self-help, and safe routing to human care. An orchestrator directs five specialist agents; crisis situations always escalate to humans and official services, never AI alone. HR receives anonymized, aggregated insight — never transcripts.

Founders: Taj Magsi (Founder & CEO, DilKiBaat) · Prof. Farooq Naeem (Professor of Psychiatry, University of Toronto; founder, PACT).

## Stack

React 19 · Vite · Tailwind CSS. Static site; the demo is fully client-side and scripted (no backend).

## Develop

```bash
npm install
npm run dev
```

## Deploy

Pushing to `main` triggers the GitHub Actions workflow in `.github/workflows/deploy.yml`, which builds and publishes to GitHub Pages.
