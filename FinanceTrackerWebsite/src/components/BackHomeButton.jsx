import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function BackHomeButton({ variant = "sidebar" }) {
  const navigate = useNavigate();
  const triggerClass = variant === "sidebar" ? "back-home-link" : "back-home-link-mobile";

  return (
    <button className={triggerClass} onClick={() => navigate("/")} type="button">
      <ArrowLeft size={18} />
      Home
    </button>
  );
}