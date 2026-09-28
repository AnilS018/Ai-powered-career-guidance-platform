import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import {
  Sparkles,
  Award,
  Compass,
  TrendingUp,
  Target,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  BookOpen,
  MessageSquare,
  FileCheck,
  Headphones,
  GitCompare,
  Zap,
  Flame,
  ChevronRight,
  Loader2
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [assessmentResult, setAssessmentResult] = useState(null);
  const [learningProgress, setLearningProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [profRes, assessRes, learnRes] = await Promise.allSettled([
        api.getProfile(),
        api.getAssessmentResults(),
        api.getLearningProgress(),
      ]);

      if (profRes.status === 'fulfilled' && profRes.value?.success) {
        setProfile(profRes.value.profile);
      }

      if (assessRes.status === 'fulfilled' && assessRes.value?.success) {
        setAssessmentResult(assessRes.value.result);
      }

      if (learnRes.status === 'fulfilled' && learnRes.value?.success) {
        setLearningProgress(learnRes.value);
      }
    } catch (err) {
      console.error('[Dashboard Load Error]', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        <p className="text-xs text-slate-500 font-medium">Loading your career insights...</p>
      </div>
    );
  }

  // Determine top career
  const topRec =
    assessmentResult?.recommendations?.[0] || {
      careerTitle: 'AI/ML Engineer',
      matchPercentage: 86,
      whyRecommended: [
        'Strong Python skills & analytical interest',
        'High mathematical score in technical assessment',
        'Strong aptitude in predictive data modeling'
      ],
      requiredSkills: ['Python', 'Machine Learning', 'Mathematics & Statistics', 'SQL', 'TensorFlow / PyTorch'],
      currentSkills: ['Python', 'SQL', 'Basic Machine Learning'],
      missingSkills: ['Deep Learning', 'Statistics & Calculus', 'TensorFlow']
    };

  const hasAssessment = !!assessmentResult;
  const overallScore = assessmentResult?.overallScore || 84;
  const progressPercent = learningProgress?.progress?.progressPercentage || 33;
  const streakDays = learningProgress?.progress?.streakDays || 5;

  const skillBars = [
    { name: 'Python', score: 80, color: 'bg-indigo-600' },
    { name: 'SQL', score: 70, color: 'bg-cyan-500' },
    { name: 'Machine Learning', score: 50, color: 'bg-purple-600' },
    { name: 'Communication', score: 85, color: 'bg-blue-500' },
    { name: 'Problem Solving', score: 80, color: 'bg-indigo-500' },
    { name: 'Data Analysis', score: 65, color: 'bg-amber-500' },
    { name: 'Web Development', score: 60, color: 'bg-emerald-500' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* WELCOME HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 border border-indigo-900/40 text-white shadow-xl relative overflow-hidden">
        <div className="space-y-2 relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold">
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{streakDays}-Day Learning Streak &bull; Consistent Study</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display">
            Welcome back, {user?.fullName || 'Student'}!
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Continue building your career. Review your assessment recommendations, bridge your missing skills, and stay on track with your learning roadmap.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <Link
            to="/assessment"
            className="px-5 py-3 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-xs shadow-md shadow-indigo-500/30 transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{hasAssessment ? 'Retake Assessment' : 'Take Assessment'}</span>
          </Link>
          <Link
            to="/chat"
            className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition-all flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-cyan-400" />
            <span>Ask AI Counselor</span>
          </Link>
        </div>
      </div>

      {/* 6 DASHBOARD METRIC CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          {
            title: 'Assessment',
            value: hasAssessment ? 'Completed' : 'Pending',
            sub: hasAssessment ? '5 of 5 Steps' : 'Step 1 of 5',
            icon: Award,
            color: 'text-indigo-600',
            bg: 'bg-indigo-50'
          },
          {
            title: 'Skill Score',
            value: `${overallScore}/100`,
            sub: 'Proficiency Index',
            icon: Zap,
            color: 'text-amber-600',
            bg: 'bg-amber-50'
          },
          {
            title: 'Career Match',
            value: `${topRec.matchPercentage}%`,
            sub: topRec.careerTitle,
            icon: Compass,
            color: 'text-cyan-600',
            bg: 'bg-cyan-50'
          },
          {
            title: 'Learning Progress',
            value: `${progressPercent}%`,
            sub: 'Level 1 Active',
            icon: Target,
            color: 'text-purple-600',
            bg: 'bg-purple-50'
          },
          {
            title: 'Skills to Improve',
            value: `${topRec.missingSkills?.length || 3}`,
            sub: 'High Priority',
            icon: GitCompare,
            color: 'text-rose-600',
            bg: 'bg-rose-50'
          },
          {
            title: 'Completed Courses',
            value: `${learningProgress?.progress?.completedModules?.length || 1}`,
            sub: 'Verified Modules',
            icon: BookOpen,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50'
          },
        ].map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
              className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2 hover:shadow-md hover:border-indigo-200 transition-all"
            >
              <div className={`w-8 h-8 rounded-xl ${card.bg} ${card.color} flex items-center justify-center`}>
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {card.title}
                </p>
                <h3 className="text-lg font-extrabold text-slate-900 font-display mt-0.5 truncate">
                  {card.value}
                </h3>
                <p className="text-[11px] text-slate-500 truncate">{card.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* RECOMMENDED CAREER SPOTLIGHT CARD */}
      <div className="bg-white rounded-3xl border border-indigo-200/80 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200/60 px-2.5 py-1 rounded-md">
              Primary AI Recommendation
            </span>
            <div className="flex items-center gap-3 mt-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                {topRec.careerTitle}
              </h2>
              <span className="px-3.5 py-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs rounded-full shadow-sm">
                {topRec.matchPercentage}% Compatibility Match
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/recommendations"
              className="px-4 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-xs font-bold text-slate-700 bg-slate-50 transition-colors"
            >
              All Matches
            </Link>
            <Link
              to="/learning-path"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5"
            >
              <span>Start Learning Path</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Why this career */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Why This Career Was Recommended:
            </h4>
            <ul className="space-y-1.5">
              {(topRec.whyRecommended || []).map((why, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                  <CheckCircle className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                  <span>{why}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Required Market Skills:
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {(topRec.requiredSkills || []).map((s, idx) => (
                <span key={idx} className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 font-medium">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              High-Priority Missing Skills:
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {(topRec.missingSkills || []).map((s, idx) => (
                <span key={idx} className="text-xs px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 font-semibold flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Spotlight Action Bar */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              to="/skill-gap"
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
            >
              <GitCompare className="w-4 h-4" />
              <span>Analyze Skill Gap</span>
            </Link>
            <span className="text-slate-300">&bull;</span>
            <Link
              to="/interview"
              className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1"
            >
              <Headphones className="w-4 h-4" />
              <span>Practice Questions for {topRec.careerTitle}</span>
            </Link>
          </div>

          <Link
            to="/learning-path"
            className="text-xs font-bold text-indigo-700 hover:underline flex items-center gap-1"
          >
            <span>View Full 3-Level Roadmap</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* SKILL OVERVIEW & LEARNING PROGRESS SPLIT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Skill Overview Progress Bars */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-display">
                Skill Overview & Proficiency
              </h3>
              <p className="text-xs text-slate-500">
                Self-reported and assessment validated competencies
              </p>
            </div>
            <Link
              to="/profile"
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700"
            >
              Edit Profile Skills
            </Link>
          </div>

          <div className="space-y-3.5">
            {skillBars.map((skill, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>{skill.name}</span>
                  <span className="text-slate-500">{skill.score}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className={`${skill.color} h-full rounded-full transition-all duration-500`}
                    style={{ width: `${skill.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Progress Widget */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-display">
                  Active Learning Path
                </h3>
                <p className="text-xs text-slate-500">
                  Target: {topRec.careerTitle}
                </p>
              </div>
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200/60 px-2.5 py-1 rounded-md">
                {progressPercent}% Complete
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-200/70 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-indigo-800">
                  <span>Completed Module</span>
                  <CheckCircle className="w-4 h-4 text-indigo-600" />
                </div>
                <p className="text-xs text-indigo-950 font-medium">
                  Level 1 — Python, Git & Data Foundations
                </p>
                <p className="text-[11px] text-indigo-700">
                  Python Basics, Git & GitHub, SQL Basics
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-cyan-50/70 border border-cyan-200/70 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-cyan-800">
                  <span>Current Module in Progress</span>
                  <span className="text-[10px] bg-cyan-200 text-cyan-900 px-2 py-0.5 rounded font-bold">Active</span>
                </div>
                <p className="text-xs text-cyan-950 font-medium">
                  Level 2 — Data Science & Classical Machine Learning
                </p>
                <p className="text-[11px] text-cyan-700">
                  NumPy, Pandas, Scikit-Learn, Feature Engineering
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="text-xs font-bold text-slate-500">
                  Next Recommended Module
                </div>
                <p className="text-xs text-slate-700 font-medium">
                  Level 3 — Deep Learning, Transformers & MLOps
                </p>
              </div>
            </div>
          </div>

          <Link
            to="/learning-path"
            className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs text-center transition-all flex items-center justify-center gap-2 mt-4"
          >
            <span>Resume Learning Path</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 6 QUICK ACTION BUTTONS */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900 font-display">
          Quick Actions & Preparation Tools
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { name: 'Take Assessment', path: '/assessment', icon: Sparkles, color: 'text-indigo-600', bg: 'bg-indigo-50' },
            { name: 'Career Match', path: '/recommendations', icon: Compass, color: 'text-cyan-600', bg: 'bg-cyan-50' },
            { name: 'Learning Roadmap', path: '/learning-path', icon: Target, color: 'text-purple-600', bg: 'bg-purple-50' },
            { name: 'Skill Gap Tool', path: '/skill-gap', icon: GitCompare, color: 'text-rose-600', bg: 'bg-rose-50' },
            { name: 'AI Counselor', path: '/chat', icon: MessageSquare, color: 'text-amber-600', bg: 'bg-amber-50' },
            { name: 'Interview Prep', path: '/interview', icon: Headphones, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          ].map((act, i) => {
            const Icon = act.icon;
            return (
              <Link
                key={i}
                to={act.path}
                className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-indigo-300 hover:shadow-md transition-all flex flex-col items-center text-center space-y-2 group"
              >
                <div className={`w-10 h-10 rounded-xl ${act.bg} ${act.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">
                  {act.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
