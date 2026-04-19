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
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {isAuthenticated && (
          <nav className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-indigo-600 flex items-center gap-2">
              <Award size={24} /> SkillGraph
            </Link>
            <div className="flex gap-6 items-center">
              <Link to="/" className="text-gray-600 hover:text-indigo-600 flex items-center gap-1">
                <Layout size={18} /> Dashboard
              </Link>
              <Link to="/recommendations" className="text-gray-600 hover:text-indigo-600 flex items-center gap-1">
                <Award size={18} /> Career
              </Link>
              <button onClick={logout} className="text-red-500 hover:text-red-700 flex items-center gap-1">
                <LogOut size={18} /> Logout
              </button>
            </div>
          </nav>
        )}

        <main className="flex-1">
          <Routes>
            <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
            <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/recommendations" element={isAuthenticated ? <Recommendations /> : <Navigate to="/login" />} />
            <Route path="/roadmap/:careerId" element={isAuthenticated ? <Roadmap /> : <Navigate to="/login" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
