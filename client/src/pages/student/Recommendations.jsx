import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import {
  Compass,
  Sparkles,
  TrendingUp,
  GitCompare,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Target,
  Brain,
  MessageSquare,
  DollarSign,
  Loader2
} from 'lucide-react';

const Recommendations = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadRecommendations();
  }, []);

  const loadRecommendations = async () => {
    setLoading(true);
    try {
      const res = await api.getAiCareerGuidance();
      if (res.success) {
        setData(res);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        <p className="text-xs text-slate-500 font-medium">Synthesizing AI recommendations...</p>
      </div>
    );
  }

  const topMatch = data?.topMatch;
  const recommendations = data?.careerRecommendations || [];
  const aiNote = data?.aiCounselorNote || '';
  const nextSteps = data?.nextSteps || [];

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-16">
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-200/60 px-2.5 py-1 rounded-md">
          Personalized Career Matching
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 font-display">
          AI Career Recommendations & Growth Insights
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
          Our recommendation model matches your academic background, current skill proficiencies, and assessment answers against current hiring market requirements.
        </p>
      </div>

      {/* AI COUNSELOR ADVISORY BANNER */}
      {aiNote && (
        <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white shadow-xl space-y-3 border border-indigo-900/40">
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>AI Career Advisor Synthesis</span>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed text-slate-200">
            {aiNote}
          </p>
          {nextSteps.length > 0 && (
            <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-2 text-xs">
              <span className="text-slate-400 font-semibold">Immediate Next Actions:</span>
              {nextSteps.map((step, idx) => (
                <span key={idx} className="bg-slate-800 px-2.5 py-1 rounded-lg text-cyan-300 font-medium">
                  &bull; {step}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TOP MATCH SPOTLIGHT */}
      {topMatch && (
        <div className="bg-gradient-to-b from-white to-indigo-50/20 rounded-3xl border border-indigo-200/80 p-6 sm:p-8 shadow-xl shadow-indigo-500/5 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100/80 px-2.5 py-1 rounded-md">
                Highest Trajectory Match
              </span>
              <div className="flex items-center gap-3 mt-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                  {topMatch.careerTitle}
                </h2>
                <span className="px-3.5 py-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs rounded-full shadow-sm">
                  {topMatch.matchPercentage}% Compatibility
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to="/skill-gap"
                className="px-4 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-xs font-bold text-slate-700 bg-slate-50 transition-colors"
              >
                Analyze Skill Gap
              </Link>
              <Link
                to="/learning-path"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5"
              >
                <span>Start Learning Path</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
            {/* Why this career */}
            <div className="space-y-2">
              <h4 className="font-bold text-slate-400 uppercase tracking-wider text-xs font-display">
                Rationale & Alignment:
              </h4>
              <ul className="space-y-2">
                {(topMatch.whyRecommended || []).map((why, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-600 text-xs">
                    <CheckCircle className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                    <span>{why}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Current skills */}
            <div className="space-y-2">
              <h4 className="font-bold text-slate-400 uppercase tracking-wider text-xs font-display">
                Competencies You Possess:
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {(topMatch.currentSkills || []).map((s, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-800 border border-indigo-200 font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing skills */}
            <div className="space-y-2">
              <h4 className="font-bold text-slate-400 uppercase tracking-wider text-xs font-display">
                Critical Missing Skills:
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {(topMatch.missingSkills || []).map((s, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 font-semibold flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Growth outlook */}
          {topMatch.futureScope && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3 text-xs text-slate-600">
              <TrendingUp className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-800">Future Industry Scope: </span>
                {topMatch.futureScope}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ALL CAREER MATCHES */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 font-display">
            All Evaluated Career Tracks
          </h3>
          <p className="text-xs text-slate-500">
            Compatibility calculated across other relevant domains.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((career, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200/60 px-2 py-0.5 rounded">
                    {career.matchPercentage}% Compatibility
                  </span>
                  <Link
                    to="/chat"
                    className="text-[11px] text-slate-400 hover:text-indigo-600 flex items-center gap-1"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>Ask Counselor</span>
                  </Link>
                </div>

                <h4 className="text-xl font-bold text-slate-900 font-display">
                  {career.careerTitle}
                </h4>

                <p className="text-xs text-slate-600 line-clamp-2">
                  {career.whyRecommended?.[0] || 'Good alignment with your engineering foundation.'}
                </p>

                {/* Skills Preview */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {(career.requiredSkills || []).slice(0, 4).map((s, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <Link
                  to={`/skill-gap?careerId=${career.careerId || ''}`}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                >
                  <GitCompare className="w-3.5 h-3.5" />
                  <span>Check Skill Gap</span>
                </Link>

                <Link
                  to={`/learning-path?careerId=${career.careerId || ''}`}
                  className="text-xs font-bold text-slate-700 hover:text-slate-900 flex items-center gap-1"
                >
                  <span>View Roadmap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
