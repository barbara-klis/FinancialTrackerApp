# Budget Tracker

A personal budget tracker. Add income and expense transactions with categories,
see totals and remaining balance on a dashboard, and view spending by category
in a chart. All data is stored in your browser's `localStorage` — nothing is
sent to a server.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically http://localhost:5173) in your browser.

## Scripts

- `npm run dev` — start the local dev server
- `npm run build` — type-check and build a production bundle to `dist/`
- `npm run preview` — serve the production build locally
- `npm run lint` — run the linter

## Notes

- Data lives only in your browser's local storage, under the key
  `budget-tracker:v1:transactions`. Clearing site data/browser storage will
  remove it.
- Categories: Food, Rent, Transport, Entertainment, Utilities, Health,
  Shopping, Other for expenses; Salary, Freelance, Investment, Gift, Other for
  income.
