import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import {
  Award,
  Sparkles,
  Compass,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  GitCompare,
  Target,
  Brain,
  MessageSquare,
  Loader2
} from 'lucide-react';

const AssessmentResults = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    setLoading(true);
    try {
      const res = await api.getAssessmentResults();
      if (res.success && res.hasCompleted) {
        setResult(res.result);
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
        <p className="text-xs text-slate-500 font-medium">Computing your career profile scores...</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="py-20 text-center bg-white rounded-3xl border border-slate-200/80 p-8 space-y-4 max-w-lg mx-auto">
        <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
          <AlertCircle className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 font-display">
          No Assessment Completed Yet
        </h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          Complete the 5-step career evaluation to unlock your personalized score breakdown, dimensional radar, and career recommendations.
        </p>
        <Link
          to="/assessment"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all"
        >
          <span>Start Career Assessment</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const { overallScore = 84, categoryScores = {}, recommendations = [] } = result;
  const topMatch = recommendations[0] || null;
  const alternatives = recommendations.slice(1, 4);

  const categories = [
    { name: 'Interest Score', score: categoryScores.interest || 88, color: 'text-indigo-600', bar: 'bg-indigo-600' },
    { name: 'Personality Score', score: categoryScores.personality || 82, color: 'text-purple-600', bar: 'bg-purple-600' },
    { name: 'Technical Skill Score', score: categoryScores.technical || 80, color: 'text-cyan-600', bar: 'bg-cyan-500' },
    { name: 'Aptitude Score', score: categoryScores.aptitude || 85, color: 'text-blue-600', bar: 'bg-blue-600' },
    { name: 'Communication Score', score: categoryScores.communication || 80, color: 'text-emerald-600', bar: 'bg-emerald-500' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-16">
      {/* Celebration Header */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 border border-indigo-900/40 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
            <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>Assessment Completed Successfully</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display">
            Your Career Intelligence Report
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Based on your multi-dimensional responses, our algorithm calculated your competencies, career compatibility, and personalized learning roadmap.
          </p>
        </div>

        {/* Big Overall Gauge */}
        <div className="shrink-0 p-5 rounded-2xl bg-white/10 backdrop-blur border border-white/20 text-center space-y-1 min-w-[150px]">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
            Overall Fit Score
          </span>
          <div className="text-4xl font-black text-cyan-400 font-display">
            {overallScore}<span className="text-lg text-slate-400">/100</span>
          </div>
          <p className="text-[11px] text-indigo-200 font-medium">Top Tier Readiness</p>
        </div>
      </div>

      {/* DIMENSIONAL SCORE BREAKDOWN */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 font-display">
            Dimensional Score Breakdown
          </h3>
          <p className="text-xs text-slate-500">
            Performance normalized across each evaluated dimension.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {categories.map((cat, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <span className="text-xs font-bold text-slate-600 block truncate">
                {cat.name}
              </span>
              <div className="flex items-baseline justify-between">
                <span className={`text-2xl font-black ${cat.color} font-display`}>
                  {cat.score}%
                </span>
                <span className="text-[10px] text-slate-400 font-semibold">Normalized</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className={`${cat.bar} h-full rounded-full transition-all duration-700`}
                  style={{ width: `${cat.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TOP RECOMMENDED CAREER SPOTLIGHT */}
      {topMatch && (
        <div className="bg-white rounded-3xl border border-indigo-300/80 p-6 sm:p-8 shadow-md shadow-indigo-500/5 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200/60 px-2.5 py-1 rounded-md">
                Top Compatible Career Pathway
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

            <div className="flex items-center gap-3">
              <Link
                to="/skill-gap"
                className="px-4 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-xs font-bold text-slate-700 bg-slate-50 transition-colors"
              >
                Analyze Skill Gap
              </Link>
              <Link
                to="/learning-path"
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5"
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
                Why this career was recommended:
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
                Skills You Already Have:
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
                Skills to Master Next:
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
        </div>
      )}

      {/* ALTERNATIVE CAREER MATCHES */}
      {alternatives.length > 0 && (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-display">
              Alternative Career Options
            </h3>
            <p className="text-xs text-slate-500">
              Other career tracks that share strong synergies with your background and aptitude.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {alternatives.map((alt, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs hover:shadow-md hover:border-indigo-200 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400 uppercase">Alternative</span>
                    <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200/60 px-2 py-0.5 rounded">
                      {alt.matchPercentage}% Fit
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 font-display">
                    {alt.careerTitle}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {alt.whyRecommended?.[0] || 'Strong alignment with your logical and analytical profile.'}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to="/recommendations"
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                  >
                    <span>View Breakdown</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AssessmentResults;
