# Financial Tracker — Personal Finance Tracker

A React dashboard for tracking income, expenses, budgets, and savings goals — built for INF 651, Group 17.
Group members: Nguon Tithkiry, Chhin Sokhom Sidhisakdeh, Sam Chankroesna

**Live app:** `https://inf-651-group17-final-project-personal-finance-track-i87kow2od.vercel.app/`
**Repo:** `https://github.com/AUPP-CS/INF-651-Group17-Final-Project-Personal-Finance-Tracker`

## Tech stack

- React 19 + Vite
- React Router v7 (client-side routing, nested layout routes)
- Tailwind CSS v4 + daisyUI (component styling + theming)
- Recharts (income/expense charts on the Analytics page)
- lucide-react (icons)
- Browser `localStorage` for all data persistence (no backend, no auth)

## Getting started

```bash
npm install
npm run dev       # local dev server, http://localhost:5173
npm run build     # production build into /dist
npm run preview   # preview the production build locally
```

## How to use the app

**Landing page** — open the live URL and you'll land on the Home page first. Click "Go to Dashboard" to enter the app.

**Dashboard** — your at-a-glance overview: total balance, income, and expenses, plus your most recent transactions and savings goal progress.

**Transactions** — this is where you log money coming in or going out:
1. Fill in the form (type, category, amount, title, date) and submit to add a transaction.
2. Use the filter bar above the transaction list to narrow results by search text, category, income/expense, a date range (From/To), or sort order.
3. Click the pencil icon on any row to edit it, or the trash icon to delete it.

**Budgets** — set a monthly spending limit per category (e.g., cap "Food" at $300). Each budget shows a progress bar comparing what you've actually spent in that category against the limit you set.

**Goals** — create a savings goal with a name and target amount, then log deposits toward it over time. A progress bar shows how close you are to the target.

**Analytics** — a chart comparing income against expenses over time, built from your actual transaction history.

**Theme toggle** — the sun/moon icon (in the sidebar on desktop, in the top bar on mobile) switches between light and dark mode. Your choice is remembered across visits.

**Reset** — the Reset button at the bottom of the sidebar/top bar permanently clears all transactions, budgets, and goals, after a confirmation prompt. Use this to start over from a clean slate.

**Back to Home** — returns you to the landing page at any time; this isn't a logout, since the app has no user accounts — it's just a way back to the intro screen.

**Resizing the window** — below about 1024px wide, the left sidebar is replaced by a horizontal bar pinned to the top, so the app stays fully navigable on tablets and phones.

## Project structure

```
index.html
vercel.json                  SPA rewrite rule (fixes 404 on refresh in production)
src/
  main.jsx                   mounts React, wraps the app in ThemeProvider + FinanceProvider + BrowserRouter
  App.jsx                    route table (Home + nested app routes under AppLayout)
  index.css                  Tailwind/daisyUI setup + all named component classes
  assets/
    logo.png
  contexts/
    FinanceContext.jsx         transactions, budgets, goals, filters, derived totals
    ThemeContext.jsx           light/dark theme, persisted to localStorage
  hooks/
    useLocalStorage.jsx        generic useState + localStorage sync hook
  components/
    AppLayout.jsx                    wraps Sidebar around the app's nested routes (<Outlet />)
    SideBar.jsx                      desktop sidebar (sticky, left) + mobile top bar — responsive pair
    SwitchTheme.jsx                  dark/light toggle, controlled by ThemeContext
    ResetButton.jsx                  clears all app data, with a confirm modal
    BackHomeButton.jsx               returns to the landing page
    TransactionForm.jsx
    TransactionList.jsx
    CategoryFilter.jsx
    BudgetBar.jsx
    AddBudget.jsx
    GoalCard.jsx
  pages/
    Home.jsx                    landing page (no sidebar)
    Dashboard.jsx
    Transactions.jsx
    Budgets.jsx
    Goals.jsx
    Analytics.jsx
    NotFound.jsx                 404 catch-all
  utils/
    formatDate.js, mockData.js
```

## Pages (routing)

| Route             | Page          | Purpose                                                  |
|--------------------|---------------|-----------------------------------------------------------|
| `/`                 | Home          | Landing page, no sidebar, links into the app               |
| `/dashboard`        | Dashboard     | Summary cards, recent transactions, savings goal progress   |
| `/transactions`     | Transactions  | Add/edit/delete transactions; filter by category, type, search, and date range |
| `/budgets`          | Budgets       | Set per-category spending limits, see spend vs. limit        |
| `/goals`            | Goals         | Create and track savings goals                                |
| `/analytics`        | Analytics     | Recharts-based income vs. expense breakdown                    |
| `*`                 | NotFound      | 404 fallback for any unmatched route                            |

`/dashboard`, `/transactions`, `/budgets`, `/goals`, and `/analytics` are all nested under one shared `AppLayout` route, which is what renders the sidebar — so the sidebar-wrapping logic exists in exactly one place instead of being repeated on every page.

## Data persistence

Every piece of app state — transactions, budgets, goals, and the light/dark theme — is synced to `localStorage` through the shared `useLocalStorage` hook, so a refresh or a new browser session picks up right where it left off. There's no backend and no real authentication; this is intentional, since the assignment allows persistence via local storage as an alternative to auth.

The Reset button (bottom of the sidebar / top bar) clears all transactions, budgets, and goals back to an empty state, after a confirmation modal.

## Responsive navigation

Below 1024px width (Tailwind's `lg` breakpoint), the vertical sidebar is replaced by a horizontal top bar with the same nav links, so there's no dead zone where the app is unnavigable on a phone or narrow window. Both are the same `SideBar.jsx` component — Tailwind's `hidden lg:flex` / `flex lg:hidden` pair decides which one renders at a given width, never both at once.

## Known limitations

- **No real authentication** — the "Back" button returns to the landing page; there's no login/logout because there are no user accounts, by design (see the brief's "local storage or mock authentication" wording).
- **Native date pickers** (`<input type="date">`) display according to the visitor's own browser/OS locale, which can't be restyled via CSS/JS. To keep the *displayed* date consistent everywhere else in the app regardless of that, every text-based date (transaction list, dashboard, filters) is rendered through one shared `formatDate()` utility.

## Deploying (Vercel)

1. Push to GitHub (repo must be public, or under your personal account, to deploy on Vercel's free Hobby tier without hitting the private-org restriction).
2. In Vercel: **Add New Project** → import the repo. Framework preset auto-detects as Vite; leave build command (`npm run build`) and output directory (`dist`) as-is.
3. **`vercel.json`** at the project root (already included) adds a rewrite rule sending every route to `index.html` — without this, refreshing on any route other than `/` returns a 404, since React Router's client-side routes don't correspond to real files on the server.
4. Deploy. Every push to the main branch auto-redeploys.
