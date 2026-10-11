# Budget Tracker

A simple, private personal budget tracker built with React and TypeScript.
Record your income and expenses, set a monthly budget, and see where your money
goes — all in the browser, with no account and no server.

## Features

- **Transactions** — add, edit and delete income and expense entries with an
  amount, category, date and optional description.
- **Dashboard** — total income, total expenses and remaining balance at a glance.
- **Spending by category** — a chart that breaks down your expenses.
- **Monthly budget** — set a budget for the month and track your progress
  against it.
- **Private by design** — all data is stored in your browser's `localStorage`.
  Nothing is sent to a server.

## Tech stack

- [React](https://react.dev/) 19 + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) for development and builds
- [Recharts](https://recharts.org/) for charts
- [oxlint](https://oxc.rs/) for linting

## Getting started

Requires [Node.js](https://nodejs.org/) and npm.

```bash
git clone https://github.com/barbara-klis/FinancialTrackerApp.git
cd FinancialTrackerApp
npm install
npm run dev
```

Then open the printed local URL (typically http://localhost:5173) in your browser.

## Scripts

- `npm run dev` — start the local dev server
- `npm run build` — type-check and build a production bundle to `dist/`
- `npm run preview` — serve the production build locally
- `npm run lint` — run the linter

## Project structure

```
src/
├── components/   dashboard, layout and transaction UI
├── constants/    income and expense categories
├── hooks/        useTransactions, useBudgets
├── types/        shared TypeScript types
└── utils/        calculations, formatting, localStorage helpers
```

## Notes

- Data lives only in your browser's local storage, under the keys
  `budget-tracker:v1:transactions` and `budget-tracker:v1:budgets`. Clearing
  site data/browser storage will remove it, and it is not shared between
  browsers or devices.
- Categories: Food, Rent, Transport, Entertainment, Utilities, Health,
  Shopping, Other for expenses; Salary, Freelance, Investment, Gift, Other for
  income.
