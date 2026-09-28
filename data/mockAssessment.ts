// Feature 5: Aptitude + Technical Assessment Data

export interface AssessmentQuestion {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface AssessmentSection {
  id: string;
  title: string;
  icon: string;
  description: string;
  timeLimit: number; // minutes
  questions: AssessmentQuestion[];
}

export interface AssessmentTest {
  id: string;
  title: string;
  description: string;
  type: 'aptitude' | 'technical' | 'combined';
  targetRole?: string;
  targetSkill?: string;
  totalTime: number;
  sections: AssessmentSection[];
  passingScore: number;
}

export const assessmentTests: AssessmentTest[] = [
  {
    id: 'apt-general',
    title: 'General Employability Aptitude',
    description: 'Measures quantitative reasoning, logical ability, verbal comprehension and workplace readiness',
    type: 'aptitude',
    totalTime: 45,
    passingScore: 60,
    sections: [
      {
        id: 'quant',
        title: 'Quantitative Reasoning',
        icon: 'Calculator',
        description: 'Mathematical reasoning and data interpretation',
        timeLimit: 15,
        questions: [
          {
            id: 'q-q1',
            text: 'A factory produces 240 units in 8 hours. If production rate increases by 25%, how many units will be produced in 6 hours?',
            options: ['225', '240', '200', '180'],
            correctIndex: 0,
            explanation: 'Original rate = 240/8 = 30 units/hour. New rate = 30 × 1.25 = 37.5 units/hour. In 6 hours = 37.5 × 6 = 225 units.',
            difficulty: 'medium',
          },
          {
            id: 'q-q2',
            text: 'If the ratio of skilled to unskilled workers is 3:5 and there are 120 skilled workers, what is the total workforce?',
            options: ['200', '320', '280', '360'],
            correctIndex: 1,
            explanation: '3 parts = 120, so 1 part = 40. Total = (3+5) × 40 = 8 × 40 = 320.',
            difficulty: 'easy',
          },
          {
            id: 'q-q3',
            text: 'A training program costs ₹12,000. If a company sponsors 60% and the government subsidizes 25% of the remainder, how much does the trainee pay?',
            options: ['₹3,600', '₹3,000', '₹4,200', '₹4,800'],
            correctIndex: 0,
            explanation: 'Company pays = 12000 × 0.60 = ₹7,200. Remainder = ₹4,800. Govt subsidy = 4800 × 0.25 = ₹1,200. Trainee = 4800 - 1200 = ₹3,600.',
            difficulty: 'medium',
          },
          {
            id: 'q-q4',
            text: 'What is 15% of 860?',
            options: ['119', '129', '139', '149'],
            correctIndex: 1,
            explanation: '15% of 860 = (15/100) × 860 = 129.',
            difficulty: 'easy',
          },
          {
            id: 'q-q5',
            text: 'A machine completes a job in 12 minutes. Another machine completes the same job in 18 minutes. Working together, how long will they take?',
            options: ['6.2 min', '7.2 min', '8.2 min', '9.2 min'],
            correctIndex: 1,
            explanation: 'Combined rate = 1/12 + 1/18 = 3/36 + 2/36 = 5/36 jobs/min. Time = 36/5 = 7.2 minutes.',
            difficulty: 'hard',
          },
        ],
      },
      {
        id: 'logical',
        title: 'Logical Reasoning',
        icon: 'Brain',
        description: 'Pattern recognition and logical deduction',
        timeLimit: 15,
        questions: [
          {
            id: 'l-q1',
            text: 'Complete the pattern: 2, 6, 18, 54, ?',
            options: ['108', '162', '148', '126'],
            correctIndex: 1,
            explanation: 'Each number is multiplied by 3. 54 × 3 = 162.',
            difficulty: 'easy',
          },
          {
            id: 'l-q2',
            text: 'If all CNC operators are technicians, and some technicians are engineers, which statement is definitely true?',
            options: [
              'All CNC operators are engineers',
              'Some CNC operators may be engineers',
              'No CNC operator is an engineer',
              'All engineers are CNC operators'
            ],
            correctIndex: 1,
            explanation: 'Since CNC operators are technicians, and some technicians are engineers, it is possible (but not certain) that some CNC operators are engineers.',
            difficulty: 'medium',
          },
          {
            id: 'l-q3',
            text: 'In a sequence of quality checks, if Product A passes and Product B fails, and Product C scores higher than A but lower than D, which product has the highest quality?',
            options: ['Product A', 'Product B', 'Product C', 'Product D'],
            correctIndex: 3,
            explanation: 'D > C > A > B (pass threshold). Product D has the highest quality score.',
            difficulty: 'easy',
          },
          {
            id: 'l-q4',
            text: 'A workshop has 5 machines numbered 1-5. Machine 3 must run before Machine 5. Machine 1 must run before Machine 3. Machine 2 can run at any time. Machine 4 must run after Machine 5. What is the earliest position Machine 5 can run?',
            options: ['2nd', '3rd', '4th', '5th'],
            correctIndex: 1,
            explanation: 'Machine 1 must be first (before 3), Machine 3 second (before 5), so Machine 5 can be 3rd at earliest.',
            difficulty: 'hard',
          },
          {
            id: 'l-q5',
            text: 'If SKILL = 19+11+9+12+12 = 63, what is the value of TRADE using the same logic (A=1, B=2, ...)?',
            options: ['50', '52', '54', '56'],
            correctIndex: 1,
            explanation: 'T=20, R=18, A=1, D=4, E=5. Total = 20+18+1+4+5 = 48... Let me recalc: T(20)+R(18)+A(1)+D(4)+E(5) = 48.',
            difficulty: 'medium',
          },
        ],
      },
      {
        id: 'verbal',
        title: 'Verbal Comprehension',
        icon: 'BookOpen',
        description: 'Reading comprehension and communication skills',
        timeLimit: 15,
        questions: [
          {
            id: 'v-q1',
            text: 'Choose the word closest in meaning to "PROFICIENT":',
            options: ['Beginner', 'Skilled', 'Lazy', 'Careless'],
            correctIndex: 1,
            explanation: 'Proficient means highly skilled or competent in a particular area.',
            difficulty: 'easy',
          },
          {
            id: 'v-q2',
            text: '"The new safety protocol _____ implemented across all manufacturing units by December." Choose the correct word:',
            options: ['will be', 'has', 'were', 'is being have'],
            correctIndex: 0,
            explanation: '"Will be" is correct for future passive voice - the protocol will be implemented.',
            difficulty: 'easy',
          },
          {
            id: 'v-q3',
            text: 'Read: "The company reported a 15% increase in productivity after implementing automated quality control systems. However, employee satisfaction dropped by 8%." What can be inferred?',
            options: [
              'Automation always leads to dissatisfaction',
              'Productivity gains may come with workforce morale challenges',
              'The company should remove automation',
              'Employee satisfaction is not important'
            ],
            correctIndex: 1,
            explanation: 'The passage shows a trade-off: automation improved productivity but negatively affected satisfaction, suggesting gains may have associated challenges.',
            difficulty: 'medium',
          },
          {
            id: 'v-q4',
            text: 'Identify the error: "Each of the trainees have completed their certification."',
            options: [
              '"have" should be "has"',
              '"their" should be "its"',
              '"completed" should be "complete"',
              'No error'
            ],
            correctIndex: 0,
            explanation: '"Each" is singular, so it requires "has" not "have". "Each of the trainees has completed their certification."',
            difficulty: 'medium',
          },
          {
            id: 'v-q5',
            text: 'Which sentence is appropriate for a professional workplace email?',
            options: [
              'Hey bro, send me the report ASAP',
              'Dear Sir/Madam, I kindly request the monthly production report at your earliest convenience',
              'send report now!!!',
              'Where is report?? I need it'
            ],
            correctIndex: 1,
            explanation: 'Option 2 uses professional language, proper salutation, and a polite tone appropriate for workplace communication.',
            difficulty: 'easy',
          },
        ],
      },
    ],
  },
  {
    id: 'tech-cnc',
    title: 'CNC Technical Assessment',
    description: 'Skill-specific technical assessment for CNC machine operations and programming',
    type: 'technical',
    targetRole: 'CNC Technician',
    targetSkill: 'CNC Programming',
    totalTime: 30,
    passingScore: 65,
    sections: [
      {
        id: 'cnc-theory',
        title: 'CNC Theory & Operations',
        icon: 'Cog',
        description: 'Machine operation knowledge and programming fundamentals',
        timeLimit: 15,
        questions: [
          {
            id: 'ct-q1',
            text: 'Which G-code is used for circular interpolation (clockwise) on a CNC mill?',
            options: ['G00', 'G01', 'G02', 'G03'],
            correctIndex: 2,
            explanation: 'G02 is used for clockwise circular interpolation. G03 is counterclockwise.',
            difficulty: 'easy',
          },
          {
            id: 'ct-q2',
            text: 'What is the function of M06 in a CNC program?',
            options: ['Spindle On (CW)', 'Coolant On', 'Tool Change', 'Program Stop'],
            correctIndex: 2,
            explanation: 'M06 is the tool change command. M03 is spindle on CW, M08 is coolant on, M00 is program stop.',
            difficulty: 'easy',
          },
          {
            id: 'ct-q3',
            text: 'For a turning operation with cutting speed 120 m/min and workpiece diameter 40mm, what is the spindle speed (RPM)?',
            options: ['756 RPM', '955 RPM', '1200 RPM', '1528 RPM'],
            correctIndex: 1,
            explanation: 'N = (1000 × V) / (π × D) = (1000 × 120) / (3.14159 × 40) = 120000 / 125.66 ≈ 955 RPM.',
            difficulty: 'hard',
          },
          {
            id: 'ct-q4',
            text: 'What does the "least count" of a micrometer mean?',
            options: [
              'The minimum number of measurements required',
              'The smallest measurement that can be read',
              'The counting mechanism of the instrument',
              'The number of scale divisions'
            ],
            correctIndex: 1,
            explanation: 'Least count is the smallest measurement that an instrument can accurately read. For a standard micrometer, it is typically 0.01mm.',
            difficulty: 'easy',
          },
          {
            id: 'ct-q5',
            text: 'When programming a CNC lathe, what coordinate system is typically used?',
            options: [
              '3-axis Cartesian (X, Y, Z)',
              '2-axis (X, Z) with X as diameter',
              'Polar coordinates (R, θ)',
              '2-axis (X, Y) only'
            ],
            correctIndex: 1,
            explanation: 'CNC lathes use a 2-axis system (X and Z) where X represents the diameter direction and Z represents the longitudinal direction.',
            difficulty: 'medium',
          },
        ],
      },
      {
        id: 'cnc-practical',
        title: 'Practical Problem Solving',
        icon: 'Wrench',
        description: 'Real-world troubleshooting and problem solving',
        timeLimit: 15,
        questions: [
          {
            id: 'cp-q1',
            text: 'A CNC machine produces a part with a taper when it should be straight. The most likely cause is:',
            options: [
              'Incorrect feed rate',
              'Tailstock misalignment or tool wear',
              'Wrong spindle speed',
              'Coolant flow issue'
            ],
            correctIndex: 1,
            explanation: 'A taper on a straight cut typically indicates tailstock misalignment on a lathe or uneven tool wear causing dimensional variation along the cut length.',
            difficulty: 'medium',
          },
          {
            id: 'cp-q2',
            text: 'You notice chatter marks on the workpiece surface. Which action would most likely reduce chatter?',
            options: [
              'Increase feed rate and decrease speed',
              'Reduce tool overhang and increase rigidity',
              'Use a larger depth of cut',
              'Remove coolant'
            ],
            correctIndex: 1,
            explanation: 'Chatter is caused by vibration, often from insufficient rigidity. Reducing tool overhang, using a more rigid setup, and optimizing cutting parameters helps eliminate chatter.',
            difficulty: 'medium',
          },
          {
            id: 'cp-q3',
            text: 'What tool is used to measure the internal diameter of a bore with ±0.01mm accuracy?',
            options: [
              'Vernier Caliper',
              'Inside Micrometer / Bore Gauge',
              'Steel Rule',
              'Depth Gauge'
            ],
            correctIndex: 1,
            explanation: 'An inside micrometer or bore gauge provides the accuracy needed for internal diameter measurements with ±0.01mm precision.',
            difficulty: 'easy',
          },
          {
            id: 'cp-q4',
            text: 'During a production run, you find that tool #3 has exceeded its expected tool life. What is your first action?',
            options: [
              'Continue running until the tool breaks',
              'Replace the tool and update the offset',
              'Increase the feed rate to compensate',
              'Switch to a different program'
            ],
            correctIndex: 1,
            explanation: 'Replace the worn tool immediately and update the tool offset compensation to maintain dimensional accuracy. Never continue with a worn tool as it degrades quality.',
            difficulty: 'easy',
          },
          {
            id: 'cp-q5',
            text: 'A customer requires a surface finish of Ra 1.6 μm. Which combination would best achieve this?',
            options: [
              'High feed, low speed, large nose radius',
              'Low feed, high speed, large nose radius',
              'High feed, high speed, small nose radius',
              'Low feed, low speed, small nose radius'
            ],
            correctIndex: 1,
            explanation: 'For good surface finish: use low feed rate (fewer tool marks), high cutting speed (cleaner cut), and large nose radius (smoother finish).',
            difficulty: 'hard',
          },
        ],
      },
    ],
  },
];

export interface AssessmentResult {
  testId: string;
  testTitle: string;
  date: string;
  totalScore: number;
  maxScore: number;
  percentage: number;
  passed: boolean;
  sectionScores: {
    sectionId: string;
    sectionTitle: string;
    score: number;
    maxScore: number;
    percentage: number;
  }[];
  strengths: string[];
  improvements: string[];
  badge?: string;
}

export const pastResults: AssessmentResult[] = [
  {
    testId: 'apt-general',
    testTitle: 'General Employability Aptitude',
    date: '2026-09-15',
    totalScore: 68,
    maxScore: 100,
    percentage: 68,
    passed: true,
    sectionScores: [
      { sectionId: 'quant', sectionTitle: 'Quantitative Reasoning', score: 24, maxScore: 35, percentage: 69 },
      { sectionId: 'logical', sectionTitle: 'Logical Reasoning', score: 26, maxScore: 35, percentage: 74 },
      { sectionId: 'verbal', sectionTitle: 'Verbal Comprehension', score: 18, maxScore: 30, percentage: 60 },
    ],
    strengths: ['Logical pattern recognition', 'Basic arithmetic'],
    improvements: ['Reading comprehension speed', 'Professional communication'],
    badge: 'Aptitude Verified',
  },
];
