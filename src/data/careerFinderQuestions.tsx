// src/data/careerFinderQuestions.tsx

export interface CareerFinderQuestion {
    id: number;
    title: string;
    options: string[];
  }
  
  export interface CareerFinderFieldsQuestion {
    id: string;
    title: string;
    fields: CareerFinderField[];
  }
  
  export type CareerFinderField = {
    type: string;
    name: string;
    label: string;
    placeholder?: string;
    options?: string[];
  };
  
  // User info fields for both English and Arabic
  export const careerFinderFieldsQuestions: CareerFinderFieldsQuestion[] = [
    {
      id: 'info',
      title: 'Tell us about your interests and skills',
      fields: [
        {
          type: 'select',
          name: 'currentField',
          label: 'What is your current field or industry?',
          options: [
            'Technology',
            'Healthcare',
            'Education',
            'Finance',
            'Manufacturing',
            'Retail',
            'Creative Arts',
            'Legal',
            'Government',
            'Hospitality',
            'Construction',
            'Other'
          ]
        },
        {
          type: 'select',
          name: 'educationLevel',
          label: 'What is your highest level of education?',
          options: [
            'High School / Secondary',
            'Associate Degree / Diploma',
            'Bachelor\'s Degree',
            'Master\'s Degree',
            'PhD / Doctorate',
            'Vocational Training',
            'Self-taught'
          ]
        },
        {
          type: 'select',
          name: 'adaptability',
          label: 'How comfortable are you with learning new technologies?',
          options: [
            'Very comfortable',
            'Somewhat comfortable',
            'Neutral',
            'Somewhat uncomfortable',
            'Very uncomfortable'
          ]
        }
      ]
    },
  ];
  
  export const arCareerFinderFieldsQuestions: CareerFinderFieldsQuestion[] = [
    {
      id: 'info',
      title: 'أخبرنا عن اهتماماتك ومهاراتك',
      fields: [
        {
          type: 'select',
          name: 'currentField',
          label: 'ما هو مجالك أو صناعتك الحالية؟',
          options: [
            'التكنولوجيا',
            'الرعاية الصحية',
            'التعليم',
            'المالية',
            'التصنيع',
            'تجارة التجزئة',
            'الفنون الإبداعية',
            'القانونية',
            'الحكومية',
            'الضيافة',
            'البناء',
            'أخرى'
          ]
        },
        {
          type: 'select',
          name: 'educationLevel',
          label: 'ما هو أعلى مستوى تعليمي لديك؟',
          options: [
            'المدرسة الثانوية',
            'درجة الزمالة / الدبلوم',
            'درجة البكالوريوس',
            'درجة الماجستير',
            'الدكتوراه',
            'التدريب المهني',
            'التعليم الذاتي'
          ]
        },
        {
          type: 'select',
          name: 'adaptability',
          label: 'ما مدى راحتك في تعلم تقنيات جديدة؟',
          options: [
            'مرتاح جدًا',
            'مرتاح نوعًا ما',
            'محايد',
            'غير مرتاح نوعًا ما',
            'غير مرتاح جدًا'
          ]
        }
      ]
    },
  ];
  
  // Career finder questions for English
  export const careerFinderQuestions: CareerFinderQuestion[] = [
    {
      id: 1,
      title: 'Which type of work environment do you prefer?',
      options: [
        'Working independently with minimal supervision',
        'Collaborating closely with a team',
        'A mix of independent and collaborative work',
        'Leading others and making strategic decisions'
      ]
    },
    {
      id: 2,
      title: 'What skills or activities do you enjoy the most?',
      options: [
        'Analyzing data and solving complex problems',
        'Creating and designing things',
        'Helping and teaching others',
        'Organizing and managing projects or systems'
      ]
    },
    {
      id: 3,
      title: 'How important is work-life balance to you?',
      options: [
        'Very important - I prefer strict work hours',
        'Important - I need some flexibility',
        'Somewhat important - I can work extra when needed',
        'Less important - I\'m willing to work long hours for the right role'
      ]
    },
    {
      id: 4,
      title: 'What type of tasks energize you?',
      options: [
        'Tasks requiring creativity and innovation',
        'Tasks requiring precision and attention to detail',
        'Tasks involving communication and people skills',
        'Tasks involving strategic thinking and planning'
      ]
    },
    {
      id: 5,
      title: 'How do you approach learning new skills?',
      options: [
        'I enjoy learning deeply about specific subjects',
        'I prefer acquiring a broad range of knowledge',
        'I learn best through practical, hands-on experience',
        'I enjoy structured learning with clear objectives'
      ]
    },
    {
      id: 6,
      title: 'What is your comfort level with technology?',
      options: [
        'Very comfortable - I enjoy working with cutting-edge tech',
        'Comfortable - I adapt well to new technologies',
        'Somewhat comfortable - I use technology but don\'t specialize in it',
        'Less comfortable - I prefer minimal technology requirements'
      ]
    },
    {
      id: 7,
      title: 'How do you feel about public speaking or presentations?',
      options: [
        'I enjoy it and feel confident presenting to others',
        'I\'m comfortable with it when necessary',
        'I can do it but prefer other types of communication',
        'I prefer to avoid public speaking when possible'
      ]
    },
    {
      id: 8,
      title: 'How important is having a social impact through your work?',
      options: [
        'Very important - I want to directly help people',
        'Important - I want my work to contribute positively to society',
        'Somewhat important - It\'s a nice bonus but not essential',
        'Less important - Other factors matter more to me'
      ]
    },
    {
      id: 9,
      title: 'How do you feel about working with numbers and data?',
      options: [
        'I love working with numbers and analyzing data',
        'I\'m comfortable with data but don\'t need to focus on it',
        'I can work with basic data but prefer other tasks',
        'I prefer to minimize working with numbers and data'
      ]
    },
    {
      id: 10,
      title: 'What salary expectations do you have for your future career?',
      options: [
        'High income potential is a top priority',
        'Above-average income is important to me',
        'Moderate income is acceptable if the work is fulfilling',
        'Income is less important than other job factors'
      ]
    }
  ];
  
  // Career finder questions for Arabic
  export const arCareerFinderQuestions: CareerFinderQuestion[] = [
    {
      id: 1,
      title: 'ما نوع بيئة العمل التي تفضلها؟',
      options: [
        'العمل بشكل مستقل مع إشراف محدود',
        'التعاون بشكل وثيق مع فريق',
        'مزيج من العمل المستقل والتعاوني',
        'قيادة الآخرين واتخاذ القرارات الاستراتيجية'
      ]
    },
    {
      id: 2,
      title: 'ما هي المهارات أو الأنشطة التي تستمتع بها أكثر؟',
      options: [
        'تحليل البيانات وحل المشكلات المعقدة',
        'إنشاء وتصميم الأشياء',
        'مساعدة وتعليم الآخرين',
        'تنظيم وإدارة المشاريع أو الأنظمة'
      ]
    },
    {
      id: 3,
      title: 'ما مدى أهمية التوازن بين العمل والحياة بالنسبة لك؟',
      options: [
        'مهم جدًا - أفضل ساعات العمل المحددة',
        'مهم - أحتاج إلى بعض المرونة',
        'مهم إلى حد ما - يمكنني العمل لساعات إضافية عند الحاجة',
        'أقل أهمية - أنا على استعداد للعمل لساعات طويلة للوظيفة المناسبة'
      ]
    },
    {
      id: 4,
      title: 'ما نوع المهام التي تمنحك الطاقة؟',
      options: [
        'المهام التي تتطلب الإبداع والابتكار',
        'المهام التي تتطلب الدقة والاهتمام بالتفاصيل',
        'المهام التي تتضمن مهارات التواصل والتعامل مع الناس',
        'المهام التي تتضمن التفكير الاستراتيجي والتخطيط'
      ]
    },
    {
      id: 5,
      title: 'كيف تقارب تعلم مهارات جديدة؟',
      options: [
        'أستمتع بالتعلم العميق عن مواضيع محددة',
        'أفضل اكتساب مجموعة واسعة من المعرفة',
        'أتعلم بشكل أفضل من خلال الخبرة العملية',
        'أستمتع بالتعلم المنظم مع أهداف واضحة'
      ]
    },
    {
      id: 6,
      title: 'ما هو مستوى راحتك مع التكنولوجيا؟',
      options: [
        'مرتاح جدًا - أستمتع بالعمل مع التقنيات المتطورة',
        'مرتاح - أتكيف جيدًا مع التقنيات الجديدة',
        'مرتاح إلى حد ما - أستخدم التكنولوجيا ولكن لا أتخصص فيها',
        'أقل راحة - أفضل متطلبات التكنولوجيا الحد الأدنى'
      ]
    },
    {
      id: 7,
      title: 'كيف تشعر حيال التحدث أمام الجمهور أو تقديم العروض؟',
      options: [
        'أستمتع بها وأشعر بالثقة عند التقديم للآخرين',
        'أنا مرتاح معها عندما تكون ضرورية',
        'يمكنني القيام بذلك ولكن أفضل أنواع أخرى من التواصل',
        'أفضل تجنب التحدث أمام الجمهور عندما يكون ذلك ممكنًا'
      ]
    },
    {
      id: 8,
      title: 'ما مدى أهمية إحداث تأثير اجتماعي من خلال عملك؟',
      options: [
        'مهم جدًا - أريد مساعدة الناس بشكل مباشر',
        'مهم - أريد أن يساهم عملي إيجابيًا في المجتمع',
        'مهم إلى حد ما - إنها ميزة جيدة ولكنها ليست ضرورية',
        'أقل أهمية - عوامل أخرى أكثر أهمية بالنسبة لي'
      ]
    },
    {
      id: 9,
      title: 'كيف تشعر حيال العمل مع الأرقام والبيانات؟',
      options: [
        'أحب العمل مع الأرقام وتحليل البيانات',
        'أنا مرتاح مع البيانات ولكن لا أحتاج إلى التركيز عليها',
        'يمكنني العمل مع البيانات الأساسية ولكن أفضل المهام الأخرى',
        'أفضل تقليل العمل مع الأرقام والبيانات'
      ]
    },
    {
      id: 10,
      title: 'ما هي توقعات الراتب لديك لمهنتك المستقبلية؟',
      options: [
        'إمكانية الدخل المرتفع هي أولوية قصوى',
        'الدخل فوق المتوسط مهم بالنسبة لي',
        'الدخل المعتدل مقبول إذا كان العمل مُرضيًا',
        'الدخل أقل أهمية من عوامل الوظيفة الأخرى'
      ]
    }
  ];
  
  // Career matches data with recommendations
  export interface CareerMatch {
    id: string;
    title: string;
    description: string;
    aiResistance: 'high' | 'medium' | 'low'; // How resistant to AI automation
    growthPotential: 'high' | 'medium' | 'low'; // Growth potential in next decade
    eduRequirement: string; // Education or skills required
    salaryRange: string; // Approximate salary range
    keySkills: string[]; // Key skills needed
  }
  
  // Sample career matches
  export const careerMatches: CareerMatch[] = [
    // Technology-oriented careers
    {
      id: "ai-ethics-specialist",
      title: "AI Ethics Specialist",
      description: "Develop and implement ethical frameworks for AI systems, ensuring they align with human values and operate in a fair, transparent manner.",
      aiResistance: "high",
      growthPotential: "high",
      eduRequirement: "Background in ethics, philosophy, or computer science with AI specialization",
      salaryRange: "$90,000 - $150,000",
      keySkills: ["Ethical reasoning", "AI systems understanding", "Policy development", "Critical thinking"]
    },
    {
      id: "human-ai-collaboration-designer",
      title: "Human-AI Collaboration Designer",
      description: "Create workflows and interfaces that optimize collaboration between humans and AI systems, enhancing productivity while maintaining human agency.",
      aiResistance: "high",
      growthPotential: "high",
      eduRequirement: "UX/UI design with AI understanding or computer science with human factors",
      salaryRange: "$85,000 - $140,000",
      keySkills: ["UX design", "AI capabilities understanding", "Human factors", "Workflow optimization"]
    },
    {
      id: "ai-trainer",
      title: "AI Trainer/Data Specialist",
      description: "Curate high-quality data sets and train AI models to perform specific tasks, ensuring proper model behavior and output quality.",
      aiResistance: "medium",
      growthPotential: "high",
      eduRequirement: "Background in data science or machine learning",
      salaryRange: "$75,000 - $130,000",
      keySkills: ["Data curation", "Model training", "Quality assessment", "Domain expertise"]
    },
    
    // Healthcare-oriented careers
    {
      id: "healthcare-tech-integrator",
      title: "Healthcare Technology Integrator",
      description: "Bridge the gap between healthcare providers and AI tools, implementing and customizing AI solutions for clinical settings.",
      aiResistance: "high",
      growthPotential: "high",
      eduRequirement: "Healthcare background with technology expertise or vice versa",
      salaryRange: "$80,000 - $140,000",
      keySkills: ["Healthcare knowledge", "Technical integration", "Change management", "Clinical workflow understanding"]
    },
    {
      id: "patient-care-coordinator",
      title: "Advanced Patient Care Coordinator",
      description: "Manage complex patient care journeys using AI tools while providing the essential human touch and personalized attention.",
      aiResistance: "high",
      growthPotential: "medium",
      eduRequirement: "Nursing or healthcare administration background",
      salaryRange: "$65,000 - $95,000",
      keySkills: ["Empathy", "Healthcare knowledge", "Care coordination", "Tech-comfort"]
    },
    
    // Creative careers
    {
      id: "creative-director-aiassisted",
      title: "AI-Assisted Creative Director",
      description: "Direct creative projects using AI tools to enhance and scale creative output while maintaining human creative vision and judgment.",
      aiResistance: "high",
      growthPotential: "medium",
      eduRequirement: "Background in design, art direction or creative fields",
      salaryRange: "$85,000 - $150,000+",
      keySkills: ["Creative vision", "AI tool proficiency", "Project management", "Artistic judgment"]
    },
    {
      id: "extended-reality-designer",
      title: "Extended Reality Experience Designer",
      description: "Create immersive VR/AR experiences that blend AI capabilities with human-centered design principles.",
      aiResistance: "medium",
      growthPotential: "high",
      eduRequirement: "Design or computer science background with XR specialization",
      salaryRange: "$80,000 - $140,000",
      keySkills: ["3D design", "Spatial computing", "Human-centered design", "Programming fundamentals"]
    },
    
    // Business and strategy
    {
      id: "ai-business-strategist",
      title: "AI Implementation Strategist",
      description: "Help businesses identify opportunities for AI integration and develop strategies for effective implementation and workforce transition.",
      aiResistance: "high",
      growthPotential: "high",
      eduRequirement: "Business background with technology understanding or vice versa",
      salaryRange: "$100,000 - $180,000",
      keySkills: ["Strategic thinking", "Business acumen", "Change management", "Technical understanding"]
    },
    {
      id: "human-skills-trainer",
      title: "Human Skills Trainer",
      description: "Teach and develop distinctly human skills like emotional intelligence, creative thinking, and ethical reasoning that complement AI capabilities.",
      aiResistance: "high",
      growthPotential: "medium",
      eduRequirement: "Background in education, psychology, or organizational development",
      salaryRange: "$60,000 - $100,000",
      keySkills: ["Teaching", "Emotional intelligence", "Communication", "Program development"]
    },
    
    // Education and training
    {
      id: "ai-education-specialist",
      title: "AI Education Specialist",
      description: "Develop and deliver educational programs that teach people how to effectively work with and alongside AI systems.",
      aiResistance: "high",
      growthPotential: "high",
      eduRequirement: "Educational background with technology expertise",
      salaryRange: "$70,000 - $120,000",
      keySkills: ["Curriculum development", "AI literacy", "Teaching", "Technical translation"]
    }
  ];
  
  // Arabic translations of career matches
  export const arCareerMatches: CareerMatch[] = [
    // Technology-oriented careers
    {
      id: "ai-ethics-specialist",
      title: "أخصائي أخلاقيات الذكاء الاصطناعي",
      description: "تطوير وتنفيذ أطر أخلاقية لأنظمة الذكاء الاصطناعي، مما يضمن توافقها مع القيم الإنسانية وعملها بطريقة عادلة وشفافة.",
      aiResistance: "high",
      growthPotential: "high",
      eduRequirement: "خلفية في الأخلاق أو الفلسفة أو علوم الكمبيوتر مع تخصص في الذكاء الاصطناعي",
      salaryRange: "$90,000 - $150,000",
      keySkills: ["التفكير الأخلاقي", "فهم أنظمة الذكاء الاصطناعي", "تطوير السياسات", "التفكير النقدي"]
    },
    {
      id: "human-ai-collaboration-designer",
      title: "مصمم تعاون الإنسان والذكاء الاصطناعي",
      description: "إنشاء سير العمل والواجهات التي تحسن التعاون بين البشر وأنظمة الذكاء الاصطناعي، وتعزز الإنتاجية مع الحفاظ على الوكالة البشرية.",
      aiResistance: "high",
      growthPotential: "high",
      eduRequirement: "تصميم UX/UI مع فهم الذكاء الاصطناعي أو علوم الكمبيوتر مع العوامل البشرية",
      salaryRange: "$85,000 - $140,000",
      keySkills: ["تصميم تجربة المستخدم", "فهم قدرات الذكاء الاصطناعي", "العوامل البشرية", "تحسين سير العمل"]
    },
    {
      id: "ai-trainer",
      title: "مدرب الذكاء الاصطناعي/أخصائي البيانات",
      description: "تنظيم مجموعات بيانات عالية الجودة وتدريب نماذج الذكاء الاصطناعي لأداء مهام محددة، مما يضمن السلوك المناسب للنموذج وجودة المخرجات.",
      aiResistance: "medium",
      growthPotential: "high",
      eduRequirement: "خلفية في علوم البيانات أو التعلم الآلي",
      salaryRange: "$75,000 - $130,000",
      keySkills: ["تنظيم البيانات", "تدريب النموذج", "تقييم الجودة", "خبرة المجال"]
    },
    
    // Healthcare-oriented careers
    {
      id: "healthcare-tech-integrator",
      title: "مسؤول دمج التكنولوجيا الصحية",
      description: "سد الفجوة بين مقدمي الرعاية الصحية وأدوات الذكاء الاصطناعي، وتنفيذ وتخصيص حلول الذكاء الاصطناعي للإعدادات السريرية.",
      aiResistance: "high",
      growthPotential: "high",
      eduRequirement: "خلفية في مجال الرعاية الصحية مع خبرة تكنولوجية أو العكس",
      salaryRange: "$80,000 - $140,000",
      keySkills: ["معرفة الرعاية الصحية", "التكامل التقني", "إدارة التغيير", "فهم سير العمل السريري"]
    },
    {
      id: "patient-care-coordinator",
      title: "منسق رعاية المرضى المتقدم",
      description: "إدارة رحلات رعاية المرضى المعقدة باستخدام أدوات الذكاء الاصطناعي مع توفير اللمسة الإنسانية الأساسية والاهتمام الشخصي.",
      aiResistance: "high",
      growthPotential: "medium",
      eduRequirement: "خلفية في التمريض أو إدارة الرعاية الصحية",
      salaryRange: "$65,000 - $95,000",
      keySkills: ["التعاطف", "معرفة الرعاية الصحية", "تنسيق الرعاية", "الراحة التكنولوجية"]
    },
    
    // Creative careers
    {
      id: "creative-director-aiassisted",
      title: "مدير إبداعي بمساعدة الذكاء الاصطناعي",
      description: "توجيه المشاريع الإبداعية باستخدام أدوات الذكاء الاصطناعي لتعزيز وتوسيع نطاق المخرجات الإبداعية مع الحفاظ على الرؤية الإبداعية البشرية والحكم.",
      aiResistance: "high",
      growthPotential: "medium",
      eduRequirement: "خلفية في التصميم أو الإخراج الفني أو المجالات الإبداعية",
      salaryRange: "$85,000 - $150,000+",
      keySkills: ["الرؤية الإبداعية", "إتقان أدوات الذكاء الاصطناعي", "إدارة المشاريع", "الحكم الفني"]
    },
    {
      id: "extended-reality-designer",
      title: "مصمم تجارب الواقع الممتد",
      description: "إنشاء تجارب غامرة للواقع الافتراضي/المعزز تجمع بين قدرات الذكاء الاصطناعي ومبادئ التصميم المتمحور حول الإنسان.",
      aiResistance: "medium",
      growthPotential: "high",
      eduRequirement: "خلفية في التصميم أو علوم الكمبيوتر مع تخصص في الواقع الممتد",
      salaryRange: "$80,000 - $140,000",
      keySkills: ["تصميم ثلاثي الأبعاد", "الحوسبة المكانية", "التصميم المتمحور حول الإنسان", "أساسيات البرمجة"]
    },
    
    // Business and strategy
    {
      id: "ai-business-strategist",
      title: "استراتيجي تنفيذ الذكاء الاصطناعي",
      description: "مساعدة الشركات في تحديد فرص دمج الذكاء الاصطناعي وتطوير استراتيجيات للتنفيذ الفعال وانتقال القوى العاملة.",
      aiResistance: "high",
      growthPotential: "high",
      eduRequirement: "خلفية في الأعمال مع فهم التكنولوجيا أو العكس",
      salaryRange: "$100,000 - $180,000",
      keySkills: ["التفكير الاستراتيجي", "الفطنة التجارية", "إدارة التغيير", "الفهم التقني"]
    },
    {
      id: "human-skills-trainer",
      title: "مدرب المهارات البشرية",
      description: "تعليم وتطوير المهارات البشرية المميزة مثل الذكاء العاطفي والتفكير الإبداعي والتفكير الأخلاقي التي تكمل قدرات الذكاء الاصطناعي.",
      aiResistance: "high",
      growthPotential: "medium",
      eduRequirement: "خلفية في التعليم أو علم النفس أو التطوير التنظيمي",
      salaryRange: "$60,000 - $100,000",
      keySkills: ["التدريس", "الذكاء العاطفي", "التواصل", "تطوير البرامج"]
    },
    
    // Education and training
    {
      id: "ai-education-specialist",
      title: "أخصائي تعليم الذكاء الاصطناعي",
      description: "تطوير وتقديم البرامج التعليمية التي تعلم الناس كيفية العمل بشكل فعال مع أنظمة الذكاء الاصطناعي وبجانبها.",
      aiResistance: "high",
      growthPotential: "high",
      eduRequirement: "خلفية تعليمية مع خبرة تكنولوجية",
      salaryRange: "$70,000 - $120,000",
      keySkills: ["تطوير المناهج", "معرفة الذكاء الاصطناعي", "التدريس", "الترجمة التقنية"]
    }
  ];
  
  // Helper function to analyze responses and recommend careers
  export interface CareerFinderResult {
    topMatches: CareerMatch[];
    compatibilityScores: { [key: string]: number };
    userInfo: any;
  }
  
  export const analyzeCareerResponses = (answers: Record<number, number>, userInfo: any): CareerFinderResult => {
    // Initialize compatibility scores for all careers
    const compatibilityScores: { [key: string]: number } = {};
    careerMatches.forEach(career => {
      compatibilityScores[career.id] = 0;
    });
  
    // Score the careers based on answers
    // Question 1: Work environment preference
    if (answers[1] !== undefined) {
      // Independent work
      if (answers[1] === 0) {
        compatibilityScores["ai-ethics-specialist"] += 2;
        compatibilityScores["ai-trainer"] += 2;
        compatibilityScores["extended-reality-designer"] += 1;
      }
      // Collaborative work
      else if (answers[1] === 1) {
        compatibilityScores["healthcare-tech-integrator"] += 2;
        compatibilityScores["human-ai-collaboration-designer"] += 2;
        compatibilityScores["patient-care-coordinator"] += 2;
      }
      // Mix of both
      else if (answers[1] === 2) {
        compatibilityScores["creative-director-aiassisted"] += 2;
        compatibilityScores["ai-education-specialist"] += 2;
        compatibilityScores["human-ai-collaboration-designer"] += 1;
      }
      // Leadership
      else if (answers[1] === 3) {
        compatibilityScores["ai-business-strategist"] += 3;
        compatibilityScores["creative-director-aiassisted"] += 2;
        compatibilityScores["human-skills-trainer"] += 1;
      }
    }
  
    // Question 2: Skills or activities
    if (answers[2] !== undefined) {
      // Analyzing data
      if (answers[2] === 0) {
        compatibilityScores["ai-trainer"] += 3;
        compatibilityScores["ai-ethics-specialist"] += 2;
        compatibilityScores["ai-business-strategist"] += 1;
      }
      // Creating/designing
      else if (answers[2] === 1) {
        compatibilityScores["creative-director-aiassisted"] += 3;
        compatibilityScores["extended-reality-designer"] += 3;
        compatibilityScores["human-ai-collaboration-designer"] += 2;
      }
      // Helping/teaching
      else if (answers[2] === 2) {
        compatibilityScores["human-skills-trainer"] += 3;
        compatibilityScores["ai-education-specialist"] += 3;
        compatibilityScores["patient-care-coordinator"] += 2;
      }
      // Organizing/managing
      else if (answers[2] === 3) {
        compatibilityScores["ai-business-strategist"] += 3;
        compatibilityScores["healthcare-tech-integrator"] += 2;
        compatibilityScores["creative-director-aiassisted"] += 1;
      }
    }
  
    // Question 3: Work-life balance
    if (answers[3] !== undefined) {
      // Very important
      if (answers[3] === 0) {
        compatibilityScores["patient-care-coordinator"] += 2;
        compatibilityScores["human-skills-trainer"] += 2;
        compatibilityScores["ai-education-specialist"] += 2;
      }
      // Important with flexibility
      else if (answers[3] === 1) {
        compatibilityScores["healthcare-tech-integrator"] += 1;
        compatibilityScores["ai-ethics-specialist"] += 1;
        compatibilityScores["ai-trainer"] += 1;
      }
      // Less important
      else if (answers[3] === 2 || answers[3] === 3) {
        compatibilityScores["ai-business-strategist"] += 2;
        compatibilityScores["creative-director-aiassisted"] += 2;
        compatibilityScores["extended-reality-designer"] += 1;
      }
    }
  
    // Question 4: Task preferences
    if (answers[4] !== undefined) {
      // Creativity
      if (answers[4] === 0) {
        compatibilityScores["creative-director-aiassisted"] += 3;
        compatibilityScores["extended-reality-designer"] += 3;
        compatibilityScores["ai-ethics-specialist"] += 1;
      }
      // Precision/detail
      else if (answers[4] === 1) {
        compatibilityScores["ai-trainer"] += 2;
        compatibilityScores["healthcare-tech-integrator"] += 2;
        compatibilityScores["extended-reality-designer"] += 1;
      }
      // Communication/people
      else if (answers[4] === 2) {
        compatibilityScores["human-skills-trainer"] += 3;
        compatibilityScores["patient-care-coordinator"] += 3;
        compatibilityScores["ai-education-specialist"] += 2;
      }
      // Strategic thinking
      else if (answers[4] === 3) {
        compatibilityScores["ai-business-strategist"] += 3;
        compatibilityScores["ai-ethics-specialist"] += 2;
        compatibilityScores["human-ai-collaboration-designer"] += 2;
      }
    }
  
    // Question 5: Learning approach
    if (answers[5] !== undefined) {
      // Deep specific
      if (answers[5] === 0) {
        compatibilityScores["ai-ethics-specialist"] += 2;
        compatibilityScores["ai-trainer"] += 2;
      }
      // Broad knowledge
      else if (answers[5] === 1) {
        compatibilityScores["ai-business-strategist"] += 2;
        compatibilityScores["human-ai-collaboration-designer"] += 2;
      }
      // Hands-on
      else if (answers[5] === 2) {
        compatibilityScores["extended-reality-designer"] += 2;
        compatibilityScores["patient-care-coordinator"] += 2;
      }
      // Structured learning
      else if (answers[5] === 3) {
        compatibilityScores["ai-education-specialist"] += 2;
        compatibilityScores["healthcare-tech-integrator"] += 2;
      }
    }
  
    // Question 6: Comfort with technology
    if (answers[6] !== undefined) {
      // Very comfortable
      if (answers[6] === 0) {
        compatibilityScores["ai-trainer"] += 3;
        compatibilityScores["extended-reality-designer"] += 3;
        compatibilityScores["human-ai-collaboration-designer"] += 2;
      }
      // Comfortable
      else if (answers[6] === 1) {
        compatibilityScores["ai-business-strategist"] += 2;
        compatibilityScores["creative-director-aiassisted"] += 2;
        compatibilityScores["ai-ethics-specialist"] += 1;
      }
      // Somewhat comfortable
      else if (answers[6] === 2) {
        compatibilityScores["healthcare-tech-integrator"] += 2;
        compatibilityScores["ai-education-specialist"] += 2;
        compatibilityScores["human-skills-trainer"] += 1;
      }
      // Less comfortable
      else if (answers[6] === 3) {
        compatibilityScores["patient-care-coordinator"] += 2;
        compatibilityScores["human-skills-trainer"] += 2;
      }
    }
  
    // Question 7: Public speaking
    if (answers[7] !== undefined) {
      // Enjoy it
      if (answers[7] === 0) {
        compatibilityScores["ai-education-specialist"] += 3;
        compatibilityScores["human-skills-trainer"] += 3;
        compatibilityScores["ai-business-strategist"] += 2;
      }
      // Comfortable when necessary
      else if (answers[7] === 1) {
        compatibilityScores["creative-director-aiassisted"] += 2;
        compatibilityScores["healthcare-tech-integrator"] += 2;
      }
      // Prefer other communication
      else if (answers[7] === 2) {
        compatibilityScores["human-ai-collaboration-designer"] += 1;
        compatibilityScores["ai-ethics-specialist"] += 1;
      }
      // Avoid if possible
      else if (answers[7] === 3) {
        compatibilityScores["ai-trainer"] += 2;
        compatibilityScores["extended-reality-designer"] += 1;
      }
    }
    
    // Question 8: Social impact
    if (answers[8] !== undefined) {
      // Very important
      if (answers[8] === 0) {
        compatibilityScores["patient-care-coordinator"] += 3;
        compatibilityScores["human-skills-trainer"] += 3;
        compatibilityScores["ai-ethics-specialist"] += 2;
      }
      // Important
      else if (answers[8] === 1) {
        compatibilityScores["ai-education-specialist"] += 2;
        compatibilityScores["healthcare-tech-integrator"] += 2;
        compatibilityScores["human-ai-collaboration-designer"] += 1;
      }
      // Somewhat important
      else if (answers[8] === 2) {
        compatibilityScores["extended-reality-designer"] += 1;
        compatibilityScores["creative-director-aiassisted"] += 1;
      }
      // Less important
      else if (answers[8] === 3) {
        compatibilityScores["ai-trainer"] += 1;
        compatibilityScores["ai-business-strategist"] += 1;
      }
    }
  
    // Question 9: Working with numbers/data
    if (answers[9] !== undefined) {
      // Love it
      if (answers[9] === 0) {
        compatibilityScores["ai-trainer"] += 3;
        compatibilityScores["ai-business-strategist"] += 2;
      }
      // Comfortable
      else if (answers[9] === 1) {
        compatibilityScores["healthcare-tech-integrator"] += 2;
        compatibilityScores["human-ai-collaboration-designer"] += 2;
      }
      // Can work with basic data
      else if (answers[9] === 2) {
        compatibilityScores["creative-director-aiassisted"] += 1;
        compatibilityScores["extended-reality-designer"] += 1;
      }
      // Prefer to minimize
      else if (answers[9] === 3) {
        compatibilityScores["patient-care-coordinator"] += 2;
        compatibilityScores["human-skills-trainer"] += 2;
      }
    }
  
    // Question 10: Salary expectations
    if (answers[10] !== undefined) {
      // High income priority
      if (answers[10] === 0) {
        compatibilityScores["ai-business-strategist"] += 3;
        compatibilityScores["creative-director-aiassisted"] += 2;
      }
      // Above-average important
      else if (answers[10] === 1) {
        compatibilityScores["ai-trainer"] += 2;
        compatibilityScores["human-ai-collaboration-designer"] += 2;
        compatibilityScores["extended-reality-designer"] += 2;
      }
      // Moderate if fulfilling
      else if (answers[10] === 2) {
        compatibilityScores["ai-education-specialist"] += 2;
        compatibilityScores["healthcare-tech-integrator"] += 2;
        compatibilityScores["ai-ethics-specialist"] += 1;
      }
      // Less important
      else if (answers[10] === 3) {
        compatibilityScores["patient-care-coordinator"] += 1;
        compatibilityScores["human-skills-trainer"] += 1;
      }
    }
  
    // Additional weighting based on user info
    if (userInfo) {
      // Current field affects compatibility
      if (userInfo.currentField) {
        const field = userInfo.currentField.toLowerCase();
        
        // Technology background
        if (field.includes("tech") || field.includes("software") || field.includes("it") || field.includes("computer")) {
          compatibilityScores["ai-trainer"] += 2;
          compatibilityScores["human-ai-collaboration-designer"] += 2;
          compatibilityScores["extended-reality-designer"] += 2;
        }
        
        // Healthcare background
        else if (field.includes("health") || field.includes("medical") || field.includes("care")) {
          compatibilityScores["healthcare-tech-integrator"] += 3;
          compatibilityScores["patient-care-coordinator"] += 3;
        }
        
        // Creative field
        else if (field.includes("creative") || field.includes("design") || field.includes("art")) {
          compatibilityScores["creative-director-aiassisted"] += 3;
          compatibilityScores["extended-reality-designer"] += 2;
        }
        
        // Education background
        else if (field.includes("edu") || field.includes("teach") || field.includes("train")) {
          compatibilityScores["ai-education-specialist"] += 3;
          compatibilityScores["human-skills-trainer"] += 3;
        }
        
        // Business background
        else if (field.includes("business") || field.includes("management") || field.includes("consult")) {
          compatibilityScores["ai-business-strategist"] += 3;
          compatibilityScores["human-ai-collaboration-designer"] += 1;
        }
      }
      
      // Education level affects compatibility
      if (userInfo.educationLevel) {
        const eduLevel = userInfo.educationLevel.toLowerCase();
        
        // Higher education generally favors specialized roles
        if (eduLevel.includes("master") || eduLevel.includes("phd") || eduLevel.includes("doctor")) {
          compatibilityScores["ai-ethics-specialist"] += 2;
          compatibilityScores["ai-business-strategist"] += 1;
          compatibilityScores["healthcare-tech-integrator"] += 1;
        }
      }
      
      // Adaptability to new tech affects compatibility
      if (userInfo.adaptability) {
        const adaptLevel = userInfo.adaptability.toLowerCase();
        
        // High adaptability favors tech-heavy roles
        if (adaptLevel.includes("very comfortable")) {
          compatibilityScores["ai-trainer"] += 2;
          compatibilityScores["extended-reality-designer"] += 2;
          compatibilityScores["human-ai-collaboration-designer"] += 2;
        }
        // Low adaptability favors less tech-dependent roles
        else if (adaptLevel.includes("uncomfortable")) {
          compatibilityScores["human-skills-trainer"] += 2;
          compatibilityScores["patient-care-coordinator"] += 1;
        }
      }
    }
  
    // Sort careers by score and get top 3 matches
    const sortedMatches = Object.entries(compatibilityScores)
      .sort((a, b) => b[1] - a[1])
      .map(([id]) => careerMatches.find(career => career.id === id)!)
      .slice(0, 3);
  
    return {
      topMatches: sortedMatches,
      compatibilityScores,
      userInfo
    };
  };