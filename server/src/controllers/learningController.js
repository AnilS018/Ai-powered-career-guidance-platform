const LearningProgress = require('../models/LearningProgress');
const Career = require('../models/Career');
const Profile = require('../models/Profile');

// @desc    Get user's learning roadmap and progress
// @route   GET /api/learning-path
// @access  Private
exports.getLearningProgress = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Determine target career
    let career;
    if (req.query.careerId) {
      career = await Career.findById(req.query.careerId);
    } else if (profile?.targetCareer) {
      career = await Career.findById(profile.targetCareer);
    } else {
      career = (await Career.findOne({ slug: 'ai-ml-engineer' })) || (await Career.findOne());
    }

    if (!career) {
      return res.status(404).json({ success: false, message: 'Career roadmap not found.' });
    }

    let progress = await LearningProgress.findOne({ user: req.user.id, career: career._id });

    if (!progress) {
      // Initialize progress
      const firstModule = career.learningRoadmap && career.learningRoadmap[0] ? career.learningRoadmap[0].moduleId : 'mod_1';
      progress = await LearningProgress.create({
        user: req.user.id,
        career: career._id,
        completedModules: [],
        completedSkills: [],
        currentModuleId: firstModule,
        progressPercentage: 0,
        streakDays: 4,
        badgesEarned: [
          {
            badgeId: 'career_starter',
            title: 'Pathfinder Initiated',
            description: 'Selected target career and initialized personalized learning path.',
            icon: 'Compass',
            unlockedAt: new Date(),
          },
        ],
      });
    }

    // Calculate percentage
    const totalModules = (career.learningRoadmap || []).length || 1;
    const completedCount = (progress.completedModules || []).length;
    const progressPercentage = Math.round((completedCount / totalModules) * 100);

    res.status(200).json({
      success: true,
      career,
      progress: {
        _id: progress._id,
        completedModules: progress.completedModules,
        completedSkills: progress.completedSkills,
        currentModuleId: progress.currentModuleId,
        progressPercentage,
        streakDays: progress.streakDays,
        badgesEarned: progress.badgesEarned,
      },
    });
  } catch (error) {
    console.error('[Get Learning Progress Error]', error);
    res.status(500).json({ success: false, message: 'Server error retrieving learning progress.' });
  }
};

// @desc    Toggle or Mark Module/Skill as Complete
// @route   POST /api/learning-path/progress
// @access  Private
exports.updateModuleProgress = async (req, res) => {
  try {
    const { careerId, moduleId, markCompleted = true, skillName } = req.body;

    const career = await Career.findById(careerId);
    if (!career) {
      return res.status(404).json({ success: false, message: 'Career not found.' });
    }

    let progress = await LearningProgress.findOne({ user: req.user.id, career: career._id });
    if (!progress) {
      progress = new LearningProgress({
        user: req.user.id,
        career: career._id,
        completedModules: [],
        completedSkills: [],
        badgesEarned: [],
      });
    }

    if (markCompleted) {
      if (moduleId && !progress.completedModules.includes(moduleId)) {
        progress.completedModules.push(moduleId);
      }
      if (skillName && !progress.completedSkills.includes(skillName)) {
        progress.completedSkills.push(skillName);
      }
    } else {
      if (moduleId) {
        progress.completedModules = progress.completedModules.filter((id) => id !== moduleId);
      }
      if (skillName) {
        progress.completedSkills = progress.completedSkills.filter((s) => s !== skillName);
      }
    }

    // Award Badges dynamically
    if (progress.completedModules.length === 1 && !progress.badgesEarned.some((b) => b.badgeId === 'first_skill')) {
      progress.badgesEarned.push({
        badgeId: 'first_skill',
        title: 'First Skill Mastered',
        description: 'Successfully finished and verified your first curriculum module!',
        icon: 'CheckCircle',
        unlockedAt: new Date(),
      });
    }

    const totalModules = (career.learningRoadmap || []).length || 1;
    if (
      progress.completedModules.length >= totalModules &&
      !progress.badgesEarned.some((b) => b.badgeId === 'roadmap_complete')
    ) {
      progress.badgesEarned.push({
        badgeId: 'roadmap_complete',
        title: 'Roadmap Conqueror',
        description: 'Completed 100% of the structured career learning roadmap!',
        icon: 'Trophy',
        unlockedAt: new Date(),
      });
    }

    progress.progressPercentage = Math.round((progress.completedModules.length / totalModules) * 100);
    progress.lastActiveDate = new Date();
    await progress.save();

    res.status(200).json({
      success: true,
      message: markCompleted ? 'Module marked as completed!' : 'Module status updated.',
      progressPercentage: progress.progressPercentage,
      completedModules: progress.completedModules,
      badgesEarned: progress.badgesEarned,
    });
  } catch (error) {
    console.error('[Update Module Progress Error]', error);
    res.status(500).json({ success: false, message: 'Server error updating learning progress.' });
  }
};
