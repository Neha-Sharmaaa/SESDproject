import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Zap, BookOpen, BarChart2, Shield, ArrowRight, CheckCircle } from 'lucide-react';

const features = [
  { icon: <Target size={22} />, title: '3-Subject Skill Setup', desc: 'Create career categories & add your skills for each. Multiple proficiency levels supported.' },
  { icon: <Zap size={22} />, title: 'Scoped Roadmaps', desc: 'Pick a career path, ask questions, get answers strictly from verified industry data.' },
  { icon: <BookOpen size={22} />, title: 'Citations & Evidence', desc: 'Every recommendation includes docs links, courses, and job market evidence.' },
  { icon: <BarChart2 size={22} />, title: 'Gap Analysis', desc: 'See exactly which skills separate you from a Senior, Staff, or Principal Engineer role.' },
  { icon: <Shield size={22} />, title: '"Not Found" Handling', desc: 'No hallucination. If a skill isn\'t in the graph, you get a clear "data not available" response.' },
  { icon: <CheckCircle size={22} />, title: 'Instant & Accurate', desc: 'Real-time readiness tracking. Add skills and watch your career score change live.' },
];

const howItWorks = [
  { title: 'Register Your Skills', desc: 'Open the dashboard, add technologies you know, and rate your proficiency level 1–5.' },
  { title: 'Explore Career Paths', desc: 'Browse AI-matched career tracks. See exactly which skills are missing for your target role.' },
  { title: 'Track & Grow', desc: 'As you learn, update your profile. Your readiness score recalculates in real-time.' },
];

