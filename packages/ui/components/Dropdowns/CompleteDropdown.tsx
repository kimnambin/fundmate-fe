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

/** shadcn DropdownMenu(Radix) 기반으로 재구현. */
export const CompleteDropdown = ({ query, onClick }: DropdownProps) => {
  const complete = ['75% 이상', '75% ~ 100%', '100% 이상'];
  const [title, setTitle] = useState('달성률');
  const [searchParams, setSearchParams] = useSearchParams();

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
        {complete.map((v, i) => (
          <DropdownMenuItem key={v} data-id={v} onSelect={() => handleClick(i, v)}>
            <SmallFont>{v}</SmallFont>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
