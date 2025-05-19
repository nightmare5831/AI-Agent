'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { HelpCircle, BookOpen, FileText } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Request from '@/lib/request';
import { toast } from 'sonner';
import { useLessons } from '@/components/providers/lessons-provider';
import { useClasses } from '@/components/providers/classes-context';
import { useRouter } from 'next/navigation';

interface CreateLessonDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Classroom {
  id: string;
  class_name: string;
}

interface Ritual {
  enabled: boolean;
  content: string;
}

interface BeginningRitual {
  reviewContent: Ritual;
  introduceTheme: Ritual;
}
interface EndingRitual {
  reviewContent: Ritual;
  introduceTheme: Ritual;
}

interface FormData {
  title: string;
  classId: string;
  lessonType: string;
  objectives: string;
  languageContent: string;
  prerequisites: string;
  details: {
    learningPath: string;
    beginningRitual: BeginningRitual;
    endingRitual: EndingRitual;
    documentFormat: string;
    grammar: string;
    vocabulary: string;
    phonetics: string;
    communication: string[];
    finalTask: string;
  };
}

const initialFormData: FormData = {
  title: '',
  classId: '',
  lessonType: '',
  objectives: '',
  languageContent: '',
  prerequisites: '',
  details: {
    learningPath: '',
    beginningRitual: {
      reviewContent: {
        enabled: false,
        content: '',
      },
      introduceTheme: {
        enabled: false,
        content: '',
      },
    },
    endingRitual: {
      reviewContent: {
        enabled: false,
        content: '',
      },
      introduceTheme: {
        enabled: false,
        content: '',
      },
    },
    documentFormat: '',
    grammar: '',
    vocabulary: '',
    phonetics: '',
    communication: [],
    finalTask: '',
  },
};

