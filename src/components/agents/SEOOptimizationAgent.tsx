import React, { useState } from 'react';
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
  Sparkles
} from 'lucide-react';
import { useResults } from '@/contexts/ResultsContext';
import Request from '@/lib/request';

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
  const [results, setResults] = useState<any>(null);
  const { addResult } = useResults();

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
      id: 'target-audience',
      question: 'Target Audience',
      type: 'text',
      placeholder: 'e.g., busy moms, Gen Z, fitness enthusiasts',
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
      id: 'main-differentiators',
      question: 'Main Differentiators',
      type: 'textarea',
      placeholder: 'e.g., fast delivery, vegan-only, 24/7 support...',
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
    if (currentStep === 0) {
      // Just moved past optimization type selection
      setCurrentStep(1);
    } else if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const optimizationType = answers['optimization-type'];
    let mockResult;

    if (optimizationType === 'Content Optimization') {
      mockResult = {
        type: 'content',
        optimizedOpening:
          "🌟 Transform your mindset in just 5 minutes a day! Here's what busy professionals like you need to know about anxiety and productivity...",
        suggestedHashtags: [
          '#AnxietyTips',
          '#ProductivityHacks',
          '#MentalHealthMatters',
          '#BusyMomsLife',
          '#MindsetShift',
          '#SelfCareDaily',
          '#StressManagement',
          '#WorkLifeBalance',
        ],
        improvedCTA:
          '💬 Which tip resonates most with you? Share in the comments below! 👇 Save this post for later and follow @yourhandle for daily wellness tips ✨',
        alternativeCaption:
          "Feeling overwhelmed? You're not alone. 🤝 These 3 simple strategies help thousands of busy professionals manage anxiety while boosting productivity. Swipe to see the game-changing tip that took me from burnout to breakthrough! ➡️",
      };
    } else {
      mockResult = {
        type: 'profile',
        suggestedBio:
          '🌱 Helping busy professionals find balance | Anxiety → Productivity Coach | 10K+ lives transformed | Free guide below 👇',
        suggestedUsername: '@balancedpro_coach',
        suggestedProfileName: 'Sarah | Productivity Coach',
        instagramHighlights: [
          '✨ Success Stories',
          '📚 Free Resources',
          '🎯 Coaching',
          '🧠 Tips & Tools',
          '💬 Community',
        ],
        linkInBioCTA:
          "Get your FREE 'Anxiety to Action' guide - Link in bio! 🔗",
        seoKeywords: [
          'productivity coach',
          'anxiety management',
          'work life balance',
          'stress relief',
          'mindset coaching',
        ],
      };
    }

    const body = {
      agent: 'seo-optimization',
      inputs: answers,
    }
    const response = await Request.Post(
      '/api/agents',
      body
    );
    console.log('response', response)
    setResults(mockResult);
    addResult('seo-optimization', 'SEO Optimization', '🔍', mockResult);

    setIsLoading(false);
  };

  const canProceed = () => {
    if (!currentQuestion) return false;
    const currentAnswer = answers[currentQuestion.id];
    return currentQuestion.required ? !!currentAnswer : true;
  };

  const isLastStep = currentStep > 0 && currentStep === questions.length;

  const handleReset = () => {
    setResults(null);
    setCurrentStep(0);
    setAnswers({});
    setIsExpanded(false);
  };

  // Show results in expanded section
  if (results && isExpanded) {
    return (
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md">
        <div
          className="cursor-pointer p-6"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{agent.icon}</div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800">
                  {agent.title}
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  {agent.description}
                </p>
              </div>
            </div>
            <div className="text-slate-400">
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
            <div className="space-y-4">
              <div className="rounded-lg border border-purple-200 bg-white p-4">
                <h4 className="mb-4 flex items-center font-medium text-slate-800">
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
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md">
      <div
        className="cursor-pointer p-6"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{agent.icon}</div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">
                {agent.title}
              </h3>
              <p className="mt-1 text-sm text-slate-600">{agent.description}</p>
            </div>
          </div>
          <div className="text-slate-400">
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
              <div className="flex justify-between text-sm text-slate-600">
                <span>
                  Question {currentStep + 1} of {totalSteps + 1}
                </span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-200">
                <div
                  className="h-2 rounded-full bg-blue-600 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {currentQuestion && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="answer" className="text-base font-medium">
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
