import { useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import type { DropdownProps } from './Dropdown';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from '../ui/dropdown-menu';

/**
 * shadcn DropdownMenu(Radix) 기반으로 재구현.
 * 원본의 정렬 옵션(추천순/인기순/최신순/마감임박순)은 기존 코드에서도 주석 처리되어 비활성 상태였다 — 그대로 유지.
 */
export const RecommendDropdown = ({}: DropdownProps) => {
  const [title] = useState('정렬');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        id="menu-button"
        className="inline-flex w-full items-center justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        {title}
        <BiChevronDown aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className="py-1" role="none" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
