export interface Result {
  type: 'CARD' | 'BANk';
  bank: string;
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
