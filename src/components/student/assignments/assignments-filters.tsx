'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AssignmentStatus, AssignmentType } from '@/types/assignments';
import {
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  Filter,
  PenTool,
  Timer,
} from 'lucide-react';

interface AssignmentsFiltersProps {
  selectedStatus: AssignmentStatus | 'all';
  selectedType: AssignmentType | 'all';
  onStatusChange: (status: AssignmentStatus | 'all') => void;
  onTypeChange: (type: AssignmentType | 'all') => void;
}

export function AssignmentsFilters({
  selectedStatus,
  selectedType,
  onStatusChange,
  onTypeChange,
}: AssignmentsFiltersProps) {
  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Filter className="h-4 w-4" />
          Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-medium">Status</h3>
          <div className="flex flex-col gap-1">
            <FilterButton
              active={selectedStatus === 'all'}
              onClick={() => onStatusChange('all')}
              icon={Timer}
              label="All Statuses"
            />
            <FilterButton
              active={selectedStatus === 'in-progress'}
              onClick={() => onStatusChange('in-progress')}
              icon={Clock}
              label="In Progress"
            />
            <FilterButton
              active={selectedStatus === 'completed'}
              onClick={() => onStatusChange('completed')}
              icon={CheckCircle}
              label="Completed"
            />
            <FilterButton
              active={selectedStatus === 'overdue'}
              onClick={() => onStatusChange('overdue')}
              icon={Calendar}
              label="Overdue"
            />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="font-medium">Type</h3>
          <div className="flex flex-col gap-1">
            <FilterButton
              active={selectedType === 'all'}
              onClick={() => onTypeChange('all')}
              icon={FileText}
              label="All Types"
            />
            <FilterButton
              active={selectedType === 'assessment'}
              onClick={() => onTypeChange('assessment')}
              icon={PenTool}
              label="Assessments"
            />
            <FilterButton
              active={selectedType === 'assignment'}
              onClick={() => onTypeChange('assignment')}
              icon={FileText}
              label="Assignments"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.FC<{ className?: string }>;
  label: string;
}

function FilterButton({
  active,
  onClick,
  icon: Icon,
  label,
}: FilterButtonProps) {
  return (
    <Button
      variant={active ? 'default' : 'ghost'}
      size="sm"
      className="justify-start gap-2"
      onClick={onClick}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Button>
  );
}
