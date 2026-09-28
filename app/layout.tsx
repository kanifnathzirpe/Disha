import type { Metadata } from 'next';
import './globals.css';
import { MockStateProvider } from '@/lib/mock-state';
import { AppProvider } from '@/context/AppContext';

export const metadata: Metadata = {
  title: 'DISHA – Maharashtra Skill Outcome Intelligence Platform',
  description: 'Government platform for tracking training outcomes, skill gaps, employment, and wage growth across Maharashtra.',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="auto">
      <body className="antialiased bg-page text-text-primary transition-colors duration-200">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <AppProvider>
          <MockStateProvider>
            {children}
          </MockStateProvider>
        </AppProvider>
      </body>
    </html>
  );
}
