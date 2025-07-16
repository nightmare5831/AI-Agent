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
  const { t, language } = useLanguage();
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
      toast.error(t.agents.marketingStrategyAgent.insufficientCredits);
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
      toast.error(t.agents.marketingStrategyAgent.insufficientCredits);
    } else {
      setIsLoading(true);

      const strategicSummary = generateStrategicSummary(answers, language);
      const task = {
        profile_id: profile.id,
        project_id: projectId,
        agent_type: agent.id,
        agent_results: JSON.stringify(strategicSummary),
        credits_spent: 2,
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

  const getTranslatedQuestion = (questionId: string) => {
    const questionKeyMap: Record<string, string> = {
      'brand-name': 'brandName',
      'product-service': 'productService',
      'target-audience': 'targetAudience',
      'differentiator': 'differentiator',
      'marketing-goals': 'marketingGoals',
      'communication-tone': 'communicationTone',
      'social-platforms': 'socialPlatforms',
      'limitations': 'limitations',
      'focus-products': 'focusProducts',
      'positioning-status': 'positioningStatus',
      'competitors': 'competitors',
      'three-month-goals': 'threeMonthGoals'
    };
    
    const key = questionKeyMap[questionId];
    return key ? t.agents.marketingStrategyAgent.questions[key] : agent.questions.find(q => q.id === questionId)?.question || questionId;
  };

  const getTranslatedPlaceholder = (questionId: string) => {
    const questionKeyMap: Record<string, string> = {
      'brand-name': 'brandNamePlaceholder',
      'product-service': 'productServicePlaceholder',
      'target-audience': 'targetAudiencePlaceholder',
      'differentiator': 'differentiatorPlaceholder',
      'marketing-goals': 'marketingGoalsPlaceholder',
      'communication-tone': 'communicationTonePlaceholder',
      'social-platforms': 'socialPlatformsPlaceholder',
      'limitations': 'limitationsPlaceholder',
      'focus-products': 'focusProductsPlaceholder',
      'positioning-status': 'positioningStatusPlaceholder',
      'competitors': 'competitorsPlaceholder',
      'three-month-goals': 'threeMonthGoalsPlaceholder'
    };
    
    const key = questionKeyMap[questionId];
    return key ? t.agents.marketingStrategyAgent.questions[key] : agent.questions.find(q => q.id === questionId)?.placeholder || '';
  };

  const getTranslatedOption = (questionId: string, option: string) => {
    const optionKeyMap: Record<string, string> = {
      'marketing-goals': 'marketingGoals',
      'communication-tone': 'communicationTone',
      'positioning-status': 'positioningStatus'
    };
    
    const optionKey = optionKeyMap[questionId];
    const optionsArray = t.agents.marketingStrategyAgent.options[optionKey];
    
    if (optionsArray && Array.isArray(optionsArray)) {
      const englishOptions: Record<string, string[]> = {
        'marketingGoals': [
          'Generate more sales',
          'Grow followers and authority',
          'Capture leads for nurturing',
          'Position the brand as a reference',
          'Attract customers to a physical store',
          'Promote new releases or promotions'
        ],
        'communicationTone': [
          'Professional and trustworthy',
          'Fun and relaxed',
          'Friendly and welcoming',
          'Creative and bold',
          'Traditional and safe'
        ],
        'positioningStatus': [
          'I already have a clear positioning',
          'I have an idea, but need help refining it',
          "I don't have one yet, I want help defining it"
        ]
      };
      
      const englishOptionsArray = englishOptions[optionKey];
      if (englishOptionsArray) {
        const index = englishOptionsArray.indexOf(option);
        return index >= 0 && optionsArray[index] ? optionsArray[index] : option;
      }
    }
    
    return option;
  };

  const generateStrategicSummary = (answers: Record<string, string>, language: string) => {
    const labels : any = {
      en: {
        title: '📄 STRATEGIC BUSINESS SUMMARY',
        brandName: 'Brand Name',
        productService: 'Product/Service',
        targetAudience: 'Target Audience',
        differentiators: 'Differentiators',
        marketingGoals: 'Marketing Goals',
        communicationTone: 'Communication Tone',
        appearsInVideos: 'Appears in Videos',
        channelsUsed: 'Channels Used',
        limitations: 'Limitations',
        focusProducts: 'Focus Products',
        positioningStatus: 'Positioning Status',
        competitors: 'Competitors',
        threeMonthGoals: '3-Month Goals',
        conclusion: '🎯 This strategic foundation will be used by all other AI agents to create personalized content that aligns with your business goals and brand identity.',
        defaults: {
          business: 'Your Business',
          offerings: 'Your offerings',
          customers: 'Your ideal customers',
          valueProposition: 'Your unique value proposition',
          objectives: 'Your objectives',
          tone: 'Your preferred tone',
          notSpecified: 'Not specified',
          platforms: 'Your platforms',
          none: 'None specified',
          priority: 'Your priority offerings',
          toBeDefined: 'To be defined',
          toBeResearched: 'To be researched',
          targets: 'Your targets'
        }
      },
      pt: {
        title: '📄 RESUMO ESTRATÉGICO EMPRESARIAL',
        brandName: 'Nome da Marca',
        productService: 'Produto/Serviço',
        targetAudience: 'Público-Alvo',
        differentiators: 'Diferenciais',
        marketingGoals: 'Objetivos de Marketing',
        communicationTone: 'Tom de Comunicação',
        appearsInVideos: 'Aparece em Vídeos',
        channelsUsed: 'Canais Utilizados',
        limitations: 'Limitações',
        focusProducts: 'Produtos Prioritários',
        positioningStatus: 'Status de Posicionamento',
        competitors: 'Concorrentes',
        threeMonthGoals: 'Objetivos de 3 Meses',
        conclusion: '🎯 Esta base estratégica será usada por todos os outros agentes AI para criar conteúdo personalizado que se alinha com seus objetivos de negócio e identidade de marca.',
        defaults: {
          business: 'Seu Negócio',
          offerings: 'Suas ofertas',
          customers: 'Seus clientes ideais',
          valueProposition: 'Sua proposta de valor única',
          objectives: 'Seus objetivos',
          tone: 'Seu tom preferido',
          notSpecified: 'Não especificado',
          platforms: 'Suas plataformas',
          none: 'Nenhuma especificada',
          priority: 'Suas ofertas prioritárias',
          toBeDefined: 'A ser definido',
          toBeResearched: 'A ser pesquisado',
          targets: 'Seus alvos'
        }
      },
      es: {
        title: '📄 RESUMEN ESTRATÉGICO EMPRESARIAL',
        brandName: 'Nombre de la Marca',
        productService: 'Producto/Servicio',
        targetAudience: 'Audiencia Objetivo',
        differentiators: 'Diferenciadores',
        marketingGoals: 'Objetivos de Marketing',
        communicationTone: 'Tono de Comunicación',
        appearsInVideos: 'Aparece en Videos',
        channelsUsed: 'Canales Utilizados',
        limitations: 'Limitaciones',
        focusProducts: 'Productos Prioritarios',
        positioningStatus: 'Estado de Posicionamiento',
        competitors: 'Competidores',
        threeMonthGoals: 'Objetivos de 3 Meses',
        conclusion: '🎯 Esta base estratégica será utilizada por todos los otros agentes AI para crear contenido personalizado que se alinee con tus objetivos de negocio e identidad de marca.',
        defaults: {
          business: 'Tu Negocio',
          offerings: 'Tus ofertas',
          customers: 'Tus clientes ideales',
          valueProposition: 'Tu propuesta de valor única',
          objectives: 'Tus objetivos',
          tone: 'Tu tono preferido',
          notSpecified: 'No especificado',
          platforms: 'Tus plataformas',
          none: 'Ninguna especificada',
          priority: 'Tus ofertas prioritarias',
          toBeDefined: 'Por definir',
          toBeResearched: 'Por investigar',
          targets: 'Tus objetivos'
        }
      }
    };

    const currentLabels = labels[language] || labels.en;

    return `
        ${currentLabels.title}

        • ${currentLabels.brandName}: ${answers['brand-name'] || currentLabels.defaults.business}
        • ${currentLabels.productService}: ${answers['product-service'] || currentLabels.defaults.offerings}
        • ${currentLabels.targetAudience}: ${answers['target-audience'] || currentLabels.defaults.customers}
        • ${currentLabels.differentiators}: ${answers['differentiator'] || currentLabels.defaults.valueProposition}
        • ${currentLabels.marketingGoals}: ${answers['marketing-goals'] || currentLabels.defaults.objectives}
        • ${currentLabels.communicationTone}: ${answers['communication-tone'] || currentLabels.defaults.tone}
        • ${currentLabels.appearsInVideos}: ${answers['video-appearance'] || currentLabels.defaults.notSpecified}
        • ${currentLabels.channelsUsed}: ${answers['social-platforms'] || currentLabels.defaults.platforms}
        • ${currentLabels.limitations}: ${answers['limitations'] || currentLabels.defaults.none}
        • ${currentLabels.focusProducts}: ${answers['focus-products'] || currentLabels.defaults.priority}
        • ${currentLabels.positioningStatus}: ${answers['positioning-status'] || currentLabels.defaults.toBeDefined}
        • ${currentLabels.competitors}: ${answers['competitors'] || currentLabels.defaults.toBeResearched}
        • ${currentLabels.threeMonthGoals}: ${answers['three-month-goals'] || currentLabels.defaults.targets}

        ${currentLabels.conclusion}
      `;
  };

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
                {t.agents.marketingStrategyAgent.title}
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{t.agents.marketingStrategyAgent.description}</p>
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
                    {t.agents.marketingStrategyAgent.questionCounter
                      .replace('{current}', (currentQuestionIndex + 1).toString())
                      .replace('{total}', agent.questions.length.toString())}
                  </span>
                  <span className="text-blue-600">
                    {t.agents.marketingStrategyAgent.aiConsultant}
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
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {t.agents.marketingStrategyAgent.pleaseProvideComplete}
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
                    {t.agents.marketingStrategyAgent.previous}
                  </Button>

                  <Button
                    onClick={handleRunAgent}
                    className="bg-blue-600 text-white hover:bg-blue-700"
                  >
                    {t.agents.marketingStrategyAgent.test}
                  </Button>

                  <Button
                    onClick={handleNext}
                    disabled={!answers[currentQuestion.id]}
                    className="bg-blue-600 text-white hover:bg-blue-700"
                  >
                    {isLastQuestion ? t.agents.marketingStrategyAgent.complete : t.agents.marketingStrategyAgent.next}
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              {!result ? (
                <div className="space-y-4 text-center">
                  <div className="font-medium text-green-600">
                    {t.agents.marketingStrategyAgent.consultationCompleted}
                  </div>
                  <Button
                    onClick={handleRunAgent}
                    disabled={isLoading}
                    className="bg-green-600 text-white hover:bg-green-700"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t.agents.marketingStrategyAgent.analyzingCreating}
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        {t.agents.marketingStrategyAgent.generateSummary}
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="rounded-lg border border-blue-200 dark:border-blue-700 bg-white dark:bg-slate-800 p-4">
                    <h4 className="mb-4 flex items-center font-medium text-slate-800 dark:text-slate-100">
                      <Sparkles className="mr-2 h-5 w-5 text-purple-600" />
                      {t.agents.marketingStrategyAgent.strategicSummary}
                    </h4>
                    <div className="whitespace-pre-line text-sm text-slate-700 dark:text-slate-300">
                      {t.agents.marketingStrategyAgent.successfullyGenerated}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={handleReset}
                      variant="default"
                      className="flex-1"
                    >
                      {t.agents.marketingStrategyAgent.startOver}
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
