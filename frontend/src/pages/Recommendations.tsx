import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Target, ChevronRight, AlertCircle } from 'lucide-react';
import api from '../utils/api';

export default function Recommendations() {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const { data } = await api.get('/careers/recommendations');
      setRecommendations(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="container">Loading recommendations...</div>;

  return (
    <div className="container">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Career Recommendations</h1>
        <p className="text-gray">Based on your current skill profile and market demand</p>
      </div>

      <div className="space-y-6">
        {recommendations.map((rec) => (
          <div key={rec.id} className="card m-0 bg-white" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-2xl font-bold">{rec.name}</h3>
                  <div className="text-xs px-3 py-1 rounded-full font-bold bg-green-50" style={{ color: 'var(--success)', border: '1px solid var(--success)' }}>
                    {rec.matchPercentage}% Match
                  </div>
                </div>
                <p className="text-gray mb-6">{rec.description}</p>
                
                {rec.skillGaps.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold flex items-center gap-2 mb-3 text-orange-600">
                      <AlertCircle size={16} /> Skill Gaps to Address:
                    </h4>
                    <div className="flex flex-wrap gap-2" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {rec.skillGaps.map((gap: any, i: number) => (
                        <span key={i} className="text-xs px-3 py-1.5 rounded bg-gray-50 bg-gray-100" style={{ border: '1px solid var(--card-border)', color: 'var(--text-main)' }}>
                          {gap.skill} <span style={{ color: 'var(--text-muted)' }}>(Need {gap.required}, Have {gap.current})</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <Link 
                to={`/roadmap/${rec.id}`}
                className="btn-primary"
                style={{ padding: '0.75rem 1.25rem', textDecoration: 'none' }}
              >
                View Roadmap <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
