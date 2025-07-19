import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { Title, MediumFont } from '@repo/ui/styles';
import axios from 'axios';

interface PaymentItem {
  scheduleId: number;
  productImage: string;
  productName: string;
  optionName: string;
  date: string;
  amount: number;
  status: 'pending' | 'success';
}

interface PaymentSummaryData {
  totalPayments: number;
  totalRevenue: number;
  failedPayments: number;
}

const getCurrentDateString = (): string => {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const hh = String(now.getHours()).padStart(2, '0');
  const min = String(now.getMinutes()).padStart(2, '0');
  return `${yyyy}. ${mm}. ${dd} ${hh}:${min}`;
};

const PaymentSummary: React.FC = () => {
  const [summary, setSummary] = useState<PaymentSummaryData>({
    totalPayments: 0,
    totalRevenue: 0,
    failedPayments: 0,
  });

  const [isRotating, setIsRotating] = useState(false);
  const [currentDate, setCurrentDate] = useState(getCurrentDateString());

  const fetchPaymentSummary = async () => {
    try {
      setIsRotating(true);

      const res = await axios.get('/api/users/projects/payments', {
        params: { page: 1, limit: 1000 },
        withCredentials: true,
      });

      const payments: PaymentItem[] = res.data.data;

      const totalPayments = payments.length;
      const totalRevenue = payments
        .filter((p) => p.status === 'success')
        .reduce((sum, p) => sum + p.amount, 0);
      const failedPayments = payments.filter((p) => p.status === 'pending').length;

      setSummary({ totalPayments, totalRevenue, failedPayments });
      setCurrentDate(getCurrentDateString());
    } catch (error) {
      console.error('결제 요약 조회 실패:', error);
    } finally {
      setTimeout(() => setIsRotating(false), 1000);
    }
  };

  return (
    <div className="w-full bg-white border border-gray-300 rounded-md px-6 py-4 flex flex-col justify-between gap-6 min-h-[160px]">
      {/* 상단: 제목 + 새로고침 + 날짜 */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <Title className="text-black text-xl">오늘의 결제 요약</Title>
          <RotateCcw
            size={20}
            color="#999292"
            strokeWidth={2}
            onClick={fetchPaymentSummary}
            className={`cursor-pointer transition-transform duration-700 ${
              isRotating ? 'rotate-[360deg]' : ''
            }`}
          />
        </div>
        <MediumFont className="text-[#7E7C7C]">{currentDate}</MediumFont>
      </div>

      {/* 하단: 데이터 항목 */}
      <div className="flex justify-end">
        <div className="flex gap-4 flex-wrap justify-end items-end text-right">
          {[
            { label: '총 결제 건수', value: `${summary.totalPayments.toLocaleString()}개` },
            { label: '총 수익', value: `${summary.totalRevenue.toLocaleString()}원` },
            { label: '미결제 실패', value: `${summary.failedPayments.toLocaleString()}회` },
          ].map(({ label, value }, idx, arr) => (
            <div key={label} className="flex items-end gap-4">
              <div className="flex flex-col items-end min-w-[120px]">
                <MediumFont className="text-[#7E7C7C]">{label}</MediumFont>
                <MediumFont className="text-black text-lg">{value}</MediumFont>
              </div>
              {idx !== arr.length - 1 && (
                <div className="h-6 w-px bg-gray-300 self-center" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;
