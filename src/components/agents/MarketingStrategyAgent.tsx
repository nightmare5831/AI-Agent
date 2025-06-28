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
  const [isConfirmingAnswer, setIsConfirmingAnswer] = useState(false);
  const [currentSummary, setCurrentSummary] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQuestion = agent.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === agent.questions.length - 1;
  const { addResult } = useResults();

  if (!agent)
    return <div style={{ color: 'red' }}>Error: Agent data not loaded.</div>;
  if (!projectId)
    return <div style={{ color: 'red' }}>Error: Project not selected.</div>;

  const handleAnswerChange = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  const generateAnswerSummary = (question: any, answer: string) => {
    const summaries: Record<string, string> = {
      'brand-name': `Brand: ${answer}`,
      'product-service': `Offers: ${answer.substring(0, 60)}${answer.length > 60 ? '...' : ''}`,
      'target-audience': `Target: ${answer.substring(0, 60)}${answer.length > 60 ? '...' : ''}`,
      differentiator: `Differentiator: ${answer.substring(0, 60)}${answer.length > 60 ? '...' : ''}`,
      'marketing-goals': `Goal: ${answer}`,
      'communication-tone': `Tone: ${answer}`,
      'video-appearance': `Video appearance: ${answer}`,
      'social-platforms': `Platforms: ${answer}`,
      limitations: `Limitations: ${answer || 'None specified'}`,
      'focus-products': `Focus: ${answer.substring(0, 60)}${answer.length > 60 ? '...' : ''}`,
      'positioning-status': `Positioning: ${answer}`,
      competitors: `Competitors: ${answer || 'None specified'}`,
      'three-month-goals': `3-month goals: ${answer.substring(0, 60)}${answer.length > 60 ? '...' : ''}`,
    };

    return (
      summaries[question.id] ||
      `${question.question}: ${answer.substring(0, 40)}${answer.length > 40 ? '...' : ''}`
    );
  };

  const handleNext = () => {
    if (!isConfirmingAnswer && answers[currentQuestion.id]) {
      const summary = generateAnswerSummary(
        currentQuestion,
        answers[currentQuestion.id]
      );
      setCurrentSummary(summary);
      setIsConfirmingAnswer(true);
    } else if (isConfirmingAnswer) {
      setIsConfirmingAnswer(false);
      setCurrentSummary('');
      if (currentQuestionIndex < agent.questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        setIsCompleted(true);
      }
    }
  };

  const handleEditAnswer = () => {
    setIsConfirmingAnswer(false);
    setCurrentSummary('');
  };

  const handleRunAgent = async () => {
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
    setResult(strategicSummary);
    addResult(agent.id, agent.title, agent.icon, strategicSummary);
    setIsLoading(false);
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setResult('');
    setIsConfirmingAnswer(false);
    setCurrentSummary('');
    setIsCompleted(false); // Reset completion state
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
          {!isCompleted ? (
            <>
              <div className="mb-4">
                <div className="mb-2 flex justify-between text-sm text-slate-600">
                  <span>
                    Question {currentQuestionIndex + 1} of{' '}
                    {agent.questions.length}
                  </span>
                  <span className="text-blue-600">
                    🤖 AI Marketing Consultant
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-200">
                  <div
                    className="h-2 rounded-full bg-blue-600 transition-all duration-300"
                    style={{
                      width: `${((currentQuestionIndex + 1) / agent.questions.length) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="space-y-4">
                {!isConfirmingAnswer ? (
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      {currentQuestion.question}
                    </label>
                    {renderInputField(currentQuestion)}
                    <p className="mt-1 text-xs text-slate-500">
                      Please provide a complete and specific answer. I'll
                      summarize it for confirmation.
                    </p>
                  </div>
                ) : (
                  <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="mt-0.5 h-5 w-5 text-green-600" />
                      <div>
                        <h4 className="mb-1 font-medium text-green-800">
                          Let me confirm your answer:
                        </h4>
                        <p className="mb-3 text-sm text-green-700">
                          {currentSummary}
                        </p>
                        <p className="text-xs text-green-600">
                          Is this correct? You can edit or proceed to the next
                          question.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (isConfirmingAnswer) {
                        handleEditAnswer();
                      } else {
                        setCurrentQuestionIndex(
                          Math.max(0, currentQuestionIndex - 1)
                        );
                      }
                    }}
                    disabled={currentQuestionIndex === 0 && !isConfirmingAnswer}
                  >
                    {isConfirmingAnswer ? 'Edit Answer' : 'Previous'}
                  </Button>

                  <Button
                    onClick={handleNext}
                    disabled={!answers[currentQuestion.id]}
                    className="bg-blue-600 text-white hover:bg-blue-700"
                  >
                    {isConfirmingAnswer
                      ? isLastQuestion
                        ? 'Complete'
                        : 'Confirm & Continue'
                      : isLastQuestion
                        ? 'Review'
                        : 'Next'}
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
                  <div className="rounded-lg border border-blue-200 bg-white p-4">
                    <h4 className="mb-4 flex items-center font-medium text-slate-800">
                      <Sparkles className="mr-2 h-5 w-5 text-purple-600" />
                      Strategic Business Summary:
                    </h4>
                    <div className="whitespace-pre-line text-sm text-slate-700">
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
