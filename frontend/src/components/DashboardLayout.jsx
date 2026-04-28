import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, PlusCircle, Activity, LogOut } from 'lucide-react';

const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div style={{ marginBottom: '2rem' }}>
          <h2 className="text-h3" style={{ color: 'var(--primary)' }}>SmartOps</h2>
          <p className="text-muted" style={{ fontSize: '0.875rem', marginTop: '0.25rem', textTransform: 'capitalize' }}>
            {user.role} Portal
          </p>
        </div>

        <nav className="sidebar-nav" style={{ flexGrow: 1 }}>
          <Link to="/dashboard" className={`nav-item ${isActive('/dashboard')}`}>
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link to="/tasks" className={`nav-item ${isActive('/tasks')}`}>
            <CheckSquare size={20} /> Tasks
          </Link>
          
          {user.role !== 'user' && (
            <Link to="/create-task" className={`nav-item ${isActive('/create-task')}`}>
              <PlusCircle size={20} /> Create Task
            </Link>
          )}

          {user.role === 'admin' && (
            <Link to="/logs" className={`nav-item ${isActive('/logs')}`}>
              <Activity size={20} /> Activity Logs
            </Link>
          )}
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'white' }}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>{user.name}</p>
              <p className="text-muted" style={{ fontSize: '0.75rem' }}>{user.email}</p>
            </div>
          </div>
          <button 
            onClick={logout} 
            className="btn btn-danger" 
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
