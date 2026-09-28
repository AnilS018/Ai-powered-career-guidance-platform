import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('careerpulse_token') || null);
  const [loading, setLoading] = useState(true);

  // Initialize and verify existing token
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('careerpulse_token');
      const isDemoMode = localStorage.getItem('careerpulse_demo_mode');

      if (storedToken) {
        if (isDemoMode) {
          const cachedUser = localStorage.getItem('careerpulse_demo_user');
          if (cachedUser) {
            try {
              setUser(JSON.parse(cachedUser));
              setLoading(false);
              return;
            } catch (e) {}
          }
        }

        try {
          const res = await api.getMe();
          if (res && res.success && res.user) {
            setUser(res.user);
          } else {
            if (!isDemoMode) {
              logout();
            }
          }
        } catch (err) {
          if (isDemoMode) {
            const cachedUser = localStorage.getItem('careerpulse_demo_user');
            if (cachedUser) {
              try {
                setUser(JSON.parse(cachedUser));
              } catch (e) {}
            }
          } else {
            console.warn('[Auth] Session expired or invalid:', err.message);
            logout();
          }
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const demoLogin = async (role = 'student') => {
    const isAdm = role === 'admin';
    const fallbackUser = isAdm
      ? {
          id: 'demo-admin-id',
          _id: 'demo-admin-id',
          fullName: 'Platform Administrator',
          email: 'admin@careerpulse.ai',
          role: 'ADMIN',
          college: 'Global Tech Institute',
          education: 'Master of Technology',
          graduationYear: 2022,
          isDemo: true,
        }
      : {
          id: 'demo-student-id',
          _id: 'demo-student-id',
          fullName: 'Demo Student',
          email: 'student@careerpulse.ai',
          role: 'STUDENT',
          college: 'National Institute of Technology',
          education: 'B.Tech Artificial Intelligence and Data Science',
          graduationYear: 2025,
          isDemo: true,
        };

    const fallbackToken = `demo_token_${role}_${Date.now()}`;
    localStorage.setItem('careerpulse_token', fallbackToken);
    localStorage.setItem('careerpulse_demo_mode', role);
    localStorage.setItem('careerpulse_demo_user', JSON.stringify(fallbackUser));
    setToken(fallbackToken);
    setUser(fallbackUser);
    return fallbackUser;
  };

  const login = async (email, password) => {
    const trimmedEmail = (email || '').trim().toLowerCase();
    const isDemoEmail =
      trimmedEmail === 'student@careerpulse.ai' ||
      trimmedEmail === 'admin@careerpulse.ai' ||
      trimmedEmail.includes('demo');

    try {
      const res = await api.login({ email: trimmedEmail, password });
      if (res && res.success && res.token) {
        localStorage.setItem('careerpulse_token', res.token);
        setToken(res.token);
        setUser(res.user);
        if (res.user?.isDemo || isDemoEmail) {
          localStorage.setItem('careerpulse_demo_mode', res.user?.role?.toLowerCase() || (trimmedEmail.includes('admin') ? 'admin' : 'student'));
          localStorage.setItem('careerpulse_demo_user', JSON.stringify(res.user));
        } else {
          localStorage.removeItem('careerpulse_demo_mode');
          localStorage.removeItem('careerpulse_demo_user');
        }
        return res.user;
      }
      throw new Error(res?.message || 'Login failed.');
    } catch (err) {
      if (
        isDemoEmail ||
        err.message?.includes('HTML') ||
        err.message?.includes('backend') ||
        err.message?.includes('reachable') ||
        err.message?.includes('fetch') ||
        err.message?.includes('405') ||
        err.message?.includes('404')
      ) {
        console.warn('[Demo Fallback Active] Activating demo mode for login attempt');
        const role = trimmedEmail.includes('admin') ? 'admin' : 'student';
        return demoLogin(role);
      }
      throw err;
    }
  };

  const register = async (userData) => {
    const res = await api.register(userData);
    if (res && res.success && res.token) {
      localStorage.setItem('careerpulse_token', res.token);
      setToken(res.token);
      setUser(res.user);
      return res.user;
    }
    throw new Error(res?.message || 'Registration failed.');
  };

  const logout = () => {
    localStorage.removeItem('careerpulse_token');
    localStorage.removeItem('careerpulse_demo_mode');
    localStorage.removeItem('careerpulse_demo_user');
    setToken(null);
    setUser(null);
  };

  const refreshUser = async () => {
    const isDemoMode = localStorage.getItem('careerpulse_demo_mode');
    if (isDemoMode) {
      const cached = localStorage.getItem('careerpulse_demo_user');
      if (cached) {
        try {
          setUser(JSON.parse(cached));
          return;
        } catch (e) {}
      }
    }
    try {
      const res = await api.getMe();
      if (res && res.success && res.user) {
        setUser(res.user);
      }
    } catch (e) {
      console.error('[Refresh User Error]', e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'ADMIN',
        login,
        register,
        demoLogin,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
