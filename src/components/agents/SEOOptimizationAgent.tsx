import React, { useEffect, useState } from 'react';
import { Agent } from '@/lib/agentType';
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
import { Label } from '@/components/ui/label';
import {
  Loader2,
  ArrowLeft,
  ArrowRight,
  Eye,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from 'lucide-react';
import { useResults } from '@/contexts/ResultsContext';
import { useAuth } from '@/core/auth/AuthProvider';
import Request from '@/lib/request';
import { toast } from 'sonner';

interface SEOOptimizationAgentProps {
  agent: Agent;
  projectId: string;
}

interface Question {
  id: string;
  question: string;
  type: 'text' | 'textarea' | 'select';
  placeholder?: string;
  options?: string[];
  required: boolean;
}

export const SEOOptimizationAgent: React.FC<SEOOptimizationAgentProps> = ({
  agent,
  projectId,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<any>(null);
  const { results, addResult } = useResults();
  const [marketingStrategy, setMarketingStrategy] = useState('');
  const [{ profile }] = useAuth();

  // First determine which optimization type they want
  const optimizationTypeQuestion: Question = {
    id: 'optimization-type',
    question: 'What would you like to optimize?',
    type: 'select',
    options: ['Content Optimization', 'Profile Optimization'],
    required: true,
  };

  // Content optimization questions
  const contentQuestions: Question[] = [
    {
      id: 'caption',
      question: 'Caption or Post Text',
      type: 'textarea',
      placeholder: 'Enter your current post caption...',
      required: true,
    },
    {
      id: 'target-platform',
      question: 'Target Platform',
      type: 'select',
      options: ['Instagram', 'TikTok', 'Facebook', 'YouTube Shorts'],
      required: true,
    },
    {
      id: 'main-theme',
      question: 'Main Theme of Content',
      type: 'text',
      placeholder: 'e.g., anxiety and productivity',
      required: true,
    },
    {
      id: 'post-objective',
      question: 'Post Objective',
      type: 'select',
      options: ['Attract', 'Sell', 'Educate', 'Engage'],
      required: true,
    },
  ];

  // Profile optimization questions
  const profileQuestions: Question[] = [
    {
      id: 'brand-name',
      question: 'Brand or Professional Name',
      type: 'text',
      placeholder: 'Your brand/professional name',
      required: true,
    },
    {
      id: 'niche',
      question: 'Niche / Field of Activity',
      type: 'text',
      placeholder: 'e.g., Fitness Coach, Digital Marketing',
      required: true,
    },
    {
      id: 'ideal-audience',
      question: 'Ideal Audience',
      type: 'text',
      placeholder: 'Describe your target audience',
      required: true,
    },
    {
      id: 'tone-of-voice',
      question: 'Tone of Voice',
      type: 'select',
      options: ['Casual', 'Technical', 'Institutional', 'Other'],
      required: true,
    },
    {
      id: 'primary-contact',
      question: 'Primary Contact Channel',
      type: 'select',
      options: ['WhatsApp', 'Link in Bio', 'DM', 'Other'],
      required: true,
    },
  ];

  function parseContentScript(scriptArray: ['']) {
    const joined = scriptArray.join('\n');
    const cleaned = joined.replace(/```json|```/g, '').trim();
    return JSON.parse(cleaned);
  }

  const getQuestions = () => {
    if (currentStep === 0) return [optimizationTypeQuestion];

    const optimizationType = answers['optimization-type'];
    if (optimizationType === 'Content Optimization') {
      return contentQuestions;
    } else if (optimizationType === 'Profile Optimization') {
      return profileQuestions;
    }
    return [];
  };

  const questions = getQuestions();
  const adjustedStep = currentStep === 0 ? 0 : currentStep - 1;
  const currentQuestion = questions[adjustedStep];
  const totalSteps = currentStep === 0 ? 1 : questions.length;
  const progress = ((currentStep + 1) / (totalSteps + 1)) * 100;

  const handleAnswer = (value: string) => {
    if (!currentQuestion) return;

    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  const handleNext = () => {
    if (profile.credits_balance <= 0) {
      toast.error('Insufficient Credit balance, please charge this!');
    }else if (marketingStrategy === '') {
      toast.error('Empty marketing strategy!, please creat that!');
    } else {
      if (currentStep === 0) {
        // Just moved past optimization type selection
        setCurrentStep(1);
      } else if (currentStep < questions.length) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const body = {
      agent: 'seo-optimization',
      inputs: { ...answers, marketingStrategy: marketingStrategy },
    };

    const response = await Request.Post('/api/agents', body);
    const result = parseContentScript(response.script);
    toast.success('SeoOptimization successfully created!');

    const task = {
      profile_id: profile.id,
      project_id: projectId,
      agent_type: agent.id,
      agent_results: JSON.stringify({
        ...result,
        type: answers['optimization-type'],
      }),
      credits_spent: 1,
    };

    await Request.Post('/api/stripe/discount', task);
    toast.success('SeoOptimization successfully saved!');

    setResult(result);
    addResult('seo-optimization', 'SEO Optimization', '🔍', {
      ...result,
      type: answers['optimization-type'],
    });

    setIsLoading(false);
  };

  const canProceed = () => {
    if (!currentQuestion) return false;
    const currentAnswer = answers[currentQuestion.id];
    return currentQuestion.required ? !!currentAnswer : true;
  };

  const isLastStep = currentStep > 0 && currentStep === questions.length;

  const handleReset = () => {
    setResult(null);
    setCurrentStep(0);
    setAnswers({});
    setIsExpanded(false);
  };

  useEffect(() => {
    let marketing = '';
    if (results.length > 0) {
      results.map((result: any) => {
        if (result.agentId === 'marketing-strategy') {
          marketing = JSON.stringify(result.result);
        }
      });
    }

    setMarketingStrategy(marketing);
  }, [results]);

  // Show results in expanded section
  if (result && isExpanded) {
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
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  {agent.description}
                </p>
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
            <div className="space-y-4">
              <div className="rounded-lg border border-purple-200 dark:border-purple-700 bg-white dark:bg-slate-800 p-4">
                <h4 className="mb-4 flex items-center font-medium text-slate-800 dark:text-slate-100">
                  <Sparkles className="mr-2 h-5 w-5 text-purple-600" />
                  Your SEO Optimization :
                </h4>
                Successfully Generated! 🎉
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleReset}
                  variant="default"
                  className="flex-1"
                >
                  Start Over
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
                >
                  Regenerate Results
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Show expandable card structure
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
        <div className="border-t border-slate-100 bg-slate-50 p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-slate-600 dark:text-slate-300">
                <span>
                  Question {currentStep + 1} of {totalSteps + 1}
                </span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-600">
                <div
                  className="h-2 rounded-full bg-blue-600 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {currentQuestion && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="answer" className="text-base font-medium text-slate-700 dark:text-slate-300">
                    {currentQuestion.question}
                    {currentQuestion.required && (
                      <span className="ml-1 text-red-500">*</span>
                    )}
                  </Label>

                  {currentQuestion.type === 'text' && (
                    <Input
                      id="answer"
                      placeholder={currentQuestion.placeholder || ''}
                      value={answers[currentQuestion.id] || ''}
                      onChange={(e) => handleAnswer(e.target.value)}
                      className="w-full"
                    />
                  )}

                  {currentQuestion.type === 'textarea' && (
                    <Textarea
                      id="answer"
                      placeholder={currentQuestion.placeholder || ''}
                      value={answers[currentQuestion.id] || ''}
                      onChange={(e) => handleAnswer(e.target.value)}
                      rows={4}
                      className="w-full"
                    />
                  )}

                  {currentQuestion.type === 'select' &&
                    currentQuestion.options && (
                      <Select
                        value={answers[currentQuestion.id] || ''}
                        onValueChange={handleAnswer}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Please select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          {currentQuestion.options.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                </div>

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>

                  {isLastStep ? (
                    <Button
                      onClick={handleSubmit}
                      disabled={!canProceed() || isLoading}
                      className="bg-green-600 text-white hover:bg-green-700"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Optimizing...
                        </>
                      ) : (
                        <>
                          <Eye className="mr-2 h-4 w-4" />
                          Generate Results
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNext}
                      disabled={!canProceed()}
                      className="bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
