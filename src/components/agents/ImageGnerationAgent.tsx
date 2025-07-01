import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Image,
  Loader2,
  Download,
  RefreshCw,
  Upload,
  Eye,
  Sparkles
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Agent, Question } from '@/lib/agentType';

interface ImageGenerationAgentProps {
  agent: Agent;
  projectId: string;
}

interface GeneratedImage {
  id: string;
  url: string;
  name: string;
  prompt: string;
  timestamp: Date;
  settings: {
    style: string;
    format: string;
    logoIncluded: boolean;
    logoPosition?: string;
    productImageIncluded: boolean;
    campaignName: string;
  };
}

export const ImageGenerationAgent: React.FC<ImageGenerationAgentProps> = ({
  agent,
  projectId,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [productImageFile, setProductImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<GeneratedImage | null>(
    null
  );
  const [questionsCompleted, setQuestionsCompleted] = useState(false);

  const filteredQuestions = agent.questions.filter((q: Question) => {
    if (!q.condition) return true;
    return q.condition(answers);
  });

  const currentQuestion = filteredQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === filteredQuestions.length - 1;
  const allQuestionsAnswered =
    questionsCompleted && filteredQuestions.every((q: Question) => answers[q.id]);

  const handleAnswerChange = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleComplete = () => {
    setQuestionsCompleted(true);
  };

  const handleLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
    }
  };

  const handleProductImageFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setProductImageFile(file);
    }
  };

  const generateImageName = (campaign: string) => {
    const timestamp = Date.now();
    const cleanCampaign = campaign.toLowerCase().replace(/[^a-z0-9]/g, '');
    return `${cleanCampaign}_${timestamp.toString().slice(-6)}.jpg`;
  };

  const handleGenerateImage = async () => {
    setIsLoading(true);

    const imageName = generateImageName(answers['campaign-name']);
    const newImage: GeneratedImage = {
      id: `img_${Date.now()}`,
      url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&crop=center',
      name: imageName,
      prompt: answers['prompt'],
      timestamp: new Date(),
      settings: {
        style: answers['visual-style'],
        format: answers['image-format'],
        logoIncluded: answers['include-logo'] === 'Yes',
        logoPosition: answers['logo-position'] || undefined,
        productImageIncluded: answers['include-product'] === 'Yes',
        campaignName: answers['campaign-name'],
      },
    };

    setGeneratedImage(newImage);
    setIsLoading(false);
  };

  const handleRegenerateImage = async () => {
    if (!generatedImage) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const newImage: GeneratedImage = {
      ...generatedImage,
      id: `img_${Date.now()}_regen`,
      url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop&crop=center',
      timestamp: new Date(),
    };

    setGeneratedImage(newImage);
    setIsLoading(false);
  };

  const handleDownloadImage = () => {
    if (generatedImage) {
      window.open(generatedImage.url, '_blank');
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setLogoFile(null);
    setProductImageFile(null);
    setGeneratedImage(null);
    setQuestionsCompleted(false);
  };

  const renderInputField = (question: Question) => {
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
      case 'radio':
        return (
          <RadioGroup value={value} onValueChange={handleAnswerChange}>
            {question.options?.map((option: string) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={option} />
                <Label htmlFor={option} className="text-sm">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );
      case 'multiselect': {
        const selectedValues = value ? value.split(',') : [];
        return (
          <div className="space-y-2">
            {question.options?.map((option: string) => (
              <div key={option} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`${question.id}-${option}`}
                  checked={selectedValues.includes(option)}
                  onChange={(e) => {
                    let newValues = [...selectedValues];
                    if (e.target.checked) {
                      newValues.push(option);
                    } else {
                      newValues = newValues.filter(v => v !== option);
                    }
                    handleAnswerChange(newValues.join(','));
                  }}
                  className="rounded border-gray-300"
                />
                <Label htmlFor={`${question.id}-${option}`} className="text-sm">
                  {option}
                </Label>
              </div>
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
                    {filteredQuestions.length}
                  </span>
                  <span className="text-pink-600">🎨 Image Generator</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-200">
                  <div
                    className="h-2 rounded-full bg-pink-600 transition-all duration-300"
                    style={{
                      width: `${((currentQuestionIndex + 1) / filteredQuestions.length) * 100}%`,
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

                  {/* File upload sections */}
                  {currentQuestion.id === 'include-logo' &&
                    answers['include-logo'] === 'Yes' && (
                      <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
                        <Label
                          htmlFor="logo-upload"
                          className="mb-2 block text-sm font-medium text-slate-700"
                        >
                          Upload Logo File
                        </Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            id="logo-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleLogoFileChange}
                            className="text-sm"
                          />
                          <Upload className="h-4 w-4 text-slate-500" />
                        </div>
                        {logoFile && (
                          <p className="mt-2 text-xs text-green-600">
                            ✓ {logoFile.name}
                          </p>
                        )}
                      </div>
                    )}

                  {currentQuestion.id === 'include-product' &&
                    answers['include-product'] === 'Yes' && (
                      <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4">
                        <Label
                          htmlFor="product-upload"
                          className="mb-2 block text-sm font-medium text-slate-700"
                        >
                          Upload Product Image
                        </Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            id="product-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleProductImageFileChange}
                            className="text-sm"
                          />
                          <Upload className="h-4 w-4 text-slate-500" />
                        </div>
                        {productImageFile && (
                          <p className="mt-2 text-xs text-green-600">
                            ✓ {productImageFile.name}
                          </p>
                        )}
                      </div>
                    )}
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
                    onClick={isLastQuestion ? handleComplete : handleNext}
                    disabled={!answers[currentQuestion.id] && currentQuestion.required !== false}
                    className="bg-pink-600 text-white hover:bg-pink-700"
                  >
                    {isLastQuestion ? 'Complete' : 'Next'}
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              {!generatedImage ? (
                <div className="space-y-4 text-center">
                  <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
                    <h4 className="mb-2 font-medium text-blue-800">
                      🎨 Image Generation Settings:
                    </h4>
                    <div className="space-y-1 text-sm text-blue-700">
                      <p>
                        <strong>Style:</strong> {answers['visual-style']}
                      </p>
                      <p>
                        <strong>Format:</strong> {answers['image-format']}
                      </p>
                      <p>
                        <strong>Campaign:</strong> {answers['campaign-name']}
                      </p>
                      <p>
                        <strong>Logo:</strong> {answers['include-logo']}{' '}
                        {answers['logo-position']
                          ? `(${answers['logo-position']})`
                          : ''}
                      </p>
                      <p>
                        <strong>Product Image:</strong>{' '}
                        {answers['include-product']}
                      </p>
                    </div>
                  </div>

                  <div className="font-medium text-green-600">
                    All questions completed! ✅
                  </div>
                  <Button
                    onClick={handleGenerateImage}
                    disabled={isLoading}
                    size="lg"
                    className="bg-gradient-to-r from-pink-600 to-purple-600 px-8 py-3 text-white hover:from-pink-700 hover:to-purple-700"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Generating Image...
                      </>
                    ) : (
                      <>
                        <Image className="mr-2 h-5 w-5" />
                        Generate AI Image
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                /* Generated Image Display */
                <div className="mx-auto max-w-4xl space-y-6">
                  <div className="rounded-lg border border-purple-200 bg-white p-4">
                    <h4 className="mb-4 flex items-center font-medium text-slate-800">
                      <Sparkles className="mr-2 h-5 w-5 text-purple-600" />
                      Your AI-generated image :
                    </h4>
                    Successfully Generated! 🎉
                  </div>

                  {/* Image Preview */}
                  <div className="space-y-4 text-center">
                    <div className="space-y-3">
                      <div className="flex justify-center space-x-3">
                        <Button
                          onClick={handleDownloadImage}
                          variant="outline"
                          className="flex items-center"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download Image
                        </Button>
                        <Button
                          onClick={() =>
                            window.open(generatedImage.url, '_blank')
                          }
                          variant="outline"
                          className="flex items-center"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Full Size
                        </Button>
                      </div>

                      <div className="flex justify-center space-x-3">
                        <Button
                          onClick={handleRegenerateImage}
                          disabled={isLoading}
                          variant="outline"
                          className="flex items-center"
                        >
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Regenerate
                        </Button>
                        <Button
                          onClick={handleReset}
                          variant="outline"
                          className="flex items-center text-slate-600"
                        >
                          <Image className="mr-2 h-4 w-4" />
                          Generate New Image
                        </Button>
                      </div>
                    </div>
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