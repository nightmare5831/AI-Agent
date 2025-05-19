'use client';

import { useState, useEffect } from 'react';
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
import { HelpCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useClasses } from '@/components/providers/classes-context';

interface EditLessonDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lessonData: any | null;
  onSave: (lessonData: any) => void;
}

interface Teacher {
  email: string;
  full_name: string;
}

interface Classroom {
  id: string;
  class_name: string;
  teacher: Teacher;
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
  id: string;
  title: string;
  classroom: Classroom;
  lessontype: string;
  objectives: string;
  languagecontent: string;
  prerequisites: string;
  learningpath: string;
  beginning_ritual: BeginningRitual;
  ending_ritual: EndingRitual;
  document_type: string;
  document_format: string;
  grammar: string;
  vocabulary: string;
  phonetics: string;
  finaltask: string;
}

const initialFormData: FormData = {
  id: '',
  title: '',
  classroom: {
    id: '',
    class_name: '',
    teacher: {
      email: '',
      full_name: '',
    },
  },
  lessontype: '',
  objectives: '',
  languagecontent: '',
  prerequisites: '',
  learningpath: '',
  beginning_ritual: {
    reviewContent: {
      enabled: false,
      content: '',
    },
    introduceTheme: {
      enabled: false,
      content: '',
    },
  },
  document_type: '',
  document_format: '',
  grammar: '',
  vocabulary: '',
  phonetics: '',
  finaltask: '',
  ending_ritual: {
    reviewContent: {
      enabled: false,
      content: '',
    },
    introduceTheme: {
      enabled: false,
      content: '',
    },
  },
};

