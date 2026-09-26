import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { api } from '../../services/api';
import {
  GitCompare,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowRight,
  BookOpen,
  Sparkles,
  Target,
  Loader2
} from 'lucide-react';

const SkillGap = () => {
  const [searchParams] = useSearchParams();
  const careerId = searchParams.get('careerId');

  const [gapData, setGapData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSkillGap();
  }, [careerId]);

  const loadSkillGap = async () => {
    setLoading(true);
    try {
      const res = await api.getSkillGap(careerId);
      if (res.success) {
        setGapData(res);
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
        <p className="text-xs text-slate-500 font-medium">Analyzing competencies against career benchmarks...</p>
      </div>
    );
  }

  const {
    careerTitle = 'AI/ML Engineer',
    readinessScore = 72,
    strongSkillsCount = 3,
    totalRequiredSkills = 7,
    skillsComparison = [],
    priorityFocusSkills = []
  } = gapData || {};

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Strong':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">Strong</span>;
      case 'Needs Improvement':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">Needs Improvement</span>;
      case 'Beginner':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800">Beginner</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800">Missing</span>;
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-16">
      {/* Header Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 border border-indigo-900/40 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-cyan-300 text-xs font-semibold">
            <GitCompare className="w-3.5 h-3.5 text-cyan-400" />
            <span>Target Benchmark: {careerTitle}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display">
            Visual Skill Gap Analysis
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Side-by-side comparison between your current verified competencies and the standard requirements expected by hiring organizations.
          </p>
        </div>

        {/* Readiness Score Gauge */}
        <div className="shrink-0 p-5 rounded-2xl bg-white/10 backdrop-blur border border-white/20 text-center space-y-1 min-w-[160px]">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
            Market Readiness
          </span>
          <div className="text-4xl font-black text-cyan-400 font-display">
            {readinessScore}%
          </div>
          <p className="text-[11px] text-indigo-200">
            {strongSkillsCount} of {totalRequiredSkills} Skills at Target
          </p>
        </div>
      </div>

      {/* PRIORITY FOCUS PILL NOTIFICATION */}
      {priorityFocusSkills.length > 0 && (
        <div className="p-5 rounded-3xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                Top Priority Skills to Focus On:
              </h4>
              <p className="text-xs text-amber-800 mt-0.5">
                Bridging these gaps will immediately raise your career readiness into the 90%+ range.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {priorityFocusSkills.map((s, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-xl bg-white text-amber-900 border border-amber-300 font-bold text-xs shadow-xs"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* SKILL COMPARISON TABLE / CARDS */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-display">
              Skill Comparison: Current vs. Required
            </h3>
            <p className="text-xs text-slate-500">
              Evaluated against production engineering standards.
            </p>
          </div>

          <Link
            to="/learning-path"
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5"
          >
            <span>Open Learning Roadmap</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-4">
          {skillsComparison.map((item, idx) => {
            const hasMet = item.currentScore >= item.requiredScore;

            return (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="font-bold text-sm text-slate-900 font-display">
                      {item.skillName}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {item.importance}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {getStatusBadge(item.status)}
                    <span className="text-xs font-bold text-slate-600">
                      Current: {item.currentScore}% / Required: {item.requiredScore}%
                    </span>
                  </div>
                </div>

                {/* Comparative dual progress bars */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                    <span>Current Student Skill: {item.currentScore}%</span>
                    <span>Industry Requirement: {item.requiredScore}%</span>
                  </div>

                  <div className="relative w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                    {/* Required marker line */}
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-slate-600 z-10"
                      style={{ left: `${item.requiredScore}%` }}
                      title={`Target Requirement: ${item.requiredScore}%`}
                    />
                    {/* Current Fill */}
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        hasMet ? 'bg-indigo-600' : 'bg-amber-500'
                      }`}
                      style={{ width: `${item.currentScore}%` }}
                    />
                  </div>
                </div>

                {/* Gap advice if not met */}
                {!hasMet && (
                  <div className="pt-1 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="text-amber-700 font-medium">
                      &bull; Deficit of {item.gap}% to reach required benchmark
                    </span>
                    <Link
                      to="/learning-path"
                      className="text-indigo-600 font-bold hover:underline"
                    >
                      Study in Roadmap &rarr;
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SkillGap;
