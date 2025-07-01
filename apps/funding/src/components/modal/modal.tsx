import type React from 'react';
import { Background, ModalContent, Wrapper } from './modal.styles';
import { createPortal } from 'react-dom';

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ children, isOpen, onClose }: Props) => {
  if (!isOpen) return null;

  return createPortal(
    <Wrapper>
      <Background onClick={onClose} />
      <ModalContent>{children}</ModalContent>
    </Wrapper>,
    document.body,
  );
};

export default Modal;
