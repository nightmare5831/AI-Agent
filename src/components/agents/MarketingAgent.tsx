'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import Request from '@/lib/request';

type Functionality = 'content-calendar' | 'social-post' | 'story-creation' | 'ad-copy' | 'seo-optimization' | '';

export const MarketingAgent = () => {
  const [selectedFunctionality, setSelectedFunctionality] = useState<Functionality>('content-calendar');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
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
    adObjective: ''
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    const getRequiredFields = () => {
      switch (selectedFunctionality) {
        case 'content-calendar':
          return ['brandName', 'industry', 'businessGoals', 'platforms', 'postFrequency'];
        case 'social-post':
          return ['brandName', 'industry', 'businessGoals', 'platforms', 'targetAudience', 'tone', 'productDescription'];
        case 'story-creation':
          return ['brandName', 'industry', 'businessGoals', 'productDescription', 'targetAudience', 'tone', 'keywords', 'adObjective'];
        case 'ad-copy':
          return ['brandName', 'industry', 'productDescription', 'targetAudience', 'tone', 'keywords', 'adObjective', 'platforms'];
        case 'seo-optimization':
          return ['brandName', 'industry', 'productDescription', 'targetAudience', 'platforms', 'tone'];
        default:
          return [];
      }
    };

    const requiredFields = getRequiredFields();

    requiredFields.forEach(field => {
      if (field === 'platforms' || field === 'keywords') {
        if (formData[field].length === 0) {
          newErrors[field] = `${field} is required`;
        }
      } else if (!formData[field as keyof typeof formData] || String(formData[field as keyof typeof formData]).trim() === '') {
        newErrors[field] = `${field} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGenerate = async () => {
    if (!validateForm()) {
      toast.error("Validation Error!");
      return;
    }

    setIsGenerating(true);
    const mockResults : any = {}
    const inputData = {
      agent:'marketing',
      function: selectedFunctionality,
      inputs: formData
    }
    mockResults[selectedFunctionality] = await Request.Post('/api/agents', inputData);
    console.log('mockResult', mockResults[selectedFunctionality])
    setIsGenerating(false);
    // setResult(mockResults[selectedFunctionality] || 'Generated content will appear here...');
    
    toast.success("Marketing content generated successfully");
  };

  const addKeyword = (keyword: string) => {
    if (keyword.trim() && !formData.keywords.includes(keyword.trim())) {
      setFormData(prev => ({
        ...prev,
        keywords: [...prev.keywords, keyword.trim()]
      }));
      if (errors.keywords) {
        setErrors(prev => ({ ...prev, keywords: '' }));
      }
    }
  };

  const removeKeyword = (keyword: string) => {
    setFormData(prev => ({
      ...prev,
      keywords: prev.keywords.filter(k => k !== keyword)
    }));
  };

  const togglePlatform = (platform: string) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform]
    }));
    if (errors.platforms) {
      setErrors(prev => ({ ...prev, platforms: '' }));
    }
  };

  const clearFieldError = (fieldName: string) => {
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
  };

  const renderFields = () => {
    const fields = [];

    // Common fields for all functionalities
    if (['content-calendar', 'social-post', 'story-creation', 'ad-copy', 'seo-optimization'].includes(selectedFunctionality)) {
      fields.push(
        <div key="brandName" className="space-y-2">
          <Label htmlFor="brandName">Brand Name *</Label>
          <Input
            id="brandName"
            value={formData.brandName}
            onChange={(e) => {
              setFormData(prev => ({ ...prev, brandName: e.target.value }));
              clearFieldError('brandName');
            }}
            placeholder="Enter your brand name"
            className={`h-11 ${errors.brandName ? 'border-red-500' : ''}`}
          />
          {errors.brandName && <p className="text-sm text-red-500">{errors.brandName}</p>}
        </div>
      );

      fields.push(
        <div key="industry" className="space-y-2">
          <Label htmlFor="industry">Industry *</Label>
          <Select value={formData.industry} onValueChange={(value) => {
            setFormData(prev => ({ ...prev, industry: value }));
            clearFieldError('industry');
          }}>
            <SelectTrigger className={`h-11 ${errors.industry ? 'border-red-500' : ''}`}>
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
          {errors.industry && <p className="text-sm text-red-500">{errors.industry}</p>}
        </div>
      );
    }

    // Business Goals (for content-calendar, social-post, story-creation)
    if (['content-calendar', 'social-post', 'story-creation'].includes(selectedFunctionality)) {
      fields.push(
        <div key="businessGoals" className="space-y-2">
          <Label htmlFor="businessGoals">Business Goals *</Label>
          <Textarea
            id="businessGoals"
            value={formData.businessGoals}
            onChange={(e) => {
              setFormData(prev => ({ ...prev, businessGoals: e.target.value }));
              clearFieldError('businessGoals');
            }}
            placeholder="Describe your main business objectives..."
            className={`min-h-[100px] ${errors.businessGoals ? 'border-red-500' : ''}`}
          />
          {errors.businessGoals && <p className="text-sm text-red-500">{errors.businessGoals}</p>}
        </div>
      );
    }

    // Platforms (for content-calendar, social-post, ad-copy, seo-optimization)
    if (['content-calendar', 'social-post', 'ad-copy', 'seo-optimization'].includes(selectedFunctionality)) {
      fields.push(
        <div key="platforms" className="space-y-3">
          <Label>Platforms *</Label>
          <div className="flex flex-wrap gap-2">
            {['Instagram', 'Facebook', 'Twitter', 'LinkedIn', 'TikTok', 'YouTube'].map(platform => (
              <Badge
                key={platform}
                variant={formData.platforms.includes(platform) ? "default" : "warning"}
                className="cursor-pointer hover:scale-105 transition-transform"
                onClick={() => togglePlatform(platform)}
              >
                {platform}
              </Badge>
            ))}
          </div>
          {errors.platforms && <p className="text-sm text-red-500">{errors.platforms}</p>}
        </div>
      );
    }

    // Post Frequency (only for content-calendar)
    if (selectedFunctionality === 'content-calendar') {
      fields.push(
        <div key="postFrequency" className="space-y-2">
          <Label htmlFor="postFrequency">Post Frequency *</Label>
          <Select value={formData.postFrequency} onValueChange={(value) => {
            setFormData(prev => ({ ...prev, postFrequency: value }));
            clearFieldError('postFrequency');
          }}>
            <SelectTrigger className={`h-11 ${errors.postFrequency ? 'border-red-500' : ''}`}>
              <SelectValue placeholder="How often to post?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="3x-week">3x per week</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
            </SelectContent>
          </Select>
          {errors.postFrequency && <p className="text-sm text-red-500">{errors.postFrequency}</p>}
        </div>
      );
    }

    // Target Audience (for social-post, story-creation, ad-copy, seo-optimization)
    if (['social-post', 'story-creation', 'ad-copy', 'seo-optimization'].includes(selectedFunctionality)) {
      fields.push(
        <div key="targetAudience" className="space-y-2">
          <Label htmlFor="targetAudience">Target Audience *</Label>
          <Input
            id="targetAudience"
            value={formData.targetAudience}
            onChange={(e) => {
              setFormData(prev => ({ ...prev, targetAudience: e.target.value }));
              clearFieldError('targetAudience');
            }}
            placeholder="e.g., Small business owners"
            className={`h-11 ${errors.targetAudience ? 'border-red-500' : ''}`}
          />
          {errors.targetAudience && <p className="text-sm text-red-500">{errors.targetAudience}</p>}
        </div>
      );
    }

    // Tone (for social-post, story-creation, ad-copy, seo-optimization)
    if (['social-post', 'story-creation', 'ad-copy', 'seo-optimization'].includes(selectedFunctionality)) {
      fields.push(
        <div key="tone" className="space-y-2">
          <Label htmlFor="tone">Tone *</Label>
          <Select value={formData.tone} onValueChange={(value) => {
            setFormData(prev => ({ ...prev, tone: value }));
            clearFieldError('tone');
          }}>
            <SelectTrigger className={`h-11 ${errors.tone ? 'border-red-500' : ''}`}>
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
    if (['social-post', 'story-creation', 'ad-copy', 'seo-optimization'].includes(selectedFunctionality)) {
      fields.push(
        <div key="productDescription" className="space-y-2">
          <Label htmlFor="productDescription">Product/Service Description *</Label>
          <Textarea
            id="productDescription"
            value={formData.productDescription}
            onChange={(e) => {
              setFormData(prev => ({ ...prev, productDescription: e.target.value }));
              clearFieldError('productDescription');
            }}
            placeholder="Describe what you offer..."
            className={`min-h-[80px] ${errors.productDescription ? 'border-red-500' : ''}`}
          />
          {errors.productDescription && <p className="text-sm text-red-500">{errors.productDescription}</p>}
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
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, includeImage: checked }))}
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
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.keywords.map(keyword => (
              <Badge key={keyword} variant="success" className="cursor-pointer" onClick={() => removeKeyword(keyword)}>
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
          {errors.keywords && <p className="text-sm text-red-500">{errors.keywords}</p>}
        </div>
      );
    }

    // Ad Objective (for story-creation, ad-copy)
    if (['story-creation', 'ad-copy'].includes(selectedFunctionality)) {
      fields.push(
        <div key="adObjective" className="space-y-2">
          <Label htmlFor="adObjective">Ad Objective *</Label>
          <Select value={formData.adObjective} onValueChange={(value) => {
            setFormData(prev => ({ ...prev, adObjective: value }));
            clearFieldError('adObjective');
          }}>
            <SelectTrigger className={`h-11 ${errors.adObjective ? 'border-red-500' : ''}`}>
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
          {errors.adObjective && <p className="text-sm text-red-500">{errors.adObjective}</p>}
        </div>
      );
    }

    return fields;
  };

  return (
    <div className="space-y-6">
      {/* Functionality Selection */}
      <div className="space-y-2">
        <Label htmlFor="functionality" className="text-lg font-semibold">Select Functionality</Label>
        <Select value={selectedFunctionality} onValueChange={(value: Functionality) => setSelectedFunctionality(value)}>
          <SelectTrigger className="h-12 text-base">
            <SelectValue placeholder="Choose a marketing function..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="content-calendar">📅 Content Calendar</SelectItem>
            <SelectItem value="social-post">📱 Social Post</SelectItem>
            <SelectItem value="story-creation">📖 Story Creation</SelectItem>
            <SelectItem value="ad-copy">🎯 Ad Copy</SelectItem>
            <SelectItem value="seo-optimization">🔍 SEO Optimization</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Dynamic Form Fields */}
      {selectedFunctionality && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 gap-4">
            {renderFields()}
          </div>

          {/* Generate Button */}
          <Button 
            onClick={handleGenerate} 
            className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 transition-all duration-200"
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

          {/* Result Box */}
          {result && (
            <Card className="mt-6 bg-gradient-to-r from-pink-50 to-rose-50 border-pink-200 animate-fade-in">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-pink-800 mb-3">AI Generated Result</h3>
                <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                  {result}
                </div>
              </div>
            </Card>
          )}
        </div>
      )}

      {!selectedFunctionality && (
        <Card className="p-8 text-center bg-gradient-to-r from-pink-50 to-rose-50 border-pink-200">
          <p className="text-gray-600 text-lg">Select a functionality to get started with your marketing agent</p>
        </Card>
      )}
    </div>
  );
};
