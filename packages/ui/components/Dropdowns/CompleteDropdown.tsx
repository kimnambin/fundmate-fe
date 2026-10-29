import { useEffect, useState, type MouseEvent } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useSearchParams } from 'react-router-dom';
import type { DropdownProps } from './Dropdown';

/** MUI Menu 기반으로 재구현. */
export const CompleteDropdown = ({ query, onClick }: DropdownProps) => {
  const complete = ['75% 이상', '75% ~ 100%', '100% 이상'];
  const [title, setTitle] = useState('달성률');
  const [searchParams, setSearchParams] = useSearchParams();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    setTitle('달성률');
  }, [query]);

  const handleQueryChange = (i: string) => {
    const currentQuery = new URLSearchParams(searchParams);
    currentQuery.set('complete', i);
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
        {complete.map((v, i) => (
          <MenuItem key={v} data-id={v} onClick={() => handleClick(i, v)}>
            {v}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
