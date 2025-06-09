'use client';

import { useState } from 'react';
import { DashboardHeader } from './dashboard-header';
import { Sidebar } from './sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  type: 'admin' | 'user';
}

export function DashboardLayout({ children, type }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <Sidebar open={sidebarOpen} onOpenChange={setSidebarOpen} type={type} />
      <main
        className={`transition-all duration-300 ${sidebarOpen ? 'pl-64' : 'pl-16'} pt-4`}
      >
        {children}
      </main>
    </div>
  );
}
