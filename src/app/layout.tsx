import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { LanguageProvider } from '@/components/teacher/language-selector';

import { NotificationProvider } from '@/contexts/notification-context';
import { AuthProvider } from '@/core/auth/AuthProvider';
import { getCurrentProfile, getCurrentUser } from '@/core/auth/server';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SmartAgent',
  description: 'A modern platform for personalized learning',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  const profile = await getCurrentProfile();
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider
          defaultUser={user}
          defaultProfile={profile}
          defaultNotifications={[]}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NotificationProvider>
              <LanguageProvider>{children}</LanguageProvider>
            </NotificationProvider>
          </ThemeProvider>
        </AuthProvider>
        <Toaster
          richColors
          position="top-right"
          expand={true}
          toastOptions={{ duration: 3000 }}
        />
      </body>
    </html>
  );
}
