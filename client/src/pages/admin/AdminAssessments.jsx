import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import {
  HelpCircle,
  Plus,
  Trash2,
  CheckCircle,
  X,
  Sparkles,
  Loader2
} from 'lucide-react';

const AdminAssessments = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [actionMsg, setActionMsg] = useState('');

  const [formData, setFormData] = useState({
    step: 1,
    category: 'interest',
    question: '',
    description: '',
    option1: '',
    domain1: 'ai_ml',
    option2: '',
    domain2: 'software_dev',
    option3: '',
    domain3: 'data_analyst',
  });

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    setLoading(true);
    try {
      const res = await api.getAssessmentQuestions();
      if (res.success && res.questions) {
        setQuestions(res.questions);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateQuestion = async (e) => {
    e.preventDefault();
    if (!formData.question || !formData.option1 || !formData.option2) return;

    const options = [
      { text: formData.option1, score: 10, affinityDomain: formData.domain1 },
      { text: formData.option2, score: 10, affinityDomain: formData.domain2 },
    ];
    if (formData.option3) {
      options.push({ text: formData.option3, score: 10, affinityDomain: formData.domain3 });
    }

    try {
      const res = await api.createAdminQuestion({
        step: Number(formData.step),
        category: formData.category,
        question: formData.question,
        description: formData.description,
        options,
      });

      if (res.success) {
        setActionMsg('Question created successfully.');
        setShowModal(false);
        setFormData({
          step: 1,
          category: 'interest',
          question: '',
          description: '',
          option1: '',
          domain1: 'ai_ml',
          option2: '',
          domain2: 'software_dev',
          option3: '',
          domain3: 'data_analyst',
        });
        await loadQuestions();
        setTimeout(() => setActionMsg(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteQuestion = async (id) => {
    if (!window.confirm('Delete this question from assessment evaluations?')) return;

    try {
      const res = await api.deleteAdminQuestion(id);
      if (res.success) {
        setActionMsg('Question removed.');
        await loadQuestions();
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
            Psychometric & Aptitude Engine
          </span>
          <h1 className="text-3xl font-extrabold font-display mt-1 text-white">
            Assessment Management
          </h1>
          <p className="text-xs text-slate-400">
            Maintain questions, scoring weights, and career domain mappings across the 5 evaluation steps.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Assessment Question</span>
        </button>
      </div>

      {actionMsg && (
        <div className="p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{actionMsg}</span>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-4">
        {loading ? (
          <div className="p-16 text-center text-slate-500 flex flex-col items-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-indigo-500" />
            <span className="text-xs">Loading question bank...</span>
          </div>
        ) : (
          questions.map((q, idx) => (
            <div
              key={q._id}
              className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-900 uppercase">
                    Step {q.step} &bull; {q.category}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">
                    {(q.options || []).length} Options
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(q._id)}
                  className="text-xs font-bold text-slate-400 hover:text-red-400 flex items-center gap-1 self-end sm:self-auto"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>

              <div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  {idx + 1}. {q.question}
                </h3>
                {q.description && (
                  <p className="text-xs text-slate-400 mt-0.5">{q.description}</p>
                )}
              </div>

              {/* Options pills */}
              <div className="space-y-1.5 pl-4">
                {(q.options || []).map((opt, oIdx) => (
                  <div key={oIdx} className="text-xs text-slate-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                    <span>{opt.text}</span>
                    {opt.affinityDomain && (
                      <span className="text-[10px] text-indigo-300 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-900/60 font-semibold">
                        Domain: {opt.affinityDomain}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* CREATE MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white font-display">Add Assessment Question</h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateQuestion} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                    Step (1 to 5)
                  </label>
                  <select
                    value={formData.step}
                    onChange={(e) => setFormData({ ...formData, step: Number(e.target.value) })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold"
                  >
                    <option value={1}>Step 1 (Interest)</option>
                    <option value={2}>Step 2 (Personality)</option>
                    <option value={3}>Step 3 (Technical)</option>
                    <option value={4}>Step 4 (Aptitude)</option>
                    <option value={5}>Step 5 (Communication)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                    Category Key
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold"
                  >
                    <option value="interest">Interest</option>
                    <option value="personality">Personality</option>
                    <option value="technical">Technical</option>
                    <option value="aptitude">Aptitude</option>
                    <option value="communication">Communication</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                  Question *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  placeholder="Enter the evaluation question..."
                  className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                  Option 1 *
                </label>
                <input
                  type="text"
                  required
                  value={formData.option1}
                  onChange={(e) => setFormData({ ...formData, option1: e.target.value })}
                  placeholder="Option text..."
                  className="w-full text-xs px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                  Option 2 *
                </label>
                <input
                  type="text"
                  required
                  value={formData.option2}
                  onChange={(e) => setFormData({ ...formData, option2: e.target.value })}
                  placeholder="Option text..."
                  className="w-full text-xs px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-800 text-xs font-bold text-slate-400 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-bold text-white shadow-md"
                >
                  Save Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAssessments;
