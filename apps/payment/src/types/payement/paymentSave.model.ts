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
