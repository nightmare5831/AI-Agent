'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Loader2, X } from 'lucide-react';
import { toast } from 'sonner';
import Request from '@/lib/request';
import { getRequiredFieldsStrategy } from '@/lib/agent';
import { useAuth } from '@/core/auth/AuthProvider';

type Functionality =
  | 'brand-positioning'
  | 'audience-definition'
  | 'value-proposition'
  | 'pricing-strategy'
  | 'growth-plan'
  | 'content-plan'
  | '';

type AgentProps = {
  isGenerating: boolean;
  setResult: Function;
  setIsGenerating: Function;
};

const initialInput = {
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
  contentTypes: [] as string[],
};

export const StrategyAgent = ({
  isGenerating,
  setResult,
  setIsGenerating,
}: AgentProps) => {
  const [selectedFunctionality, setSelectedFunctionality] =
    useState<Functionality>('brand-positioning');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState(initialInput);
  const [{ profile }] = useAuth();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const requiredFields = getRequiredFieldsStrategy(selectedFunctionality);

    requiredFields.forEach((field) => {
      if (
        [
          'brandValues',
          'competitors',
          'painPoints',
          'benefits',
          'channels',
          'contentTypes',
        ].includes(field)
      ) {
        if (formData[field as keyof typeof formData].length === 0) {
          newErrors[field] = `${field} is required`;
        }
      } else if (
        !formData[field as keyof typeof formData] ||
        String(formData[field as keyof typeof formData]).trim() === ''
      ) {
        newErrors[field] = `${field} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGenerate = async () => {
    if (!validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const inputData = {
      agent: 'strategy',
      function: selectedFunctionality,
      inputs: formData,
    };

    let resultData = {
      user_id: profile.id,
      agent_type: 'strategy',
      task_type: selectedFunctionality,
      credits_spent: 1,
      output_type: '',
    };

    await Request.Post('/api/agents', inputData)
      .then((res) => {
        if (res.type === 'text') {
          setResult({ script: res.script, url: '' });
        } else {
          setResult({ script: res.script, url: res.imageUrl });
          resultData.credits_spent = 2
        }
        setIsGenerating(false);
        resultData.output_type = res.type;
        resultData.output_type = '';
        toast.success('Strategy generated successfully');
      })
      .catch((err) => {
        console.log('error', err);
        setIsGenerating(false);
        toast.error('Strategy generated Error!');
      });

    await Request.Post('/api/stripe/discount', resultData)
      .then((res) => console.log('loged result successfully!'))
      .catch((err) => console.log('error to log result!'));

    setFormData(initialInput);
  };

  const addBrandValue = (value: string) => {
    if (value.trim() && !formData.brandValues.includes(value.trim())) {
      setFormData((prev) => ({
        ...prev,
        brandValues: [...prev.brandValues, value.trim()],
      }));
      if (errors.brandValues) {
        setErrors((prev) => ({ ...prev, brandValues: '' }));
      }
    }
  };

  const removeBrandValue = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      brandValues: prev.brandValues.filter((v) => v !== value),
    }));
  };

  const addCompetitor = (competitor: string) => {
    if (
      competitor.trim() &&
      !formData.competitors.includes(competitor.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        competitors: [...prev.competitors, competitor.trim()],
      }));
      if (errors.competitors) {
        setErrors((prev) => ({ ...prev, competitors: '' }));
      }
    }
  };

  const removeCompetitor = (competitor: string) => {
    setFormData((prev) => ({
      ...prev,
      competitors: prev.competitors.filter((c) => c !== competitor),
    }));
  };

  const togglePainPoint = (point: string) => {
    setFormData((prev) => ({
      ...prev,
      painPoints: prev.painPoints.includes(point)
        ? prev.painPoints.filter((p) => p !== point)
        : [...prev.painPoints, point],
    }));
    if (errors.painPoints) {
      setErrors((prev) => ({ ...prev, painPoints: '' }));
    }
  };

  const toggleBenefit = (benefit: string) => {
    setFormData((prev) => ({
      ...prev,
      benefits: prev.benefits.includes(benefit)
        ? prev.benefits.filter((b) => b !== benefit)
        : [...prev.benefits, benefit],
    }));
    if (errors.benefits) {
      setErrors((prev) => ({ ...prev, benefits: '' }));
    }
  };

  const toggleChannel = (channel: string) => {
    setFormData((prev) => ({
      ...prev,
      channels: prev.channels.includes(channel)
        ? prev.channels.filter((c) => c !== channel)
        : [...prev.channels, channel],
    }));
    if (errors.channels) {
      setErrors((prev) => ({ ...prev, channels: '' }));
    }
  };

  const toggleContentType = (type: string) => {
    setFormData((prev) => ({
      ...prev,
      contentTypes: prev.contentTypes.includes(type)
        ? prev.contentTypes.filter((t) => t !== type)
        : [...prev.contentTypes, type],
    }));
    if (errors.contentTypes) {
      setErrors((prev) => ({ ...prev, contentTypes: '' }));
    }
  };

  const clearFieldError = (fieldName: string) => {
    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: '' }));
    }
  };

  const renderFields = () => {
    const fields = [];

    // Business Name (all functionalities)
    fields.push(
      <div key="businessName" className="space-y-2">
        <Label htmlFor="businessName">Business Name *</Label>
        <Input
          id="businessName"
          value={formData.businessName}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, businessName: e.target.value }));
            clearFieldError('businessName');
          }}
          placeholder="Enter your business name"
          className={`h-11 ${errors.businessName ? 'border-red-500' : ''}`}
        />
        {errors.businessName && (
          <p className="text-sm text-red-500">{errors.businessName}</p>
        )}
      </div>
    );

    // Mission Statement (for brand-positioning, pricing-strategy, growth-plan)
    if (
      ['brand-positioning', 'pricing-strategy', 'growth-plan'].includes(
        selectedFunctionality
      )
    ) {
      fields.push(
        <div key="missionStatement" className="space-y-2">
          <Label htmlFor="missionStatement">Mission Statement *</Label>
          <Textarea
            id="missionStatement"
            value={formData.missionStatement}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                missionStatement: e.target.value,
              }));
              clearFieldError('missionStatement');
            }}
            placeholder="Describe your company's mission and purpose..."
            className={`min-h-[80px] ${errors.missionStatement ? 'border-red-500' : ''}`}
          />
          {errors.missionStatement && (
            <p className="text-sm text-red-500">{errors.missionStatement}</p>
          )}
        </div>
      );
    }

    // Brand Values (for brand-positioning)
    if (selectedFunctionality === 'brand-positioning') {
      fields.push(
        <div key="brandValues" className="space-y-3">
          <Label>Brand Values *</Label>
          <div className="mb-2 flex flex-wrap gap-2">
            {formData.brandValues.map((value) => (
              <Badge
                key={value}
                variant="success"
                className="cursor-pointer"
                onClick={() => removeBrandValue(value)}
              >
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
            className={`h-11 ${errors.brandValues ? 'border-red-500' : ''}`}
          />
          {errors.brandValues && (
            <p className="text-sm text-red-500">{errors.brandValues}</p>
          )}
        </div>
      );
    }

    // Competitors (for brand-positioning, pricing-strategy)
    if (
      ['brand-positioning', 'pricing-strategy'].includes(selectedFunctionality)
    ) {
      fields.push(
        <div key="competitors" className="space-y-3">
          <Label>Competitors *</Label>
          <div className="mb-2 flex flex-wrap gap-2">
            {formData.competitors.map((competitor) => (
              <Badge
                key={competitor}
                variant="warning"
                className="cursor-pointer"
                onClick={() => removeCompetitor(competitor)}
              >
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
            className={`h-11 ${errors.competitors ? 'border-red-500' : ''}`}
          />
          {errors.competitors && (
            <p className="text-sm text-red-500">{errors.competitors}</p>
          )}
        </div>
      );
    }

    // Product Overview (for audience-definition, value-proposition)
    if (
      ['audience-definition', 'value-proposition'].includes(
        selectedFunctionality
      )
    ) {
      fields.push(
        <div key="productOverview" className="space-y-2">
          <Label htmlFor="productOverview">Product Overview *</Label>
          <Textarea
            id="productOverview"
            value={formData.productOverview}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                productOverview: e.target.value,
              }));
              clearFieldError('productOverview');
            }}
            placeholder="Describe your main products or services..."
            className={`min-h-[80px] ${errors.productOverview ? 'border-red-500' : ''}`}
          />
          {errors.productOverview && (
            <p className="text-sm text-red-500">{errors.productOverview}</p>
          )}
        </div>
      );
    }

    // Audience Description (for audience-definition, value-proposition)
    if (
      ['audience-definition', 'value-proposition'].includes(
        selectedFunctionality
      )
    ) {
      fields.push(
        <div key="audienceDescription" className="space-y-2">
          <Label htmlFor="audienceDescription">Audience Description *</Label>
          <Input
            id="audienceDescription"
            value={formData.audienceDescription}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                audienceDescription: e.target.value,
              }));
              clearFieldError('audienceDescription');
            }}
            placeholder="e.g., Small business owners in tech"
            className={`h-11 ${errors.audienceDescription ? 'border-red-500' : ''}`}
          />
          {errors.audienceDescription && (
            <p className="text-sm text-red-500">{errors.audienceDescription}</p>
          )}
        </div>
      );
    }

    // Pain Points (for audience-definition, value-proposition)
    if (
      ['audience-definition', 'value-proposition'].includes(
        selectedFunctionality
      )
    ) {
      fields.push(
        <div key="painPoints" className="space-y-3">
          <Label>Pain Points *</Label>
          <div className="flex flex-wrap gap-2">
            {[
              'High costs',
              'Time-consuming',
              'Lack of expertise',
              'Poor results',
              'Complex setup',
              'No support',
            ].map((point) => (
              <Badge
                key={point}
                variant={
                  formData.painPoints.includes(point) ? 'success' : 'default'
                }
                className="cursor-pointer transition-transform hover:scale-105"
                onClick={() => togglePainPoint(point)}
              >
                {point}
              </Badge>
            ))}
          </div>
          {errors.painPoints && (
            <p className="text-sm text-red-500">{errors.painPoints}</p>
          )}
        </div>
      );
    }

    // Benefits (for value-proposition, pricing-strategy)
    if (
      ['value-proposition', 'pricing-strategy'].includes(selectedFunctionality)
    ) {
      fields.push(
        <div key="benefits" className="space-y-3">
          <Label>Benefits *</Label>
          <div className="flex flex-wrap gap-2">
            {[
              'Cost savings',
              'Time efficiency',
              'Expert guidance',
              'Proven results',
              'Easy setup',
              '24/7 support',
            ].map((benefit) => (
              <Badge
                key={benefit}
                variant={
                  formData.benefits.includes(benefit) ? 'success' : 'default'
                }
                className="cursor-pointer transition-transform hover:scale-105"
                onClick={() => toggleBenefit(benefit)}
              >
                {benefit}
              </Badge>
            ))}
          </div>
          {errors.benefits && (
            <p className="text-sm text-red-500">{errors.benefits}</p>
          )}
        </div>
      );
    }

    // Pricing Fields (for pricing-strategy)
    if (selectedFunctionality === 'pricing-strategy') {
      fields.push(
        <div key="pricing" className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="baseCost">Base Cost ($) *</Label>
            <Input
              id="baseCost"
              type="number"
              value={formData.baseCost}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, baseCost: e.target.value }));
                clearFieldError('baseCost');
              }}
              placeholder="100"
              className={`h-11 ${errors.baseCost ? 'border-red-500' : ''}`}
            />
            {errors.baseCost && (
              <p className="text-sm text-red-500">{errors.baseCost}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="competitorPricing">Competitor Pricing ($) *</Label>
            <Input
              id="competitorPricing"
              type="number"
              value={formData.competitorPricing}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  competitorPricing: e.target.value,
                }));
                clearFieldError('competitorPricing');
              }}
              placeholder="120"
              className={`h-11 ${errors.competitorPricing ? 'border-red-500' : ''}`}
            />
            {errors.competitorPricing && (
              <p className="text-sm text-red-500">{errors.competitorPricing}</p>
            )}
          </div>
        </div>
      );
    }

    // Growth Plan Fields (for growth-plan)
    if (selectedFunctionality === 'growth-plan') {
      fields.push(
        <div
          key="growthFields"
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          <div className="space-y-2">
            <Label htmlFor="stage">Business Stage *</Label>
            <Select
              value={formData.stage}
              onValueChange={(value) => {
                setFormData((prev) => ({ ...prev, stage: value }));
                clearFieldError('stage');
              }}
            >
              <SelectTrigger
                className={`h-11 ${errors.stage ? 'border-red-500' : ''}`}
              >
                <SelectValue placeholder="Select stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="startup">Startup</SelectItem>
                <SelectItem value="growth">Growth</SelectItem>
                <SelectItem value="scale">Scale</SelectItem>
                <SelectItem value="mature">Mature</SelectItem>
              </SelectContent>
            </Select>
            {errors.stage && (
              <p className="text-sm text-red-500">{errors.stage}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="budget">Budget ($) *</Label>
            <Input
              id="budget"
              type="number"
              value={formData.budget}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, budget: e.target.value }));
                clearFieldError('budget');
              }}
              placeholder="10000"
              className={`h-11 ${errors.budget ? 'border-red-500' : ''}`}
            />
            {errors.budget && (
              <p className="text-sm text-red-500">{errors.budget}</p>
            )}
          </div>
        </div>
      );

      fields.push(
        <div key="goals" className="space-y-2">
          <Label htmlFor="goals">Goals *</Label>
          <Textarea
            id="goals"
            value={formData.goals}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, goals: e.target.value }));
              clearFieldError('goals');
            }}
            placeholder="Define your key business goals..."
            className={`min-h-[80px] ${errors.goals ? 'border-red-500' : ''}`}
          />
          {errors.goals && (
            <p className="text-sm text-red-500">{errors.goals}</p>
          )}
        </div>
      );
    }

    // Goals (for content-plan)
    if (selectedFunctionality === 'content-plan') {
      fields.push(
        <div key="goals" className="space-y-2">
          <Label htmlFor="goals">Goals *</Label>
          <Textarea
            id="goals"
            value={formData.goals}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, goals: e.target.value }));
              clearFieldError('goals');
            }}
            placeholder="Define your content goals..."
            className={`min-h-[80px] ${errors.goals ? 'border-red-500' : ''}`}
          />
          {errors.goals && (
            <p className="text-sm text-red-500">{errors.goals}</p>
          )}
        </div>
      );

      fields.push(
        <div key="stage" className="space-y-2">
          <Label htmlFor="stage">Business Stage *</Label>
          <Select
            value={formData.stage}
            onValueChange={(value) => {
              setFormData((prev) => ({ ...prev, stage: value }));
              clearFieldError('stage');
            }}
          >
            <SelectTrigger
              className={`h-11 ${errors.stage ? 'border-red-500' : ''}`}
            >
              <SelectValue placeholder="Select stage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="startup">Startup</SelectItem>
              <SelectItem value="growth">Growth</SelectItem>
              <SelectItem value="scale">Scale</SelectItem>
              <SelectItem value="mature">Mature</SelectItem>
            </SelectContent>
          </Select>
          {errors.stage && (
            <p className="text-sm text-red-500">{errors.stage}</p>
          )}
        </div>
      );
    }

    // Channels (for audience-definition, growth-plan, content-plan)
    if (
      ['audience-definition', 'growth-plan', 'content-plan'].includes(
        selectedFunctionality
      )
    ) {
      fields.push(
        <div key="channels" className="space-y-3">
          <Label>Channels *</Label>
          <div className="flex flex-wrap gap-2">
            {[
              'Social Media',
              'Email',
              'Blog',
              'Paid Ads',
              'SEO',
              'Partnerships',
              'Events',
              'PR',
            ].map((channel) => (
              <Badge
                key={channel}
                variant={
                  formData.channels.includes(channel) ? 'success' : 'default'
                }
                className="cursor-pointer transition-transform hover:scale-105"
                onClick={() => toggleChannel(channel)}
              >
                {channel}
              </Badge>
            ))}
          </div>
          {errors.channels && (
            <p className="text-sm text-red-500">{errors.channels}</p>
          )}
        </div>
      );
    }

    // Content Types (for growth-plan, content-plan)
    if (['growth-plan', 'content-plan'].includes(selectedFunctionality)) {
      fields.push(
        <div key="contentTypes" className="space-y-3">
          <Label>Content Types *</Label>
          <div className="flex flex-wrap gap-2">
            {[
              'Blog Posts',
              'Videos',
              'Infographics',
              'Podcasts',
              'Case Studies',
              'Whitepapers',
              'Webinars',
              'Social Posts',
            ].map((type) => (
              <Badge
                key={type}
                variant={
                  formData.contentTypes.includes(type) ? 'success' : 'default'
                }
                className="cursor-pointer transition-transform hover:scale-105"
                onClick={() => toggleContentType(type)}
              >
                {type}
              </Badge>
            ))}
          </div>
          {errors.contentTypes && (
            <p className="text-sm text-red-500">{errors.contentTypes}</p>
          )}
        </div>
      );
    }

    return fields;
  };

  return (
    <div className="space-y-6">
      {/* Functionality Selection */}
      <div className="space-y-2">
        <Label htmlFor="functionality" className="text-lg font-semibold">
          Select Functionality
        </Label>
        <Select
          value={selectedFunctionality}
          onValueChange={(value: Functionality) =>
            setSelectedFunctionality(value)
          }
        >
          <SelectTrigger className="h-12 text-base">
            <SelectValue placeholder="Choose a strategy function..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="brand-positioning">
              🎯 Brand Positioning
            </SelectItem>
            <SelectItem value="audience-definition">
              👥 Audience Definition
            </SelectItem>
            <SelectItem value="value-proposition">
              💎 Value Proposition
            </SelectItem>
            <SelectItem value="pricing-strategy">
              💰 Pricing Strategy
            </SelectItem>
            <SelectItem value="growth-plan">📈 Growth Plan</SelectItem>
            <SelectItem value="content-plan">📝 Content Plan</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Dynamic Form Fields */}
      <div className="animate-fade-in space-y-6">
        <div className="grid grid-cols-1 gap-4">{renderFields()}</div>

        {/* Generate Button */}
        <Button
          onClick={handleGenerate}
          className="h-12 w-full bg-gradient-to-r from-green-500 to-[#3ff48e] text-lg font-semibold transition-all duration-200 hover:from-green-600 hover:to-[#32d178]"
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
      </div>
    </div>
  );
};
