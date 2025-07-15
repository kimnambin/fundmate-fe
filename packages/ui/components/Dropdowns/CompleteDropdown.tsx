import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi"
import type { DropdownProps } from "./Dropdown";
import { useSearchParams } from "react-router-dom";
import { SmallFont } from "../../styles";

export const CompleteDropdown = ({ query, onClick }: DropdownProps) => {
  const complete = ['75% 이상', '75% ~ 100%', '100% 이상'];
  const [title, setTitle] = useState('달성률');
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setTitle('달성률');
  }, [query])

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

    setTitle(v);
  }

  //complete의 쿼리값에 따라서 데이터 정렬 필요

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
        className="absolute left-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          {
            complete.map((v, i) => (
              <MenuItem>
                <div
                  role="button"
                  key={v}
                  data-id={v}
                  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                  onClick={() => handleClick(i, v)}
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
