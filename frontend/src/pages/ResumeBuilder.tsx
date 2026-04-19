import React, { useState, useEffect } from 'react';
import { Download, Plus, Trash2, Github, ExternalLink, Mail, Phone, MapPin } from 'lucide-react';
import api from '../utils/api';

interface Skill {
  id: number;
  name: string;
  category: string;
  level: number;
}

export default function ResumeBuilder() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  // Resume State
  const [personal, setPersonal] = useState({
    name: 'Alex Developer',
    role: 'Full Stack Software Engineer',
    email: 'alex.dev@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Passionate software engineer focused on building scalable web applications and engaging user experiences. Strong background in modern JavaScript frameworks and cloud infrastructure.',
  });

  const [experience, setExperience] = useState([
    { id: 1, company: 'TechFlow Solutions', role: 'Senior Developer', duration: '2022 - Present', description: 'Led frontend architecture migration to React. Improved load times by 40%. Managed a team of 3 junior engineers.' },
    { id: 2, company: 'Startup Inc', role: 'Web Developer', duration: '2020 - 2022', description: 'Developed full-stack features using Node.js and React. Integrated Stripe for payments.' }
  ]);

  const [projects, setProjects] = useState([
    { id: 1, name: 'E-Commerce Dashboard', desc: 'Real-time analytics dashboard with WebSockets and Recharts.', codeLink: 'github.com/alex/dashboard', liveLink: 'dashboard-demo.com' }
  ]);

  const [education, setEducation] = useState([
    { id: 1, school: 'State University', degree: 'B.S. Computer Science', duration: '2016 - 2020', desc: 'GPA: 3.8 | Dean\\'s List' }
  ]);

  const [achievements, setAchievements] = useState([
    { id: 1, text: 'First Place at Global Hackathon 2023 out of 500 teams.' }
  ]);

  useEffect(() => {
    api.get('/skills/me')
      .then(res => setSkills(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (loading) return <div className="container">Loading Resume Builder...</div>;

  return (
    <div className="container" style={{ maxWidth: '1600px' }}>
      <div className="flex justify-between items-center mb-8 animate-slide-in no-print">
        <div>
          <h1 className="text-4xl font-bold mb-2 text-main">Resume Builder</h1>
          <p className="text-gray text-lg">Live-edit and export your tailored professional resume</p>
        </div>
        <button onClick={handlePrint} className="btn-primary" style={{ padding: '0.8rem 1.5rem', fontSize: '1.1rem' }}>
          <Download size={20} /> Export PDF
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
        
        {/* LEFT PANE: Editor (Hidden on Print) */}
        <div className="flex flex-col gap-6 no-print overflow-y-auto" style={{ maxHeight: '80vh', paddingRight: '1rem' }}>
          
          <div className="card m-0 bg-white shadow-sm border border-card-border p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-4 text-main border-b pb-2">Personal Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Full Name" value={personal.name} onChange={e => setPersonal({...personal, name: e.target.value})} className="col-span-2 md:col-span-1" />
              <input type="text" placeholder="Current Role" value={personal.role} onChange={e => setPersonal({...personal, role: e.target.value})} className="col-span-2 md:col-span-1" />
              <input type="email" placeholder="Email" value={personal.email} onChange={e => setPersonal({...personal, email: e.target.value})} />
              <input type="text" placeholder="Phone" value={personal.phone} onChange={e => setPersonal({...personal, phone: e.target.value})} />
              <input type="text" placeholder="Location" value={personal.location} onChange={e => setPersonal({...personal, location: e.target.value})} className="col-span-2" />
              <textarea 
                placeholder="Professional Summary" 
                value={personal.bio} 
                onChange={e => setPersonal({...personal, bio: e.target.value})} 
                className="col-span-2 w-full p-3 rounded-lg border"
                style={{ borderColor: 'var(--card-border)', fontFamily: 'inherit' }}
                rows={4}
              />
            </div>
          </div>

          <div className="card m-0 bg-white shadow-sm border border-card-border p-6 rounded-xl">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h2 className="text-xl font-bold text-main">Experience</h2>
              <button 
                onClick={() => setExperience([...experience, { id: Date.now(), company: '', role: '', duration: '', description: '' }])}
                className="text-primary text-sm font-semibold hover:bg-gray-50 flex items-center gap-1 border-none bg-transparent"
              >
                <Plus size={16}/> Add Work
              </button>
            </div>
            <div className="flex flex-col gap-6">
              {experience.map((exp, index) => (
                <div key={exp.id} className="relative group">
                  <button onClick={() => setExperience(experience.filter(e => e.id !== exp.id))} className="absolute -right-2 -top-2 p-1 bg-red-100 text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition"><Trash2 size={14}/></button>
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" placeholder="Company" value={exp.company} onChange={e => { const newExp = [...experience]; newExp[index].company = e.target.value; setExperience(newExp); }} />
                    <input type="text" placeholder="Role" value={exp.role} onChange={e => { const newExp = [...experience]; newExp[index].role = e.target.value; setExperience(newExp); }} />
                    <input type="text" placeholder="Duration (e.g. 2021 - Present)" value={exp.duration} onChange={e => { const newExp = [...experience]; newExp[index].duration = e.target.value; setExperience(newExp); }} className="col-span-2" />
                    <input type="text" placeholder="Description / Achievements" value={exp.description} onChange={e => { const newExp = [...experience]; newExp[index].description = e.target.value; setExperience(newExp); }} className="col-span-2" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card m-0 bg-white shadow-sm border border-card-border p-6 rounded-xl">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h2 className="text-xl font-bold text-main">Projects</h2>
              <button 
                onClick={() => setProjects([...projects, { id: Date.now(), name: '', desc: '', codeLink: '', liveLink: '' }])}
                className="text-primary text-sm font-semibold hover:bg-gray-50 flex items-center gap-1 border-none bg-transparent"
              >
                <Plus size={16}/> Add Project
              </button>
            </div>
            <div className="flex flex-col gap-6">
              {projects.map((proj, index) => (
                <div key={proj.id} className="relative group">
                  <button onClick={() => setProjects(projects.filter(p => p.id !== proj.id))} className="absolute -right-2 -top-2 p-1 bg-red-100 text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition"><Trash2 size={14}/></button>
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" placeholder="Project Name" value={proj.name} onChange={e => { const newProj = [...projects]; newProj[index].name = e.target.value; setProjects(newProj); }} className="col-span-2" />
                    <input type="text" placeholder="Code Link (e.g. github.com/...)" value={proj.codeLink} onChange={e => { const newProj = [...projects]; newProj[index].codeLink = e.target.value; setProjects(newProj); }} />
                    <input type="text" placeholder="Hosted Link (Optional)" value={proj.liveLink} onChange={e => { const newProj = [...projects]; newProj[index].liveLink = e.target.value; setProjects(newProj); }} />
                    <input type="text" placeholder="Description" value={proj.desc} onChange={e => { const newProj = [...projects]; newProj[index].desc = e.target.value; setProjects(newProj); }} className="col-span-2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="card m-0 bg-white shadow-sm border border-card-border p-6 rounded-xl">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h2 className="text-xl font-bold text-main">Education</h2>
              <button 
                onClick={() => setEducation([...education, { id: Date.now(), school: '', degree: '', duration: '', desc: '' }])}
                className="text-primary text-sm font-semibold hover:bg-gray-50 flex items-center gap-1 border-none bg-transparent"
              >
                <Plus size={16}/> Add Education
              </button>
            </div>
            <div className="flex flex-col gap-4">
              {education.map((edu, index) => (
                <div key={edu.id} className="relative group grid grid-cols-2 gap-3">
                  <button onClick={() => setEducation(education.filter(e => e.id !== edu.id))} className="absolute -right-2 -top-2 p-1 bg-red-100 text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition"><Trash2 size={14}/></button>
                  <input type="text" placeholder="Institution" value={edu.school} onChange={e => { const arr = [...education]; arr[index].school = e.target.value; setEducation(arr); }} />
                  <input type="text" placeholder="Degree" value={edu.degree} onChange={e => { const arr = [...education]; arr[index].degree = e.target.value; setEducation(arr); }} />
                  <input type="text" placeholder="Duration" value={edu.duration} onChange={e => { const arr = [...education]; arr[index].duration = e.target.value; setEducation(arr); }} />
                  <input type="text" placeholder="Details (GPA, awards)" value={edu.desc} onChange={e => { const arr = [...education]; arr[index].desc = e.target.value; setEducation(arr); }} />
                </div>
              ))}
            </div>
          </div>
          
          <div className="card m-0 bg-white shadow-sm border border-card-border p-6 rounded-xl">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h2 className="text-xl font-bold text-main">Extracurricular Achievements</h2>
              <button 
                onClick={() => setAchievements([...achievements, { id: Date.now(), text: '' }])}
                className="text-primary text-sm font-semibold hover:bg-gray-50 flex items-center gap-1 border-none bg-transparent"
              >
                <Plus size={16}/> Add Item
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {achievements.map((ach, index) => (
                <div key={ach.id} className="relative group flex gap-2">
                  <button onClick={() => setAchievements(achievements.filter(a => a.id !== ach.id))} className="text-red-500 hover:bg-red-50 p-2 rounded transition"><Trash2 size={16}/></button>
                  <input type="text" className="flex-1" placeholder="Achievement detail..." value={ach.text} onChange={e => { const arr = [...achievements]; arr[index].text = e.target.value; setAchievements(arr); }} />
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT PANE: Live A4 PDF Preview */}
        <div 
          className="print-fullscreen bg-white shadow-xl mx-auto w-full max-w-[800px] overflow-hidden sticky top-8 print-canvas" 
          style={{ minHeight: '1131px', padding: '3rem 4rem', color: '#000' }}
        >
          {/* Header */}
          <header className="border-b-2 border-gray-300 pb-6 mb-6">
            <h1 className="text-4xl font-bold text-black tracking-tight mb-2 uppercase">{personal.name}</h1>
            <h2 className="text-xl text-indigo-600 font-semibold mb-4">{personal.role}</h2>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-700 font-medium">
              {personal.email && <span className="flex items-center gap-1"><Mail size={14}/> {personal.email}</span>}
              {personal.phone && <span className="flex items-center gap-1"><Phone size={14}/> {personal.phone}</span>}
              {personal.location && <span className="flex items-center gap-1"><MapPin size={14}/> {personal.location}</span>}
            </div>
          </header>

          {/* Intro Bio */}
          {personal.bio && (
            <section className="mb-6">
              <p className="text-gray-800 leading-relaxed text-sm">{personal.bio}</p>
            </section>
          )}

          {/* Tech Skills from Backend */}
          {skills.length > 0 && (
            <section className="mb-6">
              <h3 className="text-lg font-bold text-black border-b border-gray-200 pb-1 mb-3 uppercase tracking-wider">Technical Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <span key={skill.id} className="px-2 py-1 bg-gray-100 text-gray-800 rounded font-medium text-xs border border-gray-200">
                    {skill.name} <span className="text-gray-500 opacity-70 ml-1">L{skill.level}</span>
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <section className="mb-6">
              <h3 className="text-lg font-bold text-black border-b border-gray-200 pb-1 mb-4 uppercase tracking-wider">Experience</h3>
              <div className="flex flex-col gap-5">
                {experience.map(exp => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="font-bold text-black">{exp.role} <span className="text-indigo-600">@ {exp.company}</span></h4>
                      <span className="text-xs font-semibold text-gray-500">{exp.duration}</span>
                    </div>
                    {exp.description && <p className="text-sm text-gray-700 leading-relaxed mt-1">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section className="mb-6">
              <h3 className="text-lg font-bold text-black border-b border-gray-200 pb-1 mb-4 uppercase tracking-wider">Projects</h3>
              <div className="flex flex-col gap-4">
                {projects.map(proj => (
                  <div key={proj.id}>
                    <div className="flex items-baseline gap-3 mb-1">
                      <h4 className="font-bold text-black">{proj.name}</h4>
                      <div className="flex gap-2 text-xs">
                        {proj.codeLink && <a href={`https://${proj.codeLink.replace('https://', '')}`} className="text-gray-500 hover:text-indigo-600 flex items-center gap-1"><Github size={12}/> Code</a>}
                        {proj.liveLink && <a href={`https://${proj.liveLink.replace('https://', '')}`} className="text-gray-500 hover:text-indigo-600 flex items-center gap-1"><ExternalLink size={12}/> Live</a>}
                      </div>
                    </div>
                    {proj.desc && <p className="text-sm text-gray-700 leading-relaxed">{proj.desc}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section className="mb-6">
              <h3 className="text-lg font-bold text-black border-b border-gray-200 pb-1 mb-4 uppercase tracking-wider">Education</h3>
              <div className="flex flex-col gap-4">
                {education.map(edu => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="font-bold text-black">{edu.degree}</h4>
                      <span className="text-xs font-semibold text-gray-500">{edu.duration}</span>
                    </div>
                    <div className="text-sm font-medium text-indigo-600 mb-1">{edu.school}</div>
                    {edu.desc && <p className="text-xs text-gray-600">{edu.desc}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Extracurriculars */}
          {achievements.length > 0 && achievements.some(a => a.text.trim() !== '') && (
            <section>
              <h3 className="text-lg font-bold text-black border-b border-gray-200 pb-1 mb-3 uppercase tracking-wider">Achievements & Activities</h3>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {achievements.filter(a => a.text.trim() !== '').map(ach => (
                  <li key={ach.id}>{ach.text}</li>
                ))}
              </ul>
            </section>
          )}

        </div>
      </div>
    </div>
  );
}
