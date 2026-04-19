import React, { useState } from 'react';
import api from '../utils/api';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const payload = isLogin ? { email, password } : { name, email, password };
      const { data } = await api.post(endpoint, payload);
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      window.location.href = '/';
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="auth-container">
      <div className="card w-full" style={{ maxWidth: '420px', padding: '2.5rem' }}>
        <h2 className="text-3xl font-bold mb-8 text-center" style={{ letterSpacing: '0.5px' }}>
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        
        {error && <div className="mb-6 text-red-500 text-sm bg-red-100 px-4 py-3 rounded-lg border border-red-500 font-medium">{error}</div>}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label>Full Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label>Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              required
            />
          </div>
          <div className="mb-8">
            <label>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" className="w-full btn-primary text-lg" style={{ padding: '0.875rem' }}>
            {isLogin ? 'Sign In' : 'Join SkillGraph'}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button 
            type="button"
            className="ml-2 font-bold p-0 border-none bg-transparent"
            style={{ color: 'var(--accent)' }}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </p>
      </div>
    </div>
  );
}
