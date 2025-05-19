'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  BookOpen,
  Users,
  ClipboardList,
  ScrollText,
  Settings,
  CheckSquare,
  Wand2,
  SendIcon,
  InfoIcon,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { useClasses } from '@/components/providers/classes-context';
import { useLessons } from '@/components/providers/lessons-provider';
import { useLanguage } from '@/components/teacher/language-selector';
import { LessonPlanDisplay } from '@/components/teacher/tools/lesson-planner/lesson-plan-display';
import { AssessmentCompleteModal } from '@/components/teacher/exam-generator/send-dialog';
import { useAuth } from '@/core/auth/AuthProvider'; // Assuming you have a user context

interface FormData {
  classroom: {
    id: string;
    class_name: string;
  };
  language_level: string;
  age: string;
  assessment_type: {
    type: string;
    evaluation: string;
  };
  content: {
    lesson_id: string;
    important_info: string;
    assessment_content: string;
  };
  grading_system: {
    questions_number: number;
    total_points: number;
  };
  customization_tool: {
    per_student: boolean;
    ai_automated_correction: boolean;
  };
}

const initialFormData: FormData = {
  classroom: {
    id: '',
    class_name: '',
  },
  language_level: '',
  age: '',
  assessment_type: {
    type: '',
    evaluation: '',
  },
  content: {
    lesson_id: '',
    important_info: '',
    assessment_content: '',
  },
  grading_system: {
    questions_number: 5,
    total_points: 10,
  },
  customization_tool: {
    per_student: false,
    ai_automated_correction: false,
  },
};

const LANGUAGE_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;
const AGE_GROUPS = ['2-6', '6-9', '9-11', '11-15', '15-18', '18+'] as const;
const ASSESSMENT_TYPES = [
  'Diagnostic Assessment',
  'Formal Assessment',
  'Summative Assessment',
] as const;
const EVALUATION_TYPES = ['Linguistic', 'Skills Based', 'Mixed'] as const;
const QUESTION_COUNTS = [5, 10, 15, 20] as const;
const TOTAL_POINTS = [10, 20, 25, 50, 100] as const;

