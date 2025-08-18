import { http, HttpResponse } from 'msw';

interface BankPayload {
  method: string;
  code: string;
  token: string;
  displayInfo: string;
  extra: {
    type: 'vbank';
    owner: string;
  };
}

interface CardPayload {
  method: string;
  code: string;
  token: string;
  displayInfo: string;
  extra: {
    type: 'card';
    expMonth: string;
    expYear: string;
  };
}

interface PostPaymentRequest {
  paymentInfoId: number;
  rewardId: number;
  projectId: number;
  amount: number;
  totalAmount: number;
  scheduleDate: string;
  address: string;
  addressNumber: number;
  addressInfo: string;
}

export const handlers = [
  http.post('/payments', async ({ request }: { request: Request }) => {
    const data = await request.json();

    if (data.extra?.type === 'card') {
      const { method, code, token, displayInfo, extra } = data as CardPayload;
      if (!displayInfo || !code || !method || !token || !extra) {
        return HttpResponse.json(
          { message: '모든 입력창이 입력되지 않았습니다.' },
          { status: 400 },
        );
      }
      return HttpResponse.json(
        { message: '카드 결제 완료', displayInfo },
        { status: 201 },
      );
    }

    if (data.extra?.type === 'vbank') {
      const { method, code, token, displayInfo, extra } = data as BankPayload;
      if (!displayInfo || !code || !method || !token || !extra) {
        return HttpResponse.json(
          { message: '모든 입력창이 입력되지 않았습니다.' },
          { status: 400 },
        );
      }
      return HttpResponse.json(
        { message: `${extra.owner}님 결좌이체 완료` },
        { status: 201 },
      );
    }

    return HttpResponse.json(
      { message: '잘못된 결제 방식입니다.' },
      { status: 400 },
    );
  }),

  http.post('/reservations', async ({ request }: { request: Request }) => {
    const data = await request.json();
    const {
      paymentInfoId,
      rewardId,
      projectId,
      amount,
      totalAmount,
      scheduleDate,
      address,
      addressNumber,
      addressInfo,
    } = data as PostPaymentRequest;

    console.log('입력한 내용들', data);
    console.log(
      paymentInfoId,
      rewardId,
      projectId,
      amount,
      scheduleDate,
      address,
      addressNumber,
      addressInfo,
    );

    return HttpResponse.json(
      { message: `${totalAmount}원 결좌이체 완료` },
      { status: 201 },
    );
  }),

  http.get('/payments/', async ({ request }: { request: Request }) => {
    console.log(request);
    return HttpResponse.json({ message: '결제 조회 완료' }, { status: 200 });
  }),
];
