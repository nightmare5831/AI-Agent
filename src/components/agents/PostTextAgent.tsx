'use client';
import React, { useEffect, useState } from 'react';
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
import { useAuth } from '@/core/auth/AuthProvider';
import { useLanguage } from '@/lib/i18n/language-context';
import Request from '@/lib/request';
import { toast } from 'sonner';

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

interface IdeaContent {
  title: string;
  description: string;
  hook: string;
  cta: string;
}

interface Ideas {
  option1: Record<string, IdeaContent>;
  option2: Record<string, IdeaContent>;
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
  const [marketingStrategy, setMarketingStrategy] = useState('');
  const [ideas, setIdeas] = useState<Ideas | null>(null);
  const [options, setOptions] = useState(['']); // 14 options from postIdea (2 weeks post idea)
  const { results, addResult } = useResults();
  const [{ profile }] = useAuth();
  const { t, language } = useLanguage();

  const currentQuestion = agent.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === agent.questions.length - 1;
  const allQuestionsAnswered = agent.questions.every((q) => answers[q.id]);

  function transformArrayToMockIdea(inputArray: any) {
    const result: any = { option1: {}, option2: {} };

    inputArray.forEach((item: any) => {
      const day = item.day;

      if (item.idea1) {
        result.option1[day] = {
          title: item.idea1.title,
          description: item.idea1.description,
          hook: item.idea1.hook,
          cta: item.idea1.cta,
        };
      }
      if (item.idea2) {
        result.option2[day] = {
          title: item.idea2.title,
          description: item.idea2.description,
          hook: item.idea2.hook,
          cta: item.idea2.cta,
        };
      }
    });

    return result;
  }

  const getOptions = (tempIdea: any): any => {
    const resultIdea: Ideas = transformArrayToMockIdea(tempIdea);

    if (resultIdea !== null) {
      const options1 = Object.entries(resultIdea.option1).map(
        ([day, content]) => `${day} - ${content.title}`
      );
      const options2 = Object.entries(resultIdea.option2).map(
        ([day, content]) => `${day} - ${content.title}`
      );
      return [...options1, ...options2];
    }
    return [];
  };

  const getIdea = (dayTitleStr: string) => {
    const [day, title] = dayTitleStr.split(' - ');
    const source1 = ideas['option1'];
    const source2 = ideas['option2'];
    if (!source1 || !source2) return null;

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
    if (profile.credits_balance <= 0) {
      toast.error(t.agents.postTextAgent.insufficientCredits);
    }else if (ideas === null) {
      toast.error(t.agents.postTextAgent.emptyPostIdeas);
    } else {
      if (currentQuestionIndex < agent.questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      }
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
        'marketing-strategy': marketingStrategy,
      },
      language: language,
    };

    const response = await Request.Post('/api/agents', body);
    const responseString = response.script.join('\n');
    const cleanedString = responseString
      .replace(/^```json\s*/, '')
      .replace(/```$/, '');
    const parsedJson = JSON.parse(cleanedString);
    toast.success(t.agents.postTextAgent.successMessage);

    const task = {
      profile_id: profile.id,
      project_id: projectId,
      agent_type: agent.id,
      agent_results: JSON.stringify({
        ...parsedJson,
        type: answers['content-type'],
      }),
      credits_spent: 2,
    };

    await Request.Post('/api/stripe/discount', task);
    toast.success(t.agents.postTextAgent.successSaved);

    setGeneratedContent(parsedJson);
    addResult(agent.id, agent.title, agent.icon, {
      ...parsedJson,
      type: answers['content-type'],
    });