export default function ExamGenerator() {
  const { classes, fetchClasses } = useClasses();
  const { lessons, fetchLessons } = useLessons();
  const { t, selectedLanguage } = useLanguage();
  const [{ profile }] = useAuth();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [streamedText, setStreamedText] = useState('');
  const [jsonData, setJsonData] = useState(''); // JSON data state
  const [parsedJson, setParsedJson] = useState(null); // Parsed JSON object
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [assessmentCompleteModalOpen, setAssessmentCompleteModalOpen] =
    useState(false);
  const [generationComplete, setGenerationComplete] = useState(false);
  const [formattedAssessmentText, setFormattedAssessmentText] = useState('');

  // Request cancellation reference
  const abortControllerRef = useRef<AbortController | null>(null);

  const validateFunc = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.classroom.id.trim() && !formData.content.lesson_id.trim())
      newErrors.classroom = 'Classroom Name is required.';
    if (!formData.classroom.id.trim() && !formData.language_level.trim())
      newErrors.language_level = 'Language level is required.';
    if (!formData.classroom.id.trim() && !formData.age.trim())
      newErrors.age = 'Age is required.';
    if (!formData.assessment_type.evaluation.trim())
      newErrors.assignment_type1 = 'Assignment is required.';
    if (!formData.content.lesson_id.trim())
      newErrors.lesson_id = 'Lesson is required.';
    if (formData.grading_system.questions_number <= 0)
      newErrors.question_number = 'Number of questions must be greater than 0.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  // Check if JSON string is valid
  const isValidJSON = (str: string) => {
    if (!str) return false;
    if (!str.startsWith('{') || !str.endsWith('}')) return false;

    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  };

  // Function to handle assessment generation
  const senderFunc = async (data: any) => {
    try {
      // Reset generation status
      setGenerationComplete(false);

      // Cancel previous request if exists
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new AbortController
      abortControllerRef.current = new AbortController();

      setIsLoading(true);
      setIsGenerating(true);
      setStreamedText('');
      setJsonData('');
      setParsedJson(null);

      const response = await fetch('/api/teacher/exam-generator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error('Failed to generate exam');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let isDone = false;

      while (!isDone) {
        const { value, done } = await reader.read();
        if (done) {
          isDone = true;
          break;
        }

        const text = decoder.decode(value);
        const lines = text.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') {
              setIsLoading(false);
              setIsGenerating(false);
              // Set generation complete flag to true
              setGenerationComplete(true);
              break;
            }

            try {
              const parsedData = JSON.parse(data);

              // Update text stream
              if (parsedData.content) {
                setStreamedText((prev) => prev + parsedData.content);
              }

              // Update JSON data
              if (parsedData.accumulatedJson) {
                setJsonData(parsedData.accumulatedJson);
              } else if (parsedData.content) {
                setJsonData((prev) => prev + parsedData.content);
              }

              // Try to parse complete JSON
              const currentJsonData =
                parsedData.accumulatedJson || jsonData + parsedData.content;
              if (isValidJSON(currentJsonData)) {
                try {
                  const jsonObject = JSON.parse(currentJsonData);
                  setParsedJson(jsonObject);
                } catch (e) {
                  console.log('JSON parsing failed:', e);
                }
              }
            } catch (e) {
              console.error('Error parsing JSON:', e);
            }
          }
        }
      }

      if (!reader) {
        throw new Error('No reader available');
      }
    } catch (error) {
      if (error) {
        console.log('Request was cancelled by user.');
      } else {
        console.error('Error:', error);
        toast.error('An error occurred while generating the assessment.');
      }
    } finally {
      setIsLoading(false);
      setIsGenerating(false);
      abortControllerRef.current = null;
    }
  };

  // Function to cancel generation
  const cancelGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsLoading(false);
      setIsGenerating(false);
      toast.info('Assessment generation cancelled.');
    }
  };

  // Function to convert document content to formatted text
  const convertDocumentToFormattedText = (documentContent: any[]) => {
    let formattedText = '';

    // Add title if exists
    const titleItem = documentContent.find((item) => item.type === 'title');
    if (titleItem && titleItem.content) {
      formattedText += `${titleItem.content}\n\n`;
    }

    // Process each question and related items
    let currentQuestionId = 0;
    let questionText = '';
    let instructionText = '';
    let optionsText = '';

    documentContent.forEach((item) => {
      if (item.type === 'question') {
        // If we had a previous question, add it to the formatted text
        if (questionText) {
          formattedText += questionText;
          if (instructionText) {
            formattedText += `${instructionText}\n`;
          }
          if (optionsText) {
            formattedText += optionsText;
          }
          formattedText += '\n';
        }

        // Start a new question
        currentQuestionId = item.number || 0;
        const questionType = item.questionType
          ? `[${getQuestionTypeLabel(item.questionType)}]`
          : '';
        const points = item.points ? `(${item.points} points)` : '';

        questionText = `${currentQuestionId}. ${questionType} ${item.content} ${points}\n`;
        instructionText = '';
        optionsText = '';
      } else if (
        item.type === 'instructions' &&
        item.questionId === currentQuestionId
      ) {
        instructionText = `   Instructions: ${item.content}\n`;
      } else if (
        item.type === 'options' &&
        item.questionId === currentQuestionId
      ) {
        optionsText = '\n';
        item.options?.forEach((option: string, index: number) => {
          optionsText += `   ${String.fromCharCode(65 + index)}. ${option}\n`;
        });
      }
    });

    // Add the last question if exists
    if (questionText) {
      formattedText += questionText;
      if (instructionText) {
        formattedText += `${instructionText}\n`;
      }
      if (optionsText) {
        formattedText += optionsText;
      }
    }

    return formattedText;
  };

  // Helper function to get question type label
  const getQuestionTypeLabel = (type: string) => {
    const typeMap: Record<string, string> = {
      multiple_choice: 'Multiple Choice',
      fill_blank: 'Fill in the Blank',
      rewriting: 'Rewriting',
      matching: 'Matching',
      reordering: 'Reordering',
      listening: 'Listening',
      reading: 'Reading',
      writing: 'Writing',
      speaking: 'Speaking',
    };

    return typeMap[type] || type;
  };

  // Effect to handle generation completion
  useEffect(() => {
    if (generationComplete && parsedJson) {
      // Generate the formatted assessment text for the modal
      const documentItems = parseJsonToDocumentItems(parsedJson);
      const formatted = convertDocumentToFormattedText(documentItems);
      setFormattedAssessmentText(formatted);

      // Show the modal
      setAssessmentCompleteModalOpen(true);
      // Reset the generation complete flag
      setGenerationComplete(false);
    }
  }, [generationComplete, parsedJson]); //eslint-disable-line

  // Helper function to parse JSON to document items
  const parseJsonToDocumentItems = (json: any) => {
    if (!json) return [];

    const items = [];

    if (json.title) {
      items.push({ type: 'title', content: json.title });
    }

    if (json.questions && Array.isArray(json.questions)) {
      json.questions.forEach((question: any, index: number) => {
        items.push({
          type: 'question',
          number: question.id || index + 1,
          content: question.question,
          points: question.points,
          questionType: question.type,
        });

        if (question.instructions) {
          items.push({
            type: 'instructions',
            content: question.instructions,
            questionId: question.id || index + 1,
          });
        }

        if (question.options && Array.isArray(question.options)) {
          items.push({
            type: 'options',
            options: question.options,
            questionId: question.id || index + 1,
          });
        }
      });
    }

    return items;
  };

  // Function to handle the send dialog
  const handleSendDialog = async () => {
    // Open AssessmentCompleteModal instead of SendDialog
    if (streamedText.length > 0) {
      // Prepare the formatted assessment text for the modal
      if (parsedJson) {
        const documentItems = parseJsonToDocumentItems(parsedJson);
        const formatted = convertDocumentToFormattedText(documentItems);
        setFormattedAssessmentText(formatted);
      } else {
        // If no parsed JSON, just use the streamed text
        setFormattedAssessmentText(streamedText);
      }

      // Open the AssessmentCompleteModal
      setAssessmentCompleteModalOpen(true);
    } else {
      toast.error('No assessment content to send');
    }
  };

  // Function to handle sending the assessment to students
  // Function to handle sending the assessment to students
  // Function to handle sending the assessment to students
  // Function to handle sending the assessment to students
  const handleSend = async (data: any) => {
    try {
      // Get the original JSON data which should be stored in the database
      let jsonDataToStore = parsedJson;

      // If we have structured document content from the modal, prioritize that
      if (data && data.jsonData) {
        jsonDataToStore = data.jsonData;
      }

      // Ensure we have JSON data to send
      if (!jsonDataToStore) {
        throw new Error('No valid assessment data to send');
      }

      console.log('Assessment data to be sent:', jsonDataToStore);

      // Make sure we have proper formatting for the notification
      const cleanJsonData = sanitizeJsonData(jsonDataToStore);

      // Prepare assessment details for the notification
      const assessmentDetails = {
        title: cleanJsonData.title || 'Assessment',
        questions: cleanJsonData.questions?.length || 0,
        totalPoints:
          cleanJsonData.totalPoints ||
          formData.grading_system.total_points ||
          0,
        language: cleanJsonData.language || selectedLanguage || 'English',
        timestamp: new Date().toISOString(),
      };

      // Create the notification payload
      const notificationPayload = {
        from: profile?.id || 'teacher123', // Use actual teacher ID from user context
        to: formData.classroom.id, // Classroom ID
        collection: 'assessments',
        type: 'assessment',
        title: assessmentDetails.title,
        message: `Assessment with ${assessmentDetails.questions} questions (${assessmentDetails.totalPoints} points)`,
        data: JSON.stringify(cleanJsonData), // Store the sanitized JSON data
        link: `/student/assessments/${Date.now()}`, // Generate a unique link
        viewed: false,
      };

      console.log('Sending notification payload:', {
        ...notificationPayload,
        data: '[JSON data not shown for brevity]', // Don't log the full JSON
      });

      // Save notification to database using API
      const response = await fetch('/api/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notificationPayload),
      });

      if (!response.ok) {
        throw new Error('Failed to store notification');
      }

      // Get the notification data from the response
      const notificationData = await response.json();
      console.log('Notification created:', notificationData.id);

      // Broadcast the notification to connected clients in real-time
      if (typeof window !== 'undefined') {
        console.log('Broadcasting notification event');
        const notificationEvent = new CustomEvent('new-notification', {
          detail: notificationData,
        });
        window.dispatchEvent(notificationEvent);
      }

      // Show success message
      toast.success('Assessment sent to students successfully!');
      // Close the modal if it's still open
      setAssessmentCompleteModalOpen(false);
    } catch (error) {
      console.error('Error sending assessment:', error);
      toast.error('Failed to send assessment to students.');
    }
  };

  // Function to sanitize and ensure proper JSON format
  function sanitizeJsonData(data: any) {
    // Create a clean copy to prevent mutations
    const cleanData = { ...data };

    // Ensure we have a title
    if (!cleanData.title) {
      cleanData.title = 'Assessment';
    }

    // Ensure questions is an array
    if (!Array.isArray(cleanData.questions)) {
      cleanData.questions = [];
    }

    // Make sure each question has required fields
    cleanData.questions = cleanData.questions.map(
      (question: any, index: number) => {
        return {
          id: question.id || index + 1,
          type: question.type || 'question',
          question: question.question || `Question ${index + 1}`,
          points: question.points || 1,
          ...question, // Keep other properties
        };
      }
    );

    // Calculate total points if not present
    if (!cleanData.totalPoints) {
      cleanData.totalPoints = cleanData.questions.reduce(
        (total: number, q: any) => total + (q.points || 0),
        0
      );
    }

    // Ensure language is set
    if (!cleanData.language) {
      cleanData.language = 'English';
    }

    return cleanData;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateFunc()) {
      toast.error('Please fill in all the required fields.');
      return;
    }
    const classData = classes.find((c: any) => c.id === formData.classroom.id);
    const lesson_id = formData.content.lesson_id;
    const lessonData = lessons.find((l: any) => l.id === lesson_id);
    const updatedFormData = {
      ...formData,
      language: selectedLanguage,
      class: classData,
      lesson: lessonData,
    };
    if (formData.classroom.id === 'no_class') {
      toast.error('Please select a class');
      return;
    }
    if (formData.content.lesson_id === 'no_lesson') {
      toast.error('Please select a lesson');
      return;
    }
    await senderFunc(updatedFormData);
  };

  const IconWrapper = ({
    icon: Icon,
    children,
  }: {
    icon: any;
    children: React.ReactNode;
  }) => (
    <div className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
      <div className="rounded-md bg-muted/50 p-1.5">
        <Icon className="h-4 w-4 text-blue-600" />
      </div>
      {children}
    </div>
  );

  return (
    <div className="container mx-auto max-w-4xl py-8">
      <div className="mb-8 flex items-center justify-center">
        <BookOpen className="mr-2 h-8 w-8 text-primary" />
        <h1 className="text-center text-3xl font-bold">
          {t('exam_generator.title')}
        </h1>
      </div>

      <div className="grid gap-8 md:grid-cols-[60%_40%]">
        <form onSubmit={handleSubmit}>
          <div>
            <Card className="p-6">
              <div className="space-y-8">
                {/* Target Audience Section */}
                <div>
                  <IconWrapper icon={Users}>
                    {t('exam_generator.target_audience.title')}
                  </IconWrapper>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="classroom">
                        {t('exam_generator.target_audience.classroom')}
                      </Label>
                      <Select
                        value={formData.classroom.id}
                        onValueChange={(value) => {
                          setFormData((prev) => ({
                            ...prev,
                            classroom: { ...prev.classroom, id: value },
                          }));
                          if (errors.class_id) {
                            setErrors((prev) => ({
                              ...prev,
                              classroom_id: undefined,
                            }));
                          }
                        }}
                      >
                        <SelectTrigger id="classroom" className="bg-background">
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="no_class">No lesson</SelectItem>
                          {classes.map((item: any) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.class_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="language-level">
                        {t('exam_generator.target_audience.language_level')}
                      </Label>
                      <Select
                        disabled={!!formData.classroom.id}
                        value={formData.language_level}
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            language_level: value,
                          }))
                        }
                      >
                        <SelectTrigger
                          id="language-level"
                          className="bg-background"
                        >
                          <SelectValue placeholder="Select Level" />
                        </SelectTrigger>
                        <SelectContent>
                          {LANGUAGE_LEVELS.map((level) => (
                            <SelectItem key={level} value={level}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="age-group">
                        {t('exam_generator.target_audience.age')}
                      </Label>
                      <Select
                        disabled={!!formData.classroom.id}
                        value={formData.age}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, age: value }))
                        }
                      >
                        <SelectTrigger id="age-group" className="bg-background">
                          <SelectValue placeholder="Select age" />
                        </SelectTrigger>
                        <SelectContent>
                          {AGE_GROUPS.map((group) => (
                            <SelectItem key={group} value={group}>
                              {group}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Assessment Type Section */}
                <div>
                  <IconWrapper icon={ClipboardList}>
                    {t('exam_generator.assessment_type.title')}
                  </IconWrapper>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* <div className="space-y-2">
                      <Label htmlFor="assessment-type">
                        {t('exam_generator.assessment_type.type')}
                      </Label>
                      <Select
                        value={formData.assessment_type.type}
                        onValueChange={(Value) =>
                          setFormData((prev) => ({
                            ...prev,
                            assessment_type: {
                              ...prev.assessment_type,
                              type: Value,
                            },
                          }))
                        }
                      >
                        <SelectTrigger
                          id="assessment-type"
                          className="bg-background"
                        >
                          <SelectValue placeholder="Select assessment type" />
                        </SelectTrigger>
                        <SelectContent>
                          {ASSESSMENT_TYPES.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div> */}

                    <div className="space-y-2">
                      <Label htmlFor="evaluation-type">
                        {t('exam_generator.assessment_type.evaluation')}
                      </Label>
                      <Select
                        value={formData.assessment_type.evaluation}
                        onValueChange={(Value) =>
                          setFormData((prev) => ({
                            ...prev,
                            assessment_type: {
                              ...prev.assessment_type,
                              evaluation: Value,
                            },
                          }))
                        }
                      >
                        <SelectTrigger
                          id="evaluation-type"
                          className="bg-background"
                        >
                          <SelectValue placeholder="Select evaluation type" />
                        </SelectTrigger>
                        <SelectContent>
                          {EVALUATION_TYPES.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div>
                  <IconWrapper icon={ScrollText}>
                    {t('exam_generator.content.title')}
                  </IconWrapper>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="lesson">
                        {t('exam_generator.content.lesson')}
                      </Label>
                      <Select
                        value={formData.content.lesson_id}
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            content: { ...prev.content, lesson_id: value },
                          }))
                        }
                      >
                        <SelectTrigger id="lesson" className="bg-background">
                          <SelectValue placeholder="Select lesson" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="no_lesson">No lesson</SelectItem>
                          {lessons.map((lesson: any) => (
                            <SelectItem key={lesson.id} value={lesson.id}>
                              {lesson.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="important-info">
                        {t('exam_generator.content.important_info.title')}
                      </Label>
                      <Textarea
                        id="important-info"
                        placeholder={t(
                          'exam_generator.content.important_info.place_holder'
                        )}
                        className="bg-background"
                        value={formData.content.important_info}
                        onChange={(e) => {
                          setFormData((prev) => ({
                            ...prev,
                            content: {
                              ...prev.content,
                              important_info: e.target.value,
                            },
                          }));
                        }}
                        disabled={!formData.content.lesson_id}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="assessment-content">
                        {t('exam_generator.content.assessment_content.title')}
                      </Label>
                      <Textarea
                        id="assessment-content"
                        placeholder={t(
                          'exam_generator.content.assessment_content.place_holder'
                        )}
                        className="bg-background"
                        value={formData.content.assessment_content}
                        onChange={(e) => {
                          setFormData((prev) => ({
                            ...prev,
                            content: {
                              ...prev.content,
                              assessment_content: e.target.value,
                            },
                          }));
                        }}
                        disabled={!!formData.content.lesson_id}
                      />
                    </div>
                  </div>
                </div>

                {/* Grading System Section */}
                <div>
                  <IconWrapper icon={CheckSquare}>
                    {t('exam_generator.grading_system.title')}
                  </IconWrapper>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="question-count">
                        {t('exam_generator.grading_system.questions_number')}
                      </Label>
                      <Select
                        value={formData.grading_system.questions_number.toString()}
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            grading_system: {
                              ...prev.grading_system,
                              questions_number: Number(value),
                            },
                          }))
                        }
                      >
                        <SelectTrigger
                          id="question-count"
                          className="bg-background"
                        >
                          <SelectValue placeholder="Select Question Number" />
                        </SelectTrigger>
                        <SelectContent>
                          {QUESTION_COUNTS.map((count) => (
                            <SelectItem key={count} value={count.toString()}>
                              {count}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="total-points">
                        {t('exam_generator.grading_system.total_points')}
                      </Label>
                      <Select
                        value={formData.grading_system.total_points.toString()}
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            grading_system: {
                              ...prev.grading_system,
                              total_points: Number(value),
                            },
                          }))
                        }
                      >
                        <SelectTrigger
                          id="total-points"
                          className="bg-background"
                        >
                          <SelectValue placeholder="Select Points" />
                        </SelectTrigger>
                        <SelectContent>
                          {TOTAL_POINTS.map((points) => (
                            <SelectItem key={points} value={points?.toString()}>
                              {points}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Customization Tools Section */}
                <div>
                  <IconWrapper icon={Settings}>
                    {t('exam_generator.customization_tool.title')}
                  </IconWrapper>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="customizable">
                          {t(
                            'exam_generator.customization_tool.per_student.title'
                          )}
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {t(
                            'exam_generator.customization_tool.per_student.sub_title'
                          )}
                        </p>
                      </div>
                      <Switch
                        id="customizable"
                        checked={formData.customization_tool.per_student}
                        onCheckedChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            customization_tool: {
                              ...prev.customization_tool,
                              per_student: value,
                            },
                          }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="ai-correction">
                          {t(
                            'exam_generator.customization_tool.ai_automation.title'
                          )}
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {t(
                            'exam_generator.customization_tool.ai_automation.sub_title'
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-4 w-4"
                              >
                                <InfoIcon className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                              <p className="whitespace-pre-line text-sm">
                                The AI may produce errors. We recommend manual
                                verification before sending.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <Switch
                          id="ai-correction"
                          checked={
                            formData.customization_tool.ai_automated_correction
                          }
                          onCheckedChange={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              customization_tool: {
                                ...prev.customization_tool,
                                ai_automated_correction: value,
                              },
                            }))
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            <div className="mt-6 flex justify-end gap-4">
              {isGenerating && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={cancelGeneration}
                >
                  Cancel
                </Button>
              )}
              <Button
                type="button"
                onClick={handleSendDialog}
                className="bg-blue-600 transition-colors hover:bg-blue-700"
                disabled={streamedText.length === 0}
              >
                <SendIcon className="mr-2 h-4 w-4" />
                {t('exam_generator.send_button')}
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 transition-colors hover:bg-blue-700"
                disabled={isGenerating}
              >
                <Wand2 className="mr-2 h-4 w-4" />
                {isGenerating
                  ? 'Generating...'
                  : t('exam_generator.generate_button')}
              </Button>
            </div>
          </div>
        </form>
        <Card>
          <LessonPlanDisplay
            plan={streamedText}
            isLoading={isLoading}
            jsonData={jsonData}
            parsedJson={parsedJson}
          />
        </Card>

        {/* Assessment Complete Modal */}
        <AssessmentCompleteModal
          isOpen={assessmentCompleteModalOpen}
          onOpenChange={setAssessmentCompleteModalOpen}
          assessmentContent={formattedAssessmentText}
          documentContent={
            parsedJson ? parseJsonToDocumentItems(parsedJson) : []
          }
          parsedJson={parsedJson}
          onSend={handleSend}
        />
      </div>
    </div>
  );
}
