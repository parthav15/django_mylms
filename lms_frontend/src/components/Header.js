import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Header() {
  const isLoggedIn = localStorage.getItem('user_authenticated') === 'true';
  const isTeacherLoggedIn = localStorage.getItem('teacher_authenticated') === 'true';

  const navbarRef = useRef(null);

  const handleNavbarItemClick = () => {
    if (navbarRef.current) {
      navbarRef.current.classList.remove("show");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        {/* TechEduca Logo */}
        <Link className="navbar-brand logo" to="/">
          Tech<span className="highlight">Educa</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          ref={navbarRef}
          className="collapse navbar-collapse"
          id="navbarNavAltMarkup"
        >
          <ul className="navbar-nav ms-auto">
            {/* Common items for both users and teachers */}
            <NavItem to="/" label="Home" onClick={handleNavbarItemClick} />
            <NavItem to="/all-courses" label="Courses" onClick={handleNavbarItemClick} />
            {/* Conditional rendering for user */}
            {isLoggedIn && (
              <>
                <NavItem to="/user-dashboard" label="User Dashboard" onClick={handleNavbarItemClick} />
                <NavItem to="/user-logout" label="Logout" onClick={handleNavbarItemClick} />
              </>
            )}
            {/* Conditional rendering for teacher */}
            {isTeacherLoggedIn && (
              <>
                <NavItem to="/teacher-dashboard" label="Teacher Dashboard" onClick={handleNavbarItemClick} />
                <NavItem to="/teacher-logout" label="Logout" onClick={handleNavbarItemClick} />
              </>
            )}
            {/* Login and register options */}
            {!isLoggedIn && !isTeacherLoggedIn && (
              <>
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ boxShadow: 'none', border: 'none' }}
                  >
                    User
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <DropdownItem
                      to="/login"
                      label="User Login"
                      onClick={handleNavbarItemClick}
                    />
                    <DropdownItem
                      to="/register"
                      label="User Register"
                      onClick={handleNavbarItemClick}
                    />
                  </ul>
                </div>
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="teacherDropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ boxShadow: 'none', border: 'none', margin: "0px 15px" }}
                  >
                    Teacher
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="teacherDropdownMenuButton"
                  >
                    <DropdownItem
                      to="/teacher-login"
                      label="Teacher Login"
                      onClick={handleNavbarItemClick}
                    />
                    <DropdownItem
                      to="/teacher-register"
                      label="Teacher Register"
                      onClick={handleNavbarItemClick}
                    />
                  </ul>
                </div>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

// Component for individual navbar items
function NavItem({ to, label, onClick }) {
  return (
    <li className="nav-item">
      <Link to={to} className="nav-link" onClick={onClick}>
        {label}
      </Link>
    </li>
  );
}

// Component for dropdown items
function DropdownItem({ to, label, onClick }) {
  return (
    <li>
      <Link
        to={to}
        className="dropdown-item"
        onClick={onClick}
      >
        {label}
      </Link>
    </li>
  );
}

export default Header;
