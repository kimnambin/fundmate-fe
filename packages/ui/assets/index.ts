import FundiIcon from "../assets/icons/ic_fundi.png";
export { FundiIcon }

import FundiMainImage from '../assets/images/Fundmate.png';
export { FundiMainImage }

type assetsProps = {
  src: string;
  menuName: string;
};

const imageModule = import.meta.glob('./images/*.{png, jpg, jpeg, svg}', {
  eager: true,
});

const categoryIconModule = import.meta.glob(
  './icons/categoryIcons/*.{png, jpg, jpeg, svg}',
  {
    eager: true,
  },
);

export const Images: Record<string, string> = Object.fromEntries(
  Object.entries(imageModule).map(([key, mod]) => {
    const name = key.split('/').pop()?.split('.')[0] || '';
    return [name, (mod as any).default];
  }),
);

export const CategoryIcons: Record<string, assetsProps> = Object.fromEntries(
  Object.entries(categoryIconModule)
    .map(([key, mod]) => {
      const name = key.split('/').pop()?.split('.')[0] || '';
      const menuName: Record<string, string> = {
        art: '예술',
        clothes: '의류',
        electronics: '테크/가전',
        game: '게임',
        perfume: '향수/뷰티',
        design: '디자인',
        living: '홈/리빙',
        stationery: '잡화',
        menu: '전체',
      };
      return [
        name,
        {
          src: (mod as any).default,
          menuName: menuName[name] || name,
        },
      ];
    })
    .sort(([keyA], [keyB]) => {
      if (keyA === 'menu') return -1;
      if (keyB === 'menu') return 1;
      return 0;
    }),
);

