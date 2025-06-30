export {};

declare global {
  interface DaumPostcodeData {
    zonecode: string;
    address: string;
  }

  interface DaumPostcodeConstructor {
    new (options: { oncomplete: (data: DaumPostcodeData) => void }): {
      open(): void;
    };
  }

  interface Window {
    daum: {
      Postcode: DaumPostcodeConstructor;
    };
  }
}
