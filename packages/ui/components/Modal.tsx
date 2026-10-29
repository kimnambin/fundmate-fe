import type React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  onClose?: () => void;
}

/** MUI Dialog 기반으로 재구현한 Modal. 기존 isOpen/onClose/children API는 그대로 유지된다. */
export const Modal = ({ children, isOpen, onClose }: Props) => {
  return (
    <Dialog open={isOpen} onClose={onClose} PaperProps={{ sx: { borderRadius: '10px' } }}>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};
