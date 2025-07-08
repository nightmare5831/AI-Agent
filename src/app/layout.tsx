import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { AuthProvider } from '@/core/auth/AuthProvider';
import { Toaster } from 'sonner';
import { LanguageProvider } from '@/components/language-selector';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SmartAgent',
  description: 'A modern SASS AI Agent Platform Integrated WhatsAPP ',
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <LanguageProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </LanguageProvider>
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
