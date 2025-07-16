'use client';

import React from 'react';
import {
  Trash2,
  Clock,
  ExternalLink,
  FileText,
  Image,
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
import { useLanguage } from '@/lib/i18n/language-context';

export const renderGeneratedContent = (content : any, t: any) => {
  const selectedTypes = content.type;

  return (
    <div className="space-y-6">
      {content && selectedTypes.includes('Social Media Caption') && (
        <div className="rounded-lg border border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/50 p-4">
          <h5 className="mb-3 flex items-center font-medium text-blue-800 dark:text-blue-200">
            <FileText className="mr-2 h-4 w-4" />
            {t.agents.socialMediaCaption || 'Social Media Caption'}
          </h5>
          <div className="space-y-3 text-sm">
            <div>
              <strong>Headline:</strong>
              <p className="mt-1 text-blue-700 dark:text-blue-300">{content.headline}</p>
            </div>
            <div>
              <strong>Copy:</strong>
              <p className="mt-1 whitespace-pre-line text-blue-700 dark:text-blue-300">
                {content.copy}
              </p>
            </div>
            <div>
              <strong>Call-to-Action:</strong>
              <p className="mt-1 text-blue-700 dark:text-blue-300">{content.cta}</p>
            </div>
            <div>
              <strong>Hashtags:</strong>
              <p className="mt-1 text-blue-700 dark:text-blue-300">
                {content.hashtags.join(' ')}
              </p>
            </div>
          </div>
        </div>
      )}

      {content && selectedTypes.includes('Page Copy (Website/WhatsApp)') && (
          <div className="rounded-lg border border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/50 p-4">
            <h5 className="mb-3 flex items-center font-medium text-green-800 dark:text-green-200">
              <FileText className="mr-2 h-4 w-4" />
              {t.agents.pageCopy || 'Page Copy'}
            </h5>
            <div className="space-y-3 text-sm">
              <div>
                <strong>Title:</strong>
                <p className="mt-1 text-green-700 dark:text-green-300">{content.title}</p>
              </div>
              <div>
                <strong>Subtitle:</strong>
                <p className="mt-1 text-green-700 dark:text-green-300">
                  {content.subtitle}
                </p>
              </div>
              <div>
                <strong>Content:</strong>
                <p className="mt-1 whitespace-pre-line text-green-700 dark:text-green-300">
                  {content.content}
                </p>
              </div>
              <div>
                <strong>CTA:</strong>
                <p className="mt-1 text-green-700 dark:text-green-300">{content.cta}</p>
              </div>
            </div>
          </div>
        )}

      {content && selectedTypes.includes('AI Image Generation Script') && (
          <div className="rounded-lg border border-purple-200 dark:border-purple-700 bg-purple-50 dark:bg-purple-900/50 p-4">
            <h5 className="mb-3 flex items-center font-medium text-purple-800 dark:text-purple-200">
              <Image className="mr-2 h-4 w-4" />
              {t.agents.aiImageGeneration || 'AI Image Generation Script'}
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
              <p>
                <strong>Character:</strong> {content.character}
              </p>
              <p>
                <strong>Expression:</strong> {content.expression}
              </p>
              <p>
                <strong>Colors:</strong> {content.colors}
              </p>
              <p>
                <strong>Logo:</strong> {content.logo}
              </p>
              <p>
                <strong>Elements:</strong> {content.elements}
              </p>
              <p>
                <strong>Orientation:</strong> {content.orientation}
              </p>
              <div className="mt-3 rounded bg-purple-100 dark:bg-purple-800/30 p-3">
                <strong>Final AI Prompt:</strong>
                <p className="mt-1 italic text-purple-800 dark:text-purple-200">
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
  const { t } = useLanguage();

  if (results.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
        <h3 className="mb-2 text-lg font-semibold text-slate-800 dark:text-slate-100">
          {t.agents.results}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          {t.agents.noResults}
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
        <div className="text-sm text-slate-700 dark:text-slate-300">
          <div className="rounded-lg border border-green-200 dark:border-green-700 bg-white dark:bg-slate-800 p-4">
            <h4 className="mb-2 font-medium text-slate-800 dark:text-slate-100">
              {t.agents.marketingStrategy}:
            </h4>
            <div className="whitespace-pre-line text-slate-700 dark:text-slate-300">{result}</div>
          </div>
        </div>
      );
    }

    if (agentId === 'marketing-calendar' && Array.isArray(result)) {
      return (
        <div className="rounded-lg border border-green-200 dark:border-green-700 bg-white dark:bg-slate-800 p-4">
          <h4 className="mb-4 font-medium text-slate-800 dark:text-slate-100">
            {t.agents.contentSchedule}:
          </h4>
          <div className="max-w-full overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">{t.agents.tableHeaders?.day || 'Day'}</TableHead>
                  <TableHead className="text-xs">{t.agents.tableHeaders?.channel || 'Channel'}</TableHead>
                  <TableHead className="text-xs">{t.agents.tableHeaders?.format || 'Format'}</TableHead>
                  <TableHead className="text-xs">{t.agents.tableHeaders?.placement || 'Placement'}</TableHead>
                  <TableHead className="text-xs">{t.agents.tableHeaders?.contentType || 'Content Type'}</TableHead>
                  <TableHead className="text-xs">{t.agents.tableHeaders?.description || 'Description'}</TableHead>
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
                <h5 className="font-semibold text-slate-800 dark:text-slate-100">
                  {item.day} - {item.channel} ({item.format})
                </h5>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Original: {item.originalDescription}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/50 p-3">
                  <h6 className="mb-2 font-medium text-green-800 dark:text-green-200">
                    💡 Idea 1: {item.idea1.title}
                  </h6>
                  <p className="mb-2 text-sm text-green-700 dark:text-green-300">
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

                <div className="rounded-lg border border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/50 p-3">
                  <h6 className="mb-2 font-medium text-blue-800 dark:text-blue-200">
                    💡 Idea 2: {item.idea2.title}
                  </h6>
                  <p className="mb-2 text-sm text-blue-700 dark:text-blue-300">
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
          {renderGeneratedContent(result, t)}
        </div>
      );
    }

    if (agentId === 'image-generation' && result) {
      return (
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <img
              src={result.url}
              alt="Generated image"
              className="max-h-[150px] max-w-[150px] rounded border object-cover"
            />
            <div className="flex-1">
              <div className="text-md text-slate-700 dark:text-slate-300">
                CampaignName:{' '}
                {result.settings.campaignName || 'Generated Image'}
              </div>
              <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Style: {result.settings?.style}
              </div>
              <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Format: {result.settings?.format}
              </div>
              <button
                onClick={() => window.open(result.image.url, '_blank')}
                className="mt-1 flex items-center text-sm text-blue-600 hover:text-blue-800"
              >
                <ExternalLink className="mr-1 h-3 w-3" />
                {t.agents.viewFullSize || 'View Full Size'}
              </button>
            </div>
          </div>
          <div className="text-md rounded bg-slate-50 dark:bg-slate-900 p-2 text-slate-600 dark:text-slate-300">
            <strong>Prompt:</strong> {result.prompt.substring(0, 300)}...
          </div>
        </div>
      );
    }

    if (agentId === 'seo-optimization' && result) {
      return (
        <div className="border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-6">
          <div className="space-y-4">
            {result.type === 'Content Optimization' ? (
              <div className="space-y-4">
                <div className="rounded-lg border border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/50 p-4">
                  <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">
                    ✨ Optimized Opening
                  </h3>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    {result.optimizedOpening}
                  </p>
                </div>

                <div className="rounded-lg border border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/50 p-4">
                  <h3 className="mb-2 font-semibold text-blue-800 dark:text-blue-200">
                    # Suggested Hashtags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {result.strategicHashtags.map(
                      (tag: string, index: number) => (
                        <span
                          key={index}
                          className="rounded bg-blue-200 dark:bg-blue-800/50 px-2 py-1 text-xs text-blue-800 dark:text-blue-200"
                        >
                          {tag}
                        </span>
                      )
                    )}
                  </div>
                </div>

                <div className="rounded-lg border border-purple-200 dark:border-purple-700 bg-purple-50 dark:bg-purple-900/50 p-4">
                  <h3 className="mb-2 font-semibold text-purple-800 dark:text-purple-200">
                    🎯 Improved CTA
                  </h3>
                  <p className="text-sm text-purple-700 dark:text-purple-300">
                    {result.improvedCTA}
                  </p>
                </div>

                <div className="rounded-lg border border-orange-200 dark:border-orange-700 bg-orange-50 dark:bg-orange-900/50 p-4">
                  <h3 className="mb-2 font-semibold text-orange-800 dark:text-orange-200">
                    🌀 Alternative Caption
                  </h3>
                  <p className="text-sm text-orange-700 dark:text-orange-300">
                    {result.alternativeCaption}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="rounded-lg border border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/50 p-4">
                  <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">
                    ✨ Suggested BIO
                  </h3>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    {result.suggestedBio}
                  </p>
                </div>

                <div className="rounded-lg border border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/50 p-4">
                  <h3 className="mb-2 font-semibold text-blue-800 dark:text-blue-200">
                    🏷️ Suggested Username
                  </h3>
                  <p className="font-mono text-sm text-blue-700 dark:text-blue-300">
                    {result.suggestedUsername}
                  </p>
                </div>

                <div className="rounded-lg border border-purple-200 dark:border-purple-700 bg-purple-50 dark:bg-purple-900/50 p-4">
                  <h3 className="mb-2 font-semibold text-purple-800 dark:text-purple-200">
                    📝 Suggested Profile Name
                  </h3>
                  <p className="text-sm text-purple-700 dark:text-purple-300">
                    {result.suggestedProfileName}
                  </p>
                </div>

                <div className="rounded-lg border border-orange-200 dark:border-orange-700 bg-orange-50 dark:bg-orange-900/50 p-4">
                  <h3 className="mb-2 font-semibold text-orange-800 dark:text-orange-200">
                    🔘 Instagram Highlights
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {result.instagramHighlights.map(
                      (highlight: string, index: number) => (
                        <span
                          key={index}
                          className="rounded-full bg-orange-200 dark:bg-orange-800/50 px-2 py-1 text-xs text-orange-800 dark:text-orange-200"
                        >
                          {highlight}
                        </span>
                      )
                    )}
                  </div>
                </div>

                <div className="rounded-lg border border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/50 p-4">
                  <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">
                    🔗 Link in Bio CTA
                  </h3>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    {result.linkInBioCTA}
                  </p>
                </div>

                <div className="rounded-lg border border-indigo-200 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-900/50 p-4">
                  <h3 className="mb-2 font-semibold text-indigo-800 dark:text-indigo-200">
                    🧠 SEO Keywords
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {result.seoKeywords.map(
                      (keyword: string, index: number) => (
                        <span
                          key={index}
                          className="rounded bg-indigo-200 dark:bg-indigo-800/50 px-2 py-1 text-xs text-indigo-800 dark:text-indigo-200"
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
      <div className="text-sm text-slate-700 dark:text-slate-300">
        {JSON.stringify(result).substring(0, 200)}...
      </div>
    );
  };

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">{t.agents.results}</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={clearResults}
          className="text-red-600 hover:bg-red-50"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          {t.agents.clearAll}
        </Button>
      </div>

      <div className="space-y-4">
        {results.map((result) => (
          <div
            key={`${result.agentId}-${result.timestamp.getTime()}`}
            className="rounded-lg border border-slate-200 dark:border-slate-700 p-4"
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{result.agentIcon}</span>
                <h4 className="font-medium text-slate-800 dark:text-slate-100">
                  {result.agentTitle}
                </h4>
              </div>
              <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                <Clock className="mr-1 h-3 w-3" />
                {formatTimestamp(result.timestamp)}
              </div>
            </div>

            <div className="rounded bg-slate-50 dark:bg-slate-900 p-3">
              {renderResult(result.result, result.agentId)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
