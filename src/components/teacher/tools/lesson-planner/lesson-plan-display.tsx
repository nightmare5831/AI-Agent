import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/teacher/language-selector';
import { Download, Loader2, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

interface LessonPlanDisplayProps {
  plan: string | null;
  isLoading: boolean;
  jsonData?: string; // Added prop for JSON data
  showTitle?: string; // Added prop for JSON data
  parsedJson?: any; // Added prop for parsed JSON object
  mainTitle?: string; // Added prop for main title
}

// Document item type definition
type DocumentItem = {
  type: 'title' | 'question' | 'options' | 'instructions';
  number?: number;
  content?: string;
  options?: string[];
  questionType?: string;
  points?: number;
  questionId?: number;
};

export function LessonPlanDisplay({
  plan,
  isLoading,
  jsonData = '',
  showTitle = 'assessment',
  parsedJson = null,
  mainTitle='assessmentTitle'
}: LessonPlanDisplayProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [documentContent, setDocumentContent] = useState<DocumentItem[]>([]);
  const scrollViewportRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const [displayMode, setDisplayMode] = useState<'text' | 'document'>(
    'document'
  ); // Display mode state
  const { t } = useLanguage();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
  };

  // Initialize text mode
  useEffect(() => {
    if (isLoading) {
      setDisplayedText('');
    }
  }, [isLoading]);

  // Update text
  useEffect(() => {
    if (plan !== null) {
      setDisplayedText(plan);
    }
  }, [plan]);

  // Convert JSON data to document format
  useEffect(() => {
    if (parsedJson) {
      // Use the complete JSON object if available
      convertJsonToDocument(parsedJson);
    } else if (jsonData) {
      // Try to parse partial data from JSON string
      attemptPartialJsonParsing(jsonData);
    }
  }, [jsonData, parsedJson]); //eslint-disable-line

  // Handle auto scroll
  useEffect(() => {
    if (autoScroll && scrollViewportRef.current) {
      const viewport = scrollViewportRef.current;
      const scrollHeight = viewport.scrollHeight;
      const clientHeight = viewport.clientHeight;

      viewport.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth',
      });
    }
  }, [displayedText, documentContent, autoScroll]);

  // Scroll event handler
  const handleScroll = () => {
    if (scrollViewportRef.current) {
      const viewport = scrollViewportRef.current;
      const isAtBottom =
        Math.abs(
          viewport.scrollHeight - viewport.scrollTop - viewport.clientHeight
        ) < 50;
      setAutoScroll(isAtBottom);
    }
  };

  // Function to convert document content to formatted text for download
  const convertDocumentToText = () => {
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
        item.options?.forEach((option, index) => {
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

  // Download handler
  const handleDownload = () => {
    let contentToDownload = '';

    if (displayMode === 'document' && documentContent.length > 0) {
      // Download the document view content
      contentToDownload = convertDocumentToText();
    } else if (displayedText) {
      // Fallback to original text if document content is not available
      contentToDownload = displayedText
        .split('\n')
        .map((line) => line.trim())
        .join('\r\n');
    }

    if (!contentToDownload) return;

    // Create a blob for plain text
    const blob = new Blob([contentToDownload], {
      type: 'text/plain;charset=utf-8',
    });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'assessment.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  // ======= JSON parsing and document conversion logic =======

  // Try to parse incomplete JSON
  const attemptPartialJsonParsing = (jsonStr: string) => {
    try {
      // Try to extract title
      const titleMatch = jsonStr.match(/"title"\s*:\s*"([^"]+)"/);
      const title = titleMatch ? titleMatch[1] : null;

      // Find the start of the questions array
      const questionsStartIndex = jsonStr.indexOf('"questions"');
      if (questionsStartIndex !== -1) {
        // Try to extract the questions array
        let questionsStr = jsonStr.substring(questionsStartIndex);
        const arrayStartIndex = questionsStr.indexOf('[');

        if (arrayStartIndex !== -1) {
          questionsStr = questionsStr.substring(arrayStartIndex + 1);

          // Extract only complete question objects
          const completeQuestions = extractCompleteObjects(questionsStr);

          // Update document content
          updateDocumentFromPartialData(title, completeQuestions);
        }
      }
    } catch (error) {
      console.log('Partial parsing error:', error);
    }
  };

  // Extract only complete JSON objects from a string
  const extractCompleteObjects = (jsonArrayStr: string) => {
    const objects = [];
    let bracketCount = 0;
    let startIndex = 0;
    let inString = false;
    let escaped = false;

    for (let i = 0; i < jsonArrayStr.length; i++) {
      const char = jsonArrayStr[i];

      // Handle string content (ignore everything inside quotes)
      if (inString) {
        if (escaped) {
          escaped = false;
        } else if (char === '\\') {
          escaped = true;
        } else if (char === '"') {
          inString = false;
        }
        continue;
      }

      // String start
      if (char === '"') {
        inString = true;
        continue;
      }

      // Count brackets
      if (char === '{') {
        if (bracketCount === 0) {
          startIndex = i;
        }
        bracketCount++;
      } else if (char === '}') {
        bracketCount--;

        // Completed one object
        if (bracketCount === 0 && startIndex !== -1) {
          const questionStr = jsonArrayStr.substring(startIndex, i + 1);
          try {
            const question = JSON.parse(questionStr);
            objects.push(question);
          } catch (e) {
            // Ignore parsing failures
          }
        }
      }

      // Check for array end
      if (bracketCount < 0 || (bracketCount === 0 && char === ']')) {
        break;
      }
    }

    return objects;
  };

  // Update document content with partial data
  const updateDocumentFromPartialData = (
    title: string | null,
    questions: any[]
  ) => {
    const newContent: DocumentItem[] = [];

    if (title) {
      newContent.push({ type: 'title', content: title });
    }

    questions.forEach((question, index) => {
      // Add question number and text
      newContent.push({
        type: 'question',
        number: question.id || index + 1,
        content: question.question,
        points: question.points,
        questionType: question.type,
      });

      // Add instructions if available
      if (question.instructions) {
        newContent.push({
          type: 'instructions',
          content: question.instructions,
          questionId: question.id || index + 1,
        });
      }

      // Add multiple choice options if available
      if (question.options && Array.isArray(question.options)) {
        newContent.push({
          type: 'options',
          options: question.options,
          questionId: question.id || index + 1,
        });
      }
    });

    setDocumentContent(newContent);
  };

  // Convert complete JSON to document format
  const convertJsonToDocument = (json: any) => {
    if (!json) return;

    const newContent: DocumentItem[] = [];

    if (json.title) {
      newContent.push({ type: 'title', content: json.title });
    }

    if (json.questions && Array.isArray(json.questions)) {
      json.questions.forEach((question: any, index: number) => {
        // Add question number and text
        newContent.push({
          type: 'question',
          number: question.id || index + 1,
          content: question.question,
          points: question.points,
          questionType: question.type,
        });

        // Add instructions if available
        if (question.instructions) {
          newContent.push({
            type: 'instructions',
            content: question.instructions,
            questionId: question.id || index + 1,
          });
        }

        // Add multiple choice options if available
        if (question.options && Array.isArray(question.options)) {
          newContent.push({
            type: 'options',
            options: question.options,
            questionId: question.id || index + 1,
          });
        }
      });
    }

    setDocumentContent(newContent);
  };

  // Get label for question type
  const getQuestionTypeLabel = (type: string) => {
    const typeMap: Record<string, string> = {
      multiple_choice: 'multiple choice',
      fill_blank: 'fill in the blank',
      rewriting: 'rewrite sentences',
      matching: 'match',
      reordering: 'reorder',
      listening: 'listen',
      reading: 'read',
      writing: 'write',
      speaking: 'speak',
    };

    return typeMap[type] || type;
  };

  // Render document content
  const renderDocumentContent = () => {
    return documentContent.map((item, index) => {
      switch (item.type) {
        case 'title':
          return (
            <div
              key={`title-${index}`}
              className="document-title mb-6 text-center"
            >
              <h2 className="text-xl font-semibold">{item.content}</h2>
            </div>
          );

        case 'question':
          return (
            <div
              key={`question-${item.number}-${index}`}
              className={`question-item mb-4 ${item.questionType ? `question-type-${item.questionType}` : ''}`}
            >
              <div className="question-header mb-2 flex items-center">
                <span className="question-number mr-2 font-bold">
                  {item.number}.
                </span>
                {item.questionType && (
                  <span className="question-type mr-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-800">
                    {getQuestionTypeLabel(item.questionType)}
                  </span>
                )}
                {item.points !== undefined && (
                  <span className="question-points ml-auto text-xs text-gray-500">
                    ({item.points} point)
                  </span>
                )}
              </div>
              <div className="question-text mb-2">{item.content}</div>
            </div>
          );

        case 'instructions':
          return (
            <div
              key={`instructions-${item.questionId}-${index}`}
              className="question-instructions mb-3 pl-6 text-sm italic text-gray-600"
            >
              {item.content}
            </div>
          );

        case 'options':
          return (
            <div
              key={`options-${item.questionId}-${index}`}
              className="options-list mb-6 pl-10"
            >
              {item.options?.map((option, optIndex) => (
                <div
                  key={`option-${item.questionId}-${optIndex}`}
                  className="option-item mb-2 flex"
                >
                  <span className="option-letter mr-2 font-medium">
                    {String.fromCharCode(65 + optIndex)}.
                  </span>
                  <span className="option-text">{option}</span>
                </div>
              ))}
            </div>
          );

        default:
          return null;
      }
    });
  };

  // Loading state with no content
  if (isLoading && !displayedText && documentContent.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">
            {t('lesson_plan_display.prefixOfShowTitle')}{' '}
            {t('lesson_plan_display.' + showTitle)}...
          </p>
        </div>
      </div>
    );
  }

  // Empty state
  if (!isLoading && !displayedText && documentContent.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">
            {t('lesson_plan_display.fillOutDescription')}{' '}
            {t('lesson_plan_display.' + showTitle)}
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        variants={itemVariants}
      >
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-2 shadow-md shadow-purple-500/10">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <h2 className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-xl font-semibold text-transparent">
            {t(`lesson_plan_display.${mainTitle}`)}
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {isLoading && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="sm"
                disabled
                className="border-pink-200 text-pink-700 dark:border-pink-800/40 dark:text-pink-300"
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t(`lesson_plan_display.generating`)}...
              </Button>
            </motion.div>
          )}

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              disabled={!displayedText && documentContent.length === 0}
              className="border-pink-200 text-pink-700 transition-all duration-300 hover:border-pink-400 dark:border-pink-800/40 dark:text-pink-300 dark:hover:border-pink-700"
            >
              <Download className="mr-2 h-4 w-4" />
              {t(`lesson_plan_display.download`)}
            </Button>
          </motion.div>

          <div className="ml-0 flex items-center gap-2 md:ml-4">
            {parsedJson === null ? (
              ''
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={displayMode === 'document' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setDisplayMode('document')}
                  className={`text-xs ${displayMode === 'document' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'border-pink-200 text-pink-700 dark:border-pink-800/40 dark:text-pink-300'}`}
                >
                  {t(`lesson_plan_display.documentView`)}
                </Button>
              </motion.div>
            )}

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant={displayMode === 'text' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDisplayMode('text')}
                className={`text-xs ${displayMode === 'text' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'border-pink-200 text-pink-700 dark:border-pink-800/40 dark:text-pink-300'}`}
              >
                {t(`lesson_plan_display.textView`)}
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <Card className="h-full bg-muted">
        <ScrollArea
          className="h-[900px]"
          viewportRef={scrollViewportRef}
          onScroll={handleScroll}
        >
          {displayMode === 'text' ? (
            // Text mode - original display method
            <div className="whitespace-pre-wrap p-4 font-mono text-sm">
              {displayedText}
              {isLoading && <span className="animate-pulse">|</span>}
            </div>
          ) : (
            // Document mode - parsed document format
            <div className="document-container p-6">
              {documentContent.length > 0 ? (
                <div className="document-content">
                  {renderDocumentContent()}
                </div>
              ) : (
                <div className="empty-document flex h-full items-center justify-center text-muted-foreground">
                  {isLoading ? (
                    <div className="loading-state">
                      <div className="typing-indicator mb-3 flex justify-center">
                        <span
                          className="mx-1 h-2 w-2 animate-pulse rounded-full bg-blue-600"
                          style={{ animationDelay: '0s' }}
                        ></span>
                        <span
                          className="mx-1 h-2 w-2 animate-pulse rounded-full bg-blue-600"
                          style={{ animationDelay: '0.2s' }}
                        ></span>
                        <span
                          className="mx-1 h-2 w-2 animate-pulse rounded-full bg-blue-600"
                          style={{ animationDelay: '0.4s' }}
                        ></span>
                      </div>
                      <p>
                        {t('lesson_plan_display.prefixOfShowTitle')}
                        {t(`lesson_plan_display.${showTitle}`)}...
                      </p>
                    </div>
                  ) : displayedText ? (
                    <p>{t(`lesson_plan_display.parsingJSONData`)}</p>
                  ) : (
                    <p>{t(`notGeneratedQuestions_${showTitle}`)}</p>
                  )}
                </div>
              )}

              {isLoading && documentContent.length > 0 && (
                <div className="typing-indicator mb-2 mt-4 flex justify-center">
                  <span
                    className="mx-1 h-2 w-2 animate-pulse rounded-full bg-blue-600"
                    style={{ animationDelay: '0s' }}
                  ></span>
                  <span
                    className="mx-1 h-2 w-2 animate-pulse rounded-full bg-blue-600"
                    style={{ animationDelay: '0.2s' }}
                  ></span>
                  <span
                    className="mx-1 h-2 w-2 animate-pulse rounded-full bg-blue-600"
                    style={{ animationDelay: '0.4s' }}
                  ></span>
                </div>
              )}
            </div>
          )}
        </ScrollArea>
      </Card>
    </motion.div>
  );
}

export default LessonPlanDisplay;
