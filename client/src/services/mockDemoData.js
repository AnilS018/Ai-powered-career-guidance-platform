/**
 * Offline / Standalone Mock Data & Handlers for CareerPulse AI Demo
 * Automatically active when backend is offline or running on static hosts (e.g. Vercel)
 */

export const mockCareers = [
  {
    _id: 'career_aiml_01',
    title: 'AI/ML Engineer',
    slug: 'ai-ml-engineer',
    category: 'Artificial Intelligence',
    description: 'Design, develop, and deploy machine learning models, neural networks, and scalable AI inference pipelines into production systems.',
    futureScope: 'Exponential growth with Generative AI, LLMs, computer vision, and autonomous enterprise workflows.',
    salaryRange: '$85,000 - $160,000',
    marketDemand: 'Exponential',
    requiredSkills: [
      { name: 'Python', minProficiency: 85, importance: 'Core' },
      { name: 'Machine Learning', minProficiency: 80, importance: 'Core' },
      { name: 'Deep Learning', minProficiency: 75, importance: 'Core' },
      { name: 'Mathematics & Statistics', minProficiency: 80, importance: 'Core' },
      { name: 'SQL', minProficiency: 70, importance: 'Recommended' },
      { name: 'TensorFlow / PyTorch', minProficiency: 75, importance: 'Core' },
      { name: 'MLOps & Model Deployment', minProficiency: 65, importance: 'Recommended' }
    ],
    responsibilities: [
      'Architect and train predictive supervised and unsupervised deep learning models',
      'Optimize data preprocessing pipelines, feature engineering, and embedding stores',
      'Deploy containerized model endpoints using FastAPI, Docker, and Kubernetes',
      'Monitor production model latency, data drift, and performance metrics'
    ],
    learningRoadmap: [
      {
        moduleId: 'aiml_l1',
        title: 'Python, Git & Data Foundations',
        level: 'Beginner',
        description: 'Master core Python programming, mathematical foundations (linear algebra, calculus, probability), Git version control, and relational SQL queries.',
        skillsCovered: ['Python Basics', 'Git & GitHub', 'SQL Basics', 'Linear Algebra'],
        estimatedHours: 35,
        courses: [
          { title: 'Python for Everybody Specialization', platform: 'Coursera (Univ. of Michigan)', free: true },
          { title: 'Mathematics for Machine Learning', platform: 'Imperial College London', free: true }
        ],
        certifications: [{ name: 'Python Certified Associate (PCAP)', issuer: 'Python Institute' }]
      },
      {
        moduleId: 'aiml_l2',
        title: 'Data Science & Classical Machine Learning',
        level: 'Intermediate',
        description: 'Implement exploratory data analysis with Pandas and NumPy. Train classification, regression, and clustering algorithms using Scikit-Learn.',
        skillsCovered: ['NumPy & Pandas', 'Matplotlib & Seaborn', 'Scikit-Learn', 'Feature Engineering'],
        estimatedHours: 45,
        courses: [
          { title: 'Machine Learning Specialization', platform: 'DeepLearning.AI (Andrew Ng)', free: true },
          { title: 'Applied Data Science with Python', platform: 'Coursera', free: true }
        ],
        certifications: [{ name: 'TensorFlow Developer Certificate', issuer: 'Google' }]
      },
      {
        moduleId: 'aiml_l3',
        title: 'Deep Learning, Transformers & MLOps',
        level: 'Advanced',
        description: 'Build neural networks with PyTorch/TensorFlow, train Transformer architectures (BERT, LLMs), and automate model serving with Docker & MLflow.',
        skillsCovered: ['Deep Learning', 'PyTorch & TensorFlow', 'NLP & Transformers', 'MLOps & CI/CD'],
        estimatedHours: 60,
        courses: [
          { title: 'Deep Learning Specialization', platform: 'Coursera', free: true },
          { title: 'Hugging Face NLP Course', platform: 'Hugging Face', free: true }
        ],
        certifications: [{ name: 'AWS Certified Machine Learning - Specialty', issuer: 'Amazon Web Services' }]
      }
    ],
    certifications: [
      { name: 'Google Professional Machine Learning Engineer', issuer: 'Google Cloud', level: 'Advanced' },
      { name: 'AWS Certified Machine Learning - Specialty', issuer: 'AWS', level: 'Advanced' },
      { name: 'DeepLearning.AI TensorFlow Developer', issuer: 'DeepLearning.AI', level: 'Intermediate' }
    ],
    interviewTopics: ['Bias-Variance Tradeoff', 'Backpropagation & Loss Functions', 'Transformer Attention Mechanisms', 'Model Quantization'],
    sampleQuestions: [
      { question: 'Explain how Gradient Descent converges and how learning rate schedules prevent local minima trapping.', category: 'Technical' },
      { question: 'How do you handle severe class imbalance in a fraud detection dataset?', category: 'Technical' }
    ]
  },
  {
    _id: 'career_swe_02',
    title: 'Software Developer',
    slug: 'software-developer',
    category: 'Software Engineering',
    description: 'Architect, code, test, and maintain robust client-facing and server-side applications powering web, mobile, and cloud software ecosystems.',
    futureScope: 'Evergreen high demand across cloud-native architecture, microservices, and modern web platforms.',
    salaryRange: '$75,000 - $145,000',
    marketDemand: 'Very High',
    requiredSkills: [
      { name: 'JavaScript / TypeScript', minProficiency: 85, importance: 'Core' },
      { name: 'React.js', minProficiency: 80, importance: 'Core' },
      { name: 'Node.js & Express', minProficiency: 80, importance: 'Core' },
      { name: 'Data Structures & Algorithms', minProficiency: 75, importance: 'Core' },
      { name: 'SQL & MongoDB', minProficiency: 75, importance: 'Core' },
      { name: 'Git & CI/CD Pipelines', minProficiency: 70, importance: 'Recommended' },
      { name: 'REST APIs & GraphQL', minProficiency: 80, importance: 'Core' }
    ],
    responsibilities: [
      'Write clean, modular, and maintainable frontend and backend source code',
      'Design RESTful and GraphQL APIs with robust validation and security layers',
      'Integrate databases with optimized schemas, indices, and caching strategies',
      'Conduct code reviews, automated unit testing, and continuous deployment'
    ],
    learningRoadmap: [
      {
        moduleId: 'swe_l1',
        title: 'Modern Web Foundations & Version Control',
        level: 'Beginner',
        description: 'HTML5 semantic architecture, CSS3 flexbox/grid layout, modern JavaScript (ES6+), DOM manipulation, and Git collaborative workflows.',
        skillsCovered: ['HTML5 & Modern CSS', 'JavaScript ES6+', 'Git & GitHub', 'DOM & Fetch API'],
        estimatedHours: 30,
        courses: [
          { title: 'The Complete Web Development Bootcamp', platform: 'Udemy / freeCodeCamp', free: true },
          { title: 'CS50x: Introduction to Computer Science', platform: 'Harvard edX', free: true }
        ],
        certifications: [{ name: 'Certified JavaScript Developer', issuer: 'W3C / OpenJS' }]
      },
      {
        moduleId: 'swe_l2',
        title: 'Frontend Mastery & Full-Stack Node.js',
        level: 'Intermediate',
        description: 'Build reactive single-page applications with React.js, Tailwind CSS, component state management, and backend Express REST APIs.',
        skillsCovered: ['React.js & Hooks', 'Tailwind CSS', 'Node.js & Express', 'MongoDB & Mongoose'],
        estimatedHours: 45,
        courses: [
          { title: 'Full Stack Open', platform: 'University of Helsinki', free: true },
          { title: 'React - The Complete Guide', platform: 'Frontend Masters', free: true }
        ],
        certifications: [{ name: 'Meta Front-End Developer Certificate', issuer: 'Meta' }]
      },
      {
        moduleId: 'swe_l3',
        title: 'Scalable Systems, Cloud & DevOps',
        level: 'Advanced',
        description: 'Microservices, Docker containerization, Redis caching, CI/CD automated test suites, and deployment to AWS / Render / Vercel.',
        skillsCovered: ['TypeScript', 'Docker & Kubernetes', 'System Design', 'Redis Caching', 'Cloud Architecture'],
        estimatedHours: 55,
        courses: [
          { title: 'Designing Data-Intensive Applications', platform: 'O\'Reilly Course', free: true },
          { title: 'Docker for Developers', platform: 'Coursera', free: true }
        ],
        certifications: [{ name: 'AWS Certified Solutions Architect - Associate', issuer: 'AWS' }]
      }
    ],
    certifications: [
      { name: 'Meta Full-Stack Professional Certificate', issuer: 'Meta', level: 'Intermediate' },
      { name: 'AWS Certified Solutions Architect', issuer: 'AWS', level: 'Advanced' }
    ],
    interviewTopics: ['Event Loop & Promises', 'React Virtual DOM Reconciliation', 'REST vs GraphQL', 'Database Indexing'],
    sampleQuestions: [
      { question: 'What is the difference between synchronous and asynchronous code execution in Node.js?', category: 'Technical' },
      { question: 'How would you scale a web service encountering 100,000 concurrent socket connections?', category: 'Technical' }
    ]
  },
  {
    _id: 'career_da_03',
    title: 'Data Analyst',
    slug: 'data-analyst',
    category: 'Data & Analytics',
    description: 'Transform complex raw business data into visually compelling dashboards, predictive metrics, and strategic executive recommendations.',
    futureScope: 'High corporate priority as businesses transition toward automated real-time KPI tracking.',
    salaryRange: '$65,000 - $115,000',
    marketDemand: 'Very High',
    requiredSkills: [
      { name: 'SQL', minProficiency: 85, importance: 'Core' },
      { name: 'PowerBI / Tableau', minProficiency: 80, importance: 'Core' },
      { name: 'Excel & Advanced Spreadsheets', minProficiency: 85, importance: 'Core' },
      { name: 'Python (Pandas & Seaborn)', minProficiency: 70, importance: 'Recommended' },
      { name: 'Statistical Analysis', minProficiency: 75, importance: 'Core' },
      { name: 'Business Acumen & Storytelling', minProficiency: 80, importance: 'Core' }
    ],
    responsibilities: [
      'Author complex multi-table SQL queries, window functions, and subqueries',
      'Design interactive PowerBI and Tableau dashboards with live data refreshes',
      'Conduct cohort analysis, customer churn tracking, and revenue attribution',
      'Communicate data findings to cross-functional stakeholders and product leaders'
    ],
    learningRoadmap: [],
    certifications: [
      { name: 'Google Data Analytics Professional Certificate', issuer: 'Google', level: 'Beginner' }
    ]
  },
  {
    _id: 'career_uiux_04',
    title: 'UI/UX Designer',
    slug: 'ui-ux-designer',
    category: 'Design & Product',
    description: 'Craft elegant, accessible, intuitive digital interfaces and user flows backed by rigorous user research and interactive design systems.',
    futureScope: 'Critical competitive advantage for enterprise software and consumer mobile applications.',
    salaryRange: '$70,000 - $130,000',
    marketDemand: 'High',
    requiredSkills: [
      { name: 'Figma', minProficiency: 85, importance: 'Core' },
      { name: 'User Research & Personas', minProficiency: 80, importance: 'Core' },
      { name: 'Wireframing & Prototyping', minProficiency: 85, importance: 'Core' },
      { name: 'Design Systems & Tokens', minProficiency: 75, importance: 'Core' }
    ],
    responsibilities: ['User research', 'Interactive Figma prototyping', 'Design systems'],
    learningRoadmap: []
  },
  {
    _id: 'career_cyber_05',
    title: 'Cybersecurity Analyst',
    slug: 'cybersecurity-analyst',
    category: 'Security & Infrastructure',
    description: 'Safeguard enterprise networks, cloud infrastructures, and sensitive data against unauthorized intrusions, malware, and cyber threats.',
    futureScope: 'High national and international demand driven by cloud adoption, compliance laws, and ransomware risks.',
    salaryRange: '$80,000 - $145,000',
    marketDemand: 'Very High',
    requiredSkills: [
      { name: 'Network Security & Firewalls', minProficiency: 85, importance: 'Core' },
      { name: 'Linux Administration', minProficiency: 80, importance: 'Core' },
      { name: 'SIEM Tools (Splunk / Elastic)', minProficiency: 70, importance: 'Recommended' }
    ],
    responsibilities: ['Security monitoring', 'Vulnerability assessment', 'Incident response'],
    learningRoadmap: []
  }
];

