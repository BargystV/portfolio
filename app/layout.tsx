import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/lib/LanguageContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Boris Varshaver — Senior Android Developer',
  description:
    '8+ years of Android development. Kotlin, Java, Jetpack Compose, MVVM, Clean Architecture. Passionate about mobile × AI.',
  keywords: [
    'Android Developer',
    'Kotlin',
    'Java',
    'Mobile Developer',
    'Jetpack Compose',
    'Boris Varshaver',
  ],
  authors: [{ name: 'Boris Varshaver' }],
  openGraph: {
    title: 'Boris Varshaver — Senior Android Developer',
    description: '8+ years of Android development. Kotlin, Java, AI tools.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'Boris Varshaver — Senior Android Developer',
    description: '8+ years of Android development. Kotlin, Java, AI tools.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#0d1117] antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
