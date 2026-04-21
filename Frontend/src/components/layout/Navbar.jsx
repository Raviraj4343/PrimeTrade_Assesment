import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { APP_NAME } from '../../constants/appConstants.js';
import { useAuth } from '../../context/AuthContext.jsx';

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      await logout();
      setIsConfirmOpen(false);
      navigate('/login');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <header className="topbar">
        <Link className="brand" to="/">
          <span className="brand-mark">P</span>
          <span className="brand-copy">
            <span className="brand-name">{APP_NAME}</span>
            <span className="brand-subtitle">Task Workspace</span>
          </span>
        </Link>

        <nav className="topbar-actions">
          {isAuthenticated ? (
            <>
              <NavLink className="ghost-button nav-link" to="/dashboard">
                Dashboard
              </NavLink>
              <button className="ghost-button" onClick={() => setIsConfirmOpen(true)} type="button">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink className="ghost-button nav-link" to="/login">
                Sign In
              </NavLink>
              <NavLink className="nav-link button-link topbar-primary" to="/register">
                Sign Up
              </NavLink>
            </>
          )}
        </nav>
      </header>

      {isConfirmOpen ? (
        <div className="modal-backdrop" role="presentation">
          <div
            aria-describedby="logout-confirmation-copy"
            aria-labelledby="logout-confirmation-title"
            aria-modal="true"
            className="confirm-modal"
            role="dialog"
          >
            <p className="section-kicker">Confirm Action</p>
            <h2 id="logout-confirmation-title">Log out of PrimeTrade?</h2>
            <p className="confirm-copy" id="logout-confirmation-copy">
              You&apos;ll be signed out of your current session and returned to the login screen.
            </p>
            <div className="confirm-actions">
              <button
                className="secondary-button"
                disabled={isLoggingOut}
                onClick={() => setIsConfirmOpen(false)}
                type="button"
              >
                Cancel
              </button>
              <button disabled={isLoggingOut} onClick={handleLogout} type="button">
                {isLoggingOut ? 'Logging out...' : 'Confirm Logout'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Navbar;
