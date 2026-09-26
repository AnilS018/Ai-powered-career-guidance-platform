import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import {
  Briefcase,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  X,
  Layers,
  DollarSign,
  Loader2
} from 'lucide-react';

const AdminCareers = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [actionMsg, setActionMsg] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    category: 'Technology',
    description: '',
    salaryRange: '$75,000 - $140,000',
    marketDemand: 'Very High',
    skill1: '',
    skill2: '',
    skill3: '',
  });

  useEffect(() => {
    loadCareers();
  }, []);

  const loadCareers = async () => {
    setLoading(true);
    try {
      const res = await api.getCareers();
      if (res.success && res.careers) {
        setCareers(res.careers);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCareer = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;

    const skills = [formData.skill1, formData.skill2, formData.skill3]
      .filter(Boolean)
      .map((name) => ({ name, minProficiency: 80, importance: 'Core' }));

    try {
      const res = await api.createAdminCareer({
        title: formData.fullName || formData.title,
        category: formData.category,
        description: formData.description,
        salaryRange: formData.salaryRange,
        marketDemand: formData.marketDemand,
        requiredSkills: skills,
        learningRoadmap: [
          {
            moduleId: 'mod_start',
            title: 'Core Fundamentals',
            level: 'Beginner',
            description: 'Introduction to foundational domain skills.',
            skillsCovered: skills.map((s) => s.name),
            estimatedHours: 25,
            courses: [{ title: 'Specialization Basics', platform: 'Coursera', free: true }]
          }
        ]
      });

      if (res.success) {
        setActionMsg('Career track created successfully.');
        setShowCreateModal(false);
        setFormData({
          title: '',
          category: 'Technology',
          description: '',
          salaryRange: '$75,000 - $140,000',
          marketDemand: 'Very High',
          skill1: '',
          skill2: '',
          skill3: '',
        });
        await loadCareers();
        setTimeout(() => setActionMsg(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCareer = async (id) => {
    if (!window.confirm('Delete this career track from the catalog?')) return;

    try {
      const res = await api.deleteAdminCareer(id);
      if (res.success) {
        setActionMsg('Career track removed.');
        await loadCareers();
        setTimeout(() => setActionMsg(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 pb-16 text-slate-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/60 border border-indigo-800/40 px-2.5 py-1 rounded-md">
            Catalog Management
          </span>
          <h1 className="text-3xl font-extrabold font-display mt-1 text-white">
            Career Tracks & Competencies
          </h1>
          <p className="text-xs text-slate-400">
            Define target career requirements, minimum benchmark scores, and curated learning roadmaps.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Career Track</span>
        </button>
      </div>

      {actionMsg && (
        <div className="p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{actionMsg}</span>
        </div>
      )}

      {/* Grid of Careers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {careers.map((career) => (
          <div
            key={career._id}
            className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between shadow-xs hover:border-slate-700 transition-colors"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 bg-indigo-950 px-2.5 py-0.5 rounded border border-indigo-900">
                  {career.category}
                </span>
                <span className="text-[11px] font-semibold text-slate-400">
                  {career.marketDemand}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white font-display">
                  {career.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-3 leading-relaxed">
                  {career.description}
                </p>
              </div>

              <div className="pt-2 text-xs text-slate-400 flex items-center justify-between border-t border-slate-800">
                <span>{career.salaryRange}</span>
                <span>{(career.requiredSkills || []).length} Required Skills</span>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {(career.requiredSkills || []).map((s, i) => (
                  <span key={i} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                    {s.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => handleDeleteCareer(career._id)}
                className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-xl transition-colors"
                title="Delete Career"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE CAREER MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white font-display">Add New Career Track</h3>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCareer} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                  Career Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Cloud DevOps Engineer"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                    Market Demand
                  </label>
                  <select
                    value={formData.marketDemand}
                    onChange={(e) => setFormData({ ...formData, marketDemand: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold"
                  >
                    <option value="High">High</option>
                    <option value="Very High">Very High</option>
                    <option value="Exponential">Exponential</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                  Salary Range
                </label>
                <input
                  type="text"
                  value={formData.salaryRange}
                  onChange={(e) => setFormData({ ...formData, salaryRange: e.target.value })}
                  placeholder="$75,000 - $140,000"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                  Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Explain role duties, tech requirements, and expectations..."
                  className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                  Core Required Skills (Up to 3)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="Skill 1"
                    value={formData.skill1}
                    onChange={(e) => setFormData({ ...formData, skill1: e.target.value })}
                    className="text-xs px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                  <input
                    type="text"
                    placeholder="Skill 2"
                    value={formData.skill2}
                    onChange={(e) => setFormData({ ...formData, skill2: e.target.value })}
                    className="text-xs px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                  <input
                    type="text"
                    placeholder="Skill 3"
                    value={formData.skill3}
                    onChange={(e) => setFormData({ ...formData, skill3: e.target.value })}
                    className="text-xs px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-800 text-xs font-bold text-slate-400 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-bold text-white shadow-md"
                >
                  Create Track
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCareers;
