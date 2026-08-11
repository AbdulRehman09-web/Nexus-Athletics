import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk, DM_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { NoiseOverlay } from '@/components/layout/Container';
import { CustomCursor } from '@/components/ui/CustomCursor';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://nexusathletics.com'),
  title: {
    default: 'Nexus Athletics — AI-Powered Premium Gym & Fitness Ecosystem',
    template: '%s | Nexus Athletics',
  },
  description: 'An intelligent fitness ecosystem built around your goals, powered by elite trainers, advanced training programs, and AI that adapts to you. Join 247+ members achieving peak performance.',
  keywords: [
    'premium gym',
    'personal training',
    'AI fitness',
    'strength training',
    'weight loss',
    'muscle building',
    'fitness membership',
    'San Francisco gym',
  ],
  authors: [{ name: 'Nexus Athletics' }],
  creator: 'Nexus Athletics',
  publisher: 'Nexus Athletics',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nexusathletics.com',
    siteName: 'Nexus Athletics',
    title: 'Nexus Athletics — AI-Powered Premium Gym & Fitness Ecosystem',
    description: 'An intelligent fitness ecosystem built around your goals, powered by elite trainers, advanced training programs, and AI that adapts to you.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Nexus Athletics - Premium AI-Powered Gym',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nexus Athletics — AI-Powered Premium Gym',
    description: 'An intelligent fitness ecosystem built around your goals, powered by elite trainers, advanced training programs, and AI that adapts to you.',
    images: ['/og-image.jpg'],
    creator: '@nexusathletics',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'google-site-verification-code',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fontClass = `${spaceGrotesk.variable} ${dmSans.variable} ${jetbrainsMono.variable}`;

  return (
    <html lang="en" className={fontClass} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body className="min-h-screen bg-nexus-950 text-nexus-50 antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-xl focus:bg-accent-gold focus:px-4 focus:py-2 focus:text-nexus-950 focus:font-semibold focus:shadow-nexus-lg"
        >
          Skip to main content
        </a>
        <CustomCursor />
        <NoiseOverlay />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}