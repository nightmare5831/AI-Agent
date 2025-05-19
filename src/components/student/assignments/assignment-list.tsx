'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNotifications } from '@/components/providers/notification-provider';
import { Assignment } from '@/types/assignments';
import { AssignmentCard } from './assignment-card';
import { PenSquare, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AssignmentList() {
  const { assessmentNotifications, refreshNotifications } = useNotifications();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Convert notifications to assignments
    const convertedAssignments = assessmentNotifications.map(
      (assessment): Assignment => {
        return {
          id: assessment.id,
          title: assessment.title || 'Assessment',
          description: assessment.description || 'Complete this assessment',
          type: 'assessment',
          status: 'in-progress',
          progress: 0,
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          points: assessment.points || 0,
          attachments: [],
        };
      }
    );

    setAssignments(convertedAssignments);
  }, [assessmentNotifications]);

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      await refreshNotifications();
    } catch (error) {
      console.error('Failed to refresh assignments', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="overflow-hidden border border-[#63B3ED]/10 shadow-md transform transition-all duration-500 hover:scale-[1.01]">
      <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-[#63B3ED]/5 to-[#d32f2f]/5 backdrop-blur-sm">
        <CardTitle className="flex items-center space-x-2">
          <PenSquare className="h-5 w-5 text-[#63B3ED]" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#63B3ED] to-[#d32f2f]">Assignments</span>
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRefresh}
          disabled={isLoading}
        >
          <RotateCw
            className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`}
          />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {assignments.length > 0 ? (
            assignments.map((assignment) => (
              <AssignmentCard key={assignment.id} assignment={assignment} />
            ))
          ) : (
            <div className="rounded-lg bg-muted/50 p-8 text-center border border-[#63B3ED]/5">
              <div className="flex flex-col items-center justify-center gap-2">
                <PenSquare className="h-10 w-10 text-[#63B3ED]/30" />
                <p className="text-muted-foreground">No assignments found</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
