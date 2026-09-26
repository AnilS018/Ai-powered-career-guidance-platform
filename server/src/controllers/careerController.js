const Career = require('../models/Career');
const Profile = require('../models/Profile');
const AssessmentResult = require('../models/AssessmentResult');
const { generateCareerRecommendation } = require('../services/aiService');

// @desc    Get all careers
// @route   GET /api/careers
// @access  Public
exports.getCareers = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category && category !== 'All') {
      query.category = new RegExp(category, 'i');
    }

    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { 'requiredSkills.name': new RegExp(search, 'i') },
      ];
    }

    const careers = await Career.find(query).sort({ title: 1 });
    res.status(200).json({ success: true, count: careers.length, careers });
  } catch (error) {
    console.error('[Get Careers Error]', error);
    res.status(500).json({ success: false, message: 'Server error retrieving careers.' });
  }
};

// @desc    Get career by ID or slug
// @route   GET /api/careers/:id
// @access  Public
exports.getCareerById = async (req, res) => {
  try {
    const { id } = req.params;
    let career;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      career = await Career.findById(id);
    } else {
      career = await Career.findOne({ slug: id.toLowerCase() });
    }

    if (!career) {
      return res.status(404).json({ success: false, message: 'Career path not found.' });
    }

    res.status(200).json({ success: true, career });
  } catch (error) {
    console.error('[Get Career By Id Error]', error);
    res.status(500).json({ success: false, message: 'Server error retrieving career details.' });
  }
};

// @desc    Get personalized career recommendations
// @route   POST /api/careers/recommend
// @access  Private
exports.recommendCareers = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const assessmentResult = await AssessmentResult.findOne({ user: req.user.id }).sort({ createdAt: -1 });
    const allCareers = await Career.find();

    const recommendationData = await generateCareerRecommendation({
      profile,
      assessmentResult,
      allCareers,
    });

    res.status(200).json({
      success: true,
      recommendations: recommendationData.careerRecommendations,
      topMatch: recommendationData.topMatch,
      reasoning: recommendationData.reasoning,
      skillGaps: recommendationData.skillGaps,
      nextSteps: recommendationData.nextSteps,
      aiCounselorNote: recommendationData.aiCounselorNote,
    });
  } catch (error) {
    console.error('[Recommend Careers Error]', error);
    res.status(500).json({ success: false, message: 'Server error generating career recommendations.' });
  }
};

// @desc    Calculate skill gap comparison for target career
// @route   GET /api/skill-gap
// @access  Private
exports.getSkillGap = async (req, res) => {
  try {
    const { careerId } = req.query;
    const profile = await Profile.findOne({ user: req.user.id }).populate('targetCareer');

    let targetCareer;
    if (careerId) {
      targetCareer = await Career.findById(careerId);
    } else if (profile?.targetCareer) {
      targetCareer = profile.targetCareer;
    } else {
      // Default to AI/ML Engineer or first career
      targetCareer = (await Career.findOne({ slug: 'ai-ml-engineer' })) || (await Career.findOne());
    }

    if (!targetCareer) {
      return res.status(404).json({ success: false, message: 'Target career not found.' });
    }

    const studentSkills = profile?.technicalSkills || [];

    // Compare each required skill
    const comparison = (targetCareer.requiredSkills || []).map((req) => {
      const match = studentSkills.find(
        (s) => s.name.toLowerCase() === req.name.toLowerCase() ||
               req.name.toLowerCase().includes(s.name.toLowerCase()) ||
               s.name.toLowerCase().includes(req.name.toLowerCase())
      );

      const currentScore = match ? (match.proficiency || 50) : 15;
      const requiredScore = req.minProficiency || 80;

      let status = 'Missing';
      if (currentScore >= requiredScore) {
        status = 'Strong';
      } else if (currentScore >= 45) {
        status = 'Needs Improvement';
      } else if (currentScore >= 20) {
        status = 'Beginner';
      }

      return {
        skillName: req.name,
        currentScore,
        requiredScore,
        status,
        importance: req.importance || 'Core',
        gap: Math.max(0, requiredScore - currentScore),
      };
    });

    const strongCount = comparison.filter((c) => c.status === 'Strong').length;
    const readinessScore = Math.round(
      comparison.reduce((sum, item) => sum + (item.currentScore / item.requiredScore), 0) / (comparison.length || 1) * 100
    );

    res.status(200).json({
      success: true,
      careerTitle: targetCareer.title,
      careerId: targetCareer._id,
      readinessScore: Math.min(100, readinessScore),
      strongSkillsCount: strongCount,
      totalRequiredSkills: comparison.length,
      skillsComparison: comparison,
      priorityFocusSkills: comparison.filter((c) => c.status !== 'Strong').map((c) => c.skillName).slice(0, 3),
    });
  } catch (error) {
    console.error('[Get Skill Gap Error]', error);
    res.status(500).json({ success: false, message: 'Server error analyzing skill gap.' });
  }
};
