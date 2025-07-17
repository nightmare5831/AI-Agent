'use client';

import React, { useEffect, useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Loader2,
  Lightbulb,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Agent } from '@/lib/agentType';
import { useResults } from '@/contexts/ResultsContext';
import { useAuth } from '@/core/auth/AuthProvider';
import { useLanguage } from '@/lib/i18n/language-context';
import Request from '@/lib/request';
import { toast } from 'sonner';
interface PostIdeasAgentProps {
  agent: Agent;
  projectId: string;
}

interface ContentIdea {
  day: string;
  channel: string;
  format: string;
  contentType: string;
  originalDescription: string;
  idea1: {
    title: string;
    description: string;
    hook: string;
    cta: string;
  };
  idea2: {
    title: string;
    description: string;
    hook: string;
    cta: string;
  };
}

export const PostIdeasAgent: React.FC<PostIdeasAgentProps> = ({
  agent,
  projectId,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [contentIdeas, setContentIdeas] = useState<ContentIdea[]>([]);
  const [isCompleted, setIsCompleted] = useState(false); // Add this state
  const { results, addResult } = useResults();
  const [{ profile }] = useAuth();
  const { t, language } = useLanguage();
  const [schedule, setSchedule] = useState([]);
  const [marketingStrategy, setMarketingStrategy] = useState('');

  const currentQuestion = agent.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === agent.questions.length - 1;

  // Mock data simulating what would come from previous agents
  const mockBrandStrategy = {
    brandName: 'FitStyle Boutique',
    product: "Premium women's activewear and fitness accessories",
    audience: 'Women 25-40, fitness enthusiasts, value quality and style',
    tone: 'Friendly and welcoming',
    goal: 'Generate more sales',
  };

  const handleAnswerChange = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  const handleNext = () => {
    if (profile.credits_balance <= 0) {
      toast.error(t.agents.postIdeasAgent.insufficientCredits);
    } else if (schedule.length > 0) {
      if (currentQuestionIndex < agent.questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        setIsCompleted(true);
      }
    } else {
      toast.error(t.agents.postIdeasAgent.emptyCalendar);
    }
  };

  const handleRunAgent = async () => {
    setIsLoading(true);

    const body = {
      agent: 'post-ideas',
      inputs: {
        ...answers,
        'marketing-strategy': marketingStrategy,
        schedule: schedule,
      },
      language: language,
    };
    const response = await Request.Post('/api/agents', body);

    const jsonString = response.script
      .filter((line: string) => !line.startsWith('```'))
      .join('\n');

    const jsonData = JSON.parse(jsonString);
    toast.success(t.agents.postIdeasAgent.successMessage);
    const mockIdeas: ContentIdea[] = schedule.map((item) => ({
      day: item.day,
      channel: item.channel,
      format: item.format,
      contentType: item.contentType,
      originalDescription: item.description,
      idea1: generateIdea1(item, jsonData.option1),
      idea2: generateIdea2(item, jsonData.option2),
    }));

    const task = {
      profile_id: profile.id,
      project_id: projectId,
      agent_type: agent.id,
      agent_results: JSON.stringify(mockIdeas),
      credits_spent: 2,
    };

    await Request.Post('/api/stripe/discount', task);
    toast.success(t.agents.postIdeasAgent.successSaved);
    setContentIdeas(mockIdeas);
    addResult(agent.id, agent.title, agent.icon, mockIdeas);

    setIsLoading(false);
  };

  const generateIdea1 = (scheduleItem: any, option: any) => {
    const dayData = option[scheduleItem.day as keyof typeof option];
    if (dayData) {
      return dayData;
    }
    
    // Fallback: find the first available day data if the specific day doesn't exist
    const availableDays = Object.keys(option);
    if (availableDays.length > 0) {
      return option[availableDays[0] as keyof typeof option];
    }
    
    // Last resort fallback
    return {
      title: "Content Idea 1",
      description: "Create engaging content for your audience",
      hook: "Get your audience's attention",
      cta: "Take action now"
    };
  };

  const generateIdea2 = (scheduleItem: any, option: any) => {
    const dayData = option[scheduleItem.day as keyof typeof option];
    if (dayData) {
      return dayData;
    }
    
    // Fallback: find the first available day data if the specific day doesn't exist
    const availableDays = Object.keys(option);
    if (availableDays.length > 0) {
      return option[availableDays[0] as keyof typeof option];
    }
    
    // Last resort fallback
    return {
      title: "Content Idea 2",
      description: "Create alternative engaging content for your audience",
      hook: "Capture your audience's interest",
      cta: "Engage with us now"
    };
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setContentIdeas([]);
    setIsCompleted(false);
  };

  const getTranslatedQuestion = (questionId: string) => {
    const questionKeyMap: Record<string, string> = {
      'creative-style': 'creativeStyle',
      'content-themes': 'contentThemes',
      'filming-comfort': 'filmingComfort'
    };
    
    const key = questionKeyMap[questionId];
    return key ? t.agents.postIdeasAgent.questions[key] : agent.questions.find(q => q.id === questionId)?.question || questionId;
  };

  const getTranslatedPlaceholder = (questionId: string) => {
    const questionKeyMap: Record<string, string> = {
      'creative-style': 'creativeStylePlaceholder',
      'content-themes': 'contentThemesPlaceholder',
      'filming-comfort': 'filmingComfortPlaceholder'
    };
    
    const key = questionKeyMap[questionId];
    return key ? t.agents.postIdeasAgent.questions[key] : agent.questions.find(q => q.id === questionId)?.placeholder || '';
  };

  const getTranslatedOption = (questionId: string, option: string) => {
    if (questionId === 'creative-style') {
      const englishOptions = [
        'Simple and direct',
        'Creative and bold',
        'Educational and informative',
        'Fun and entertaining',
        'Professional and polished'
      ];
      const index = englishOptions.indexOf(option);
      return index >= 0 && t.agents.postIdeasAgent.options.creativeStyle[index] 
        ? t.agents.postIdeasAgent.options.creativeStyle[index] 
        : option;
    } else if (questionId === 'content-themes') {
      const englishThemes = [
        'Behind-the-scenes',
        'Tips and tutorials',
        'Customer testimonials',
        'Product showcases',
        'Industry trends',
        'Personal stories',
        'Challenges and solutions',
        'Community highlights'
      ];
      const index = englishThemes.indexOf(option);
      return index >= 0 && t.agents.postIdeasAgent.options.contentThemes[index]
        ? t.agents.postIdeasAgent.options.contentThemes[index]
        : option;
    } else if (questionId === 'filming-comfort') {
      const englishComfort = [
        'Prefer behind-the-scenes and product shots',
        'Better with graphics and text-based content',
        'Mix of everything but keep it simple'
      ];
      const index = englishComfort.indexOf(option);
      return index >= 0 && t.agents.postIdeasAgent.options.filmingComfort[index]
        ? t.agents.postIdeasAgent.options.filmingComfort[index]
        : option;
    }
    return option;
  };

  useEffect(() => {
    let schedules: any = [];
    let marketing = '';

    if (results.length > 0) {
      results.map((result: any) => {
        if (result.agentId === 'marketing-calendar') {
          schedules = result.result;
        }
        if (result.agentId === 'marketing-strategy') {
          marketing = JSON.stringify(result.result);
        }
      });
    }
    setSchedule(schedules);
    setMarketingStrategy(marketing);
  }, [results]);

  const renderInputField = (question: any) => {
    const value = answers[question.id] || '';
    const translatedPlaceholder = getTranslatedPlaceholder(question.id);

    switch (question.type) {
      case 'text':
        return (
          <Input
            value={value}
            onChange={(e) => handleAnswerChange(e.target.value)}
            placeholder={translatedPlaceholder}
            className="w-full"
          />
        );
      case 'textarea':
        return (
          <Textarea
            value={value}
            onChange={(e) => handleAnswerChange(e.target.value)}
            placeholder={translatedPlaceholder}
            rows={4}
            className="w-full"
          />
        );
      case 'select':
        return (
          <Select value={value} onValueChange={handleAnswerChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={translatedPlaceholder} />
            </SelectTrigger>
            <SelectContent>
              {question.options?.map((option: string) => {
                const translatedOption = getTranslatedOption(question.id, option);
                return (
                  <SelectItem key={option} value={option}>
                    {translatedOption}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        );
      case 'multiselect': {
        const selectedOptions = value ? value.split(',') : [];
        return (
          <div className="space-y-2">
            {question.options?.map((option: string) => {
              const translatedOption = getTranslatedOption(question.id, option);
              return (
                <label key={option} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes(option)}
                    onChange={(e) => {
                      const newSelection = e.target.checked
                        ? [...selectedOptions, option]
                        : selectedOptions.filter((item) => item !== option);
                      handleAnswerChange(newSelection.join(','));
                    }}
                    className="rounded border-gray-300 dark:border-gray-600"
                  />
                  <span className="text-sm dark:text-slate-300">{translatedOption}</span>
                </label>
              );
            })}
          </div>
        );
      }
      default:
        return null;
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm transition-all duration-300 hover:shadow-md">
      <div
        className="cursor-pointer p-6"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{agent.icon}</div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                {t.agents.postIdeasAgent.title}
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{t.agents.postIdeasAgent.description}</p>
            </div>
          </div>
          <div className="text-slate-400 dark:text-slate-500">
            {isExpanded ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-6">
          {!isCompleted ? (
            <>
              <div className="mb-4">
                <div className="mb-2 flex justify-between text-sm text-slate-600 dark:text-slate-300">
                  <span>
                    {t.agents.postIdeasAgent.questionCounter
                      .replace('{current}', (currentQuestionIndex + 1).toString())
                      .replace('{total}', agent.questions.length.toString())}
                  </span>
                  <span className="text-purple-600">
                    {t.agents.postIdeasAgent.creativeStrategist}
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-600">
                  <div
                    className="h-2 rounded-full bg-purple-600 transition-all duration-300"
                    style={{
                      width: `${((currentQuestionIndex + 1) / agent.questions.length) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    {getTranslatedQuestion(currentQuestion.id)}
                  </label>
                  {renderInputField(currentQuestion)}
                </div>

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() =>
                      setCurrentQuestionIndex(
                        Math.max(0, currentQuestionIndex - 1)
                      )
                    }
                    disabled={currentQuestionIndex === 0}
                  >
                    {t.agents.postIdeasAgent.previous}
                  </Button>

                  <Button
                    onClick={handleNext}
                    disabled={!answers[currentQuestion.id]}
                    className="bg-purple-600 text-white hover:bg-purple-700"
                  >
                    {isLastQuestion ? t.agents.postIdeasAgent.complete : t.agents.postIdeasAgent.next}
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              {contentIdeas.length === 0 ? (
                <div className="space-y-4 text-center">
                  <div className="mb-4 rounded-lg border border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/50 p-4">
                    <h4 className="mb-2 font-medium text-blue-800 dark:text-blue-200">
                      📋 {t.agents.postIdeasAgent.usingData}
                    </h4>
                    <div className="space-y-1 text-sm text-blue-700 dark:text-blue-300">
                      <p>
                        <strong>{t.agents.postIdeasAgent.brand}:</strong> {mockBrandStrategy.brandName}
                      </p>
                      <p>
                        <strong>{t.agents.postIdeasAgent.product}:</strong> {mockBrandStrategy.product}
                      </p>
                      <p>
                        <strong>{t.agents.postIdeasAgent.schedule}:</strong> {t.agents.postIdeasAgent.postsFrom.replace('{count}', schedule.length.toString())}
                      </p>
                    </div>
                  </div>

                  <div className="font-medium text-green-600">
                    {t.agents.postIdeasAgent.allCompleted}
                  </div>
                  <Button
                    onClick={handleRunAgent}
                    disabled={isLoading}
                    className="bg-green-600 text-white hover:bg-green-700"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t.agents.postIdeasAgent.generating}
                      </>
                    ) : (
                      <>
                        <Lightbulb className="mr-2 h-4 w-4" />
                        {t.agents.postIdeasAgent.generateIdeas}
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="rounded-lg border border-purple-200 dark:border-purple-700 bg-white dark:bg-slate-800 p-4">
                    <h4 className="mb-4 flex items-center font-medium text-slate-800 dark:text-slate-100">
                      <Sparkles className="mr-2 h-5 w-5 text-purple-600" />
                      {t.agents.postIdeasAgent.creativeContent}
                    </h4>
                    {t.agents.postIdeasAgent.successfullyGenerated}
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={handleReset}
                      variant="default"
                      className="flex-1"
                    >
                      {t.agents.postIdeasAgent.startOver}
                    </Button>
                    <Button
                      onClick={handleRunAgent}
                      disabled={isLoading}
                      className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
                    >
                      {t.agents.postIdeasAgent.regenerateIdeas}
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
