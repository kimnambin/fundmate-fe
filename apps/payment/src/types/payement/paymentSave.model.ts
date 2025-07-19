export interface BankPayload {
  // userId: string;
  method: string;
  code: string;
  displayInfo: string;
  token: string;
  details: {
    type: 'vbank';
    owner: string;
  };
}

export interface CardPayload {
  // userId: string;
  method: string;
  code: string;
  displayInfo: string;
  token: string;
  details: {
    type: 'card';
    expMonth: string;
    expYear: string;
  };
}

export interface PaymentSavePayment {
  data: {
    id: number;
    userId: number;
    method: string;
    code: string;
    token: string;
    displayInfo: string;
    details: {
      type: string;
      expMonth: string;
      expYear: string;
    };
    createdAt: string;
    updatedAt: string;
  };
}
