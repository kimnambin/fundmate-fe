import { useEffect, useRef, useState } from "react";
import { BiChevronDown } from "react-icons/bi"
import type { DropdownProps } from "./Dropdown";
import { useSearchParams } from "react-router-dom";
import { SmallFont } from "../../styles";
import { Menu, MenuButton, MenuItem, MenuItems } from "../../styles/Dropdown.Style";

export const CompleteDropdown = ({ query, onClick }: DropdownProps) => {
  const complete = ['75% 이상', '75% ~ 100%', '100% 이상'];
  const [title, setTitle] = useState('달성률');
  const [searchParams, setSearchParams] = useSearchParams();
  const [toggle, setToggle] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setTitle('달성률');
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
    currentQuery.set('complete', i);
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

  //complete의 쿼리값에 따라서 데이터 정렬 필요

  return (
    <Menu ref={menuRef}>
      <div>
        <MenuButton
          id="menu-button"
          type="button"
          aria-expanded={toggle}
          aria-haspopup='true'
          onClick={() => setToggle(!toggle)}
        >
          {title}
          <BiChevronDown className="-mr-1 size-5 text-gray-400" aria-hidden='true' />
        </MenuButton>
      </div>

      {
        toggle && (
          <MenuItems
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex={-1}
          >
            <div className="py-1" role="none">
              {
                complete.map((v, i) => (
                  <MenuItem
                    key={v}
                    data-id={v}
                    onClick={() => handleClick(i, v)}
                  >
                    <SmallFont>
                      {v}
                    </SmallFont>
                  </MenuItem>
                ))
              }
            </div>
          </MenuItems>

        )
      }
    </Menu>
  )
}
