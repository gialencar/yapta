'use client';
import Link from 'next/link';
import { Timer } from './components/Timer';
import { Button } from '@/components/ui/button';
import { ModalContext } from './components/modal/modalContext';
import { useContext } from 'react';

export default function Home() {
  const { setShowModal } = useContext(ModalContext);

  return (
    <div>
      <div className="flex justify-end">
        <Button
          onClick={() => setShowModal(true)}
          className="text-2xl bg-nord-bg rounded-full mb-2"
        >
          <span className="hover:brightness-110 hover:rotate-12 transition-all">
            ⚙️
          </span>
        </Button>
      </div>
      <Timer />
    </div>
  );
}
