import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Circle } from 'lucide-react';
import api from '../utils/api';

export default function Roadmap() {
  const { careerId } = useParams();
  const [roadmap, setRoadmap] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRoadmap();
  }, [careerId]);

  const fetchRoadmap = async () => {
    try {
      const { data } = await api.get(`/careers/roadmap/${careerId}`);
      setRoadmap(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="container">Loading roadmap...</div>;
  if (!roadmap) return <div className="container">Roadmap not found.</div>;

  return (
    <div className="container max-w-3xl">
      <Link to="/recommendations" className="flex items-center gap-1 mb-6 text-indigo-600 hover:text-indigo-700" style={{ textDecoration: 'none' }}>
        <ArrowLeft size={18} /> Back to Recommendations
      </Link>

      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Learning Roadmap</h1>
        <h2 className="text-xl text-gray">Target: {roadmap.career}</h2>
      </div>

      <div className="relative ml-3 pl-8 mb-12" style={{ borderLeft: '2px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        {roadmap.steps.map((step: any) => (
          <div key={step.step} className="relative">
            <span className="absolute p-1" style={{ left: '-3rem', top: '0', backgroundColor: '#f8fafc', borderRadius: '50%' }}>
              <Circle size={24} style={{ color: 'var(--primary)', fill: '#eff6ff' }} />
            </span>
            <div className="card m-0 bg-white" style={{ padding: '1.5rem 2rem' }}>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-indigo-600">Step {step.step}: {step.title}</h3>
              </div>
              <p className="text-main mb-6 text-lg">{step.description}</p>
              
              <div className="p-4 rounded-lg bg-gray-50 border">
                <h4 className="text-sm font-semibold mb-3 tracking-wider text-main">RECOMMENDED RESOURCES:</h4>
                <ul className="list-disc list-inside text-sm text-gray" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {step.resources.map((res: string, i: number) => (
                    <li key={i}>{res}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
        {roadmap.steps.length === 0 && (
          <div className="text-center py-12 rounded-lg border-2 border-dashed bg-green-50" style={{ borderColor: 'var(--success)' }}>
            <p className="font-bold text-lg text-green-700">You already have all the required skills for this role! 🎉</p>
          </div>
        )}
      </div>
    </div>
  );
}
