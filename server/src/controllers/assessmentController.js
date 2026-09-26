const AssessmentQuestion = require('../models/Assessment');
const AssessmentResult = require('../models/AssessmentResult');
const Career = require('../models/Career');
const Profile = require('../models/Profile');
const LearningProgress = require('../models/LearningProgress');
const { generateCareerRecommendation } = require('../services/aiService');

// @desc    Get assessment questions (5 steps)
// @route   GET /api/assessments
// @access  Public / Private
exports.getQuestions = async (req, res) => {
  try {
    const questions = await AssessmentQuestion.find().sort({ step: 1, _id: 1 });
    res.status(200).json({ success: true, count: questions.length, questions });
  } catch (error) {
    console.error('[Get Questions Error]', error);
    res.status(500).json({ success: false, message: 'Server error retrieving questions.' });
  }
};

// @desc    Submit assessment responses
// @route   POST /api/assessments/submit
// @access  Private
exports.submitAssessment = async (req, res) => {
  try {
    const { answers } = req.body; // Array of { questionId, selectedOptionText, score, category, affinityDomain }

    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ success: false, message: 'Please provide assessment answers.' });
    }

    const categoryScores = {
      interest: 0,
      personality: 0,
      technical: 0,
      aptitude: 0,
      communication: 0,
    };
    const categoryCounts = {
      interest: 0,
      personality: 0,
      technical: 0,
      aptitude: 0,
      communication: 0,
    };
    const domainAffinities = new Map();

    answers.forEach((ans) => {
      const cat = ans.category ? ans.category.toLowerCase() : 'technical';
      const score = Number(ans.score) || 10;
      if (categoryScores[cat] !== undefined) {
        categoryScores[cat] += score;
        categoryCounts[cat] += 1;
      }
      if (ans.affinityDomain) {
        const cur = domainAffinities.get(ans.affinityDomain) || 0;
        domainAffinities.set(ans.affinityDomain, cur + 1);
      }
    });

    // Normalize each category score to a 0-100 scale
    const normalizedCategoryScores = {};
    let totalScoreSum = 0;
    let categoryNum = 0;

    Object.keys(categoryScores).forEach((cat) => {
      const count = categoryCounts[cat] || 1;
      // Each question max default score is 10
      const normalized = Math.min(100, Math.round((categoryScores[cat] / (count * 10)) * 100));
      normalizedCategoryScores[cat] = Math.max(20, normalized);
      totalScoreSum += normalizedCategoryScores[cat];
      categoryNum += 1;
    });

    const overallScore = Math.round(totalScoreSum / (categoryNum || 1));

    // Fetch user profile and all careers to compute recommendations
    const profile = await Profile.findOne({ user: req.user.id });
    const allCareers = await Career.find();

    const recommendationData = await generateCareerRecommendation({
      profile,
      assessmentResult: { categoryScores: normalizedCategoryScores },
      allCareers,
    });

    // Save assessment result
    const result = await AssessmentResult.create({
      user: req.user.id,
      overallScore,
      categoryScores: normalizedCategoryScores,
      domainAffinities: Object.fromEntries(domainAffinities),
      recommendations: recommendationData.careerRecommendations || [],
      answers: answers.map((a) => ({
        questionId: a.questionId,
        category: a.category,
        selectedOptionText: a.selectedOptionText,
        scoreEarned: a.score,
        affinityDomain: a.affinityDomain,
      })),
      completedAt: new Date(),
    });

    // Award "Assessment Completed" badge in LearningProgress
    if (recommendationData.topMatch) {
      let progress = await LearningProgress.findOne({ user: req.user.id });
      if (!progress) {
        progress = new LearningProgress({
          user: req.user.id,
          career: recommendationData.topMatch.careerId,
          completedModules: [],
          completedSkills: [],
          badgesEarned: [],
        });
      }

      const hasAssessmentBadge = progress.badgesEarned.some((b) => b.badgeId === 'assessment_complete');
      if (!hasAssessmentBadge) {
        progress.badgesEarned.push({
          badgeId: 'assessment_complete',
          title: 'Assessment Pioneer',
          description: 'Completed comprehensive 5-step career & aptitude evaluation.',
          icon: 'Award',
          unlockedAt: new Date(),
        });
      }
      await progress.save();

      // Update targetCareer in profile if not already set
      if (profile && !profile.targetCareer) {
        profile.targetCareer = recommendationData.topMatch.careerId;
        await profile.save();
      }
    }

    res.status(201).json({
      success: true,
      message: 'Assessment completed successfully!',
      result,
      topRecommendation: recommendationData.topMatch,
    });
  } catch (error) {
    console.error('[Submit Assessment Error]', error);
    res.status(500).json({ success: false, message: 'Server error processing assessment submission.' });
  }
};

// @desc    Get latest assessment results
// @route   GET /api/assessments/results
// @access  Private
exports.getResults = async (req, res) => {
  try {
    const result = await AssessmentResult.findOne({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate('recommendations.careerId');

    if (!result) {
      return res.status(200).json({
        success: true,
        hasCompleted: false,
        message: 'No assessment completed yet.',
        result: null,
      });
    }

    res.status(200).json({
      success: true,
      hasCompleted: true,
      result,
    });
  } catch (error) {
    console.error('[Get Results Error]', error);
    res.status(500).json({ success: false, message: 'Server error retrieving assessment results.' });
  }
};
