import { useNavigate } from "react-router-dom";
import { Wallet, PieChart, Target, ArrowRight } from "lucide-react";
import SwitchTheme from "../components/SwitchTheme";
import logo from "../assets/logo.png"

const FEATURES = [
  {
    icon: Wallet,
    title: "Calculate your expenses",
    body: "Log every dollar in and out, and always know exactly where your money went.",
  },
  {
    icon: PieChart,
    title: "Plan your spending",
    body: "Set category budgets and see instantly when you're getting close to a limit.",
  },
  {
    icon: Target,
    title: "Budget with us",
    body: "Set a savings goal and track your progress toward it, one deposit at a time.",
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="home-topbar">
        <div className="home-brand">
          <img src={logo} alt="Financial Tracker Logo" className="home-logo" />
          <span className="home-brand-name">Financial Tracker</span>
        </div>
        <div className="theme-toggle">
          <SwitchTheme />
        </div>
      </div>

      <section className="home-hero">
        <h1 className="home-hero-title">Take control of your money.</h1>
        <p className="home-hero-subtitle">
          One place to track income, expenses, budgets, and savings goals — all
          stored right in your browser, no sign-up required.
        </p>
        <button className="btn btn-primary btn-lg" onClick={() => navigate("/dashboard")}>
          Go to Dashboard
          <ArrowRight size={18} />
        </button>
      </section>

      <section className="home-features">
        {FEATURES.map(({ icon: Icon, title, body }) => (
          <div key={title} className="home-feature-card">
            <div className="home-feature-icon">
              <Icon size={22} />
            </div>
            <h2 className="home-feature-title">{title}</h2>
            <p className="home-feature-body">{body}</p>
          </div>
        ))}
      </section>
    </div>
  );
}