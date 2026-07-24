import primaryImg from '../assets/images/courses/primary.avif';
import middleImg from '../assets/images/courses/middle.avif';
import secondaryImg from '../assets/images/courses/secondary.avif';
import spokenEnglishImg from '../assets/images/courses/spoken-english.avif';
import computerImg from '../assets/images/courses/computer.webp';
import webDevImg from '../assets/images/courses/web-development.avif';
import msOfficeImg from '../assets/images/courses/ms-office.avif';
import graphicDesignImg from '../assets/images/courses/gragic-designing.avif';
import digitalMarketingImg from '../assets/images/courses/digital-marketing.avif';

export const tuitionClasses = [
    {
        id: 'primary-classes',
        slug: 'primary-classes',
        category: 'tuition',
        title: 'Primary Classes (KG to 5th)',
        image: primaryImg,
        description: 'Foundation building for young learners with focus on Mathematics, English, Urdu, and Science. Fun learning activities and homework support included.',
        subjects: ['Mathematics', 'English', 'Urdu', 'Science'],
        badge: 'Foundation Level',
        duration: 'Ongoing / Academic Year',
        // schedule: 'Morning & Afternoon Batches',
        classSize: '10–12 students',
        price: 'Monthly Fee',
        level: 'KG – 5th',
        language: 'English & Urdu',
        whoFor: [
            'Children from KG to Class 5th',
            'Students who need homework and concept support',
            'Parents looking for a caring, structured learning environment',
        ],
        highlights: [
            { label: 'Class Strength', value: 'Small Batches' },
            { label: 'Focus', value: 'Foundations' },
            { label: 'Assessments', value: 'Weekly' },
            { label: 'Support', value: 'Parent Updates' },
        ],
        features: [
            'Age-appropriate interactive teaching with stories, visuals, and games',
            'Daily homework help and guided practice worksheets',
            'Phonics and early reading support for stronger literacy',
            'Small class strength so every child gets personal attention',
            'Friendly environment that builds confidence and curiosity',
            'Regular short tests to track progress gently',
        ],
        outcomes: [
            'Strong foundation in Mathematics, English, Urdu, and Science',
            'Improved reading fluency, writing clarity, and vocabulary',
            'Better classroom confidence and study habits',
            'Ready transition into middle-class academic demands',
        ],
        modules: [
            {
                title: 'Mathematics Foundations',
                detail: 'Number sense, counting, place value, addition, subtraction, multiplication tables, and basic problem-solving through practical examples.',
            },
            {
                title: 'English Language Skills',
                detail: 'Phonics, spelling, vocabulary building, sentence writing, reading comprehension, and spoken expression for everyday communication.',
            },
            {
                title: 'Urdu Reading & Writing',
                detail: 'Letter recognition, fluent reading practice, handwriting, and simple comprehension passages suitable for each grade level.',
            },
            {
                title: 'Science Exploration',
                detail: 'Activity-based introduction to living things, environment, materials, and everyday science concepts that spark curiosity.',
            },
        ],
        methodology: [
            'Activity-based lessons instead of rote memorization',
            'Visual teaching aids, flashcards, and classroom games',
            'One-to-one support for children who need extra help',
            'Positive reinforcement and habit-building routines',
        ],
        requirements: [
            'School bag, notebooks, and stationery',
            'Previous class progress report (if available)',
            'Regular attendance for best results',
        ],
        faqs: [
            {
                q: 'Is this suitable for KG students?',
                a: 'Yes. We run age-appropriate activities for KG and gradually introduce reading, counting, and social classroom skills.',
            },
            {
                q: 'Do you help with school homework?',
                a: 'Yes. Homework support is part of the class routine so children complete tasks correctly and understand concepts.',
            },
            {
                q: 'How do parents get updates?',
                a: 'Teachers share short progress feedback and advise families when a child needs extra practice at home.',
            },
        ],
        overview: `
            <p>The Primary Classes program at The Village Academia is crafted for young learners from Kindergarten to Class 5th. At this stage, children need more than syllabus coverage — they need confidence, curiosity, and strong basics that will support every future subject.</p>
            <p>Our teachers use warm, child-friendly methods: storytelling, games, worksheets, phonics practice, and guided homework help. Lessons are short, structured, and interactive so students stay engaged while still learning essential academic skills.</p>
            <p>Each child is guided according to their pace. We strengthen Math, English, Urdu, and Science through clear explanation, daily revision, and gentle assessments. Parent communication is also prioritized so learning continues smoothly at home.</p>
            <h3>Why This Program Matters</h3>
            <p>Early learning gaps often become bigger challenges in middle and secondary classes. By building clear foundations now, students become better readers, more confident speakers, and stronger problem-solvers for Class 6th and beyond.</p>
        `,
    },
    {
        id: 'middle-classes',
        slug: 'middle-classes',
        category: 'tuition',
        title: 'Middle Classes (6th to 8th)',
        image: middleImg,
        description: 'Building strong concepts in Mathematics, Science, English, Urdu and Social Studies. Preparing students for secondary education with confidence.',
        subjects: ['Mathematics', 'Science', 'English', 'Social Studies'],
        badge: 'Concept Building',
        duration: 'Ongoing / Academic Year',
        // schedule: 'Afternoon & Evening Batches',
        classSize: '12–15 students',
        price: 'Monthly Fee',
        level: '6th – 8th',
        language: 'English & Urdu',
        whoFor: [
            'Students of Classes 6th, 7th, and 8th',
            'Learners struggling with conceptual subjects like Math or Science',
            'Students preparing for a smooth entry into Class 9th',
        ],
        highlights: [
            { label: 'Core Focus', value: 'Concepts First' },
            { label: 'Testing', value: 'Chapter-wise' },
            { label: 'Reports', value: 'Monthly' },
            { label: 'Goal', value: 'Class 9 Ready' },
        ],
        features: [
            'Concept-first teaching for Mathematics and Science',
            'Chapter-wise tests with feedback and correction',
            'English writing, grammar, and comprehension practice',
            'Bridge preparation for Class 9 board stream',
            'Doubt-clearing sessions after each major topic',
            'Progress sharing with parents every month',
        ],
        outcomes: [
            'Clear understanding of core middle-school concepts',
            'Improved exam confidence and answer presentation',
            'Better analytical thinking in Math and Science',
            'Academic readiness for secondary board classes',
        ],
        modules: [
            {
                title: 'Mathematics & Problem Solving',
                detail: 'Algebra basics, geometry, fractions, percentages, equations, and step-by-step methods to tackle word problems confidently.',
            },
            {
                title: 'General Science',
                detail: 'Physics, Chemistry, and Biology foundations with diagrams, experiments discussion, and concept maps for long-term memory.',
            },
            {
                title: 'Languages & Expression',
                detail: 'English and Urdu comprehension, grammar accuracy, essay structure, and vocabulary for higher secondary writing demands.',
            },
            {
                title: 'Social Studies Support',
                detail: 'History, geography, and civics explained with timelines, maps, and revision strategies for school exams.',
            },
        ],
        methodology: [
            'Explain → Practice → Test → Review cycle',
            'Board-style written practice starts early',
            'Individual attention for weak topics',
            'Revision planners before school exams',
        ],
        requirements: [
            'Current class textbooks and notebooks',
            'Willingness to attempt weekly written work',
            'Consistent attendance in scheduled batches',
        ],
        faqs: [
            {
                q: 'My child is weak in Mathematics. Can this help?',
                a: 'Yes. We diagnose weak areas first and rebuild fundamentals with guided practice before moving to advanced topics.',
            },
            {
                q: 'Do you follow the school syllabus?',
                a: 'Yes. Teaching is aligned with school curriculum while also strengthening concepts needed for Class 9th.',
            },
            {
                q: 'Are tests included?',
                a: 'Chapter-wise and monthly assessments are included to measure understanding and improve exam technique.',
            },
        ],
        overview: `
            <p>Classes 6th to 8th are a critical bridge between primary learning and board-level secondary education. Students begin to face deeper Mathematics, Science, and language demands — and small gaps can quickly become major difficulties.</p>
            <p>Our Middle Classes tuition focuses on concept clarity first. Teachers explain each topic from the base level, then move to practice questions, written assignments, and exam-oriented revision. Students learn not only “what” to study, but “how” to approach questions properly.</p>
            <p>We also prepare learners for the academic jump into Class 9th. That means better writing structure, stronger calculation speed, diagram practice in Science, and improved habit of regular revision.</p>
            <h3>Parent Partnership</h3>
            <p>Monthly reports and teacher feedback help parents understand strengths, improvement areas, and the next study priorities — so home support remains practical and realistic.</p>
        `,
    },
    {
        id: 'secondary-classes',
        slug: 'secondary-classes',
        category: 'tuition',
        title: 'Secondary Classes (9th to 12th)',
        image: secondaryImg,
        description: 'Complete SSC and HSSC preparation including board exams and entrance tests (MDCAT/ECAT). Separate batches for Pre-Medical and Pre-Engineering.',
        subjects: ['Board Exam Prep', 'MDCAT', 'ECAT', 'Pre-Medical & Engineering'],
        badge: 'Board & Entry Test',
        duration: 'Ongoing / Academic Year',
        // schedule: 'Morning, Afternoon & Evening Batches',
        classSize: '12–15 students',
        price: 'Monthly Fee',
        level: '9th – 12th',
        language: 'English (Urdu support available)',
        whoFor: [
            'SSC & HSSC students aiming for high board marks',
            'Pre-Medical students preparing for MDCAT',
            'Pre-Engineering students preparing for ECAT',
        ],
        highlights: [
            { label: 'Streams', value: 'Medical & Engineering' },
            { label: 'Practice', value: 'Past Papers' },
            { label: 'Entry Tests', value: 'MDCAT / ECAT' },
            { label: 'Timing', value: 'Flexible Batches' },
        ],
        features: [
            'Complete board syllabus coverage for SSC and HSSC',
            'Separate Pre-Medical and Pre-Engineering batches',
            'MDCAT and ECAT practice tests with past papers',
            'Flexible morning and evening timings',
            'Chapter tests, model papers, and exam strategy sessions',
            'Dedicated doubt-clearing and revision weeks',
        ],
        outcomes: [
            'Stronger board exam scores through structured practice',
            'Entrance-test readiness with MCQ speed and accuracy',
            'Clearer subject strategy for Physics, Chemistry, Biology/Math',
            'Higher confidence for university admission goals',
        ],
        modules: [
            {
                title: 'Board Syllabus Mastery',
                detail: 'Full topic coverage according to board requirements with notes, diagram practice, numerical solving, and chapter revision drills.',
            },
            {
                title: 'Pre-Medical Pathway',
                detail: 'Focused support in Biology, Chemistry, and Physics with MDCAT-oriented question patterns and timed practice.',
            },
            {
                title: 'Pre-Engineering Pathway',
                detail: 'Intensive Mathematics, Physics, and Chemistry practice tailored for board exams and ECAT-style problem solving.',
            },
            {
                title: 'Exam Strategy & Past Papers',
                detail: 'Marking-scheme awareness, time management, common-mistake analysis, and full-length model papers before exams.',
            },
        ],
        methodology: [
            'Topic teaching followed by board-pattern questions',
            'Weekly tests with detailed result analysis',
            'Separate sessions for MCQs and long answers',
            'Targeted revision plans near board/entry tests',
        ],
        requirements: [
            'Board-prescribed textbooks and past papers',
            'Scientific calculator where required',
            'Commitment to weekly tests and homework',
        ],
        faqs: [
            {
                q: 'Do you offer separate medical and engineering batches?',
                a: 'Yes. Pre-Medical and Pre-Engineering students study in dedicated streams with subject focus matched to their goals.',
            },
            {
                q: 'Is entrance test preparation included?',
                a: 'Yes. MDCAT and ECAT practice modules, MCQ drills, and past-paper sessions are part of the secondary program.',
            },
            {
                q: 'Can working students join evening batches?',
                a: 'Yes. Flexible evening batches are available for students who need after-school or after-college timings.',
            },
        ],
        overview: `
            <p>Secondary Classes (9th–12th) at The Village Academia are designed for serious board and entrance-test preparation. Students receive complete syllabus coverage along with continuous written practice so they walk into exams with strategy — not stress.</p>
            <p>We run specialized streams for Pre-Medical and Pre-Engineering. Medical aspirants receive stronger Biology focus with MDCAT-style drilling, while Engineering aspirants intensify Mathematics and Physics for ECAT readiness.</p>
            <p>Teaching is practical and performance-driven: concept explanation, example problems, timed quizzes, past papers, and feedback loops. Teachers highlight frequent board mistakes, high-scoring answer formats, and time planning for long papers and MCQs.</p>
            <h3>Who Succeeds in This Program</h3>
            <p>Students who attend regularly, attempt weekly assessments, and follow revision plans usually see clear improvement within a few months — especially in weak numerical and writing-heavy subjects.</p>
        `,
    },
];

