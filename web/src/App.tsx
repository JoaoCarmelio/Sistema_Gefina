import { BrowserRouter, NavLink, Route, Routes } from 'react-router';

import DashboardPage from './DashboardPage.tsx';
import InvoicePage from './InvoicePage.tsx';

export default function App() {
  function apply(isActive: boolean): string {
    const base =
      'block px-3 py-2 rounded-control focus-visible:outline-2  focus-visible:outline-primary';

    if (isActive) {
      return `${base} bg-surface-raised font-medium`;
    }

    return `${base} text-text-muted hover:bg-surface-raised hover:text-text`;
  }

  return (
    <BrowserRouter>
      <aside className="fixed inset-y-0 left-0 w-60 flex flex-col gap-8 p-6 border-r border-border bg-surface">
        <header className="text-xl font-bold uppercase text-center">
          Gefina
        </header>
        <nav className="menu">
          <ul className="flex flex-col gap-1">
            <li>
              <NavLink
                end
                className={({ isActive }) => apply(isActive)}
                to="/"
              >
                Painel Inicial
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => apply(isActive)}
                to="/faturas"
              >
                Faturas
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="ml-60 p-6">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/faturas" element={<InvoicePage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
