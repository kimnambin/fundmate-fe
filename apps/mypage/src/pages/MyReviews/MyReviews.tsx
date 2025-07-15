import { useNavigate } from 'react-router-dom';
import { Title, MediumFont } from '@repo/ui/styles';

const MyReviews = () => {
  const navigate = useNavigate();

  const reviews = [
    {
      id: 1,
      productName: '제로웨이스트 텀블러',
      review: '깔끔하고 가볍고 매일 쓰기 좋아요',
      imageUrl: 'https://picsum.photos/300/300',
    },
    {
      id: 2,
      productName: '유기농 반려동물 간식',
      review: '강아지가 너무 잘 먹어요!',
      imageUrl: 'https://picsum.photos/300/300',
    },
    {
      id: 3,
      productName: '착한 커피 원두',
      review: '고소하고 맛있습니다.',
      imageUrl: 'https://picsum.photos/300/300',
    },
    {
      id: 4,
      productName: '편한 쿠션 방석',
      review: '앉아있을 때 허리가 덜 아파요.',
      imageUrl: 'https://picsum.photos/300/300',
    },
    {
      id: 5,
      productName: '아로마 캔들',
      review: '은은한 향이 좋아서 자주 켜요.',
      imageUrl: 'https://picsum.photos/300/300',
    },
  ];

  return (
    <div className="w-full bg-white border border-gray-300 rounded-md px-6 py-4 flex flex-col justify-between gap-6 min-h-[160px]">
      
      {/* 타이틀 */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <Title className="text-black">작성한 후기 목록</Title>
      </div>

      {/* 테이블 헤더 */}
      <div className="w-full flex px-2 py-3 border-b border-gray-300 text-center text-base font-medium text-black">
        <div className="basis-3/6">상품</div>
        <div className="basis-3/6">후기</div>
      </div>

      {/* 후기 리스트 */}
      <div className="w-full flex flex-col divide-y divide-gray-200">
        {reviews.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/product/${item.id}`)}
            className="flex items-center px-2 py-4 hover:bg-gray-50 transition cursor-pointer"
          >
            {/* 상품 */}
            <div className="flex items-center gap-6 basis-5/6">
              <img
                src={item.imageUrl}
                alt={item.productName}
                className="w-[70px] h-[70px] rounded object-cover"
              />
              <MediumFont className="text-sm sm:text-base text-black">
                {item.productName}
              </MediumFont>
            </div>

            {/* 후기 */}
            <div className="flex items-center basis-3/6 px-4">
              <MediumFont className="text-sm sm:text-base text-black">
                {item.review}
              </MediumFont>
            </div>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center items-center mt-[25px] gap-[10px]">
  <button className="cursor-pointer">{'<<'}</button>
  <button className="cursor-pointer">{'<'}</button>
  <div className="flex gap-[15px] text-[23px]">
    <span className="cursor-pointer text-black">1</span>
    <span className="cursor-pointer text-[#7E7C7C]">2</span>
    <span className="cursor-pointer text-[#7E7C7C]">3</span>
    <span className="cursor-pointer text-[#7E7C7C]">4</span>
    <span className="cursor-pointer text-[#7E7C7C]">5</span>
  </div>
  <button className="cursor-pointer">{'>'}</button>
  <button className="cursor-pointer">{'>>'}</button>
</div>
    </div>
  );
};

export default MyReviews;
