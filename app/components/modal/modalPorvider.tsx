'use client';

import { ModalContext } from './modalContext';
import { useState } from 'react';

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <ModalContext.Provider value={{ showModal, setShowModal }}>
      {children}
    </ModalContext.Provider>
  );
}
