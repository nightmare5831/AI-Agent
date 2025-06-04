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

type Functionality = 'content-calendar' | 'social-post' | 'story-ideas' | 'ad-copy' | 'seo-tips' | '';

export const MarketingAgent = () => {
  const [selectedFunctionality, setSelectedFunctionality] = useState<Functionality>('content-calendar');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState('');
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

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate AI processing
    const mockResults : any = {}

    await new Promise(resolve => setTimeout(resolve, 2000));
    
    mockResults[selectedFunctionality] = {
      'content-calendar': `📅 Content Calendar Generated!\n\nWeek 1:\n• Monday: Brand story post\n• Wednesday: Product showcase\n• Friday: Customer testimonial\n\nWeek 2:\n• Monday: Industry insights\n• Wednesday: Behind-the-scenes\n• Friday: User-generated content\n\nOptimized for ${formData.platforms.join(', ')} with ${formData.tone} tone.`,
      'social-post': `📱 Social Post Created!\n\n"🚀 Exciting news from ${formData.brandName}! \n\nWe're revolutionizing ${formData.industry} with our innovative approach. Here's what makes us different:\n\n✨ Customer-focused solutions\n✨ Cutting-edge technology\n✨ Proven results\n\nReady to transform your business? Let's connect! 💪\n\n#${formData.brandName} #Innovation #Growth"`,
      'story-ideas': `💡 Story Ideas for ${formData.brandName}:\n\n1. "From Zero to Hero" - Customer success journey\n2. "Behind the Magic" - Your process revealed\n3. "Industry Disruption" - How you're changing the game\n4. "Team Spotlight" - Meet the people behind the brand\n5. "Future Vision" - Where your industry is heading\n\nEach story targets ${formData.targetAudience} with authentic, engaging content.`,
      'ad-copy': `🎯 High-Converting Ad Copy:\n\nHeadline: "Transform Your ${formData.industry} Business in 30 Days"\n\nBody: Tired of outdated solutions? ${formData.brandName} delivers results that matter. Join 1000+ satisfied customers who've revolutionized their operations.\n\n✅ Proven system\n✅ Expert support\n✅ Guaranteed results\n\nCTA: "Start Your Transformation Today"\n\nOptimized for ${formData.adObjective} campaigns.`,
      'seo-tips': `🔍 SEO Strategy for ${formData.brandName}:\n\nPrimary Keywords: ${formData.keywords.join(', ')}\n\nContent Pillars:\n• How-to guides (40%)\n• Industry insights (30%)\n• Product features (20%)\n• Case studies (10%)\n\nTechnical Recommendations:\n✅ Optimize page speed\n✅ Mobile-first design\n✅ Schema markup\n✅ Internal linking strategy\n\nExpected organic traffic increase: 150% in 6 months`
    };

    setResult(mockResults[selectedFunctionality] || 'Generated content will appear here...');
    setIsGenerating(false);
  };

  const addKeyword = (keyword: string) => {
    if (keyword.trim() && !formData.keywords.includes(keyword.trim())) {
      setFormData(prev => ({
        ...prev,
        keywords: [...prev.keywords, keyword.trim()]
      }));
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
            <SelectItem value="social-post">📱 Social Post with Image</SelectItem>
            <SelectItem value="story-ideas">📖 Story Ideas</SelectItem>
            <SelectItem value="ad-copy">🎯 Ad Copy</SelectItem>
            <SelectItem value="seo-tips">🔍 SEO Tips</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Dynamic Form Fields */}
      {selectedFunctionality && (
        <div className="space-y-6 animate-fade-in">
          {/* Common Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="brandName">Brand Name</Label>
              <Input
                id="brandName"
                value={formData.brandName}
                onChange={(e) => setFormData(prev => ({ ...prev, brandName: e.target.value }))}
                placeholder="Enter your brand name"
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Select value={formData.industry} onValueChange={(value) => setFormData(prev => ({ ...prev, industry: value }))}>
                <SelectTrigger className="h-11">
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
            </div>
          </div>

          {/* Business Goals */}
          <div className="space-y-2">
            <Label htmlFor="businessGoals">Business Goals</Label>
            <Textarea
              id="businessGoals"
              value={formData.businessGoals}
              onChange={(e) => setFormData(prev => ({ ...prev, businessGoals: e.target.value }))}
              placeholder="Describe your main business objectives..."
              className="min-h-[100px]"
            />
          </div>

          {/* Functionality-specific fields */}
          {(selectedFunctionality === 'content-calendar' || selectedFunctionality === 'social-post') && (
            <>
              <div className="space-y-3">
                <Label>Platforms</Label>
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
              </div>

              {selectedFunctionality === 'content-calendar' && (
                <div className="space-y-2">
                  <Label htmlFor="postFrequency">Post Frequency</Label>
                  <Select value={formData.postFrequency} onValueChange={(value) => setFormData(prev => ({ ...prev, postFrequency: value }))}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="How often to post?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="3x-week">3x per week</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </>
          )}

          {(selectedFunctionality === 'social-post' || selectedFunctionality === 'ad-copy') && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="targetAudience">Target Audience</Label>
                  <Input
                    id="targetAudience"
                    value={formData.targetAudience}
                    onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))}
                    placeholder="e.g., Small business owners"
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tone">Tone</Label>
                  <Select value={formData.tone} onValueChange={(value) => setFormData(prev => ({ ...prev, tone: value }))}>
                    <SelectTrigger className="h-11">
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
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="productDescription">Product/Service Description</Label>
                <Textarea
                  id="productDescription"
                  value={formData.productDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, productDescription: e.target.value }))}
                  placeholder="Describe what you offer..."
                  className="min-h-[80px]"
                />
              </div>
            </>
          )}

          {selectedFunctionality === 'social-post' && (
            <div className="flex items-center space-x-2">
              <Switch
                id="includeImage"
                checked={formData.includeImage}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, includeImage: checked }))}
              />
              <Label htmlFor="includeImage">Include Image</Label>
            </div>
          )}

          {(selectedFunctionality === 'seo-tips' || selectedFunctionality === 'ad-copy') && (
            <>
              {selectedFunctionality === 'seo-tips' && (
                <div className="space-y-3">
                  <Label>Keywords</Label>
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
                    className="h-11"
                  />
                </div>
              )}

              {selectedFunctionality === 'ad-copy' && (
                <div className="space-y-2">
                  <Label htmlFor="adObjective">Ad Objective</Label>
                  <Select value={formData.adObjective} onValueChange={(value) => setFormData(prev => ({ ...prev, adObjective: value }))}>
                    <SelectTrigger className="h-11">
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
                </div>
              )}
            </>
          )}

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