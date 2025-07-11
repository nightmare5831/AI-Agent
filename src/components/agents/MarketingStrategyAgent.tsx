'use client';

import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Play,
  Loader2,
  CheckCircle,
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

interface MarketingStrategyAgentProps {
  agent: Agent;
  projectId: string;
}

export const MarketingStrategyAgent: React.FC<MarketingStrategyAgentProps> = ({
  agent,
  projectId,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string>('');
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQuestion = agent.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === agent.questions.length - 1;
  const { addResult } = useResults();
  const [{ profile }] = useAuth();
  const handleAnswerChange = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  const generateAnswerSummary = (question: any, answer: string) => {
    const summaries: Record<string, string> = {
      'brand-name': `Brand: ${answer}`,
      'product-service': `Offers: ${answer}`,
      'target-audience': `Target: ${answer}`,
      differentiator: `Differentiator: ${answer}`,
      'marketing-goals': `Goal: ${answer}`,
      'communication-tone': `Tone: ${answer}`,
      'video-appearance': `Video appearance: ${answer}`,
      'social-platforms': `Platforms: ${answer}`,
      limitations: `Limitations: ${answer || 'None specified'}`,
      'focus-products': `Focus: ${answer}`,
      'positioning-status': `Positioning: ${answer}`,
      competitors: `Competitors: ${answer || 'None specified'}`,
      'three-month-goals': `3-month goals: ${answer}`,
    };

    return summaries[question.id] || `${question.question}: ${answer}`;
  };

  const handleNext = () => {
    if (profile.credits_balance <= 0) {
      toast.error('Insufficient Credit balance, please charge this!');
    } else if (answers[currentQuestion.id]) {
      if (currentQuestionIndex < agent.questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        setIsCompleted(true);
      }
    }
  };


  const handleRunAgent = async () => {
    if (profile.credits_balance <= 0) {
      toast.error('Insufficient Credit balance, please charge this!');
    } else {
      setIsLoading(true);

      const strategicSummary = `
        📄 STRATEGIC BUSINESS SUMMARY
  
        • Brand Name: ${answers['brand-name'] || 'Your Business'}
        • Product/Service: ${answers['product-service'] || 'Your offerings'}
        • Target Audience: ${answers['target-audience'] || 'Your ideal customers'}
        • Differentiators: ${answers['differentiator'] || 'Your unique value proposition'}
        • Marketing Goals: ${answers['marketing-goals'] || 'Your objectives'}
        • Communication Tone: ${answers['communication-tone'] || 'Your preferred tone'}
        • Appears in Videos: ${answers['video-appearance'] || 'Not specified'}
        • Channels Used: ${answers['social-platforms'] || 'Your platforms'}
        • Limitations: ${answers['limitations'] || 'None specified'}
        • Focus Products: ${answers['focus-products'] || 'Your priority offerings'}
        • Positioning Status: ${answers['positioning-status'] || 'To be defined'}
        • Competitors: ${answers['competitors'] || 'To be researched'}
        • 3-Month Goals: ${answers['three-month-goals'] || 'Your targets'}
  
        🎯 This strategic foundation will be used by all other AI agents to create personalized content that aligns with your business goals and brand identity.
      `;
      const task = {
        profile_id: profile.id,
        project_id: projectId,
        agent_type: agent.id,
        agent_results: JSON.stringify(strategicSummary),
        credits_spent: 1,
      };

      await Request.Post('/api/stripe/discount', task);
      setResult(strategicSummary);
      addResult(agent.id, agent.title, agent.icon, strategicSummary);

      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setResult('');
    setIsCompleted(false);
  };

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
                  <span className="text-blue-600">
                    🤖 AI Marketing Consultant
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
                    {currentQuestion.question}
                  </label>
                  {renderInputField(currentQuestion)}
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Please provide a complete and specific answer.
                  </p>
                </div>

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setCurrentQuestionIndex(
                        Math.max(0, currentQuestionIndex - 1)
                      );
                    }}
                    disabled={currentQuestionIndex === 0}
                  >
                    Previous
                  </Button>

                  <Button
                    onClick={handleRunAgent}
                    className="bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Test
                  </Button>

                  <Button
                    onClick={handleNext}
                    disabled={!answers[currentQuestion.id]}
                    className="bg-blue-600 text-white hover:bg-blue-700"
                  >
                    {isLastQuestion ? 'Complete' : 'Next'}
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              {!result ? (
                <div className="space-y-4 text-center">
                  <div className="font-medium text-green-600">
                    🎯 Strategic consultation completed! Ready to generate your
                    business summary.
                  </div>
                  <Button
                    onClick={handleRunAgent}
                    disabled={isLoading}
                    className="bg-green-600 text-white hover:bg-green-700"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing & Creating Summary...
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        Generate Strategic Summary
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="rounded-lg border border-blue-200 dark:border-blue-700 bg-white dark:bg-slate-800 p-4">
                    <h4 className="mb-4 flex items-center font-medium text-slate-800 dark:text-slate-100">
                      <Sparkles className="mr-2 h-5 w-5 text-purple-600" />
                      Strategic Business Summary:
                    </h4>
                    <div className="whitespace-pre-line text-sm text-slate-700 dark:text-slate-300">
                      Successfully Generated! 🎉
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={handleReset}
                      variant="default"
                      className="flex-1"
                    >
                      Start Over
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
