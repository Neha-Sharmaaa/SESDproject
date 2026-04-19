import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ChevronRight } from 'lucide-react';
import api from '../utils/api';

export default function Recommendations() {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchRecommendations(); }, []);

  const fetchRecommendations = async () => {
    try {
      const { data } = await api.get('/careers/recommendations');
      setRecommendations(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  if (loading) return (
    <div style={{ padding: '3rem', fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '1.5rem', color: 'var(--text-muted)' }}>
      Analysing your skill profile…
    </div>
  );

  return (
    <div style={{ maxWidth: '900px', padding: '2.5rem', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem', borderBottom: '2px solid var(--text-main)', paddingBottom: '1.5rem' }}>
        <div className="tape" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '1rem', fontWeight: 700, transform: 'rotate(-1deg)', marginBottom: '0.75rem', display: 'inline-block' }}>
          Career Intelligence
        </div>
        <h1 style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Career Paths</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Recommendations scoped to your current skill profile and market demand.</p>
      </div>

      {recommendations.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '5rem 2rem', border: '2px dashed var(--text-main)', borderRadius: '8px', color: 'var(--text-muted)' }}>
          <div style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-main)' }}>No recommendations yet.</div>
          <p style={{ fontSize: '0.875rem' }}>Add skills to your dashboard to get career path suggestions.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {recommendations.map((rec, idx) => (
            <div key={rec.id} className="card" style={{
              margin: 0, padding: '1.75rem',
              transform: `rotate(${idx % 2 === 0 ? '-0.3' : '0.3'}deg)`,
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'rotate(0deg)')}
              onMouseLeave={e => (e.currentTarget.style.transform = `rotate(${idx % 2 === 0 ? '-0.3' : '0.3'}deg)`)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  {/* Title + match */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                    <h3 style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '1.5rem', fontWeight: 700 }}>{rec.name}</h3>
                    <span style={{
                      fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '0.95rem', fontWeight: 700,
                      padding: '0.1rem 0.6rem', border: '2px solid var(--text-main)', borderRadius: '4px',
                      backgroundColor: 'var(--yellow)', boxShadow: '2px 2px 0px var(--text-main)', color: 'var(--text-main)',
                    }}>
                      {rec.matchPercentage}% match ✓
                    </span>
                  </div>

                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: rec.skillGaps.length > 0 ? '1rem' : 0, lineHeight: 1.6 }}>{rec.description}</p>

                  {/* Skill gaps */}
                  {rec.skillGaps.length > 0 && (
                    <div>
                      <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#d97706', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.35rem', fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '0.95rem' }}>
                        <AlertCircle size={14} /> Skills to address:
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                        {rec.skillGaps.map((gap: any, i: number) => (
                          <span key={i} style={{
                            fontSize: '0.75rem', fontWeight: 700,
                            padding: '0.2rem 0.65rem',
                            border: '2px solid var(--text-main)', borderRadius: '4px',
                            boxShadow: '1px 1px 0px var(--text-main)',
                            backgroundColor: 'var(--card-bg)', color: 'var(--text-main)',
                            fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '0.9rem',
                          }}>
                            {gap.skill} <span style={{ color: 'var(--text-muted)' }}>({gap.current}→{gap.required})</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <Link to={`/roadmap/${rec.id}`} className="btn-yellow" style={{
                  textDecoration: 'none', fontSize: '0.9rem', whiteSpace: 'nowrap', flexShrink: 0,
                  fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, padding: '0.6rem 1rem',
                  border: '2px solid var(--text-main)', borderRadius: '4px', boxShadow: '3px 3px 0px var(--text-main)',
                  display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                }}>
                  Roadmap <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
