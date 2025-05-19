'use client';

import { NotificationsList } from '@/components/notifications/notifications-list';
// import { NotificationsFilters } from '@/components/notifications/notifications-filters';

export default function NotificationsPage() {
  return (
    <div className="p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* <NotificationsFilters /> */}
          <div className="lg:col-span-3">
            <NotificationsList />
          </div>
        </div>
      </div>
    </div>
  );
}
