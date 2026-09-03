# Brewery Waitlist

A small, responsive React + TypeScript app that lists real breweries from the
[Open Brewery DB API](https://www.openbrewerydb.org/documentation) and lets a
user join or leave a waitlist for each one. Seat availability is faked locally
since the API has no such field.

## How to run

```bash
npm install
npm run dev
```

Then open the URL Vite prints (typically `http://localhost:5173`).

**Node version:** 20.x (LTS). Tested on Node 20.17.

## What I built vs. what I faked

| Built (real) | Faked (local only) |
|---|---|
| Fetching breweries from Open Brewery DB API | Seat availability (Low / Medium / High) — seeded deterministically from each brewery's ID |
| Loading and error states with retry | Waitlist state — stored in `localStorage`, no backend |
| Join / leave waitlist with persisted status | |
| Responsive card grid, mobile-friendly | |

## One tradeoff I made

**Vanilla CSS over Tailwind.** The app is a single screen with a handful of
components, so a CSS framework would add a build dependency and extra
config for very little benefit. A single stylesheet keeps the dependency
list short and makes the styling easy to explain and defend in the interview.

## What I'd do with more time

- Add a search box to filter breweries by name or city (the assignment lists
  this as a nice-to-have).
- Show a user's position in line and an estimated wait time, faked similarly
  to seat availability.
- Add unit tests for the `seedAvailability` hash and the `useWaitlist` hook.
- Improve accessibility further: ARIA live regions for waitlist status
  changes, and a skip-to-content link.

## AI-usage log

```
- AI tool(s) used: Bolt (Claude-based AI coding assistant)
- Where AI helped most: Scaffolding the Vite + TypeScript project structure,
  writing the initial React components, and generating the CSS design system.
- Where AI got it wrong / hallucinated: N/A — the API endpoint and response
  shape were verified against the live Open Brewery DB documentation before
  coding.
- What you changed or rejected by hand, and why: (fill in — e.g. adjusted the
  color palette, tweaked the card layout, renamed variables for clarity)
```

> **Note:** Edit the last two lines of the AI log to reflect your actual
> experience — what you personally changed, rejected, or adjusted. Reviewers
> want to see your judgment, not just the AI's output.