export function CreateLessonDialog({
  open,
  onOpenChange,
}: CreateLessonDialogProps) {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const slideUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };
  const { addLesson } = useLessons();
  const { classes, fetchClasses } = useClasses();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentTab, setCurrentTab] = useState('basic');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      setIsLoading(true);
      try {
        fetchClasses();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [open]); //eslint-disable-line

  const validateBasicInfo = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Lesson title is required';
    }

    if (!formData.classId) {
      newErrors.classId = 'Class selection is required';
    }

    if (!formData.objectives.trim()) {
      newErrors.objectives = 'Communicative objectives are required';
    }

    if (!formData.languageContent.trim()) {
      newErrors.languageContent = 'Language content is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateDetails = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.details.documentFormat) {
      newErrors.documentFormat = 'Document format is required';
    }

    if (formData.details.grammar.length === 0) {
      newErrors.grammar = 'At least one grammar type must be selected';
    }

    if (!formData.details.vocabulary.trim()) {
      newErrors.vocabulary = 'At least vocabulary content must be typed';
    }

    if (!formData.details.phonetics.trim()) {
      newErrors.phonetics = 'At least phonetics content must be typed';
    }

    if (!formData.details.finalTask) {
      newErrors.finalTask = 'Final task is required';
    }

    if (
      formData.details.beginningRitual.reviewContent.enabled &&
      !formData.details.beginningRitual.reviewContent.content.trim()
    ) {
      newErrors.beginningReview =
        'Beginning ritual review content is required when enabled';
    }

    if (
      formData.details.beginningRitual.introduceTheme.enabled &&
      !formData.details.beginningRitual.introduceTheme.content.trim()
    ) {
      newErrors.beginningTheme =
        'Beginning ritual theme content is required when enabled';
    }

    if (
      formData.details.endingRitual.reviewContent.enabled &&
      !formData.details.endingRitual.reviewContent.content.trim()
    ) {
      newErrors.endingReview =
        'Ending ritual review content is required when enabled';
    }

    if (
      formData.details.endingRitual.introduceTheme.enabled &&
      !formData.details.endingRitual.introduceTheme.content.trim()
    ) {
      newErrors.endingTheme =
        'Ending ritual theme content is required when enabled';
    }

    console.log('newErrors = ', newErrors);

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTabChange = (value: string) => {
    if (value === 'details' && !validateBasicInfo()) {
      return;
    }
    setCurrentTab(value);
  };

  const handleSubmit = async () => {
    if (currentTab === 'basic') {
      if (validateBasicInfo()) {
        setCurrentTab('details');
      }
    } else {
      if (validateBasicInfo() && validateDetails()) {
        try {
          const response = await Request.Post('/api/teacher/lesson', {
            ...formData,
          });
          addLesson(response.data);

          toast.success('Lesson information saved successfully!');
          onOpenChange(false);
          resetForm();
          router.push(`/teacher/${response.data.id}`);
        } catch (err: any) {
          toast.error(
            err?.response?.data?.message ||
              'Failed to save student information. Please try again.'
          );
        }
      } else {
        alert('Please fill in all required fields before submitting.');
      }
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
    setCurrentTab('basic');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px] border-[#d32f2f]/10 bg-background">
        <DialogHeader>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="flex items-center gap-2"
          >
            <motion.div 
              className="rounded-full bg-[#63B3ED]/90 p-2 shadow-md transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <FileText className="h-5 w-5 text-white" />
            </motion.div>
            <DialogTitle className="text-xl font-bold text-[#ec4899]">Create New Lesson</DialogTitle>
          </motion.div>
        </DialogHeader>

        <Tabs
          defaultValue="basic"
          value={currentTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 bg-[#63B3ED]/20">
            <TabsTrigger value="basic" className="data-[state=active]:bg-[#63B3ED]/30 data-[state=active]:text-[#63B3ED] data-[state=active]:font-medium">Basic Info</TabsTrigger>
            <TabsTrigger value="details" className="data-[state=active]:bg-[#63B3ED]/30 data-[state=active]:text-[#63B3ED] data-[state=active]:font-medium">Details</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4 py-4">
            <motion.div 
              initial="hidden" 
              animate="visible" 
              variants={slideUp}
              transition={{ delay: 0.1 }}
            >
              {/* Basic Info Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-[#63B3ED] font-medium">Lesson Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }));
                      if (errors.title) {
                        setErrors((prev) => ({ ...prev, title: undefined }));
                      }
                    }}
                    placeholder="Enter lesson title"
                    className={`border-[#63B3ED]/30 focus-visible:ring-[#63B3ED]/50 ${errors.title ? 'border-red-500' : ''}`}
                  />
                  {errors.title && (
                    <p className="text-sm text-red-500">{errors.title}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="class" className="text-[#63B3ED] font-medium">Class</Label>
                  <Select
                    value={formData.classId}
                    onValueChange={(value) => {
                      setFormData((prev) => ({ ...prev, classId: value }));
                      if (errors.classId) {
                        setErrors((prev) => ({ ...prev, classId: undefined }));
                      }
                    }}
                  >
                    <SelectTrigger
                      className={errors.classId ? 'border-red-500' : ''}
                    >
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      {isLoading ? (
                        <SelectItem value="loading" disabled>
                          Loading classrooms...
                        </SelectItem>
                      ) : classes.length === 0 ? (
                        <SelectItem value="no-classes" disabled>
                          No classrooms available
                        </SelectItem>
                      ) : (
                        classes.map((classroom) => (
                          <SelectItem key={classroom.id} value={classroom.id}>
                            {classroom.class_name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  {errors.classId && (
                    <p className="text-sm text-red-500">{errors.classId}</p>
                  )}
                </div>
              </div>

              {/* Lesson Type */}
              <div className="space-y-2">
                <Label>Lesson Type</Label>
                <Select
                  value={formData.lessonType}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, lessonType: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select lesson type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Group Class" id="group-class">
                      Group Class
                    </SelectItem>
                    <SelectItem value="Private Lesson" id="private-lesson">
                      Private Lesson
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Objectives */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="objectives">Communicative Objectives</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-4 w-4">
                          <HelpCircle className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          Specify the communicative goals students should
                          achieve.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Textarea
                  id="objectives"
                  value={formData.objectives}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      objectives: e.target.value,
                    }));
                    if (errors.objectives) {
                      setErrors((prev) => ({ ...prev, objectives: undefined }));
                    }
                  }}
                  placeholder="Enter the communicative objectives of this lesson"
                  className={`h-20 ${errors.objectives ? 'border-red-500' : ''}`}
                />
                {errors.objectives && (
                  <p className="text-sm text-red-500">{errors.objectives}</p>
                )}
              </div>

              {/* Language Content */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="languageContent">Language Content</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-4 w-4">
                          <HelpCircle className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Describe the language elements to be covered.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Textarea
                  id="languageContent"
                  value={formData.languageContent}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      languageContent: e.target.value,
                    }));
                    if (errors.languageContent) {
                      setErrors((prev) => ({
                        ...prev,
                        languageContent: undefined,
                      }));
                    }
                  }}
                  placeholder="Enter the language content to be covered"
                  className={`h-20 ${errors.languageContent ? 'border-red-500' : ''}`}
                />
                {errors.languageContent && (
                  <p className="text-sm text-red-500">
                    {errors.languageContent}
                  </p>
                )}
              </div>

              {/* Prerequisites - NEW FIELD */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="prerequisites">Prerequisites</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-4 w-4">
                          <HelpCircle className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          Knowledge students should already have for this
                          lesson.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Textarea
                  id="prerequisites"
                  value={formData.prerequisites}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      prerequisites: e.target.value,
                    }));
                    if (errors.prerequisites) {
                      setErrors((prev) => ({
                        ...prev,
                        prerequisites: undefined,
                      }));
                    }
                  }}
                  placeholder="Indicate here what the students already know, which will be useful for the lesson."
                  className={`h-20 ${errors.prerequisites ? 'border-red-500' : ''}`}
                />
                {errors.prerequisites && (
                  <p className="text-sm text-red-500">{errors.prerequisites}</p>
                )}
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="details">
            <div className="space-y-6 pt-4">
              {/* Learning Paths */}
              <div className="space-y-2">
                <Label>Learning Path(s)</Label>
                <Select
                  value={formData.details.learningPath}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      details: {
                        ...prev.details,
                        learningPath: value,
                      },
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select learning path" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">
                      One learning path (with the whole class)
                    </SelectItem>
                    <SelectItem value="multiple">
                      Multiple learning paths (tasks differentiated by group)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Beginning Ritual */}
              <div className="space-y-2">
                <Label>Beginning Ritual</Label>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="begin-review-content"
                        disabled={
                          formData.details.beginningRitual.introduceTheme
                            .enabled
                        }
                        checked={
                          formData.details.beginningRitual.reviewContent.enabled
                        }
                        onCheckedChange={(checked) => {
                          setFormData((prev) => ({
                            ...prev,
                            details: {
                              ...prev.details,
                              beginningRitual: {
                                ...prev.details.beginningRitual,
                                reviewContent: {
                                  ...prev.details.beginningRitual.reviewContent,
                                  enabled: checked as boolean,
                                },
                              },
                            },
                          }));
                          if (!checked) {
                            setErrors((prev) => ({
                              ...prev,
                              beginningReview: undefined,
                            }));
                          }
                        }}
                      />
                      <Label htmlFor="begin-review-content">
                        To review content
                      </Label>
                    </div>
                    {formData.details.beginningRitual.reviewContent.enabled && (
                      <div className="space-y-2">
                        <Textarea
                          placeholder="Specify content to review"
                          value={
                            formData.details.beginningRitual.reviewContent
                              .content
                          }
                          onChange={(e) => {
                            setFormData((prev) => ({
                              ...prev,
                              details: {
                                ...prev.details,
                                beginningRitual: {
                                  ...prev.details.beginningRitual,
                                  reviewContent: {
                                    ...prev.details.beginningRitual
                                      .reviewContent,
                                    content: e.target.value,
                                  },
                                },
                              },
                            }));
                            if (errors.beginningReview) {
                              setErrors((prev) => ({
                                ...prev,
                                beginningReview: undefined,
                              }));
                            }
                          }}
                          className={
                            errors.beginningReview ? 'border-red-500' : ''
                          }
                        />
                        {errors.beginningReview && (
                          <p className="text-sm text-red-500">
                            {errors.beginningReview}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="begin-introduce-theme"
                        disabled={
                          formData.details.beginningRitual.reviewContent.enabled
                        }
                        checked={
                          formData.details.beginningRitual.introduceTheme
                            .enabled
                        }
                        onCheckedChange={(checked) => {
                          setFormData((prev) => ({
                            ...prev,
                            details: {
                              ...prev.details,
                              beginningRitual: {
                                ...prev.details.beginningRitual,
                                introduceTheme: {
                                  ...prev.details.beginningRitual
                                    .introduceTheme,
                                  enabled: checked as boolean,
                                },
                              },
                            },
                          }));
                          if (!checked) {
                            setErrors((prev) => ({
                              ...prev,
                              beginningTheme: undefined,
                            }));
                          }
                        }}
                      />
                      <Label htmlFor="begin-introduce-theme">
                        To introduce the lesson theme
                      </Label>
                    </div>
                    {formData.details.beginningRitual.introduceTheme
                      .enabled && (
                      <div className="space-y-2">
                        <Textarea
                          placeholder="Specify theme introduction"
                          value={
                            formData.details.beginningRitual.introduceTheme
                              .content
                          }
                          onChange={(e) => {
                            setFormData((prev) => ({
                              ...prev,
                              details: {
                                ...prev.details,
                                beginningRitual: {
                                  ...prev.details.beginningRitual,
                                  introduceTheme: {
                                    ...prev.details.beginningRitual
                                      .introduceTheme,
                                    content: e.target.value,
                                  },
                                },
                              },
                            }));
                            if (errors.beginningTheme) {
                              setErrors((prev) => ({
                                ...prev,
                                beginningTheme: undefined,
                              }));
                            }
                          }}
                          className={
                            errors.beginningTheme ? 'border-red-500' : ''
                          }
                        />
                        {errors.beginningTheme && (
                          <p className="text-sm text-red-500">
                            {errors.beginningTheme}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Document Format */}
              <div className="space-y-2">
                <Label>Starter Document Format</Label>
                <div className="space-y-2">
                  {['text', 'image', 'video', 'audio'].map((format) => (
                    <div key={format} className="flex items-center space-x-2">
                      <Checkbox
                        id={format}
                        checked={formData.details.documentFormat === format}
                        onCheckedChange={() => {
                          setFormData((prev) => ({
                            ...prev,
                            details: {
                              ...prev.details,
                              documentFormat: format,
                            },
                          }));
                          if (errors.documentFormat) {
                            setErrors((prev) => ({
                              ...prev,
                              documentFormat: undefined,
                            }));
                          }
                        }}
                      />
                      <Label htmlFor={format}>
                        {format.charAt(0).toUpperCase() + format.slice(1)}
                      </Label>
                    </div>
                  ))}
                </div>
                {errors.documentFormat && (
                  <p className="text-sm text-red-500">
                    {errors.documentFormat}
                  </p>
                )}
              </div>

              {/* Vocabulary Activity */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Label>Vocabulary Activity</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-4 w-4">
                          <HelpCircle className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p className="whitespace-pre-line text-sm">
                          Indicate the vocabulary theme.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <div className="space-y-2">
                  <Textarea
                    placeholder="Indicate the vocabulary theme."
                    value={formData.details.vocabulary}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        details: {
                          ...prev.details,
                          vocabulary: e.target.value,
                        },
                      }));
                      if (errors.endingTheme) {
                        setErrors((prev) => ({
                          ...prev,
                          vocabulary: undefined,
                        }));
                      }
                    }}
                    className={errors.vocabulary ? 'border-red-500' : ''}
                  />
                  {errors.vocabulary && (
                    <p className="text-sm text-red-500">{errors.vocabulary}</p>
                  )}
                </div>
              </div>

              {/* Phonetics Activity */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Label>Phonetics Activity</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-4 w-4">
                          <HelpCircle className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p className="whitespace-pre-line text-sm">
                          Indicate the sound(s) to be worked on.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <div className="space-y-2">
                  <Textarea
                    placeholder="Indicate the sound(s) to be worked on."
                    value={formData.details.phonetics}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        details: {
                          ...prev.details,
                          phonetics: e.target.value,
                        },
                      }));
                      if (errors.endingTheme) {
                        setErrors((prev) => ({
                          ...prev,
                          phonetics: undefined,
                        }));
                      }
                    }}
                    className={errors.phonetics ? 'border-red-500' : ''}
                  />
                  {errors.phonetics && (
                    <p className="text-sm text-red-500">{errors.phonetics}</p>
                  )}
                </div>
              </div>

              {/* Grammar */}
              <div className="space-y-2">
                <Label>Grammar</Label>
                <RadioGroup
                  value={formData.details.grammar || ''} // Add default empty string
                  onValueChange={(value) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      details: {
                        ...prevData.details,
                        grammar: value,
                      },
                    }));
                    if (errors.grammar) {
                      setErrors((prev) => ({
                        ...prev,
                        grammar: undefined,
                      }));
                    }
                  }}
                >
                  <div className="space-y-2">
                    {[
                      {
                        id: 'deductive',
                        label: 'Deductive Approach (rules and examples given)',
                      },
                      {
                        id: 'inductive',
                        label:
                          'Inductive Approach (learners formulate rules based on observation)',
                      },
                    ].map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-2"
                      >
                        <RadioGroupItem value={item.id} id={item.id} />
                        <Label htmlFor={item.id}>{item.label}</Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
                {errors.grammar && (
                  <p className="text-sm text-red-500">{errors.grammar}</p>
                )}
              </div>

              {/* Final Task */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Label>Final Task</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-4 w-4">
                          <HelpCircle className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p className="whitespace-pre-line text-sm">
                          It could be a group activity like a game or role-play,
                          or an individual task like an oral presentation or
                          writing exercise.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <div className="space-y-2">
                  <Textarea
                    id="finaltask"
                    value={formData.details.finalTask}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        details: {
                          ...prev.details,
                          finalTask: e.target.value,
                        },
                      }));
                      if (errors.finaltask) {
                        setErrors((prev) => ({
                          ...prev,
                          finaltask: undefined,
                        }));
                      }
                    }}
                    className={`h-20 ${errors.finaltask ? 'border-red-500' : ''}`}
                  />
                </div>

                {/* Ending Ritual */}
                <div className="space-y-4">
                  <Label>Ending Ritual</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="end-review-content"
                        disabled={
                          formData.details.endingRitual.introduceTheme.enabled
                        }
                        checked={
                          formData.details.endingRitual.reviewContent.enabled
                        }
                        onCheckedChange={(checked) => {
                          setFormData((prev) => ({
                            ...prev,
                            details: {
                              ...prev.details,
                              endingRitual: {
                                ...prev.details.endingRitual,
                                reviewContent: {
                                  ...prev.details.endingRitual.reviewContent,
                                  enabled: checked as boolean,
                                },
                              },
                            },
                          }));
                          if (!checked) {
                            setErrors((prev) => ({
                              ...prev,
                              endingReview: undefined,
                            }));
                          }
                        }}
                      />
                      <Label htmlFor="end-review-content">
                        To review content
                      </Label>
                    </div>
                    {formData.details.endingRitual.reviewContent.enabled && (
                      <div className="space-y-2">
                        <Textarea
                          placeholder="Specify content to review"
                          value={
                            formData.details.endingRitual.reviewContent.content
                          }
                          onChange={(e) => {
                            setFormData((prev) => ({
                              ...prev,
                              details: {
                                ...prev.details,
                                endingRitual: {
                                  ...prev.details.endingRitual,
                                  reviewContent: {
                                    ...prev.details.endingRitual.reviewContent,
                                    content: e.target.value,
                                  },
                                },
                              },
                            }));
                            if (errors.endingReview) {
                              setErrors((prev) => ({
                                ...prev,
                                endingReview: undefined,
                              }));
                            }
                          }}
                          className={
                            errors.endingReview ? 'border-red-500' : ''
                          }
                        />
                        {errors.endingReview && (
                          <p className="text-sm text-red-500">
                            {errors.endingReview}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="end-introduce-theme"
                        disabled={
                          formData.details.endingRitual.reviewContent.enabled
                        }
                        checked={
                          formData.details.endingRitual.introduceTheme.enabled
                        }
                        onCheckedChange={(checked) => {
                          setFormData((prev) => ({
                            ...prev,
                            details: {
                              ...prev.details,
                              endingRitual: {
                                ...prev.details.endingRitual,
                                introduceTheme: {
                                  ...prev.details.endingRitual.introduceTheme,
                                  enabled: checked as boolean,
                                },
                              },
                            },
                          }));
                          if (!checked) {
                            setErrors((prev) => ({
                              ...prev,
                              endingTheme: undefined,
                            }));
                          }
                        }}
                      />
                      <Label htmlFor="end-introduce-theme">
                        To introduce next lesson theme
                      </Label>
                    </div>
                    {formData.details.endingRitual.introduceTheme.enabled && (
                      <div className="space-y-2">
                        <Textarea
                          placeholder="Specify next lesson theme"
                          value={
                            formData.details.endingRitual.introduceTheme.content
                          }
                          onChange={(e) => {
                            setFormData((prev) => ({
                              ...prev,
                              details: {
                                ...prev.details,
                                endingRitual: {
                                  ...prev.details.endingRitual,
                                  introduceTheme: {
                                    ...prev.details.endingRitual.introduceTheme,
                                    content: e.target.value,
                                  },
                                },
                              },
                            }));
                            if (errors.endingTheme) {
                              setErrors((prev) => ({
                                ...prev,
                                endingTheme: undefined,
                              }));
                            }
                          }}
                          className={errors.endingTheme ? 'border-red-500' : ''}
                        />
                        {errors.endingTheme && (
                          <p className="text-sm text-red-500">
                            {errors.endingTheme}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <motion.div 
          className="mt-4 flex justify-end space-x-2"
          initial="hidden" 
          animate="visible" 
          variants={slideUp}
          transition={{ delay: 0.7 }}
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Button
              variant="outline"
              onClick={() => {
                onOpenChange(false);
                resetForm();
              }}
              className="border-[#d32f2f]/30 text-[#d32f2f] hover:bg-[#d32f2f]/10 hover:text-[#d32f2f] hover:border-[#d32f2f]/50"
            >
              Cancel
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Button 
              onClick={handleSubmit}
              className="bg-gradient-to-r from-[#63B3ED] to-[#ec4899] hover:from-[#63B3ED]/90 hover:to-[#ec4899]/90 text-white"
            >
              {currentTab === 'basic' ? 'Next' : 'Save Lesson'}
            </Button>
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
