import React, { useState } from 'react';
import { api } from '../../services/api';
import {
  FileCheck,
  Sparkles,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  Award,
  Zap,
  Loader2
} from 'lucide-react';

const SAMPLE_RESUME = `ALEX RIVERA
alex.rivera@college.edu | +1 (555) 234-5678 | San Francisco, CA
GitHub: github.com/demostudent | LinkedIn: linkedin.com/in/demostudent

EDUCATION
B.Tech in Artificial Intelligence & Data Science | National Institute of Technology (2021 - 2025)
CGPA: 8.8 / 10.0

TECHNICAL SKILLS
Languages: Python, JavaScript, SQL, HTML5, CSS3
Libraries & Frameworks: React.js, Pandas, NumPy, Scikit-Learn, Express.js
Tools & Platforms: Git, GitHub, Docker, VS Code, Linux

ACADEMIC PROJECTS
1. Customer Churn Prediction System (Python, Scikit-Learn, FastAPI)
- Built classification model on telecom dataset predicting churn with 88% precision.
- Designed clean REST API endpoint for real-time model inference.

2. Student Career Portal (React, Node.js, MongoDB)
- Developed responsive web application for university placements.
- Implemented JWT authentication and dynamic dashboard widgets.

EXPERIENCE
Machine Learning Intern | TechNovation Labs (Jun 2024 - Aug 2024)
- Preprocessed 200k+ tabular records and automated exploratory data analysis scripts.`;

const ResumeImprovement = () => {
  const [resumeText, setResumeText] = useState(SAMPLE_RESUME);
  const [targetCareer, setTargetCareer] = useState('AI/ML Engineer');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAudit = async (e) => {
    e.preventDefault();
    if (!resumeText.trim()) return;

    setLoading(true);
    try {
      const res = await api.reviewResume({
        resumeText,
        targetCareerTitle: targetCareer,
      });
      if (res.success && res.analysis) {
        setAnalysis(res.analysis);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadSample = () => {
    setResumeText(SAMPLE_RESUME);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-16">
      {/* Header Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white shadow-xl border border-indigo-900/40 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-cyan-300 text-xs font-semibold">
            <FileCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>ATS Compatibility & Keyword Optimizer</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display">
            Resume Improvement & Audit
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Scan your resume against real recruitment criteria. Detect missing high-impact technical keywords, improve project phrasing using the STAR method, and boost ATS ranking.
          </p>
        </div>

        <button
          type="button"
          onClick={handleLoadSample}
          className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs shrink-0 transition-colors"
        >
          Load Demo Student Resume
        </button>
      </div>

      {/* Editor & Target Career Input Form */}
      <form onSubmit={handleAudit} className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-display">
              Resume Content & Target Domain
            </h3>
            <p className="text-xs text-slate-500">
              Paste your resume text or edit the pre-populated structure below.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600">Target Role:</span>
            <select
              value={targetCareer}
              onChange={(e) => setTargetCareer(e.target.value)}
              className="text-xs px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-800"
            >
              <option value="AI/ML Engineer">AI/ML Engineer</option>
              <option value="Software Developer">Software Developer</option>
              <option value="Data Analyst">Data Analyst</option>
              <option value="Cybersecurity Analyst">Cybersecurity Analyst</option>
              <option value="UI/UX Designer">UI/UX Designer</option>
              <option value="Business Analyst">Business Analyst</option>
              <option value="Digital Marketer">Digital Marketer</option>
            </select>
          </div>
        </div>

        <div>
          <textarea
            rows={12}
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your plain text resume here..."
            className="w-full text-xs font-mono p-4 rounded-2xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 leading-relaxed"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-indigo-600/25 transition-all flex items-center gap-2"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Run AI Resume Audit</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* ANALYSIS RESULTS SECTION */}
      {analysis && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* ATS Score Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-200/60 px-2.5 py-1 rounded-md">
                Audit Summary
              </span>
              <h3 className="text-2xl font-bold text-slate-900 font-display">
                ATS Compatibility & Keyword Match Score
              </h3>
              <p className="text-xs text-slate-500 max-w-xl">
                Scores above 75% typically clear automated recruitment screening filters for campus and off-campus placements.
              </p>
            </div>

            <div className="shrink-0 p-5 rounded-2xl bg-gradient-to-br from-indigo-50 via-purple-50 to-cyan-50 border border-indigo-200 text-center min-w-[140px] shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-800">
                ATS Score
              </span>
              <div className="text-4xl font-black text-indigo-700 font-display">
                {analysis.atsScore}%
              </div>
              <span className="text-[11px] font-semibold text-indigo-700">
                {analysis.atsScore >= 80 ? 'Highly Competitive' : 'Solid Baseline'}
              </span>
            </div>
          </div>

          {/* Keywords Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Detected Keywords */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-700">
                <CheckCircle className="w-4 h-4 text-indigo-600" />
                <span>Detected High-Demand Keywords:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(analysis.skillsDetected || []).map((s, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-800 border border-indigo-200 font-semibold"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Keywords */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>Missing High-Frequency Keywords:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(analysis.missingKeywords || []).map((s, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 font-semibold"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Actionable Improvement Suggestions */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-display">
              Actionable AI Formatting & Content Suggestions
            </h3>
            <div className="space-y-3">
              {(analysis.suggestions || []).map((sug, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{sug}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Project Phrasing Improvements */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-display">
              Project Description Enhancement (STAR Method)
            </h3>
            <div className="space-y-3">
              {(analysis.projectImprovements || []).map((proj, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex items-start gap-3 text-xs sm:text-sm text-slate-800">
                  <Zap className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>{proj}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeImprovement;
