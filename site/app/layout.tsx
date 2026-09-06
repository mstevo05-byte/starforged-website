import type { Metadata } from 'next';
import './globals.css';
import './home.css';

const siteUrl = process.env.SITE_URL ? new URL(process.env.SITE_URL) : undefined;
const socialImage = siteUrl
  ? [{ url: new URL('/og.png', siteUrl), alt: 'Starforged Ascendant concept art' }]
  : undefined;

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: siteUrl } : {}),
  title: 'Starforged Ascendant',
  description: 'Complete the Mission. Shape the Galaxy. Build a classless Character and Drone, complete procedural Missions, and influence a living galaxy.',
  icons: {
    icon: '/images/SA Logo.png',
  },
  openGraph: {
    title: 'Starforged Ascendant',
    description: 'Complete the Mission. Shape the Galaxy. Build a classless Character and Drone, complete procedural Missions, and influence a living galaxy.',
    ...(siteUrl ? { url: siteUrl } : {}),
    siteName: 'Starforged Ascendant',
    ...(socialImage ? { images: socialImage } : {}),
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Starforged Ascendant',
    description: 'Complete the Mission. Shape the Galaxy. Build a classless Character and Drone, complete procedural Missions, and influence a living galaxy.',
    ...(socialImage ? { images: socialImage } : {}),
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
