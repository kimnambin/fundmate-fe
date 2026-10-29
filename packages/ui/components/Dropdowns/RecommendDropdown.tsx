import { useState, type MouseEvent } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import type { DropdownProps } from './Dropdown';

/**
 * MUI Menu 기반으로 재구현.
 * 원본의 정렬 옵션(추천순/인기순/최신순/마감임박순)은 기존 코드에서도 주석 처리되어 비활성 상태였다 — 그대로 유지.
 */
export const RecommendDropdown = ({}: DropdownProps) => {
  const [title] = useState('정렬');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <>
      <Button
        id="menu-button"
        variant="outlined"
        color="inherit"
        fullWidth
        endIcon={<KeyboardArrowDownIcon />}
        onClick={(e: MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget)}
      >
        {title}
      </Button>
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={() => setAnchorEl(null)} />
    </>
  );
};
