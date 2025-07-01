'use client';

import React from 'react';
import {
  Trash2,
  Clock,
  ExternalLink,
  FileText,
  Image,
  Video,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
      {content && selectedTypes.includes('Social Media Caption') && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <h5 className="mb-3 flex items-center font-medium text-blue-800">
            <FileText className="mr-2 h-4 w-4" />
            Social Media Caption
          </h5>
          <div className="space-y-3 text-sm">
            <div>
              <strong>Headline:</strong>
              <p className="mt-1 text-blue-700">{content.headline}</p>
            </div>
            <div>
              <strong>Copy:</strong>
              <p className="mt-1 whitespace-pre-line text-blue-700">
                {content.copy}
              </p>
            </div>
            <div>
              <strong>Call-to-Action:</strong>
              <p className="mt-1 text-blue-700">{content.cta}</p>
            </div>
            <div>
              <strong>Hashtags:</strong>
              <p className="mt-1 text-blue-700">
                {content.hashtags.join(' ')}
              </p>
            </div>
          </div>
        </div>
      )}

      {content && selectedTypes.includes('Page Copy (Website/WhatsApp)') && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-4">
            <h5 className="mb-3 flex items-center font-medium text-green-800">
              <FileText className="mr-2 h-4 w-4" />
              Page Copy
            </h5>
            <div className="space-y-3 text-sm">
              <div>
                <strong>Title:</strong>
                <p className="mt-1 text-green-700">{content.title}</p>
              </div>
              <div>
                <strong>Subtitle:</strong>
                <p className="mt-1 text-green-700">
                  {content.subtitle}
                </p>
              </div>
              <div>
                <strong>Content:</strong>
                <p className="mt-1 whitespace-pre-line text-green-700">
                  {content.content}
                </p>
              </div>
              <div>
                <strong>CTA:</strong>
                <p className="mt-1 text-green-700">{content.cta}</p>
              </div>
            </div>
          </div>
        )}

      {content && selectedTypes.includes('AI Image Generation Script') && (
          <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
            <h5 className="mb-3 flex items-center font-medium text-purple-800">
              <Image className="mr-2 h-4 w-4" />
              AI Image Generation Script
            </h5>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Objective:</strong> {content.objective}
              </p>
              <p>
                <strong>Format:</strong> {content.format}
              </p>
              <p>
                <strong>Scene:</strong> {content.scene}
              </p>
              <p>
                <strong>Visual Style:</strong> {content.style}
              </p>
              <div className="mt-3 rounded bg-purple-100 p-3">
                <strong>Final AI Prompt:</strong>
                <p className="mt-1 italic text-purple-800">
                  "{content.finalPrompt}"
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
                  <TableHead className="text-xs">Placement</TableHead>
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
                    <TableCell className="text-xs">{row.placement}</TableCell>
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

    if (agentId === 'image-generation' && result && result.image) {
      return (
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <img
              src={result.image.url}
              alt="Generated image"
              className="max-h-[150px] max-w-[150px] rounded border object-cover"
            />
            <div className="flex-1">
              <div className="text-md text-slate-700">
                CampaignName:{' '}
                {result.settings.campaignName || 'Generated Image'}
              </div>
              <div className="mt-1 text-sm text-slate-500">
                Style: {result.settings?.style}
              </div>
              <div className="mt-1 text-sm text-slate-500">
                Format: {result.settings?.format}
              </div>
              <button
                onClick={() => window.open(result.image.url, '_blank')}
                className="mt-1 flex items-center text-sm text-blue-600 hover:text-blue-800"
              >
                <ExternalLink className="mr-1 h-3 w-3" />
                View Full Size
              </button>
            </div>
          </div>
          <div className="text-md rounded bg-slate-50 p-2 text-slate-600">
            <strong>Prompt:</strong> {result.prompt.substring(0, 300)}...
          </div>
        </div>
      );
    }

    if (agentId === 'seo-optimization' && result) {
      return (
        <div className="border-t border-slate-100 bg-slate-50 p-6">
          <div className="space-y-4">
            {result.type === 'content' ? (
              <div className="space-y-4">
                <div className="rounded-lg border bg-green-50 p-4">
                  <h3 className="mb-2 font-semibold text-green-800">
                    ✨ Optimized Opening
                  </h3>
                  <p className="text-sm text-green-700">
                    {result.optimizedOpening}
                  </p>
                </div>

                <div className="rounded-lg border bg-blue-50 p-4">
                  <h3 className="mb-2 font-semibold text-blue-800">
                    # Suggested Hashtags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {result.suggestedHashtags.map(
                      (tag: string, index: number) => (
                        <span
                          key={index}
                          className="rounded bg-blue-200 px-2 py-1 text-xs text-blue-800"
                        >
                          {tag}
                        </span>
                      )
                    )}
                  </div>
                </div>

                <div className="rounded-lg border bg-purple-50 p-4">
                  <h3 className="mb-2 font-semibold text-purple-800">
                    🎯 Improved CTA
                  </h3>
                  <p className="text-sm text-purple-700">
                    {result.improvedCTA}
                  </p>
                </div>

                <div className="rounded-lg border bg-orange-50 p-4">
                  <h3 className="mb-2 font-semibold text-orange-800">
                    🌀 Alternative Caption
                  </h3>
                  <p className="text-sm text-orange-700">
                    {result.alternativeCaption}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="rounded-lg border bg-green-50 p-4">
                  <h3 className="mb-2 font-semibold text-green-800">
                    ✨ Suggested BIO
                  </h3>
                  <p className="text-sm text-green-700">
                    {result.suggestedBio}
                  </p>
                </div>

                <div className="rounded-lg border bg-blue-50 p-4">
                  <h3 className="mb-2 font-semibold text-blue-800">
                    🏷️ Suggested Username
                  </h3>
                  <p className="font-mono text-sm text-blue-700">
                    {result.suggestedUsername}
                  </p>
                </div>

                <div className="rounded-lg border bg-purple-50 p-4">
                  <h3 className="mb-2 font-semibold text-purple-800">
                    📝 Suggested Profile Name
                  </h3>
                  <p className="text-sm text-purple-700">
                    {result.suggestedProfileName}
                  </p>
                </div>

                <div className="rounded-lg border bg-orange-50 p-4">
                  <h3 className="mb-2 font-semibold text-orange-800">
                    🔘 Instagram Highlights
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {result.instagramHighlights.map(
                      (highlight: string, index: number) => (
                        <span
                          key={index}
                          className="rounded-full bg-orange-200 px-2 py-1 text-xs text-orange-800"
                        >
                          {highlight}
                        </span>
                      )
                    )}
                  </div>
                </div>

                <div className="rounded-lg border bg-green-50 p-4">
                  <h3 className="mb-2 font-semibold text-green-800">
                    🔗 Link in Bio CTA
                  </h3>
                  <p className="text-sm text-green-700">
                    {result.linkInBioCTA}
                  </p>
                </div>

                <div className="rounded-lg border bg-indigo-50 p-4">
                  <h3 className="mb-2 font-semibold text-indigo-800">
                    🧠 SEO Keywords
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {result.seoKeywords.map(
                      (keyword: string, index: number) => (
                        <span
                          key={index}
                          className="rounded bg-indigo-200 px-2 py-1 text-xs text-indigo-800"
                        >
                          {keyword}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
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
