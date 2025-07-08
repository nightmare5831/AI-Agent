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
      toast.error('Insufficient Credit balance, please charge this!');
    } else if (schedule.length > 0) {
      if (currentQuestionIndex < agent.questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        setIsCompleted(true);
      }
    } else {
      toast.error('Empty marketing-calendar!. Please create Schedule!');
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
    };
    const response = await Request.Post('/api/agents', body);

    const jsonString = response.script
      .filter((line: string) => !line.startsWith('```'))
      .join('\n');

    const jsonData = JSON.parse(jsonString);
    toast.success('PostIdeas successfully created!');
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
      credits_spent: 1,
    };

    await Request.Post('/api/stripe/discount', task);
    toast.success('PostIdeas successfully saved!');
    setContentIdeas(mockIdeas);
    addResult(agent.id, agent.title, agent.icon, mockIdeas);

    setIsLoading(false);
  };

  const generateIdea1 = (scheduleItem: any, option: any) => {
    return option[scheduleItem.day as keyof typeof option] || option['Monday'];
  };

  const generateIdea2 = (scheduleItem: any, option: any) => {
    return option[scheduleItem.day as keyof typeof option] || option['Monday'];
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setContentIdeas([]);
    setIsCompleted(false);
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

    switch (question.type) {
      case 'text':
        return (
          <Input
            value={value}
            onChange={(e) => handleAnswerChange(e.target.value)}
            placeholder={question.placeholder}
            className="w-full"
          />
        );
      case 'textarea':
        return (
          <Textarea
            value={value}
            onChange={(e) => handleAnswerChange(e.target.value)}
            placeholder={question.placeholder}
            rows={4}
            className="w-full"
          />
        );
      case 'select':
        return (
          <Select value={value} onValueChange={handleAnswerChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={question.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {question.options?.map((option: string) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'multiselect': {
        const selectedOptions = value ? value.split(',') : [];
        return (
          <div className="space-y-2">
            {question.options?.map((option: string) => (
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
                <span className="text-sm dark:text-slate-300">{option}</span>
              </label>
            ))}
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
                {agent.title}
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{agent.description}</p>
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
                    Question {currentQuestionIndex + 1} of{' '}
                    {agent.questions.length}
                  </span>
                  <span className="text-purple-600">
                    💡 Creative Strategist
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
                    {currentQuestion.question}
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
                    Previous
                  </Button>

                  <Button
                    onClick={handleNext}
                    disabled={!answers[currentQuestion.id]}
                    className="bg-purple-600 text-white hover:bg-purple-700"
                  >
                    {isLastQuestion ? 'Complete' : 'Next'}
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
                      📋 Using Data From Previous Agents:
                    </h4>
                    <div className="space-y-1 text-sm text-blue-700 dark:text-blue-300">
                      <p>
                        <strong>Brand:</strong> {mockBrandStrategy.brandName}
                      </p>
                      <p>
                        <strong>Product:</strong> {mockBrandStrategy.product}
                      </p>
                      <p>
                        <strong>Schedule:</strong> {schedule.length} posts from
                        Marketing Calendar
                      </p>
                    </div>
                  </div>

                  <div className="font-medium text-green-600">
                    All questions completed! ✅
                  </div>
                  <Button
                    onClick={handleRunAgent}
                    disabled={isLoading}
                    className="bg-green-600 text-white hover:bg-green-700"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating Creative Ideas...
                      </>
                    ) : (
                      <>
                        <Lightbulb className="mr-2 h-4 w-4" />
                        Generate Content Ideas
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="rounded-lg border border-purple-200 dark:border-purple-700 bg-white dark:bg-slate-800 p-4">
                    <h4 className="mb-4 flex items-center font-medium text-slate-800 dark:text-slate-100">
                      <Sparkles className="mr-2 h-5 w-5 text-purple-600" />
                      Creative Content Ideas (2 per post):
                    </h4>
                    Successfully Generated! 🎉
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={handleReset}
                      variant="default"
                      className="flex-1"
                    >
                      Start Over
                    </Button>
                    <Button
                      onClick={handleRunAgent}
                      disabled={isLoading}
                      className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Regenerate Ideas
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
