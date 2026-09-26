const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const User = require('../models/User');
const Profile = require('../models/Profile');
const Career = require('../models/Career');
const AssessmentQuestion = require('../models/Assessment');
const AssessmentResult = require('../models/AssessmentResult');
const LearningProgress = require('../models/LearningProgress');

const careersData = [
  {
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
    learningRoadmap: [
      {
        moduleId: 'da_l1',
        title: 'Spreadsheet Modeling & Advanced SQL',
        level: 'Beginner',
        description: 'Master pivot tables, VLOOKUP/XLOOKUP, relational database schema structures, and multi-table SQL joins.',
        skillsCovered: ['Advanced Excel', 'SQL Joins & Aggregations', 'Data Cleaning'],
        estimatedHours: 25,
        courses: [{ title: 'Google Data Analytics Certificate', platform: 'Coursera', free: true }]
      },
      {
        moduleId: 'da_l2',
        title: 'Business Intelligence Dashboards & Python',
        level: 'Intermediate',
        description: 'Build enterprise dashboards with PowerBI / Tableau and use Python Pandas for automated data wrangling.',
        skillsCovered: ['PowerBI / Tableau', 'Python Pandas', 'Exploratory Data Analysis'],
        estimatedHours: 40,
        courses: [{ title: 'Tableau Desktop Specialist Preparation', platform: 'Tableau Academy', free: true }]
      },
      {
        moduleId: 'da_l3',
        title: 'Statistical Inference & Executive Storytelling',
        level: 'Advanced',
        description: 'A/B testing experimentation, hypothesis testing, predictive time series forecasting, and boardroom presentation frameworks.',
        skillsCovered: ['A/B Testing', 'Hypothesis Testing', 'Data Storytelling', 'dbt & Data Modeling'],
        estimatedHours: 45,
        courses: [{ title: 'A/B Testing for Tech Companies', platform: 'Udacity', free: true }]
      }
    ],
    certifications: [
      { name: 'Google Data Analytics Professional Certificate', issuer: 'Google', level: 'Beginner' },
      { name: 'Microsoft Certified: Power BI Data Analyst Associate', issuer: 'Microsoft', level: 'Intermediate' }
    ],
    interviewTopics: ['Window Functions (ROW_NUMBER, RANK)', 'A/B Test Sample Size Calculation', 'ETL Pipeline Design'],
    sampleQuestions: [
      { question: 'Write a SQL query using window functions to find the top 3 highest earning employees per department.', category: 'SQL' }
    ]
  },
  {
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
      { name: 'Design Systems & Tokens', minProficiency: 75, importance: 'Core' },
      { name: 'Usability Testing', minProficiency: 75, importance: 'Recommended' },
      { name: 'HTML & CSS Awareness', minProficiency: 60, importance: 'Nice-to-have' }
    ],
    responsibilities: [
      'Conduct user interviews, journey mapping, and qualitative affinity diagramming',
      'Create high-fidelity interactive component prototypes in Figma',
      'Establish scalable design systems with reusable auto-layout design tokens',
      'Perform A/B usability testing and iterate based on quantitative heatmaps'
    ],
    learningRoadmap: [
      {
        moduleId: 'uiux_l1',
        title: 'Design Fundamentals & Figma Basics',
        level: 'Beginner',
        description: 'Color theory, typography hierarchy, grid systems, and Figma component architecture.',
        skillsCovered: ['Figma Basics', 'Typography & Color', 'Grid Systems', 'Wireframing'],
        estimatedHours: 25,
        courses: [{ title: 'Google UX Design Professional Certificate', platform: 'Coursera', free: true }]
      },
      {
        moduleId: 'uiux_l2',
        title: 'User Research & Interactive Prototyping',
        level: 'Intermediate',
        description: 'Conduct user tests, create journey maps, and build micro-animated interactive prototypes.',
        skillsCovered: ['User Research', 'Interactive Prototyping', 'Usability Audits'],
        estimatedHours: 35,
        courses: [{ title: 'Interaction Design Foundation Courses', platform: 'IxDF', free: true }]
      },
      {
        moduleId: 'uiux_l3',
        title: 'Design Systems & Multi-Platform Strategy',
        level: 'Advanced',
        description: 'Architect multi-brand enterprise design systems, accessible WCAG 2.1 compliance, and dev handoff.',
        skillsCovered: ['Design Systems', 'WCAG Accessibility', 'Figma Variables & Tokens'],
        estimatedHours: 40,
        courses: [{ title: 'Enterprise Design Systems Masterclass', platform: 'DesignX', free: true }]
      }
    ],
    certifications: [
      { name: 'Google UX Design Professional Certificate', issuer: 'Google', level: 'Intermediate' }
    ],
    interviewTopics: ['Design Critiques', 'User Persona Development', 'Handling Stakeholder Disagreements'],
    sampleQuestions: [
      { question: 'Walk me through a project where user research contradicted your initial design assumptions.', category: 'Technical' }
    ]
  },
  {
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
      { name: 'Vulnerability Assessment & PenTesting', minProficiency: 75, importance: 'Core' },
      { name: 'SIEM Tools (Splunk / Elastic)', minProficiency: 70, importance: 'Recommended' },
      { name: 'Incident Response & Forensics', minProficiency: 75, importance: 'Core' },
      { name: 'Cryptography Protocols', minProficiency: 70, importance: 'Recommended' }
    ],
    responsibilities: [
      'Monitor enterprise SIEM security alerts for suspicious lateral movement',
      'Conduct regular vulnerability assessments and penetration testing drills',
      'Enforce zero-trust architecture, multi-factor authentication, and endpoint security',
      'Investigate security incidents and compose post-mortem mitigation reports'
    ],
    learningRoadmap: [
      {
        moduleId: 'sec_l1',
        title: 'Networking Protocols & Linux Administration',
        level: 'Beginner',
        description: 'Deep dive into TCP/IP, DNS, OSI layers, Wireshark packet capture, and Linux bash commands.',
        skillsCovered: ['TCP/IP & Subnetting', 'Wireshark', 'Linux CLI', 'Basic Cryptography'],
        estimatedHours: 35,
        courses: [{ title: 'Google Cybersecurity Certificate', platform: 'Coursera', free: true }]
      },
      {
        moduleId: 'sec_l2',
        title: 'Threat Detection, SIEM & Defensive Operations',
        level: 'Intermediate',
        description: 'Configure firewalls, analyze log streams in Splunk, and execute defensive incident playbooks.',
        skillsCovered: ['SIEM & Splunk', 'Snort IDS/IPS', 'Endpoint Detection', 'Incident Response'],
        estimatedHours: 45,
        courses: [{ title: 'CompTIA Security+ Prep', platform: 'Professor Messer / Cybrary', free: true }]
      },
      {
        moduleId: 'sec_l3',
        title: 'Penetration Testing & Cloud Security',
        level: 'Advanced',
        description: 'Exploitation frameworks (Metasploit), web app security (OWASP Top 10), and AWS IAM security auditing.',
        skillsCovered: ['OWASP Top 10', 'Penetration Testing', 'Cloud IAM Security', 'Red Team Drills'],
        estimatedHours: 55,
        courses: [{ title: 'Practical Ethical Hacking', platform: 'TCM Security', free: true }]
      }
    ],
    certifications: [
      { name: 'CompTIA Security+', issuer: 'CompTIA', level: 'Intermediate' },
      { name: 'Certified Ethical Hacker (CEH)', issuer: 'EC-Council', level: 'Advanced' }
    ],
    interviewTopics: ['OWASP Top 10 Vulnerabilities', 'TCP Handshake & SYN Flooding', 'Symmetric vs Asymmetric Encryption'],
    sampleQuestions: [
      { question: 'How would you investigate an unexplained spike in outbound SSH traffic from an internal database server?', category: 'Technical' }
    ]
  },
  {
    title: 'Business Analyst',
    slug: 'business-analyst',
    category: 'Business & Management',
    description: 'Bridge business requirements with engineering execution by analyzing workflows, documenting user stories, and measuring ROI.',
    futureScope: 'Essential for accelerating enterprise digital transformations and cloud migration programs.',
    salaryRange: '$70,000 - $125,000',
    marketDemand: 'High',
    requiredSkills: [
      { name: 'Requirement Gathering & User Stories', minProficiency: 85, importance: 'Core' },
      { name: 'Process Mapping (BPMN / Visio)', minProficiency: 80, importance: 'Core' },
      { name: 'Agile & Scrum Frameworks', minProficiency: 85, importance: 'Core' },
      { name: 'SQL & Data Analysis', minProficiency: 70, importance: 'Recommended' },
      { name: 'Stakeholder Management', minProficiency: 85, importance: 'Core' },
      { name: 'Jira & Confluence', minProficiency: 80, importance: 'Recommended' }
    ],
    responsibilities: [
      'Elicit detailed software requirements from executive stakeholders and end users',
      'Create functional specification documents, wireframes, and BPMN process maps',
      'Facilitate sprint planning, backlog grooming, and sprint retrospectives',
      'Evaluate software acceptance criteria and validate business value deliverables'
    ],
    learningRoadmap: [
      {
        moduleId: 'ba_l1',
        title: 'Business Analysis Foundations & Agile Fundamentals',
        level: 'Beginner',
        description: 'BABOK guide principles, Agile vs Waterfall lifecycles, and user story composition.',
        skillsCovered: ['Agile & Scrum', 'User Story Writing', 'Acceptance Criteria'],
        estimatedHours: 25,
        courses: [{ title: 'Introduction to Business Analysis', platform: 'Coursera', free: true }]
      },
      {
        moduleId: 'ba_l2',
        title: 'Process Modeling, Jira & Data Querying',
        level: 'Intermediate',
        description: 'Draw BPMN 2.0 process flowcharts, manage Jira backlogs, and run basic SQL reporting queries.',
        skillsCovered: ['BPMN 2.0 Modeling', 'Jira Management', 'SQL for Analysts'],
        estimatedHours: 35,
        courses: [{ title: 'Agile with Atlassian Jira', platform: 'Atlassian Coursera', free: true }]
      },
      {
        moduleId: 'ba_l3',
        title: 'Enterprise Architecture & Financial Modeling',
        level: 'Advanced',
        description: 'Perform cost-benefit ROI analysis, risk management frameworks, and executive stakeholder alignment.',
        skillsCovered: ['Financial ROI Analysis', 'Enterprise Strategy', 'Change Management'],
        estimatedHours: 40,
        courses: [{ title: 'Business Strategy Specialization', platform: 'Wharton Online', free: true }]
      }
    ],
    certifications: [
      { name: 'Entry Certificate in Business Analysis (ECBA)', issuer: 'IIBA', level: 'Beginner' },
      { name: 'Certified Scrum Product Owner (CSPO)', issuer: 'Scrum Alliance', level: 'Intermediate' }
    ],
    interviewTopics: ['Requirement Conflict Resolution', 'BPMN vs Flowcharts', 'Prioritization Techniques (MoSCoW)'],
    sampleQuestions: [
      { question: 'How do you handle conflicting requirements between two senior executive stakeholders?', category: 'Technical' }
    ]
  },
  {
    title: 'Digital Marketer',
    slug: 'digital-marketer',
    category: 'Marketing & Growth',
    description: 'Drive customer acquisition, organic engagement, and brand visibility using multi-channel digital campaigns, SEO, and paid performance media.',
    futureScope: 'Rapid evolution toward AI-assisted copywriting, programmatic ad buying, and omni-channel automation.',
    salaryRange: '$60,000 - $110,000',
    marketDemand: 'High',
    requiredSkills: [
      { name: 'Search Engine Optimization (SEO)', minProficiency: 85, importance: 'Core' },
      { name: 'Google Ads & Paid Social (Meta)', minProficiency: 80, importance: 'Core' },
      { name: 'Google Analytics 4 (GA4)', minProficiency: 80, importance: 'Core' },
      { name: 'Content Marketing & Copywriting', minProficiency: 85, importance: 'Core' },
      { name: 'Email Marketing & CRM Automation', minProficiency: 75, importance: 'Recommended' },
      { name: 'Conversion Rate Optimization (CRO)', minProficiency: 70, importance: 'Recommended' }
    ],
    responsibilities: [
      'Develop and execute organic on-page, off-page, and technical SEO strategies',
      'Manage paid search and social campaigns with target ROAS / CPA metrics',
      'Analyze customer funnels, bounce rates, and conversion bottlenecks in GA4',
      'Create high-converting email sequences and promotional marketing funnels'
    ],
    learningRoadmap: [
      {
        moduleId: 'dm_l1',
        title: 'Content Strategy & Technical SEO Foundations',
        level: 'Beginner',
        description: 'Keyword research, on-page optimization, content cluster architecture, and backlink strategies.',
        skillsCovered: ['Keyword Research', 'On-Page SEO', 'Technical SEO Basics'],
        estimatedHours: 25,
        courses: [{ title: 'Google Digital Marketing & E-commerce Certificate', platform: 'Coursera', free: true }]
      },
      {
        moduleId: 'dm_l2',
        title: 'Paid Media & Google Analytics 4 Mastery',
        level: 'Intermediate',
        description: 'Launch Google Search campaigns, Meta Ads Manager targeting, and event tracking in GA4.',
        skillsCovered: ['Google Ads', 'Meta Ad Manager', 'Google Analytics 4'],
        estimatedHours: 35,
        courses: [{ title: 'HubSpot Inbound Marketing', platform: 'HubSpot Academy', free: true }]
      },
      {
        moduleId: 'dm_l3',
        title: 'Lifecycle Marketing & Growth Hacking',
        level: 'Advanced',
        description: 'Automation workflows in HubSpot, A/B landing page testing, and programmatic funnel engineering.',
        skillsCovered: ['A/B Testing', 'Marketing Automation', 'Retention Marketing'],
        estimatedHours: 40,
        courses: [{ title: 'Reforge Growth Series', platform: 'Reforge', free: true }]
      }
    ],
    certifications: [
      { name: 'Google Ads Search Certification', issuer: 'Google', level: 'Beginner' },
      { name: 'Google Analytics Individual Qualification (GA4)', issuer: 'Google', level: 'Intermediate' }
    ],
    interviewTopics: ['CPA vs CAC vs LTV', 'Attribution Modeling in GA4', 'Core Web Vitals for SEO'],
    sampleQuestions: [
      { question: 'If your paid Google Ads campaign has high click-through rates but low conversions, how would you troubleshoot?', category: 'Technical' }
    ]
  }
];

