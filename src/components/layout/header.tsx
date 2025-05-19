'use client';

import { ThemeToggle } from '@/components/theme/theme-toggle';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Header() {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-bold transition-colors hover:text-primary"
        >
          Smart Agentpt
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/auth/signup">
            <Button variant="outline">Sign Up</Button>
          </Link>
          <Link href="/auth">
            <Button>Sign In</Button>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
