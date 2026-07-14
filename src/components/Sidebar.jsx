import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Home, 
  MapPin, 
  Settings, 
  ChevronLeft, 
  ChevronRight, 
  Zap,
  Building2
} from 'lucide-react';

export default function Sidebar({ collapsed, toggleCollapse }) {
  const menuItems = [
    { name: 'Tableau de bord', path: '/', icon: LayoutDashboard },
    { name: 'Biens Immobiliers', path: '/properties', icon: Home },
    { name: 'Localisations', path: '/locations', icon: MapPin },
    { name: 'Paramètres', path: '/settings', icon: Settings },
  ];

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="brand">
          <div className="brand-icon">
            <Building2 size={24} />
          </div>
          {!collapsed && <span className="brand-name">Agence immo</span>}
        </div>
        <button className="collapse-btn" onClick={toggleCollapse} aria-label="Toggle Sidebar">
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            end={item.path === '/'}
          >
            <item.icon className="nav-icon" size={20} />
            {!collapsed && <span className="nav-label">{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        
        <div className="user-profile">
          <div className="avatar">
            A
          </div>
          {!collapsed && (
            <div className="user-info">
              <span className="username">Admin</span>
              <span className="role">Administrateur</span>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          width: var(--sidebar-width);
          background-color: var(--bg-secondary);
          border-right: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          z-index: 100;
          transition: width var(--transition-normal);
        }
        
        .sidebar.collapsed {
          width: 80px;
        }

        .sidebar-header {
          height: var(--navbar-height);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 1.25rem;
          border-bottom: 1px solid var(--border-color);
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--primary);
        }

        .brand-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: var(--radius-md);
          background-color: var(--primary-light);
          color: var(--primary);
        }

        .brand-name {
          font-family: var(--font-title);
          font-weight: 800;
          font-size: 1.2rem;
          color: var(--text-primary);
        }

        .collapse-btn {
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .collapse-btn:hover {
          background-color: var(--primary);
          color: white;
          border-color: var(--primary);
        }

        .sidebar-nav {
          flex: 1;
          padding: 1.5rem 0.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          text-decoration: none;
          font-weight: 600;
          transition: all var(--transition-fast);
        }

        .nav-item:hover {
          background-color: var(--bg-tertiary);
          color: var(--text-primary);
        }

        .nav-item.active {
          background-color: var(--primary);
          color: white;
          box-shadow: 0 4px 12px var(--primary-glow);
        }

        .nav-icon {
          flex-shrink: 0;
        }

        .sidebar-footer {
          padding: 1.25rem;
          border-top: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .credit-badge {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: linear-gradient(135deg, rgba(21, 128, 61, 0.1), rgba(245, 158, 11, 0.1));
          border: 1px solid rgba(245, 158, 11, 0.2);
          padding: 0.75rem 1rem;
          border-radius: var(--radius-md);
          color: #d97706;
          justify-content: center;
        }

        .sidebar.collapsed .credit-badge {
          padding: 0.5rem;
        }

        .credit-icon {
          color: #f59e0b;
        }

        .credit-info {
          display: flex;
          align-items: baseline;
          gap: 0.25rem;
        }

        .credit-count {
          font-family: var(--font-title);
          font-weight: 800;
          font-size: 1.2rem;
        }

        .credit-count-only {
          font-family: var(--font-title);
          font-weight: 800;
          font-size: 1.1rem;
        }

        .credit-label {
          font-size: 0.75rem;
          font-weight: 600;
          opacity: 0.8;
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--primary), #10b981);
          color: white;
          font-weight: 700;
          font-family: var(--font-title);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-sm);
        }

        .user-info {
          display: flex;
          flex-direction: column;
        }

        .username {
          font-weight: 700;
          font-size: 0.9rem;
          color: var(--text-primary);
        }

        .role {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        .animate-pulse {
          animation: pulse 2s infinite ease-in-out;
        }
      `}</style>
    </aside>
  );
}
