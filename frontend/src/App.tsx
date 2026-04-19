import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { Layout, User, Award, BookOpen, LogOut } from 'lucide-react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Recommendations from './pages/Recommendations';
import Roadmap from './pages/Roadmap';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const handleAuthChange = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
    };
    window.addEventListener('storage', handleAuthChange);
    return () => window.removeEventListener('storage', handleAuthChange);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    window.location.href = '/login';
  };

  return (
    <Router>
      <div className="w-full flex">
        {isAuthenticated && (
          <aside className="fixed left-0 top-0 bottom-0 flex flex-col justify-between py-8 px-6" style={{ width: '260px', backgroundColor: 'rgba(15, 23, 42, 0.95)', borderRight: '1px solid var(--card-border)', backdropFilter: 'blur(20px)', zIndex: 50 }}>
            <div>
              <Link to="/" className="text-2xl font-bold flex items-center gap-3 mb-12" style={{ color: 'var(--primary)' }}>
                <Award size={28} /> <span className="text-white">SkillGraph</span>
              </Link>
              <div className="flex flex-col gap-4">
                <Link to="/" className="flex items-center gap-3 p-3 rounded-lg transition" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-main)' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'}>
                  <Layout size={20} className="text-indigo-500" /> My Dashboard
                </Link>
                <Link to="/recommendations" className="flex items-center gap-3 p-3 rounded-lg transition" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-main)' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'}>
                  <Target size={20} className="text-indigo-500" /> Career Paths
                </Link>
              </div>
            </div>
            
            <button 
              onClick={logout} 
              className="flex items-center gap-3 p-3 rounded-lg w-full transition"
              style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#fca5a5', border: '1px solid rgba(239, 68, 68, 0.2)' }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.2)'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'}
            >
              <LogOut size={20} /> Logout Account
            </button>
          </aside>
        )}

        <main className="flex-1" style={{ marginLeft: isAuthenticated ? '260px' : '0', display: 'flex', flexDirection: 'column' }}>
          <div className="flex-1 p-8 animate-fade-in" style={{ maxWidth: '1440px', margin: '0 auto', width: '100%' }}>
            <Routes>
              <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
              <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/recommendations" element={isAuthenticated ? <Recommendations /> : <Navigate to="/login" />} />
              <Route path="/roadmap/:careerId" element={isAuthenticated ? <Roadmap /> : <Navigate to="/login" />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
