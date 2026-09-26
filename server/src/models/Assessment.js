const mongoose = require('mongoose');

const assessmentQuestionSchema = new mongoose.Schema(
  {
    step: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    category: {
      type: String,
      enum: ['interest', 'personality', 'technical', 'aptitude', 'communication'],
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    options: [
      {
        text: { type: String, required: true },
        score: { type: Number, default: 10 },
        // Associated career traits/skills, e.g., 'ai_ml', 'software_dev', 'cybersecurity'
        affinityDomain: { type: String, default: '' },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('AssessmentQuestion', assessmentQuestionSchema);