export const mockQuestions = [
  {
    _id: 'q1',
    step: 1,
    category: 'interest',
    question: 'What type of daily problem-solving activity do you find most exciting?',
    description: 'Reflect on what tasks make you feel most energized and engaged.',
    options: [
      { text: 'Building automated intelligent systems and working with predictive machine learning algorithms', score: 10, affinityDomain: 'ai_ml' },
      { text: 'Developing interactive web applications, software products, and scalable systems', score: 10, affinityDomain: 'software_dev' },
      { text: 'Uncovering trends and statistical insights from complex real-world datasets', score: 10, affinityDomain: 'data_analyst' },
      { text: 'Hunting security vulnerabilities, ethical hacking, and defending network boundaries', score: 10, affinityDomain: 'cybersecurity' },
      { text: 'Crafting intuitive user journeys, wireframes, and beautiful digital interfaces', score: 10, affinityDomain: 'ui_ux' }
    ]
  },
  {
    _id: 'q2',
    step: 1,
    category: 'interest',
    question: 'When starting a new project, what part do you naturally gravitate toward first?',
    description: 'Consider the initial phase you find most satisfying.',
    options: [
      { text: 'Designing the architecture, backend models, and clean reusable code structures', score: 10, affinityDomain: 'software_dev' },
      { text: 'Exploring mathematical patterns, data distributions, and neural models', score: 10, affinityDomain: 'ai_ml' },
      { text: 'Interviewing users, sketching mockups, and prioritizing visual ergonomics', score: 10, affinityDomain: 'ui_ux' },
      { text: 'Aligning business priorities, user stories, and market growth strategies', score: 10, affinityDomain: 'business_analyst' }
    ]
  },
  {
    _id: 'q3',
    step: 2,
    category: 'personality',
    question: 'How do you approach complex, ambiguous challenges with tight deadlines?',
    description: 'Think about your natural work rhythm and problem decomposition.',
    options: [
      { text: 'I systematically break down the problem into modular, testable components with structured logic', score: 10, affinityDomain: 'software_dev' },
      { text: 'I gather empirical data, compute probabilities, and let numerical evidence guide decisions', score: 10, affinityDomain: 'data_analyst' },
      { text: 'I brainstorm creative alternatives, empathy maps, and iterate on rapid visual prototypes', score: 10, affinityDomain: 'ui_ux' },
      { text: 'I coordinate with teammates, clarify requirements, and ensure everyone is aligned on deliverables', score: 10, affinityDomain: 'business_analyst' }
    ]
  },
  {
    _id: 'q4',
    step: 3,
    category: 'technical',
    question: 'Which programming or analytical ecosystem are you most comfortable using?',
    description: 'Select the stack where you have the highest hands-on familiarity.',
    options: [
      { text: 'Python (NumPy, Pandas, Scikit-Learn, PyTorch/TensorFlow)', score: 10, affinityDomain: 'ai_ml' },
      { text: 'JavaScript / TypeScript (React, Node.js, Express, MongoDB)', score: 10, affinityDomain: 'software_dev' },
      { text: 'SQL & BI Tools (PostgreSQL, PowerBI, Tableau, Excel)', score: 10, affinityDomain: 'data_analyst' },
      { text: 'Linux CLI, Bash, Networking Tools (Wireshark, Nmap, Firewalls)', score: 10, affinityDomain: 'cybersecurity' },
      { text: 'Design Systems & Prototyping (Figma, Adobe XD, CSS3)', score: 10, affinityDomain: 'ui_ux' }
    ]
  },
  {
    _id: 'q5',
    step: 4,
    category: 'aptitude',
    question: 'If a machine learning classifier has 98% accuracy on cancer detection but misses 40% of actual cancer patients, what metric should you optimize?',
    description: 'Test your understanding of statistical trade-offs.',
    options: [
      { text: 'Recall (Sensitivity) to minimize critical False Negatives', score: 10, affinityDomain: 'ai_ml' },
      { text: 'Precision to eliminate all False Positives', score: 6, affinityDomain: 'data_analyst' },
      { text: 'Increase the overall classification threshold blindly', score: 4, affinityDomain: 'general' }
    ]
  }
];