export const professionalCourses = [
    {
        id: 'spoken-english',
        slug: 'spoken-english',
        category: 'professional',
        title: 'Spoken English Course',
        image: spokenEnglishImg,
        description: 'Improve your English communication skills with confidence. Focus on pronunciation, grammar, conversation, and presentation skills for professional growth.',
        duration: '2 Months',
        schedule: '4–5 sessions / week',
        classSize: '10–14 learners',
        price: 'Rs. 15,00/Course',
        level: 'Beginner – Intermediate',
        language: 'English (instruction + practice)',
        whoFor: [
            'Students and job seekers who hesitate while speaking',
            'Professionals who need better workplace communication',
            'Anyone preparing for interviews or presentations',
        ],
        highlights: [
            { label: 'Duration', value: '3 Months' },
            { label: 'Practice', value: 'Speaking Daily' },
            { label: 'Focus', value: 'Fluency' },
            { label: 'Fee', value: 'Rs. 8,000' },
        ],
        features: [
            'Daily guided speaking practice in real scenarios',
            'Pronunciation, stress, and fluency drills',
            'Practical grammar for conversation (not only rules)',
            'Presentation, interview, and email speaking situations',
            'Vocabulary for study, workplace, and social settings',
            'Constructive feedback on confidence and clarity',
        ],
        outcomes: [
            'Speak English more confidently in daily conversations',
            'Reduce hesitation, filler words, and pronunciation errors',
            'Present ideas clearly in class or workplace settings',
            'Handle interviews and introductions with better fluency',
        ],
        modules: [
            {
                title: 'Fluency & Pronunciation',
                detail: 'Sounds, stress patterns, rhythm, and spoken drills that help you sound clearer and more natural.',
            },
            {
                title: 'Conversation Skills',
                detail: 'Role-play for greetings, discussions, telephone talk, meetings, and everyday problem-solving dialogues.',
            },
            {
                title: 'Practical Grammar for Speaking',
                detail: 'Tenses, question forms, connectors, and sentence building focused on real communication needs.',
            },
            {
                title: 'Interview & Presentation Soft Skills',
                detail: 'Self-introduction, body language awareness, structured answering, and short presentation practice.',
            },
        ],
        methodology: [
            'Listen → Practice → Speak → Feedback cycle',
            'Pair work and group discussion every week',
            'Voice and confidence coaching in a supportive class',
            'Progress tracked through speaking check-ins',
        ],
        requirements: [
            'Basic alphabet and reading ability in English',
            'Notebook for vocabulary and conversation notes',
            'Willingness to speak in class (practice is essential)',
        ],
        faqs: [
            {
                q: 'I understand English but cannot speak fluently. Is this right for me?',
                a: 'Yes. This course is designed especially for learners who know basic English but need confidence and speaking practice.',
            },
            {
                q: 'Do you teach grammar?',
                a: 'Yes, but grammar is taught for communication — focusing on structures you actually need while speaking.',
            },
            {
                q: 'Will there be presentations?',
                a: 'Yes. Short presentations and interview-style speaking tasks are included in later modules.',
            },
        ],
        overview: `
            <p>The Spoken English Course helps you move from silent understanding to confident conversation. Many learners know English vocabulary and grammar, yet freeze when speaking. This program solves that gap with structured practice.</p>
            <p>Classes focus on clarity, fluency, and practical usage. You will practice daily conversations, correct pronunciation, learn useful sentence patterns, and receive friendly feedback that builds confidence instead of fear.</p>
            <p>By the end of the course, students are better prepared for interviews, classroom participation, customer communication, and professional introductions. Progress comes from speaking often — so every session is interactive.</p>
            <h3>Learning Style</h3>
            <p>No long lectures. The emphasis is practice: dialogues, discussion topics, listening models, and personalized correction so improvement is visible week by week.</p>
        `,
    },
    {
        id: 'computer-courses',
        slug: 'computer-courses',
        category: 'professional',
        title: 'Computer Courses',
        image: computerImg,
        description: 'Complete computer literacy program covering MS Office (Word, Excel, PowerPoint), internet basics, email, and essential computer skills for today\'s digital world.',
        duration: '2 Months',
        schedule: '3 sessions / week',
        classSize: '8–12 learners',
        price: 'Rs. 6,00/Course',
        level: 'Beginner',
        language: 'Urdu & English',
        whoFor: [
            'Complete beginners with little computer experience',
            'Students needing Office tools for school/college work',
            'Job seekers preparing for basic office computer tasks',
        ],
        highlights: [
            { label: 'Level', value: 'Beginner' },
            { label: 'Tools', value: 'MS Office' },
            { label: 'Duration', value: '2 Months' },
            { label: 'Fee', value: 'Rs. 6,000' },
        ],
        features: [
            'Computer fundamentals and file management from zero',
            'Hands-on Microsoft Word, Excel, and PowerPoint practice',
            'Email creation, internet browsing, and online safety',
            'Assignment-based learning with step-by-step guidance',
            'Practical tasks similar to office and academic work',
            'Instructor support for first-time computer users',
        ],
        outcomes: [
            'Operate a computer confidently for study and work',
            'Create professional documents, sheets, and presentations',
            'Use email and internet tools safely and efficiently',
            'Complete basic digital tasks without dependency',
        ],
        modules: [
            {
                title: 'Computer Fundamentals',
                detail: 'Hardware basics, Windows navigation, folders, copying files, shortcuts, and everyday troubleshooting tips.',
            },
            {
                title: 'Microsoft Word',
                detail: 'Create letters, assignments, and reports with formatting, tables, images, and clean document layouts.',
            },
            {
                title: 'Microsoft Excel Basics',
                detail: 'Enter data, use basic formulas, apply formatting, and create simple charts for school or office use.',
            },
            {
                title: 'PowerPoint & Internet Skills',
                detail: 'Build slide presentations, present clearly, use email, browse safely, and manage downloads responsibly.',
            },
        ],
        methodology: [
            'Demo on projector/screen followed by student practice',
            'Task-based exercises each class',
            'Slow paced for absolute beginners',
            'Final practical assignment for skill confirmation',
        ],
        requirements: [
            'No prior computer experience needed',
            'Notebook for steps and shortcuts',
            'USB (optional) for saving practice files',
        ],
        faqs: [
            {
                q: 'I have never used a computer. Can I join?',
                a: 'Absolutely. This course starts from the basics and is designed for first-time learners.',
            },
            {
                q: 'Will I learn MS Office?',
                a: 'Yes. Word, Excel, and PowerPoint are core parts of the syllabus with practical exercises.',
            },
            {
                q: 'Do I need my own laptop?',
                a: 'A personal laptop helps for practice at home, but lab/class systems can be used during sessions where available.',
            },
        ],
        overview: `
            <p>Digital skills are now essential for school, college, and jobs. Our Computer Courses program gives beginners a practical foundation so they can use a computer confidently without fear or confusion.</p>
            <p>You will learn how computers work, how to manage files, and how to create useful documents in Microsoft Office. Each lesson includes guided practice so concepts become muscle memory — not just notes.</p>
            <p>By completing this course, learners can write assignments in Word, manage simple data in Excel, prepare presentations in PowerPoint, and communicate through email. These are the exact skills demanded in most entry-level roles and academic environments.</p>
            <h3>Beginner Friendly Promise</h3>
            <p>We intentionally keep pace friendly. Teachers repeat steps, check each learner’s screen progress, and ensure nobody is left behind.</p>
        `,
    },
    {
        id: 'web-development',
        slug: 'web-development',
        category: 'professional',
        title: 'Web Development',
        image: webDevImg,
        description: 'Learn to build modern websites with HTML, CSS, JavaScript, and popular frameworks. Perfect for students interested in programming and web technologies.',
        duration: '6 Months',
        schedule: '3–4 sessions / week',
        classSize: '8–12 learners',
        price: 'Rs. 15,00/Course',
        level: 'Beginner – Intermediate',
        language: 'English & Urdu support',
        whoFor: [
            'Students interested in programming and tech careers',
            'Beginners who want to build real websites',
            'Freelancers starting with front-end development',
        ],
        highlights: [
            { label: 'Duration', value: '6 Months' },
            { label: 'Stack', value: 'HTML/CSS/JS' },
            { label: 'Projects', value: 'Portfolio Ready' },
            { label: 'Fee', value: 'Rs. 15,000' },
        ],
        features: [
            'HTML, CSS, and responsive layout from scratch',
            'JavaScript fundamentals with hands-on coding',
            'Real projects to build a starter portfolio',
            'Introduction to modern front-end workflows',
            'Code reviews and debugging practice',
            'Career guidance for junior web roles/freelance start',
        ],
        outcomes: [
            'Build complete multi-page responsive websites',
            'Understand front-end structure, styling, and interactivity',
            'Create portfolio projects to showcase skills',
            'Gain confidence to continue into frameworks and advanced topics',
        ],
        modules: [
            {
                title: 'HTML & Semantic Structure',
                detail: 'Page structure, forms, media, accessibility basics, and clean markup practices used in professional websites.',
            },
            {
                title: 'CSS & Responsive Design',
                detail: 'Flexbox, Grid, typography, colors, animations basics, and mobile-first layouts that look good on all screens.',
            },
            {
                title: 'JavaScript Essentials',
                detail: 'Variables, functions, conditions, loops, DOM updates, events, and interactive UI behavior.',
            },
            {
                title: 'Projects & Portfolio',
                detail: 'Landing pages, business sites, and interactive components compiled into a personal project portfolio.',
            },
        ],
        methodology: [
            'Code-along classes with immediate practice',
            'Mini assignments after each module',
            'Project checkpoints with instructor review',
            'Debugging sessions to build real problem-solving skills',
        ],
        requirements: [
            'Basic computer operation skills',
            'Laptop recommended for best learning',
            'Interest in logical thinking and practice outside class',
        ],
        faqs: [
            {
                q: 'Do I need prior programming experience?',
                a: 'No. We start from beginner level and gradually move to intermediate front-end skills.',
            },
            {
                q: 'Will I build real projects?',
                a: 'Yes. Multiple practical projects are included so you finish with portfolio-ready work.',
            },
            {
                q: 'Is this enough for a job?',
                a: 'This course builds a strong foundation. Many learners continue to frameworks and advanced practice for employment readiness.',
            },
        ],
        overview: `
            <p>Web Development is one of the most practical digital careers today. This course takes you from zero to building complete front-end websites using HTML, CSS, and JavaScript — the core language of the web.</p>
            <p>You will not only memorize tags and properties. You will design layouts, style responsive pages, add interactivity, and ship mini projects that prove your skills. Every module ends with practice tasks that prepare you for real freelance or internship work.</p>
            <p>Teachers guide you through common beginner mistakes, clean coding habits, and debugging methods. By graduation, you understand how a modern website is structured and how to continue learning frameworks confidently.</p>
            <h3>Career Direction</h3>
            <p>Graduates can pursue junior front-end learning paths, freelance landing-page work, or further study in React and full-stack development.</p>
        `,
    },
    {
        id: 'advanced-ms-office',
        slug: 'advanced-ms-office',
        category: 'professional',
        title: 'Advanced MS Office',
        image: msOfficeImg,
        description: 'Master Microsoft Office suite with advanced features of Word, Excel, PowerPoint, and Outlook. Essential for office work and professional documentation.',
        duration: '1.5 Months',
        schedule: '3 sessions / week',
        classSize: '8–12 learners',
        price: 'Rs. 5,00/Course',
        level: 'Intermediate',
        language: 'English & Urdu',
        whoFor: [
            'Learners who already know Office basics',
            'Office staff preparing advanced reports and sheets',
            'Students who want faster, professional document workflows',
        ],
        highlights: [
            { label: 'Duration', value: '1.5 Months' },
            { label: 'Focus', value: 'Excel + Word' },
            { label: 'Level', value: 'Intermediate' },
            { label: 'Fee', value: 'Rs. 5,000' },
        ],
        features: [
            'Advanced Excel formulas, charts, and data tools',
            'Professional Word formatting for long documents',
            'PowerPoint design techniques for impactful slides',
            'Outlook tips for email and calendar productivity',
            'Office workflow shortcuts used in real workplaces',
            'Practical assignments based on office scenarios',
        ],
        outcomes: [
            'Create polished reports and business documents faster',
            'Analyze and present data with confidence in Excel',
            'Design stronger presentations for meetings/classes',
            'Work more productively with Outlook and Office tools',
        ],
        modules: [
            {
                title: 'Advanced Excel',
                detail: 'Lookup formulas, logical functions, pivot tables, charts, conditional formatting, and clean data handling.',
            },
            {
                title: 'Professional Word Documents',
                detail: 'Styles, sections, table of contents, mail merge, headers/footers, and long-document management.',
            },
            {
                title: 'PowerPoint Storytelling',
                detail: 'Slide hierarchy, visual layouts, charts, transitions used tastefully, and presentation delivery structure.',
            },
            {
                title: 'Outlook Productivity',
                detail: 'Email organization, calendar planning, meeting invites, and communication etiquette for offices.',
            },
        ],
        methodology: [
            'Workplace scenario practice in every module',
            'Template-based assignments for real tasks',
            'Shortcut training for speed',
            'Final practical project across Word/Excel/PowerPoint',
        ],
        requirements: [
            'Basic familiarity with Word/Excel/PowerPoint',
            'Laptop preferred for continuous practice',
            'Microsoft Office installed (or campus access)',
        ],
        faqs: [
            {
                q: 'Is this for absolute beginners?',
                a: 'No. This course assumes basic Office knowledge. Absolute beginners should start with Computer Courses first.',
            },
            {
                q: 'How advanced is the Excel part?',
                a: 'You will cover formulas, charts, and pivot-table workflows commonly used in offices and academic reports.',
            },
            {
                q: 'Will I get practical files?',
                a: 'Yes. Practice sheets and templates are used during class assignments.',
            },
        ],
        overview: `
            <p>Advanced MS Office is built for learners who already know the basics and want professional-level speed and quality. In modern workplaces, the difference is not only knowing Word or Excel — it is using them efficiently.</p>
            <p>This course elevates your skills in formatting complex documents, analyzing data, designing polished decks, and managing communication with Outlook. Every lesson maps to real office tasks: reports, trackers, presentations, and email workflows.</p>
            <p>By the end, you should feel faster and more confident handling day-to-day computer work required in admin, sales support, education, and business roles.</p>
        `,
    },
    {
        id: 'graphic-design-basics',
        slug: 'graphic-design-basics',
        category: 'professional',
        title: 'Graphic Design Basics',
        image: graphicDesignImg,
        description: 'Introduction to graphic design using Adobe Photoshop and Canva. Learn to create posters, social media graphics, and basic design principles.',
        duration: '2 Months',
        schedule: '3 sessions / week',
        classSize: '8–12 learners',
        price: 'Rs. 10,00/Course',
        level: 'Beginner',
        language: 'Urdu & English',
        whoFor: [
            'Beginners exploring design as a skill or career',
            'Social media managers needing better creatives',
            'Students who want to design posters and thumbnails',
        ],
        highlights: [
            { label: 'Tools', value: 'Photoshop + Canva' },
            { label: 'Duration', value: '2 Months' },
            { label: 'Projects', value: 'Social + Print' },
            { label: 'Fee', value: 'Rs. 10,000' },
        ],
        features: [
            'Core design principles: layout, color, and typography',
            'Adobe Photoshop basics for editing and composition',
            'Canva workflows for fast social media creatives',
            'Hands-on poster, thumbnail, and brand graphic projects',
            'File export standards for web and print use',
            'Creative feedback to improve visual quality',
        ],
        outcomes: [
            'Create clean posters and social media graphics',
            'Apply basic design rules with better visual balance',
            'Use Photoshop and Canva for practical creative work',
            'Build a starter design portfolio for freelance beginnings',
        ],
        modules: [
            {
                title: 'Design Foundations',
                detail: 'Color theory, typography pairing, visual hierarchy, spacing, and composition rules used by professional designers.',
            },
            {
                title: 'Adobe Photoshop Basics',
                detail: 'Layers, selection tools, retouching basics, text effects, and poster composition techniques.',
            },
            {
                title: 'Canva for Fast Creatives',
                detail: 'Template customization, brand kits, social sizes, and rapid content production for Instagram/Facebook posts.',
            },
            {
                title: 'Project Studio',
                detail: 'Create flyers, event posters, YouTube thumbnails, and profile creatives with instructor critique.',
            },
        ],
        methodology: [
            'Principle lesson + tool demo + design task',
            'Critique sessions for visual improvement',
            'Project briefs similar to real client requests',
            'Export and presentation of final design set',
        ],
        requirements: [
            'Basic computer skills',
            'Laptop recommended (Photoshop practice)',
            'Interest in visual creativity and regular practice',
        ],
        faqs: [
            {
                q: 'Do I need drawing skills?',
                a: 'No. This course focuses on digital design tools and principles, not freehand illustration.',
            },
            {
                q: 'Is Canva enough, or do we also learn Photoshop?',
                a: 'You learn both. Canva for speed and Photoshop for deeper editing control.',
            },
            {
                q: 'Can I freelance after this?',
                a: 'You can start beginner freelance tasks (posts, posters, thumbnails) while continuing to practice and improve your portfolio.',
            },
        ],
        overview: `
            <p>Graphic Design Basics introduces the visual language used in branding, social media, and promotional materials. You will learn how good design works — then apply those rules using Adobe Photoshop and Canva.</p>
            <p>The course balances creativity with practical skills. Students create posters, social posts, and thumbnails while receiving feedback on color, layout, and readability. This helps you avoid beginner design mistakes and produce work that looks intentional.</p>
            <p>Whether you want a creative career start or better content for business/social media, this program gives you usable design skills quickly.</p>
        `,
    },
    {
        id: 'digital-marketing',
        slug: 'digital-marketing',
        category: 'professional',
        title: 'Digital Marketing',
        image: digitalMarketingImg,
        description: 'Learn social media marketing, content creation, and online business promotion. Perfect for entrepreneurs and students interested in digital careers.',
        duration: '3 Months',
        schedule: '3 sessions / week',
        classSize: '10–14 learners',
        price: 'Rs. 12,00/Course',
        level: 'Beginner – Intermediate',
        language: 'Urdu & English',
        whoFor: [
            'Students exploring digital marketing careers',
            'Small business owners promoting products online',
            'Content creators who want structured marketing skills',
        ],
        highlights: [
            { label: 'Duration', value: '3 Months' },
            { label: 'Focus', value: 'Social + Content' },
            { label: 'Practice', value: 'Campaign Planning' },
            { label: 'Fee', value: 'Rs. 12,000' },
        ],
        features: [
            'Social media strategy for major platforms',
            'Content planning, captions, and posting systems',
            'Introduction to paid ads and audience targeting',
            'Basic analytics to measure what works',
            'Brand promotion techniques for local businesses',
            'Campaign project with practical feedback',
        ],
        outcomes: [
            'Plan and manage basic social media campaigns',
            'Create more consistent and engaging content calendars',
            'Understand ads, targeting, and campaign objectives',
            'Read simple performance metrics and improve results',
        ],
        modules: [
            {
                title: 'Digital Marketing Foundations',
                detail: 'Customer journey, marketing funnels basics, brand positioning, and choosing the right platform for your audience.',
            },
            {
                title: 'Content & Social Strategy',
                detail: 'Content pillars, posting frequency, caption writing, creatives planning, and community engagement practices.',
            },
            {
                title: 'Ads & Promotion Basics',
                detail: 'Campaign objectives, audience targeting intro, budget thinking, and ad creative best practices for beginners.',
            },
            {
                title: 'Analytics & Optimization',
                detail: 'Track reach, engagement, and conversions at a basic level, then adjust content based on results.',
            },
        ],
        methodology: [
            'Concept classes with local business examples',
            'Weekly content/campaign assignments',
            'Peer review of posting strategies',
            'Final mini-campaign presentation',
        ],
        requirements: [
            'Smartphone or computer with internet',
            'Active social media accounts for practice',
            'Interest in content and online business growth',
        ],
        faqs: [
            {
                q: 'Do I need a business to join?',
                a: 'No. Students can practice with sample brands or personal projects while learning core marketing skills.',
            },
            {
                q: 'Will you teach Facebook/Instagram ads?',
                a: 'Yes. The course includes a practical introduction to paid ads and audience targeting for beginners.',
            },
            {
                q: 'Is coding required?',
                a: 'No coding is required. This is a marketing and content strategy course.',
            },
        ],
        overview: `
            <p>Digital Marketing teaches you how brands attract, engage, and convert audiences online. From social media strategy to content planning and basic ads, this course gives a complete beginner-to-intermediate foundation.</p>
            <p>You will learn how to think like a marketer: who is the audience, what message works, where to post, and how to measure results. Classes include practical planning exercises so knowledge turns into campaign skills.</p>
            <p>Entrepreneurs can immediately apply lessons to local business promotion, while career seekers build a strong base for social media management and digital marketing roles.</p>
            <h3>Practical Outcome</h3>
            <p>By the end, you should be able to build a simple content calendar, define campaign goals, and explain why certain posts or ads perform better than others.</p>
        `,
    },
];

export const allCourses = [...tuitionClasses, ...professionalCourses];

export const getCourseBySlug = (slug) => allCourses.find((course) => course.slug === slug);

export const getRelatedCourses = (course, limit = 3) =>
    allCourses
        .filter((item) => item.category === course.category && item.slug !== course.slug)
        .slice(0, limit);
