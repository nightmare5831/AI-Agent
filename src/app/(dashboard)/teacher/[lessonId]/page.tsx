'use client';
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { useParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LessonPlanDisplay } from '@/components/teacher/tools/lesson-planner/lesson-plan-display';
import { Button } from '@/components/ui/button';
import {
  Loader2,
  Route,
  Sunrise,
  FileType,
  Video,
  GraduationCap,
  BookOpenCheck,
  BookOpen,
  Users2,
  Target,
  Languages,
  Award,
  MessageCircle,
  CheckCircle2,
  Sunset,
} from 'lucide-react';
import { useLanguage } from '@/components/teacher/language-selector';
import { useLessons } from '@/components/providers/lessons-provider';
import Loading from '@/components/logo-loading';
import { EditLessonDialog } from '@/components/teacher/lesson-planner/edit-lesson-dialog';
import { toast } from 'sonner';

type SkillType = 'listening_comprehension' | 'writing_production' | 'balanced';
type VocabularyType = 'identification' | 'vocabulary';
type PhoneticsType = 'spotting' | 'discrimination' | 'pronunciation';
type Ritual = {
  enabled: boolean;
  content: string;
};

type BeginningRitual = {
  reviewContent: Ritual;
  introduceTheme: Ritual;
};

type LessonData = {
  id: string;
  title: string;
  classroom: any[];
  lessontype: string;
  objectives: string;
  languagecontent: string;
  prerequisites: string;
  learningpath: string;
  beginning_ritual: BeginningRitual;
  document_format: string;
  grammar: string;
  vocabulary: string;
  phonetics: string;
  finaltask: string;
  ending_ritual: BeginningRitual;
  students: any[];
};

