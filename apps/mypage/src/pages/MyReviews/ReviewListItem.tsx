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
      className="grid grid-cols-[200px_1fr_1fr] w-full hover:bg-gray-100 rounded-[10px] p-3 border border-gray-200"
      onClick={onClick}
    >
      <img
        src={imageUrl}
        alt={productName}
        className="w-[100px] h-auto rounded-[10px] object-cover bg-gray-200"
      />
      <div className='flex items-center'>
        <MediumFont className="truncate">
          {productName}
        </MediumFont>
      </div>
      <div className='flex items-center'>
        <MediumFont className="truncate">
          {review}
        </MediumFont>
      </div>
    </div>
  );
};

export default ReviewListItem;
