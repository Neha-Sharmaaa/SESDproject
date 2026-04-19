import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const sectionStyle = {
    padding: '80px 20px',
    textAlign: 'center' as const,
    borderBottom: '1px solid var(--card-border)'
  };

  const cardStyle = {
    padding: '40px',
    border: '1px solid var(--card-border)',
    borderRadius: '12px',
    backgroundColor: 'var(--card-bg)',
    margin: '10px'
  };

  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', fontFamily: 'sans-serif' }}>
      {/* Navbar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', borderBottom: '1px solid var(--card-border)' }}>
        <h1 style={{ color: 'var(--primary)', margin: 0 }}>SkillGraph</h1>
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <Link to="/login" className="btn-primary" style={{ padding: '10px 20px', textDecoration: 'none' }}>Get Started</Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={sectionStyle}>
        <h1 style={{ fontSize: '4rem', marginBottom: '20px' }}>Master Your Career Journey</h1>
        <p style={{ fontSize: '1.25rem', color: '#64748b', maxWidth: '800px', margin: '0 auto 40px' }}>
          Track skills, map career paths, and build professional resumes.
        </p>
        <Link to="/login" className="btn-primary" style={{ padding: '15px 40px', fontSize: '1.25rem', textDecoration: 'none' }}>
          Start Now
        </Link>
      </section>

      {/* Features */}
      <section style={sectionStyle}>
        <h2>Key Features</h2>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginTop: '40px' }}>
          <div style={cardStyle}>
            <h3>Skill Tracking</h3>
            <p>Monitor your technical growth.</p>
          </div>
          <div style={cardStyle}>
            <h3>Career Pathing</h3>
            <p>Visualize your trajectory.</p>
          </div>
          <div style={cardStyle}>
            <h3>Resume Building</h3>
            <p>Generate tailored PDFs.</p>
          </div>
        </div>
      </section>

      <footer style={{ padding: '40px', textAlign: 'center' }}>
        <p>© 2024 SkillGraph</p>
      </footer>
    </div>
  );
}
