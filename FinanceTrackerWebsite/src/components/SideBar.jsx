import { NavLink } from "react-router-dom";
import ResetButton from "./ResetButton";
import BackHomeButton from "./BackHomeButton";
import SwitchTheme from "./SwitchTheme";
import logo from "../assets/logo.png"
import {
  LayoutDashboard,
  ArrowLeftRight,
  Wallet,
  Target,
  BarChart3,
} from "lucide-react";

const LINKS = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/transactions", label: "Transactions", icon: ArrowLeftRight },
  { to: "/budgets", label: "Budget", icon: Wallet },
  { to: "/goals", label: "Savings Goals", icon: Target },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
];

export default function Sidebar() {
  return (
    <>
    {/* Desktop: vertical sidebar, pinned to the left */}
    <aside className="sidebar">
      <div>
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <img 
              src={logo}
              alt="Financial Tracker Logo" 
              className="sidebar-logo"
            />
            <span className="sidebar-title">Financial Tracker</span>
          </div>
          <div className="theme-toggle">
            <SwitchTheme />
          </div>
        </div>
        
        <p className="sidebar-section-label">Overview</p>

          <nav className="sidebar-nav">
            {LINKS.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "nav-link-active" : "nav-link-inactive"}`
                }
              >
                <Icon size={18} />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="sidebar-footer">
          <BackHomeButton variant="sidebar" />
          <ResetButton variant="sidebar" />
        </div>
      </aside>

      {/* Mobile / tablet: horizontal bar, pinned to the top */}
      <header className="mobile-topbar">
        <div className="mobile-topbar-brand">
          <img
            src={logo}
            alt="Financial Tracker Logo"
            className="mobile-topbar-logo"
          />
        </div>

        <nav className="mobile-topbar-nav">
          {LINKS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `mobile-nav-link ${isActive ? "mobile-nav-link-active" : "mobile-nav-link-inactive"}`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="theme-toggle shrink-0">
          <SwitchTheme />
        </div>
        <BackHomeButton variant="mobile" />
        <ResetButton variant="mobile" />
      </header>
    </>
  )
}