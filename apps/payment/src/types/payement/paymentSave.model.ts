export interface BankPayload {
  userId: string;
  method: string;
  code: string;
  token: string;
  displayInfo: string;
  extra: {
    type: 'vbank';
    owner: string;
  };
}

export interface CardPayload {
  userId: string;
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
