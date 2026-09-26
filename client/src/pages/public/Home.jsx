import React from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  Sparkles,
  ArrowRight,
  Target,
  Brain,
  GitCompare,
  TrendingUp,
  MessageSquare,
  FileCheck,
  Headphones,
  CheckCircle,
  Star,
  Users,
  Award,
  Zap,
  ChevronRight
} from 'lucide-react';

const Home = () => {
  return (
    <div className="space-y-24 pb-20">
      {/* HERO SECTION */}
      <section className="relative pt-16 md:pt-24 pb-12 overflow-hidden">
        {/* Ambient Gradient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[760px] h-[400px] bg-gradient-to-tr from-indigo-300/30 via-purple-300/25 to-cyan-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center space-y-8">
          {/* Eyebrow Chip */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold shadow-xs animate-pulse-subtle">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>AI-Driven Education & Career Intelligence Platform</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight font-display max-w-4xl mx-auto leading-[1.12]">
            Discover Your Career.{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent">
              Build Your Future.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            AI-powered career guidance that helps you understand your strengths, discover suitable careers, identify skill gaps, and follow a personalized learning path.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/assessment"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group"
            >
              <span>Take Career Assessment</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/careers"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4 text-indigo-600" />
              <span>Explore Careers</span>
            </Link>
          </div>

          {/* Trust Metrics Pill */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-8 text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-indigo-500" />
              <span>5-Step Aptitude & Skill Mapping</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-indigo-500" />
              <span>Personalized Learning Roadmaps</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-indigo-500" />
              <span>Free for Students & Graduates</span>
            </div>
          </div>
        </div>

        {/* Dashboard Preview Mockup Graphic */}
        <div className="max-w-5xl mx-auto px-4 mt-14">
          <div className="relative rounded-3xl p-3 sm:p-5 bg-gradient-to-b from-indigo-100/60 via-white to-slate-100/50 border border-indigo-200/60 shadow-2xl shadow-indigo-200/30">
            <div className="rounded-2xl overflow-hidden bg-white border border-slate-200/80 p-6 space-y-6">
              {/* Header preview row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">
                    Live Platform Preview
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 font-display">
                    Personalized AI Career Match: AI/ML Engineer (88% Match)
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200/80 font-bold text-xs rounded-full">
                    High Demand &bull; 34% YoY Growth
                  </span>
                </div>
              </div>

              {/* Progress and skill comparison preview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-600">Assessment Score</span>
                    <span className="text-indigo-600 font-bold">84 / 100</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-full rounded-full" style={{ width: '84%' }} />
                  </div>
                  <p className="text-[11px] text-slate-500">Top decile in technical & logical reasoning</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-600">Curriculum Progress</span>
                    <span className="text-cyan-600 font-bold">Level 1 Complete</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-cyan-500 h-full rounded-full" style={{ width: '33%' }} />
                  </div>
                  <p className="text-[11px] text-slate-500">Next: Scikit-Learn & Feature Engineering</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-600">Skill Gap Status</span>
                    <span className="text-amber-600 font-bold">3 Priorities</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="text-[10px] bg-indigo-50 text-indigo-700 font-semibold px-2 py-0.5 rounded">Python: Strong</span>
                    <span className="text-[10px] bg-amber-50 text-amber-800 font-semibold px-2 py-0.5 rounded">PyTorch: Missing</span>
                    <span className="text-[10px] bg-cyan-50 text-cyan-800 font-semibold px-2 py-0.5 rounded">SQL: 70%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-3 mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3.5 py-1 rounded-full border border-indigo-200/60">
            Streamlined Student Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
            How CareerPulse AI Guides Your Career
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            A simple, intuitive four-step framework taking you from uncertainty to employment readiness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Multi-Step Assessment',
              desc: 'Answer intuitive questions evaluating your interests, technical abilities, personality traits, and logical aptitude.',
              icon: Brain,
              color: 'text-indigo-600',
              bg: 'bg-indigo-50'
            },
            {
              step: '02',
              title: 'AI Career Match',
              desc: 'Our engine computes compatibility percentages across leading career domains with clear rationales.',
              icon: Compass,
              color: 'text-cyan-600',
              bg: 'bg-cyan-50'
            },
            {
              step: '03',
              title: 'Bridge The Skill Gap',
              desc: 'Visually compare your current competencies against job market requirements with targeted course suggestions.',
              icon: GitCompare,
              color: 'text-purple-600',
              bg: 'bg-purple-50'
            },
            {
              step: '04',
              title: 'Interview & Grow',
              desc: 'Practice interactive mock interviews, improve your resume for ATS parsers, and consult the AI counselor 24/7.',
              icon: Headphones,
              color: 'text-amber-600',
              bg: 'bg-amber-50'
            }
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all hover:-translate-y-1 relative"
              >
                <div className="text-3xl font-black text-slate-100 absolute top-4 right-4 select-none font-display">
                  {item.step}
                </div>
                <div className={`w-12 h-12 rounded-xl ${item.bg} ${item.color} flex items-center justify-center mb-5`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2 font-display">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* PLATFORM FEATURES GRID */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-3 mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3.5 py-1 rounded-full border border-indigo-200/60">
            All-In-One Career Tech
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
            Everything You Need to Succeed
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Comprehensive tools built specifically for university students, college seniors, and fresh graduates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Career Assessment Engine',
              desc: '5-step evaluation covering interests, personality, technical competencies, quantitative aptitude, and communication skills.',
              link: '/assessment',
              icon: Sparkles,
              tag: 'Step 1'
            },
            {
              title: 'AI Career Recommendations',
              desc: 'Instant rule-based & AI-driven matching revealing your strongest career paths, salary trends, and future scope.',
              link: '/recommendations',
              icon: Compass,
              tag: 'Discovery'
            },
            {
              title: 'Personalized Learning Roadmap',
              desc: 'Structured Beginner, Intermediate, and Advanced milestones with interactive "Mark as Complete" tracking and certifications.',
              link: '/learning-path',
              icon: Target,
              tag: 'Curriculum'
            },
            {
              title: 'Visual Skill Gap Analysis',
              desc: 'Direct comparison between what you know today versus what hiring companies require for your dream position.',
              link: '/skill-gap',
              icon: GitCompare,
              tag: 'Analytics'
            },
            {
              title: '24/7 AI Career Counselor',
              desc: 'Ask questions regarding portfolio projects, career changes, technical dilemmas, and salary expectations anytime.',
              link: '/chat',
              icon: MessageSquare,
              tag: 'Mentorship'
            },
            {
              title: 'Mock Interview Simulator',
              desc: 'Practice technical, HR, Python, and SQL questions one by one with automated AI evaluation, scoring, and model answers.',
              link: '/interview',
              icon: Headphones,
              tag: 'Placement Prep'
            },
            {
              title: 'Resume ATS Optimizer',
              desc: 'Audit your resume bullets, detect missing keywords, and ensure format compliance with Applicant Tracking Systems.',
              link: '/resume',
              icon: FileCheck,
              tag: 'Resume'
            },
            {
              title: 'Progress & Milestone Badges',
              desc: 'Stay motivated with gamified milestone badges, daily learning streaks, and detailed completion analytics.',
              link: '/progress',
              icon: TrendingUp,
              tag: 'Gamification'
            },
            {
              title: 'Explore 7 In-Demand Domains',
              desc: 'Deep-dive into software engineering, artificial intelligence, UI/UX design, cybersecurity, data analytics, and more.',
              link: '/careers',
              icon: Brain,
              tag: 'Directory'
            }
          ].map((card, i) => {
            const Icon = card.icon;
            return (
              <Link
                key={i}
                to={card.link}
                className="group p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-lg hover:border-indigo-300 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50/70 group-hover:bg-indigo-100 text-indigo-700 flex items-center justify-center transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider group-hover:text-indigo-600 transition-colors">
                      {card.tag}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-700 transition-colors font-display">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
                  <span>Explore Feature</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* STUDENT TESTIMONIALS / IMPACT SECTION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white p-8 sm:p-12 shadow-xl border border-indigo-900/50 relative overflow-hidden">
          <div className="max-w-3xl space-y-6 relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 bg-indigo-900/60 border border-indigo-700/60 px-3.5 py-1 rounded-full">
              Student Success Stories
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight">
              &ldquo;CareerPulse AI gave me a clear, non-confusing roadmap when I was struggling to pick between Data Science and Web Development.&rdquo;
            </h2>
            <div className="flex items-center gap-4 pt-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 text-white font-bold flex items-center justify-center text-base shadow-sm">
                AK
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Ananya Kulkarni</h4>
                <p className="text-xs text-slate-400">Final Year B.Tech &bull; Now Associate ML Engineer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
          Ready to Discover Where Your Talents Lead?
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto">
          Start your free 5-step career evaluation right now. No credit card required.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/assessment"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02]"
          >
            Start Career Assessment Now
          </Link>
          <Link
            to="/register"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-all"
          >
            Create Student Account
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
