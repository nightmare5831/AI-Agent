'use client';

import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AgentHeaderProps {
  icon: string;
  title: string;
  description: string;
  isExpanded: boolean;
  onClick: () => void;
}

export const AgentHeader: React.FC<AgentHeaderProps> = ({
  icon,
  title,
  description,
  isExpanded,
  onClick,
}) => {
  return (
    <div
      className="cursor-pointer p-6 h-[120px] flex items-center"
      onClick={onClick}
    >
      <div className="flex items-start justify-between w-full">
        <div className="flex items-center space-x-3 flex-1">
          <div className="text-2xl flex-shrink-0">{icon}</div>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 line-clamp-1">
              {title}
            </h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
              {description}
            </p>
          </div>
        </div>
        <div className="text-slate-400 dark:text-slate-500 ml-4 flex-shrink-0">
          {isExpanded ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </div>
      </div>
    </div>
  );
};