'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, X } from 'lucide-react';

type Functionality = 'brand-positioning' | 'audience-definition' | 'value-proposition' | 'pricing-strategy' | 'growth-plan' | 'content-plan' | '';

export const StrategyAgent = () => {
  const [selectedFunctionality, setSelectedFunctionality] = useState<Functionality>('brand-positioning');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState('');
  const [formData, setFormData] = useState({
    businessName: '',
    missionStatement: '',
    brandValues: [] as string[],
    competitors: [] as string[],
    productOverview: '',
    audienceDescription: '',
    painPoints: [] as string[],
    benefits: [] as string[],
    baseCost: '',
    competitorPricing: '',
    stage: '',
    goals: '',
    budget: '',
    channels: [] as string[],
    contentTypes: [] as string[]
  });

  const handleGenerate = async () => {
    setIsGenerating(true);

    const mockResults : any = {}
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    mockResults[selectedFunctionality] = {
      'brand-positioning': `🎯 Brand Positioning Strategy for ${formData.businessName}:\n\nPOSITIONING STATEMENT:\n"For ${formData.audienceDescription}, ${formData.businessName} is the only ${formData.stage} company that ${formData.missionStatement}"\n\nCORE VALUES:\n${formData.brandValues.map(value => `• ${value}`).join('\n')}\n\nDIFFERENTIATION:\nUnlike ${formData.competitors.slice(0, 2).join(' and ')}, we focus on:\n• ${formData.benefits.slice(0, 3).join('\n• ')}\n\nMESSAGING PILLARS:\n1. Innovation & Excellence\n2. Customer-Centric Solutions\n3. Proven Results\n\nBRAND PERSONALITY: Professional, Innovative, Trustworthy`,
      
      'audience-definition': `👥 Target Audience Definition:\n\nPRIMARY AUDIENCE:\n${formData.audienceDescription}\n\nPAIN POINTS:\n${formData.painPoints.map(point => `• ${point}`).join('\n')}\n\nNEEDS & DESIRES:\n• Solutions that save time\n• Reliable and proven methods\n• Cost-effective options\n• Expert guidance\n\nBEHAVIOR PATTERNS:\n• Research online before purchasing\n• Value peer recommendations\n• Compare multiple options\n• Seek ongoing support\n\nPREFERRED CHANNELS:\n${formData.channels.slice(0, 3).join(', ')}\n\nMESSAGING STRATEGY:\nAddress pain points directly while highlighting our unique benefits`,
      
      'value-proposition': `💎 Value Proposition Canvas:\n\nCUSTOMER PROFILE:\nJobs to be Done:\n• ${formData.painPoints.slice(0, 2).join('\n• ')}\n\nPains:\n• Time-consuming processes\n• Lack of expertise\n• Budget constraints\n\nGains:\n• Increased efficiency\n• Better results\n• Peace of mind\n\nVALUE MAP:\nProducts & Services:\n${formData.productOverview}\n\nPain Relievers:\n${formData.benefits.slice(0, 3).join('\n• ')}\n\nGain Creators:\n• Proven methodology\n• Expert support\n• Measurable results\n\nVALUE PROPOSITION:\n"We help ${formData.audienceDescription} achieve ${formData.goals} through our unique approach that delivers measurable results."`,
      
      'pricing-strategy': `💰 Pricing Strategy Analysis:\n\nCURRENT POSITION:\nBase Cost: $${formData.baseCost}\nCompetitor Range: $${formData.competitorPricing}\n\nPRICING MODELS:\n\n1. VALUE-BASED PRICING (Recommended)\n• Premium: 20% above market\n• Standard: Market rate\n• Basic: 15% below market\n\n2. TIERED PRICING:\n• Starter: $${Math.round(Number(formData.baseCost) * 0.7)}/month\n• Professional: $${Math.round(Number(formData.baseCost) * 1.2)}/month\n• Enterprise: $${Math.round(Number(formData.baseCost) * 2)}/month\n\nPRICING PSYCHOLOGY:\n• Anchor high-value tier first\n• Make middle tier most attractive\n• Include bonus features for premium\n\nRECOMMENDATION:\nPosition at premium pricing based on unique value: ${formData.benefits.slice(0, 2).join(', ')}`,
      
      'growth-plan': `📈 Growth Strategy for ${formData.businessName}:\n\nCURRENT STAGE: ${formData.stage}\nBUDGET: $${formData.budget}\n\nQUARTER 1 - FOUNDATION:\n• Optimize core offering\n• Build customer feedback loop\n• Establish key partnerships\n• Content marketing launch\n\nQUARTER 2 - SCALE:\n• Expand to ${formData.channels.slice(0, 2).join(' and ')}\n• Launch referral program\n• A/B test pricing models\n• Hire key team members\n\nQUARTER 3 - EXPANSION:\n• New market segments\n• Product feature additions\n• Strategic partnerships\n• Influencer collaborations\n\nKEY METRICS:\n• Customer Acquisition Cost (CAC)\n• Lifetime Value (LTV)\n• Monthly Recurring Revenue (MRR)\n• Churn Rate\n\nGOALS: ${formData.goals}`,
      
      'content-plan': `📝 Strategic Content Plan:\n\nCONTENT PILLARS:\n1. Educational (40%): ${formData.contentTypes.includes('How-to guides') ? 'How-to guides' : 'Educational content'}\n2. Industry Insights (30%): Trends and analysis\n3. Customer Stories (20%): Success stories and testimonials\n4. Behind-the-Scenes (10%): Company culture and process\n\nCHANNEL STRATEGY:\n${formData.channels.map(channel => `${channel}: ${formData.contentTypes.find(type => type.includes(channel.toLowerCase())) || 'Mixed content'}`).join('\n')}\n\nCONTENT CALENDAR:\nWeek 1: Educational deep-dive\nWeek 2: Industry trend analysis\nWeek 3: Customer success story\nWeek 4: Behind-the-scenes content\n\nTOPIC CLUSTERS:\n• Pain point solutions\n• Industry best practices\n• Tool comparisons\n• Success frameworks\n\nMEASUREMENT:\n• Engagement rate\n• Lead generation\n• Brand awareness\n• Thought leadership positioning`
    };

    setResult(mockResults[selectedFunctionality] || 'Generated strategy will appear here...');
    setIsGenerating(false);
  };

  const addBrandValue = (value: string) => {
    if (value.trim() && !formData.brandValues.includes(value.trim())) {
      setFormData(prev => ({
        ...prev,
        brandValues: [...prev.brandValues, value.trim()]
      }));
    }
  };

  const removeBrandValue = (value: string) => {
    setFormData(prev => ({
      ...prev,
      brandValues: prev.brandValues.filter(v => v !== value)
    }));
  };

  const addCompetitor = (competitor: string) => {
    if (competitor.trim() && !formData.competitors.includes(competitor.trim())) {
      setFormData(prev => ({
        ...prev,
        competitors: [...prev.competitors, competitor.trim()]
      }));
    }
  };

  const removeCompetitor = (competitor: string) => {
    setFormData(prev => ({
      ...prev,
      competitors: prev.competitors.filter(c => c !== competitor)
    }));
  };

  const togglePainPoint = (point: string) => {
    setFormData(prev => ({
      ...prev,
      painPoints: prev.painPoints.includes(point)
        ? prev.painPoints.filter(p => p !== point)
        : [...prev.painPoints, point]
    }));
  };

  const toggleBenefit = (benefit: string) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits.includes(benefit)
        ? prev.benefits.filter(b => b !== benefit)
        : [...prev.benefits, benefit]
    }));
  };

  const toggleChannel = (channel: string) => {
    setFormData(prev => ({
      ...prev,
      channels: prev.channels.includes(channel)
        ? prev.channels.filter(c => c !== channel)
        : [...prev.channels, channel]
    }));
  };

  const toggleContentType = (type: string) => {
    setFormData(prev => ({
      ...prev,
      contentTypes: prev.contentTypes.includes(type)
        ? prev.contentTypes.filter(t => t !== type)
        : [...prev.contentTypes, type]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Functionality Selection */}
      <div className="space-y-2">
        <Label htmlFor="functionality" className="text-lg font-semibold">Select Functionality</Label>
        <Select value={selectedFunctionality} onValueChange={(value: Functionality) => setSelectedFunctionality(value)}>
          <SelectTrigger className="h-12 text-base">
            <SelectValue placeholder="Choose a strategy function..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="brand-positioning">🎯 Brand Positioning</SelectItem>
            <SelectItem value="audience-definition">👥 Audience Definition</SelectItem>
            <SelectItem value="value-proposition">💎 Value Proposition</SelectItem>
            <SelectItem value="pricing-strategy">💰 Pricing Strategy</SelectItem>
            <SelectItem value="growth-plan">📈 Growth Plan</SelectItem>
            <SelectItem value="content-plan">📝 Strategic Content Plan</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Dynamic Form Fields */}
      <div className="space-y-6 animate-fade-in">
        {/* Common Fields */}
        <div className="space-y-2">
          <Label htmlFor="businessName">Business Name</Label>
          <Input
            id="businessName"
            value={formData.businessName}
            onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
            placeholder="Enter your business name"
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="missionStatement">Mission Statement</Label>
          <Textarea
            id="missionStatement"
            value={formData.missionStatement}
            onChange={(e) => setFormData(prev => ({ ...prev, missionStatement: e.target.value }))}
            placeholder="Describe your company's mission and purpose..."
            className="min-h-[80px]"
          />
        </div>

        {/* Brand Values */}
        {(selectedFunctionality === 'brand-positioning' || selectedFunctionality === 'value-proposition') && (
          <div className="space-y-3">
            <Label>Brand Values</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.brandValues.map(value => (
                <Badge key={value} variant="success" className="cursor-pointer" onClick={() => removeBrandValue(value)}>
                  {value} <X className="ml-1 h-3 w-3" />
                </Badge>
              ))}
            </div>
            <Input
              placeholder="Add brand value and press Enter"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addBrandValue(e.currentTarget.value);
                  e.currentTarget.value = '';
                }
              }}
              className="h-11"
            />
          </div>
        )}

        {/* Competitors */}
        {(selectedFunctionality === 'brand-positioning' || selectedFunctionality === 'pricing-strategy') && (
          <div className="space-y-3">
            <Label>Competitors</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.competitors.map(competitor => (
                <Badge key={competitor} variant="warning" className="cursor-pointer" onClick={() => removeCompetitor(competitor)}>
                  {competitor} <X className="ml-1 h-3 w-3" />
                </Badge>
              ))}
            </div>
            <Input
              placeholder="Add competitor and press Enter"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addCompetitor(e.currentTarget.value);
                  e.currentTarget.value = '';
                }
              }}
              className="h-11"
            />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="productOverview">Product Overview</Label>
          <Textarea
            id="productOverview"
            value={formData.productOverview}
            onChange={(e) => setFormData(prev => ({ ...prev, productOverview: e.target.value }))}
            placeholder="Describe your main products or services..."
            className="min-h-[80px]"
          />
        </div>

        {/* Audience Description */}
        {(selectedFunctionality === 'audience-definition' || selectedFunctionality === 'brand-positioning' || selectedFunctionality === 'value-proposition') && (
          <div className="space-y-2">
            <Label htmlFor="audienceDescription">Audience Description</Label>
            <Input
              id="audienceDescription"
              value={formData.audienceDescription}
              onChange={(e) => setFormData(prev => ({ ...prev, audienceDescription: e.target.value }))}
              placeholder="e.g., Small business owners in tech"
              className="h-11"
            />
          </div>
        )}

        {/* Pain Points */}
        {(selectedFunctionality === 'audience-definition' || selectedFunctionality === 'value-proposition') && (
          <div className="space-y-3">
            <Label>Pain Points</Label>
            <div className="flex flex-wrap gap-2">
              {['High costs', 'Time-consuming', 'Lack of expertise', 'Poor results', 'Complex setup', 'No support'].map(point => (
                <Badge
                  key={point}
                  variant={formData.painPoints.includes(point) ? "default" : "warning"}
                  className="cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => togglePainPoint(point)}
                >
                  {point}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Benefits */}
        {(selectedFunctionality === 'value-proposition' || selectedFunctionality === 'pricing-strategy') && (
          <div className="space-y-3">
            <Label>Benefits</Label>
            <div className="flex flex-wrap gap-2">
              {['Cost savings', 'Time efficiency', 'Expert guidance', 'Proven results', 'Easy setup', '24/7 support'].map(benefit => (
                <Badge
                  key={benefit}
                  variant={formData.benefits.includes(benefit) ? "default" : "warning"}
                  className="cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => toggleBenefit(benefit)}
                >
                  {benefit}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Pricing Fields */}
        {selectedFunctionality === 'pricing-strategy' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="baseCost">Base Cost ($)</Label>
              <Input
                id="baseCost"
                type="number"
                value={formData.baseCost}
                onChange={(e) => setFormData(prev => ({ ...prev, baseCost: e.target.value }))}
                placeholder="100"
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="competitorPricing">Competitor Pricing ($)</Label>
              <Input
                id="competitorPricing"
                type="number"
                value={formData.competitorPricing}
                onChange={(e) => setFormData(prev => ({ ...prev, competitorPricing: e.target.value }))}
                placeholder="120"
                className="h-11"
              />
            </div>
          </div>
        )}

        {/* Growth Plan Fields */}
        {selectedFunctionality === 'growth-plan' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stage">Business Stage</Label>
                <Select value={formData.stage} onValueChange={(value) => setFormData(prev => ({ ...prev, stage: value }))}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="startup">Startup</SelectItem>
                    <SelectItem value="growth">Growth</SelectItem>
                    <SelectItem value="scale">Scale</SelectItem>
                    <SelectItem value="mature">Mature</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">Budget ($)</Label>
                <Input
                  id="budget"
                  type="number"
                  value={formData.budget}
                  onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                  placeholder="10000"
                  className="h-11"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="goals">Goals</Label>
              <Textarea
                id="goals"
                value={formData.goals}
                onChange={(e) => setFormData(prev => ({ ...prev, goals: e.target.value }))}
                placeholder="Define your key business goals..."
                className="min-h-[80px]"
              />
            </div>
          </>
        )}

        {/* Channels */}
        {(selectedFunctionality === 'audience-definition' || selectedFunctionality === 'growth-plan' || selectedFunctionality === 'content-plan') && (
          <div className="space-y-3">
            <Label>Channels</Label>
            <div className="flex flex-wrap gap-2">
              {['Social Media', 'Email', 'Blog', 'Paid Ads', 'SEO', 'Partnerships', 'Events', 'PR'].map(channel => (
                <Badge
                  key={channel}
                  variant={formData.channels.includes(channel) ? "default" : "warning"}
                  className="cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => toggleChannel(channel)}
                >
                  {channel}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Content Types */}
        {selectedFunctionality === 'content-plan' && (
          <div className="space-y-3">
            <Label>Content Types</Label>
            <div className="flex flex-wrap gap-2">
              {['Blog Posts', 'Videos', 'Infographics', 'Podcasts', 'Case Studies', 'Whitepapers', 'Webinars', 'Social Posts'].map(type => (
                <Badge
                  key={type}
                  variant={formData.contentTypes.includes(type) ? "default" : "warning"}
                  className="cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => toggleContentType(type)}
                >
                  {type}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Generate Button */}
        <Button 
          onClick={handleGenerate} 
          className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 transition-all duration-200"
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Strategizing...
            </>
          ) : (
            'Generate Strategy'
          )}
        </Button>

        {/* Result Box */}
        {result && (
          <Card className="mt-6 bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200 animate-fade-in">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-purple-800 mb-3">AI Generated Strategy</h3>
              <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                {result}
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};
