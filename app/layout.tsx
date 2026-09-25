import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Beyond the room | A working proposal for Impact Factory',
  description: 'One possible digital layer around Impact Factory’s human-led training. A working proposal based on conversations with Abigail and Taylor.',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-GB"><body>{children}</body></html>;
}