export function EditLessonDialog({
  open,
  onOpenChange,
  lessonData,
  onSave,
}: EditLessonDialogProps): JSX.Element {
  const { classes, fetchClasses } = useClasses();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isBalanced, setIsBalanced] = useState(false);
  const [isNoSkills, setIsNoSkills] = useState(false);
  const [isReadingComprehension, setIsReadingComprehension] = useState(false);
  const [isListeningComprehension, setIsListeningComprehension] =
    useState(false);
  const [isWritingProduction, setIsWritingProduction] = useState(false);
  const [isSpeakingProduction, setIsSpeakingProduction] = useState(false);
  const [isWrittenInteraction, setIsWrittenInteraction] = useState(false);
  const [isOralInteraction, setIsOralInteraction] = useState(false);
  const [isMediation, setIsMediation] = useState(false);
  const [currentTab, setCurrentTab] = useState('basic');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchClassrooms = async () => {
      if (open) {
        try {
          await fetchClasses();
        } catch (error) {
          console.error('Error fetching classrooms:', error);
        }
      }
    };

    fetchClassrooms();

    if (lessonData) {
      setFormData({
        id: lessonData.id,
        title: lessonData.title,
        classroom: lessonData.classroom,
        lessontype: lessonData.lessontype,
        objectives: lessonData.objectives,
        languagecontent: lessonData.languagecontent,
        prerequisites: lessonData.prerequisites,
        learningpath: lessonData.learningpath,
        beginning_ritual: lessonData.beginning_ritual,
        document_type: lessonData.document_type,
        document_format: lessonData.document_format,
        grammar: lessonData.grammar,
        vocabulary: lessonData.vocabulary,
        phonetics: lessonData.phonetics,
        finaltask: lessonData.finaltask,
        ending_ritual: lessonData.ending_ritual,
      });
    }
  }, []); //eslint-disable-line

  const validateBasicInfo = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Lesson title is required';
    }

    if (!formData.classroom.id) {
      newErrors.classId = 'Class selection is required';
    }

    if (!formData.objectives.trim()) {
      newErrors.objectives = 'Communicative objectives are required';
    }

    if (!formData.languagecontent.trim()) {
      newErrors.languagecontent = 'Language content is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateDetails = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.document_format) {
      newErrors.document_format = 'Document format is required';
    }

    if (formData.grammar.length === 0) {
      newErrors.grammar = 'At least one grammar type must be selected';
    }

    if (formData.vocabulary.length === 0) {
      newErrors.vocabluary = 'At least one vocabluary type must be selected';
    }

    if (formData.phonetics.length === 0) {
      newErrors.phonetics = 'At least one phonetics type must be selected';
    }

    if (!formData.finaltask) {
      newErrors.finaltask = 'Final task is required';
    }

    if (
      formData.beginning_ritual.reviewContent.enabled &&
      !formData.beginning_ritual.reviewContent.content.trim()
    ) {
      newErrors.beginningReview =
        'Beginning ritual review content is required when enabled';
    }

    if (
      formData.beginning_ritual.introduceTheme.enabled &&
      !formData.beginning_ritual.introduceTheme.content.trim()
    ) {
      newErrors.beginningTheme =
        'Beginning ritual theme content is required when enabled';
    }

    if (
      formData.ending_ritual.reviewContent.enabled &&
      !formData.ending_ritual.reviewContent.content.trim()
    ) {
      newErrors.endingReview =
        'Ending ritual review content is required when enabled';
    }

    if (
      formData.ending_ritual.introduceTheme.enabled &&
      !formData.ending_ritual.introduceTheme.content.trim()
    ) {
      newErrors.endingTheme =
        'Ending ritual theme content is required when enabled';
    }

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
        onSave(formData);
        onOpenChange(false);
        resetForm();
      }
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
    setCurrentTab('basic');
    setIsBalanced(false);
    setIsNoSkills(false);
    setIsReadingComprehension(false);
    setIsListeningComprehension(false);
    setIsWritingProduction(false);
    setIsSpeakingProduction(false);
    setIsOralInteraction(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="h-[80vh] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit New Lesson</DialogTitle>
        </DialogHeader>

        <Tabs
          value={currentTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <div className="space-y-4 pt-4">
              {/* Basic Info Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Lesson Title</Label>
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
                    className={errors.title ? 'border-red-500' : ''}
                  />
                  {errors.title && (
                    <p className="text-sm text-red-500">{errors.title}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="class">Class</Label>
                  <Select
                    value={formData.classroom.id}
                    onValueChange={(value) => {
                      setFormData((prev) => ({
                        ...prev,
                        classroom: {
                          ...prev.classroom,
                          id: value,
                        },
                      }));
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
                  value={formData.lessontype}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, lessontype: value }))
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
                  value={formData.languagecontent}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      languagecontent: e.target.value,
                    }));
                    if (errors.languagecontent) {
                      setErrors((prev) => ({
                        ...prev,
                        languagecontent: undefined,
                      }));
                    }
                  }}
                  placeholder="Enter the language content to be covered"
                  className={`h-20 ${errors.languagecontent ? 'border-red-500' : ''}`}
                />
                {errors.languagecontent && (
                  <p className="text-sm text-red-500">
                    {errors.languagecontent}
                  </p>
                )}
              </div>

              {/* Prerequisites */}
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="flex flex-wrap gap-2">
                    <div className="space-y-2">
                      <Label htmlFor="title">Prerequisites</Label>
                      <Input
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
                        placeholder="Enter prerequisites"
                        className={errors.title ? 'border-red-500' : ''}
                      />
                      {errors.title && (
                        <p className="text-sm text-red-500">
                          {errors.prerequisites}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="details">
            <div className="space-y-6 pt-4">
              {/* Learning Paths */}
              <div className="space-y-2">
                <Label>Learning Path(s)</Label>
                <Select
                  value={formData.learningpath}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      learningpath: value,
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
                        checked={
                          formData.beginning_ritual.reviewContent.enabled
                        }
                        onCheckedChange={(checked) => {
                          setFormData((prev) => ({
                            ...prev,
                            beginning_ritual: {
                              ...prev.beginning_ritual,
                              reviewContent: {
                                ...prev.beginning_ritual.reviewContent,
                                enabled: checked as boolean,
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
                    {formData.beginning_ritual.reviewContent.enabled && (
                      <div className="space-y-2">
                        <Textarea
                          placeholder="Specify content to review"
                          value={
                            formData.beginning_ritual.reviewContent.content
                          }
                          onChange={(e) => {
                            setFormData((prev) => ({
                              ...prev,
                              beginning_ritual: {
                                ...prev.beginning_ritual,
                                reviewContent: {
                                  ...prev.beginning_ritual.reviewContent,
                                  content: e.target.value,
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
                        checked={
                          formData.beginning_ritual.introduceTheme.enabled
                        }
                        onCheckedChange={(checked) => {
                          setFormData((prev) => ({
                            ...prev,
                            beginning_ritual: {
                              ...prev.beginning_ritual,
                              introduceTheme: {
                                ...prev.beginning_ritual.introduceTheme,
                                enabled: checked as boolean,
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
                    {formData.beginning_ritual.introduceTheme.enabled && (
                      <div className="space-y-2">
                        <Textarea
                          placeholder="Specify theme introduction"
                          value={
                            formData.beginning_ritual.introduceTheme.content
                          }
                          onChange={(e) => {
                            setFormData((prev) => ({
                              ...prev,
                              beginning_ritual: {
                                ...prev.beginning_ritual,
                                introduceTheme: {
                                  ...prev.beginning_ritual.introduceTheme,
                                  content: e.target.value,
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
                        checked={formData.document_format === format}
                        onCheckedChange={() => {
                          setFormData((prev) => ({
                            ...prev,
                            document_format: format,
                          }));
                          if (errors.document_format) {
                            setErrors((prev) => ({
                              ...prev,
                              document_format: undefined,
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
                {errors.document_format && (
                  <p className="text-sm text-red-500">
                    {errors.document_format}
                  </p>
                )}
              </div>

              {/* Grammar */}
              <div className="space-y-2">
                <Label>Grammar</Label>
                <RadioGroup
                  value={formData.grammar || ''} // Add default empty string
                  onValueChange={(value) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      grammar: value,
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
                        id: 'guided',
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
              {/* Vocabulary */}
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="flex flex-wrap gap-2">
                    <div className="space-y-2">
                      <Label htmlFor="title">Lesson Title</Label>
                      <Input
                        id="vocabulary"
                        value={formData.vocabulary}
                        onChange={(e) => {
                          setFormData((prev) => ({
                            ...prev,
                            vocabulary: e.target.value,
                          }));
                          if (errors.vocabulary) {
                            setErrors((prev) => ({
                              ...prev,
                              vocabulary: undefined,
                            }));
                          }
                        }}
                        placeholder="Enter vocabulary"
                        className={errors.vocabulary ? 'border-red-500' : ''}
                      />
                      {errors.vocabulary && (
                        <p className="text-sm text-red-500">
                          {errors.vocabulary}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Phonetics  */}
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="flex flex-wrap gap-2">
                    <div className="space-y-2">
                      <Label htmlFor="title">Lesson Title</Label>
                      <Input
                        id="phonetics"
                        value={formData.phonetics}
                        onChange={(e) => {
                          setFormData((prev) => ({
                            ...prev,
                            phonetics: e.target.value,
                          }));
                          if (errors.phonetics) {
                            setErrors((prev) => ({
                              ...prev,
                              phonetics: undefined,
                            }));
                          }
                        }}
                        placeholder="Enter phonetics"
                        className={errors.phonetics ? 'border-red-500' : ''}
                      />
                      {errors.phonetics && (
                        <p className="text-sm text-red-500">
                          {errors.phonetics}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
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
                    value={formData.finaltask}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        finaltask: e.target.value,
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
                        checked={formData.ending_ritual.reviewContent.enabled}
                        onCheckedChange={(checked) => {
                          setFormData((prev) => ({
                            ...prev,
                            ending_ritual: {
                              ...prev.ending_ritual,
                              reviewContent: {
                                ...prev.ending_ritual.reviewContent,
                                enabled: checked as boolean,
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
                    {formData.ending_ritual.reviewContent.enabled && (
                      <div className="space-y-2">
                        <Textarea
                          placeholder="Specify content to review"
                          value={formData.ending_ritual.reviewContent.content}
                          onChange={(e) => {
                            setFormData((prev) => ({
                              ...prev,
                              ending_ritual: {
                                ...prev.ending_ritual,
                                reviewContent: {
                                  ...prev.ending_ritual.reviewContent,
                                  content: e.target.value,
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
                        checked={formData.ending_ritual.introduceTheme.enabled}
                        onCheckedChange={(checked) => {
                          setFormData((prev) => ({
                            ...prev,
                            ending_ritual: {
                              ...prev.ending_ritual,
                              introduceTheme: {
                                ...prev.ending_ritual.introduceTheme,
                                enabled: checked as boolean,
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
                    {formData.ending_ritual.introduceTheme.enabled && (
                      <div className="space-y-2">
                        <Textarea
                          placeholder="Specify next lesson theme"
                          value={formData.ending_ritual.introduceTheme.content}
                          onChange={(e) => {
                            setFormData((prev) => ({
                              ...prev,
                              ending_ritual: {
                                ...prev.ending_ritual,
                                introduceTheme: {
                                  ...prev.ending_ritual.introduceTheme,
                                  content: e.target.value,
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

        <div className="mt-4 flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={() => {
              onOpenChange(false);
              resetForm();
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {currentTab === 'basic' ? 'Next' : 'Save Lesson'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
