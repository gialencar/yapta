'use client';
import Link from 'next/link';
import Settings from './components/Settings';
import Timer from './components/Timer';
import { useTimerStore } from './hooks/store';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-nord-bg bg-center bg-cover bg-no-repeat">
      <Link href="/settings" className="text-nordWhite underline font-bold">
        Configurações
      </Link>
      <Timer />
    </main>
  );
}
