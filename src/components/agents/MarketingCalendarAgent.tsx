'use client';

import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, Play, Loader2, Sparkles } from 'lucide-react';
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

interface MarketingCalendarAgentProps {
  agent: Agent;
  projectId: string;
}

interface ScheduleRow {
  day: string;
  channel: string;
  placement: string;
  format: string;
  contentType: string;
  description: string;
}

export const MarketingCalendarAgent: React.FC<MarketingCalendarAgentProps> = ({
  agent,
  projectId,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [schedule, setSchedule] = useState<ScheduleRow[]>([]);
  const [marketingStrategy, setMarketingStrategy] = useState('');
  const { results, addResult } = useResults();
  const [{ profile }] = useAuth();
  const { t, language } = useLanguage();

  const currentQuestion = agent.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === agent.questions.length - 1;
  const allQuestionsAnswered = agent.questions.every((q) => answers[q.id]);

  const handleAnswerChange = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  const handleNext = () => {
    if (profile.credits_balance <= 0) {
      toast.error(t.agents.marketingCalendarAgent.insufficientCredits);
    } else if (marketingStrategy === '') {
      toast.error(t.agents.marketingCalendarAgent.emptyStrategy);
    } else {
      if (currentQuestionIndex < agent.questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      }
    }
  };

  const handleRunAgent = async () => {
    setIsLoading(true);
    const body = {
      agent: 'marketing-calendar',
      inputs: { ...answers, 'marketing-strategy': marketingStrategy },
      language: language,
    };

    const response = await Request.Post('/api/agents', body);
    const rawRows = response.script.slice(3, 10);
    const schedule = rawRows.map((row: any) => {
      const parts = row
        .split('|')
        .map((s: any) => s.trim())
        .filter(Boolean);

      return {
        day: parts[0],
        channel: parts[1],
        placement: parts[2],
        format: parts[3],
        contentType: parts[4],
        description: parts[5].replace(/^"|"$/g, ''),
      };
    });
    toast.success(t.agents.marketingCalendarAgent.successMessage);
    const task = {
      profile_id: profile.id,
      project_id: projectId,
      agent_type: agent.id,
      agent_results: JSON.stringify(schedule),
      credits_spent: 2,
    };

    await Request.Post('/api/stripe/discount', task);
    toast.success(t.agents.marketingCalendarAgent.successSaved);

    addResult(agent.id, agent.title, agent.icon, schedule);
    setSchedule(schedule);
    setIsLoading(false);
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setSchedule([]);
  };

  const getTranslatedQuestion = (questionId: string) => {
    const questionKeyMap: Record<string, string> = {
      'posts-per-week': 'postsPerWeek',
      'content-formats': 'contentFormats',
      'priority-platform': 'priorityPlatform'
    };
    
    const key = questionKeyMap[questionId];
    return key ? t.agents.marketingCalendarAgent.questions[key] : agent.questions.find(q => q.id === questionId)?.question || questionId;
  };

  const getTranslatedPlaceholder = (questionId: string) => {
    const questionKeyMap: Record<string, string> = {
      'posts-per-week': 'postsPerWeekPlaceholder',
      'content-formats': 'contentFormatsPlaceholder',
      'priority-platform': 'priorityPlatformPlaceholder'
    };
    
    const key = questionKeyMap[questionId];
    return key ? t.agents.marketingCalendarAgent.questions[key] : agent.questions.find(q => q.id === questionId)?.placeholder || '';
  };

  const getTranslatedOption = (questionId: string, option: string) => {
    if (questionId === 'posts-per-week') {
      const englishOptions = ['3 posts', '5 posts', '7 posts', '10 posts', '14 posts'];
      const index = englishOptions.indexOf(option);
      return index >= 0 && t.agents.marketingCalendarAgent.options.posts[index] 
        ? t.agents.marketingCalendarAgent.options.posts[index] 
        : option;
    } else if (questionId === 'content-formats') {
      const englishFormats = ['Image', 'Carousel', 'Plain Text', 'Mixed (text + image)', 'Video'];
      const index = englishFormats.indexOf(option);
      return index >= 0 && t.agents.marketingCalendarAgent.options.formats[index]
        ? t.agents.marketingCalendarAgent.options.formats[index]
        : option;
    } else if (questionId === 'priority-platform') {
      const englishPlatforms = ['Instagram', 'Facebook', 'TikTok', 'WhatsApp', 'YouTube', 'LinkedIn', 'Twitter', 'No specific priority'];
      const index = englishPlatforms.indexOf(option);
      return index >= 0 && t.agents.marketingCalendarAgent.options.platforms[index]
        ? t.agents.marketingCalendarAgent.options.platforms[index]
        : option;
    }
    return option;
  };

  useEffect(() => {
    let marketing = '';
    results.map((result) => {
      if (result.agentId === 'marketing-strategy') {
        marketing = JSON.stringify(result.result);
      }
    });
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
                {t.agents.marketingCalendarAgent.title}
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{t.agents.marketingCalendarAgent.description}</p>
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
          {!allQuestionsAnswered ? (
            <>
              <div className="mb-4">
                <div className="mb-2 flex justify-between text-sm text-slate-600 dark:text-slate-300">
                  <span>
                    {t.agents.marketingCalendarAgent.questionCounter
                      .replace('{current}', (currentQuestionIndex + 1).toString())
                      .replace('{total}', agent.questions.length.toString())}
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-600">
                  <div
                    className="h-2 rounded-full bg-blue-600 transition-all duration-300"
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
                    {t.agents.marketingCalendarAgent.previous}
                  </Button>

                  <Button
                    onClick={handleNext}
                    disabled={!answers[currentQuestion.id]}
                    className="bg-blue-600 text-white hover:bg-blue-700"
                  >
                    {isLastQuestion ? t.agents.marketingCalendarAgent.complete : t.agents.marketingCalendarAgent.next}
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              {schedule.length === 0 ? (
                <div className="space-y-4 text-center">
                  <div className="font-medium text-green-600">
                    {t.agents.marketingCalendarAgent.allCompleted}
                  </div>
                  <Button
                    onClick={handleRunAgent}
                    disabled={isLoading}
                    className="bg-green-600 text-white hover:bg-green-700"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t.agents.marketingCalendarAgent.creating}
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        {t.agents.marketingCalendarAgent.generateSchedule}
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="rounded-lg border border-green-200 dark:border-green-700 bg-white dark:bg-slate-800 p-4">
                    <h4 className="mb-4 flex items-center font-medium text-slate-800 dark:text-slate-100">
                      <Sparkles className="mr-2 h-5 w-5 text-purple-600" />
                      {t.agents.marketingCalendarAgent.yourSchedule}
                    </h4>
                    {t.agents.marketingCalendarAgent.successfullyGenerated}
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={handleReset}
                      variant="default"
                      className="flex-1"
                    >
                      {t.agents.marketingCalendarAgent.startOver}
                    </Button>
                    <Button
                      onClick={handleRunAgent}
                      disabled={isLoading}
                      className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
                    >
                      {t.agents.marketingCalendarAgent.regenerateSchedule}
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
