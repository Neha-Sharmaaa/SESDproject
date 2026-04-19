import React, { useState, useEffect } from 'react';
import { Plus, Edit2, TrendingUp, Award, BarChart2, Trash2, ExternalLink, BookOpen, Search } from 'lucide-react';
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
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  
  const [newSkillId, setNewSkillId] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
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

  const handeAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillId) return;
    try {
      await api.post('/skills/me', { skillId: parseInt(newSkillId), level: newSkillLevel });
      setShowAddModal(false);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (skillId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to remove this skill?')) return;
    try {
      await api.delete(`/skills/me/${skillId}`);
      setSkills(skills.filter(s => s.id !== skillId));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="container">Loading Dashboard...</div>;

  const avgProficiency = skills.length > 0 ? (skills.reduce((acc, curr) => acc + curr.level, 0) / skills.length) : 0;
  const categoryCounts = skills.reduce((acc, skill) => {
    acc[skill.category] = (acc[skill.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="container" style={{ maxWidth: '1440px' }}>
      <header className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-bold mb-3" style={{ color: 'var(--text-main)' }}>Skill Dashboard</h1>
          <p className="text-gray text-lg">Track your technical competencies dynamically</p>
        </div>
        <button 
          onClick={() => { setNewSkillId(''); setNewSkillLevel(1); setShowAddModal(true); }}
          className="btn-primary"
          style={{ padding: '0.8rem 1.5rem', fontSize: '1.1rem' }}
        >
          <Plus size={20} /> Add New Skill
        </button>
      </header>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="card m-0 group hover:border-indigo-200" style={{ padding: '2rem', border: '1px solid var(--card-border)', backgroundColor: 'var(--card-bg)' }}>
          <div className="flex items-center gap-4 mb-3">
            <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
              <TrendingUp size={24} />
            </div>
            <span className="text-gray font-medium uppercase tracking-wider text-sm">Experience Rank</span>
          </div>
          <div className="text-4xl font-bold text-main">Consultant</div>
          <div className="text-sm text-green-500 mt-2 font-semibold">Top 15% of Developers</div>
        </div>

        <div className="card m-0 flex items-center gap-4 group hover:border-green-200" style={{ padding: '2rem', border: '1px solid var(--card-border)', backgroundColor: 'var(--card-bg)' }}>
          <div className="p-3 bg-green-50 rounded-xl text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
            <Award size={24} />
          </div>
          <div>
            <span className="text-gray font-medium uppercase tracking-wider text-sm">Avg. Proficiency</span>
            <div className="text-4xl font-bold text-main">{avgProficiency.toFixed(1)} / 5.0</div>
          </div>
        </div>

        <div className="card m-0 flex items-center gap-4 group hover:border-purple-200" style={{ padding: '2rem', border: '1px solid var(--card-border)', backgroundColor: 'var(--card-bg)' }}>
          <div className="p-3 bg-purple-50 rounded-xl text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
            <Plus size={24} />
          </div>
          <div>
            <span className="text-gray font-medium uppercase tracking-wider text-sm">Total Skills</span>
            <div className="text-4xl font-bold text-main">{skills.length} Loaded</div>
          </div>
        </div>
      </div>

      {/* Skill Distribution */}
      <div className="card p-8 mb-12 shadow-sm border" style={{ border: '1px solid var(--card-border)', backgroundColor: 'var(--card-bg)' }}>
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-bold flex items-center gap-2 text-main"><BarChart2 className="text-indigo-600"/> Skill Distribution by Category</h3>
          <div className="flex gap-4">
            {Object.entries(categoryCounts).map(([cat, count]) => (
              <div key={cat} className="m-0 flex items-center gap-3 px-6 py-3 bg-gray-50 border rounded-full transition hover:bg-white" style={{ borderRadius: '999px', padding: '0.75rem 1.5rem', backgroundColor: 'var(--bg-main)' }}>
                <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
                <span className="font-semibold text-main">{cat}</span>
                <span className="bg-white px-2 py-0.5 rounded-full text-xs font-bold border" style={{ backgroundColor: 'var(--card-bg)' }}>{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skills.map((skill) => (
          <div 
            key={skill.id} 
            className={`card m-0 group hover:border-primary cursor-pointer overflow-hidden flex flex-col transition-all duration-300 ${expandedCard === skill.id ? 'ring-2 ring-primary border-primary' : ''}`} 
            style={{ padding: '0', border: '1px solid var(--card-border)', backgroundColor: 'var(--card-bg)' }}
            onClick={() => setExpandedCard(expandedCard === skill.id ? null : skill.id)}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-1 block">{skill.category}</span>
                  <h3 className="text-2xl font-bold text-main">{skill.name}</h3>
                </div>
                <div className="text-3xl font-bold text-slate-300 opacity-50 group-hover:opacity-100 group-hover:text-indigo-600 transition-all">L{skill.level}</div>
              </div>

              <div className="relative h-2 bg-gray-100 rounded-full mb-2 overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-indigo-600 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${(skill.level / 5) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-xs font-bold text-gray uppercase tracking-tighter">
                <span>Novice</span>
                <span>Expert</span>
              </div>
            </div>

            {/* Quick Actions Expansion - Hidden by default, shown on click */}
            {expandedCard === skill.id && (
              <div className="px-6 py-6 border-t animate-fade-in" style={{ backgroundColor: 'var(--bg-main)' }}>
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between gap-3">
                    <a href={`https://docs.microsoft.com/en-us/search/?terms=${skill.name}`} target="_blank" className="flex-1 py-2 px-3 bg-white border text-center text-xs font-bold rounded-lg hover:bg-gray-100 text-main flex items-center justify-center gap-2" style={{ backgroundColor: 'var(--card-bg)' }}>
                      <Search size={14}/> Docs
                    </a>
                    <a href={`https://www.coursera.org/search?query=${skill.name}`} target="_blank" className="flex-1 py-2 px-3 bg-white border text-center text-xs font-bold rounded-lg hover:bg-gray-100 text-main flex items-center justify-center gap-2" style={{ backgroundColor: 'var(--card-bg)' }}>
                      <BookOpen size={14}/> Courses
                    </a>
                    <a href={`https://www.linkedin.com/jobs/search/?keywords=${skill.name}`} target="_blank" className="flex-1 py-2 px-3 bg-indigo-600 text-white text-center text-xs font-bold rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2">
                       Jobs <ExternalLink size={14}/>
                    </a>
                  </div>
                  
                  <div className="border-t pt-4 mt-2 flex justify-end">
                    <button 
                      onClick={(e) => handleDelete(skill.id, e)}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200 bg-transparent"
                    >
                      <Trash2 size={16} /> Remove Skill
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="card bg-white w-full max-w-md p-8 shadow-2xl" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
            <h3 className="text-2xl font-bold mb-6 text-main">Add Technical Competency</h3>
            <form onSubmit={handeAdd}>
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray uppercase mb-2">Select Skill</label>
                <select 
                  value={newSkillId} 
                  onChange={e => setNewSkillId(e.target.value)}
                  className="w-full p-4 rounded-xl border-2 focus:border-indigo-500 bg-white"
                  style={{ backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', borderColor: 'var(--card-border)' }}
                >
                  <option value="">Choose a skill...</option>
                  {allAvailableSkills.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.category})</option>
                  ))}
                </select>
              </div>
              <div className="mb-8">
                <label className="block text-sm font-bold text-gray uppercase mb-2">Proficiency Level (1-5)</label>
                <input 
                  type="range" min="1" max="5" 
                  value={newSkillLevel} 
                  onChange={e => setNewSkillLevel(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-xs font-bold text-gray mt-2">
                  <span>Level 1</span>
                  <span className="text-indigo-600">Level {newSkillLevel}</span>
                  <span>Level 5</span>
                </div>
              </div>
              <div className="flex gap-4">
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-4 font-bold text-gray hover:text-main">Cancel</button>
                <button type="submit" className="flex-1 btn-primary py-4 rounded-xl text-lg">Add to Graph</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
