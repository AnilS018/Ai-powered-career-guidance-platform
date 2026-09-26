const Profile = require('../models/Profile');
const AssessmentResult = require('../models/AssessmentResult');
const Career = require('../models/Career');
const ChatHistory = require('../models/ChatHistory');
const {
  generateCareerRecommendation,
  generateChatResponse,
  reviewResume,
} = require('../services/aiService');

// @desc    Get AI-Powered Career Recommendation with structured analysis
// @route   POST /api/ai/career-recommendation
// @access  Private
exports.getAiCareerRecommendation = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('targetCareer');
    const assessmentResult = await AssessmentResult.findOne({ user: req.user.id }).sort({ createdAt: -1 });
    const allCareers = await Career.find();

    const result = await generateCareerRecommendation({
      profile,
      assessmentResult,
      allCareers,
    });

    res.status(200).json({
      success: true,
      careerRecommendations: result.careerRecommendations,
      topMatch: result.topMatch,
      reasoning: result.reasoning,
      skillGaps: result.skillGaps,
      learningRoadmap: result.topMatch?.learningRoadmap || [],
      nextSteps: result.nextSteps,
      aiCounselorNote: result.aiCounselorNote,
    });
  } catch (error) {
    console.error('[AI Career Recommendation Error]', error);
    res.status(500).json({ success: false, message: 'Server error generating AI career guidance.' });
  }
};

// @desc    Chat with AI Career Counselor
// @route   POST /api/ai/chat
// @access  Private
exports.chatWithCounselor = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({ success: false, message: 'Message content is required.' });
    }

    const profile = await Profile.findOne({ user: req.user.id }).populate('targetCareer');

    // Fetch or create chat history
    let chatHistory = await ChatHistory.findOne({ user: req.user.id });
    if (!chatHistory) {
      chatHistory = new ChatHistory({ user: req.user.id, messages: [] });
    }

    const userContext = {
      fullName: req.user.fullName,
      education: req.user.education,
      targetCareerTitle: profile?.targetCareer?.title || 'Engineering & Technology',
      interests: profile?.careerInterests || [],
    };

    const aiResponse = await generateChatResponse({
      message,
      userContext,
      history: chatHistory.messages.slice(-8),
    });

    // Save user message and AI message to history
    chatHistory.messages.push({
      sender: 'user',
      text: message,
      timestamp: new Date(),
    });

    chatHistory.messages.push({
      sender: 'ai',
      text: aiResponse.text,
      timestamp: new Date(),
    });

    // Limit history length to last 50 messages
    if (chatHistory.messages.length > 50) {
      chatHistory.messages = chatHistory.messages.slice(-50);
    }

    await chatHistory.save();

    res.status(200).json({
      success: true,
      reply: aiResponse.text,
      suggestions: aiResponse.suggestions || [],
      messages: chatHistory.messages,
    });
  } catch (error) {
    console.error('[AI Chat Error]', error);
    res.status(500).json({ success: false, message: 'Server error responding to chat.' });
  }
};

// @desc    Get user's chat history
// @route   GET /api/ai/chat/history
// @access  Private
exports.getChatHistory = async (req, res) => {
  try {
    const chatHistory = await ChatHistory.findOne({ user: req.user.id });
    res.status(200).json({
      success: true,
      messages: chatHistory ? chatHistory.messages : [],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error retrieving chat history.' });
  }
};

// @desc    Clear chat history
// @route   DELETE /api/ai/chat/history
// @access  Private
exports.clearChatHistory = async (req, res) => {
  try {
    await ChatHistory.findOneAndUpdate({ user: req.user.id }, { messages: [] });
    res.status(200).json({ success: true, message: 'Chat history cleared.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error clearing chat.' });
  }
};

// @desc    AI Resume Review and Improvement Suggestions
// @route   POST /api/ai/resume-review
// @access  Private
exports.reviewResume = async (req, res) => {
  try {
    const { resumeText, targetCareerTitle } = req.body;
    const profile = await Profile.findOne({ user: req.user.id }).populate('targetCareer');

    const analysis = await reviewResume({
      resumeText: resumeText || '',
      profile,
      targetCareer: targetCareerTitle || profile?.targetCareer?.title || 'Software & AI Engineer',
    });

    res.status(200).json({
      success: true,
      analysis,
    });
  } catch (error) {
    console.error('[AI Resume Review Error]', error);
    res.status(500).json({ success: false, message: 'Server error during resume analysis.' });
  }
};
