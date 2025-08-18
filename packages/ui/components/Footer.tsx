import { SmallFont } from '../styles';

export const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className="w-full h-14 flex items-center justify-center border border-t-gray-300">
      <SmallFont>
        Copyright (c) {year} Status404. All Rights Reserved.
      </SmallFont>
    </div>
  );
};
