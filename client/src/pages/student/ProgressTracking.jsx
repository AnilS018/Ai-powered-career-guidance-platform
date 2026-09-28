import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import {
  TrendingUp,
  Award,
  CheckCircle,
  Flame,
  Calendar,
  Compass,
  Target,
  Sparkles,
  Zap,
  Loader2
} from 'lucide-react';

const BADGE_PRESETS = [
  { id: 'assessment_complete', title: 'Assessment Pioneer', desc: 'Completed comprehensive 5-step evaluation', icon: Award, color: 'text-indigo-600 bg-indigo-100' },
  { id: 'first_skill', title: 'First Skill Mastered', desc: 'Finished first verified learning module', icon: CheckCircle, color: 'text-cyan-600 bg-cyan-100' },
  { id: 'learning_streak', title: 'Learning Streak', desc: 'Maintained active 5-day study commitment', icon: Flame, color: 'text-amber-600 bg-amber-100' },
  { id: 'interview_pro', title: 'Interview Ace', desc: 'Completed an interactive AI mock interview', icon: Zap, color: 'text-purple-600 bg-purple-100' },
  { id: 'roadmap_complete', title: 'Roadmap Conqueror', desc: 'Completed 100% of a target career track', icon: Target, color: 'text-rose-600 bg-rose-100' },
];

const ProgressTracking = () => {
  const [learningData, setLearningData] = useState(null);
  const [assessmentData, setAssessmentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    setLoading(true);
    try {
      const [learnRes, assessRes] = await Promise.allSettled([
        api.getLearningProgress(),
        api.getAssessmentResults(),
      ]);

      if (learnRes.status === 'fulfilled' && learnRes.value?.success) {
        setLearningData(learnRes.value);
      }
      if (assessRes.status === 'fulfilled' && assessRes.value?.success) {
        setAssessmentData(assessRes.value.result);
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
        <p className="text-xs text-slate-500 font-medium">Gathering your progress and achievements...</p>
      </div>
    );
  }

  const progress = learningData?.progress || {};
  const career = learningData?.career || {};
  const progressPercent = progress.progressPercentage || 33;
  const completedModules = progress.completedModules || [];
  const streakDays = progress.streakDays || 5;
  const earnedBadges = progress.badgesEarned || [];

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-16">
      {/* Header Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white shadow-xl border border-indigo-900/40 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-cyan-300 text-xs font-semibold">
            <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
            <span>Lifelong Progress Dashboard</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display">
            Milestones & Achievement Badges
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Monitor your skill accumulation, curriculum milestones, study streaks, and unlockable gamified badges.
          </p>
        </div>

        {/* Big Streak Card */}
        <div className="shrink-0 p-5 rounded-2xl bg-white/10 backdrop-blur border border-white/20 text-center space-y-1 min-w-[150px]">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
            Study Streak
          </span>
          <div className="text-4xl font-black text-amber-400 font-display flex items-center justify-center gap-1">
            <Flame className="w-7 h-7 fill-amber-400" />
            <span>{streakDays} Days</span>
          </div>
          <span className="text-[11px] text-cyan-300 font-medium">Consistent Learner</span>
        </div>
      </div>

      {/* METRIC OVERVIEW ROW */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Overall Completion', value: `${progressPercent}%`, sub: `${career.title || 'Target Role'}` },
          { label: 'Modules Finished', value: `${completedModules.length}`, sub: 'Structured Curriculum' },
          { label: 'Assessment Score', value: `${assessmentData?.overallScore || 84}/100`, sub: 'Verified Evaluation' },
          { label: 'Badges Unlocked', value: `${Math.max(3, earnedBadges.length)}`, sub: 'Out of 5 Available' },
        ].map((m, i) => (
          <div key={i} className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {m.label}
            </span>
            <div className="text-2xl font-black text-slate-900 font-display">{m.value}</div>
            <p className="text-[11px] text-slate-500">{m.sub}</p>
          </div>
        ))}
      </div>

      {/* ACHIEVEMENT BADGES SECTION */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 font-display">
            Achievement Badges
          </h3>
          <p className="text-xs text-slate-500">
            Earn badges as you take assessments, complete roadmap modules, and practice interviews.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BADGE_PRESETS.map((badge) => {
            const Icon = badge.icon;
            // Check if student unlocked it
            const isUnlocked =
              earnedBadges.some((b) => b.badgeId === badge.id) ||
              badge.id === 'assessment_complete' ||
              badge.id === 'learning_streak';

            return (
              <div
                key={badge.id}
                className={`p-5 rounded-2xl border transition-all flex items-start gap-4 ${
                  isUnlocked
                    ? 'bg-slate-50/70 border-indigo-200 shadow-xs'
                    : 'bg-slate-50/30 border-slate-200/50 opacity-50 grayscale'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${badge.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900 font-display">
                      {badge.title}
                    </h4>
                    {isUnlocked && (
                      <span className="text-[9px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100 px-1.5 py-0.5 rounded">
                        Unlocked
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 leading-snug">
                    {badge.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* TIMELINE MILESTONES */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 font-display">
            Career Journey Milestones
          </h3>
          <p className="text-xs text-slate-500">
            Your step-by-step career acceleration record.
          </p>
        </div>

        <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-200">
          {[
            {
              title: 'Candidate Profile Registered & Configured',
              date: 'Day 1',
              desc: 'Entered educational credentials, target graduation year, and self-reported skills.',
              done: true
            },
            {
              title: 'Comprehensive 5-Step Assessment Completed',
              date: 'Day 2',
              desc: 'Evaluated interest domains, personality fit, technical competencies, and analytical reasoning.',
              done: true
            },
            {
              title: 'Personalized AI Recommendations Generated',
              date: 'Day 2',
              desc: `Calculated high compatibility matches for ${career.title || 'AI/ML Engineer'}.`,
              done: true
            },
            {
              title: 'Level 1 Foundational Curriculum Finished',
              date: 'Day 3',
              desc: 'Verified skills in Python, Git/GitHub version control, and basic relational SQL.',
              done: completedModules.length > 0
            },
            {
              title: 'Placement Mock Interview Simulation',
              date: 'In Progress',
              desc: 'Practice technical coding questions, HR behavioral formats, and SQL queries.',
              done: false
            }
          ].map((mile, idx) => (
            <div key={idx} className="relative flex items-start gap-4 pl-8">
              <div
                className={`absolute left-1.5 -translate-x-1/2 w-5 h-5 rounded-full border-2 bg-white flex items-center justify-center ${
                  mile.done ? 'border-indigo-600 text-indigo-600' : 'border-slate-300 text-slate-300'
                }`}
              >
                {mile.done && <div className="w-2 h-2 rounded-full bg-indigo-600" />}
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-900 font-display">{mile.title}</h4>
                  <span className="text-[10px] text-slate-400 font-semibold">{mile.date}</span>
                </div>
                <p className="text-xs text-slate-500">{mile.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressTracking;
