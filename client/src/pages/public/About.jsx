import React from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  Sparkles,
  Target,
  Brain,
  ShieldCheck,
  GraduationCap,
  Users,
  Lightbulb,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-200/60 px-3.5 py-1.5 rounded-full shadow-xs">
          About CareerPulse AI
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-display">
          Bridging Education and <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent">Real-World Success</span>
        </h1>
        <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          We empower college students and fresh graduates to make confident, data-backed career decisions using artificial intelligence, skill gap analytics, and guided learning roadmaps.
        </p>
      </div>

      {/* 4 Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl bg-white/90 backdrop-blur border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center shadow-xs">
            <Compass className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 font-display">
            What the Platform Does
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            CareerPulse AI is a complete, full-stack career development ecosystem. It analyzes a student’s technical skills, soft skills, educational background, and aptitude to deliver personalized career recommendations, realistic learning roadmaps, and continuous interview readiness.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white/90 backdrop-blur border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center shadow-xs">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 font-display">
            Why Career Guidance is Important
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Over 68% of university engineering and business graduates struggle with career ambiguity and lack clarity on what the modern industry expects. Structured career guidance eliminates trial-and-error, saving months of aimless study and aligning learning with high-demand job market needs.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white/90 backdrop-blur border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center shadow-xs">
            <Brain className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 font-display">
            How Artificial Intelligence is Used
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            We use prompt-engineered Large Language Models (Gemini / OpenAI) combined with mathematical affinity scoring to synthesize multi-dimensional student data. AI evaluates resume ATS compatibility, provides real-time interview answers critiques, and offers 24/7 counseling support.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white/90 backdrop-blur border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shadow-xs">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 font-display">
            How Students Benefit
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Students gain an immediate competitive advantage with clear step-by-step roadmaps (Beginner to Advanced), verified industry certification suggestions, tailored project ideas, and interactive mock interview practice that mimics real corporate placement screenings.
          </p>
        </div>
      </div>

      {/* Ethical AI and Transparency Commitment */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white space-y-4 border border-indigo-900/40 shadow-xl">
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>Our Commitment to Responsible Guidance</span>
        </div>
        <h3 className="text-2xl font-bold font-display">
          Transparent, Student-First Recommendations
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          CareerPulse AI provides guidance based on verified technical benchmarks and academic inputs. We never make unsubstantiated guarantees regarding salaries, placements, or immediate employment. Our goal is to provide honest, actionable feedback so students build real competence.
        </p>
      </div>

      {/* CTA Box */}
      <div className="text-center pt-8 space-y-4">
        <h3 className="text-2xl font-bold text-slate-900 font-display">
          Take Control of Your Career Path Today
        </h3>
        <Link
          to="/assessment"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/25 transition-all hover:scale-105"
        >
          <span>Begin Free Assessment</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default About;
