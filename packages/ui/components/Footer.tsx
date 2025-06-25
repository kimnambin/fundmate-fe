export const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className="w-full h-10 flex items-center justify-center">
      <span className="text-xl">
        Copyright (c) {year} Status404. All Rights Reserved.
      </span>
    </div>
  );
};
