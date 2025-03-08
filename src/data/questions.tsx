
export interface Question {
  id: number;
  title: string;
  options: string[];
}

export interface fieldsQuestion {
  id: string;
  title: string;
  fields: Object[];
}

export const fieldsQuestions: fieldsQuestion[] = [
  {
    id: 'info',
    title: 'Tell us about your career',
    fields: [
      {
        type: 'autocomplete',
        name: 'career',
        label: 'What is your current job title or profession?',
        placeholder: 'Start typing to see suggestions...'
      },
      {
        type: 'autocomplete',
        name: 'location',
        label: 'Where are you located? (Country/Region)',
        placeholder: 'Start typing to see suggestions...'
      },
      {
        type: 'select',
        name: 'yearsExperience',
        label: 'How many years of experience do you have in your field?',
        options: [
          '0-2 years',
          '3-5 years',
          '6-10 years',
          '10+ years'
        ]
      }
    ]
  },
];

export const arFieldsQuestions: fieldsQuestion[] = [
  {
    id: 'info',
    title: 'أخبرنا عن مهنتك',
    fields: [
      {
        type: 'autocomplete',
        name: 'career',
        label: 'ما هو المسمى الوظيفي أو المهنة الحالية؟',
        placeholder: 'ابدأ الكتابة لرؤية الاقتراحات...'
      },
      {
        type: 'autocomplete',
        name: 'location',
        label: 'أين موقعك الجغرافي؟ (الدولة/المنطقة)',
        placeholder: 'ابدأ الكتابة لرؤية الاقتراحات...'
      },
      {
        type: 'select',
        name: 'yearsExperience',
        label: 'كم عدد سنوات الخبرة لديك في مجالك؟',
        options: [
          '0-2 سنة',
          '3-5 سنوات',
          '6-10 سنوات',
          'أكثر من 10 سنوات'
        ]
      }
    ]
  },
];

