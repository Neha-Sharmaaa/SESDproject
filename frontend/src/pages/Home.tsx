import React from 'react';
import { Link } from 'react-router-dom';
import { Cloud, Database, Code, Users, Award, ArrowRight, BookOpen } from 'lucide-react';

export default function Home() {
  return (
    <div className="w-full min-h-screen overflow-x-hidden" style={{ backgroundColor: 'var(--bg-main)' }}>
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto" style={{ zIndex: 100 }}>
        <Link to="/" className="text-2xl font-bold flex items-center gap-2" style={{ color: 'var(--primary)', textDecoration: 'none' }}>
          <Award size={32} /> SkillGraph
        </Link>
        <div className="flex gap-8 items-center">
          <a href="#features" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: 500 }}>Features</a>
          <a href="#about" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: 500 }}>How it works</a>
          <Link to="/login" className="btn-primary" style={{ padding: '0.6rem 1.2rem', textDecoration: 'none' }}>Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-8 py-20 flex flex-col items-center justify-center text-center" style={{ minHeight: '80vh' }}>
        <div className="animate-slide-in">
          <h1 className="text-6xl font-bold mb-6 max-w-4xl tracking-tight leading-tight">
            Master Your Career Journey with <span className="text-gradient inline-block">SkillGraph</span>
          </h1>
          <p className="text-xl text-gray mb-10 max-w-2xl leading-relaxed">
            The ultimate platform for developers to track skills, map career paths, and build professional resumes automatically.
          </p>
          <div className="flex gap-6 justify-center">
            <Link to="/login" className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Get Started <ArrowRight size={20} />
            </Link>
            <a href="#features" className="btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.1rem', textDecoration: 'none', backgroundColor: 'var(--card-bg)', borderRadius: '8px', border: '1px solid var(--card-border)', color: 'var(--text-main)' }}>
              View Features
            </a>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 w-full max-w-5xl">
          <div className="card m-0 p-8 flex flex-col items-center animate-slide-in stagger-1">
            <Users size={48} className="text-indigo-600 mb-4" />
            <h3 className="font-bold text-2xl mb-2">10k+ Developers</h3>
            <p className="text-gray">Growing community of skilled professionals</p>
          </div>
          <div className="card m-0 p-8 flex flex-col items-center animate-slide-in stagger-2">
            <Code size={48} className="text-green-600 mb-4" />
            <h3 className="font-bold text-2xl mb-2">500+ Skills</h3>
            <p className="text-gray">Comprehensive skill mapping database</p>
          </div>
          <div className="card m-0 p-8 flex flex-col items-center animate-slide-in stagger-3">
            <Database size={48} className="text-purple-600 mb-4" />
            <h3 className="font-bold text-2xl mb-2">AI Insights</h3>
            <p className="text-gray">Personalized career trajectory analysis</p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="px-8 py-24 bg-white border-t border-b" style={{ backgroundColor: 'var(--card-bg)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Professional Tools</h2>
            <p className="text-gray text-xl">Everything you need to advance your engineering career</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card m-0 p-8 hover:border-primary transition border shadow-sm">
              <Cloud className="text-indigo-600 mb-4" size={32} />
              <h3 className="text-2xl font-bold mb-3">Skill Radar</h3>
              <p className="text-gray leading-relaxed">Visualize your proficiency across different technology stacks with interactive spider charts.</p>
            </div>
            
            <div className="card m-0 p-8 hover:border-primary transition border shadow-sm">
              <Database className="text-green-600 mb-4" size={32} />
              <h3 className="text-2xl font-bold mb-3">Roadmap Generator</h3>
              <p className="text-gray leading-relaxed">Get step-by-step learning paths tailored to your current gaps and career goals.</p>
            </div>

            <div className="card m-0 p-8 hover:border-primary transition border shadow-sm">
              <Code className="text-purple-600 mb-4" size={32} />
              <h3 className="text-2xl font-bold mb-3">Resume Builder</h3>
              <p className="text-gray leading-relaxed">Instantly generate professional, ATS-friendly PDF resumes from your tracked skills and projects.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="px-8 py-20 border-t border-b">
        <div className="max-w-4xl mx-auto text-center">
          <BookOpen size={40} className="text-indigo-600 mb-6 mx-auto" />
          <h2 className="text-4xl font-bold mb-6">Designed for Modern Engineers</h2>
          <p className="text-xl text-gray leading-relaxed mb-10">
            Stop guessing where your career is going. SkillGraph uses data from thousands of successful career trajectories to show you the most efficient path to your next promotion or role.
          </p>
          <Link to="/login" className="btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.25rem', textDecoration: 'none' }}>
            Create Your Account
          </Link>
        </div>
      </section>

      <footer className="py-12 border-t text-center text-gray" style={{ borderColor: 'var(--card-border)' }}>
        <p>© 2024 SkillGraph. All rights reserved.</p>
      </footer>
    </div>
  );
}
