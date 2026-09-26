const InterviewSession = require('../models/InterviewSession');
const LearningProgress = require('../models/LearningProgress');
const { evaluateInterviewAnswer } = require('../services/aiService');

// Curated question bank across domains
const QUESTION_BANK = {
  'HR Questions': [
    { question: 'Tell me about yourself, your academic background, and your key technical interests.', hint: 'Use the Present, Past, Future framework in 90 seconds.' },
    { question: 'Describe a situation where you had to work with a challenging teammate or strict deadline. How did you handle it?', hint: 'Use STAR format (Situation, Task, Action, Result).' },
    { question: 'Where do you see yourself professionally in the next 3 to 5 years?', hint: 'Focus on skill mastery, contribution to products, and leadership maturity.' },
    { question: 'What is your greatest technical strength, and what is one area you are currently striving to improve?', hint: 'Be authentic and explain what concrete steps you take to improve.' }
  ],
  'Technical Questions': [
    { question: 'Explain the difference between synchronous and asynchronous programming with a real-world example.', hint: 'Discuss blocking vs non-blocking I/O and event loop.' },
    { question: 'What is the purpose of RESTful API architecture and what are the primary HTTP methods?', hint: 'Mention GET, POST, PUT, DELETE, idempotency, and statelessness.' },
    { question: 'Explain how indexing works in a database and what are the trade-offs of having too many indexes.', hint: 'B-Trees, lookup speed vs write/storage overhead.' },
    { question: 'What is the difference between monolithic architecture and microservices?', hint: 'Deployment isolation, scaling, complexity, network overhead.' }
  ],
  'Coding Questions': [
    { question: 'How would you detect a cycle in a singly linked list? What is the optimal time and space complexity?', hint: 'Floyd\'s Tortoise and Hare two-pointer technique.' },
    { question: 'Explain the Two Sum problem: how do you find two numbers that sum up to a target in O(N) time?', hint: 'Hash map for single-pass complement lookup.' },
    { question: 'What is the difference between BFS (Breadth-First Search) and DFS (Depth-First Search)? When would you prefer one over the other?', hint: 'Queue vs Stack/Recursion, shortest path in unweighted graphs vs path existence.' }
  ],
  'SQL Questions': [
    { question: 'What is the difference between INNER JOIN, LEFT JOIN, and FULL OUTER JOIN?', hint: 'Explain match conditions and NULL padding.' },
    { question: 'How do aggregate functions like GROUP BY and HAVING differ from WHERE?', hint: 'WHERE filters rows before aggregation; HAVING filters groups after.' },
    { question: 'Explain database normalization up to Third Normal Form (3NF). Why is it important?', hint: 'Eliminating duplicate data, transitive dependencies, and anomaly prevention.' }
  ],
  'Python Questions': [
    { question: 'What are Python decorators and how do they work under the hood?', hint: 'Functions as first-class citizens taking a function as argument and returning a wrapper.' },
    { question: 'Explain the difference between Python lists, tuples, and dictionaries in terms of mutability and lookup time.', hint: 'List (mutable O(N) search), Tuple (immutable), Dict (hash table O(1) average lookup).' },
    { question: 'What is the Python Global Interpreter Lock (GIL) and how does it impact multi-threading?', hint: 'Thread-safety in CPython, CPU-bound vs I/O-bound concurrency.' }
  ],
  'AI/ML Questions': [
    { question: 'What is the difference between Overfitting and Underfitting in Machine Learning? How do you diagnose and prevent overfitting?', hint: 'Bias-Variance tradeoff, regularization (L1/L2), dropout, cross-validation.' },
    { question: 'Explain how Gradient Descent works and describe the difference between Batch, Mini-batch, and Stochastic Gradient Descent.', hint: 'Learning rate, loss function optimization, batch size trade-offs.' },
    { question: 'What is the difference between Precision and Recall? In what scenario would you prioritize Recall over Precision?', hint: 'False Positives vs False Negatives; medical diagnosis or fraud detection favors high Recall.' }
  ],
  'Project Questions': [
    { question: 'Walk me through the most technically challenging project you have built. What was your role and what architecture did you choose?', hint: 'Focus on problem definition, tech stack selection, and key technical challenges solved.' },
    { question: 'If you had another month to work on your best college project, what would you refactor or improve?', hint: 'Show technical self-awareness: test coverage, caching, CI/CD, responsive UX.' }
  ]
};

