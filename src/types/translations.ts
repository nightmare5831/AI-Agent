export interface TranslationType {
  header: {
    title: string;
    createClass: string;
  };
  subHeader: {
    differentiated: string;
    activityGenerator: string;
    upgradeToPremium: string;
  };
  sidebar: {
    teacher: {
      dashboard: string;
      students: string;
      classrooms: string;
      detailedLessonList: string;
      examGenerator: string;
      homeworkGenerator: string;
      allTools: string;
    };
    student: {
      dashboard: string;
      assessment: string;
      assignment: string;
    };

    settings: string;
  };
  main: {
    teacherDashboard: string;
    totalStudents: string;
    activeClasses: string;
    toolsAvailable: string;
    recentClasses: string;
    noClasses: string;
    quickTools: string;
    lessonPlanner: string;
    examGenerator: string;
    homeworkGenerator: string;
    studentManager: string;
  };
  createClass: {
    title: string;
    className: string;
    classNamePlaceholder: string;
    classNameError: string;
    classNameLengthError: string;
    ageOfLearners: string;
    selectAgeRange: string;
    ageRanges: {
      '2-6': string;
      '6-9': string;
      '9-11': string;
      '11-15': string;
      '15-18': string;
      '18-30': string;
      '30-60': string;
      '60+': string;
    };
    subject: string;
    subjectPlaceholder: string;
    languageLevel: string;
    selectLanguageLevel: string;
    sessionDuration: string;
    selectDuration: string;
    durations: {
      '30': string;
      '45': string;
      '60': string;
      '90': string;
      '120': string;
      '150': string;
      '180': string;
    };
    commonProblems: string;
    problems: {
      discipline: string;
      motivation: string;
      attendance: string;
      space: string;
      cultural: string;
    };
    equipment: {
      title: string;
      phones: string;
      tablets: string;
      internet: string;
      projector: string;
      board: string;
      tv: string;
    };
    next: string;
    back: string;
    create: string;
  };
  studentFilters: {
    classroom: string;
    selectClassroom: string;
    allClassrooms: string;
    levelFilter: string;
    allLevels: string;
    verygood: string;
    good: string;
    average: string;
    bad: string;
    difficulties: string;
    grammar: string;
    vocabulary: string;
    phonetics: string;
    listening: string;
    speaking: string;
    reading: string;
    writing: string;
    interacting: string;
  };
  headerTitle: {
    studentTitle: string;
  };
  buttonTxt: {
    addstudent: string;
  };
  detailed_lesson_planner: {
    title: string;
    subtitle: string;
    basic_info: {
      title: string;
      tab_title: string;
      lessontype: string;
      class_name: string;
      objectivies: string;
      language_content: string;
      prerequisites: string;
    };
    details: {
      tab_title: string;
      learning_path: string;
      beginning_ritual: string;
      ending_ritual: string;
      document_type: string;
      document_format: string;
      grammar: string;
      vocabulary: string;
      phonetics: string;
      communication: string;
      final_task: string;
    };
    button: string;
    edit_button: string;
    blank_placeholder: string;
  };
  exam_generator: {
    title: string;
    target_audience: {
      title: string;
      classroom: string;
      language_level: string;
      age: string;
    };
    assessment_type: {
      title: string;
      type: string;
      evaluation: string;
    };
    content: {
      title: string;
      lesson: string;
      important_info: {
        title: string;
        place_holder: string;
      };
      assessment_content: {
        title: string;
        place_holder: string;
      };
    };
    grading_system: {
      title: string;
      questions_number: string;
      total_points: string;
    };
    customization_tool: {
      title: string;
      per_student: {
        title: string;
        sub_title: string;
      };
      ai_automation: {
        title: string;
        sub_title: string;
      };
    };
    generate_button: string;
    send_button: string;
  };
  homework_generator: {
    title: string;
    target_audience: {
      title: string;
      classroom: string;
      language_level: string;
      age: string;
    };
    assignment_type: {
      title: string;
      type: string;
      assignment: string;
    };
    content: {
      title: string;
      lesson: string;
      important_info: {
        title: string;
        place_holder: string;
      };
      assignment_content: {
        title: string;
        place_holder: string;
      };
    };
    grading_system: {
      title: string;
      questions_number: string;
    };
    customization_tool: {
      title: string;
      per_student: {
        title: string;
        sub_title: string;
      };
      ai_automation: {
        title: string;
        sub_title: string;
      };
    };
    button: string;
  };
  differentiated_activity_generator: {
    createCustomizedActivitiesDescription: string;
    class: string;
    selectClass: string;
    generationMode: string;
    uploadContent: string;
    writeOrPaste: string;
    pasteDescription: string;
    selectedFile: string;
    remove: string;
    uploadAnActivity: string;
    uploadAnActivityDescription: string;
    excerciseConfiguration: string;
    baseActivity: string;
    chooseBaseActivity: string;
    languageExercise: string;
    communicativeSkills: string;
    typesOfModifications: string;
    simplify: string;
    adaptToSkill: string;
    adaptToTheme: string;
    themeExample: string;
    selectSkill: string;
    writingProduction: string;
    speakingProduction: string;
    readingComprehension: string;
    listeningComprehension: string;
    specificModifications: string;
    readingListeningDescription: string;
    modifyTextOrTranscript: string;
    keepTextOrTranscript: string;
    languageExercisesDescription: string;
    addAContrastiveApproach: string;
    firstLanguage: string;
    personalization: string;
    adaptToStudentsInterests: string;
    aiCorrection: string;
    sendToStudents: string;
    bothOptionsCaution: string;
    generateDifferentiatedActivity: string;
    resetForm: string;
    upgradeToPremium: string;
    footerSentence: string;
  };
  lesson_plan_display: {
    activityTitle: string;
    assessmentTitle: string;
    fillOutDescription: string;
    activity: string;
    assessment: string;
    prefixOfShowTitle: string;
    notGeneratedQuestions_assessment: string;
    notGeneratedQuestions_activity: string;
    parsingJSONData: string;
    documentView: string;
    download: string;
    textView: string;
    generating: string;
    lessonPlan: string;
  };
}

export type TranslationsType = {
  [key: string]: TranslationType;
};
