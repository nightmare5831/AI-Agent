'use client';

import { ToolsHeader } from '@/components/teacher/tools/tools-header';
import { ToolsGrid } from '@/components/teacher/tools/tools-grid';
import { ToolsFilters } from '@/components/teacher/tools/tools-filters';
import { useState } from 'react';
import { ToolCategory } from '@/types/tools';

export default function TeacherToolsPage() {
  const [selectedCategory, setSelectedCategory] = useState<
    ToolCategory | 'all'
  >('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="p-6">
      <div className="mx-auto max-w-7xl">
        <ToolsHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-4">
          <ToolsFilters
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
          <div className="lg:col-span-3">
            <ToolsGrid
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
