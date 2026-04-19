import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cloud, Database, Code, Users, Award, ArrowRight, BookOpen, ChevronRight } from 'lucide-react';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full min-h-screen overflow-x-hidden" style={{ backgroundColor: 'var(--bg-main)' }}>
      {/* Premium Sticky Navbar */}
      <nav className={`fixed top-0 left-0 right-0 transition-all duration-300 z-[1000] flex justify-center py-4`}>
        <div className={`flex justify-between items-center px-8 w-full max-w-7xl mx-4 rounded-2xl transition-all duration-300 ${isScrolled ? 'header-scrolled mt-2' : 'py-4'}`}>
          <Link to="/" className="text-2xl font-bold flex items-center gap-2" style={{ color: 'var(--primary)', textDecoration: 'none', letterSpacing: '-0.04em' }}>
            <Award size={32} className="text-indigo-500" /> SkillGraph
          </Link>
          <div className="flex gap-8 items-center">
            <div className="hidden md:flex gap-6">
              <a href="#features" className="text-muted hover:text-primary transition font-semibold text-sm uppercase tracking-wider">Features</a>
              <a href="#about" className="text-muted hover:text-primary transition font-semibold text-sm uppercase tracking-wider">Intelligence</a>
            </div>
            <Link to="/login" className="btn-primary" style={{ padding: '0.75rem 1.75rem', textDecoration: 'none', borderRadius: '12px', fontWeight: 700, boxShadow: '0 10px 15px -3px rgba(99, 102, 241, 0.3)' }}>
              Join Now
            </Link>
          </div>
        </div>
      </nav>

      {/* BirdiePay Hero Style */}
      <section className="px-8 pt-48 pb-24 flex flex-col items-center justify-center text-center relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-50/50 rounded-full blur-[120px] -z-10" />
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold mb-8 border border-indigo-100">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          Next-Gen Career Intelligence
        </div>

        <h1 className="text-7xl font-bold mb-8 max-w-5xl tracking-tight leading-[1.1] text-main">
          Architect Your Future with <br/>
          <span className="text-gradient">Precision Intelligence</span>
        </h1>
        
        <p className="text-xl text-muted mb-12 max-w-2xl leading-relaxed font-medium">
          The high-performance platform for engineers to map technical trajectories, visualize skill gaps, and accelerate professional growth.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link to="/login" className="btn-primary" style={{ padding: '1.25rem 3rem', fontSize: '1.1rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', borderRadius: '14px', fontWeight: 800 }}>
            Launch Your Graph <ChevronRight size={22} />
          </Link>
          <a href="#features" className="flex items-center gap-3 px-8 py-4 font-bold text-main border rounded-xl hover:bg-white transition shadow-sm bg-gray-50/50">
            Explore Capabilities
          </a>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 w-full max-w-6xl">
          <div className="card m-0 p-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-6 font-bold text-2xl border border-indigo-100">
              <Users size={32} />
            </div>
            <h3 className="font-bold text-2xl mb-3">Community First</h3>
            <p className="text-muted leading-relaxed">Join over 10,000+ engineers building the future of software development.</p>
          </div>
          
          <div className="card m-0 p-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 mb-6 font-bold text-2xl border border-purple-100">
              <Code size={32} />
            </div>
            <h3 className="font-bold text-2xl mb-3">Universal Schema</h3>
            <p className="text-muted leading-relaxed">Standardized skill mapping across 500+ technologies and methodologies.</p>
          </div>
          
          <div className="card m-0 p-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 mb-6 font-bold text-2xl border border-green-100">
              <Database size={32} />
            </div>
            <h3 className="font-bold text-2xl mb-3">Predictive Insights</h3>
            <p className="text-muted leading-relaxed">Leverage market data to identify which skills will be in highest demand tomorrow.</p>
          </div>
        </div>
      </section>

      {/* Intelligence Section */}
      <section id="about" className="px-8 py-32 bg-white border-t border-b overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-50/30 rounded-full blur-[100px] -z-10" />
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1">
            <div className="w-12 h-1 bg-indigo-600 mb-8" />
            <h2 className="text-5xl font-bold mb-8 tracking-tight leading-tight">Data-Driven Career <br/>Optimization</h2>
            <p className="text-xl text-muted leading-relaxed mb-10 font-medium">
              We analyze millions of professional data points to provide you with the most accurate career roadmap possible. No more guessing—only data.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="text-4xl font-bold text-indigo-600 mb-2">94%</div>
                <div className="text-sm font-bold uppercase tracking-widest text-muted">Accuracy</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-indigo-600 mb-2">12k+</div>
                <div className="text-sm font-bold uppercase tracking-widest text-muted">Roadmaps</div>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full">
             <div className="card m-0 p-8 glass-effect border-2 border-indigo-100/50 shadow-2xl skew-y-1">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">JD</div>
                  <div>
                    <div className="font-bold">Senior Engineer Path</div>
                    <div className="text-xs text-muted">Intelligence Verified</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-4 bg-indigo-100 rounded-full w-3/4" />
                  <div className="h-4 bg-indigo-50 rounded-full w-1/2" />
                  <div className="h-4 bg-indigo-100 rounded-full w-2/3" />
                </div>
             </div>
          </div>
        </div>
      </section>

      <footer className="py-20 border-t text-center bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-between items-center flex-col md:row gap-10">
            <Link to="/" className="text-2xl font-bold flex items-center gap-2" style={{ color: 'var(--primary)', textDecoration: 'none' }}>
              <Award size={32} /> SkillGraph
            </Link>
            <p className="text-muted font-medium">© 2024 SkillGraph. Engineering the future of technical talent.</p>
            <div className="flex gap-6">
              <Link to="/login" className="font-bold text-sm text-main uppercase tracking-widest">Get Started</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