export const mockStudentProfile = {
  _id: 'prof_demo_student',
  user: {
    _id: 'demo-student-id',
    id: 'demo-student-id',
    fullName: 'Demo Student',
    email: 'student@careerpulse.ai',
    college: 'National Institute of Technology',
    education: 'B.Tech Artificial Intelligence and Data Science',
    graduationYear: 2025,
  },
  phone: '+1 (555) 234-5678',
  location: 'San Francisco, CA / Hybrid',
  bio: 'Aspiring AI/ML Engineer and Final Year B.Tech student passionate about neural architectures, natural language processing, and scalable full-stack applications.',
  education: {
    college: 'National Institute of Technology',
    degree: 'B.Tech',
    department: 'Artificial Intelligence and Data Science',
    graduationYear: 2025,
    cgpa: '8.8 / 10.0',
  },
  careerInterests: ['Artificial Intelligence', 'Data Science', 'Software Development'],
  technicalSkills: [
    { name: 'Python', level: 'Intermediate', proficiency: 80 },
    { name: 'SQL', level: 'Intermediate', proficiency: 70 },
    { name: 'Machine Learning', level: 'Beginner', proficiency: 50 },
    { name: 'Deep Learning', level: 'Beginner', proficiency: 25 },
    { name: 'React.js', level: 'Intermediate', proficiency: 65 },
    { name: 'Git & GitHub', level: 'Intermediate', proficiency: 75 }
  ],
  softSkills: ['Communication', 'Problem Solving', 'Teamwork', 'Critical Thinking', 'Adaptability'],
  preferredIndustries: ['IT', 'Finance', 'Healthcare', 'E-commerce'],
  careerGoal: 'Become a high-impact Machine Learning Engineer architecting production AI models.',
  targetCareer: mockCareers[0],
  resumeData: {
    summary: 'Final year undergraduate with strong foundation in Python, data science, and web applications. Built end-to-end ML classification pipelines and responsive React dashboards.',
    projects: [
      {
        title: 'Customer Churn Predictor',
        description: 'Trained random forest classifier achieving 88% precision on customer retention dataset; served REST API with FastAPI.',
        techStack: ['Python', 'Scikit-Learn', 'FastAPI', 'Pandas'],
        link: 'https://github.com/demostudent/churn-predictor'
      },
      {
        title: 'Interactive Portfolio Dashboard',
        description: 'Designed modern responsive student dashboard with React, Tailwind CSS, and chart visualizations.',
        techStack: ['React', 'Tailwind CSS', 'Vite'],
        link: 'https://github.com/demostudent/portfolio'
      }
    ],
    experience: [
      {
        role: 'Machine Learning Intern',
        company: 'TechNovation Labs',
        duration: 'Jun 2024 - Aug 2024',
        description: 'Preprocessed over 200,000 tabular data rows and helped implement automated feature scaling scripts.'
      }
    ],
    certifications: ['Python for Everybody - University of Michigan', 'SQL Essential Training']
  }
};

