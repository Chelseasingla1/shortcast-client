// Navigation.js
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Menu,
  X,
  Home,
  Headphones,
  Upload,
  User,
  Settings,
  LogOut,
  Search
} from 'lucide-react';

import '../../styles/Navigation.css';

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!isLoggedIn) return null;

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/playlists', icon: Headphones, label: 'Playlists' },
    { path: '/upload', icon: Upload, label: 'Upload' },
  ];

  const categories = ['All', 'Technology', 'Business', 'Education', 'Entertainment'];

  return (
    <div className="nav-main">
      <nav className="nav-container">
        <div className="nav-wrapper">
          <div className="nav-content">
            {/* Logo Section */}
            <div className="nav-logo-section">
              <Link to="/" className="nav-logo">
                <Headphones className="nav-logo-icon" />
                <span>ShortCast</span>
              </Link>
            </div>

            {/* Search Section */}
            <div className="search-section">
              <div className="search-container">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder="Search podcasts..."
                  className="search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="desktop-menu">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                >
                  <item.icon className="nav-link-icon" />
                  {item.label}
                </Link>
              ))}
            </div>

            {/* User Menu */}
            <div className="user-menu">
              <button className="user-button">
                <img
                  className="user-avatar"
                  src={user.picture || 'https://via.placeholder.com/32'}
                  alt={user.name}
                />
                <span className="user-email">{user.email}</span>
              </button>
              <div className="dropdown-menu">
                <Link to="/profile" className="dropdown-item">
                  <User className="nav-link-icon" /> Profile
                </Link>
                <Link to="/preferences" className="dropdown-item">
                  <Settings className="nav-link-icon" /> Preferences
                </Link>
                <button onClick={handleLogout} className="dropdown-item">
                  <LogOut className="nav-link-icon" /> Sign out
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="mobile-menu-button"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Categories */}
          <div className="category-section">
            <div className="category-list">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`category-pill ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-search">
          <div className="search-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search podcasts..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="mobile-menu-items">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`mobile-nav-link ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <item.icon className="nav-link-icon" />
              {item.label}
            </Link>
          ))}
        </div>
        <div className="mobile-categories">
          <h3 className="mobile-section-title">Categories</h3>
          <div className="mobile-category-list">
            {categories.map((category) => (
              <button
                key={category}
                className={`mobile-category-item ${activeCategory === category ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory(category);
                  setIsMenuOpen(false);
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="mobile-user-section">
          <Link
            to="/profile"
            className="mobile-nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            <User className="nav-link-icon" /> Profile
          </Link>
          <Link
            to="/preferences"
            className="mobile-nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            <Settings className="nav-link-icon" /> Preferences
          </Link>
          <button
            onClick={() => {
              handleLogout();
              setIsMenuOpen(false);
            }}
            className="mobile-nav-link"
          >
            <LogOut className="nav-link-icon" /> Sign out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navigation;