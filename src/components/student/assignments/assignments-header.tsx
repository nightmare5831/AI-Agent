'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface AssignmentsHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function AssignmentsHeader({
  searchQuery,
  onSearchChange,
}: AssignmentsHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-2xl font-bold">Assignments</h1>
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search assignments..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
}