export const mockAssessmentResult = {
  _id: 'res_demo_01',
  user: 'demo-student-id',
  overallScore: 84,
  categoryScores: {
    interest: 90,
    personality: 85,
    technical: 80,
    aptitude: 85,
    communication: 80,
  },
  domainAffinities: {
    ai_ml: 4,
    software_dev: 3,
    data_analyst: 2,
  },
  recommendations: [
    {
      careerId: 'career_aiml_01',
      careerTitle: 'AI/ML Engineer',
      matchPercentage: 88,
      whyRecommended: [
        'Strong Python foundation and high mathematical intuition',
        'Deep interest in predictive modeling and machine learning algorithms',
        'Strong aptitude scores in algorithmic reasoning'
      ],
      requiredSkills: ['Python', 'Mathematics', 'Machine Learning', 'Statistics', 'SQL', 'TensorFlow / PyTorch'],
      currentSkills: ['Python', 'SQL', 'Basic Machine Learning', 'Git & GitHub'],
      missingSkills: ['Deep Learning', 'Statistics & Calculus', 'TensorFlow / PyTorch', 'MLOps'],
    },
    {
      careerId: 'career_swe_02',
      careerTitle: 'Software Developer',
      matchPercentage: 81,
      whyRecommended: [
        'Solid grasp of modern web development and Git workflows',
        'Good balance of logic and structured problem decomposition'
      ],
      requiredSkills: ['JavaScript', 'React.js', 'Node.js', 'SQL', 'Data Structures'],
      currentSkills: ['React.js', 'SQL', 'Git & GitHub'],
      missingSkills: ['Advanced Data Structures', 'Docker & CI/CD', 'TypeScript'],
    },
    {
      careerId: 'career_da_03',
      careerTitle: 'Data Analyst',
      matchPercentage: 78,
      whyRecommended: [
        'Proficient with SQL queries and tabular data transformations',
        'Enjoys turning patterns into actionable narratives'
      ],
      requiredSkills: ['SQL', 'PowerBI / Tableau', 'Advanced Excel', 'Python'],
      currentSkills: ['SQL', 'Python'],
      missingSkills: ['PowerBI / Tableau', 'Data Storytelling'],
    }
  ],
  completedAt: new Date().toISOString(),
};

