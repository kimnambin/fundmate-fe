import { http, HttpResponse } from 'msw';

interface BankPayload {
  method: string;
  code: string;
  token: string;
  displayInfo: string;
  details: {
    type: 'vbank';
    owner: string;
  };
}

interface CardPayload {
  method: string;
  code: string;
  token: string;
  displayInfo: string;
  details: {
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
  method: string;
}

export const handlers = [
  http.post('/payments', async ({ request }: { request: Request }) => {
    const data = await request.json();

    if (!data.details || !data.details.type) {
      return HttpResponse.json(
        { message: '결제 타입이 누락되었습니다.' },
        { status: 400 },
      );
    }

    if (data.details.type === 'card') {
      const { method, code, token, displayInfo, details } = data as CardPayload;

      if (
        !displayInfo ||
        !code ||
        !method ||
        !token ||
        !details ||
        !details.expMonth ||
        !details.expYear
      ) {
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

    if (data.details.type === 'vbank') {
      const { method, code, token, displayInfo, details } = data as BankPayload;

      if (!displayInfo || !code || !method || !token || !details) {
        return HttpResponse.json(
          { message: '모든 입력창이 입력되지 않았습니다.' },
          { status: 400 },
        );
      }

      return HttpResponse.json(
        { message: `${details.owner}님 결좌이체 완료` },
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
      scheduleDate,
      address,
      addressNumber,
      addressInfo,
      method,
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
      method,
    );

    return HttpResponse.json(
      { message: `${amount}원 결좌이체 완료` },
      { status: 201 },
    );
  }),

  http.get('/payments', async ({ request }: { request: Request }) => {
    console.log(request);
    return HttpResponse.json({ message: '결제 조회 완료' }, { status: 200 });
  }),

  http.post('/api/auth/login', async ({ request }) => {
    const { email } = (await request.json()) as { email: string };
    return HttpResponse.json(
      {
        token: 'mock-token',
        nickname: 'mock-nickname',
        user: { email },
      },
      { status: 200 },
    );
  }),

  http.post('/api/auth/signup', async ({ request }) => {
    const body = await request.json();
    console.log('회원가입 요청', body);
    return HttpResponse.json({ message: '회원가입 완료' }, { status: 201 });
  }),

  http.post('/api/auth/codes/send', async ({ request }) => {
    const body = await request.json();
    console.log('인증번호 발송 요청', body);
    return HttpResponse.json({ message: '인증번호 발송 완료' }, { status: 200 });
  }),

  http.post('/api/auth/codes/verify', async ({ request }) => {
    const body = await request.json();
    console.log('인증번호 확인 요청', body);
    return HttpResponse.json({ message: '인증 완료' }, { status: 200 });
  }),

  http.patch('/api/auth/password', async ({ request }) => {
    const body = await request.json();
    console.log('비밀번호 변경 요청', body);
    return HttpResponse.json({ message: '비밀번호 변경 완료' }, { status: 200 });
  }),
];