const assessmentQuestionsData = [
  // STEP 1: INTEREST ASSESSMENT
  {
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
    step: 1,
    category: 'interest',
    question: 'When starting a new project, what part do you naturally gravitate toward first?',
    description: 'Consider the initial phase you find most satisfying.',
    options: [
      { text: 'Designing the architecture, backend models, and clean reusable code structures', score: 10, affinityDomain: 'software_dev' },
      { text: 'Exploring mathematical patterns, data distributions, and neural models', score: 10, affinityDomain: 'ai_ml' },
      { text: 'Interviewing users, sketching mockups, and prioritizing visual ergonomics', score: 10, affinityDomain: 'ui_ux' },
      { text: 'Aligning business priorities, user stories, and market growth strategies', score: 10, affinityDomain: 'business_analyst' },
      { text: 'Analyzing competitor SEO, user acquisition funnels, and conversion rates', score: 10, affinityDomain: 'digital_marketer' }
    ]
  },

  // STEP 2: PERSONALITY & WORK PREFERENCES
  {
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
    step: 2,
    category: 'personality',
    question: 'Which work environment and operational tempo fits you best?',
    description: 'Your preferred workplace dynamics.',
    options: [
      { text: 'Deep focused technical engineering with autonomy over code quality and system architecture', score: 10, affinityDomain: 'software_dev' },
      { text: 'Research-oriented laboratory atmosphere exploring experimental models and mathematical frontiers', score: 10, affinityDomain: 'ai_ml' },
      { text: 'Fast-paced collaborative environment running threat audits and rapid incident triage', score: 10, affinityDomain: 'cybersecurity' },
      { text: 'Cross-functional collaborative sprints collaborating between design, engineering, and executives', score: 10, affinityDomain: 'business_analyst' }
    ]
  },

  // STEP 3: TECHNICAL SKILL ASSESSMENT
  {
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
    step: 3,
    category: 'technical',
    question: 'What is your current comfort level with Version Control (Git) and Code Architecture?',
    description: 'Your experience with modern collaborative development.',
    options: [
      { text: 'Advanced: Regular use of Git branching, merge conflict resolution, CI/CD pipelines, and modular design patterns', score: 10, affinityDomain: 'software_dev' },
      { text: 'Intermediate: Comfortable with git commit, push, pull, and collaborating on GitHub repositories', score: 8, affinityDomain: 'software_dev' },
      { text: 'Beginner: Familiar with basic Git commands and versioning concepts', score: 6, affinityDomain: 'data_analyst' },
      { text: 'Focus is primarily on design/product tools rather than code versioning', score: 6, affinityDomain: 'ui_ux' }
    ]
  },

  // STEP 4: APTITUDE & LOGICAL REASONING
  {
    step: 4,
    category: 'aptitude',
    question: 'A server database query response time increases quadratically O(N²) as users grow. What is the root cause and remedy?',
    description: 'Evaluate your quantitative and algorithmic intuition.',
    options: [
      { text: 'Missing database index or nested table loop; remedy with B-tree indices and O(N) hash joins', score: 10, affinityDomain: 'software_dev' },
      { text: 'Data distribution skew causing cache misses; analyze query execution plans and partition tables', score: 10, affinityDomain: 'data_analyst' },
      { text: 'Network bandwidth throttle; increase hardware CPU cores and memory allocation', score: 6, affinityDomain: 'cybersecurity' },
      { text: 'Not sure / would rely on performance monitoring documentation to troubleshoot', score: 5, affinityDomain: 'general' }
    ]
  },
  {
    step: 4,
    category: 'aptitude',
    question: 'If a machine learning classifier has 98% accuracy on cancer detection but misses 40% of actual cancer patients, what metric should you optimize?',
    description: 'Test your understanding of statistical trade-offs.',
    options: [
      { text: 'Recall (Sensitivity) to minimize critical False Negatives', score: 10, affinityDomain: 'ai_ml' },
      { text: 'Precision to eliminate all False Positives', score: 6, affinityDomain: 'data_analyst' },
      { text: 'Increase the overall classification threshold blindly', score: 4, affinityDomain: 'general' },
      { text: 'Accuracy is already 98%, so the model does not need adjustments', score: 2, affinityDomain: 'general' }
    ]
  },

  // STEP 5: COMMUNICATION & PROFESSIONAL SKILLS
  {
    step: 5,
    category: 'communication',
    question: 'How do you explain a complex technical bug or trade-off to a non-technical manager?',
    description: 'Professional communication and stakeholder empathy.',
    options: [
      { text: 'I use clear real-world analogies, explain the business impact and user risks, and present actionable solutions', score: 10, affinityDomain: 'business_analyst' },
      { text: 'I show quantitative metrics and dashboard charts demonstrating the drop in performance', score: 9, affinityDomain: 'data_analyst' },
      { text: 'I provide visual mockups and wireframes illustrating the intended fix versus current behavior', score: 9, affinityDomain: 'ui_ux' },
      { text: 'I explain the underlying code logic and architectural dependencies in detail', score: 7, affinityDomain: 'software_dev' }
    ]
  },
  {
    step: 5,
    category: 'communication',
    question: 'During a peer code or design review, someone points out a flaw in your implementation. How do you respond?',
    description: 'Constructive teamwork and growth mindset.',
    options: [
      { text: 'I welcome the critique objectively, ask clarifying questions, and implement the superior solution collaboratively', score: 10, affinityDomain: 'software_dev' },
      { text: 'I review empirical benchmark data to compare both approaches before deciding', score: 9, affinityDomain: 'ai_ml' },
      { text: 'I test both versions with real users to measure usability friction', score: 9, affinityDomain: 'ui_ux' }
    ]
  }
];

