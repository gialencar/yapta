'use client';
import Link from 'next/link';
import Timer from './components/Timer';

export default function Home() {
  return (
    <div>
      <div className="flex justify-end">
        <Link
          href="/settings"
          className="text-2xl bg-nord-bg rounded-full  hover:brightness-110 hover:rotate-12 transition-all"
        >
          ⚙️
        </Link>
      </div>
      <Timer />
    </div>
  );
}
