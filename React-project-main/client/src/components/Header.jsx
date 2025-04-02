import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Authentication/AuthContext';

const Header = () => {
  const { auth, logout } = useAuth();

  return (
    <header className="header">
      <div className="logo">
        <h1>Book Catalog</h1>
      </div>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/catalog">Catalog</Link>
        {auth.accessToken ? (
          <>
            <Link to="/create" className="action-button">Add New Book</Link>
            <Link to="/profile" className="action-button">Profile</Link>
            <a href="#" onClick={logout}>Logout</a>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
