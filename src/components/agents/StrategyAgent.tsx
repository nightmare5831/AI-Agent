'use client';
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Loader, Download, Share, ArrowLeft, ArrowRight, Plus, X } from 'lucide-react';
import { toast } from 'sonner';

interface StrategyAgentProps {
  credits: number;
  setCredits: (credits: number) => void;
}

export const StrategyAgent = ({ credits, setCredits }: StrategyAgentProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedStrategy, setGeneratedStrategy] = useState<any>(null);

  // Step 1 data
  const [businessType, setBusinessType] = useState('');
  const [visionMission, setVisionMission] = useState('');

  // Step 2 data
  const [targetAudience, setTargetAudience] = useState('');
  const [painPoints, setPainPoints] = useState(['']);

  // Step 3 data
  const [competitors, setCompetitors] = useState([{ name: '', strength: '', weakness: '' }]);

  // Step 4 data
  const [growthGoal, setGrowthGoal] = useState('');
  const [timeframe, setTimeframe] = useState('');

  // Step 5 data
  const [pricingStrategy, setPricingStrategy] = useState('');

  const addPainPoint = () => setPainPoints([...painPoints, '']);
  const removePainPoint = (index: number) => setPainPoints(painPoints.filter((_, i) => i !== index));
  const updatePainPoint = (index: number, value: string) => {
    const newPainPoints = [...painPoints];
    newPainPoints[index] = value;
    setPainPoints(newPainPoints);
  };

  const addCompetitor = () => setCompetitors([...competitors, { name: '', strength: '', weakness: '' }]);
  const removeCompetitor = (index: number) => setCompetitors(competitors.filter((_, i) => i !== index));
  const updateCompetitor = (index: number, field: string, value: string) => {
    const newCompetitors = [...competitors];
    newCompetitors[index] = { ...newCompetitors[index], [field]: value };
    setCompetitors(newCompetitors);
  };

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1: return businessType && visionMission;
      case 2: return targetAudience && painPoints.some(p => p.trim());
      case 3: return competitors.some(c => c.name.trim());
      case 4: return growthGoal && timeframe;
      case 5: return pricingStrategy;
      default: return false;
    }
  };

  const handleGenerate = async () => {
    if (credits < 2) {
      toast.error('You need at least 2 credits to generate a strategy');
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const mockStrategy = {
        businessType,
        positioning: `Based on your ${businessType} business model, you should position yourself as a leader in innovation and customer satisfaction.`,
        audience: `Your target audience consists of ${targetAudience}. Focus on solving their key pain points: ${painPoints.filter(p => p.trim()).join(', ')}.`,
        swotMatrix: {
          strengths: ['Strong vision', 'Clear target market', 'Defined growth goals'],
          weaknesses: ['Limited market research', 'Resource constraints'],
          opportunities: ['Market expansion', 'Technology advancement', 'Strategic partnerships'],
          threats: ['Competition', 'Market volatility', 'Economic factors']
        },
        growthPlan: `To achieve ${growthGoal} within ${timeframe}, focus on customer acquisition, product development, and market expansion.`,
        generatedAt: new Date().toLocaleString()
      };
      
      setGeneratedStrategy(mockStrategy);
      setCredits(credits - 2);
      setIsGenerating(false);
      
      toast.success('Your business strategy analysis is ready');
    }, 3000);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-slate-900">Business Foundation</h3>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Business Type *</label>
              <Select value={businessType} onValueChange={setBusinessType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="saas">SaaS (Software as a Service)</SelectItem>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                  <SelectItem value="local-service">Local Service Business</SelectItem>
                  <SelectItem value="consulting">Consulting</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Vision & Mission *</label>
              <Textarea 
                placeholder="Describe your company's vision and mission..."
                value={visionMission}
                onChange={(e) => setVisionMission(e.target.value)}
                className="min-h-[120px]"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-slate-900">Target Market</h3>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Target Audience *</label>
              <Textarea 
                placeholder="Describe your ideal customers..."
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Customer Pain Points</label>
              <div className="space-y-3">
                {painPoints.map((point, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      placeholder={`Pain point ${index + 1}`}
                      value={point}
                      onChange={(e) => updatePainPoint(index, e.target.value)}
                      className="flex-1"
                    />
                    {painPoints.length > 1 && (
                      <Button variant="outline" size="sm" onClick={() => removePainPoint(index)}>
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button variant="outline" onClick={addPainPoint} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Pain Point
                </Button>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-slate-900">Competitive Analysis</h3>
            <div className="space-y-4">
              {competitors.map((competitor, index) => (
                <Card key={index} className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Competitor Name</label>
                      <Input
                        placeholder="Company name"
                        value={competitor.name}
                        onChange={(e) => updateCompetitor(index, 'name', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Strength</label>
                      <Input
                        placeholder="Main strength"
                        value={competitor.strength}
                        onChange={(e) => updateCompetitor(index, 'strength', e.target.value)}
                      />
                    </div>
                    <div className="flex items-end space-x-2">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Weakness</label>
                        <Input
                          placeholder="Main weakness"
                          value={competitor.weakness}
                          onChange={(e) => updateCompetitor(index, 'weakness', e.target.value)}
                        />
                      </div>
                      {competitors.length > 1 && (
                        <Button variant="outline" size="sm" onClick={() => removeCompetitor(index)}>
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
              <Button variant="outline" onClick={addCompetitor} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Competitor
              </Button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-slate-900">Growth Planning</h3>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Growth Goal *</label>
              <Input 
                placeholder="e.g., Increase revenue by 50%, Acquire 1000 new customers"
                value={growthGoal}
                onChange={(e) => setGrowthGoal(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Timeframe *</label>
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3-months">3 Months</SelectItem>
                  <SelectItem value="6-months">6 Months</SelectItem>
                  <SelectItem value="12-months">12 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-slate-900">Pricing Strategy</h3>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Pricing Strategy *</label>
              <Textarea 
                placeholder="Describe your pricing model, strategy, and competitive positioning..."
                value={pricingStrategy}
                onChange={(e) => setPricingStrategy(e.target.value)}
                className="min-h-[120px]"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="border-2 border-purple-100 bg-gradient-to-br from-purple-50 to-pink-50">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center justify-between">
            <span>Strategy Wizard - Step {currentStep} of 5</span>
            <Badge variant="default" className="bg-white text-purple-600">2 Credits</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">Progress</span>
              <span className="text-sm text-slate-600">{currentStep}/5</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 5) * 100}%` }}
              ></div>
            </div>
          </div>

          {renderStep()}

          <div className="flex justify-between mt-8">
            <Button 
              variant="outline" 
              onClick={prevStep} 
              disabled={currentStep === 1}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            {currentStep < 5 ? (
              <Button 
                onClick={nextStep} 
                disabled={!canProceedToNext()}
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button 
                onClick={handleGenerate} 
                disabled={!canProceedToNext() || isGenerating || credits < 2}
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
              >
                {isGenerating ? (
                  <>
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>Generate Strategy</>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-slate-200">
        <CardHeader>
          <CardTitle>Strategy Analysis</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {!generatedStrategy && !isGenerating && (
            <div className="text-center py-12 text-slate-500">
              <p>Complete the 5-step wizard to generate your business strategy</p>
              <p className="text-sm mt-2">Your comprehensive analysis will appear here</p>
            </div>
          )}
          
          {isGenerating && (
            <div className="text-center py-12">
              <Loader className="w-8 h-8 animate-spin mx-auto mb-4 text-purple-500" />
              <p className="text-slate-600">AI is analyzing your business strategy...</p>
              <p className="text-sm text-slate-500 mt-2">This may take a moment</p>
            </div>
          )}
          
          {generatedStrategy && (
            <div className="space-y-6">
              <div className="bg-slate-50 p-6 rounded-lg border space-y-4">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Brand Positioning</h3>
                  <p className="text-slate-700">{generatedStrategy.positioning}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Target Audience Analysis</h3>
                  <p className="text-slate-700">{generatedStrategy.audience}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">SWOT Analysis</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-medium text-green-700 mb-1">Strengths</h4>
                      <ul className="list-disc list-inside text-slate-600">
                        {generatedStrategy.swotMatrix.strengths.map((item: string, i: number) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-red-700 mb-1">Weaknesses</h4>
                      <ul className="list-disc list-inside text-slate-600">
                        {generatedStrategy.swotMatrix.weaknesses.map((item: string, i: number) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-700 mb-1">Opportunities</h4>
                      <ul className="list-disc list-inside text-slate-600">
                        {generatedStrategy.swotMatrix.opportunities.map((item: string, i: number) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-orange-700 mb-1">Threats</h4>
                      <ul className="list-disc list-inside text-slate-600">
                        {generatedStrategy.swotMatrix.threats.map((item: string, i: number) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Growth Plan</h3>
                  <p className="text-slate-700">{generatedStrategy.growthPlan}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline">
                  <Share className="w-4 h-4 mr-2" />
                  Send via WhatsApp
                </Button>
              </div>
              
              <Badge variant="success" className="bg-purple-100 text-purple-700">
                2 credits used
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};