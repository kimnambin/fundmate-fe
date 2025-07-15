import { useEffect, useRef, useState } from 'react';
import { BiChevronDown } from 'react-icons/bi'
import type { DropdownProps } from './Dropdown';
import { useSearchParams } from 'react-router-dom'
import { SmallFont } from '../../styles';
import { Menu, MenuButton, MenuItem, MenuItems } from '../../styles/Dropdown.Style';

export const StatusDropdown = ({ query, onClick }: DropdownProps) => {
  const status = ['전체 프로젝트', '진행 중인 프로젝트', '완료된 프로젝트'];
  const [title, setTitle] = useState('상태');
  const [searchParams, setSearchParams] = useSearchParams();
  const [toggle, setToggle] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setTitle('상태')
  }, [query])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setToggle(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleQueryChange = (i: string) => {
    const currentQuery = new URLSearchParams(searchParams);
    currentQuery.set('status', i);
    setSearchParams(currentQuery);
  }

  const handleClick = (i: number, v: string) => {
    if (query !== null) {
      handleQueryChange(i.toString());
    } else if (onClick) {
      onClick(i);
    }

    setToggle(!toggle)
    setTitle(v);
  }

  return (
    <Menu ref={menuRef}>
      <div>
        <MenuButton
          type="button"
          id="menu-button"
          aria-expanded={toggle}
          aria-haspopup='true'
          onClick={() => setToggle(!toggle)}
        >
          {title}
          <BiChevronDown aria-hidden="true" className="-mr-1 size-5 text-gray-400" data-slot='icon' />
        </MenuButton>
      </div>

      <MenuItems
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex={-1}
        $toggle={toggle}
      >
        <div className="py-1" role="none">
          {
            status.map((v, i) => (
              <MenuItem
                key={v}
                data-id={v}
                onClick={() => handleClick(i, v)}
              >
                <SmallFont key={i}>
                  {v}
                </SmallFont>
              </MenuItem>
            ))
          }
        </div>
      </MenuItems>
    </Menu>
  )
}
