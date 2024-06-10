'use client';

import { createContext } from 'react';

interface ModalContext {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

export const ModalContext = createContext<ModalContext>({
  showModal: false,
} as ModalContext);