export const mockLearningProgress = {
  success: true,
  progress: {
    _id: 'prog_demo_01',
    user: 'demo-student-id',
    career: mockCareers[0],
    completedModules: ['aiml_l1'],
    completedSkills: ['Python Basics', 'Git & GitHub', 'SQL Basics'],
    currentModuleId: 'aiml_l2',
    progressPercentage: 33,
    streakDays: 5,
    badgesEarned: [
      {
        badgeId: 'assessment_complete',
        title: 'Assessment Pioneer',
        description: 'Completed comprehensive 5-step career & aptitude evaluation.',
        icon: 'Award',
        unlockedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        badgeId: 'first_skill',
        title: 'First Skill Mastered',
        description: 'Completed Level 1 Python, Git & Data Foundations curriculum.',
        icon: 'CheckCircle',
        unlockedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        badgeId: 'learning_streak',
        title: '5-Day Learning Streak',
        description: 'Logged in and studied for 5 consecutive days.',
        icon: 'Flame',
        unlockedAt: new Date().toISOString(),
      }
    ]
  },
  career: mockCareers[0],
  modules: mockCareers[0].learningRoadmap,
};

export const mockSkillGap = {
  success: true,
  careerTitle: 'AI/ML Engineer',
  careerId: 'career_aiml_01',
  readinessScore: 74,
  strongSkillsCount: 3,
  totalRequiredSkills: 7,
  skillsComparison: [
    { skillName: 'Python', currentScore: 80, requiredScore: 85, status: 'Needs Improvement', importance: 'Core', gap: 5 },
    { skillName: 'SQL', currentScore: 70, requiredScore: 70, status: 'Strong', importance: 'Recommended', gap: 0 },
    { skillName: 'Git & GitHub', currentScore: 75, requiredScore: 70, status: 'Strong', importance: 'Recommended', gap: 0 },
    { skillName: 'Machine Learning', currentScore: 50, requiredScore: 80, status: 'Needs Improvement', importance: 'Core', gap: 30 },
    { skillName: 'Deep Learning', currentScore: 25, requiredScore: 75, status: 'Beginner', importance: 'Core', gap: 50 },
    { skillName: 'Mathematics & Statistics', currentScore: 30, requiredScore: 80, status: 'Beginner', importance: 'Core', gap: 50 },
    { skillName: 'MLOps & Deployment', currentScore: 10, requiredScore: 65, status: 'Missing', importance: 'Recommended', gap: 55 },
  ],
  priorityFocusSkills: ['Machine Learning', 'Deep Learning', 'Mathematics & Statistics'],
  career: mockCareers[0],
  matchScore: 74,
  skillsSummary: {
    totalRequired: 7,
    acquired: 3,
    missing: 4,
  },
  skillBreakdown: [
    { name: 'Python', requiredProficiency: 85, currentProficiency: 80, gap: 5, status: 'Strong', priority: 'Medium' },
    { name: 'SQL', requiredProficiency: 70, currentProficiency: 70, gap: 0, status: 'Met', priority: 'Low' },
    { name: 'Git & GitHub', requiredProficiency: 70, currentProficiency: 75, gap: 0, status: 'Met', priority: 'Low' },
    { name: 'Machine Learning', requiredProficiency: 80, currentProficiency: 50, gap: 30, status: 'Needs Improvement', priority: 'High' },
    { name: 'Deep Learning', requiredProficiency: 75, currentProficiency: 25, gap: 50, status: 'Missing', priority: 'High' },
    { name: 'Mathematics & Statistics', requiredProficiency: 80, currentProficiency: 30, gap: 50, status: 'Missing', priority: 'High' },
    { name: 'MLOps & Deployment', requiredProficiency: 65, currentProficiency: 10, gap: 55, status: 'Missing', priority: 'Medium' },
  ],
  recommendedActionPlan: [
    'Complete Andrew Ng\'s Machine Learning Specialization to bridge Scikit-Learn algorithms',
    'Build a deep learning image classification model with PyTorch/TensorFlow',
    'Containerize an inference model endpoint with FastAPI and Docker'
  ]
};

