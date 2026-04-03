import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Rocket, LogOut, LayoutDashboard, CheckSquare, FileText, BookOpen, UserPlus } from 'lucide-react';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="glass-panel sticky top-0 z-50 rounded-none border-t-0 border-l-0 border-r-0 rounded-b-xl px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <Rocket className="w-8 h-8 text-primary group-hover:animate-bounce" />
          <h1 className="text-2xl font-bold gradient-text tracking-tighter">Anti-Gravity Hub</h1>
        </Link>
        <nav className="flex items-center gap-6 font-medium">
          {user ? (
            <>
              <Link to="/dashboard" className="flex text-sm items-center gap-1 hover:text-primary transition-colors"><LayoutDashboard size={18}/> Dashboard</Link>
              <Link to="/modules" className="flex text-sm items-center gap-1 hover:text-primary transition-colors"><BookOpen size={18}/> Modules</Link>
              {user?.roles?.includes('ROLE_TEACHER') && (
                  <>
                      <Link to="/attendance" className="flex text-sm items-center gap-1 hover:text-primary transition-colors"><CheckSquare size={18}/> Attendance</Link>
                      <Link to="/management" className="flex text-sm items-center gap-1 hover:text-primary transition-colors"><UserPlus size={18}/> Manage</Link>
                  </>
              )}
              <Link to="/reports" className="flex text-sm items-center gap-1 hover:text-primary transition-colors"><FileText size={18}/> Reports</Link>
              <div className="w-px h-6 bg-white/20 mx-2"></div>
              <span className="text-secondary font-bold text-sm tracking-wide">Hi, {user.name}</span>
              <button onClick={handleLogout} className="flex items-center gap-1 text-red-400 hover:text-red-300 transition-colors ml-2">
                <LogOut size={18}/> Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="bg-primary/20 hover:bg-primary/30 border border-primary/50 text-white px-5 py-2 rounded-full transition-all hover:shadow-[0_0_15px_rgba(56,189,248,0.5)]">
              Login
            </Link>
          )}
        </nav>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto p-6 md:p-10 animate-fade-in">
        {children}
      </main>

      <footer className="text-center py-6 text-white/40 text-sm mt-auto">
        &copy; 2026 University Anti-Gravity Research Project. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
