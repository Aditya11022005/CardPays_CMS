# CardPays CRM Frontend

A modern, mobile-responsive CRM frontend built with React.js and Bootstrap 5. This project is designed for card payment management, lead tracking, transactions, accounting, and settings management—all in a single-page application (SPA) with no backend required.

## Features

### 1. Dashboard
- KPI cards for quick stats
- Bar graph (Chart.js) for visual analytics
- Animated loader for all pages

### 2. Leads
- Add, view, and filter leads
- Multi-card grid for each lead (shows all cards per lead)
- Add and view follow-ups for each lead
- Bootstrap 5 responsive design

### 3. Transactions
- Select a lead and view all its data before adding a transaction
- Per-row service selection (each transaction row can have a different service)
- KYC/file upload for each transaction
- Invoice preview before saving
- Transaction history table

### 4. Accounting
- Editable ledger table
- Filter by branch and date
- Export options (CSV, Excel, PDF)

### 5. Settings
- Fully editable settings page
- Manage dropdown options (services, card types, etc.)
- Set and update charge % and branches
- All changes reflect instantly across the app

### 6. Authentication
- Role-based login (admin, telecaller, accountant)
- Protected routes for each module

## Technologies Used
- React.js (with hooks, .jsx)
- Bootstrap 5 (React-Bootstrap)
- Chart.js (react-chartjs-2)
- No backend/API—all data is managed in frontend state

## How to Run
1. Install dependencies:
   ```
   npm install
   ```
2. Start the development server:
   ```
   npm start
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Mobile Responsiveness
- All pages use Bootstrap 5 grid and components for full mobile support.
- Tables, forms, and cards adjust for small screens.

## Project Structure
- `src/pages/` — Main modules (Dashboard, Leads, Transaction, Accounting, Settings)
- `src/components/` — Shared components (Loader, etc.)
- `src/App.js` — Routing, shared state, authentication
- `src/App.css` — Custom styles

## Author & License
- Built by CardPays Team
- MIT License

---
For any issues or suggestions, please open an issue on GitHub.
