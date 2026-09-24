import React from 'react';
import { MediumFont } from '@repo/ui/styles';

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
      className="grid grid-cols-[100px_1fr] gap-x-3 gap-y-2 sm:grid-cols-[200px_1fr_1fr] sm:gap-0 w-full hover:bg-gray-100 rounded-[10px] p-3 border border-gray-200"
      onClick={onClick}
    >
      <img
        src={imageUrl}
        alt={productName}
        className="w-[100px] h-auto rounded-[10px] object-cover bg-gray-200"
      />
      <div className='flex items-center min-w-0'>
        <MediumFont className="truncate">
          {productName}
        </MediumFont>
      </div>
      <div className='flex items-center min-w-0 col-span-2 sm:col-span-1'>
        <MediumFont className="truncate">
          {review}
        </MediumFont>
      </div>
    </div>
  );
};

export default ReviewListItem;
