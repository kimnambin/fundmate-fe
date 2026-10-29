import { useEffect, useState, type MouseEvent } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useSearchParams } from 'react-router-dom';
import type { DropdownProps } from './Dropdown';

/** MUI Menu 기반으로 재구현. 열림/닫힘·외부클릭 처리는 MUI가 담당한다. */
export const StatusDropdown = ({ query, onClick }: DropdownProps) => {
  const status = ['전체 프로젝트', '진행 중인 프로젝트', '완료된 프로젝트'];
  const [title, setTitle] = useState('상태');
  const [searchParams, setSearchParams] = useSearchParams();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    setTitle('상태');
  }, [query]);

  const handleQueryChange = (i: string) => {
    const currentQuery = new URLSearchParams(searchParams);
    currentQuery.set('status', i);
    setSearchParams(currentQuery);
  };

  const handleClick = (i: number, v: string) => {
    if (query !== null) {
      handleQueryChange(i.toString());
    } else if (onClick) {
      onClick(i);
    }
    setTitle(v);
    setAnchorEl(null);
  };

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
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={() => setAnchorEl(null)}>
        {status.map((v, i) => (
          <MenuItem key={v} data-id={v} onClick={() => handleClick(i, v)}>
            {v}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
