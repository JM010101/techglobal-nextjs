import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TechGlobal Solutions - Innovation Without Borders',
  description: 'Professional IT company delivering high-level web and software solutions worldwide. Our global team of experts provides comprehensive technology solutions including web development, AI, cloud computing, and more.',
  keywords: 'IT solutions, web development, AI solutions, cloud computing, blockchain, IoT, DevOps, cybersecurity, global team, technology consulting',
  authors: [{ name: 'TechGlobal Solutions' }],
  creator: 'TechGlobal Solutions',
  publisher: 'TechGlobal Solutions',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://techglobalsolutions.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'TechGlobal Solutions - Innovation Without Borders',
    description: 'Professional IT company delivering high-level web and software solutions worldwide.',
    url: 'https://techglobalsolutions.com',
    siteName: 'TechGlobal Solutions',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TechGlobal Solutions - Global IT Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TechGlobal Solutions - Innovation Without Borders',
    description: 'Professional IT company delivering high-level web and software solutions worldwide.',
    images: ['/og-image.jpg'],
  },
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
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}