import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="not-found-page">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-body">This page doesn't exist.</p>
      <Link to="/" className="btn btn-primary">
        Back to home
      </Link>
    </div>
  );
}