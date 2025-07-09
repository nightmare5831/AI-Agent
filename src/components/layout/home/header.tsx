'use client';

import { ThemeToggle } from '@/components/theme/theme-toggle';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useAuth } from '@/core/auth/AuthProvider';
import { useLanguage } from '@/lib/i18n/language-context';

export function Header() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  const [{ profile }] = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationLinks = [
    { href: '#features', label: t.home.header.features },
    { href: '#testimonilas', label: t.home.header.testimonials },
    { href: '#footer', label: t.home.header.about },
  ];

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'border-b bg-background/80 backdrop-blur-md shadow-sm'
          : 'bg-background/60 backdrop-blur-md'
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            'flex items-center justify-between transition-all duration-300',
            scrolled ? 'h-16' : 'h-20'
          )}
        >
          {/* Left - Logo */}
          <div className="flex-shrink-0 animate-fadeIn">
            <Link
              href="/"
              className="flex items-center space-x-3 transition-colors hover:opacity-90"
            >
              <Image
                alt="Logo"
                src="/assets/images/logo/logo.png"
                width={160}
                height={160}
              />
            </Link>
          </div>

          {/* Center - Navigation */}
          <nav className="hidden items-center space-x-10 md:flex animate-fadeIn transition-all delay-300">
            {navigationLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="relative group"
              >
                <span
                  className={cn(
                    'text-sm font-medium transition-all duration-300 group-hover:text-[#63B3ED] hover:-translate-y-1 inline-block',
                    pathname === href ? 'text-foreground font-semibold' : 'text-muted-foreground'
                  )}
                >
                  {label}
                </span>
                {pathname === href && (
                  <div 
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#2B6CB0] to-[#63B3ED] rounded-full animate-fadeIn"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right - Actions */}
          <div className="flex items-center space-x-4 animate-fadeIn transition-all delay-500">
            {profile ? (
              <Link href={profile?.role === 'admin' ? '/admin' : '/user'}>
                <Button
                  className="bg-gradient-to-r from-[#63B3ED] to-[#2B6CB0] hover:opacity-90 text-white rounded-full px-5 py-2 text-sm font-medium border-0 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                >
                  {t.home.header.dashboard}
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/auth/signin" className="hidden sm:block">
                  <Button
                    variant="ghost"
                    className="text-sm font-medium hover:bg-gradient-to-r hover:from-[#63B3ED]/5 hover:to-[#2B6CB0]/5 hover:text-[#63B3ED] transition-colors duration-300"
                  >
                    {t.home.header.signIn}
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button
                    className="bg-gradient-to-r from-[#63B3ED] to-[#2B6CB0] hover:opacity-90 text-white rounded-full px-5 py-2 text-sm font-medium border-0 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                  >
                    {t.home.header.getStarted}
                  </Button>
                </Link>
              </>
            )}
            <div className="border-l pl-4 hidden sm:block">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
