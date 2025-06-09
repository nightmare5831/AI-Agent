'use client';

import React, { useState } from 'react';
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
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import Request from '@/lib/request';
import { getRequiredFieldsMarketing } from '@/lib/agent';
import { useAuth } from '@/core/auth/AuthProvider';

type Functionality =
  | 'content-calendar'
  | 'social-post'
  | 'story-creation'
  | 'ad-copy'
  | 'seo-optimization'
  | '';

type AgentProps = {
  isGenerating: boolean;
  setResult: (value: object) => void;
  setIsGenerating: (value: boolean) => void;
};

const initialInput = {
  brandName: '',
  businessGoals: '',
  industry: '',
  platforms: [] as string[],
  postFrequency: '',
  targetAudience: '',
  tone: '',
  productDescription: '',
  includeImage: false,
  keywords: [] as string[],
  adObjective: '',
};

export const MarketingAgent = ({
  isGenerating,
  setResult,
  setIsGenerating,
}: AgentProps) => {
  const [selectedFunctionality, setSelectedFunctionality] =
    useState<Functionality>('content-calendar');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState(initialInput);
  const [{ profile }] = useAuth();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const requiredFields = getRequiredFieldsMarketing(selectedFunctionality);

    requiredFields.forEach((field) => {
      if (field === 'platforms' || field === 'keywords') {
        if (formData[field].length === 0) {
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
      toast.error('Validation Error!');
      return;
    }

    setIsGenerating(true);

    const inputData = {
      agent: 'marketing',
      function: selectedFunctionality,
      inputs: formData,
    };

    const resultData = {
      user_id: profile.id,
      agent_type: 'marketing',
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
        toast.success('Marketing content generated successfully');
      })
      .catch((err) => {
        console.log('error', err);
        setIsGenerating(false);
        resultData.output_type = '';
        toast.error('Marketing content generating Error');
      });

    await Request.Post('/api/stripe/discount', resultData)
      .then((res) => console.log('loged result successfully!'))
      .catch((err) => console.log('error to log result!'));

    setFormData(initialInput);
  };

  const addKeyword = (keyword: string) => {
    if (keyword.trim() && !formData.keywords.includes(keyword.trim())) {
      setFormData((prev) => ({
        ...prev,
        keywords: [...prev.keywords, keyword.trim()],
      }));
      if (errors.keywords) {
        setErrors((prev) => ({ ...prev, keywords: '' }));
      }
    }
  };

  const removeKeyword = (keyword: string) => {
    setFormData((prev) => ({
      ...prev,
      keywords: prev.keywords.filter((k) => k !== keyword),
    }));
  };

  const togglePlatform = (platform: string) => {
    setFormData((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform],
    }));
    if (errors.platforms) {
      setErrors((prev) => ({ ...prev, platforms: '' }));
    }
  };

  const clearFieldError = (fieldName: string) => {
    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: '' }));
    }
  };

  const renderFields = () => {
    const fields = [];

    // Common fields for all functionalities
    if (
      [
        'content-calendar',
        'social-post',
        'story-creation',
        'ad-copy',
        'seo-optimization',
      ].includes(selectedFunctionality)
    ) {
      fields.push(
        <div key="brandName" className="space-y-2">
          <Label htmlFor="brandName">Brand Name *</Label>
          <Input
            id="brandName"
            value={formData.brandName}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, brandName: e.target.value }));
              clearFieldError('brandName');
            }}
            placeholder="Enter your brand name"
            className={`h-11 ${errors.brandName ? 'border-red-500' : ''}`}
          />
          {errors.brandName && (
            <p className="text-sm text-red-500">{errors.brandName}</p>
          )}
        </div>
      );

      fields.push(
        <div key="industry" className="space-y-2">
          <Label htmlFor="industry">Industry *</Label>
          <Select
            value={formData.industry}
            onValueChange={(value) => {
              setFormData((prev) => ({ ...prev, industry: value }));
              clearFieldError('industry');
            }}
          >
            <SelectTrigger
              className={`h-11 ${errors.industry ? 'border-red-500' : ''}`}
            >
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="retail">Retail</SelectItem>
              <SelectItem value="food">Food & Beverage</SelectItem>
            </SelectContent>
          </Select>
          {errors.industry && (
            <p className="text-sm text-red-500">{errors.industry}</p>
          )}
        </div>
      );
    }

    // Business Goals (for content-calendar, social-post, story-creation)
    if (
      ['content-calendar', 'social-post', 'story-creation'].includes(
        selectedFunctionality
      )
    ) {
      fields.push(
        <div key="businessGoals" className="space-y-2">
          <Label htmlFor="businessGoals">Business Goals *</Label>
          <Textarea
            id="businessGoals"
            value={formData.businessGoals}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                businessGoals: e.target.value,
              }));
              clearFieldError('businessGoals');
            }}
            placeholder="Describe your main business objectives..."
            className={`min-h-[100px] ${errors.businessGoals ? 'border-red-500' : ''}`}
          />
          {errors.businessGoals && (
            <p className="text-sm text-red-500">{errors.businessGoals}</p>
          )}
        </div>
      );
    }

    // Platforms (for content-calendar, social-post, ad-copy, seo-optimization)
    if (
      [
        'content-calendar',
        'social-post',
        'ad-copy',
        'seo-optimization',
      ].includes(selectedFunctionality)
    ) {
      fields.push(
        <div key="platforms" className="space-y-3">
          <Label>Platforms *</Label>
          <div className="flex flex-wrap gap-2">
            {[
              'Instagram',
              'Facebook',
              'Twitter',
              'LinkedIn',
              'TikTok',
              'YouTube',
            ].map((platform) => (
              <Badge
                key={platform}
                variant={
                  formData.platforms.includes(platform) ? 'success' : 'default'
                }
                className="cursor-pointer transition-transform hover:scale-105"
                onClick={() => togglePlatform(platform)}
              >
                {platform}
              </Badge>
            ))}
          </div>
          {errors.platforms && (
            <p className="text-sm text-red-500">{errors.platforms}</p>
          )}
        </div>
      );
    }

    // Post Frequency (only for content-calendar)
    if (selectedFunctionality === 'content-calendar') {
      fields.push(
        <div key="postFrequency" className="space-y-2">
          <Label htmlFor="postFrequency">Post Frequency *</Label>
          <Select
            value={formData.postFrequency}
            onValueChange={(value) => {
              setFormData((prev) => ({ ...prev, postFrequency: value }));
              clearFieldError('postFrequency');
            }}
          >
            <SelectTrigger
              className={`h-11 ${errors.postFrequency ? 'border-red-500' : ''}`}
            >
              <SelectValue placeholder="How often to post?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="3x-week">3x per week</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
            </SelectContent>
          </Select>
          {errors.postFrequency && (
            <p className="text-sm text-red-500">{errors.postFrequency}</p>
          )}
        </div>
      );
    }

    // Target Audience (for social-post, story-creation, ad-copy, seo-optimization)
    if (
      ['social-post', 'story-creation', 'ad-copy', 'seo-optimization'].includes(
        selectedFunctionality
      )
    ) {
      fields.push(
        <div key="targetAudience" className="space-y-2">
          <Label htmlFor="targetAudience">Target Audience *</Label>
          <Input
            id="targetAudience"
            value={formData.targetAudience}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                targetAudience: e.target.value,
              }));
              clearFieldError('targetAudience');
            }}
            placeholder="e.g., Small business owners"
            className={`h-11 ${errors.targetAudience ? 'border-red-500' : ''}`}
          />
          {errors.targetAudience && (
            <p className="text-sm text-red-500">{errors.targetAudience}</p>
          )}
        </div>
      );
    }

    // Tone (for social-post, story-creation, ad-copy, seo-optimization)
    if (
      ['social-post', 'story-creation', 'ad-copy', 'seo-optimization'].includes(
        selectedFunctionality
      )
    ) {
      fields.push(
        <div key="tone" className="space-y-2">
          <Label htmlFor="tone">Tone *</Label>
          <Select
            value={formData.tone}
            onValueChange={(value) => {
              setFormData((prev) => ({ ...prev, tone: value }));
              clearFieldError('tone');
            }}
          >
            <SelectTrigger
              className={`h-11 ${errors.tone ? 'border-red-500' : ''}`}
            >
              <SelectValue placeholder="Select tone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="friendly">Friendly</SelectItem>
              <SelectItem value="authoritative">Authoritative</SelectItem>
              <SelectItem value="playful">Playful</SelectItem>
            </SelectContent>
          </Select>
          {errors.tone && <p className="text-sm text-red-500">{errors.tone}</p>}
        </div>
      );
    }

    // Product Description (for social-post, story-creation, ad-copy, seo-optimization)
    if (
      ['social-post', 'story-creation', 'ad-copy', 'seo-optimization'].includes(
        selectedFunctionality
      )
    ) {
      fields.push(
        <div key="productDescription" className="space-y-2">
          <Label htmlFor="productDescription">
            Product/Service Description *
          </Label>
          <Textarea
            id="productDescription"
            value={formData.productDescription}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                productDescription: e.target.value,
              }));
              clearFieldError('productDescription');
            }}
            placeholder="Describe what you offer..."
            className={`min-h-[80px] ${errors.productDescription ? 'border-red-500' : ''}`}
          />
          {errors.productDescription && (
            <p className="text-sm text-red-500">{errors.productDescription}</p>
          )}
        </div>
      );
    }

    // Include Image (for social-post, story-creation)
    if (['social-post', 'story-creation'].includes(selectedFunctionality)) {
      fields.push(
        <div key="includeImage" className="flex items-center space-x-2">
          <Switch
            id="includeImage"
            checked={formData.includeImage}
            onCheckedChange={(checked) =>
              setFormData((prev) => ({ ...prev, includeImage: checked }))
            }
          />
          <Label htmlFor="includeImage">Include Image</Label>
        </div>
      );
    }

    // Keywords (for story-creation, ad-copy)
    if (['story-creation', 'ad-copy'].includes(selectedFunctionality)) {
      fields.push(
        <div key="keywords" className="space-y-3">
          <Label>Keywords *</Label>
          <div className="mb-2 flex flex-wrap gap-2">
            {formData.keywords.map((keyword) => (
              <Badge
                key={keyword}
                variant="success"
                className="cursor-pointer"
                onClick={() => removeKeyword(keyword)}
              >
                {keyword} ×
              </Badge>
            ))}
          </div>
          <Input
            placeholder="Type a keyword and press Enter"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                addKeyword(e.currentTarget.value);
                e.currentTarget.value = '';
              }
            }}
            className={`h-11 ${errors.keywords ? 'border-red-500' : ''}`}
          />
          {errors.keywords && (
            <p className="text-sm text-red-500">{errors.keywords}</p>
          )}
        </div>
      );
    }

    // Ad Objective (for story-creation, ad-copy)
    if (['story-creation', 'ad-copy'].includes(selectedFunctionality)) {
      fields.push(
        <div key="adObjective" className="space-y-2">
          <Label htmlFor="adObjective">Ad Objective *</Label>
          <Select
            value={formData.adObjective}
            onValueChange={(value) => {
              setFormData((prev) => ({ ...prev, adObjective: value }));
              clearFieldError('adObjective');
            }}
          >
            <SelectTrigger
              className={`h-11 ${errors.adObjective ? 'border-red-500' : ''}`}
            >
              <SelectValue placeholder="What's your goal?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="awareness">Brand Awareness</SelectItem>
              <SelectItem value="traffic">Website Traffic</SelectItem>
              <SelectItem value="leads">Lead Generation</SelectItem>
              <SelectItem value="sales">Sales Conversion</SelectItem>
              <SelectItem value="engagement">Engagement</SelectItem>
            </SelectContent>
          </Select>
          {errors.adObjective && (
            <p className="text-sm text-red-500">{errors.adObjective}</p>
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
            <SelectValue placeholder="Choose a marketing function..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="content-calendar">
              📅 Content Calendar
            </SelectItem>
            <SelectItem value="social-post">📱 Social Post</SelectItem>
            <SelectItem value="story-creation">📖 Story Creation</SelectItem>
            <SelectItem value="ad-copy">🎯 Ad Copy</SelectItem>
            <SelectItem value="seo-optimization">
              🔍 SEO Optimization
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Dynamic Form Fields */}
      {selectedFunctionality && (
        <div className="animate-fade-in space-y-6">
          <div className="grid grid-cols-1 gap-4">{renderFields()}</div>

          {/* Generate Button */}
          <Button
            onClick={() => handleGenerate()}
            className="h-12 w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-lg font-semibold transition-all duration-200 hover:from-blue-600 hover:to-cyan-600"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate Marketing Content'
            )}
          </Button>
        </div>
      )}
    </div>
  );
};
