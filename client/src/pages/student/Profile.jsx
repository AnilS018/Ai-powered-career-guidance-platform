import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import {
  User,
  GraduationCap,
  Sparkles,
  Layers,
  Heart,
  Briefcase,
  Save,
  CheckCircle,
  Plus,
  Trash2,
  AlertCircle,
  Loader2
} from 'lucide-react';

const INTEREST_OPTIONS = [
  'Artificial Intelligence',
  'Software Development',
  'Data Science',
  'Cybersecurity',
  'Design & UI/UX',
  'Digital Marketing',
  'Business Analysis',
  'Cloud Computing',
  'Mobile App Development'
];

const SOFT_SKILLS_OPTIONS = [
  'Communication',
  'Leadership',
  'Teamwork',
  'Problem Solving',
  'Time Management',
  'Critical Thinking',
  'Adaptability',
  'Emotional Intelligence'
];

const INDUSTRY_OPTIONS = [
  'IT & Software',
  'Finance & FinTech',
  'Healthcare & BioTech',
  'Education & EdTech',
  'E-commerce & Retail',
  'Manufacturing & Robotics',
  'Consulting & Services'
];

const Profile = () => {
  const { user, refreshUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState('Intermediate');

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    location: '',
    bio: '',
    education: {
      college: '',
      degree: '',
      department: '',
      graduationYear: new Date().getFullYear(),
      cgpa: '',
    },
    careerInterests: [],
    technicalSkills: [],
    softSkills: [],
    preferredIndustries: [],
    careerGoal: '',
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setLoading(true);
    try {
      const res = await api.getProfile();
      if (res.success && res.profile) {
        setProfile(res.profile);
        setFormData({
          fullName: res.profile.user?.fullName || user?.fullName || '',
          phone: res.profile.phone || '',
          location: res.profile.location || '',
          bio: res.profile.bio || '',
          education: {
            college: res.profile.education?.college || user?.college || '',
            degree: res.profile.education?.degree || user?.education || '',
            department: res.profile.education?.department || 'Computer Science',
            graduationYear: res.profile.education?.graduationYear || user?.graduationYear || new Date().getFullYear(),
            cgpa: res.profile.education?.cgpa || '8.5',
          },
          careerInterests: res.profile.careerInterests || [],
          technicalSkills: res.profile.technicalSkills || [],
          softSkills: res.profile.softSkills || [],
          preferredIndustries: res.profile.preferredIndustries || [],
          careerGoal: res.profile.careerGoal || '',
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleInterestToggle = (interest) => {
    setFormData((prev) => {
      const exists = prev.careerInterests.includes(interest);
      return {
        ...prev,
        careerInterests: exists
          ? prev.careerInterests.filter((i) => i !== interest)
          : [...prev.careerInterests, interest],
      };
    });
  };

  const handleSoftSkillToggle = (skill) => {
    setFormData((prev) => {
      const exists = prev.softSkills.includes(skill);
      return {
        ...prev,
        softSkills: exists
          ? prev.softSkills.filter((s) => s !== skill)
          : [...prev.softSkills, skill],
      };
    });
  };

  const handleIndustryToggle = (ind) => {
    setFormData((prev) => {
      const exists = prev.preferredIndustries.includes(ind);
      return {
        ...prev,
        preferredIndustries: exists
          ? prev.preferredIndustries.filter((i) => i !== ind)
          : [...prev.preferredIndustries, ind],
      };
    });
  };

  const handleAddTechnicalSkill = () => {
    if (!newSkillName.trim()) return;
    const proficiencyMap = { Beginner: 35, Intermediate: 65, Advanced: 90 };
    setFormData((prev) => ({
      ...prev,
      technicalSkills: [
        ...prev.technicalSkills,
        {
          name: newSkillName.trim(),
          level: newSkillLevel,
          proficiency: proficiencyMap[newSkillLevel] || 60,
        },
      ],
    }));
    setNewSkillName('');
  };

  const handleRemoveTechnicalSkill = (idx) => {
    setFormData((prev) => ({
      ...prev,
      technicalSkills: prev.technicalSkills.filter((_, i) => i !== idx),
    }));
  };

  const handleSkillLevelChange = (idx, newLevel) => {
    const proficiencyMap = { Beginner: 35, Intermediate: 65, Advanced: 90 };
    setFormData((prev) => {
      const updated = [...prev.technicalSkills];
      updated[idx].level = newLevel;
      updated[idx].proficiency = proficiencyMap[newLevel] || 60;
      return { ...prev, technicalSkills: updated };
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg('');
    try {
      const res = await api.updateProfile(formData);
      if (res.success) {
        setSuccessMsg('Profile updated successfully!');
        await refreshUser();
        setTimeout(() => setSuccessMsg(''), 4000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        <p className="text-xs text-slate-500">Loading student profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-200/60 px-2.5 py-1 rounded-md">
            Candidate Profile
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 font-display mt-1">
            Student Profile Management
          </h1>
          <p className="text-xs text-slate-500">
            Keep your skills and academic records updated for accurate AI recommendations.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Profile Changes</span>
            </>
          )}
        </button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs font-semibold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-indigo-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* 1. PERSONAL INFORMATION */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 font-display text-base font-bold text-slate-900">
            <User className="w-5 h-5 text-indigo-600" />
            <span>Personal Information</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Email Address
              </label>
              <input
                type="email"
                disabled
                value={user?.email || ''}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Phone Number
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 000-0000"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Location (City / State / Country)
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="San Francisco, CA"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
              Professional Aspirations / Bio
            </label>
            <textarea
              rows={2}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Tell us about your passions, preferred roles, and projects..."
              className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>

        {/* 2. EDUCATIONAL DETAILS */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 font-display text-base font-bold text-slate-900">
            <GraduationCap className="w-5 h-5 text-blue-600" />
            <span>Educational Details</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                College / University
              </label>
              <input
                type="text"
                value={formData.education.college}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    education: { ...formData.education, college: e.target.value },
                  })
                }
                placeholder="National Institute of Technology"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Degree Program
              </label>
              <input
                type="text"
                value={formData.education.degree}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    education: { ...formData.education, degree: e.target.value },
                  })
                }
                placeholder="B.Tech / B.Sc / BCA / MCA"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Department / Major
              </label>
              <input
                type="text"
                value={formData.education.department}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    education: { ...formData.education, department: e.target.value },
                  })
                }
                placeholder="Computer Science & Engineering"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Grad Year
                </label>
                <input
                  type="number"
                  value={formData.education.graduationYear}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      education: { ...formData.education, graduationYear: Number(e.target.value) },
                    })
                  }
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  CGPA / Percentage
                </label>
                <input
                  type="text"
                  value={formData.education.cgpa}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      education: { ...formData.education, cgpa: e.target.value },
                    })
                  }
                  placeholder="8.8 / 10"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3. CAREER INTERESTS */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 font-display text-base font-bold text-slate-900">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span>Career Interests (Select all that apply)</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {INTEREST_OPTIONS.map((interest) => {
              const selected = formData.careerInterests.includes(interest);
              return (
                <button
                  key={interest}
                  type="button"
                  onClick={() => handleInterestToggle(interest)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    selected
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/20'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {interest}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. TECHNICAL SKILLS & PROFICIENCY */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 font-display text-base font-bold text-slate-900">
            <Layers className="w-5 h-5 text-indigo-600" />
            <span>Technical Skills & Proficiency</span>
          </div>

          {/* Add skill input */}
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              placeholder="Add skill (e.g. Python, Docker, PyTorch, React)..."
              className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
            <select
              value={newSkillLevel}
              onChange={(e) => setNewSkillLevel(e.target.value)}
              className="text-xs px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-semibold"
            >
              <option value="Beginner">Beginner (35%)</option>
              <option value="Intermediate">Intermediate (65%)</option>
              <option value="Advanced">Advanced (90%)</option>
            </select>
            <button
              type="button"
              onClick={handleAddTechnicalSkill}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Skill</span>
            </button>
          </div>

          {/* Skill List */}
          <div className="space-y-3 pt-2">
            {formData.technicalSkills.map((skill, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1 min-w-[140px]">
                  <div className="font-bold text-xs text-slate-800">{skill.name}</div>
                  <div className="text-[10px] text-slate-500">{skill.proficiency}% Proficiency</div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {['Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => handleSkillLevelChange(idx, lvl)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-colors ${
                          skill.level === lvl
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'bg-white text-slate-600 border border-slate-200'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveTechnicalSkill(idx)}
                    className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. SOFT SKILLS & 6. PREFERRED INDUSTRIES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Soft Skills */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 font-display text-base font-bold text-slate-900">
              <Heart className="w-5 h-5 text-rose-500" />
              <span>Soft Skills</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {SOFT_SKILLS_OPTIONS.map((skill) => {
                const selected = formData.softSkills.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => handleSoftSkillToggle(skill)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      selected
                        ? 'bg-rose-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {skill}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Preferred Industries */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 font-display text-base font-bold text-slate-900">
              <Briefcase className="w-5 h-5 text-cyan-600" />
              <span>Preferred Industries</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {INDUSTRY_OPTIONS.map((ind) => {
                const selected = formData.preferredIndustries.includes(ind);
                return (
                  <button
                    key={ind}
                    type="button"
                    onClick={() => handleIndustryToggle(ind)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      selected
                        ? 'bg-cyan-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {ind}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Submit Save Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Profile Updates</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
