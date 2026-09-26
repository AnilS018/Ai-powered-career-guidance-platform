import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import StudentLayout from './layouts/StudentLayout';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/common/ProtectedRoute';

// Public Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Careers from './pages/public/Careers';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import ForgotPassword from './pages/public/ForgotPassword';
import NotFound from './pages/public/NotFound';

// Student Pages
import Dashboard from './pages/student/Dashboard';
import Profile from './pages/student/Profile';
import Assessment from './pages/student/Assessment';
import AssessmentResults from './pages/student/AssessmentResults';
import Recommendations from './pages/student/Recommendations';
import LearningPath from './pages/student/LearningPath';
import SkillGap from './pages/student/SkillGap';
import ChatCounselorPage from './pages/student/ChatCounselorPage';
import ResumeImprovement from './pages/student/ResumeImprovement';
import InterviewPrep from './pages/student/InterviewPrep';
import ProgressTracking from './pages/student/ProgressTracking';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminCareers from './pages/admin/AdminCareers';
import AdminAssessments from './pages/admin/AdminAssessments';
import AdminAnalytics from './pages/admin/AdminAnalytics';

function App() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* Student Protected Pages */}
      <Route element={<ProtectedRoute />}>
        <Route element={<StudentLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/assessment/results" element={<AssessmentResults />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/learning-path" element={<LearningPath />} />
          <Route path="/skill-gap" element={<SkillGap />} />
          <Route path="/chat" element={<ChatCounselorPage />} />
          <Route path="/resume" element={<ResumeImprovement />} />
          <Route path="/interview" element={<InterviewPrep />} />
          <Route path="/progress" element={<ProgressTracking />} />
        </Route>
      </Route>

      {/* Admin Protected Pages */}
      <Route element={<ProtectedRoute requireAdmin={true} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/careers" element={<AdminCareers />} />
          <Route path="/admin/assessments" element={<AdminAssessments />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
        </Route>
      </Route>

      {/* 404 Catch All */}
      <Route element={<PublicLayout />}>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