export const mockAdminAnalytics = {
  success: true,
  stats: {
    totalUsers: 142,
    studentCount: 136,
    adminCount: 6,
    totalAssessments: 114,
    assessmentCompletionRate: 84,
    totalCareers: 7,
    totalQuestions: 10,
    averageSatisfactionScore: '4.8 / 5.0',
  },
  popularCareers: [
    { name: 'AI/ML Engineer', count: 48 },
    { name: 'Software Developer', count: 39 },
    { name: 'Data Analyst', count: 24 },
    { name: 'Cybersecurity Analyst', count: 14 },
    { name: 'UI/UX Designer', count: 11 },
  ],
  userGrowth: [
    { month: 'Apr', students: 18 },
    { month: 'May', students: 34 },
    { month: 'Jun', students: 58 },
    { month: 'Jul', students: 82 },
    { month: 'Aug', students: 112 },
    { month: 'Sep', students: 142 },
  ],
};

export const mockAdminUsers = [
  {
    _id: 'demo-student-id',
    fullName: 'Demo Student',
    email: 'student@careerpulse.ai',
    role: 'STUDENT',
    college: 'National Institute of Technology',
    education: 'B.Tech Artificial Intelligence and Data Science',
    graduationYear: 2025,
    createdAt: new Date().toISOString(),
    assessmentCompleted: true,
    assessmentScore: 84,
    targetCareer: 'career_aiml_01',
  },
  {
    _id: 'usr_02',
    fullName: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    role: 'STUDENT',
    college: 'Delhi Technological University',
    education: 'B.Tech Computer Engineering',
    graduationYear: 2025,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    assessmentCompleted: true,
    assessmentScore: 91,
    targetCareer: 'career_swe_02',
  },
  {
    _id: 'usr_03',
    fullName: 'Aarav Mehta',
    email: 'aarav.m@example.com',
    role: 'STUDENT',
    college: 'BITS Pilani',
    education: 'B.Tech Electronics & Communication',
    graduationYear: 2026,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    assessmentCompleted: true,
    assessmentScore: 76,
    targetCareer: 'career_da_03',
  },
  {
    _id: 'demo-admin-id',
    fullName: 'Platform Administrator',
    email: 'admin@careerpulse.ai',
    role: 'ADMIN',
    college: 'Global Tech Institute',
    education: 'Master of Technology',
    graduationYear: 2022,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    assessmentCompleted: false,
    assessmentScore: null,
  }
];

export const mockInterviewQuestions = [
  {
    id: 'int_01',
    question: 'Can you explain the bias-variance tradeoff in machine learning and how regularization addresses overfitting?',
    category: 'Technical',
    suggestedDuration: '2-3 minutes',
    rubric: 'Looking for definition of bias (underfitting) vs variance (overfitting) and methods like L1/L2 regularization.'
  },
  {
    id: 'int_02',
    question: 'Walk me through a project where you trained a machine learning model. How did you validate performance and prevent data leakage?',
    category: 'Project Experience',
    suggestedDuration: '3-4 minutes',
    rubric: 'Looking for train-validation-test split before preprocessing, cross-validation, and metrics like precision/recall/F1.'
  },
  {
    id: 'int_03',
    question: 'How do you handle a scenario where a stakeholder asks for 100% predictive accuracy on an inherently noisy dataset?',
    category: 'Behavioral & Stakeholder',
    suggestedDuration: '2 minutes',
    rubric: 'Looking for communication skills, setting expectations, explaining Bayes error and trade-offs.'
  }
];

/**
 * Handle mock demo fallback requests for any endpoint
 */
