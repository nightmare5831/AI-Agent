'use client'

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Play, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Agent } from '@/lib/agent';

interface GenericAgentProps {
  agent: Agent;
  projectId: string;
}

export const GenericAgent: React.FC<GenericAgentProps> = ({ agent, projectId } : GenericAgentProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string>('');

  const currentQuestion = agent.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === agent.questions.length - 1;
  const allQuestionsAnswered = agent.questions.every(q => answers[q.id]);

  const handleAnswerChange = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < agent.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleRunAgent = async () => {
    setIsLoading(true);
    const mockResults = {
      'marketing-calendar': 'Weekly content calendar created: Mon - Educational posts, Wed - Behind-the-scenes, Fri - Product features, with monthly campaigns aligned to seasonal trends.',
      'post-ideas': '10 engaging post ideas generated: "5 Ways AI Transforms Business", "Customer Success Story Feature", "Behind the Scenes: Our Process", "Industry Trend Analysis"...',
      'post-text': 'Engaging post created: "🚀 Ready to transform your workflow? Our latest AI solution helps businesses save 40% time on content creation. What would you do with those extra hours? #ProductivityHack #AI"',
      'image-generation': '🎨 High-quality marketing image generated successfully! The image features modern design elements with your brand colors and compelling visual hierarchy.',
      'video-generation': '🎬 Professional marketing video script and storyboard created! 30-second engaging video focusing on your key value proposition with clear call-to-action.',
      'seo-optimization': 'SEO strategy optimized! Target keywords identified, meta descriptions crafted, and content structure improved for 2x better search rankings.'
    };

    setResult((mockResults as Record<string, string>)[agent.id] || 'Results generated successfully!');
    setIsLoading(false);
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setResult('');
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
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-md">
      <div 
        className="p-6 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{agent.icon}</div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">{agent.title}</h3>
              <p className="text-slate-600 text-sm mt-1">{agent.description}</p>
            </div>
          </div>
          <div className="text-slate-400">
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-slate-100 p-6 bg-slate-50">
          {!allQuestionsAnswered ? (
            <>
              <div className="mb-4">
                <div className="flex justify-between text-sm text-slate-600 mb-2">
                  <span>Question {currentQuestionIndex + 1} of {agent.questions.length}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${((currentQuestionIndex + 1) / agent.questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {currentQuestion.question}
                  </label>
                  {renderInputField(currentQuestion)}
                </div>

                <div className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                    disabled={currentQuestionIndex === 0}
                  >
                    Previous
                  </Button>
                  
                  <Button 
                    onClick={handleNext}
                    disabled={!answers[currentQuestion.id]}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {isLastQuestion ? 'Complete' : 'Next'}
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              {!result ? (
                <div className="text-center space-y-4">
                  <div className="text-green-600 font-medium">
                    All questions completed! ✅
                  </div>
                  <Button 
                    onClick={handleRunAgent}
                    disabled={isLoading}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Run Agent
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-lg border border-green-200">
                    <h4 className="font-medium text-slate-800 mb-2">Generated Result:</h4>
                    <div className="text-slate-700">
                      {result}
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button 
                      onClick={handleReset}
                      variant="outline"
                      className="flex-1"
                    >
                      Start Over
                    </Button>
                    <Button 
                      onClick={handleRunAgent}
                      disabled={isLoading}
                      className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
                    >
                      Regenerate
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
