import React, { useState, useEffect } from 'react';
import { Plus, Edit2, TrendingUp } from 'lucide-react';
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

  return (
    <div className="container">
      <div className="flex justify-between items-center mb-10 mt-4 animate-slide-in">
        <div>
          <h1 className="text-4xl font-bold mb-3" style={{ color: 'var(--text-main)' }}>Skill Dashboard</h1>
          <p className="text-gray text-lg">Track your technical competencies dynamically</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="btn-primary"
          style={{ padding: '0.8rem 1.5rem', fontSize: '1.1rem' }}
        >
          <Plus size={24} /> Update Skill
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-10">
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
            <div className="group-hover:scale-110 transition-transform duration-300 shadow-md" style={{ backgroundColor: '#10b981', padding: '1.25rem', borderRadius: '1rem', color: 'white' }}>
              <Edit2 size={36} />
            </div>
            <div>
              <p className="text-gray text-sm font-bold tracking-wider mb-1">AVERAGE PROFICIENCY</p>
              <h2 className="text-4xl font-bold text-main">{skills.length > 0 ? (skills.reduce((acc, curr) => acc + curr.level, 0) / skills.length).toFixed(1) : '0'}<span className="text-xl text-gray"> / 10</span></h2>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {skills.map((skill, index) => (
          <div key={skill.id} className="card m-0 bg-white animate-slide-in group hover:border-indigo-200" style={{ padding: '2rem', animationDelay: `${0.1 + (index * 0.1)}s` }}>
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
