import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { 
  Sun, 
  Moon, 
  Bell, 
  Globe, 
  Search, 
  ChevronDown,
  LogOut,
  User
} from 'lucide-react';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Tableau de Bord';
      case '/properties':
        return 'Gestion des Biens';
      case '/locations':
        return 'Gestion des Localisations';
      case '/settings':
        return 'Paramètres';
      default:
        return 'Administration';
    }
  };

  const notifications = [
    { id: 1, text: 'Nouvelle demande pour la villa à Fianarantsoa', time: 'Il y a 5 min', unread: true },
    { id: 2, text: 'Le bien ID #2498 a été publié avec succès', time: 'Il y a 2 h', unread: false },
    { id: 3, text: 'Jetons rechargés : +10⚡ reçus', time: 'Hier', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="navbar">
      <div className="navbar-left">
        <h2 className="page-title">{getPageTitle()}</h2>
      </div>

      <div className="navbar-right">
        {/* Search bar */}
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Rechercher un bien, une région..." className="search-input" />
        </div>

        {/* Language selector (inspired by FRA from client page) */}
        <div className="lang-selector">
          <Globe size={18} />
          <span>FRA</span>
          <ChevronDown size={14} />
        </div>

        {/* Theme Toggle (inspired by client theme toggle) */}
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        {/* Notifications */}
        <div className="nav-dropdown-wrapper">
          <button 
            className="nav-action-btn notification-btn" 
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
          >
            <Bell size={20} />
            {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
          </button>
          
          {showNotifications && (
            <div className="dropdown-menu notification-dropdown">
              <div className="dropdown-header">
                <h4>Notifications</h4>
                <button className="text-btn">Marquer tout comme lu</button>
              </div>
              <div className="dropdown-divider"></div>
              <div className="notification-list">
                {notifications.map(n => (
                  <div key={n.id} className={`notification-item ${n.unread ? 'unread' : ''}`}>
                    <div className="notification-bullet"></div>
                    <div className="notification-content">
                      <p className="notification-text">{n.text}</p>
                      <span className="notification-time">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Menu */}
        <div className="nav-dropdown-wrapper">
          <div 
            className="profile-trigger" 
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
          >
            <div className="nav-avatar">A</div>
            <span className="nav-username">Admin</span>
            <ChevronDown size={14} />
          </div>

          {showProfileMenu && (
            <div className="dropdown-menu profile-dropdown">
              <div className="dropdown-user-header">
                <strong>Admin</strong>
                <span>admin@agenceimmo.mg</span>
              </div>
              <div className="dropdown-divider"></div>
              <a href="/settings" className="dropdown-item">
                <User size={16} />
                Mon Profil
              </a>
              <a href="/settings" className="dropdown-item">
                <Settings size={16} />
                Paramètres
              </a>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item logout text-danger-color">
                <LogOut size={16} />
                Se déconnecter
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .navbar {
          height: var(--navbar-height);
          background-color: var(--bg-secondary);
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
          position: sticky;
          top: 0;
          z-index: 99;
          transition: background-color var(--transition-fast);
        }

        .page-title {
          font-family: var(--font-title);
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .navbar-right {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .search-box {
          position: relative;
          display: flex;
          align-items: center;
          width: 260px;
        }

        .search-icon {
          position: absolute;
          left: 12px;
          color: var(--text-muted);
          pointer-events: none;
        }

        .search-input {
          width: 100%;
          padding: 0.5rem 1rem 0.5rem 2.25rem;
          border: 1px solid var(--border-color);
          background-color: var(--bg-primary);
          color: var(--text-primary);
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          font-family: var(--font-main);
          transition: all var(--transition-fast);
        }
        .search-input:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px var(--primary-light);
        }

        .lang-selector {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0.75rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          cursor: pointer;
          font-weight: 600;
          font-size: 0.85rem;
          color: var(--text-secondary);
          transition: background-color var(--transition-fast);
        }
        .lang-selector:hover {
          background-color: var(--bg-tertiary);
        }

        .theme-toggle, .nav-action-btn {
          width: 38px;
          height: 38px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          background-color: transparent;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .theme-toggle:hover, .nav-action-btn:hover {
          background-color: var(--bg-tertiary);
          color: var(--primary);
        }

        .nav-dropdown-wrapper {
          position: relative;
        }

        .notification-btn {
          position: relative;
        }

        .notification-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background-color: var(--danger);
          color: white;
          font-size: 0.65rem;
          font-weight: 800;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid var(--bg-secondary);
        }

        .profile-trigger {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-md);
          transition: background-color var(--transition-fast);
        }
        .profile-trigger:hover {
          background-color: var(--bg-tertiary);
        }

        .nav-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: var(--primary);
          color: white;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nav-username {
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--text-primary);
        }

        /* Dropdown Menus */
        .dropdown-menu {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          width: 280px;
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          padding: 0.5rem;
          z-index: 1000;
          animation: dropdownFade 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .notification-dropdown {
          width: 320px;
        }

        .dropdown-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem;
        }
        .dropdown-header h4 {
          font-family: var(--font-title);
          font-weight: 700;
          font-size: 1rem;
        }
        .text-btn {
          background: none;
          border: none;
          color: var(--primary);
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
        }
        .text-btn:hover {
          text-decoration: underline;
        }

        .dropdown-divider {
          height: 1px;
          background-color: var(--border-color);
          margin: 0.5rem 0;
        }

        .notification-list {
          display: flex;
          flex-direction: column;
          max-height: 250px;
          overflow-y: auto;
        }

        .notification-item {
          display: flex;
          gap: 0.75rem;
          padding: 0.75rem;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: background-color var(--transition-fast);
        }
        .notification-item:hover {
          background-color: var(--bg-tertiary);
        }
        .notification-item.unread {
          background-color: var(--primary-light);
        }

        .notification-bullet {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--primary);
          margin-top: 5px;
          flex-shrink: 0;
        }
        .notification-item:not(.unread) .notification-bullet {
          background-color: var(--text-muted);
          opacity: 0.5;
        }

        .notification-content {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .notification-text {
          font-size: 0.8rem;
          font-weight: 500;
          line-height: 1.3;
          color: var(--text-primary);
        }
        .notification-time {
          font-size: 0.7rem;
          color: var(--text-muted);
        }

        .profile-dropdown {
          width: 220px;
        }

        .dropdown-user-header {
          display: flex;
          flex-direction: column;
          padding: 0.75rem;
        }
        .dropdown-user-header strong {
          font-size: 0.9rem;
          color: var(--text-primary);
        }
        .dropdown-user-header span {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.65rem 0.75rem;
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
          text-decoration: none;
          width: 100%;
          border: none;
          background: none;
          text-align: left;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .dropdown-item:hover {
          background-color: var(--bg-tertiary);
          color: var(--text-primary);
        }
        .dropdown-item.logout:hover {
          background-color: rgba(239, 68, 68, 0.08);
          color: var(--danger);
        }

        .text-danger-color {
          color: var(--danger);
        }

        @keyframes dropdownFade {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .search-box {
            display: none;
          }
          .nav-username {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
