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
          <div key={rec.id} className="card">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold">{rec.name}</h3>
                  <div className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-bold">
                    {rec.matchPercentage}% Match
                  </div>
                </div>
                <p className="text-gray mb-4">{rec.description}</p>
                
                {rec.skillGaps.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold flex items-center gap-1 text-orange-600 mb-2">
                      <AlertCircle size={14} /> Skill Gaps to Address:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {rec.skillGaps.map((gap: any, i: number) => (
                        <span key={i} className="text-xs bg-gray-100 border border-gray-200 px-2 py-1 rounded">
                          {gap.skill} (Need {gap.required}, Have {gap.current})
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <Link 
                to={`/roadmap/${rec.id}`}
                className="bg-indigo-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-indigo-700 transition"
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
