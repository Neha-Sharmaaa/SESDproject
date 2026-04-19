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
      <Link to="/recommendations" className="flex items-center gap-1 text-indigo-600 mb-6 hover:underline">
        <ArrowLeft size={18} /> Back to Recommendations
      </Link>

      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Learning Roadmap</h1>
        <h2 className="text-xl text-gray">Target: {roadmap.career}</h2>
      </div>

      <div className="relative border-l-2 border-indigo-200 ml-3 pl-8 space-y-12">
        {roadmap.steps.map((step: any) => (
          <div key={step.step} className="relative">
            <span className="absolute -left-12 top-0 bg-white p-1">
              <Circle className="text-indigo-600 fill-white" size={24} />
            </span>
            <div className="card m-0">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold">Step {step.step}: {step.title}</h3>
              </div>
              <p className="text-gray mb-4">{step.description}</p>
              
              <div className="bg-gray-50 p-4 rounded border border-gray-100">
                <h4 className="text-sm font-semibold mb-2">Recommended Resources:</h4>
                <ul className="list-disc list-inside text-sm text-gray space-y-1">
                  {step.resources.map((res: string, i: number) => (
                    <li key={i}>{res}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
        {roadmap.steps.length === 0 && (
          <div className="text-center py-12 bg-green-50 rounded-lg border-2 border-dashed border-green-200">
            <p className="text-green-700 font-bold">You already have all the required skills for this role! 🎉</p>
          </div>
        )}
      </div>
    </div>
  );
}
