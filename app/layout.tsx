import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'YAPTA - Yet Another Pomodoro Timer App',
  description: 'Yet Another Pomodoro Timer App',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex flex-col items-center justify-center h-screen bg-nord-bg bg-center bg-cover bg-no-repeat">
          {children}
        </main>
      </body>
    </html>
  );
}
