const mongoose = require('mongoose');

const technicalSkillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner',
    },
    proficiency: { type: Number, default: 40, min: 0, max: 100 },
  },
  { _id: false }
);

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    phone: { type: String, default: '' },
    location: { type: String, default: '' },
    bio: { type: String, default: '' },
    education: {
      college: { type: String, default: '' },
      degree: { type: String, default: '' },
      department: { type: String, default: '' },
      graduationYear: { type: Number, default: new Date().getFullYear() },
      cgpa: { type: String, default: '' },
    },
    careerInterests: [{ type: String, trim: true }],
    technicalSkills: [technicalSkillSchema],
    softSkills: [{ type: String, trim: true }],
    preferredIndustries: [{ type: String, trim: true }],
    careerGoal: { type: String, default: '' },
    targetCareer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Career',
    },
    resumeData: {
      summary: { type: String, default: '' },
      projects: [{ title: String, description: String, techStack: [String], link: String }],
      experience: [{ role: String, company: String, duration: String, description: String }],
      certifications: [String],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Profile', profileSchema);
