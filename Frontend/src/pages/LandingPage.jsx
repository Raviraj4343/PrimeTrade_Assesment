import { Link } from 'react-router-dom';

const LandingPage = () => (
  <section className="landing-card">
    <div className="landing-grid">
      <div className="landing-copy">
        <p className="eyebrow">PrimeTrade Assessment</p>
        <h1>Task management, without the clutter.</h1>
        <p className="hero-copy">
          A clean React frontend with authentication, protected routing, and task CRUD connected
          to the REST API backend.
        </p>
        <div className="landing-actions">
          <Link className="button-link" to="/login">
            Sign In
          </Link>
          <Link className="nav-link secondary-button" to="/register">
            Create Account
          </Link>
        </div>
      </div>

      <aside className="landing-aside">
        <div className="landing-badge">Protected Dashboard</div>
        <p className="landing-aside-text">
          Sign in to manage tasks with a simple workflow, clear status updates, and secure access.
        </p>
        <div className="landing-mini-stats">
          <span>JWT Auth</span>
          <span>Task CRUD</span>
          <span>Responsive UI</span>
        </div>
      </aside>
    </div>
  </section>
);

export default LandingPage;
