import type { ModalContextType } from '@/types';
import { createContext } from 'react';

const ModalContext = createContext<ModalContextType | null>(null);

export default ModalContext;
