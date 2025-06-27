'use client';

import React from 'react';
import { Trash2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FileText, Image, Video } from 'lucide-react';
import { useResults } from '@/contexts/ResultsContext';

export const renderGeneratedContent = ({
  content,
  answers,
}: {
  content: any;
  answers: any;
}) => {
  const selectedTypes = answers['content-type']?.split(',') || [];

  return (
    <div className="space-y-6">
      {content.caption &&
        selectedTypes.includes('Social Media Caption') && (
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <h5 className="mb-3 flex items-center font-medium text-blue-800">
              <FileText className="mr-2 h-4 w-4" />
              Social Media Caption
            </h5>
            <div className="space-y-3 text-sm">
              <div>
                <strong>Headline:</strong>
                <p className="mt-1 text-blue-700">
                  {content.caption.headline}
                </p>
              </div>
              <div>
                <strong>Copy:</strong>
                <p className="mt-1 whitespace-pre-line text-blue-700">
                  {content.caption.copy}
                </p>
              </div>
              <div>
                <strong>Call-to-Action:</strong>
                <p className="mt-1 text-blue-700">
                  {content.caption.cta}
                </p>
              </div>
              <div>
                <strong>Hashtags:</strong>
                <p className="mt-1 text-blue-700">
                  {content.caption.hashtags.join(' ')}
                </p>
              </div>
            </div>
          </div>
        )}

      {content.pageCopy &&
        selectedTypes.includes('Page Copy (Website/WhatsApp)') && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-4">
            <h5 className="mb-3 flex items-center font-medium text-green-800">
              <FileText className="mr-2 h-4 w-4" />
              Page Copy
            </h5>
            <div className="space-y-3 text-sm">
              <div>
                <strong>Title:</strong>
                <p className="mt-1 text-green-700">
                  {content.pageCopy.title}
                </p>
              </div>
              <div>
                <strong>Subtitle:</strong>
                <p className="mt-1 text-green-700">
                  {content.pageCopy.subtitle}
                </p>
              </div>
              <div>
                <strong>Content:</strong>
                <p className="mt-1 whitespace-pre-line text-green-700">
                  {content.pageCopy.content}
                </p>
              </div>
              <div>
                <strong>CTA:</strong>
                <p className="mt-1 text-green-700">
                  {content.pageCopy.cta}
                </p>
              </div>
            </div>
          </div>
        )}

      {content.imageScript &&
        selectedTypes.includes('AI Image Generation Script') && (
          <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
            <h5 className="mb-3 flex items-center font-medium text-purple-800">
              <Image className="mr-2 h-4 w-4" />
              AI Image Generation Script
            </h5>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Objective:</strong>{' '}
                {content.imageScript.objective}
              </p>
              <p>
                <strong>Format:</strong> {content.imageScript.format}
              </p>
              <p>
                <strong>Scene:</strong> {content.imageScript.scene}
              </p>
              <p>
                <strong>Visual Style:</strong>{' '}
                {content.imageScript.style}
              </p>
              <div className="mt-3 rounded bg-purple-100 p-3">
                <strong>Final AI Prompt:</strong>
                <p className="mt-1 italic text-purple-800">
                  "{content.imageScript.finalPrompt}"
                </p>
              </div>
            </div>
          </div>
        )}

      {content.videoScript &&
        selectedTypes.includes('AI Video Generation Script') && (
          <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
            <h5 className="mb-3 flex items-center font-medium text-orange-800">
              <Video className="mr-2 h-4 w-4" />
              AI Video Generation Script
            </h5>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Objective:</strong>{' '}
                {content.videoScript.objective}
              </p>
              <p>
                <strong>Duration:</strong>{' '}
                {content.videoScript.duration}
              </p>
              <p>
                <strong>Style:</strong> {content.videoScript.style}
              </p>
              <p>
                <strong>Script:</strong> {content.videoScript.script}
              </p>
              <div className="mt-3 rounded bg-orange-100 p-3">
                <strong>Final AI Prompt:</strong>
                <p className="mt-1 italic text-orange-800">
                  "{content.videoScript.finalPrompt}"
                </p>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export const ResultsDashboard: React.FC = () => {
  const { results, clearResults } = useResults();

  if (results.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="mb-2 text-lg font-semibold text-slate-800">
          Agent Results
        </h3>
        <p className="text-sm text-slate-600">
          No results yet. Run any agent to see results here.
        </p>
      </div>
    );
  }

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const renderResult = (result: any, agentId: string) => {
    if (agentId === 'marketing-calendar' && Array.isArray(result)) {
      return (
        <div className="rounded-lg border border-green-200 bg-white p-4">
          <h4 className="mb-4 font-medium text-slate-800">
            Your 7-Day Content Schedule:
          </h4>
          <div className="max-w-full overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Day</TableHead>
                  <TableHead className="text-xs">Channel</TableHead>
                  <TableHead className="text-xs">Format</TableHead>
                  <TableHead className="text-xs">Content Type</TableHead>
                  <TableHead className="text-xs">Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result.map((row: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="text-xs font-medium">
                      {row.day}
                    </TableCell>
                    <TableCell className="text-xs">{row.channel}</TableCell>
                    <TableCell className="text-xs">{row.format}</TableCell>
                    <TableCell className="text-xs">{row.contentType}</TableCell>
                    <TableCell className="text-xs">{row.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      );
    }

    if (agentId === 'post-ideas' && Array.isArray(result)) {
      return (
        <div className="space-y-6">
          {result.map((item, index) => (
            <div key={index} className="border-l-4 border-purple-300 pl-4">
              <div className="mb-3">
                <h5 className="font-semibold text-slate-800">
                  {item.day} - {item.channel} ({item.format})
                </h5>
                <p className="text-sm text-slate-600">
                  Original: {item.originalDescription}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-green-200 bg-green-50 p-3">
                  <h6 className="mb-2 font-medium text-green-800">
                    💡 Idea 1: {item.idea1.title}
                  </h6>
                  <p className="mb-2 text-sm text-green-700">
                    {item.idea1.description}
                  </p>
                  <div className="space-y-1 text-xs">
                    <p>
                      <strong>Hook:</strong> {item.idea1.hook}
                    </p>
                    <p>
                      <strong>CTA:</strong> {item.idea1.cta}
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
                  <h6 className="mb-2 font-medium text-blue-800">
                    💡 Idea 2: {item.idea2.title}
                  </h6>
                  <p className="mb-2 text-sm text-blue-700">
                    {item.idea2.description}
                  </p>
                  <div className="space-y-1 text-xs">
                    <p>
                      <strong>Hook:</strong> {item.idea2.hook}
                    </p>
                    <p>
                      <strong>CTA:</strong> {item.idea2.cta}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    // For other agent types, display as string
    if (agentId === 'marketing-strategy' && typeof result === 'string') {
      return (
        <div className="text-sm text-slate-700">
          <div className="rounded-lg border border-green-200 bg-white p-4">
            <h4 className="mb-2 font-medium text-slate-800">
              Marketing Strategy Summary:
            </h4>
            <div className="whitespace-pre-line text-slate-700">{result}</div>
          </div>
        </div>
      );
    }

    if (agentId === 'post-text' && result) {
      return (
        <div className="space-y-3">
          {renderGeneratedContent({
            content: result.content,
            answers: result.answers,
          })}
        </div>
      );
    }

    return (
      <div className="text-sm text-slate-700">
        {JSON.stringify(result).substring(0, 200)}...
      </div>
    );
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800">Agent Results</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={clearResults}
          className="text-red-600 hover:bg-red-50"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Clear All
        </Button>
      </div>

      <div className="space-y-4">
        {results.map((result) => (
          <div
            key={`${result.agentId}-${result.timestamp.getTime()}`}
            className="rounded-lg border border-slate-200 p-4"
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{result.agentIcon}</span>
                <h4 className="font-medium text-slate-800">
                  {result.agentTitle}
                </h4>
              </div>
              <div className="flex items-center text-xs text-slate-500">
                <Clock className="mr-1 h-3 w-3" />
                {formatTimestamp(result.timestamp)}
              </div>
            </div>

            <div className="rounded bg-slate-50 p-3">
              {renderResult(result.result, result.agentId)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
