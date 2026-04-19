import React, { useState, useEffect } from 'react';
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
      await api.post('/skills', { skillId: parseInt(newSkillId), level: newSkillLevel });
      setShowAddModal(false);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div style={{ padding: '50px' }}>Loading Dashboard...</div>;

  return (
    <div style={{ maxWidth: '1200px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1 style={{ margin: 0 }}>Dashboard</h1>
        <button onClick={() => setShowAddModal(true)} className="btn-primary" style={{ padding: '10px 20px' }}>
          + Add Skill
        </button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {skills.map(skill => (
          <div key={skill.id} className="card" style={{ padding: '20px', border: '1px solid var(--card-border)' }}>
            <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--primary)' }}>{skill.category}</span>
            <h3 style={{ margin: '10px 0' }}>{skill.name}</h3>
            <div style={{ height: '8px', background: '#eee', borderRadius: '4px' }}>
              <div style={{ height: '100%', background: 'var(--primary)', width: `${(skill.level / 5) * 100}%`, borderRadius: '4px' }} />
            </div>
            <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>Proficiency: {skill.level}/5</p>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', padding: '30px', borderRadius: '12px', width: '400px' }}>
            <h2>Add Skill</h2>
            <form onSubmit={handeAdd}>
              <select value={newSkillId} onChange={e => setNewSkillId(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '20px' }}>
                <option value="">Select a skill...</option>
                {allAvailableSkills.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
              <input type="range" min="1" max="5" value={newSkillLevel} onChange={e => setNewSkillLevel(parseInt(e.target.value))} style={{ width: '100%' }} />
              <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                <button type="button" onClick={() => setShowAddModal(false)} style={{ flex: 1 }}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ flex: 1, padding: '10px' }}>Add</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
