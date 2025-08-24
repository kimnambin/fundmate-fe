import { mockreviewsData } from '@repo/ui/mocks';
import {
  ReviewCard,
  ReviewContent,
  ReviewDate,
  ReviewerName,
} from '../styles/product-detail/ProductInfos.style';

const PDReview = () => {
  return (
    <div className="w-[80%]">
      {mockreviewsData.map((review, index) => (
        <ReviewCard key={index}>
          <ReviewerName>{review.name}</ReviewerName>
          <ReviewDate>{review.date}</ReviewDate>
          <ReviewContent>{review.content}</ReviewContent>
        </ReviewCard>
      ))}
    </div>
  );
};

export default PDReview;
