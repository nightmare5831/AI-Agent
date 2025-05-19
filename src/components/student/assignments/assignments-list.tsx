'use client';

import { AssignmentCard } from './assignment-card';
import { AssignmentStatus, AssignmentType } from '@/types/assignments';
import { useAssignments } from '@/hooks/use-assignments';

interface AssignmentsListProps {
  selectedStatus: AssignmentStatus | 'all';
  selectedType: AssignmentType | 'all';
  searchQuery: string;
}

export function AssignmentsList({
  selectedStatus,
  selectedType,
  searchQuery,
}: AssignmentsListProps) {
  const { assignments } = useAssignments();

  const filteredAssignments = assignments.filter((assignment) => {
    const matchesStatus =
      selectedStatus === 'all' || assignment.status === selectedStatus;
    const matchesType =
      selectedType === 'all' || assignment.type === selectedType;
    const matchesSearch =
      assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesType && matchesSearch;
  });

  if (filteredAssignments.length === 0) {
    return (
      <div className="rounded-lg bg-muted p-8 text-center">
        <p className="text-muted-foreground">No assignments found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredAssignments.map((assignment) => (
        <AssignmentCard key={assignment.id} assignment={assignment} />
      ))}
    </div>
  );
}
