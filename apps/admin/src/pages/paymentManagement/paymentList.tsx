import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Title, MediumFont } from '@repo/ui/styles';
import { Dropdown } from '@repo/ui/components';
import axios from 'axios';
import { format, parseISO } from 'date-fns';

interface PaymentItem {
  scheduleId: number;
  productImage: string;
  productName: string;
  optionName: string;
  date: string;
  amount: number;
  status: 'pending' | 'success';
}

interface PaymentResponse {
  data: PaymentItem[];
  meta: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
}

const PaymentList = () => {
  const [items, setItems] = useState<PaymentItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  const fetchPayments = async (page: number) => {
    try {
      const res = await axios.get<PaymentResponse>(
        '/api/users/projects/payments',
        {
          params: { page, limit },
          withCredentials: true,
        },
      );
      setItems(res.data.data);
      setCurrentPage(res.data.meta.currentPage);
      setTotalPages(res.data.meta.totalPages);
    } catch (error) {
      console.error('결제 리스트 조회 실패:', error);
    }
  };

  useEffect(() => {
    fetchPayments(currentPage);
  }, [currentPage]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="w-full bg-white border border-gray-300 rounded-md px-6 py-4 flex flex-col justify-between gap-6 min-h-[160px]">
      {/* 상단 타이틀 + 필터 */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Title className="text-black">결제 내역 리스트</Title>
        <div className="flex gap-2">
          <Dropdown
            kind="status"
            usage="click"
            onClick={(e) => console.log(e)}
          />
          <Dropdown
            kind="recommand"
            usage="click"
            onClick={(e) => console.log(e)}
          />
        </div>
      </div>

      {/* 테이블 헤더 */}
      <div className="w-full flex px-2 py-3 border-b border-gray-300 text-center text-base font-medium text-black">
        <div className="basis-3/6">상품</div>
        <div className="basis-1/6">옵션</div>
        <div className="basis-1/6">날짜</div>
        <div className="basis-1/6">금액</div>
        <div className="basis-1/6">상태</div>
      </div>

      {/* 테이블 본문 */}
      <div className="w-full flex flex-col divide-y divide-gray-200">
        {items.map((item, idx) => (
          <Link
            to={`/products/${item.scheduleId}`}
            key={item.scheduleId}
            className="flex items-center px-2 py-4 hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-4 basis-3/6">
              <img
                src={
                  item.productImage || `https://picsum.photos/seed/${idx}/70/70`
                }
                alt={item.productName}
                className="w-[70px] h-[70px] rounded object-cover"
              />
              <MediumFont className="text-sm sm:text-base text-black">
                {item.productName}
              </MediumFont>
            </div>

            <MediumFont className="basis-1/6 text-center text-sm sm:text-base text-black">
              {item.optionName}
            </MediumFont>

            <MediumFont className="basis-1/6 text-center text-sm sm:text-base text-black">
              {format(parseISO(item.date), 'yyyy.MM.dd')}
            </MediumFont>

            <MediumFont className="basis-1/6 text-center text-sm sm:text-base text-black">
              {item.amount.toLocaleString()}원
            </MediumFont>

            <MediumFont className="basis-1/6 text-center text-sm sm:text-base font-medium">
              <span
                className={
                  item.status === 'success'
                    ? 'text-[#49DB00]'
                    : 'text-[#FB6565]'
                }
              >
                {item.status === 'success' ? '성공' : '실패'}
              </span>
            </MediumFont>
          </Link>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center items-center mt-[25px] gap-[10px]">
        <button
          onClick={() => goToPage(1)}
          disabled={currentPage === 1}
          className="cursor-pointer"
        >
          {'<<'}
        </button>
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="cursor-pointer"
        >
          {'<'}
        </button>

        <div className="flex gap-[15px] text-[23px]">
          {Array.from({ length: totalPages }).map((_, idx) => {
            const page = idx + 1;
            return (
              <span
                key={page}
                className={`cursor-pointer ${page === currentPage ? 'text-black' : 'text-[#7E7C7C]'}`}
                onClick={() => goToPage(page)}
              >
                {page}
              </span>
            );
          })}
        </div>

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="cursor-pointer"
        >
          {'>'}
        </button>
        <button
          onClick={() => goToPage(totalPages)}
          disabled={currentPage === totalPages}
          className="cursor-pointer"
        >
          {'>>'}
        </button>
      </div>
    </div>
  );
};

export default PaymentList;
