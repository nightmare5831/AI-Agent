// 1. MarketingAgent.tsx
'use client';
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
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
import { Badge } from '@/components/ui/badge';
import { Loader, RefreshCw, Download, Calendar } from 'lucide-react';
import { toast } from 'sonner';

interface MarketingAgentProps {
  credits: number;
  setCredits: (credits: number) => void;
}

export const MarketingAgent = ({
  credits,
  setCredits,
}: MarketingAgentProps) => {
  const [platform, setPlatform] = useState('');
  const [brief, setBrief] = useState('');
  const [postType, setPostType] = useState('');
  const [keywords, setKeywords] = useState('');
  const [tone, setTone] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<any>(null);

  const handleGenerate = async () => {
    if (!platform || !brief || !postType || !tone) {
      toast.error('Please fill in all required fields');
      return;
    }
    console.log('credit', credits)

    if (credits < 1) {
      toast.error('You need at least 1 credit to generate content');
      return;
    }

    setIsGenerating(true);

    // Simulate AI generation
    setTimeout(() => {
      const mockContent = {
        caption: `🚀 Excited to share our latest innovation! ${brief.substring(0, 50)}... \n\n✨ ${keywords
          .split(',')
          .map((k) => `#${k.trim()}`)
          .join(' ')}\n\n#innovation #business #growth`,
        imageUrl:
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=500&fit=crop&crop=center',
      };

      setGeneratedContent(mockContent);
      setCredits(credits - 1);
      setIsGenerating(false);

      toast.success('Your marketing content is ready');
    }, 2000);
  };

  const handleRegenerate = () => {
    setGeneratedContent(null);
    handleGenerate();
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <Card className="border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardHeader className="rounded-t-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
          <CardTitle className="flex items-center justify-between">
            <span>Marketing Content Generator</span>
            <Badge variant="default" className="bg-white text-purple-600">
              1 Credits
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Platform *
              </label>
              <Select value={platform} onValueChange={setPlatform}>
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="twitter">Twitter</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Post Type *
              </label>
              <Select value={postType} onValueChange={setPostType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text-only</SelectItem>
                  <SelectItem value="image">Image Post</SelectItem>
                  <SelectItem value="video">Video Post</SelectItem>
                  <SelectItem value="story">Story</SelectItem>
                  <SelectItem value="carousel">Carousel</SelectItem>
                  <SelectItem value="ad">AD Copy</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Campaign Brief *
            </label>
            <Textarea
              placeholder="Describe your campaign or post objective"
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Keywords / Hashtags
            </label>
            <Input
              placeholder="#business, #innovation, #startup, (comma separated)"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Tone & Style *
              </label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger>
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isGenerating || credits < 1}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
          >
            {isGenerating ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Generating Content...
              </>
            ) : (
              <>Generate Marketing Content</>
            )}
          </Button>
        </CardContent>
      </Card>

      <Card className="border-2 border-slate-200">
        <CardHeader>
          <CardTitle>Generated Content</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {!generatedContent && !isGenerating && (
            <div className="py-12 text-center text-slate-500">
              <p>Generated content will appear here</p>
              <p className="mt-2 text-sm">
                Fill in the form and click generate to get started
              </p>
            </div>
          )}

          {isGenerating && (
            <div className="py-12 text-center">
              <Loader className="mx-auto mb-4 h-8 w-8 animate-spin text-blue-500" />
              <p className="text-slate-600">AI is generating your content...</p>
            </div>
          )}

          {generatedContent && (
            <div className="space-y-6">
              <div>
                <h3 className="mb-3 font-semibold text-slate-900">
                  Generated Caption
                </h3>
                <div className="rounded-lg border bg-slate-50 p-4">
                  <p className="whitespace-pre-line">
                    {generatedContent.caption}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="mb-3 font-semibold text-slate-900">
                  Generated Image
                </h3>
                <div className="rounded-lg border bg-slate-50 p-4">
                  <img
                    src={generatedContent.imageUrl}
                    alt="Generated content"
                    className="mx-auto w-full max-w-md rounded-lg shadow-sm"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  onClick={handleRegenerate}
                  disabled={credits < 1}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Another
                </Button>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Save Content
                </Button>
                <Button variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Post
                </Button>
              </div>

              <Badge variant="success" className="bg-green-100 text-green-700">
                1 credit used
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