export default function LessonPlannerPage({
  params,
}: {
  params: { id: string };
}) {
  const searchParams = useParams();
  const { lessons, setLessons, fetchLessons } = useLessons();
  const [streamedText, setStreamedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState('basic');
  const [lessonData, setLessonData] = useState<any | null>(null);
  const [isLoadingLesson, setIsLoadingLesson] = useState(true);
  const [editingLesson, setEditingLesson] = useState<any | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { t, selectedLanguage } = useLanguage();
  const lessonId = searchParams.lessonId;

  useEffect(() => {
    const fetchLessonData = async () => {
      if (!lessonId) {
        setIsLoadingLesson(false);
        return;
      }
      try {
        await fetchLessons();
        const response = await fetch(`/api/teacher/lesson/${lessonId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch lesson data');
        }

        const data = await response.json();
        setLessonData({ ...data.data, language: selectedLanguage });
      } catch (error) {
        console.error('Error fetching lesson:', error);
      } finally {
        setIsLoadingLesson(false);
      }
    };

    fetchLessonData();
  }, [lessonId]); // eslint-disable-line

  const handleTabChange = (value: string) => {
    setCurrentTab(value);
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

  const ContentBox = ({ children }: { children: React.ReactNode }) => (
    <div className="rounded-lg border border-border/50 bg-muted/10 p-3 transition-colors hover:bg-muted/20">
      {children}
    </div>
  );

  function formatArrayToText(arr: string, replaceChar = '-') {
    // Replace specified character with space and capitalize each word
    return arr
      .split(replaceChar)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  const handleEdit = () => {
    const lessonData = lessons.find((l: any) => l.id === lessonId);
    if (lessonData) {
      setIsEditDialogOpen(true);
      setEditingLesson(lessonData);
    }
  };

  const handleSaveEdit = async (updatedLesson: any) => {
    try {
      const response = await fetch(`/api/teacher/lesson/${updatedLesson.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedLesson),
      });
      if (!response.ok) {
        throw new Error('Failed to update lesson');
      }
      toast.success('Lesson updated successfully!');
      const data = await response.json();
      setLessonData({ ...data.data, language: selectedLanguage });
      setLessons(
        lessons.map((lesson) =>
          lesson.id === updatedLesson.id ? updatedLesson : lesson
        )
      );
    } catch (error) {
      console.error('Error updating lesson:', error);
      toast.error('Failed to update lesson');
    }
  };

  const handleGeneratePlan = async () => {
    if (!lessonData) return;

    try {
      setIsLoading(true);
      setStreamedText('');
      console.log('4====>', lessonData);
      const response = await fetch('/api/teacher/lesson-planner', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(lessonData),
      });

      if (!response.ok) {
        throw new Error('Failed to generate lesson plan');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('No reader available');
      }
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
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingLesson) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!lessonData && !isLoadingLesson) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg">No lesson data found</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center gap-2">
          <div className="rounded-full bg-primary/10 p-2">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <div className="w-full">
            <h1 className="text-3xl font-bold">
              {t('detailed_lesson_planner.title')}
            </h1>
            <div className="flex justify-between">
              <p className="text-muted-foreground">
                {t('detailed_lesson_planner.subtitle')}
              </p>
              <div className="flex gap-4">
                <Button onClick={handleEdit} disabled={isLoading}>
                  {isLoading ? (
                    <>{t('detailed_lesson_planner.edit_button')}</>
                  ) : (
                    t('detailed_lesson_planner.edit_button')
                  )}
                </Button>
                <Button onClick={handleGeneratePlan} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating Plan...
                    </>
                  ) : (
                    t('detailed_lesson_planner.button')
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="w-full p-6">
            <Tabs
              value={currentTab}
              onValueChange={handleTabChange}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="basic">
                  {t('detailed_lesson_planner.basic_info.tab_title')}
                </TabsTrigger>
                <TabsTrigger value="details">
                  {t('detailed_lesson_planner.details.tab_title')}
                </TabsTrigger>
              </TabsList>
              <TabsContent value="basic">
                <div className="space-y-4 pt-4">
                  <div>
                    <IconWrapper icon={BookOpen}>
                      {t('detailed_lesson_planner.basic_info.title')}
                    </IconWrapper>
                    <ContentBox>
                      <p className="text-sm">{lessonData.title || ''}</p>
                    </ContentBox>
                  </div>
                  <div>
                    <IconWrapper icon={BookOpenCheck}>
                      {t('detailed_lesson_planner.basic_info.lessontype')}
                    </IconWrapper>
                    <ContentBox>
                      <p className="text-sm">
                        {lessonData.lessontype || 'Not defined'}
                      </p>
                    </ContentBox>
                  </div>
                  <div>
                    <IconWrapper icon={Users2}>
                      {t('detailed_lesson_planner.basic_info.class_name')}
                    </IconWrapper>
                    <ContentBox>
                      <p className="text-sm">
                        {lessonData.classroom.class_name || ''}
                      </p>
                    </ContentBox>
                  </div>

                  <div>
                    <IconWrapper icon={Target}>
                      {t('detailed_lesson_planner.basic_info.objectivies')}
                    </IconWrapper>
                    <ContentBox>
                      <p className="text-sm">{lessonData.objectives || ''}</p>
                    </ContentBox>
                  </div>

                  <div>
                    <IconWrapper icon={Languages}>
                      {t('detailed_lesson_planner.basic_info.language_content')}
                    </IconWrapper>
                    <ContentBox>
                      <p className="text-sm">
                        {lessonData.languagecontent || 'Not defined'}
                      </p>
                    </ContentBox>
                  </div>

                  <div>
                    <IconWrapper icon={Award}>
                      {t('detailed_lesson_planner.basic_info.prerequisites')}
                    </IconWrapper>
                    <ContentBox>
                      <div className="text-sm">
                        {lessonData.prerequisites || 'Not defined'}
                      </div>
                    </ContentBox>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="details">
                <div className="space-y-4 pt-4">
                  <div>
                    <IconWrapper icon={Route}>
                      {t('detailed_lesson_planner.details.learning_path')}
                    </IconWrapper>
                    <ContentBox>
                      <p className="text-sm">
                        {lessonData.learningpath || 'single'}
                      </p>
                    </ContentBox>
                  </div>

                  <div>
                    <IconWrapper icon={Sunrise}>
                      {t('detailed_lesson_planner.details.beginning_ritual')}
                    </IconWrapper>
                    <ContentBox>
                      <p className="text-sm">
                        {lessonData.beginning_ritual.reviewContent.content ||
                          'To review content'}
                      </p>
                    </ContentBox>
                  </div>

                  <div>
                    <div>
                      <IconWrapper icon={Video}>
                        {t('detailed_lesson_planner.details.document_format')}
                      </IconWrapper>
                      <ContentBox>
                        <p className="text-sm">
                          {lessonData.document_format || 'Video'}
                        </p>
                      </ContentBox>
                    </div>
                  </div>
                  <div>
                    <IconWrapper icon={GraduationCap}>
                      {t('detailed_lesson_planner.details.grammar')}
                    </IconWrapper>
                    <ContentBox>
                      <p className="text-sm">
                        {lessonData.grammar || 'Guided'}
                      </p>
                    </ContentBox>
                  </div>

                  <div>
                    <IconWrapper icon={BookOpen}>
                      {t('detailed_lesson_planner.details.vocabulary')}
                    </IconWrapper>
                    <ContentBox>
                      <div className="flex flex-wrap gap-2">
                        {lessonData.vocabulary}
                      </div>
                    </ContentBox>
                  </div>

                  <div>
                    <IconWrapper icon={BookOpen}>
                      {t('detailed_lesson_planner.details.phonetics')}
                    </IconWrapper>
                    <ContentBox>
                      <div className="flex flex-wrap gap-2">
                        {lessonData.phonetics || 'Spotting'}
                      </div>
                    </ContentBox>
                  </div>

                  <div>
                    <IconWrapper icon={CheckCircle2}>
                      {t('detailed_lesson_planner.details.final_task')}
                    </IconWrapper>
                    <ContentBox>
                      <p className="text-sm">{lessonData.finaltask}</p>
                    </ContentBox>
                  </div>

                  <div>
                    <IconWrapper icon={Sunset}>Ending Ritual</IconWrapper>
                    <ContentBox>
                      <p className="text-sm">
                        {lessonData.ending_ritual.reviewContent.enabled
                          ? lessonData.ending_ritual.reviewContent.content
                          : ''}
                        {lessonData.ending_ritual.introduceTheme.enabled
                          ? lessonData.ending_ritual.introduceTheme.content
                          : ''}
                      </p>
                    </ContentBox>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>

          <Card className="p-6">
            <LessonPlanDisplay plan={streamedText} isLoading={isLoading} />
          </Card>
        </div>
      </div>
      {isEditDialogOpen && (
        <EditLessonDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          lessonData={editingLesson}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
}
