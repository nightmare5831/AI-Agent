'use client';

import { NotificationsList } from '@/components/notifications/notifications-list';

export default function NotificationsPage() {
  return (
    <div className="p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-4">
          <div className="lg:col-span-3">
            <NotificationsList />
          </div>
        </div>
      </div>
    </div>
  );
}
