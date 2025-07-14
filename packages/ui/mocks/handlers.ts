import { http, HttpResponse } from 'msw';

interface RequestProps {
  method: 'CARD' | 'BANK';
  bank: string;
  token: string;
  masked: string;
  extra:
    | {
        expMonth: string;
        expYear: string;
      }
    | {
        owner: string;
      };
}

export const handlers = [
  http.post(`/payment/card`, async ({ request }) => {
    const data = await request.json();
    const { method, bank, token, masked, extra } = data as RequestProps;

    console.log('입력한 내용들', data);

    if (!masked || !bank || !method || !token || !extra) {
      return HttpResponse.json(
        {
          message: '모든 입력창이 입력되지 않았습니다.',
        },
        { status: 400 },
      );
    }

    return HttpResponse.json({ message: '결제 완료', masked }, { status: 201 });
  }),

  http.post('/payment/transfer', async ({ request }) => {
    const data = await request.json();
    const { method, bank, token, masked, extra } = data as RequestProps;

    console.log('입력한 내용들', data);

    if (!masked || !bank || !method || !token || !extra) {
      return HttpResponse.json(
        {
          message: '모든 입력창이 입력되지 않았습니다.',
        },
        { status: 400 },
      );
    }

    return HttpResponse.json(
      { message: `${extra}님 결좌이체 완료` },
      { status: 201 },
    );
  }),
];
