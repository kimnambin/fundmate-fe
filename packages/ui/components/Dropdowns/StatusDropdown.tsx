import { useEffect, useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { useSearchParams } from 'react-router-dom';
import type { DropdownProps } from './Dropdown';
import { SmallFont } from '../../styles';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '../ui/dropdown-menu';

/** shadcn DropdownMenu(Radix) 기반으로 재구현. 열림/닫힘·외부클릭 처리는 Radix가 담당한다. */
export const StatusDropdown = ({ query, onClick }: DropdownProps) => {
  const status = ['전체 프로젝트', '진행 중인 프로젝트', '완료된 프로젝트'];
  const [title, setTitle] = useState('상태');
  const [searchParams, setSearchParams] = useSearchParams();

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
  };

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
        {status.map((v, i) => (
          <DropdownMenuItem key={v} data-id={v} onSelect={() => handleClick(i, v)}>
            <SmallFont>{v}</SmallFont>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
