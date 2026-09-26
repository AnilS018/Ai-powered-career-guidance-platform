const mongoose = require('mongoose');

const qaPairSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    category: { type: String, default: 'Technical' },
    hint: { type: String },
    studentAnswer: { type: String, default: '' },
    feedback: { type: String, default: '' },
    score: { type: Number, default: 0 }, // 0 to 10
    suggestedStructure: { type: String, default: '' },
    areasToImprove: [{ type: String }],
    answeredAt: { type: Date },
  },
  { _id: true }
);

const interviewSessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['HR Questions', 'Technical Questions', 'Coding Questions', 'SQL Questions', 'Python Questions', 'AI/ML Questions', 'Project Questions', 'Comprehensive Mock'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'completed'],
      default: 'in-progress',
    },
    currentIndex: {
      type: Number,
      default: 0,
    },
    questions: [qaPairSchema],
    overallFeedback: {
      type: String,
      default: '',
    },
    averageScore: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('InterviewSession', interviewSessionSchema);
