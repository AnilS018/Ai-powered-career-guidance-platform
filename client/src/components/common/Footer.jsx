import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Sparkles, Heart, Shield, Mail, Globe, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                <Compass className="w-5 h-5" />
              </div>
              <span className="font-display font-extrabold text-xl text-white tracking-tight">
                CareerPulse<span className="text-indigo-400">.ai</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm text-slate-400">
              An intelligent, student-first career guidance and mentorship platform. Discover your natural talents, evaluate skill gaps, follow guided learning paths, and prepare for high-impact careers with artificial intelligence.
            </p>
            <div className="flex items-center gap-2 text-xs text-indigo-300 bg-indigo-950/70 border border-indigo-800/60 px-3 py-1.5 rounded-lg w-fit">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Full-Stack AI Project Platform &bull; Production Ready</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 font-display">
              Platform Features
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/assessment" className="hover:text-indigo-300 transition-colors flex items-center gap-1">
                  Career Assessment
                </Link>
              </li>
              <li>
                <Link to="/recommendations" className="hover:text-indigo-300 transition-colors flex items-center gap-1">
                  AI Recommendations
                </Link>
              </li>
              <li>
                <Link to="/skill-gap" className="hover:text-indigo-300 transition-colors flex items-center gap-1">
                  Skill Gap Analysis
                </Link>
              </li>
              <li>
                <Link to="/learning-path" className="hover:text-indigo-300 transition-colors flex items-center gap-1">
                  Learning Roadmaps
                </Link>
              </li>
              <li>
                <Link to="/chat" className="hover:text-indigo-300 transition-colors flex items-center gap-1">
                  AI Career Counselor
                </Link>
              </li>
            </ul>
          </div>

          {/* Career Tracks */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 font-display">
              Target Domains
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/careers" className="hover:text-indigo-300 transition-colors">
                  AI/ML Engineer
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-indigo-300 transition-colors">
                  Software Developer
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-indigo-300 transition-colors">
                  Data Analyst
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-indigo-300 transition-colors">
                  Cybersecurity Analyst
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-indigo-300 transition-colors">
                  UI/UX Designer
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & Prep */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 font-display">
              Career Prep
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/resume" className="hover:text-indigo-300 transition-colors">
                  Resume ATS Review
                </Link>
              </li>
              <li>
                <Link to="/interview" className="hover:text-indigo-300 transition-colors">
                  Mock Interview Practice
                </Link>
              </li>
              <li>
                <Link to="/progress" className="hover:text-indigo-300 transition-colors">
                  Progress & Badges
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-indigo-300 transition-colors">
                  About the Platform
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>&copy; {new Date().getFullYear()} CareerPulse AI. Designed for College Students & Fresh Graduates.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Student Success
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1 text-slate-400">
              <Shield className="w-3.5 h-3.5 text-indigo-400" /> Privacy & Security Guaranteed
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
