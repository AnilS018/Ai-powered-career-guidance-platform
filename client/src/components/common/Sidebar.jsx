import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  User,
  Sparkles,
  Award,
  Compass,
  GitCompare,
  MapPin,
  MessageSquare,
  FileCheck,
  Headphones,
  TrendingUp,
  LogOut,
  ChevronRight,
  Target
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'My Profile', path: '/profile', icon: User },
  { name: 'Career Assessment', path: '/assessment', icon: Sparkles },
  { name: 'Assessment Results', path: '/assessment/results', icon: Award },
  { name: 'Recommendations', path: '/recommendations', icon: Compass },
  { name: 'Skill Gap Analysis', path: '/skill-gap', icon: GitCompare },
  { name: 'Learning Roadmap', path: '/learning-path', icon: Target },
  { name: 'AI Counselor Chat', path: '/chat', icon: MessageSquare },
  { name: 'Resume Optimizer', path: '/resume', icon: FileCheck },
  { name: 'Interview Prep', path: '/interview', icon: Headphones },
  { name: 'Progress & Badges', path: '/progress', icon: TrendingUp },
];

const Sidebar = () => {
  const { user, logout } = useAuth();

  return (
    <aside className="w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between shrink-0 min-h-[calc(100vh-4rem)]">
      {/* Top Section */}
      <div className="p-4 space-y-6">
        {/* User Mini Profile Card */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-50 via-indigo-50/20 to-purple-50/30 border border-slate-200/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-bold flex items-center justify-center shadow-sm">
              {user?.fullName?.charAt(0) || 'S'}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold text-slate-800 truncate leading-tight">
                {user?.fullName || 'Student'}
              </h4>
              <p className="text-[11px] text-slate-500 truncate mt-0.5">
                {user?.college || 'Engineering College'}
              </p>
            </div>
          </div>
          <div className="mt-2.5 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
            <span className="text-slate-500">Target Track</span>
            <span className="font-semibold text-indigo-700 bg-indigo-100/80 px-2 py-0.5 rounded-md truncate max-w-[120px]">
              AI/ML Engineer
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Student Workspaces
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-500/10 text-indigo-700 font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-2.5">
                      <Icon
                        className={`w-4 h-4 transition-colors ${
                          isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'
                        }`}
                      />
                      <span>{item.name}</span>
                    </div>
                    {isActive && <ChevronRight className="w-3.5 h-3.5 text-indigo-600" />}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Controls */}
      <div className="p-4 border-t border-slate-100">
        <button
          type="button"
          onClick={logout}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50/70 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
