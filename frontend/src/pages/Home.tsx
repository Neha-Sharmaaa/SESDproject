import React from 'react';
import { Link } from 'react-router-dom';
import { Cloud, Database, Code, Users, Award, ArrowRight, BookOpen } from 'lucide-react';

export default function Home() {
  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto" style={{ zIndex: 100 }}>
        <Link to="/" className="text-2xl font-bold flex items-center gap-2" style={{ color: 'var(--primary)', textDecoration: 'none' }}>
          <Award size={28} /> SkillGraph
        </Link>
        <div className="flex gap-8 items-center text-sm font-semibold tracking-wide">
          <a href="#services" className="transition" style={{ color: 'var(--text-muted)' }}>SERVICES</a>
          <a href="#about" className="transition" style={{ color: 'var(--text-muted)' }}>ABOUT</a>
          <a href="#training" className="transition" style={{ color: 'var(--text-muted)' }}>TRAINING</a>
          <Link to="/login" className="btn-primary" style={{ padding: '0.6rem 1.5rem', borderRadius: '9999px', textDecoration: 'none' }}>
            Login Platform
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-8 py-20 flex flex-col items-center justify-center text-center animate-fade-in" style={{ minHeight: '80vh' }}>
        <h1 className="text-6xl font-bold mb-6 max-w-4xl tracking-tight leading-tight">
          Welcome to <span style={{ color: 'var(--primary)' }}>SkillGraph</span>
        </h1>
        <p className="text-xl text-gray max-w-2xl mb-12 leading-relaxed">
          Incorporated strategy, design, and technology to build what's next. 
          Consumer experiences to enterprise systems to autonomous machines, we cornerstone harmonious human experiences.
        </p>
        <div className="flex gap-4">
          <Link to="/login" className="btn-primary flex items-center gap-2" style={{ padding: '1rem 2rem', fontSize: '1.1rem', textDecoration: 'none' }}>
            Get Started <ArrowRight size={20} />
          </Link>
          <a href="#services" className="flex items-center gap-2 font-bold" style={{ padding: '1rem 2rem', fontSize: '1.1rem', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid var(--card-border)', color: 'var(--text-main)', textDecoration: 'none' }}>
            Our Services
          </a>
        </div>
      </section>

      {/* Stats/About Section */}
      <section id="about" className="px-8 py-20 bg-gray-50 border-t border-b">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Bridging Business & Technology</h2>
            <p className="text-gray max-w-3xl mx-auto">
              Skillgraph is a leading IT consulting and staffing company dedicated to providing cutting-edge technology solutions and top-tier recruitment services.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card m-0" style={{ padding: '2.5rem' }}>
              <div style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}><Users size={40} /></div>
              <h3 className="text-xl font-bold mb-3">Staffing & Recruitment</h3>
              <p className="text-gray text-sm leading-relaxed">
                We provide recruitment process outsourcing (RPO) services specializing in building high-performing technical teams. Whether you need an on-demand workforce or full-time devs, we acquire the best.
              </p>
            </div>
            <div className="card m-0" style={{ padding: '2.5rem' }}>
              <div style={{ color: 'var(--accent)', marginBottom: '1.5rem' }}><Code size={40} /></div>
              <h3 className="text-xl font-bold mb-3">Software Development</h3>
              <p className="text-gray text-sm leading-relaxed">
                Expert consultants guide you through the entire software development lifecycle, ensuring scalability and security aligned perfectly with your corporate strategy.
              </p>
            </div>
            <div className="card m-0" style={{ padding: '2.5rem' }}>
              <div style={{ color: '#10b981', marginBottom: '1.5rem' }}><Database size={40} /></div>
              <h3 className="text-xl font-bold mb-3">Big Data Analytics</h3>
              <p className="text-gray text-sm leading-relaxed">
                Unlock the power of data. We help you gather, process, and analyze large datasets to derive actionable insights, improving decision-making and operational efficiency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Training Services */}
      <section id="training" className="px-8 py-24 max-w-7xl mx-auto relative">
        <h2 className="text-4xl font-bold mb-12 text-center">Industry-Leading Training</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 rounded-2xl bg-white border">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3"><Cloud className="text-indigo-600" /> Salesforce Training</h3>
            <ul className="text-gray space-y-3 mb-6">
              <li className="flex items-center gap-2"><ArrowRight size={14} className="text-indigo-500" /> Salesforce Administration</li>
              <li className="flex items-center gap-2"><ArrowRight size={14} className="text-indigo-500" /> Salesforce Platform Developer I</li>
              <li className="flex items-center gap-2"><ArrowRight size={14} className="text-indigo-500" /> Salesforce B2B Commerce Cloud</li>
            </ul>
          </div>
          
          <div className="p-8 rounded-2xl bg-white border">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3"><Database className="text-green-500" /> Data Science & Engineering</h3>
            <ul className="text-gray space-y-3 mb-6">
              <li className="flex items-center gap-2"><ArrowRight size={14} className="text-green-500" /> Big Data Analytics</li>
              <li className="flex items-center gap-2"><ArrowRight size={14} className="text-green-500" /> Full Stack Data Analyst</li>
              <li className="flex items-center gap-2"><ArrowRight size={14} className="text-green-500" /> Predictive Modeling</li>
            </ul>
          </div>

          <div className="p-8 rounded-2xl bg-white border">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3"><Code className="text-purple-500" /> DevOps & Software Cloud</h3>
            <ul className="text-gray space-y-3 mb-6">
              <li className="flex items-center gap-2"><ArrowRight size={14} className="text-purple-500" /> Angular Framework</li>
              <li className="flex items-center gap-2"><ArrowRight size={14} className="text-purple-500" /> Backend Engineering</li>
              <li className="flex items-center gap-2"><ArrowRight size={14} className="text-purple-500" /> AWS Architecture & Cloud Solutions</li>
            </ul>
          </div>

          <div className="p-8 rounded-2xl flex flex-col justify-center items-center text-center bg-gray-50 border">
            <BookOpen size={40} className="mb-4 text-indigo-600" />
            <h3 className="text-2xl font-bold mb-2">Automated Skill Profiling</h3>
            <p className="text-gray mb-6 max-w-sm">Log into our AI-driven SkillGraph portal to map your technical skills dynamically and calculate your career roadmap instantly.</p>
            <Link to="/login" className="btn-primary inline-flex" style={{ textDecoration: 'none' }}>Go To App <ArrowRight size={18} className="ml-2" /></Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray border-t border-gray-100 bg-white">
        <p>© 2026 SkillGraph Platform | AI-Driven Skill Mapping</p>
      </footer>
    </div>
  );
}