export const questions: Question[] = [
    {
      id: 1,
      title: 'How much of your work involves repetitive tasks?',
      options: [
        'Most of my work involves repetitive, predictable tasks',
        'A significant portion of my work is repetitive',
        'Some repetitive elements, but significant variety too',
        'My work rarely involves repetitive tasks'
      ]
    },
    {
      id: 2,
      title: 'How much creative thinking does your job require?',
      options: [
        'Minimal creative thinking is needed',
        'Some creativity is occasionally required',
        'Creativity is regularly needed in my role',
        'My job centers around creative innovation'
      ]
    },
    {
      id: 3,
      title: 'How complex are the decisions you make in your role?',
      options: [
        'I mostly follow established processes with clear inputs',
        'I make somewhat complex decisions with limited variables',
        'I regularly make complex decisions with many variables',
        'My decisions are highly complex, involving uncertainty and numerous factors'
      ]
    },
    {
      id: 4,
      title: 'How frequently do you need to adapt to new situations in your work?',
      options: [
        'Rarely - my work environment is stable and predictable',
        'Occasionally - some adaptation is needed',
        'Frequently - I often encounter new situations',
        'Constantly - adaptability is central to my role'
      ]
    },
    {
      id: 5,
      title: 'How much of your job involves building human relationships?',
      options: [
        'Minimal human interaction is required',
        'Some relationship building, but it\'s not central',
        'Building relationships is an important part of my role',
        'My job is primarily centered around human relationships'
      ]
    },
    {
      id: 6,
      title: 'How specialized is the knowledge required for your work?',
      options: [
        'My job requires general knowledge that anyone could learn quickly',
        'Some specialized knowledge that requires moderate training',
        'Significant specialized knowledge requiring years of education',
        'Highly specialized expertise developed over many years'
      ]
    },
    {
      id: 7,
      title: 'How much of your work involves physical tasks or dexterity?',
      options: [
        'My work is almost entirely digital/conceptual',
        'Limited physical tasks are involved',
        'Physical tasks are a significant component',
        'My work centers around complex physical activities or dexterity'
      ]
    },
    {
      id: 8,
      title: 'How important is emotional intelligence in your role?',
      options: [
        'Minimal emotional intelligence is required',
        'Some emotional awareness helps, but isn\'t essential',
        'Understanding emotions is important to my effectiveness',
        'Emotional intelligence is central to my role'
      ]
    },
    {
      id: 9,
      title: 'How rule-based is your work?',
      options: [
        'My work follows strict, clearly defined rules and procedures',
        'Mostly rule-based with some exceptions',
        'Some guidelines exist, but significant judgment is needed',
        'Few defined rules - my work requires extensive judgment'
      ]
    },
    {
      id: 10,
      title: 'How much data analysis is involved in your work?',
      options: [
        'Little to no data analysis',
        'Some basic data interpretation',
        'Regular analysis of complex data',
        'Advanced data analysis is central to my role'
      ]
    },
    {
      id: 11,
      title: 'How quickly is your field changing due to technology?',
      options: [
        'Very slowly - little has changed over many years',
        'Moderately - gradual changes over time',
        'Rapidly - significant changes every few years',
        'Extremely fast - continuous technological disruption'
      ]
    },
    {
      id: 12,
      title: 'How comfortable are you with adopting new technologies?',
      options: [
        'Very uncomfortable - I prefer familiar tools',
        'Somewhat uncomfortable - I adopt new tech when required',
        'Comfortable - I regularly learn new technologies',
        'Very comfortable - I actively seek out new technologies'
      ]
    }
  ];

  export const arQuestions: Question[] = [
    {
      id: 1,
      title: 'إلى أي مدى تتضمن وظيفتك مهام متكررة؟',
      options: [
        'معظم عملي يتضمن مهام متكررة ومتوقعة',
        'جزء كبير من عملي متكرر',
        'هناك بعض العناصر المتكررة، لكن يوجد تنوع كبير أيضًا',
        'عملي نادرًا ما يتضمن مهام متكررة'
      ]
    },
    {
      id: 2,
      title: 'إلى أي مدى تتطلب وظيفتك التفكير الإبداعي؟',
      options: [
        'لا تحتاج وظيفتي إلى تفكير إبداعي تقريبًا',
        'أحتاج إلى بعض الإبداع من حين لآخر',
        'الإبداع مطلوب بانتظام في عملي',
        'وظيفتي تعتمد على الابتكار الإبداعي'
      ]
    },
    {
      id: 3,
      title: 'ما مدى تعقيد القرارات التي تتخذها في عملك؟',
      options: [
        'أتابع عمليات محددة مسبقًا بمدخلات واضحة',
        'أقوم باتخاذ قرارات معقدة إلى حد ما مع بعض المتغيرات',
        'أتخذ قرارات معقدة بانتظام تتضمن العديد من المتغيرات',
        'قراراتي معقدة للغاية، تنطوي على عدم يقين وعوامل متعددة'
      ]
    },
    {
      id: 4,
      title: 'كم مرة تحتاج إلى التكيف مع المواقف الجديدة في عملك؟',
      options: [
        'نادراً - بيئة عملي مستقرة ويمكن التنبؤ بها',
        'أحيانًا - أحتاج إلى التكيف مع بعض التغييرات',
        'كثيرًا - أواجه مواقف جديدة بانتظام',
        'باستمرار - التكيف هو جوهر عملي'
      ]
    },
    {
      id: 5,
      title: 'إلى أي مدى يتطلب عملك بناء العلاقات الإنسانية؟',
      options: [
        'التفاعل مع الآخرين ليس جزءًا رئيسيًا من عملي',
        'هناك بعض بناء العلاقات، لكنه ليس جوهريًا',
        'بناء العلاقات جزء مهم من عملي',
        'عملي يعتمد بشكل أساسي على العلاقات الإنسانية'
      ]
    },
    {
      id: 6,
      title: 'ما مدى تخصص المعرفة المطلوبة في عملك؟',
      options: [
        'عملي يتطلب معرفة عامة يمكن لأي شخص تعلمها بسرعة',
        'هناك بعض المعرفة المتخصصة التي تتطلب تدريبًا متوسطًا',
        'مطلوب معرفة متخصصة تتطلب سنوات من التعليم',
        'معرفة متخصصة للغاية يتم تطويرها على مدار سنوات عديدة'
      ]
    },
    {
      id: 7,
      title: 'إلى أي مدى يتضمن عملك مهام جسدية أو مهارات حركية؟',
      options: [
        'عملي يعتمد بالكامل تقريبًا على العمل الرقمي أو المفاهيمي',
        'هناك بعض المهام الجسدية المحدودة',
        'المهام الجسدية جزء كبير من عملي',
        'عملي يعتمد على الأنشطة البدنية أو المهارات الحركية المعقدة'
      ]
    },
    {
      id: 8,
      title: 'ما مدى أهمية الذكاء العاطفي في عملك؟',
      options: [
        'لا يتطلب عملي ذكاءً عاطفيًا تقريبًا',
        'الوعي العاطفي يساعد أحيانًا، لكنه ليس ضروريًا',
        'فهم العواطف مهم لنجاحي في العمل',
        'الذكاء العاطفي هو جوهر عملي'
      ]
    },
    {
      id: 9,
      title: 'إلى أي مدى يعتمد عملك على القواعد واللوائح المحددة؟',
      options: [
        'عملي يتبع قواعد وإجراءات محددة بوضوح',
        'يعتمد في الغالب على القواعد مع بعض الاستثناءات',
        'هناك بعض الإرشادات، ولكن يتطلب حكمًا شخصيًا كبيرًا',
        'لا توجد قواعد محددة - يتطلب عملي درجة عالية من الحكم الشخصي'
      ]
    },
    {
      id: 10,
      title: 'إلى أي مدى يتضمن عملك تحليل البيانات؟',
      options: [
        'عملي لا يتطلب تحليل البيانات تقريبًا',
        'هناك بعض التفسير الأساسي للبيانات',
        'أتعامل مع تحليل البيانات المعقدة بانتظام',
        'تحليل البيانات المتقدم هو جوهر عملي'
      ]
    },
    {
      id: 11,
      title: 'ما مدى سرعة تطور مجالك بسبب التكنولوجيا؟',
      options: [
        'بطيء جدًا - لم يتغير الكثير على مدى سنوات عديدة',
        'معتدل - هناك تغييرات تدريجية بمرور الوقت',
        'سريع - هناك تغييرات كبيرة كل بضع سنوات',
        'سريع جدًا - اضطراب تكنولوجي مستمر'
      ]
    },
    {
      id: 12,
      title: 'ما مدى ارتياحك لتبني التقنيات الجديدة؟',
      options: [
        'غير مرتاح تمامًا - أفضل الأدوات المألوفة',
        'غير مرتاح إلى حد ما - أستخدم التكنولوجيا الجديدة عند الضرورة',
        'مرتاح - أتعلم تقنيات جديدة بانتظام',
        'مرتاح جدًا - أبحث دائمًا عن التقنيات الجديدة'
      ]
    }
  ];
  