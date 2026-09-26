import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import {
  Compass,
  Search,
  BookOpen,
  Award,
  ChevronRight,
  TrendingUp,
  DollarSign,
  Layers,
  CheckCircle,
  HelpCircle,
  X,
  Sparkles,
  ArrowRight,
  Loader2
} from 'lucide-react';

const CATEGORIES = [
  'All',
  'Artificial Intelligence',
  'Software Engineering',
  'Data & Analytics',
  'Security & Infrastructure',
  'Design & Product',
  'Business & Management',
  'Marketing & Growth'
];

const Careers = () => {
  const [careers, setCareers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeCareer, setActiveCareer] = useState(null);
  const [settingTarget, setSettingTarget] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCareers();
  }, [selectedCategory]);

  const fetchCareers = async () => {
    setLoading(true);
    try {
      const res = await api.getCareers({
        category: selectedCategory,
        search: searchQuery,
      });
      if (res.success && res.careers) {
        setCareers(res.careers);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchCareers();
  };

  const handleSelectAsTarget = async (career) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setSettingTarget(true);
    try {
      await api.updateProfile({ targetCareer: career._id });
      navigate('/learning-path');
    } catch (e) {
      console.error(e);
    } finally {
      setSettingTarget(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Title & Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3.5 py-1 rounded-full border border-indigo-200/60">
          Comprehensive Career Index
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-display">
          Explore High-Growth Tech & Business Careers
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Discover verified roles across AI/ML, Full-Stack Engineering, Data Science, Cybersecurity, and Product Design. Review salary ranges, required skill proficiencies, and interactive roadmaps.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="pt-2 max-w-lg mx-auto flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by career title, skill (e.g. Python, SQL, React)..."
              className="w-full text-xs pl-10 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white shadow-xs"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition-all"
          >
            Search
          </button>
        </form>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar justify-start sm:justify-center">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Careers Grid */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-slate-500 space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
          <p className="text-xs">Loading career pathways...</p>
        </div>
      ) : careers.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
          <Compass className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-700">No career paths matched your search</h3>
          <p className="text-xs text-slate-500">Try adjusting your search keywords or switching category filters.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="text-xs font-semibold text-indigo-600 underline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {careers.map((career) => (
            <div
              key={career._id}
              className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs hover:shadow-xl hover:border-indigo-300 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200/60 px-2.5 py-1 rounded-md">
                    {career.category}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-indigo-500" />
                    {career.marketDemand || 'High Demand'}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-700 transition-colors font-display">
                    {career.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {career.description}
                  </p>
                </div>

                {/* Salary & Meta */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <span className="font-semibold text-slate-800 flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-indigo-600" />
                    {career.salaryRange}
                  </span>
                  <span>{(career.learningRoadmap || []).length} Roadmap Levels</span>
                </div>

                {/* Required Skills Badges */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Core Competencies:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(career.requiredSkills || []).slice(0, 4).map((s, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
                      >
                        {s.name}
                      </span>
                    ))}
                    {(career.requiredSkills || []).length > 4 && (
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-50 text-slate-400">
                        +{(career.requiredSkills || []).length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* View Career Detail Button */}
              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setActiveCareer(career)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 hover:border-indigo-500 hover:text-indigo-700 text-xs font-bold text-slate-700 transition-all text-center flex items-center justify-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>View Details</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectAsTarget(career)}
                  className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-sm"
                  title="Start Learning Path"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* DETAIL MODAL DRAWER */}
      {activeCareer && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 sm:p-8 border-b border-slate-100 flex items-start justify-between sticky top-0 bg-white/95 backdrop-blur z-10">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200/60 px-2.5 py-1 rounded-md">
                  {activeCareer.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 font-display">
                  {activeCareer.title}
                </h2>
                <div className="flex items-center gap-4 mt-2 text-xs font-medium text-slate-500">
                  <span className="text-slate-800 font-semibold">{activeCareer.salaryRange}</span>
                  <span>&bull;</span>
                  <span className="text-indigo-600 font-semibold">{activeCareer.marketDemand} Demand</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveCareer(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-8 text-xs sm:text-sm text-slate-700">
              {/* Description */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs font-display">
                  Overview & Daily Responsibilities
                </h4>
                <p className="leading-relaxed text-slate-600">{activeCareer.description}</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  {(activeCareer.responsibilities || []).map((resp, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Required Skills */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs font-display">
                  Required Competencies & Target Proficiencies
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(activeCareer.requiredSkills || []).map((skill, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                      <div className="flex justify-between font-semibold text-xs text-slate-800">
                        <span>{skill.name}</span>
                        <span className="text-indigo-700 font-bold">{skill.minProficiency}%</span>
                      </div>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-indigo-600 h-full rounded-full"
                          style={{ width: `${skill.minProficiency}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Learning Roadmap Preview */}
              <div className="space-y-4">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs font-display">
                  Curriculum Learning Roadmap
                </h4>
                <div className="space-y-3">
                  {(activeCareer.learningRoadmap || []).map((mod, i) => (
                    <div key={i} className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                          {mod.level}
                        </span>
                        <span className="text-xs text-slate-500">~{mod.estimatedHours} hours</span>
                      </div>
                      <h5 className="font-bold text-slate-900 text-sm">{mod.title}</h5>
                      <p className="text-xs text-slate-600">{mod.description}</p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {(mod.skillsCovered || []).map((s, idx) => (
                          <span key={idx} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Certifications */}
              {(activeCareer.certifications || []).length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs font-display">
                    Recommended Industry Certifications
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeCareer.certifications.map((cert, i) => (
                      <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                        <Award className="w-5 h-5 text-amber-500 shrink-0" />
                        <div>
                          <div className="font-bold text-xs text-slate-800">{cert.name}</div>
                          <div className="text-[10px] text-slate-500">{cert.issuer}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer Actions */}
            <div className="p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setActiveCareer(null)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-white"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => handleSelectAsTarget(activeCareer)}
                disabled={settingTarget}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md flex items-center gap-2"
              >
                {settingTarget ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Start Learning Roadmap</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Careers;
