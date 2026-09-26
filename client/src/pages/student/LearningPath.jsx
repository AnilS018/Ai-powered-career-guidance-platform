import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { api } from '../../services/api';
import {
  Target,
  CheckCircle,
  BookOpen,
  Award,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Flame,
  Check,
  Loader2
} from 'lucide-react';

const LearningPath = () => {
  const [searchParams] = useSearchParams();
  const careerId = searchParams.get('careerId');

  const [career, setCareer] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingModule, setUpdatingModule] = useState(null);

  useEffect(() => {
    loadLearningData();
  }, [careerId]);

  const loadLearningData = async () => {
    setLoading(true);
    try {
      const res = await api.getLearningProgress(careerId);
      if (res.success) {
        setCareer(res.career);
        setProgress(res.progress);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleModule = async (moduleId) => {
    if (!career || !progress) return;
    const isCompleted = progress.completedModules?.includes(moduleId);
    setUpdatingModule(moduleId);

    try {
      const res = await api.updateModuleProgress({
        careerId: career._id,
        moduleId,
        markCompleted: !isCompleted,
      });

      if (res.success) {
        setProgress((prev) => ({
          ...prev,
          completedModules: res.completedModules,
          progressPercentage: res.progressPercentage,
          badgesEarned: res.badgesEarned || prev.badgesEarned,
        }));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setUpdatingModule(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        <p className="text-xs text-slate-500 font-medium">Assembling your personalized curriculum...</p>
      </div>
    );
  }

  const roadmap = career?.learningRoadmap || [];
  const completedModules = progress?.completedModules || [];
  const progressPercent = progress?.progressPercentage || 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 border border-indigo-900/40 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-cyan-300 text-xs font-semibold">
            <Target className="w-3.5 h-3.5 text-cyan-400" />
            <span>Target Role Learning Path</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display">
            {career?.title || 'Personalized Career Roadmap'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Follow this progressive 3-level roadmap to master required market skills, complete verified courses, and earn industry-recognized certifications.
          </p>
        </div>

        {/* Progress Gauge */}
        <div className="shrink-0 p-5 rounded-2xl bg-white/10 backdrop-blur border border-white/20 text-center space-y-1.5 min-w-[150px]">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
            Roadmap Progress
          </span>
          <div className="text-3xl font-black text-cyan-400 font-display">
            {progressPercent}%
          </div>
          <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-cyan-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-[10px] text-slate-300 block">
            {completedModules.length} of {roadmap.length} Modules Done
          </span>
        </div>
      </div>

      {/* ROADMAP LEVELS LIST */}
      <div className="space-y-6">
        {roadmap.map((module, idx) => {
          const isDone = completedModules.includes(module.moduleId);
          const isBusy = updatingModule === module.moduleId;

          const levelBadgeColor =
            module.level === 'Beginner'
              ? 'bg-indigo-50 text-indigo-700 border border-indigo-200/60'
              : module.level === 'Intermediate'
              ? 'bg-purple-50 text-purple-700 border border-purple-200/60'
              : 'bg-cyan-50 text-cyan-700 border border-cyan-200/60';

          return (
            <div
              key={module.moduleId || idx}
              className={`rounded-3xl border transition-all p-6 sm:p-7 space-y-6 ${
                isDone
                  ? 'bg-indigo-50/30 border-indigo-300/80 shadow-xs'
                  : 'bg-white border-slate-200/80 shadow-xs hover:border-slate-300'
              }`}
            >
              {/* Module Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md ${levelBadgeColor}`}>
                      Level {idx + 1} &bull; {module.level}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      ~{module.estimatedHours} Hours
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 font-display">
                    {module.title}
                  </h3>
                </div>

                {/* Mark as Complete Button */}
                <button
                  type="button"
                  onClick={() => handleToggleModule(module.moduleId)}
                  disabled={isBusy}
                  className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs ${
                    isDone
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  {isBusy ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : isDone ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Completed</span>
                    </>
                  ) : (
                    <span>Mark as Complete</span>
                  )}
                </button>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {module.description}
              </p>

              {/* Skills Covered Pills */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Target Competencies Covered:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(module.skillsCovered || []).map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recommended Courses & Free Resources */}
              {(module.courses || []).length > 0 && (
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Recommended Learning Courses:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {module.courses.map((course, cIdx) => (
                      <div
                        key={cIdx}
                        className="p-3.5 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="space-y-0.5 min-w-0">
                          <div className="font-bold text-slate-900 truncate">
                            {course.title}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {course.platform} &bull; {course.free ? 'Free / Audit' : 'Paid'}
                          </div>
                        </div>

                        <a
                          href={course.link || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl text-indigo-600 hover:bg-indigo-50 shrink-0"
                          title="Open Course Resource"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications */}
              {(module.certifications || []).length > 0 && (
                <div className="pt-2 flex items-center gap-2 text-xs text-slate-500">
                  <Award className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>
                    Certification target: <strong className="text-slate-700">{module.certifications[0]?.name}</strong> ({module.certifications[0]?.issuer})
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LearningPath;
