import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Navigation, Footer } from '@/components/navigation';
import { SourceProvider } from '@/components/sources';
import './globals.css';

const dmSans = localFont({
  src: '../node_modules/@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2',
  variable: '--font-dm-sans',
  display: 'swap',
  weight: '100 1000',
});
export const metadata: Metadata = {
  title: { default: 'Beyond the room | Impact Factory × MyPath', template: '%s | Impact Factory × MyPath' },
  description: 'A working proposal for the learner journey around Impact Factory’s human-led training.',
  robots: { index: false, follow: false },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-GB" className={dmSans.variable}><body><SourceProvider><a className="skip-link" href="#main-content">Skip to content</a><Navigation /><main id="main-content" className="container">{children}</main><Footer /></SourceProvider></body></html>;
}
