import React, { useState, useEffect } from 'react';
import { Plus, TrendingUp, Award, BarChart2, Trash2, BookOpen, Search, ExternalLink } from 'lucide-react';
import api from '../utils/api';

interface Skill { id: string; name: string; category: string; level: number; }

const LEVEL_LABELS: Record<number, string> = { 1: 'Beginner', 2: 'Elementary', 3: 'Intermediate', 4: 'Advanced', 5: 'Expert' };

export default function Dashboard() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [allAvailableSkills, setAllAvailableSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [newSkillId, setNewSkillId] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState(1);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [userRes, allRes] = await Promise.all([api.get('/skills/me'), api.get('/skills')]);
      setSkills(userRes.data);
      setAllAvailableSkills(allRes.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillId) return;
    try {
      await api.post('/skills/me', { skillId: newSkillId, level: newSkillLevel });
      setShowAddModal(false);
      fetchData();
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (skillId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm('Remove this skill from your profile?')) return;
    try {
      await api.delete(`/skills/me/${skillId}`);
      setSkills(prev => prev.filter(s => s.id !== skillId));
    } catch (err) { console.error(err); }
  };

  if (loading) return (
    <div style={{ padding: '3rem', fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '1.5rem', color: 'var(--text-muted)' }}>
      Loading your skill profile...
    </div>
  );

  const avg = skills.length > 0 ? (skills.reduce((a, c) => a + c.level, 0) / skills.length).toFixed(1) : '—';
  const cats = [...new Set(skills.map(s => s.category))];

  return (
    <div style={{ maxWidth: '1100px', padding: '2.5rem', margin: '0 auto' }}>

      {/* ── HEADER ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', borderBottom: '2px solid var(--text-main)', paddingBottom: '1.5rem' }}>
        <div>
          <div className="tape" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem', display: 'inline-block', transform: 'rotate(-1deg)' }}>
            Your Skill Profile
          </div>
          <h1 style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '2.5rem', fontWeight: 700, lineHeight: 1.1 }}>Dashboard</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>Your career intelligence — click any skill to expand actions.</p>
        </div>
        <button onClick={() => { setNewSkillId(''); setNewSkillLevel(1); setShowAddModal(true); }} className="btn-primary" style={{ marginTop: '1rem' }}>
          <Plus size={16} /> Add Skill
        </button>
      </div>

      {/* ── STAT STRIP ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { label: 'Total Skills', value: String(skills.length), icon: <Award size={20} /> },
          { label: 'Avg. Proficiency', value: avg + ' / 5', icon: <TrendingUp size={20} /> },
          { label: 'Categories', value: String(cats.length), icon: <BarChart2 size={20} /> },
        ].map(({ label, value, icon }) => (
          <div key={label} className="card card-sticky" style={{ margin: 0, padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>{label}</span>
              <span style={{ color: 'var(--yellow-dark)' }}>{icon}</span>
            </div>
            <div style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '2.25rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1 }}>{value}</div>
          </div>
        ))}
      </div>

      {/* ── CATEGORY PILLS ── */}
      {cats.length > 0 && (
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
          {cats.map(cat => (
            <span key={cat} style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '0.9rem', fontWeight: 700, padding: '0.15rem 0.75rem', border: '2px solid var(--text-main)', borderRadius: '4px', backgroundColor: 'var(--yellow)', boxShadow: '2px 2px 0px var(--text-main)', color: 'var(--text-main)' }}>
              {cat} ({skills.filter(s => s.category === cat).length})
            </span>
          ))}
        </div>
      )}

      {/* ── SKILL CARDS ── */}
      {skills.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '5rem 2rem', border: '2px dashed var(--text-main)', borderRadius: '8px', color: 'var(--text-muted)' }}>
          <div style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-main)' }}>No skills yet.</div>
          <p style={{ fontSize: '0.875rem' }}>Click "Add Skill" to start building your profile.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
          {skills.map((skill, idx) => (
            <div
              key={skill.id}
              className="card"
              style={{
                margin: 0, padding: '1.5rem',
                cursor: 'pointer',
                borderColor: expandedCard === skill.id ? 'var(--primary)' : 'var(--text-main)',
                boxShadow: expandedCard === skill.id ? '5px 5px 0px var(--primary)' : 'var(--shadow-sketch)',
              }}
              onClick={() => setExpandedCard(expandedCard === skill.id ? null : skill.id)}
            >
              {/* Tape decoration */}
              <div style={{ width: '36px', height: '14px', backgroundColor: 'rgba(253,224,71,0.8)', border: '1px solid rgba(0,0,0,0.15)', borderRadius: '2px', margin: '-2rem auto 1rem', position: 'relative' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <span style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>{skill.category}</span>
                  <h3 style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '1.4rem', fontWeight: 700, lineHeight: 1.2 }}>{skill.name}</h3>
                </div>
                <span style={{
                  fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '0.9rem', fontWeight: 700,
                  padding: '0.1rem 0.5rem', border: '2px solid var(--text-main)', borderRadius: '4px',
                  backgroundColor: 'var(--yellow)', boxShadow: '2px 2px 0px var(--text-main)',
                  color: 'var(--text-main)', flexShrink: 0,
                }}>
                  L{skill.level}
                </span>
              </div>

              {/* Progress bar — sketch style */}
              <div style={{ height: '10px', backgroundColor: '#e2e8f0', border: '2px solid var(--text-main)', borderRadius: '4px', overflow: 'visible', marginBottom: '0.4rem', position: 'relative' }}>
                <div style={{ height: '100%', width: `${(skill.level / 5) * 100}%`, backgroundColor: 'var(--primary)', transition: 'width 0.6s ease', borderRadius: '2px' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: expandedCard === skill.id ? '1.25rem' : 0 }}>
                <span>Beginner</span>
                <span style={{ color: 'var(--primary)', fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '0.85rem' }}>{LEVEL_LABELS[skill.level]}</span>
                <span>Expert</span>
              </div>

              {/* Expandable actions */}
              {expandedCard === skill.id && (
                <div style={{ borderTop: '2px solid var(--text-main)', paddingTop: '1.25rem' }} onClick={e => e.stopPropagation()}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    {[
                      { href: `https://developer.mozilla.org/en-US/search?q=${skill.name}`, icon: <Search size={13} />, label: 'Docs' },
                      { href: `https://www.coursera.org/search?query=${skill.name}`, icon: <BookOpen size={13} />, label: 'Courses' },
                      { href: `https://www.linkedin.com/jobs/search/?keywords=${skill.name}`, icon: <ExternalLink size={13} />, label: 'Jobs' },
                    ].map(({ href, icon, label }) => (
                      <a key={label} href={href} target="_blank" rel="noreferrer"
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem',
                          padding: '0.5rem', fontSize: '0.75rem', fontWeight: 700, fontFamily: "'Space Grotesk', system-ui, sans-serif",
                          border: '2px solid var(--text-main)', borderRadius: '4px', boxShadow: '2px 2px 0px var(--text-main)',
                          backgroundColor: 'var(--card-bg)', color: 'var(--text-main)', textDecoration: 'none',
                          transition: 'all 0.15s',
                        }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--yellow)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--card-bg)'; }}
                      >
                        {icon} {label}
                      </a>
                    ))}
                  </div>
                  <button
                    onClick={e => handleDelete(skill.id, e)}
                    style={{ width: '100%', borderColor: '#ef4444', color: '#ef4444', boxShadow: '2px 2px 0px #ef4444', backgroundColor: 'transparent', fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '1rem', fontWeight: 700 }}
                  >
                    <Trash2 size={14} /> Remove Skill
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── ADD SKILL MODAL ── */}
      {showAddModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '1rem' }}>
          <div className="card" style={{ margin: 0, width: '100%', maxWidth: '460px', padding: '2rem', position: 'relative', backgroundColor: '#fffef9' }}>
            {/* Tape header */}
            <div className="tape" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '1.1rem', fontWeight: 700, position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%) rotate(-1deg)' }}>
              Add a skill
            </div>
            <h2 style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.25rem', marginTop: '0.5rem' }}>Register technical competency.</h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Select a technology and rate your current proficiency.</p>
            <form onSubmit={handleAdd}>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.4rem' }}>Technology Domain</label>
                <select value={newSkillId} onChange={e => setNewSkillId(e.target.value)} required style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '1rem' }}>
                  <option value="">Choose a skill…</option>
                  {allAvailableSkills.map(s => (
                    <option key={s.id} value={s.id}>{s.name} — {s.category}</option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                  Mastery Level — <span style={{ color: 'var(--primary)' }}>{LEVEL_LABELS[newSkillLevel]} ({newSkillLevel}/5)</span>
                </label>
                <input type="range" min="1" max="5" value={newSkillLevel}
                  onChange={e => setNewSkillLevel(parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--primary)', border: 'none', padding: 0, boxShadow: 'none', background: 'transparent' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, marginTop: '0.25rem', fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
                  <span>Beginner</span><span>Expert</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button type="button" onClick={() => setShowAddModal(false)} style={{ flex: 1, fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '1rem' }}>Cancel</button>
                <button type="submit" className="btn-yellow" style={{ flex: 2, fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '1.1rem', padding: '0.6rem', border: '2px solid var(--text-main)', borderRadius: '4px', boxShadow: '3px 3px 0px var(--text-main)' }}>
                  Add to Graph ✓
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
