'use client';
import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Loader2,
  PenTool,
  FileText,
  Image,
  Video,
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
import { Agent } from '@/lib/agent';
import { useResults } from '@/contexts/ResultsContext';

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
  videoScript?: {
    objective: string;
    duration: string;
    narrative: string;
    style: string;
    scene: string;
    characters: string;
    expressions: string;
    music: string;
    script: string;
    keyMoments: string;
    logo: string;
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

  // Mock data from previous agents
  const mockBrandStrategy = {
    brandName: 'FitStyle Boutique',
    product: "Premium women's activewear and fitness accessories",
    audience: 'Women 25-40, fitness enthusiasts, value quality and style',
    tone: 'Friendly and welcoming',
    goal: 'Generate more sales',
    differentiator:
      'Sustainable materials with innovative designs for active lifestyles',
  };

  const mockSelectedIdea = {
    title: 'The Activewear Fitting Room Reality Check',
    description:
      'Create a carousel showing 3 common fit mistakes: too tight sports bras, wrong legging size, and ignoring fabric type. Use real before/after photos or illustrations.',
    hook: 'Stop making these activewear mistakes that are sabotaging your workouts! 🏃‍♀️',
    cta: 'Save this post and tag a friend who needs to see this!',
    format: 'Carousel',
    platform: 'Instagram',
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

  const generateContent = () => {
    const selectedTypes = answers['content-type']?.split(',') || [];
    const content: GeneratedContent = {};

    if (selectedTypes.includes('Social Media Caption')) {
      content.caption = {
        headline: 'The 3 Activewear Mistakes Ruining Your Workouts 🚫',
        copy: `Did you know that 80% of women wear the wrong activewear size? 😱

Here are the 3 biggest mistakes I see everywhere:

1️⃣ Sports bras that are TOO TIGHT
→ Restricts breathing and movement
→ Causes back pain and discomfort

2️⃣ Leggings in the wrong size
→ Too small = uncomfortable compression
→ Too big = constant adjusting mid-workout

3️⃣ Ignoring fabric quality
→ Cheap materials = no moisture wicking
→ No stretch = limited range of motion

At ${mockBrandStrategy.brandName}, we believe comfort should never be compromised. Our sustainable activewear is designed with YOUR body in mind! 💚`,
        cta: 'Save this post and tag a friend who needs to see this! 👯‍♀️',
        hashtags: [
          '#ActivewearTips',
          '#FitnessWear',
          '#WorkoutGear',
          '#SustainableFashion',
          '#FitnessFashion',
          '#WomensActivewear',
          '#FitStyleBoutique',
        ],
      };
    }

    if (selectedTypes.includes('Page Copy (Website/WhatsApp)')) {
      content.pageCopy = {
        title: 'Finally, Activewear That Actually Fits Your Lifestyle',
        subtitle:
          'Sustainable, comfortable, and designed for real women who refuse to compromise on style or performance.',
        content: `Tired of activewear that looks great but feels terrible? Or pieces that feel amazing but look like you rolled out of bed?

We get it. That's why we created FitStyle Boutique.

✨ **What makes us different:**
• Sustainable materials that feel luxurious
• Sizes that actually fit real women's bodies
• Designs that transition from gym to coffee date
• No more choosing between comfort and style

Our customers tell us they finally found activewear that moves with them, not against them. Join thousands of women who've upgraded their workout wardrobe.`,
        cta: 'Shop our collection and feel the difference →',
      };
    }

    if (selectedTypes.includes('AI Image Generation Script')) {
      content.imageScript = {
        objective:
          'Educate audience about proper activewear fitting while showcasing brand quality',
        format: 'Instagram carousel post',
        scene: 'Clean, modern fitting room with good lighting',
        character: 'Confident woman in her 30s, athletic build',
        expression:
          'Helpful and approachable, demonstrating proper vs improper fit',
        style: 'Realistic photography with clean, modern aesthetic',
        colors: 'Soft pastels with brand colors (sage green and cream)',
        logo: 'Subtle FitStyle Boutique logo in bottom corner',
        elements: 'Split-screen comparison showing right vs wrong fit',
        orientation: 'Square (1:1) for Instagram carousel',
        finalPrompt:
          'Instagram carousel showing a smiling 30-year-old woman in a modern fitting room demonstrating proper activewear fit vs common mistakes. Split-screen format showing correct sports bra fit on left, too-tight fit on right. Clean, professional lighting with soft pastel background. FitStyle Boutique logo discretely placed in corner. Realistic photography style with educational overlay text.',
      };
    }

    if (selectedTypes.includes('AI Video Generation Script')) {
      content.videoScript = {
        objective:
          'Build connection and educate while driving traffic to website',
        duration: '30 seconds',
        narrative: 'Problem-solution-action structure with relatable scenarios',
        style: 'Natural, authentic, educational with upbeat energy',
        scene: 'Modern fitness studio transitioning to fitting room',
        characters:
          'Relatable woman demonstrating common mistakes then showing proper fit',
        expressions:
          'Initially frustrated with ill-fitting clothes, then confident and happy with proper fit',
        music: 'Upbeat, motivational background track',
        script:
          "VoiceOver: 'Raise your hand if your sports bra is doing THIS... or your leggings are doing THAT! Girl, we've all been there. But here's what proper activewear should actually feel like - supported but not suffocated, snug but not strangling. At FitStyle Boutique, we design for real bodies, real workouts, real life. Because you deserve activewear that works as hard as you do.'",
        keyMoments:
          '0-5s: Common problems, 5-20s: Solutions demonstration, 20-30s: Brand message and CTA',
        logo: 'Appears at 25s with website URL',
        finalPrompt:
          '30-second video: Woman in fitness studio initially struggling with ill-fitting activewear (adjusting, pulling, uncomfortable), then cut to same woman in properly fitted FitStyle Boutique pieces, moving confidently through workout. Natural lighting, authentic expressions, upbeat music. Text overlays highlighting key fitting tips. Ends with confident pose and brand logo.',
      };
    }

    return content;
  };

  const handleRunAgent = async () => {
    setIsLoading(true);
    
    const content = generateContent();
    setGeneratedContent(content);
    addResult(agent.id, agent.title, agent.icon, {
      content: content,
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
                  <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
                    <h4 className="mb-2 font-medium text-blue-800">
                      📋 Using Data From Previous Agents:
                    </h4>
                    <div className="space-y-1 text-sm text-blue-700">
                      <p>
                        <strong>Brand:</strong> {mockBrandStrategy.brandName}
                      </p>
                      <p>
                        <strong>Selected Idea:</strong> {mockSelectedIdea.title}
                      </p>
                      <p>
                        <strong>Content Types:</strong>{' '}
                        {answers['content-type']}
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
