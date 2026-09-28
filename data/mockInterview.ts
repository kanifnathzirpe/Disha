// Feature 4: AI Mock Interview Data

export interface InterviewQuestion {
  id: string;
  question: string;
  category: 'technical' | 'situational' | 'behavioral' | 'domain';
  difficulty: 'easy' | 'medium' | 'hard';
  expectedPoints: string[];
  sampleAnswer: string;
  maxScore: number;
  timeLimit: number; // seconds
}

export interface InterviewRole {
  id: string;
  title: string;
  sector: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  requiredSkills: string[];
  questions: InterviewQuestion[];
  totalTime: number; // minutes
}

export interface InterviewResult {
  questionId: string;
  score: number;
  maxScore: number;
  feedback: string;
  strengths: string[];
  improvements: string[];
}

export const interviewRoles: InterviewRole[] = [
  {
    id: 'role-cnc',
    title: 'CNC Technician',
    sector: 'Manufacturing',
    difficulty: 'intermediate',
    description: 'Operate and program CNC machines for precision manufacturing',
    requiredSkills: ['CNC Programming', 'G-Code', 'AutoCAD', 'Machine Operation', 'Quality Inspection'],
    totalTime: 20,
    questions: [
      {
        id: 'cnc-q1',
        question: 'Explain the difference between G00 and G01 commands in CNC programming. When would you use each?',
        category: 'technical',
        difficulty: 'easy',
        expectedPoints: [
          'G00 is rapid traverse (non-cutting movement)',
          'G01 is linear interpolation with controlled feed rate',
          'G00 for positioning, G01 for actual cutting operations',
          'Safety considerations when using G00 near workpiece'
        ],
        sampleAnswer: 'G00 is a rapid traverse command that moves the tool at maximum speed without cutting. It is used for positioning moves. G01 is linear interpolation that moves the tool at a specified feed rate and is used for actual cutting operations. You should never use G00 near a workpiece as it can cause collision.',
        maxScore: 10,
        timeLimit: 120,
      },
      {
        id: 'cnc-q2',
        question: 'A component you machined shows a tolerance deviation of 0.05mm beyond specification. Walk me through your troubleshooting process.',
        category: 'situational',
        difficulty: 'medium',
        expectedPoints: [
          'Verify measurement with calibrated instruments',
          'Check tool wear and offset compensation',
          'Review program parameters and feed rates',
          'Inspect fixture/clamping alignment',
          'Check thermal expansion factors',
          'Document findings and corrective actions'
        ],
        sampleAnswer: 'First, I would verify the measurement using a calibrated micrometer or CMM. Then check tool wear - a worn insert can cause dimensional drift. I would review tool offset values and adjust compensation. Next, verify fixture alignment and clamping force. Check coolant flow as thermal expansion affects precision. Finally, document the root cause and corrective action taken.',
        maxScore: 15,
        timeLimit: 180,
      },
      {
        id: 'cnc-q3',
        question: 'What safety protocols do you follow before starting a CNC machine for a new job?',
        category: 'behavioral',
        difficulty: 'easy',
        expectedPoints: [
          'PPE verification (safety glasses, steel-toed shoes, etc.)',
          'Pre-start machine inspection',
          'Program verification / dry run',
          'Tool and fixture inspection',
          'Emergency stop accessibility check',
          'Coolant level check'
        ],
        sampleAnswer: 'Before starting, I verify all PPE is worn. I inspect the machine for any visible issues, check coolant levels, and ensure emergency stops work. I verify the tool setup matches the job sheet, check fixture clamping, and always run a dry run of the program first to validate toolpaths without material loaded.',
        maxScore: 10,
        timeLimit: 120,
      },
      {
        id: 'cnc-q4',
        question: 'Write the G-code sequence to machine a simple cylindrical step from Ø40mm to Ø30mm on a CNC lathe, with a depth of cut of 2mm per pass.',
        category: 'domain',
        difficulty: 'hard',
        expectedPoints: [
          'Correct use of G00 for rapid positioning',
          'Proper G01 for linear cutting',
          'Multiple passes with 2mm depth of cut',
          'Correct coordinate calculations (5 passes from R20 to R15)',
          'Feed rate and spindle speed specification',
          'Tool retract between passes'
        ],
        sampleAnswer: 'N10 G28 U0 W0 (Home position)\nN20 T0101 (Select tool)\nN30 G97 S1200 M03 (Spindle on)\nN40 G00 X40 Z2 (Rapid to start)\nN50 G01 X36 F0.15 (1st pass, 2mm depth)\nN60 G01 Z-30 (Cut length)\nN70 G00 X40 Z2 (Retract)\n... (Repeat to X30)\nN100 G28 U0 W0 M05',
        maxScore: 20,
        timeLimit: 300,
      },
      {
        id: 'cnc-q5',
        question: 'How do you ensure consistent quality when running a production batch of 500 identical components?',
        category: 'situational',
        difficulty: 'medium',
        expectedPoints: [
          'Statistical Process Control (SPC) / sampling plan',
          'First article inspection',
          'In-process gauging at regular intervals',
          'Tool life management and replacement schedule',
          'Temperature and environmental monitoring',
          'Documentation and traceability'
        ],
        sampleAnswer: 'I start with first article inspection against the drawing. Then implement an SPC sampling plan - measuring every 20th piece. I track tool wear and schedule replacement before tolerance drift. I monitor coolant temperature and machine thermal stability. All measurements are recorded for traceability. If any sample falls outside control limits, I stop and investigate.',
        maxScore: 15,
        timeLimit: 180,
      },
    ],
  },
  {
    id: 'role-fullstack',
    title: 'Junior Full Stack Developer',
    sector: 'IT/ITES',
    difficulty: 'intermediate',
    description: 'Build and maintain web applications using modern frameworks',
    requiredSkills: ['JavaScript', 'React.js', 'Node.js', 'SQL', 'REST APIs'],
    totalTime: 25,
    questions: [
      {
        id: 'fs-q1',
        question: 'Explain the difference between let, const, and var in JavaScript. Give a practical example of when you would use each.',
        category: 'technical',
        difficulty: 'easy',
        expectedPoints: [
          'var is function-scoped, let and const are block-scoped',
          'const cannot be reassigned after declaration',
          'let allows reassignment',
          'var has hoisting behavior',
          'Practical examples for each'
        ],
        sampleAnswer: 'var is function-scoped and hoisted, which can cause bugs. let is block-scoped and can be reassigned - use for loop counters. const is block-scoped and cannot be reassigned - use for constants and object references that don\'t change. In modern JS, prefer const by default, use let when you need mutation.',
        maxScore: 10,
        timeLimit: 120,
      },
      {
        id: 'fs-q2',
        question: 'A user reports that the web page loads slowly. How would you diagnose and fix performance issues?',
        category: 'situational',
        difficulty: 'medium',
        expectedPoints: [
          'Use browser DevTools Network tab to identify slow requests',
          'Check bundle size and implement code splitting',
          'Optimize images (lazy loading, proper formats)',
          'Check for unnecessary re-renders in React',
          'Database query optimization',
          'Implement caching strategies'
        ],
        sampleAnswer: 'First, I would use Chrome DevTools to analyze network waterfall and identify bottlenecks. Check Lighthouse score for specific recommendations. On frontend: implement code splitting, lazy load images, memoize expensive computations. On backend: optimize database queries, add indexes, implement Redis caching. Monitor with Web Vitals metrics.',
        maxScore: 15,
        timeLimit: 180,
      },
      {
        id: 'fs-q3',
        question: 'Design a REST API for a simple todo application. What endpoints would you create?',
        category: 'domain',
        difficulty: 'medium',
        expectedPoints: [
          'GET /api/todos - list all todos',
          'POST /api/todos - create a todo',
          'GET /api/todos/:id - get specific todo',
          'PUT /api/todos/:id - update a todo',
          'DELETE /api/todos/:id - delete a todo',
          'HTTP status codes and response format',
          'Validation and error handling'
        ],
        sampleAnswer: 'GET /api/todos (200, list), POST /api/todos (201, create), GET /api/todos/:id (200/404), PUT /api/todos/:id (200/404, update), DELETE /api/todos/:id (204/404). All return JSON. Include pagination for list endpoint, validation on POST/PUT, proper error messages with status codes.',
        maxScore: 15,
        timeLimit: 180,
      },
      {
        id: 'fs-q4',
        question: 'What is the Virtual DOM in React and why is it important for performance?',
        category: 'technical',
        difficulty: 'easy',
        expectedPoints: [
          'Virtual DOM is a lightweight JavaScript representation of the real DOM',
          'React diffs the virtual DOM with the previous version',
          'Only changed elements are updated in the real DOM (reconciliation)',
          'Batch updates for efficiency',
          'Reduces expensive direct DOM manipulations'
        ],
        sampleAnswer: 'The Virtual DOM is a lightweight copy of the actual DOM kept in memory. When state changes, React creates a new virtual DOM tree, diffs it with the previous one (reconciliation), and only updates the real DOM elements that actually changed. This is faster than directly manipulating the DOM because batch updates minimize reflows and repaints.',
        maxScore: 10,
        timeLimit: 120,
      },
      {
        id: 'fs-q5',
        question: 'How would you implement user authentication in a Node.js application? Describe the flow from registration to login.',
        category: 'domain',
        difficulty: 'hard',
        expectedPoints: [
          'Password hashing using bcrypt',
          'JWT token generation and verification',
          'Secure HTTP-only cookies or Bearer tokens',
          'Registration: validate input, hash password, store user',
          'Login: verify credentials, generate JWT',
          'Middleware for protecting routes',
          'Token refresh mechanism'
        ],
        sampleAnswer: 'Registration: validate email/password, hash password with bcrypt, store in database. Login: verify email exists, compare password hash with bcrypt, generate JWT with user ID and expiry. Send token as HTTP-only cookie. Protect routes with auth middleware that verifies JWT. Implement refresh tokens for session management. Store tokens securely, never in localStorage.',
        maxScore: 20,
        timeLimit: 240,
      },
    ],
  },
  {
    id: 'role-ev',
    title: 'EV Repair Technician',
    sector: 'Automotive',
    difficulty: 'intermediate',
    description: 'Diagnose, repair and maintain electric vehicle systems',
    requiredSkills: ['EV Battery Systems', 'Electric Motor Repair', 'Diagnostic Tools', 'High Voltage Safety'],
    totalTime: 20,
    questions: [
      {
        id: 'ev-q1',
        question: 'What are the key safety protocols when working with high-voltage EV battery systems?',
        category: 'technical',
        difficulty: 'easy',
        expectedPoints: [
          'Isolate high-voltage system before any work',
          'Use insulated tools rated for voltage level',
          'Wear appropriate PPE (insulated gloves, face shield)',
          'Follow lockout/tagout procedures',
          'Wait for capacitor discharge',
          'Use multimeter to verify zero voltage'
        ],
        sampleAnswer: 'Always follow the manufacturer\'s service disconnect procedure. Use LOTO procedures. Wear Class 0 insulated gloves with leather protectors and safety glasses. Use insulated tools. After disconnecting, wait for capacitors to discharge (typically 5 minutes). Verify zero voltage with a CAT III rated multimeter before touching any HV components. Never work alone on HV systems.',
        maxScore: 10,
        timeLimit: 120,
      },
      {
        id: 'ev-q2',
        question: 'An EV customer reports reduced driving range. What diagnostic steps would you take?',
        category: 'situational',
        difficulty: 'medium',
        expectedPoints: [
          'Check battery State of Health (SOH)',
          'Read diagnostic trouble codes (DTCs)',
          'Check individual cell voltages for imbalance',
          'Verify charging system operation',
          'Check tire pressure and alignment',
          'Review driving habits and climate control usage',
          'Check for parasitic drain'
        ],
        sampleAnswer: 'Connect OBD-II scanner to read DTCs and battery data. Check SOH percentage and individual cell voltages for imbalance. Verify charging system completes full cycles. Check for software updates that affect BMS. Physical checks: tire pressure, brake drag, HVAC system drain. Review customer driving patterns. If cells show significant imbalance, may need battery module replacement or reconditioning.',
        maxScore: 15,
        timeLimit: 180,
      },
      {
        id: 'ev-q3',
        question: 'Explain the difference between AC and DC charging for electric vehicles.',
        category: 'technical',
        difficulty: 'easy',
        expectedPoints: [
          'AC charging uses onboard charger to convert AC to DC',
          'DC fast charging bypasses onboard charger',
          'AC charging typically 3.3kW to 22kW (Level 1/2)',
          'DC charging 50kW to 350kW (Level 3)',
          'DC charging is faster but more expensive infrastructure',
          'Battery thermal management during DC fast charging'
        ],
        sampleAnswer: 'AC charging (Level 1/2) sends AC power to the car\'s onboard charger which converts it to DC for the battery. It\'s slower (3.3-22kW) but cheaper. DC fast charging (Level 3) converts power externally and feeds DC directly to the battery, bypassing the onboard charger. It provides 50-350kW but generates more heat, requiring active battery thermal management.',
        maxScore: 10,
        timeLimit: 120,
      },
      {
        id: 'ev-q4',
        question: 'How does regenerative braking work in an EV, and what components are involved?',
        category: 'domain',
        difficulty: 'medium',
        expectedPoints: [
          'Electric motor acts as generator during deceleration',
          'Kinetic energy converted to electrical energy',
          'Energy stored back in battery',
          'Controlled by motor controller/inverter',
          'Blending with friction brakes',
          'Impact on driving range'
        ],
        sampleAnswer: 'During deceleration, the drive motor switches to generator mode, converting kinetic energy into electrical energy that charges the battery. The inverter manages the conversion from AC (generated) to DC (battery). The VCU blends regenerative braking with friction brakes based on brake pedal input. Regen can recover 10-30% of energy, significantly extending range in city driving.',
        maxScore: 15,
        timeLimit: 180,
      },
    ],
  },
  {
    id: 'role-healthcare',
    title: 'Healthcare Assistant',
    sector: 'Healthcare',
    difficulty: 'beginner',
    description: 'Assist medical professionals in patient care activities',
    requiredSkills: ['Patient Care', 'Vital Signs Monitoring', 'First Aid', 'Medical Terminology'],
    totalTime: 15,
    questions: [
      {
        id: 'hc-q1',
        question: 'What are the normal ranges for vital signs in an adult patient (blood pressure, heart rate, temperature, respiratory rate)?',
        category: 'technical',
        difficulty: 'easy',
        expectedPoints: [
          'BP: 120/80 mmHg (normal), hypertension above 140/90',
          'Heart rate: 60-100 bpm',
          'Temperature: 36.1-37.2°C (97-99°F)',
          'Respiratory rate: 12-20 breaths/min',
          'Oxygen saturation: 95-100%'
        ],
        sampleAnswer: 'Normal BP is around 120/80 mmHg. Heart rate 60-100 bpm at rest. Body temperature 36.1-37.2°C. Respiratory rate 12-20 breaths per minute. Oxygen saturation should be 95-100%. Any readings outside these ranges should be reported to the nurse or doctor immediately.',
        maxScore: 10,
        timeLimit: 120,
      },
      {
        id: 'hc-q2',
        question: 'A patient suddenly collapses in the ward. Describe your immediate response.',
        category: 'situational',
        difficulty: 'medium',
        expectedPoints: [
          'Check for responsiveness (tap and shout)',
          'Call for help / activate emergency code',
          'Check airway, breathing, circulation (ABC)',
          'Begin CPR if no pulse/breathing',
          'Use AED if available',
          'Do not leave patient alone',
          'Note time of collapse'
        ],
        sampleAnswer: 'First, check responsiveness by tapping and calling the patient. If unresponsive, immediately call the emergency code/press the emergency button. Check ABCs - open airway, look for breathing, check pulse. If no pulse, begin CPR (30 compressions, 2 breaths). Ask someone to bring the AED. Continue CPR until the crash team arrives. Note the exact time of collapse.',
        maxScore: 15,
        timeLimit: 180,
      },
      {
        id: 'hc-q3',
        question: 'How do you maintain patient privacy and dignity during caregiving tasks?',
        category: 'behavioral',
        difficulty: 'easy',
        expectedPoints: [
          'Close curtains/doors during personal care',
          'Explain procedures before performing them',
          'Use proper draping techniques',
          'Speak respectfully and use patient\'s preferred name',
          'Keep medical information confidential',
          'Obtain consent before procedures'
        ],
        sampleAnswer: 'I always close curtains and doors before personal care. I explain what I\'m going to do and get consent. I use proper draping to minimize exposure. I address patients by their preferred name. I never discuss patient information in public areas. All records are kept confidential per hospital policy. I respect cultural and religious preferences.',
        maxScore: 10,
        timeLimit: 120,
      },
    ],
  },
];

export const interviewTips = [
  'Speak clearly and structure your answers logically',
  'Use specific examples from your training or experience',
  'If you don\'t know an answer, describe your approach to finding the solution',
  'Mention safety protocols when relevant - employers value safety awareness',
  'Quantify your achievements when possible (e.g., "I reduced rejection rate by 15%")',
  'Show enthusiasm for continuous learning and skill development',
];
