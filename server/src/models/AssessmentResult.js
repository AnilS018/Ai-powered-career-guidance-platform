const mongoose = require('mongoose');

const assessmentResultSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    overallScore: {
      type: Number,
      required: true,
      default: 0,
    },
    categoryScores: {
      interest: { type: Number, default: 0 },
      personality: { type: Number, default: 0 },
      technical: { type: Number, default: 0 },
      aptitude: { type: Number, default: 0 },
      communication: { type: Number, default: 0 },
    },
    domainAffinities: {
      type: Map,
      of: Number,
      default: {},
    },
    recommendations: [
      {
        careerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Career' },
        careerTitle: String,
        matchPercentage: Number,
        whyRecommended: [String],
        requiredSkills: [String],
        currentSkills: [String],
        missingSkills: [String],
      },
    ],
    answers: [
      {
        questionId: mongoose.Schema.Types.ObjectId,
        category: String,
        selectedOptionText: String,
        scoreEarned: Number,
        affinityDomain: String,
      },
    ],
    completedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('AssessmentResult', assessmentResultSchema);
