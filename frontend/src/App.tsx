import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { Layout, User, Award, BookOpen, LogOut, Target } from 'lucide-react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Recommendations from './pages/Recommendations';
import Roadmap from './pages/Roadmap';
import Home from './pages/Home';

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
      <div className="w-full flex" style={{ minHeight: '100vh' }}>
        {isAuthenticated && (
          <aside className="flex flex-col justify-between py-8 px-6 bg-white" style={{ position: 'fixed', left: 0, top: 0, bottom: 0, width: '260px', borderRight: '1px solid #e2e8f0', zIndex: 50 }}>
            <div>
              <Link to="/dashboard" className="text-2xl font-bold flex items-center gap-3 mb-10" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>
                <Award size={28} className="text-indigo-600" /> <span>SkillGraph</span>
              </Link>
              <div className="flex flex-col gap-2">
                <Link to="/dashboard" className="flex items-center gap-3 p-3 rounded-lg transition" style={{ color: 'var(--text-main)', textDecoration: 'none' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <Layout size={20} className="text-gray" /> My Dashboard
                </Link>
                <Link to="/recommendations" className="flex items-center gap-3 p-3 rounded-lg transition" style={{ color: 'var(--text-main)', textDecoration: 'none' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <Target size={20} className="text-gray" /> Career Paths
                </Link>
              </div>
            </div>
            
            <button 
              onClick={logout} 
              className="flex items-center gap-3 p-3 rounded-lg w-full transition bg-white"
              style={{ color: 'var(--danger)', border: '1px solid var(--danger-bg)', cursor: 'pointer' }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--danger-bg)'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
            >
              <LogOut size={20} /> Logout
            </button>
          </aside>
        )}

        <main className="flex-1" style={{ marginLeft: isAuthenticated ? '260px' : '0', display: 'flex', flexDirection: 'column' }}>
          <div className="flex-1 animate-fade-in" style={{ maxWidth: isAuthenticated ? '1440px' : '100%', margin: '0 auto', width: '100%', padding: isAuthenticated ? '2rem' : '0' }}>
            <Routes>
              <Route path="/" element={!isAuthenticated ? <Home /> : <Navigate to="/dashboard" />} />
              <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
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
