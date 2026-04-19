import React, { useState, useEffect } from 'react';
import { Plus, Edit2, TrendingUp, Award, BarChart2, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

interface Skill {
  id: number;
  name: string;
  category: string;
  level: number;
}

export default function Dashboard() {
  const navigate = useNavigate();
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

  const handleLevelChange = async (skillId: number, level: number) => {
    try {
      await api.put(`/skills/${skillId}`, { level });
      setSkills(skills.map(s => s.id === skillId ? { ...s, level } : s));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillId) return;
    try {
      await api.post('/skills', { skillId: parseInt(newSkillId), level: newSkillLevel });
      setShowAddModal(false);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="container">Loading...</div>;

  const avgProficiency = skills.length > 0 ? (skills.reduce((acc, curr) => acc + curr.level, 0) / skills.length) : 0;
  const categoryCounts = skills.reduce((acc, skill) => {
    acc[skill.category] = (acc[skill.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="container" style={{ maxWidth: '1440px' }}>
      <header className="flex justify-between items-end mb-12 animate-slide-in no-print">
        <div>
          <h1 className="text-4xl font-bold mb-3" style={{ color: 'var(--text-main)' }}>Skill Dashboard</h1>
          <p className="text-gray text-lg">Track your technical competencies dynamically</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => navigate('/resume')}
            className="group flex items-center gap-2"
            style={{ padding: '0.8rem 1.5rem', fontSize: '1.1rem', backgroundColor: 'var(--card-bg)', color: 'var(--text-main)', border: '1px solid var(--card-border)', transition: 'all 0.2s', borderRadius: '8px', cursor: 'pointer' }}
          >
            <FileText size={20} className="group-hover:text-primary transition" /> Generate Resume
          </button>
          <button 
            onClick={() => { setNewSkillId(''); setNewSkillLevel(1); setShowAddModal(true); }}
            className="btn-primary"
            style={{ padding: '0.8rem 1.5rem', fontSize: '1.1rem' }}
          >
            <Plus size={20} /> Add New Skill
          </button>
        </div>
      </header>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="card m-0 bg-white animate-slide-in stagger-1 group hover:border-indigo-200" style={{ padding: '2rem', border: '1px solid var(--card-border)' }}>
          <div className="flex items-center gap-4 mb-3">
            <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
              <TrendingUp size={24} />
            </div>
            <span className="text-gray font-medium uppercase tracking-wider text-sm">Experience Rank</span>
          </div>
          <div className="text-4xl font-bold text-main">Consultant</div>
          <div className="text-sm text-green-500 mt-2 font-semibold">Top 15% of Developers</div>
        </div>

        <div className="card m-0 flex items-center gap-4 bg-white animate-slide-in stagger-2 group hover:border-green-200" style={{ padding: '2rem', border: '1px solid var(--card-border)' }}>
          <div className="p-3 bg-green-50 rounded-xl text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
            <Award size={24} />
          </div>
          <div>
            <span className="text-gray font-medium uppercase tracking-wider text-sm">Avg. Proficiency</span>
            <div className="text-4xl font-bold text-main">{avgProficiency.toFixed(1)} / 5.0</div>
          </div>
        </div>

        <div className="card m-0 flex items-center gap-4 bg-white animate-slide-in stagger-3 group hover:border-purple-200" style={{ padding: '2rem', border: '1px solid var(--card-border)' }}>
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
      <div className="card bg-white p-8 mb-12 animate-slide-in stagger-4 shadow-sm border" style={{ border: '1px solid var(--card-border)' }}>
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-bold flex items-center gap-2 text-main"><BarChart2 className="text-indigo-600"/> Skill Distribution by Category</h3>
          <div className="flex gap-4">
            {Object.entries(categoryCounts).map(([cat, count]) => (
              <div key={cat} className="m-0 flex items-center gap-3 px-6 py-3 bg-gray-50 border rounded-full transition hover:bg-white" style={{ borderRadius: '999px', padding: '0.75rem 1.5rem' }}>
                <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
                <span className="font-semibold text-main">{cat}</span>
                <span className="bg-white px-2 py-0.5 rounded-full text-xs font-bold border">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skills.map((skill, index) => (
          <div 
            key={skill.id} 
            className="card m-0 bg-white animate-slide-in group hover:border-primary cursor-pointer overflow-hidden flex flex-col transition-all" 
            style={{ padding: '0', border: '1px solid var(--card-border)', animationDelay: `${0.1 + (index * 0.1)}s` }}
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

            {/* Quick Actions Expansion */}
            <div className={`px-6 py-4 bg-gray-50 border-t transition-all duration-300 ${expandedCard === skill.id ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0'}`}>
              <div className="flex justify-between gap-2 overflow-hidden">
                <a href={`https://docs.microsoft.com/en-us/search/?terms=${skill.name}`} target="_blank" className="flex-1 py-1 px-2 bg-white border text-center text-xs font-bold rounded-lg hover:bg-gray-100 text-main">Docs</a>
                <a href={`https://www.coursera.org/search?query=${skill.name}`} target="_blank" className="flex-1 py-1 px-2 bg-white border text-center text-xs font-bold rounded-lg hover:bg-gray-100 text-main">Courses</a>
                <a href={`https://www.linkedin.com/jobs/search/?keywords=${skill.name}`} target="_blank" className="flex-1 py-1 px-2 bg-indigo-600 text-white text-center text-xs font-bold rounded-lg hover:bg-indigo-700">Jobs</a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in no-print">
          <div className="card bg-white w-full max-w-md p-8 shadow-2xl animate-slide-in">
            <h3 className="text-2xl font-bold mb-6 text-main">Add Technical Competency</h3>
            <form onSubmit={handleAddSkill}>
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray uppercase mb-2">Select Skill</label>
                <select 
                  value={newSkillId} 
                  onChange={e => setNewSkillId(e.target.value)}
                  className="w-full p-4 rounded-xl border-2 focus:border-indigo-500 bg-white"
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
