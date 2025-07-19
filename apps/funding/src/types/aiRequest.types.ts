export type Category =
  | '예술'
  | '의류'
  | '디자인'
  | '테크/가전'
  | '게임'
  | '홈/리빙'
  | '향수/뷰티'
  | '잡화';
export type Gender = '남성' | '여성' | '관계없음';
export type Age = '10대' | '20대' | '30대' | '40대' | '50대 이상' | '모든 연령';

export type aiRequestData = {
  input_text: string;
  category: Category;
  gender: Gender;
  age_ground: Age;
};