    setIsLoading(false);
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setGeneratedContent({});
  };

  const getTranslatedQuestion = (questionId: string) => {
    const questionKeyMap: Record<string, string> = {
      'content-type': 'contentType',
      'selected-idea': 'selectedIdea',
      'copy-focus': 'copyFocus',
      'cta-preference': 'ctaPreference'
    };
    
    const key = questionKeyMap[questionId];
    return key ? t.agents.postTextAgent.questions[key] : agent.questions.find(q => q.id === questionId)?.question || questionId;
  };

  const getTranslatedPlaceholder = (questionId: string) => {
    const questionKeyMap: Record<string, string> = {
      'content-type': 'contentTypePlaceholder',
      'selected-idea': 'selectedIdeaPlaceholder',
      'copy-focus': 'copyFocusPlaceholder',
      'cta-preference': 'ctaPreferencePlaceholder'
    };
    
    const key = questionKeyMap[questionId];
    return key ? t.agents.postTextAgent.questions[key] : agent.questions.find(q => q.id === questionId)?.placeholder || '';
  };

  const getTranslatedOption = (questionId: string, option: string) => {
    if (questionId === 'content-type') {
      const englishOptions = ['Social Media Caption', 'Page Copy (Website/WhatsApp)', 'AI Image Generation Script'];
      const index = englishOptions.indexOf(option);
      return index >= 0 && t.agents.postTextAgent.options.contentTypes[index] 
        ? t.agents.postTextAgent.options.contentTypes[index] 
        : option;
    } else if (questionId === 'copy-focus') {
      const englishOptions = ['Drive immediate sales', 'Build brand awareness', 'Educate audience', 'Increase engagement', 'Generate leads'];
      const index = englishOptions.indexOf(option);
      return index >= 0 && t.agents.postTextAgent.options.copyFocus[index]
        ? t.agents.postTextAgent.options.copyFocus[index]
        : option;
    } else if (questionId === 'cta-preference') {
      const englishOptions = ['Direct sales (Buy now, Shop today)', 'Engagement (Comment, Share, Tag)', 'Traffic (Visit website, Link in bio)', 'Lead generation (DM us, Sign up)', 'Soft approach (Save this post, Follow for more)'];
      const index = englishOptions.indexOf(option);
      return index >= 0 && t.agents.postTextAgent.options.ctaPreference[index]
        ? t.agents.postTextAgent.options.ctaPreference[index]
        : option;
    }
    return option;
  };

  useEffect(() => {
    let idea: any = null;
    let marketing = '';
    let options: any = [];
    if (results.length > 0) {
      results.map((result: any) => {
        if (result.agentId === 'post-ideas') {
          idea = result.result;
        }
        if (result.agentId === 'marketing-strategy') {
          marketing = JSON.stringify(result.result);
        }
      });
    }
    if (idea !== null) {
      options = getOptions(idea); // make 14 options from postIdea (2 weeks schedule)
    }
    setIdeas(idea);
    setMarketingStrategy(marketing);
    setOptions(options);
  }, [results]);

  const renderInputField = (question: any) => {
    const value = answers[question.id] || '';
    const translatedPlaceholder = getTranslatedPlaceholder(question.id);

    if (question.id === 'selected-idea') {
      return (
        <Select value={value} onValueChange={handleAnswerChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={translatedPlaceholder} />
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
                {t.agents.postTextAgent.title}
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{t.agents.postTextAgent.description}</p>
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
                    {t.agents.postTextAgent.questionCounter
                      .replace('{current}', (currentQuestionIndex + 1).toString())
                      .replace('{total}', agent.questions.length.toString())}
                  </span>
                  <span className="text-orange-600">{t.agents.postTextAgent.copywriterAI}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-600">
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
                    {t.agents.postTextAgent.previous}
                  </Button>

                  <Button
                    onClick={handleNext}
                    disabled={!answers[currentQuestion.id]}
                    className="bg-orange-600 text-white hover:bg-orange-700"
                  >
                    {isLastQuestion ? t.agents.postTextAgent.complete : t.agents.postTextAgent.next}
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              {Object.keys(generatedContent).length === 0 ? (
                <div className="space-y-4 text-center">
                  <div className="font-medium text-green-600">
                    {t.agents.postTextAgent.allCompleted}
                  </div>
                  <Button
                    onClick={handleRunAgent}
                    disabled={isLoading}
                    className="bg-green-600 text-white hover:bg-green-700"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t.agents.postTextAgent.generating}
                      </>
                    ) : (
                      <>
                        <PenTool className="mr-2 h-4 w-4" />
                        {t.agents.postTextAgent.generateScripts}
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="rounded-lg border border-orange-200 dark:border-orange-700 bg-white dark:bg-slate-800 p-4">
                    <h4 className="mb-4 flex items-center font-medium text-slate-800 dark:text-slate-100">
                      <PenTool className="mr-2 h-5 w-5 text-orange-600" />
                      {t.agents.postTextAgent.copyScripts}
                    </h4>
                    {t.agents.postTextAgent.successfullyGenerated}
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={handleReset}
                      variant="outline"
                      className="flex-1"
                    >
                      {t.agents.postTextAgent.startOver}
                    </Button>
                    <Button
                      onClick={handleRunAgent}
                      disabled={isLoading}
                      className="flex-1 bg-orange-600 text-white hover:bg-orange-700"
                    >
                      {t.agents.postTextAgent.regenerateScripts}
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