async function seedDatabase() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/careerpulse_ai';
    console.log(`Connecting to MongoDB at: ${mongoUri}`);
    await mongoose.connect(mongoUri);

    console.log('Clearing existing careers, questions, and demo seed data...');
    await Career.deleteMany({});
    await AssessmentQuestion.deleteMany({});
    await User.deleteMany({ email: { $in: ['student@careerpulse.ai', 'admin@careerpulse.ai'] } });

    console.log('Inserting career tracks...');
    const createdCareers = await Career.insertMany(careersData);
    console.log(`[Success] Inserted ${createdCareers.length} career tracks.`);

    console.log('Inserting 5-step assessment questions...');
    const createdQuestions = await AssessmentQuestion.insertMany(assessmentQuestionsData);
    console.log(`[Success] Inserted ${createdQuestions.length} assessment questions.`);

    console.log('Creating Admin Account...');
    const adminUser = await User.create({
      fullName: 'Platform Administrator',
      email: 'admin@careerpulse.ai',
      password: 'adminpassword123',
      role: 'ADMIN',
      college: 'Global Tech Institute',
      education: 'Master of Technology',
      graduationYear: 2022,
    });

    console.log('Creating Demo Student Account...');
    const studentUser = await User.create({
      fullName: 'Demo Student',
      email: 'student@careerpulse.ai',
      password: 'password123',
      role: 'STUDENT',
      college: 'National Institute of Technology',
      education: 'B.Tech Artificial Intelligence and Data Science',
      graduationYear: 2025,
    });

    const targetCareer = createdCareers.find((c) => c.slug === 'ai-ml-engineer') || createdCareers[0];

    console.log('Creating Profile for Demo Student...');
    await Profile.create({
      user: studentUser._id,
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
      targetCareer: targetCareer._id,
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
    });

    console.log('Seeding Demo Assessment Results...');
    await AssessmentResult.create({
      user: studentUser._id,
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
          careerId: targetCareer._id,
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
          careerId: createdCareers.find((c) => c.slug === 'software-developer')?._id || targetCareer._id,
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
          careerId: createdCareers.find((c) => c.slug === 'data-analyst')?._id || targetCareer._id,
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
      completedAt: new Date(),
    });

    console.log('Seeding Demo Learning Progress...');
    await LearningProgress.create({
      user: studentUser._id,
      career: targetCareer._id,
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
          unlockedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        },
        {
          badgeId: 'first_skill',
          title: 'First Skill Mastered',
          description: 'Completed Level 1 Python, Git & Data Foundations curriculum.',
          icon: 'CheckCircle',
          unlockedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        },
        {
          badgeId: 'learning_streak',
          title: '5-Day Learning Streak',
          description: 'Logged in and studied for 5 consecutive days.',
          icon: 'Flame',
          unlockedAt: new Date(),
        }
      ],
    });

    console.log('==================================================');
    console.log('DATABASE SEEDED SUCCESSFULLY!');
    console.log('Demo Student: student@careerpulse.ai / password123');
    console.log('Admin Account: admin@careerpulse.ai / adminpassword123');
    console.log('==================================================');

    process.exit(0);
  } catch (error) {
    console.error('Error during database seeding:', error);
    process.exit(1);
  }
}

seedDatabase();
