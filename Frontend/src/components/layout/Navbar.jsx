import { Link, NavLink, useNavigate } from 'react-router-dom';
import { APP_NAME } from '../../constants/appConstants.js';
import { useAuth } from '../../context/AuthContext.jsx';

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
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
            <button className="ghost-button" onClick={handleLogout} type="button">
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
  );
};

export default Navbar;
