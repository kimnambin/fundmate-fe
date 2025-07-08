import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useEffect, useState } from 'react';
import { BiChevronDown } from 'react-icons/bi'
import type { DropdownProps } from './Dropdown';
import { useSearchParams } from 'react-router-dom'
import { SmallFont } from '../../styles';

export const StatusDropdown = ({ query }: DropdownProps) => {
  const status = ['전체 프로젝트', '진행 중인 프로젝트', '완료된 프로젝트'];
  const [title, setTitle] = useState('상태');
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setTitle('상태')
  }, [query])

  const handleQueryChange = (i: string, v: string) => {
    const currentQuery = new URLSearchParams(searchParams);
    currentQuery.set('status', i);
    setSearchParams(currentQuery);
    setTitle(v);
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {title}
          <BiChevronDown aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute left-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          {
            status.map((v, i) => (
              <MenuItem>
                <div
                  role='button'
                  key={i}
                  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                  onClick={() => handleQueryChange(i.toString(), v)}
                >
                  <SmallFont key={i}>
                    {v}
                  </SmallFont>
                </div>
              </MenuItem>
            ))
          }
        </div>
      </MenuItems>
    </Menu>
  )
}
