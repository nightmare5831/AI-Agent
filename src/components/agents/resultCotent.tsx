'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader, Loader2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import Request from '@/lib/request';
import { record, string } from 'zod';

type ResultContentProps = {
  result: {
    script: string | string[];
    url: string;
    type: Record<string, string>;
  };
  isGenerating: boolean;
};

export const ResultContent = ({ result, isGenerating }: ResultContentProps) => {
  const [hasResult, setHasResult] = useState(null);
  const [adjustment, setAdjustment] = useState('');
  const [isAdjusting, setAdjustmenting] = useState(false)

  const adjustmentResult = async () => {
    console.log('adjustment');
    if (adjustment === '' && result?.script) {
      toast.error('Missing Adjustment Text or Not exist result!');
      return;
    }

    setAdjustmenting(true);
    const newPrompt = `
      Now the ${result?.type} Agent result is like as below 
      -------
      ${result?.script}
      --------
      Now User want to adjustment this result like as follow.
      --------
      adjustment : "${adjustment}"
    `;
    const inputData = {
      agent: result?.type?.agent,
      function: result?.type?.task,
      inputs: {},
      adjust: newPrompt,
    };

    const resultData = {
      user_id: result?.type?.user_id,
      agent_type: result?.type?.agent,
      task_type: result?.type?.task,
      credits_spent: 1,
      output_type: 'text',
    };
    console.log('resultData', resultData, 'inputData', inputData)
    await Request.Post('/api/agents', inputData)
      .then((res) => {
        console.log('adjust result', res?.script);
        result = res.script;
        isGenerating = false;
        toast.success(`Adjust ${resultData.agent_type} generated successfully`);
        setHasResult(res?.script);
      })
      .catch((err) => {
        console.log('error', err);
        toast.error(`Adjust ${resultData.agent_type} generated Error!`);
      });
    await Request.Post('/api/stripe/discount', resultData)
      .then((res) => console.log('loged result successfully!'))
      .catch((err) => console.log('error to log result!'));
    setAdjustmenting(false);
  };

  useEffect(() => {
    setHasResult(result?.script);
  }, [result?.script, isGenerating]);

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle className="text-center">Generated Content</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col overflow-hidden p-0">
        {/* Top: Result Display (4/5) */}
        <div className="flex-[4] overflow-y-auto border-b border-slate-200 p-4">
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
                {Array.isArray(hasResult) ? (
                  <ul className="list-inside list-disc space-y-1">
                    {hasResult.map((line, idx) => (
                      <li key={idx}>{line}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{hasResult}</p>
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
        </div>

        {/* Bottom: Adjust Section (1/5) */}
        <div className="flex-[1] space-y-6 p-4">
          <Textarea
            placeholder="Adjust the result here..."
            value={adjustment}
            onChange={(e) => setAdjustment(e.target.value)}
            className="h-20 resize-none"
          />
          
          <Button
            onClick={adjustmentResult}
            className="mt-2 w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-lg font-semibold transition-all duration-200 hover:from-blue-600 hover:to-cyan-600"
            disabled={isAdjusting}
          >
            {isAdjusting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Adjusting...
              </>
            ) : (
              'Adjust'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
