const mongoose = require('mongoose');

const learningModuleSchema = new mongoose.Schema(
  {
    moduleId: { type: String, required: true },
    title: { type: String, required: true },
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      required: true,
    },
    description: { type: String, required: true },
    skillsCovered: [{ type: String }],
    estimatedHours: { type: Number, default: 20 },
    courses: [
      {
        title: { type: String, required: true },
        platform: { type: String, default: 'Coursera / edX' },
        link: { type: String, default: '#' },
        free: { type: Boolean, default: true },
      },
    ],
    certifications: [
      {
        name: { type: String, required: true },
        issuer: { type: String, default: 'Industry Standard' },
      },
    ],
  },
  { _id: false }
);

const careerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    futureScope: {
      type: String,
      default: '',
    },
    salaryRange: {
      type: String,
      default: '$65,000 - $130,000',
    },
    marketDemand: {
      type: String,
      enum: ['High', 'Very High', 'Exponential'],
      default: 'Very High',
    },
    requiredSkills: [
      {
        name: { type: String, required: true },
        minProficiency: { type: Number, default: 75 },
        importance: { type: String, enum: ['Core', 'Recommended', 'Nice-to-have'], default: 'Core' },
      },
    ],
    responsibilities: [{ type: String }],
    learningRoadmap: [learningModuleSchema],
    certifications: [
      {
        name: { type: String, required: true },
        issuer: { type: String },
        level: { type: String },
      },
    ],
    interviewTopics: [{ type: String }],
    sampleQuestions: [
      {
        question: { type: String, required: true },
        category: { type: String, default: 'Technical' },
        hint: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Career', careerSchema);
