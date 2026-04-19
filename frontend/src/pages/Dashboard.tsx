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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Skills</h1>
          <p className="text-gray">Track and manage your technical competencies</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-indigo-600 text-white flex items-center gap-2"
        >
          <Plus size={20} /> Update Skill
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {skills.map((skill) => (
          <div key={skill.id} className="card">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold">{skill.name}</h3>
                <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
                  {skill.category}
                </span>
              </div>
              <div className="flex items-center gap-1 text-indigo-600 font-bold">
                <TrendingUp size={16} /> {skill.level}/10
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-indigo-600 h-2 rounded-full" 
                style={{ width: `${skill.level * 10}%` }}
              ></div>
            </div>
          </div>
        ))}
        {skills.length === 0 && (
          <div className="col-span-2 text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
            <p className="text-gray">No skills added yet. Start by adding your first skill!</p>
          </div>
        )}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg w-full max-w-md text-black">
            <h2 className="text-xl font-bold mb-4">Update Skill Level</h2>
            <form onSubmit={handleUpdateSkill}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Select Skill</label>
                <select 
                  className="w-full p-2 border rounded" 
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
              <div className="mb-6">
                <label className="block text-sm font-medium mb-1">Proficiency Level (1-10)</label>
                <input 
                  type="range" min="1" max="10" step="1"
                  className="w-full"
                  value={newSkillLevel}
                  onChange={(e) => setNewSkillLevel(parseInt(e.target.value))}
                />
                <div className="text-center font-bold">{newSkillLevel}</div>
              </div>
              <div className="flex gap-4">
                <button 
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 border-gray-300 bg-transparent text-gray-700"
                >
                  Cancel
                </button>
                <button type="submit" className="flex-1 bg-indigo-600 text-white">
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
