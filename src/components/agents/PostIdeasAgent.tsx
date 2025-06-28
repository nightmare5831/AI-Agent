'use client'

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Loader2, Lightbulb, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Agent } from '@/lib/agentType';
import { useResults } from '@/contexts/ResultsContext';

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

export const PostIdeasAgent: React.FC<PostIdeasAgentProps> = ({ agent, projectId }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [contentIdeas, setContentIdeas] = useState<ContentIdea[]>([]);
  const [isCompleted, setIsCompleted] = useState(false); // Add this state
  const { addResult } = useResults();

  const currentQuestion = agent.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === agent.questions.length - 1;

  // Mock data simulating what would come from previous agents
  const mockBrandStrategy = {
    brandName: "FitStyle Boutique",
    product: "Premium women's activewear and fitness accessories",
    audience: "Women 25-40, fitness enthusiasts, value quality and style",
    tone: "Friendly and welcoming",
    goal: "Generate more sales"
  };

  const mockSchedule = [
    {
      day: "Monday",
      channel: "Instagram",
      placement: "Feed",
      format: "Carousel",
      contentType: "Tip",
      description: "3 common mistakes when choosing activewear"
    },
    {
      day: "Tuesday", 
      channel: "WhatsApp",
      placement: "Broadcast List",
      format: "Text + Image",
      contentType: "Offer",
      description: "Send a discount coupon with clear call-to-action"
    },
    {
      day: "Wednesday",
      channel: "Instagram", 
      placement: "Reels",
      format: "Short Video",
      contentType: "Behind-the-scenes",
      description: "Show the process of new collection arrival"
    }
  ];

  const handleAnswerChange = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < agent.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRunAgent = async () => {
    setIsLoading(true);
    // Generate creative ideas based on mock data and user preferences
    const mockIdeas: ContentIdea[] = mockSchedule.map(item => ({
      day: item.day,
      channel: item.channel,
      format: item.format,
      contentType: item.contentType,
      originalDescription: item.description,
      idea1: generateIdea1(item),
      idea2: generateIdea2(item)
    }));
    
    setContentIdeas(mockIdeas);
    addResult(agent.id, agent.title, agent.icon, mockIdeas);
    
    setIsLoading(false);
  };

  const generateIdea1 = (scheduleItem: any) => {
    const ideas = {
      "Monday": {
        title: "The Activewear Fitting Room Reality Check",
        description: "Create a carousel showing 3 common fit mistakes: too tight sports bras, wrong legging size, and ignoring fabric type. Use real before/after photos or illustrations.",
        hook: "Stop making these activewear mistakes that are sabotaging your workouts! 🏃‍♀️",
        cta: "Save this post and tag a friend who needs to see this!"
      },
      "Tuesday": {
        title: "Flash Sale Alert with Personal Touch",
        description: "Send a personal video message announcing a 24-hour flash sale. Show yourself wearing the featured pieces while explaining the discount.",
        hook: "Hey beautiful! I have something special just for you... 💖",
        cta: "Reply 'SALE' to get your exclusive 20% off code!"
      },
      "Wednesday": {
        title: "Unboxing New Collection with Excitement",
        description: "Film yourself genuinely excited while opening boxes of new arrivals. Show the texture, colors, and your honest first impressions.",
        hook: "You guys are NOT ready for what just arrived! 📦✨",
        cta: "Which piece caught your eye? Comment below!"
      }
    };
    return ideas[scheduleItem.day as keyof typeof ideas] || ideas["Monday"];
  };

  const generateIdea2 = (scheduleItem: any) => {
    const ideas = {
      "Monday": {
        title: "Activewear Myths Busted by Real Customers",
        description: "Feature real customer testimonials busting common activewear myths. Include photos of customers in your pieces during actual workouts.",
        hook: "Let's bust some activewear myths with REAL customer experiences! 💪",
        cta: "Share your own activewear myth in the comments!"
      },
      "Tuesday": {
        title: "Surprise Bundle Deal Announcement",
        description: "Create a mystery bundle offer where customers can get 3 pieces for the price of 2. Show sneak peeks without revealing everything.",
        hook: "Mystery Bundle Alert! 🎁 3 pieces, 2 prices, infinite style...",
        cta: "Send me your size to claim your mystery bundle!"
      },
      "Wednesday": {
        title: "Designer's Choice: Why We Picked These Pieces",
        description: "Share the story behind 2-3 new pieces: inspiration, fabric choice, and design process. Make it personal and authentic.",
        hook: "Want to know the story behind our newest obsession? 👗",
        cta: "Which design story should I share next?"
      }
    };
    return ideas[scheduleItem.day as keyof typeof ideas] || ideas["Monday"];
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setContentIdeas([]);
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
                      : selectedOptions.filter(item => item !== option);
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
          {!isCompleted ? (
            <>
              <div className="mb-4">
                <div className="flex justify-between text-sm text-slate-600 mb-2">
                  <span>Question {currentQuestionIndex + 1} of {agent.questions.length}</span>
                  <span className="text-purple-600">💡 Creative Strategist</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full transition-all duration-300" 
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
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    {isLastQuestion ? 'Complete' : 'Next'}
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              {contentIdeas.length === 0 ? (
                <div className="text-center space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4">
                    <h4 className="font-medium text-blue-800 mb-2">📋 Using Data From Previous Agents:</h4>
                    <div className="text-blue-700 text-sm space-y-1">
                      <p><strong>Brand:</strong> {mockBrandStrategy.brandName}</p>
                      <p><strong>Product:</strong> {mockBrandStrategy.product}</p>
                      <p><strong>Schedule:</strong> {mockSchedule.length} posts from Marketing Calendar</p>
                    </div>
                  </div>
                  
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
                        Generating Creative Ideas...
                      </>
                    ) : (
                      <>
                        <Lightbulb className="w-4 h-4 mr-2" />
                        Generate Content Ideas
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="p-4 bg-white rounded-lg border border-purple-200">
                    <h4 className="font-medium text-slate-800 mb-4 flex items-center">
                      <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
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