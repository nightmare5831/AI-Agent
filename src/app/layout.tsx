import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { LanguageProvider } from '@/components/language-selector';

import { AuthProvider } from '@/core/auth/AuthProvider';
import { getCurrentProfile, getCurrentUser } from '@/core/auth/server';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SmartAgent',
  description: 'A modern SASS AI Agent Platform Integrated WhatsAPP ',
  icons: {
    icon:'/favicon.ico',
  },
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
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <LanguageProvider>{children}</LanguageProvider>
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
