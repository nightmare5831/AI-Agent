'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import { Loader2 } from 'lucide-react';

// Configure NProgress
nprogress.configure({
  showSpinner: false,
  trickleSpeed: 100,
  minimum: 0.1,
  easing: 'ease',
  speed: 300,
});

export function NavigationProgress() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Start loading
    setLoading(true);
    nprogress.start();
    console.log('Navigation started to:', pathname);

    // Complete loading after page is ready
    const timeout = setTimeout(() => {
      setLoading(false);
      nprogress.done();
      console.log('Navigation completed');
    }, 500);

    return () => {
      clearTimeout(timeout);
      nprogress.done();
    };
  }, [pathname]);

  // Show just a spinner during navigation
  if (loading) {
    return (
      <div className="fixed inset-0 bg-background/30 backdrop-blur-sm z-50 flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-[#8b5cf6]" />
      </div>
    );
  }

  return null;
}
