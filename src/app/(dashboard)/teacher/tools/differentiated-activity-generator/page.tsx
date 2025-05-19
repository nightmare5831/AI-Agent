'use client';
import { useState, useRef, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import fs from 'fs';
import path from 'path';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid'; // You'll need to install this: npm install uuid
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { FileText, Upload, Wand2 } from 'lucide-react';
import { useClasses } from '@/components/providers/classes-context';
import { useLanguage } from '@/components/teacher/language-selector';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Header } from '@/components/teacher/differentiated-activity-generator/Header';
import { LessonPlanDisplay } from '@/components/teacher/tools/lesson-planner/lesson-plan-display';
import { languageMaps } from '@/lib/constants/languageMaps';

interface FormData {
  classroom_id: string;
  generation_mode: string;
  exercise_type: string;
  simplify: boolean;
  skill: string;
  theme: string;
  modification: {
    modify: boolean;
    keep: boolean;
  };
  select_language: string;
  personalization: {
    adapt_to_interests: boolean;
    ai_automated_correction: boolean;
    send_to_students: boolean;
  };
  uploadedFile?: File;
}

const initialFormData: FormData = {
  classroom_id: '',
  generation_mode: '',
  exercise_type: '',
  simplify: false,
  skill: '',
  theme: '',
  modification: {
    modify: true,
    keep: false,
  },
  select_language: '',
  personalization: {
    adapt_to_interests: false,
    ai_automated_correction: false,
    send_to_students: false,
  },
  uploadedFile: undefined,
};