/* Sticky note colors */
const stickyColors = ['#fef9c3', '#dcfce7', '#dbeafe', '#fce7f3', '#fef3c7', '#e0e7ff'];

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-paper)' }}>

      {/* ── NAV ── */}
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '1.25rem 2rem', borderBottom: '2px solid var(--text-main)',
        backgroundColor: 'var(--bg-sidebar)', position: 'sticky', top: 0, zIndex: 100,
      }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-main)' }}>SkillGraph</span>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, marginLeft: '0.5rem' }}>• Career Copilot</span>
        </Link>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <Link to="/login" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 700, fontSize: '0.875rem' }}>
            Sign In
          </Link>
          <Link to="/login" className="btn-primary" style={{ textDecoration: 'none', fontSize: '0.875rem', padding: '0.5rem 1.25rem' }}>
            Sign Up →
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ maxWidth: '800px', margin: '0 auto', padding: '6rem 2rem 3rem', textAlign: 'center', position: 'relative' }}>

        {/* Hand-drawn underline badge */}
        <div style={{ display: 'inline-block', marginBottom: '2rem', position: 'relative' }}>
          <span style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '1rem', fontWeight: 700,
            backgroundColor: 'var(--yellow)', padding: '0.3rem 1rem',
            border: '2px solid var(--text-main)', borderRadius: '4px',
            boxShadow: '3px 3px 0px var(--text-main)', color: 'var(--text-main)', letterSpacing: '0.05em',
          }}>
            ✦ Career Intelligence Platform ✦
          </span>
        </div>

        <h1 style={{
          fontFamily: "'Space Grotesk', system-ui, sans-serif",
          fontSize: 'clamp(3rem, 9vw, 6rem)',
          fontWeight: 700,
          lineHeight: 1.05,
          letterSpacing: '-0.01em',
          color: 'var(--text-main)',
          marginBottom: '1rem',
        }}>
          Graph Your Skills.{' '}
          <span style={{
            position: 'relative', display: 'inline-block',
            background: 'linear-gradient(90deg, #2563eb, #7c3aed)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            Get Answers.
          </span>
        </h1>

        {/* SVG hand-drawn underline */}
        <svg width="320" height="12" viewBox="0 0 320 12" style={{ display: 'block', margin: '-0.5rem auto 1.5rem' }}>
          <path d="M4 8 Q80 2, 160 8 Q240 14, 316 6" stroke="#2563eb" strokeWidth="3" fill="none" strokeLinecap="round" style={{ filter: 'url(#squiggle)' }}/>
        </svg>

        <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: 1.7, maxWidth: '560px', margin: '0 auto 2.5rem', fontWeight: 500 }}>
          Map your engineering skills, identify career gaps, and get grounded roadmaps with citations — straight from verified industry data. No guessing, no hallucinations.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/login" className="btn-yellow" style={{ textDecoration: 'none', padding: '0.85rem 2.5rem', fontSize: '1rem', fontWeight: 700, border: '2px solid var(--text-main)', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', boxShadow: '4px 4px 0px var(--text-main)' }}>
            Get Started <ArrowRight size={18} />
          </Link>
          <a href="#features" style={{ padding: '0.85rem 2rem', fontSize: '1rem', fontWeight: 700, border: '2px solid var(--text-main)', borderRadius: '4px', color: 'var(--text-main)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', boxShadow: '3px 3px 0px var(--text-main)' }}>
            See How It Works
          </a>
        </div>
      </section>

      {/* ── TAPE MARQUEE ── */}
      <div style={{ overflow: 'hidden', borderTop: '2px solid var(--text-main)', borderBottom: '2px solid var(--text-main)', backgroundColor: 'var(--yellow)', padding: '0.6rem 0', margin: '3rem 0' }}>
        <div style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', whiteSpace: 'nowrap', display: 'flex', gap: '3rem', animation: 'marquee 20s linear infinite' }}>
          {['✦ 500+ Tech Stacks', '✦ AI Career Paths', '✦ Skill Gap Analysis', '✦ Docs + Courses', '✦ Job Market Data', '✦ Real-Time Tracking', '✦ 500+ Tech Stacks', '✦ AI Career Paths', '✦ Skill Gap Analysis', '✦ Docs + Courses', '✦ Job Market Data', '✦ Real-Time Tracking'].map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      </div>

      {/* ── FEATURE BOARD (Sticky Notes) ── */}
      <section id="features" style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 2rem 5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
          <div className="tape" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '1.4rem', fontWeight: 700, transform: 'rotate(-1deg)' }}>
            The Feature Board.
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {features.map((f, i) => (
            <div
              key={i}
              className="card"
              style={{
                margin: 0, padding: '1.75rem',
                backgroundColor: stickyColors[i % stickyColors.length],
                transform: `rotate(${i % 2 === 0 ? '-0.8' : '0.8'}deg)`,
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'rotate(0deg) scale(1.02)')}
              onMouseLeave={e => (e.currentTarget.style.transform = `rotate(${i % 2 === 0 ? '-0.8' : '0.8'}deg)`)}
            >
              {/* Tape on top */}
              <div style={{ width: '40px', height: '18px', backgroundColor: 'rgba(253,224,71,0.7)', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '2px', margin: '-2.5rem auto 1rem', position: 'relative' }} />
              <div style={{ color: 'var(--text-main)', marginBottom: '0.75rem' }}>{f.icon}</div>
              <h3 style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>{f.title}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FULL FEATURES SECTION ── */}
      <section style={{ borderTop: '2px solid var(--text-main)', backgroundColor: 'var(--bg-sidebar)', padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '2.5rem', fontWeight: 700, marginBottom: '3rem' }}>
            Everything You Need to <span style={{ background: 'var(--yellow)', padding: '0 0.3rem' }}>Graph Smarter</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem', textAlign: 'left' }}>
            {features.map((f, i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1.25rem', border: '2px solid var(--text-main)', borderRadius: '4px', backgroundColor: 'var(--card-bg)', boxShadow: '3px 3px 0px var(--text-main)' }}>
                <div style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }}>{f.icon}</div>
                <div>
                  <h4 style={{ fontWeight: 700, marginBottom: '0.3rem', fontSize: '0.95rem' }}>{f.title}</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ borderTop: '2px solid var(--text-main)', padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div className="tape" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '1.4rem', fontWeight: 700, marginBottom: '2.5rem', display: 'inline-block' }}>
            How It Works*
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative' }}>
            {/* Vertical line */}
            <div style={{ position: 'absolute', left: '19px', top: '10px', bottom: '10px', width: '2px', backgroundColor: 'var(--text-main)', zIndex: 0 }} />
            {howItWorks.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '4px',
                  backgroundColor: i === 0 ? 'var(--yellow)' : 'var(--card-bg)',
                  border: '2px solid var(--text-main)',
                  boxShadow: '2px 2px 0px var(--text-main)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, fontSize: '1.2rem',
                  flexShrink: 0,
                }}>
                  {i + 1}
                </div>
                <div style={{ paddingTop: '0.5rem' }}>
                  <h4 style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.3rem' }}>{step.title}</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ borderTop: '2px solid var(--text-main)', padding: '5rem 2rem', textAlign: 'center', backgroundColor: 'var(--bg-sidebar)' }}>
        <div style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '1rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '1rem' }}>
          ⬇ Ready to ace your next promotion? 🎯
        </div>
        <h2 style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, marginBottom: '0.75rem' }}>
          Stop drowning in blind career advice.
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1rem' }}>
          Let SkillGraph find the gaps — with proof.
        </p>
        <Link to="/login" className="btn-yellow" style={{ textDecoration: 'none', padding: '1rem 3rem', fontSize: '1.1rem', fontWeight: 700, border: '2px solid var(--text-main)', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', boxShadow: '5px 5px 0px var(--text-main)' }}>
          Start Mapping Smarter →
        </Link>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: '2px solid var(--text-main)', padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', backgroundColor: 'var(--bg-paper)' }}>
        <span style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)' }}>SkillGraph © 2026</span>
        <span>Made with 📊 and a lot of ☕ for engineers who want to grow.</span>
      </footer>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
