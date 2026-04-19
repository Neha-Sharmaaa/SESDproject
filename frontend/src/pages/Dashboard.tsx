import React, { useState, useEffect } from 'react';
import { Plus, Edit2, TrendingUp, Download, Award, BarChart2 } from 'lucide-react';
import api from '../utils/api';

interface Skill {
  id: number;
  name: string;
  category: string;
  level: number;
}

export default function Dashboard() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [allAvailableSkills, setAllAvailableSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  
  const [newSkillId, setNewSkillId] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [userSkillsRes, allSkillsRes] = await Promise.all([
        api.get('/skills/me'),
        api.get('/skills')
      ]);
      setSkills(userSkillsRes.data);
      setAllAvailableSkills(allSkillsRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/skills/me', {
        skillId: parseInt(newSkillId),
        level: newSkillLevel
      });
      setShowAddModal(false);
      fetchData();
    } catch (err) {
      alert('Failed to update skill');
    }
  };

  if (loading) return <div className="container">Loading...</div>;

  const avgProficiency = skills.length > 0 ? (skills.reduce((acc, curr) => acc + curr.level, 0) / skills.length) : 0;
  
  const getRank = (avg: number) => {
    if (skills.length === 0) return 'Newcomer';
    if (avg < 4) return 'Junior Learner';
    if (avg < 7) return 'Skilled Professional';
    if (avg < 9) return 'Senior Expert';
    return 'Master Architect';
  };

  const categoryCounts = skills.reduce((acc, skill) => {
    acc[skill.category] = (acc[skill.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  return (
    <div className="container">
      <div className="flex justify-between items-center mb-10 mt-4 animate-slide-in">
        <div>
          <h1 className="text-4xl font-bold mb-3" style={{ color: 'var(--text-main)' }}>Skill Dashboard</h1>
          <p className="text-gray text-lg">Track your technical competencies dynamically</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => window.print()}
            className="group"
            style={{ padding: '0.8rem 1.5rem', fontSize: '1.1rem', backgroundColor: 'var(--card-bg)', color: 'var(--text-main)', border: '1px solid var(--card-border)', transition: 'all 0.2s' }}
          >
            <Download size={20} className="group-hover:text-primary transition" /> Export CSV
          </button>
          <button 
            onClick={() => { setNewSkillId(''); setNewSkillLevel(1); setShowAddModal(true); }}
            className="btn-primary"
            style={{ padding: '0.8rem 1.5rem', fontSize: '1.1rem' }}
          >
            <Plus size={24} /> Update Skill
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card m-0 flex items-center gap-4 bg-white animate-slide-in stagger-1 group hover:border-indigo-200" style={{ padding: '2rem', border: '1px solid var(--card-border)' }}>
            <div className="group-hover:scale-110 transition-transform duration-300 shadow-md" style={{ backgroundColor: 'var(--primary)', padding: '1.25rem', borderRadius: '1rem', color: 'white' }}>
              <TrendingUp size={36} />
            </div>
            <div>
              <p className="text-gray text-sm font-bold tracking-wider mb-1">TOTAL SKILLS ACQUIRED</p>
              <h2 className="text-5xl font-bold text-main">{skills.length}</h2>
            </div>
        </div>
        <div className="card m-0 flex items-center gap-4 bg-white animate-slide-in stagger-2 group hover:border-green-200" style={{ padding: '2rem', border: '1px solid var(--card-border)' }}>
            <div className="group-hover:scale-110 transition-transform duration-300 shadow-md" style={{ backgroundColor: 'var(--success)', padding: '1.25rem', borderRadius: '1rem', color: 'white' }}>
              <Edit2 size={36} />
            </div>
            <div>
              <p className="text-gray text-sm font-bold tracking-wider mb-1">AVERAGE PROFICIENCY</p>
              <h2 className="text-4xl font-bold text-main">{avgProficiency.toFixed(1)}<span className="text-xl text-gray"> / 10</span></h2>
            </div>
        </div>
        <div className="card m-0 flex items-center gap-4 bg-white animate-slide-in stagger-3 group hover:border-orange-200" style={{ padding: '2rem', border: '1px solid var(--card-border)' }}>
            <div className="group-hover:scale-110 transition-transform duration-300 shadow-md" style={{ backgroundColor: '#f97316', padding: '1.25rem', borderRadius: '1rem', color: 'white' }}>
              <Award size={36} />
            </div>
            <div>
              <p className="text-gray text-sm font-bold tracking-wider mb-1">YOUR EXPERIENCE RANK</p>
              <h2 className="text-3xl font-bold text-main mt-1 leading-tight text-transparent bg-clip-text" style={{ background: 'linear-gradient(135deg, #f97316 0%, #f59e0b 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{getRank(avgProficiency)}</h2>
            </div>
        </div>
      </div>

      {skills.length > 0 && (
        <div className="mb-10 animate-slide-in stagger-3">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><BarChart2 className="text-indigo-600"/> Skill Distribution by Category</h3>
          <div className="flex gap-3 flex-wrap">
            {Object.entries(categoryCounts).map(([cat, count]) => (
              <div key={cat} className="card m-0 flex items-center gap-3 px-6 py-3 bg-white" style={{ borderRadius: '999px', padding: '0.75rem 1.5rem' }}>
                <span className="font-semibold">{cat}</span>
                <span className="font-bold text-white flex items-center justify-center" style={{ backgroundColor: 'var(--primary)', width: '28px', height: '28px', borderRadius: '50%' }}>{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-6">
        {skills.map((skill, index) => (
          <div 
            key={skill.id} 
            className="card m-0 bg-white animate-slide-in group hover:border-primary" 
            style={{ padding: '2rem', animationDelay: `${0.1 + (index * 0.1)}s`, cursor: 'pointer' }}
            onClick={() => setExpandedCard(expandedCard === skill.id ? null : skill.id)}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold mb-2 text-main group-hover:text-primary transition">{skill.name}</h3>
                <span className="text-xs font-bold bg-green-50" style={{ color: 'var(--success)', padding: '0.25rem 0.75rem', borderRadius: '9999px', border: '1px solid var(--success)' }}>
                  {skill.category}
                </span>
              </div>
              <div className="flex items-center gap-1 font-bold text-lg" style={{ color: 'var(--primary)' }}>
                <TrendingUp size={18} /> {skill.level}/10
              </div>
            </div>
            <div className="w-full rounded-full h-3 bg-gray-100 overflow-hidden">
              <div 
                className="h-3 rounded-full animate-width" 
                style={{ 
                  width: `${skill.level * 10}%`,
                  backgroundColor: 'var(--primary)',
                }}
              ></div>
            </div>
            
            {expandedCard === skill.id && (
              <div className="mt-6 pt-4 border-t animate-fade-in" style={{ borderColor: 'var(--card-border)' }}>
                <p className="text-sm font-semibold tracking-wider mb-3 text-main">QUICK ACTIONS:</p>
                <div className="flex gap-2 flex-wrap">
                  <a href={`https://developer.mozilla.org/en-US/search?q=${encodeURIComponent(skill.name)}`} target="_blank" rel="noreferrer" className="text-xs py-1.5 px-4 rounded-full bg-blue-50 text-blue-600 border border-blue-200 transition hover:bg-blue-100" onClick={(e) => e.stopPropagation()}>
                    View Docs
                  </a>
                  <a href={`https://www.udemy.com/courses/search/?q=${encodeURIComponent(skill.name)}`} target="_blank" rel="noreferrer" className="text-xs py-1.5 px-4 rounded-full bg-purple-50 text-purple-600 border border-purple-200 transition hover:bg-purple-100" onClick={(e) => e.stopPropagation()}>
                    Find Courses
                  </a>
                  <a href={`https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(skill.name)}`} target="_blank" rel="noreferrer" className="text-xs py-1.5 px-4 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-200 transition hover:bg-indigo-100" onClick={(e) => e.stopPropagation()}>
                    Find Jobs
                  </a>
                </div>
              </div>
            )}
          </div>
        ))}
        {skills.length === 0 && (
          <div className="col-span-2 text-center py-12 rounded-lg border-2 border-dashed bg-gray-50 border">
            <p className="text-gray">No skills added yet. Start by adding your first skill!</p>
          </div>
        )}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 flex justify-center items-center z-10" style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(4px)' }}>
          <div className="card w-full max-w-md m-0 flex flex-col bg-white">
            <h2 className="text-2xl font-bold mb-6 text-main">Update Skill Level</h2>
            <form onSubmit={handleUpdateSkill}>
              <div className="mb-6">
                <label>Select Skill</label>
                <select 
                  value={newSkillId}
                  onChange={(e) => setNewSkillId(e.target.value)}
                  required
                >
                  <option value="">Select a skill</option>
                  {allAvailableSkills.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.category})</option>
                  ))}
                </select>
              </div>
              <div className="mb-8">
                <label>Proficiency Level (1-10)</label>
                <div className="flex items-center gap-4 mt-4 mb-2">
                  <button 
                    type="button"
                    onClick={() => setNewSkillLevel(Math.max(1, newSkillLevel - 1))}
                    style={{ width: '40px', height: '40px', padding: 0, borderRadius: '50%', fontSize: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-main)', border: '1px solid var(--card-border)', color: 'var(--text-main)', cursor: 'pointer', flexShrink: 0 }}
                  >
                    -
                  </button>
                  <input 
                    type="range" min="1" max="10" step="1"
                    className="flex-1"
                    style={{ accentColor: 'var(--primary)', margin: 0, height: '6px' }}
                    value={newSkillLevel}
                    onChange={(e) => setNewSkillLevel(parseInt(e.target.value))}
                  />
                  <button 
                    type="button"
                    onClick={() => setNewSkillLevel(Math.min(10, newSkillLevel + 1))}
                    style={{ width: '40px', height: '40px', padding: 0, borderRadius: '50%', fontSize: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-main)', border: '1px solid var(--card-border)', color: 'var(--text-main)', cursor: 'pointer', flexShrink: 0 }}
                  >
                    +
                  </button>
                </div>
                <div className="text-center font-bold text-3xl mt-6" style={{ color: 'var(--primary)' }}>{newSkillLevel}</div>
              </div>
              <div className="flex gap-4">
                <button 
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="w-full"
                  style={{ background: 'transparent', borderColor: 'var(--card-border)' }}
                >
                  Cancel
                </button>
                <button type="submit" className="w-full btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