export default function DifferentiatedActivityGenerator() {
  const { classes, fetchClasses } = useClasses();
  const [isSimplify, setIsSimplify] = useState(false);
  const { t, selectedLanguage } = useLanguage();
  const [isSkill, setIsSkill] = useState(false);
  const [isTheme, setIsTheme] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLanguage, setIsLanguage] = useState(false);
  const [streamedText, setStreamedText] = useState('');
  const [aiCorrection, setAiCorrection] = useState(false);
  const [sendToStudents, setSendToStudents] = useState(false);
  const [exerciseType, setExerciseType] = useState<string>('');
  const [adaptToInterests, setAdaptToInterests] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [activityFile, setActivityFile] = useState(null);
  const [lessonFile, setLessonFile] = useState(null);
  const activityInputRef = useRef(null);
  const lessonInputRef = useRef(null);

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  const isLanguageExercise = exerciseType === 'language';

  const validateFunc = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.classroom_id.trim())
      newErrors.classroom = 'Classroom Name is required.';
    if (!formData.classroom_id.trim() || !formData.exercise_type)
      newErrors.exercise_type = 'Exercise type is required.';
    if (isSkill && !formData.skill) {
      newErrors.skill = 'Skill is required.';
    }
    if (isLanguage && formData.select_language === '') {
      newErrors.select_language = 'First language is required.';
    }
    if (
      !formData.classroom_id.trim() &&
      !formData.simplify &&
      !formData.skill &&
      !formData.theme
    )
      newErrors.modify_type = 'Select the types of modifications to apply.';
    return Object.keys(newErrors).length === 0;
  };

  const handleAdaptToInterestsChange = (checked: boolean) => {
    setAdaptToInterests(checked);
    setFormData((prev) => ({
      ...prev,
      personalization: {
        ...prev.personalization,
        adapt_to_interests: !prev.personalization.adapt_to_interests,
      },
    }));
    // Check if both options are now enabled
    if (checked && aiCorrection) {
      toast.success(
        "Teacher Validation Required.\nBoth personalization features are enabled. This will trigger teacher validation before sending to student's space."
      );
    }
  };

  const handleAiCorrectionChange = (checked: boolean) => {
    setAiCorrection(checked);
    setFormData((prev) => ({
      ...prev,
      personalization: {
        ...prev.personalization,
        ai_automated_correction: !prev.personalization.ai_automated_correction,
      },
    }));

    // Check if both options are now enabled
    if (checked && adaptToInterests) {
      toast.success(
        "Teacher Validation Required.\nBoth personalization features are enabled. This will trigger teacher validation before sending to student's space."
      );
    }
  };

  const handleSendToStudents = (checked: boolean) => {
    setSendToStudents(checked);
    setFormData((prev) => ({
      ...prev,
      personalization: {
        ...prev.personalization,
        send_to_students: !prev.personalization.send_to_students,
      },
    }));

    // Check if both options are now enabled
    if (checked && adaptToInterests) {
      toast.success(
        "Teacher Validation Required.\nBoth personalization features are enabled. This will trigger teacher validation before sending to student's space."
      );
    }
  };

  const onHandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateFunc()) {
      toast.error('Please fill in all the required fields.');
      return;
    }
    const classData = classes.find((c: any) => c.id === formData.classroom_id);
    const formDataToSend = new FormData();
    if (activityFile) {
      formDataToSend.append('file', activityFile);
    }
    const updatedFormData = {
      ...formData,
      language: selectedLanguage,
      class: classData,
    };
    formDataToSend.append('data', JSON.stringify(updatedFormData));
    await senderFunc(formDataToSend);
  };

  const senderFunc = async (data: any) => {
    try {
      setIsLoading(true);
      setStreamedText('');
      const response = await fetch(
        '/api/teacher/differentiated-activity-generator',
        {
          method: 'POST',
          body: data,
        }
      );

      if (!response.ok) {
        throw new Error('Failed to generate lesson plan');
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
              break;
            }

            try {
              const { content } = JSON.parse(data);
              setStreamedText((prev) => prev + content);
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
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleActivityButtonClick = (e: any) => {
    e.preventDefault(); // Prevent form submission/page refresh
    activityInputRef.current.click();
  };

  const handleLessonButtonClick = (e: any) => {
    e.preventDefault(); // Prevent form submission/page refresh
    lessonInputRef.current.click();
  };

  const handleActivityFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setActivityFile(file);
      // Optional: Add file name display or other UI feedback
    }
  };

  const handleLessonFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setLessonFile(file);
      // Optional: Add file name display or other UI feedback
    }
  };

  const capitalizeFirstLetter = (str: string): string => {
    if (!str || str.length === 0) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const resetFormData = () => {
    setFormData(initialFormData);
    setActivityFile(null);
    setLessonFile(null);
    setIsSimplify(false);
    setIsSkill(false);
    setIsTheme(false);
    setIsLanguage(false);
    setIsLoading(false);
    setStreamedText('');
    setAdaptToInterests(false);
    setAiCorrection(false);
    setSendToStudents(false);
    setExerciseType('');
    setErrors({});
    setAdaptToInterests(false);
  };

  useEffect(() => {
    if (
      isTheme ||
      formData.exercise_type === 'language' ||
      formData.select_language !== ''
    ) {
      setIsSkill(false);
      setFormData((prev) => ({ ...prev, skill: '' }));
    }
  }, [isTheme, formData.exercise_type, formData.select_language]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="container mx-auto max-w-7xl flex-1 px-4 py-8">
        <div className="mb-8">
          <p className="text-muted-foreground">
            {t(
              'differentiated_activity_generator.createCustomizedActivitiesDescription'
            )}
          </p>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Left column - Form components */}
          <div className="w-full space-y-6 lg:w-1/2">
            <form>
              <div className="form-section">
                <h2 className="section-title">
                  {t('differentiated_activity_generator.class')}
                </h2>
                <Select
                  value={formData.classroom_id}
                  onValueChange={(value) => {
                    setFormData((prev) => ({
                      ...prev,
                      classroom_id: value,
                    }));
                    if (errors.class_id) {
                      setErrors((prev) => ({
                        ...prev,
                        classroom_id: undefined,
                      }));
                    }
                  }}
                >
                  <SelectTrigger className="w-full md:w-[300px]">
                    <SelectValue
                      placeholder={t(
                        'differentiated_activity_generator.selectClass'
                      )}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((item: any) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.class_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="form-section">
                <h2 className="section-title">
                  {t('differentiated_activity_generator.generationMode')}
                </h2>

                <Tabs defaultValue="text" className="w-full">
                  <TabsList className="grid w-full max-w-md grid-cols-2">
                    <TabsTrigger value="upload">
                      {t('differentiated_activity_generator.uploadContent')}
                    </TabsTrigger>
                    <TabsTrigger value="text">
                      {t('differentiated_activity_generator.writeOrPaste')}
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="upload" className="pt-4">
                    {(activityFile || lessonFile) && (
                      <div className="mt-3 w-full max-w-md rounded-md bg-blue-50 p-3 text-left">
                        <h4 className="mb-1 font-medium text-blue-800">
                          {t('differentiated_activity_generator.selectedFile')}:
                        </h4>
                        {activityFile && (
                          <div className="flex items-center gap-2 text-sm text-blue-700">
                            <FileText className="h-4 w-4" />
                            <span className="truncate font-medium">
                              {activityFile.name}
                            </span>
                            <span className="text-xs text-blue-600">
                              ({(activityFile.size / 1024).toFixed(1)} KB)
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="ml-auto h-6 text-xs text-red-500 hover:text-red-700"
                              onClick={(e) => {
                                e.preventDefault();
                                setActivityFile(null);
                              }}
                            >
                              {t('differentiated_activity_generator.remove')}
                            </Button>
                          </div>
                        )}
                        {lessonFile && (
                          <div className="flex items-center gap-2 text-sm text-blue-700">
                            <FileText className="h-4 w-4" />
                            <span className="truncate font-medium">
                              {lessonFile.name}
                            </span>
                            <span className="text-xs text-blue-600">
                              ({(lessonFile.size / 1024).toFixed(1)} KB)
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="ml-auto h-6 text-xs text-red-500 hover:text-red-700"
                              onClick={(e) => {
                                e.preventDefault();
                                setLessonFile(null);
                              }}
                            >
                              {t('differentiated_activity_generator.remove')}
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                    <div className="grid gap-4">
                      <div className="flex flex-col items-center justify-center space-y-2 rounded-lg border border-dashed bg-muted p-4 text-center">
                        <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
                        <input
                          type="file"
                          ref={activityInputRef}
                          onChange={handleActivityFileChange}
                          accept=".pdf,.docx,.jpg,.jpeg,.png,.bmp"
                          style={{ display: 'none' }}
                        />
                        <input
                          type="file"
                          ref={lessonInputRef}
                          onChange={handleLessonFileChange}
                          accept=".pdf,.docx,.jpg,.jpeg,.png,.bmp"
                          style={{ display: 'none' }}
                        />
                        <div>
                          <Button
                            variant="outline"
                            className="relative mb-2"
                            onClick={handleActivityButtonClick}
                          >
                            {t(
                              'differentiated_activity_generator.uploadAnActivity'
                            )}
                            {/* <span className="silver-badge ml-2">Silver</span> */}
                          </Button>
                        </div>
                        <p className="mt-4 text-sm text-muted-foreground">
                          {t(
                            'differentiated_activity_generator.uploadAnActivityDescription'
                          )}
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="text" className="pt-4">
                    <div className="space-y-4">
                      <div className="grid w-full items-center gap-1.5">
                        <textarea
                          name="generation_mode"
                          placeholder={t(
                            'differentiated_activity_generator.pasteDescription'
                          )}
                          className="flex min-h-[180px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={formData.generation_mode}
                          onChange={(e) => {
                            setFormData((prev) => ({
                              ...prev,
                              generation_mode: e.target.value,
                            }));
                            if (errors.generation_mode) {
                              setErrors((prev) => ({
                                ...prev,
                                generation_mode: undefined,
                              }));
                            }
                          }}
                        />
                        <p className="text-right text-xs text-muted-foreground">
                          0/800 words
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              <div className="form-section">
                <h2 className="section-title">
                  {t(
                    'differentiated_activity_generator.excerciseConfiguration'
                  )}
                </h2>

                <div className="space-y-6">
                  <div>
                    <Label className="mb-2 block">
                      {t('differentiated_activity_generator.baseActivity')}
                    </Label>
                    <Select
                      value={formData.exercise_type}
                      onValueChange={(value) => {
                        setExerciseType(value);
                        setFormData((prev) => ({
                          ...prev,
                          exercise_type: value,
                        }));
                        if (value === 'communicative-skills') {
                          formData.select_language = '';
                          setIsLanguage(false);
                          setFormData((prev) => ({
                            ...prev,
                            select_language: '',
                          }));
                        }
                      }}
                    >
                      <SelectTrigger className="w-full md:w-[300px]">
                        <SelectValue
                          placeholder={t(
                            'differentiated_activity_generator.baseActivity'
                          )}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="language">
                          {t(
                            'differentiated_activity_generator.languageExercise'
                          )}
                        </SelectItem>
                        <SelectItem value="communicative-skills">
                          {t(
                            'differentiated_activity_generator.communicativeSkills'
                          )}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="mb-3 block">
                      {t(
                        'differentiated_activity_generator.typesOfModifications'
                      )}
                    </Label>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="simplify"
                            checked={isSimplify}
                            onClick={() => {
                              setFormData((prev) => ({
                                ...prev,
                                simplify: !prev.simplify,
                              }));
                              setIsSimplify(!isSimplify);
                            }}
                          />
                          <label
                            htmlFor="simplify"
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {t('differentiated_activity_generator.simplify')}
                          </label>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              disabled={
                                isTheme ||
                                formData.exercise_type === 'language' ||
                                formData.select_language !== ''
                              }
                              id="adapt-skill"
                              checked={isSkill}
                              onClick={() => {
                                setIsSkill(!isSkill);
                                setFormData((prev) => ({
                                  ...prev,
                                  skill: '',
                                }));
                              }}
                            />
                            <label
                              htmlFor="adapt-skill"
                              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {t(
                                'differentiated_activity_generator.adaptToSkill'
                              )}
                            </label>
                          </div>

                          <Select
                            disabled={!isSkill}
                            value={formData.skill}
                            onValueChange={(value) =>
                              setFormData((prev) => ({ ...prev, skill: value }))
                            }
                          >
                            <SelectTrigger className="ml-6 w-full md:w-[200px]">
                              <SelectValue
                                placeholder={t(
                                  `differentiated_activity_generator.selectSkill`
                                )}
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="writing">
                                {t(
                                  'differentiated_activity_generator.writingProduction'
                                )}
                              </SelectItem>
                              <SelectItem value="speaking">
                                {t(
                                  'differentiated_activity_generator.speakingProduction'
                                )}
                              </SelectItem>
                              <SelectItem value="reading">
                                {t(
                                  'differentiated_activity_generator.readingComprehension'
                                )}
                              </SelectItem>
                              <SelectItem value="listening">
                                {t(
                                  'differentiated_activity_generator.listeningComprehension'
                                )}
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              disabled={isSkill}
                              id="adapt-theme"
                              checked={isTheme}
                              onClick={() => {
                                setIsTheme(!isTheme);
                                setFormData((prev) => ({
                                  ...prev,
                                  theme: '',
                                }));
                              }}
                            />
                            <label
                              htmlFor="adapt-theme"
                              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {t(
                                'differentiated_activity_generator.adaptToTheme'
                              )}
                            </label>
                          </div>

                          <Input
                            value={formData.theme}
                            name="theme"
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                theme: e.target.value,
                              }))
                            }
                            placeholder={t(
                              'differentiated_activity_generator.themeExample'
                            )}
                            className="ml-6 w-full md:w-[200px]"
                            disabled={!isTheme}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <Label className="mb-2 block">
                      {t(
                        'differentiated_activity_generator.specificModifications'
                      )}
                    </Label>
                    <div className="space-y-4">
                      {/* Reading/Listening Specific Options - Required when Reading/Listening is selected */}
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="mb-2 text-sm font-medium">
                            {t(
                              'differentiated_activity_generator.readingListeningDescription'
                            )}
                          </p>
                        </div>
                        <RadioGroup
                          defaultValue="modify"
                          className="ml-4"
                          disabled={
                            formData.exercise_type === 'language' ||
                            (!formData.skill &&
                              !formData.theme &&
                              !formData.simplify)
                          }
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="modify"
                              id="modify"
                              onClick={() =>
                                setFormData((prev) => ({
                                  ...prev,
                                  modification: {
                                    ...prev.modification,
                                    modify: true,
                                    keep: false,
                                  },
                                }))
                              }
                            />
                            <Label htmlFor="modify">
                              {t(
                                'differentiated_activity_generator.modifyTextOrTranscript'
                              )}
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              disabled={isSkill || isTheme}
                              value="keep"
                              id="keep"
                              onClick={() =>
                                setFormData((prev) => ({
                                  ...prev,
                                  modification: {
                                    ...prev.modification,
                                    modify: false,
                                    keep: true,
                                  },
                                }))
                              }
                            />
                            <Label htmlFor="keep">
                              {t(
                                'differentiated_activity_generator.keepTextOrTranscript'
                              )}
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {/* Language Exercise Specific Options - Required when Language Exercise is selected */}
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="mb-2 text-sm font-medium">
                            {t(
                              'differentiated_activity_generator.languageExercisesDescription'
                            )}
                          </p>
                        </div>
                        <div className="ml-4 flex items-center space-x-2">
                          <Checkbox
                            id="contrastive"
                            disabled={
                              formData.exercise_type === 'communicative-skills'
                            }
                            checked={isLanguage}
                            aria-required={isLanguageExercise}
                            onClick={() => {
                              setIsLanguage(!isLanguage);
                              setFormData((prev) => ({
                                ...prev,
                                select_language: '',
                              }));
                            }}
                          />
                          <label
                            htmlFor="contrastive"
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {t(
                              'differentiated_activity_generator.addAContrastiveApproach'
                            )}
                          </label>
                        </div>
                        <Select
                          disabled={!isLanguage}
                          value={formData.select_language}
                          onValueChange={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              select_language: value,
                            }))
                          }
                        >
                          <SelectTrigger className="ml-8 mt-2 w-full md:w-[200px]">
                            <SelectValue
                              placeholder={t(
                                'differentiated_activity_generator.firstLanguage'
                              )}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {languageMaps
                              .sort((f: string, s: string) => (f > s ? 1 : -1))
                              .map((e: string, i: number) => {
                                return (
                                  <SelectItem key={'language_' + i} value={e}>
                                    {capitalizeFirstLetter(e)}
                                  </SelectItem>
                                );
                              })}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h2 className="section-title">
                  {t('differentiated_activity_generator.personalization')}
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="interests"
                      checked={adaptToInterests}
                      onCheckedChange={handleAdaptToInterestsChange}
                    />
                    <Label htmlFor="interests">
                      {t(
                        'differentiated_activity_generator.adaptToStudentsInterests'
                      )}
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="ai-correction"
                      checked={aiCorrection}
                      onCheckedChange={handleAiCorrectionChange}
                    />
                    <Label htmlFor="ai-correction">
                      {t('differentiated_activity_generator.aiCorrection')}
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="send-to-ttudents"
                      checked={sendToStudents}
                      onCheckedChange={handleSendToStudents}
                    />
                    <Label htmlFor="ai-correction">
                      {t('differentiated_activity_generator.sendToStudents')}
                    </Label>
                  </div>

                  {adaptToInterests && aiCorrection && (
                    <div className="mt-2 rounded-md border border-yellow-200 bg-yellow-50 p-3">
                      <p className="text-sm text-yellow-700">
                        {t(
                          'differentiated_activity_generator.bothOptionsCaution'
                        )}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* Right column - Preview and action buttons */}
          <div className="w-full space-y-6 lg:sticky lg:top-6 lg:w-1/2">
            <Card className="h-full overflow-y-auto">
              <LessonPlanDisplay
                plan={streamedText}
                showTitle="activity"
                isLoading={isLoading}
                mainTitle="activityTitle"
              />
            </Card>
            <div className="flex flex-col gap-3">
              <Button
                className="w-full bg-education-indigo hover:bg-education-indigo/90"
                onClick={onHandleSubmit}
              >
                <Wand2 className="mr-2 h-4 w-4" />
                {t(
                  'differentiated_activity_generator.generateDifferentiatedActivity'
                )}
              </Button>

              <Button
                variant="outline"
                className="w-full"
                onClick={resetFormData}
              >
                {t('differentiated_activity_generator.resetForm')}
              </Button>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-12 border-t py-6">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex flex-col items-center justify-between sm:flex-row">
            <p className="text-sm text-muted-foreground">
              © 2025 {t('differentiated_activity_generator.footerSentence')}.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
