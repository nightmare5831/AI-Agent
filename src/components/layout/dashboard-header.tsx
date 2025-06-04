'use client';

import { ThemeToggle } from '@/components/theme/theme-toggle';
import Image from 'next/image';
import Link from 'next/link';
import { UserNav } from './user-nav';

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 w-full items-center justify-between space-x-4 px-10">
        <Link
          href="/"
          className="flex items-center space-x-3 transition-colors hover:opacity-90"
        >
          <Image
            alt="Logo"
            src="/assets/images/logo/logo.png"
            width={150} height={100} 
            className="h-12 w-auto"
            priority
          />
        </Link>
        <div className="flex items-center space-x-7">
          <ThemeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
