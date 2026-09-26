/**
 * API Service for CareerPulse AI
 * Provides standardized HTTP requests with automatic JWT bearer authorization
 */

const rawEnvUrl = (import.meta.env.VITE_API_URL || '').trim();
let API_BASE = '/api';

if (
  rawEnvUrl &&
  !rawEnvUrl.includes('<') &&
  !rawEnvUrl.includes('>') &&
  !rawEnvUrl.includes('your-backend-url')
) {
  API_BASE = rawEnvUrl.endsWith('/') ? rawEnvUrl.slice(0, -1) : rawEnvUrl;
}

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('careerpulse_token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, config);
    const data = await res.json().catch(() => null);

    if (!res.ok) {
      const errorMsg = data?.message || `Request failed with status ${res.status}`;
      throw new Error(errorMsg);
    }

    return data;
  } catch (err) {
    if (err.name === 'TypeError' && err.message?.includes('fetch')) {
      throw new Error(
        'Backend server is not reachable. Please deploy your backend on Render/Railway and set your real live VITE_API_URL.'
      );
    }
    console.error(`[API Error: ${endpoint}]`, err.message);
    throw err;
  }
}

export const api = {
  // Authentication
  login: (credentials) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  register: (userData) =>
    request('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
  getMe: () => request('/auth/me'),
  forgotPassword: (email) =>
    request('/auth/forgot-password', { method: 'POST', body: JSON.stringify({ email }) }),

  // Student Profile
  getProfile: () => request('/profile'),
  updateProfile: (profileData) =>
    request('/profile', { method: 'PUT', body: JSON.stringify(profileData) }),

  // Career Assessment
  getAssessmentQuestions: () => request('/assessments'),
  submitAssessment: (answers) =>
    request('/assessments/submit', { method: 'POST', body: JSON.stringify({ answers }) }),
  getAssessmentResults: () => request('/assessments/results'),

  // Careers & Skill Gap
  getCareers: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/careers${qs ? `?${qs}` : ''}`);
  },
  getCareerById: (id) => request(`/careers/${id}`),
  getCareerRecommendations: () => request('/careers/recommend', { method: 'POST' }),
  getSkillGap: (careerId) =>
    request(`/skill-gap${careerId ? `?careerId=${careerId}` : ''}`),

  // Learning Roadmap & Progress
  getLearningProgress: (careerId) =>
    request(`/learning-path${careerId ? `?careerId=${careerId}` : ''}`),
  updateModuleProgress: (payload) =>
    request('/learning-path/progress', { method: 'POST', body: JSON.stringify(payload) }),

  // AI Services
  getAiCareerGuidance: () => request('/ai/career-recommendation', { method: 'POST' }),
  sendChatMessage: (message) =>
    request('/ai/chat', { method: 'POST', body: JSON.stringify({ message }) }),
  getChatHistory: () => request('/ai/chat/history'),
  clearChatHistory: () => request('/ai/chat/history', { method: 'DELETE' }),
  reviewResume: (payload) =>
    request('/ai/resume-review', { method: 'POST', body: JSON.stringify(payload) }),

  // Interview Preparation
  startInterview: (category) =>
    request('/interview/start', { method: 'POST', body: JSON.stringify({ category }) }),
  submitInterviewAnswer: (payload) =>
    request('/interview/answer', { method: 'POST', body: JSON.stringify(payload) }),
  getInterviewHistory: () => request('/interview/history'),

  // Admin Endpoints
  getAdminUsers: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/admin/users${qs ? `?${qs}` : ''}`);
  },
  updateAdminUser: (id, data) =>
    request(`/admin/users/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteAdminUser: (id) => request(`/admin/users/${id}`, { method: 'DELETE' }),
  getAdminAnalytics: () => request('/admin/analytics'),
  createAdminCareer: (data) =>
    request('/admin/careers', { method: 'POST', body: JSON.stringify(data) }),
  updateAdminCareer: (id, data) =>
    request(`/admin/careers/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteAdminCareer: (id) => request(`/admin/careers/${id}`, { method: 'DELETE' }),
  createAdminQuestion: (data) =>
    request('/admin/assessments', { method: 'POST', body: JSON.stringify(data) }),
  deleteAdminQuestion: (id) =>
    request(`/admin/assessments/${id}`, { method: 'DELETE' }),
};

export default api;
