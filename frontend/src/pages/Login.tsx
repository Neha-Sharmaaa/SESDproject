import React, { useState } from 'react';
import api from '../utils/api';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const payload = isLogin ? { email, password } : { name, email, password };
      const { data } = await api.post(endpoint, payload);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      window.location.href = '/dashboard';
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', backgroundColor: 'var(--bg-paper)' }}>

      {/* Brand */}
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <div style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-main)' }}>SkillGraph</div>
        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Career Copilot</div>
      </div>

      {/* Card */}
      <div className="card" style={{ width: '100%', maxWidth: '420px', margin: 0, padding: '2rem', position: 'relative', backgroundColor: '#fffef9' }}>
        {/* Tape on top */}
        <div className="tape" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '0.95rem', fontWeight: 700, position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%) rotate(-1.5deg)' }}>
          {isLogin ? 'Welcome back!' : 'Join today!'}
        </div>

        <h2 style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '2rem', fontWeight: 700, marginBottom: '0.25rem', marginTop: '0.5rem' }}>
          {isLogin ? 'Sign in.' : 'Create account.'}
        </h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          {isLogin ? 'Access your skill profile.' : 'Start mapping your career today.'}
        </p>

        {error && (
          <div style={{ marginBottom: '1rem', padding: '0.75rem 1rem', backgroundColor: '#fef2f2', border: '2px solid #ef4444', borderRadius: '4px', boxShadow: '2px 2px 0px #ef4444', fontSize: '0.8rem', color: '#dc2626', fontWeight: 600 }}>
            ✕ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem' }}>Full Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Jane Smith" required />
            </div>
          )}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem' }}>Email Address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" required />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem' }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
          </div>
          <button type="submit" className="btn-yellow" disabled={loading} style={{ width: '100%', padding: '0.8rem', fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '1.25rem', fontWeight: 700, border: '2px solid var(--text-main)', borderRadius: '4px', boxShadow: '4px 4px 0px var(--text-main)' }}>
            {loading ? 'Please wait…' : isLogin ? '→ Sign In' : '→ Create Account'}
          </button>
        </form>

        <p style={{ marginTop: '1.25rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 600 }}>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            type="button"
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            style={{ color: 'var(--primary)', fontWeight: 700, border: 'none', background: 'none', padding: 0, cursor: 'pointer', fontSize: '0.9rem', fontFamily: "'Space Grotesk', system-ui, sans-serif", boxShadow: 'none' }}
          >
            {isLogin ? 'Sign Up →' : '← Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
}
