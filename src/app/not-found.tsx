'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BookX, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <BookX className="h-10 w-10 text-primary" />
        </div>

        <h1 className="mb-2 text-4xl font-bold tracking-tight">
          Page not found
        </h1>
        <p className="mb-8 text-muted-foreground">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It
          might have been moved or deleted.
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>

        <div className="mt-12 text-sm text-muted-foreground">
          <p>
            Need help?{' '}
            <Link href="/contact" className="text-primary hover:underline">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
