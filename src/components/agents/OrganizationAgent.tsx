'use client';
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Loader, Download, Share, Plus, X } from 'lucide-react';
import { toast } from 'sonner';

interface OrganizationAgentProps {
  credits: number;
  setCredits: (credits: number) => void;
}

export const OrganizationAgent = ({
  credits,
  setCredits,
}: OrganizationAgentProps) => {
  const [documentType, setDocumentType] = useState('');
  const [title, setTitle] = useState('');
  const [targetTeam, setTargetTeam] = useState('');
  const [outputFormat, setOutputFormat] = useState('');
  const [tasks, setTasks] = useState(['']);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDocument, setGeneratedDocument] = useState<any>(null);

  const addTask = () => {
    setTasks([...tasks, '']);
  };

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const updateTask = (index: number, value: string) => {
    const newTasks = [...tasks];
    newTasks[index] = value;
    setTasks(newTasks);
  };

  const handleGenerate = async () => {
    if (!documentType || !title || !targetTeam) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (credits < 1) {
      toast.error('You need at least 1 credit to generate documents');
      return;
    }

    setIsGenerating(true);

    // Simulate AI generation
    setTimeout(() => {
      const mockDocument = {
        title: title,
        type: documentType,
        team: targetTeam,
        content: `# ${title}\n\n## Overview\nThis ${documentType.toLowerCase()} has been generated for the ${targetTeam} team.\n\n## Key Points:\n${tasks
          .filter((t) => t.trim())
          .map((task, i) => `${i + 1}. ${task}`)
          .join(
            '\n'
          )}\n\n## Next Steps\n- Review this document with your team\n- Assign responsibilities\n- Set deadlines for completion\n- Monitor progress regularly`,
        generatedAt: new Date().toLocaleString(),
      };

      setGeneratedDocument(mockDocument);
      setCredits(credits - 1);
      setIsGenerating(false);

      toast.success('Your organizational document is ready');
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <Card className="border-2 border-green-100 bg-gradient-to-br from-green-50 to-emerald-50">
        <CardHeader className="rounded-t-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white">
          <CardTitle className="flex items-center justify-between">
            <span>Document Generator</span>
            <Badge variant="default" className="bg-white text-green-600">
              1 Credit
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Document Type *
              </label>
              <Select value={documentType} onValueChange={setDocumentType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="checklist">Checklist</SelectItem>
                  <SelectItem value="sop">
                    Customer service workflow 
                  </SelectItem>
                  <SelectItem value="briefing">Briefing Document</SelectItem>
                  <SelectItem value="weekly-plan">Weekly Plan</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Target Team *
              </label>
              <Select value={targetTeam} onValueChange={setTargetTeam} >
                <SelectTrigger>
                  <SelectValue placeholder="Select team" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sales">Sales Team</SelectItem>
                  <SelectItem value="support">Support Team</SelectItem>
                  <SelectItem value="ops">Operations Team</SelectItem>
                  <SelectItem value="marketing">Marketing Team</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Document Title *
            </label>
            <Input
              placeholder="e.g., Customer Onboarding Checklist"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Tasks or Key Points
            </label>
            <div className="space-y-3">
              {tasks.map((task, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    placeholder={`Task ${index + 1}`}
                    value={task}
                    onChange={(e) => updateTask(index, e.target.value)}
                    className="flex-1"
                  />
                  {tasks.length > 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeTask(index)}
                      className="px-2"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline" onClick={addTask} className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add Task
              </Button>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Output Format
            </label>
            <Select value={outputFormat} onValueChange={setOutputFormat}>
              <SelectTrigger>
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text (.txt)</SelectItem>
                <SelectItem value="pdf">PDF Document</SelectItem>
                <SelectItem value="excel">Excel Spreadsheet</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isGenerating || credits < 1}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
          >
            {isGenerating ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Generating Document...
              </>
            ) : (
              <>Generate Document</>
            )}
          </Button>
        </CardContent>
      </Card>

      <Card className="border-2 border-slate-200">
        <CardHeader>
          <CardTitle>Generated Document</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {!generatedDocument && !isGenerating && (
            <div className="py-12 text-center text-slate-500">
              <p>Generated document will appear here</p>
              <p className="mt-2 text-sm">
                Fill in the form and click generate to get started
              </p>
            </div>
          )}

          {isGenerating && (
            <div className="py-12 text-center">
              <Loader className="mx-auto mb-4 h-8 w-8 animate-spin text-green-500" />
              <p className="text-slate-600">
                AI is generating your document...
              </p>
            </div>
          )}

          {generatedDocument && (
            <div className="space-y-6">
              <div className="rounded-lg border bg-slate-50 p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {generatedDocument.title}
                  </h3>
                  <div className="mt-2 flex items-center space-x-4 text-sm text-slate-600">
                    <span>Type: {generatedDocument.type}</span>
                    <span>Team: {generatedDocument.team}</span>
                    <span>Generated: {generatedDocument.generatedAt}</span>
                  </div>
                </div>
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-sm text-slate-700">
                    {generatedDocument.content}
                  </pre>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download as {outputFormat || 'Text'}
                </Button>
                <Button variant="outline">
                  <Share className="mr-2 h-4 w-4" />
                  Share via WhatsApp
                </Button>
              </div>

              <Badge className="bg-white text-purple-600">1 credit used</Badge>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
