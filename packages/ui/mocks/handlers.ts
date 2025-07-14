import { http, HttpResponse } from 'msw';

// TODO : 추후 실제 명과 API로 수정 예정
interface CardRequestProps {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
  address: string;
}

interface TransferTypes {
  selectedBank: string;
  accountNumber: string;
  accountHolder: string;
  birthDate: string;
  address: string;
}

export const handlers = [
  http.post(`/payment/card`, async ({ request }) => {
    const data = await request.json();
    const { cardNumber, expiryDate, cvv, cardName } = data as CardRequestProps;

    console.log('입력한 내용들', data);

    if (!cardNumber || !expiryDate || !cvv || !cardName) {
      return HttpResponse.json(
        {
          message: '모든 입력창이 입력되지 않았습니다.',
        },
        { status: 400 },
      );
    }

    return HttpResponse.json(
      { message: '결제 완료', cardNumber },
      { status: 201 },
    );
  }),

  http.post('/payment/transfer', async ({ request }) => {
    const data = await request.json();
    const { selectedBank, accountNumber, accountHolder, birthDate } =
      data as TransferTypes;

    console.log('입력한 내용들', data);

    if (!selectedBank || !accountNumber || !accountHolder || !birthDate) {
      return HttpResponse.json(
        {
          message: '모든 입력창이 입력되지 않았습니다.',
        },
        { status: 400 },
      );
    }

    return HttpResponse.json(
      { message: `${accountHolder}님 결좌이체 완료` },
      { status: 201 },
    );
  }),
];
