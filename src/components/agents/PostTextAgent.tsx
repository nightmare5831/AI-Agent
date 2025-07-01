'use client';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Loader2, PenTool } from 'lucide-react';
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
import { mockStrategy, mockIdea } from '@/lib/agentData';
import Request from '@/lib/request';

interface PostTextAgentProps {
  agent: Agent;
  projectId: string;
}

interface GeneratedContent {
  caption?: {
    headline: string;
    copy: string;
    cta: string;
    hashtags: string[];
  };
  pageCopy?: {
    title: string;
    subtitle: string;
    content: string;
    cta: string;
  };
  imageScript?: {
    objective: string;
    format: string;
    scene: string;
    character: string;
    expression: string;
    style: string;
    colors: string;
    logo: string;
    elements: string;
    orientation: string;
    finalPrompt: string;
  };
}

export const PostTextAgent: React.FC<PostTextAgentProps> = ({
  agent,
  projectId,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent>(
    {}
  );
  const { addResult } = useResults();

  const currentQuestion = agent.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === agent.questions.length - 1;
  const allQuestionsAnswered = agent.questions.every((q) => answers[q.id]);

  const getOptions = () => {
    const options1 = Object.entries(mockIdea.option1).map(
      ([day, content]) => `${day} - ${content.title}`
    );

    const options2 = Object.entries(mockIdea.option2).map(
      ([day, content]) => `${day} - ${content.title}`
    );

    return [...options1, ...options2];
  };

  const getIdea = (dayTitleStr: string) => {
    const [day, title] = dayTitleStr.split(' - ');
    const source1 = mockIdea['option1'];
    const source2 = mockIdea['option2'];

    const match1 = Object.entries(source1).find(
      ([key, value]) => key === day && value.title === title
    );
    const match2 = Object.entries(source2).find(
      ([key, value]) => key === day && value.title === title
    );
    if (!match1 && !match2) return null;
    return match1 ? { [match1[0]]: match1[1] } : { [match2[0]]: match2[1] };
  };

  const handleAnswerChange = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < agent.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleRunAgent = async () => {
    setIsLoading(true);

    const idea = getIdea(answers['selected-idea']);
    const body = {
      agent: 'post-text-scripts',
      inputs: {
        ...answers,
        'selected-idea': idea,
        'marketing-strategy': mockStrategy,
      },
    };
    console.log('answers', answers)

    const response = await Request.Post('/api/agents', body);
    const responseString = response.script.join('\n');
    const cleanedString = responseString
      .replace(/^```json\s*/, '')
      .replace(/```$/, '');
    const parsedJson = JSON.parse(cleanedString);
    console.log('parsedJson', parsedJson)

    setGeneratedContent(parsedJson);
    addResult(agent.id, agent.title, agent.icon, {
      content: parsedJson,
      answers: answers,
    });

    setIsLoading(false);
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setGeneratedContent({});
  };

  const renderInputField = (question: any) => {
    const value = answers[question.id] || '';
    const options = getOptions();
    if (question.id === 'selected-idea') {
      return (
        <Select value={value} onValueChange={handleAnswerChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={question.placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options?.map((option: string) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }

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
                  className="rounded border-gray-300"
                />
                <span className="text-sm">{option}</span>
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
          {!allQuestionsAnswered ? (
            <>
              <div className="mb-4">
                <div className="mb-2 flex justify-between text-sm text-slate-600">
                  <span>
                    Question {currentQuestionIndex + 1} of{' '}
                    {agent.questions.length}
                  </span>
                  <span className="text-orange-600">✍️ Content Writer</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-200">
                  <div
                    className="h-2 rounded-full bg-orange-600 transition-all duration-300"
                    style={{
                      width: `${((currentQuestionIndex + 1) / agent.questions.length) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
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
                    className="bg-orange-600 text-white hover:bg-orange-700"
                  >
                    {isLastQuestion ? 'Complete' : 'Next'}
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              {Object.keys(generatedContent).length === 0 ? (
                <div className="space-y-4 text-center">
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
                        Writing Content...
                      </>
                    ) : (
                      <>
                        <PenTool className="mr-2 h-4 w-4" />
                        Generate Content & Scripts
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="rounded-lg border border-orange-200 bg-white p-4">
                    <h4 className="mb-4 flex items-center font-medium text-slate-800">
                      <PenTool className="mr-2 h-5 w-5 text-orange-600" />
                      Generated Content & Scripts:
                    </h4>
                    Successfully Generated!
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
                      className="flex-1 bg-orange-600 text-white hover:bg-orange-700"
                    >
                      Regenerate Content
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
