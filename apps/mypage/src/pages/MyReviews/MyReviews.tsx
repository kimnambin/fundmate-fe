import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Title, MediumFont } from '@repo/ui/styles';

interface ReviewItem {
  image_url: string;
  title: string;
  content: string;
}

const MyReviews = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get('/api/users/mypage/comments', {
          withCredentials: true,
        });
        console.log('후기 전체 응답:', res);

        if (Array.isArray(res.data?.data)) {
          setReviews(res.data.data);
        } else {
          console.error('후기 응답 형식이 올바르지 않음:', res.data);
          setReviews([]);
        }
      } catch (error) {
        console.error('후기 조회 실패:', error);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return <div className="p-6 text-center">불러오는 중...</div>;
  }

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
        {reviews.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            작성한 후기가 없습니다.
          </div>
        ) : (
          reviews.slice(0, 5).map((item, idx) => (
            <div
              key={idx}
              onClick={() => navigate(`/product/${idx}`)} // id가 없다면 index 임시 활용
              className="flex items-center px-2 py-4 hover:bg-gray-50 transition cursor-pointer"
            >
              {/* 상품 */}
              <div className="flex items-center gap-6 basis-5/6">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-[70px] h-[70px] rounded object-cover"
                />
                <MediumFont className="text-sm sm:text-base text-black">
                  {item.title}
                </MediumFont>
              </div>

              {/* 후기 */}
              <div className="flex items-center basis-3/6 px-4">
                <MediumFont className="text-sm sm:text-base text-black">
                  {item.content}
                </MediumFont>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 페이지네이션 (임시 고정) */}
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
