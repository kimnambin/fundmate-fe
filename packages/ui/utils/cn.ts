import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** shadcn/ui 표준 클래스네임 병합 유틸. Tailwind 클래스 충돌(`px-1 px-2` 등)을 안전하게 해결한다. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
