'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader } from 'lucide-react';

type ResultContentProps = {
  result: {
    script: string | string[];
    url: string;
  };
  isGenerating: boolean;
};

export const ResultContent = ({ result, isGenerating }: ResultContentProps) => {
  const hasResult = result?.script;
  console.log('result', result?.script)
  return (
    <Card className="h-full border-2 border-slate-200">
      <CardHeader>
        <CardTitle>Generated Content</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {!result && !isGenerating && (
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

        {hasResult && !isGenerating && (
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 text-lg font-semibold">Script:</h3>
              {Array.isArray(result.script) ? (
                <ul className="list-inside list-disc space-y-1">
                  {result.script.map((line, idx) => (
                    <li key={idx}>{line}</li>
                  ))}
                </ul>
              ) : (
                <p>{result.script}</p>
              )}
            </div>
        
            <div>
              <h3 className="mb-2 text-lg font-semibold">URL:</h3>
              <a
                href={result?.url}
                className="text-blue-600 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {result?.url}
              </a>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
