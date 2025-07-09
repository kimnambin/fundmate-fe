import React from 'react';

interface ReviewListItemProps {
  productName: string;
  review: string;
  imageUrl: string;
  onClick: () => void;
}

const ReviewListItem: React.FC<ReviewListItemProps> = ({
  productName,
  review,
  imageUrl,
  onClick,
}) => {
  return (
    <div
      className="flex items-center px-[10px] h-[100px] w-[1100px] ml-[-140px] border-b border-gray-300 hover:bg-gray-50 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center gap-[15px] w-[309px] pr-[15px]">
        <img
          src={imageUrl}
          alt={productName}
          className="w-[80px] h-[80px] rounded-[10px] object-cover bg-gray-200"
        />
        <p className="text-[16px] font-medium text-black truncate pl-[8px]">
          {productName}
        </p>
      </div>
      <div className="flex items-center justify-start w-[461px] px-[10px]">
        <p className="text-[16px] font-medium text-black truncate pl-[8px]">
          {review}
        </p>
      </div>
    </div>
  );
};

export default ReviewListItem;
