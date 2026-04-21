import { Link } from 'react-router-dom';

const LandingPage = () => (
  <section className="landing-card">
    <div className="landing-copy">
      <p className="eyebrow">PrimeTrade Workspace</p>
      <h1>Task management, without the clutter.</h1>
      <p className="hero-copy">
        Stay focused with one simple workspace for planning, tracking, and finishing what matters.
      </p>
      <div className="landing-actions">
        <Link className="button-link button-primary landing-primary" to="/login">
          Sign In
        </Link>
        <Link className="button-secondary landing-secondary" to="/register">
          Create Account
        </Link>
      </div>
    </div>
  </section>
);

export default LandingPage;