// @desc    Start a new interview session
// @route   POST /api/interview/start
// @access  Private
exports.startInterview = async (req, res) => {
  try {
    const { category = 'Technical Questions' } = req.body;

    const questionsList = QUESTION_BANK[category] || QUESTION_BANK['Technical Questions'];

    const sessionQuestions = questionsList.map((q) => ({
      question: q.question,
      category,
      hint: q.hint,
      studentAnswer: '',
      feedback: '',
      score: 0,
      suggestedStructure: '',
      areasToImprove: [],
    }));

    const session = await InterviewSession.create({
      user: req.user.id,
      category,
      status: 'in-progress',
      currentIndex: 0,
      questions: sessionQuestions,
      averageScore: 0,
    });

    res.status(201).json({
      success: true,
      sessionId: session._id,
      category: session.category,
      totalQuestions: session.questions.length,
      currentIndex: 0,
      currentQuestion: session.questions[0],
    });
  } catch (error) {
    console.error('[Start Interview Error]', error);
    res.status(500).json({ success: false, message: 'Server error starting interview session.' });
  }
};

// @desc    Submit answer to current interview question
// @route   POST /api/interview/answer
// @access  Private
exports.submitAnswer = async (req, res) => {
  try {
    const { sessionId, answer } = req.body;

    const session = await InterviewSession.findOne({ _id: sessionId, user: req.user.id });
    if (!session) {
      return res.status(404).json({ success: false, message: 'Interview session not found.' });
    }

    const currentQ = session.questions[session.currentIndex];
    if (!currentQ) {
      return res.status(400).json({ success: false, message: 'No active question found.' });
    }

    // Evaluate answer with AI engine
    const evaluation = await evaluateInterviewAnswer({
      question: currentQ.question,
      studentAnswer: answer,
      category: session.category,
    });

    currentQ.studentAnswer = answer;
    currentQ.feedback = evaluation.feedback;
    currentQ.score = evaluation.score;
    currentQ.suggestedStructure = evaluation.suggestedStructure;
    currentQ.areasToImprove = evaluation.areasToImprove;
    currentQ.answeredAt = new Date();

    const isLastQuestion = session.currentIndex >= session.questions.length - 1;

    if (isLastQuestion) {
      session.status = 'completed';
      const totalScore = session.questions.reduce((sum, q) => sum + (q.score || 0), 0);
      session.averageScore = Math.round((totalScore / session.questions.length) * 10) / 10;
      session.overallFeedback = `Excellent effort! You achieved an average interview rating of ${session.averageScore}/10. Keep practicing with the STAR method and expand on technical trade-offs.`;

      // Award "Interview Practice Completed" badge in LearningProgress
      let progress = await LearningProgress.findOne({ user: req.user.id });
      if (progress && !progress.badgesEarned.some((b) => b.badgeId === 'interview_pro')) {
        progress.badgesEarned.push({
          badgeId: 'interview_pro',
          title: 'Interview Ace',
          description: 'Completed a simulated AI technical/HR mock interview session.',
          icon: 'MessageSquare',
          unlockedAt: new Date(),
        });
        await progress.save();
      }
    } else {
      session.currentIndex += 1;
    }

    await session.save();

    res.status(200).json({
      success: true,
      evaluation,
      isCompleted: isLastQuestion,
      currentIndex: session.currentIndex,
      averageScore: session.averageScore,
      nextQuestion: isLastQuestion ? null : session.questions[session.currentIndex],
      overallFeedback: session.overallFeedback,
    });
  } catch (error) {
    console.error('[Submit Answer Error]', error);
    res.status(500).json({ success: false, message: 'Server error evaluating interview response.' });
  }
};

// @desc    Get interview sessions history
// @route   GET /api/interview/history
// @access  Private
exports.getInterviewHistory = async (req, res) => {
  try {
    const sessions = await InterviewSession.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: sessions.length, sessions });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error retrieving interview history.' });
  }
};
