const mongoose = require('mongoose');

const learningProgressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    career: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Career',
      required: true,
    },
    completedModules: [{ type: String }], // Array of moduleId strings
    completedSkills: [{ type: String }],
    currentModuleId: { type: String, default: '' },
    progressPercentage: { type: Number, default: 0 },
    streakDays: { type: Number, default: 3 },
    lastActiveDate: { type: Date, default: Date.now },
    badgesEarned: [
      {
        badgeId: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String },
        icon: { type: String },
        unlockedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('LearningProgress', learningProgressSchema);