export function handleMockRequest(endpoint, options = {}) {
  const method = (options.method || 'GET').toUpperCase();
  const body = options.body ? JSON.parse(options.body) : {};

  // Auth me
  if (endpoint.startsWith('/auth/me')) {
    const cachedUser = localStorage.getItem('careerpulse_demo_user');
    const user = cachedUser ? JSON.parse(cachedUser) : {
      id: 'demo-student-id',
      fullName: 'Demo Student',
      email: 'student@careerpulse.ai',
      role: 'STUDENT',
      college: 'National Institute of Technology',
      education: 'B.Tech Artificial Intelligence and Data Science',
      graduationYear: 2025,
      isDemo: true,
    };
    return { success: true, user };
  }

  // Auth login
  if (endpoint.startsWith('/auth/login')) {
    const isAdm = body.email?.includes('admin');
    const role = isAdm ? 'ADMIN' : 'STUDENT';
    const user = isAdm ? {
      id: 'demo-admin-id',
      fullName: 'Platform Administrator',
      email: 'admin@careerpulse.ai',
      role: 'ADMIN',
      college: 'Global Tech Institute',
      education: 'Master of Technology',
      graduationYear: 2022,
      isDemo: true,
    } : {
      id: 'demo-student-id',
      fullName: 'Demo Student',
      email: 'student@careerpulse.ai',
      role: 'STUDENT',
      college: 'National Institute of Technology',
      education: 'B.Tech Artificial Intelligence and Data Science',
      graduationYear: 2025,
      isDemo: true,
    };
    return {
      success: true,
      token: `demo_token_${role.toLowerCase()}`,
      user,
    };
  }

  // Auth register
  if (endpoint.startsWith('/auth/register')) {
    const user = {
      id: `usr_${Date.now()}`,
      fullName: body.fullName || 'New Student',
      email: body.email || 'student@careerpulse.ai',
      role: 'STUDENT',
      college: body.college || 'Engineering College',
      education: body.education || 'B.Tech Computer Science',
      graduationYear: body.graduationYear || 2025,
      isDemo: true,
    };
    return { success: true, token: `demo_token_reg_${Date.now()}`, user };
  }

  // Auth forgot-password
  if (endpoint.startsWith('/auth/forgot-password')) {
    return { success: true, message: 'Password reset link sent (demo simulation).' };
  }

  // Profile
  if (endpoint.startsWith('/profile')) {
    if (method === 'PUT') {
      const updated = { ...mockStudentProfile, ...body };
      return { success: true, profile: updated };
    }
    return { success: true, profile: mockStudentProfile };
  }

  // Assessments
  if (endpoint.startsWith('/assessments/results')) {
    return {
      success: true,
      hasCompleted: true,
      result: mockAssessmentResult,
    };
  }

  if (endpoint.startsWith('/assessments/submit')) {
    return {
      success: true,
      message: 'Assessment completed successfully!',
      hasCompleted: true,
      result: mockAssessmentResult,
      topRecommendation: mockAssessmentResult.recommendations[0],
    };
  }

  if (endpoint.startsWith('/assessments')) {
    return { success: true, count: mockQuestions.length, questions: mockQuestions };
  }

  // Careers & Skill Gap
  if (endpoint.startsWith('/skill-gap')) {
    return mockSkillGap;
  }

  if (endpoint.startsWith('/careers/recommend')) {
    return { success: true, recommendations: mockAssessmentResult.recommendations };
  }

  const careerIdMatch = endpoint.match(/^\/careers\/([a-zA-Z0-9_-]+)/);
  if (careerIdMatch && careerIdMatch[1] && careerIdMatch[1] !== 'recommend') {
    const cid = careerIdMatch[1];
    const foundCareer = mockCareers.find((c) => c._id === cid || c.slug === cid) || mockCareers[0];
    return { success: true, career: foundCareer };
  }

  if (endpoint.startsWith('/careers')) {
    return { success: true, count: mockCareers.length, careers: mockCareers };
  }

  // Learning Path
  if (endpoint.startsWith('/learning-path/progress')) {
    const modId = body.moduleId;
    if (modId) {
      if (body.markCompleted && !mockLearningProgress.progress.completedModules.includes(modId)) {
        mockLearningProgress.progress.completedModules.push(modId);
      } else if (body.markCompleted === false) {
        mockLearningProgress.progress.completedModules = mockLearningProgress.progress.completedModules.filter((m) => m !== modId);
      }
    }
    return { success: true, message: 'Progress recorded', progress: mockLearningProgress.progress };
  }

  if (endpoint.startsWith('/learning-path')) {
    return mockLearningProgress;
  }

  // AI Services
  if (endpoint.startsWith('/ai/career-recommendation')) {
    return {
      success: true,
      topMatch: {
        careerId: mockCareers[0]._id,
        careerTitle: 'AI/ML Engineer',
        matchPercentage: 88,
        salaryRange: '$85,000 - $160,000',
        marketDemand: 'Exponential',
        description: mockCareers[0].description,
        learningRoadmap: mockCareers[0].learningRoadmap,
      },
      careerRecommendations: [
        {
          careerId: mockCareers[0]._id,
          careerTitle: 'AI/ML Engineer',
          matchPercentage: 88,
          fitScore: 'High',
          whyRecommended: 'Strong Python proficiency and excellent analytical aptitude alignment.',
          salaryRange: '$85,000 - $160,000',
          marketDemand: 'Exponential',
        },
        {
          careerId: mockCareers[1]._id,
          careerTitle: 'Full-Stack Developer',
          matchPercentage: 81,
          fitScore: 'Strong',
          whyRecommended: 'Practical grasp of React.js and modern API web development.',
          salaryRange: '$75,000 - $140,000',
          marketDemand: 'High',
        },
        {
          careerId: mockCareers[2]._id,
          careerTitle: 'Data Scientist',
          matchPercentage: 78,
          fitScore: 'Moderate',
          whyRecommended: 'Proficient SQL fundamentals and strong interest in exploratory data analysis.',
          salaryRange: '$80,000 - $150,000',
          marketDemand: 'High',
        }
      ],
      aiCounselorNote: 'Based on your recent assessment scores (84% overall) and verified proficiency in Python & SQL, your fastest pathway to a high-impact technical career is specializing in AI/ML Engineering.',
      nextSteps: [
        'Complete Level 2 Classical Machine Learning curriculum with Scikit-Learn',
        'Build a production-grade churn predictor or image classifier with PyTorch and FastAPI',
        'Add live deployed project URLs and code repositories to your resume',
        'Practice STAR-method interview responses in the Interview Preparation module'
      ],
      reasoning: 'High quantitative orientation paired with solid programming discipline.',
      guidance: {
        targetCareer: 'AI/ML Engineer',
        analysis: 'High aptitude score and strong Python foundation.',
        actionableSteps: [
          'Master PyTorch neural architectures',
          'Deploy model inference with FastAPI',
        ],
        estimatedReadiness: '6-8 months'
      }
    };
  }

  if (endpoint.startsWith('/ai/resume-review')) {
    const analysis = {
      score: 85,
      atsCompatibility: 'High (85/100)',
      strengths: [
        'Clear educational credentials with relevant B.Tech AI & Data Science specialization',
        'Strong technical keyword coverage: Python, Scikit-Learn, FastAPI, React, SQL',
        'Concrete project section detailing Machine Learning classification outcomes'
      ],
      weaknesses: [
        'Quantify more business impact (e.g. inference latency reduced by 30%, model accuracy improved to 88%)',
        'Add cloud / DevOps technologies such as Docker, AWS/Render deployment pipelines',
        'Expand technical certifications with verifiable credential links'
      ],
      suggestedImprovements: [
        'Adopt the STAR (Situation, Task, Action, Result) format for every project bullet point',
        'Place technical skills directly below education for campus recruiter readability',
        'Include your GitHub profile and live deployed demo links'
      ],
      overallSummary: 'High-quality technical undergraduate resume with outstanding foundation for entry-level AI/ML and software engineering placements.'
    };
    return {
      success: true,
      analysis,
      review: analysis,
    };
  }

  if (endpoint.startsWith('/ai/chat/history')) {
    if (method === 'DELETE') {
      return { success: true, message: 'History cleared' };
    }
    return {
      success: true,
      messages: [
        {
          sender: 'ai',
          text: "Hello! I am your AI Career Counselor. Whether you are curious about high-paying career trajectories, resume ATS optimization, project portfolio building, or interview strategy, I am here to help. What's on your mind today?",
          timestamp: new Date().toISOString()
        }
      ]
    };
  }

  if (endpoint.startsWith('/ai/chat')) {
    const userMsg = body.message || '';
    let reply = `That is an excellent career question! For someone pursuing modern tech roles like AI/ML or Software Development, I recommend focusing on building end-to-end projects, mastering version control with GitHub, and consistently sharpening algorithmic problem solving.`;
    if (userMsg.toLowerCase().includes('resume')) {
      reply = `To make your resume stand out to top recruiters: 1) Quantify your achievements (e.g., 'Optimized query latency by 40%'), 2) Feature live deployed links, and 3) Tailor your skills section to match the job description keywords.`;
    } else if (userMsg.toLowerCase().includes('interview')) {
      reply = `For technical interviews, prepare across three pillars: Data Structures & Algorithms, System Design / Architecture fundamentals, and STAR-method behavioral storytelling.`;
    }
    return {
      success: true,
      reply,
      timestamp: new Date().toISOString()
    };
  }

  // Interview endpoints
  if (endpoint.startsWith('/interview/start')) {
    return {
      success: true,
      sessionId: `mock_session_${Date.now()}`,
      category: body.category || 'Technical Questions',
      totalQuestions: mockInterviewQuestions.length,
      currentIndex: 0,
      currentQuestion: mockInterviewQuestions[0],
      questions: mockInterviewQuestions,
    };
  }

  if (endpoint.startsWith('/interview/answer')) {
    return {
      success: true,
      evaluation: {
        score: 85,
        rating: 'Strong Answer',
        strengths: 'Clear explanation of core engineering principles, logical structure, and practical terminology.',
        improvements: 'Consider providing a concrete production example with benchmark figures or edge case considerations.',
        sampleAnswer: 'A high-impact response defines the core architecture, discusses algorithmic trade-offs (e.g., bias-variance or latency-accuracy), and provides a real-world scenario where the approach was applied.'
      },
      isCompleted: true,
      nextQuestion: null,
      currentIndex: 1,
    };
  }

  if (endpoint.startsWith('/interview/history')) {
    return {
      success: true,
      sessions: [
        {
          _id: 'mock_int_01',
          category: 'Technical Questions',
          averageScore: 84,
          questionsCount: 3,
          createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          _id: 'mock_int_02',
          category: 'AI/ML Questions',
          averageScore: 88,
          questionsCount: 4,
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        }
      ]
    };
  }

  // Admin Endpoints
  if (endpoint.startsWith('/admin/analytics')) {
    return mockAdminAnalytics;
  }

  if (endpoint.startsWith('/admin/users')) {
    if (method === 'PUT' || method === 'DELETE') {
      return { success: true, message: 'User updated successfully (demo simulation)' };
    }
    return { success: true, count: mockAdminUsers.length, users: mockAdminUsers };
  }

  if (endpoint.startsWith('/admin/careers')) {
    return { success: true, message: 'Career saved successfully (demo simulation)', career: mockCareers[0], count: mockCareers.length, careers: mockCareers };
  }

  if (endpoint.startsWith('/admin/assessments')) {
    return { success: true, message: 'Question saved successfully (demo simulation)', count: mockQuestions.length, questions: mockQuestions };
  }

  // Default fallback
  return { success: true, message: 'Operation completed in demo mode' };
}
