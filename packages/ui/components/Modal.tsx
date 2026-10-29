import type React from 'react';

import { Dialog, DialogContent } from './ui/dialog';

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  onClose?: () => void;
}

/** shadcn Dialog(Radix) 기반으로 재구현한 Modal. 기존 isOpen/onClose/children API는 그대로 유지된다. */
export const Modal = ({ children, isOpen, onClose }: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose?.()}>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};
