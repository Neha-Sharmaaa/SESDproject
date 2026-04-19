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
      <div className="flex justify-between items-center mb-10 mt-4">
        <div>
          <h1 className="text-4xl font-bold mb-3">Skill Dashboard</h1>
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
        <div className="card m-0 flex items-center gap-4" style={{ padding: '2rem', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)', borderColor: 'rgba(139, 92, 246, 0.3)' }}>
            <div style={{ backgroundColor: 'var(--primary)', padding: '1rem', borderRadius: '1rem', color: 'white' }}>
              <TrendingUp size={32} />
            </div>
            <div>
              <p className="text-gray text-sm font-bold tracking-wider mb-1">TOTAL SKILLS ACQUIRED</p>
              <h2 className="text-4xl font-bold">{skills.length}</h2>
            </div>
        </div>
        <div className="card m-0 flex items-center gap-4" style={{ padding: '2rem', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(52, 211, 153, 0.1) 100%)', borderColor: 'rgba(52, 211, 153, 0.3)' }}>
            <div style={{ backgroundColor: '#10b981', padding: '1rem', borderRadius: '1rem', color: 'white' }}>
              <Edit2 size={32} />
            </div>
            <div>
              <p className="text-gray text-sm font-bold tracking-wider mb-1">AVERAGE PROFICIENCY</p>
              <h2 className="text-4xl font-bold">{skills.length > 0 ? (skills.reduce((acc, curr) => acc + curr.level, 0) / skills.length).toFixed(1) : '0'}<span className="text-xl text-gray"> / 10</span></h2>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {skills.map((skill) => (
          <div key={skill.id} className="card m-0" style={{ padding: '2rem' }}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold mb-2">{skill.name}</h3>
                <span className="text-xs font-bold" style={{ backgroundColor: 'rgba(192, 132, 252, 0.15)', color: 'var(--accent)', padding: '0.25rem 0.75rem', borderRadius: '9999px' }}>
                  {skill.category}
                </span>
              </div>
              <div className="flex items-center gap-1 font-bold text-lg" style={{ color: 'var(--primary)' }}>
                <TrendingUp size={18} /> {skill.level}/10
              </div>
            </div>
            <div className="w-full rounded-full h-3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
              <div 
                className="h-3 rounded-full" 
                style={{ 
                  width: `${skill.level * 10}%`,
                  background: 'linear-gradient(90deg, var(--primary) 0%, var(--accent) 100%)',
                  boxShadow: '0 0 10px rgba(139, 92, 246, 0.5)'
                }}
              ></div>
            </div>
          </div>
        ))}
        {skills.length === 0 && (
          <div className="col-span-2 text-center py-12 rounded-lg border-2 border-dashed" style={{ borderColor: 'var(--card-border)', backgroundColor: 'rgba(0,0,0,0.2)' }}>
            <p className="text-gray">No skills added yet. Start by adding your first skill!</p>
          </div>
        )}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10" style={{ backdropFilter: 'blur(4px)' }}>
          <div className="card w-full max-w-md m-0 flex flex-col">
            <h2 className="text-2xl font-bold mb-6">Update Skill Level</h2>
            <form onSubmit={handleUpdateSkill}>
              <div className="mb-6">
                <label>Select Skill</label>
                <select 
                  value={newSkillId}
                  onChange={(e) => setNewSkillId(e.target.value)}
                  required
                >
                  <option value="" style={{ color: 'black' }}>Select a skill</option>
                  {allAvailableSkills.map(s => (
                    <option key={s.id} value={s.id} style={{ color: 'black' }}>{s.name} ({s.category})</option>
                  ))}
                </select>
              </div>
              <div className="mb-8">
                <label>Proficiency Level (1-10)</label>
                <input 
                  type="range" min="1" max="10" step="1"
                  className="w-full"
                  style={{ accentColor: 'var(--primary)' }}
                  value={newSkillLevel}
                  onChange={(e) => setNewSkillLevel(parseInt(e.target.value))}
                />
                <div className="text-center font-bold text-2xl mt-4" style={{ color: 'var(--primary)' }}>{newSkillLevel}</div>
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
