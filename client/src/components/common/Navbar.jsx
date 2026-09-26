import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Compass,
  Sparkles,
  User,
  LogOut,
  LayoutDashboard,
  ShieldAlert,
  Menu,
  X,
  ChevronDown,
  Briefcase,
  HelpCircle,
  FileText
} from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout, demoLogin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
    setUserDropdownOpen(false);
  };

  const handleQuickDemo = async (role) => {
    try {
      await demoLogin(role);
      navigate(role === 'admin' ? '/admin' : '/dashboard');
      setMobileMenuOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <span className="font-display font-extrabold text-xl text-slate-900 tracking-tight">
              CareerPulse<span className="text-indigo-600">.ai</span>
            </span>
            <span className="hidden sm:inline-block ml-1.5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200/60 rounded">
              Guidance Platform
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-600">
          <Link
            to="/"
            className={`px-3.5 py-2 rounded-xl transition-all ${
              isActive('/') ? 'text-indigo-600 bg-indigo-50 font-bold' : 'hover:text-slate-900 hover:bg-slate-100/60'
            }`}
          >
            Home
          </Link>
          <Link
            to="/careers"
            className={`px-3.5 py-2 rounded-xl transition-all ${
              isActive('/careers') ? 'text-indigo-600 bg-indigo-50 font-bold' : 'hover:text-slate-900 hover:bg-slate-100/60'
            }`}
          >
            Explore Careers
          </Link>
          <Link
            to="/about"
            className={`px-3.5 py-2 rounded-xl transition-all ${
              isActive('/about') ? 'text-indigo-600 bg-indigo-50 font-bold' : 'hover:text-slate-900 hover:bg-slate-100/60'
            }`}
          >
            About Us
          </Link>

          {isAuthenticated && (
            <Link
              to="/dashboard"
              className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
                location.pathname.startsWith('/dashboard')
                  ? 'text-indigo-600 bg-indigo-50 font-bold'
                  : 'hover:text-slate-900 hover:bg-slate-100/60'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-indigo-600" />
              Student Portal
            </Link>
          )}

          {isAdmin && (
            <Link
              to="/admin"
              className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
                location.pathname.startsWith('/admin')
                  ? 'text-purple-600 bg-purple-50 font-bold'
                  : 'text-purple-600 hover:bg-purple-50/60'
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-purple-600" />
              Admin
            </Link>
          )}
        </nav>

        {/* Right CTA / User controls */}
        <div className="hidden md:flex items-center gap-3">
          {!isAuthenticated ? (
            <>
              {/* Quick Demo Button */}
              <div className="relative group">
                <button
                  type="button"
                  onClick={() => handleQuickDemo('student')}
                  className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-indigo-200 text-indigo-700 bg-indigo-50/80 hover:bg-indigo-100 transition-all flex items-center gap-1.5 shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  Quick Demo Student
                </button>
              </div>

              <Link
                to="/login"
                className="text-sm font-semibold px-4 py-2 text-slate-700 hover:text-slate-900 transition-colors"
              >
                Sign In
              </Link>

              <Link
                to="/register"
                className="text-sm font-semibold px-4 py-2 rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/25 transition-all hover:scale-[1.02]"
              >
                Get Started Free
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                type="button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2.5 p-1.5 pr-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-white transition-all shadow-sm"
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">
                  {user?.fullName?.charAt(0) || 'U'}
                </div>
                <div className="text-left">
                  <div className="text-xs font-semibold text-slate-800 leading-tight">
                    {user?.fullName || 'Student'}
                  </div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider">
                    {user?.role || 'Student'}
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 divide-y divide-slate-100">
                  <div className="px-4 py-2">
                    <p className="text-xs text-slate-500">Signed in as</p>
                    <p className="text-sm font-semibold text-slate-800 truncate">{user?.email}</p>
                  </div>

                  <div className="py-1 text-sm text-slate-700">
                    <Link
                      to="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50"
                    >
                      <LayoutDashboard className="w-4 h-4 text-indigo-600" />
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50"
                    >
                      <User className="w-4 h-4 text-slate-500" />
                      Student Profile
                    </Link>
                    <Link
                      to="/assessment"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50"
                    >
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      Career Assessment
                    </Link>
                    <Link
                      to="/learning-path"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50"
                    >
                      <Briefcase className="w-4 h-4 text-blue-500" />
                      Learning Roadmap
                    </Link>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-purple-600 hover:bg-purple-50 font-medium"
                      >
                        <ShieldAlert className="w-4 h-4 text-purple-600" />
                        Admin Dashboard
                      </Link>
                    )}
                  </div>

                  <div className="py-1">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          {!isAuthenticated && (
            <button
              onClick={() => handleQuickDemo('student')}
              className="text-[11px] font-semibold px-2 py-1 bg-indigo-100 text-indigo-800 rounded"
            >
              Demo
            </button>
          )}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur px-4 pt-3 pb-6 space-y-2">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-800 hover:bg-slate-100"
          >
            Home
          </Link>
          <Link
            to="/careers"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-800 hover:bg-slate-100"
          >
            Explore Careers
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-800 hover:bg-slate-100"
          >
            About
          </Link>

          {isAuthenticated ? (
            <>
              <div className="pt-2 border-t border-slate-200">
                <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Student Navigation
                </div>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-base font-medium text-indigo-700 bg-indigo-50"
                >
                  Dashboard
                </Link>
                <Link
                  to="/assessment"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-100"
                >
                  Career Assessment
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-100"
                >
                  My Profile
                </Link>
                <Link
                  to="/learning-path"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-100"
                >
                  Learning Roadmap
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-lg text-base font-medium text-purple-700 bg-purple-50"
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-lg text-base font-medium text-red-600 hover:bg-red-50"
                >
                  Sign Out
                </button>
              </div>
            </>
          ) : (
            <div className="pt-4 border-t border-slate-200 space-y-2">
              <div className="flex gap-2">
                <button
                  onClick={() => handleQuickDemo('student')}
                  className="w-1/2 py-2.5 text-xs font-bold rounded-xl border border-indigo-300 bg-indigo-50 text-indigo-800"
                >
                  Demo Student
                </button>
                <button
                  onClick={() => handleQuickDemo('admin')}
                  className="w-1/2 py-2.5 text-xs font-bold rounded-xl border border-purple-300 bg-purple-50 text-purple-800"
                >
                  Demo Admin
                </button>
              </div>
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center py-2.5 rounded-xl bg-indigo-600 text-white font-semibold shadow"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
