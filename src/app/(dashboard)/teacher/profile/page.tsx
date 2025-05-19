'use client';

import { TeacherProfileHeader } from '@/components/teacher/profile/profile-header';
import { TeacherProfileInfo } from '@/components/teacher/profile/profile-info';
import { TeacherStats } from '@/components/teacher/profile/stats';
import { TeacherClasses } from '@/components/teacher/profile/classes';

export default function TeacherProfilePage() {
  return (
    <div className="p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <TeacherProfileHeader />
        <div className="grid gap-6 md:grid-cols-2">
          <TeacherProfileInfo />
          <TeacherStats />
        </div>
        <TeacherClasses />
      </div>
    </div>
  );
}
