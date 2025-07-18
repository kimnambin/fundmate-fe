import type React from 'react';

import { createPortal } from 'react-dom';
import { Background, ModalContent, Wrapper } from '../styles/modal.style';

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  onClose?: () => void;
}

export const Modal = ({ children, isOpen, onClose }: Props) => {
  if (!isOpen) return null;

  return createPortal(
    <Wrapper>
      <Background onClick={onClose} />
      <ModalContent>{children}</ModalContent>
    </Wrapper>,
    document.body,
  );
};
