// 앱 간에 공유되는 localStorage 키. 문자열을 직접 쓰지 말고 이 상수를 쓴다.
export const STORAGE_KEYS = {
  // 로그인한 사용자의 닉네임 (로그인 시 저장, 401 시 삭제)
  nickname: 'nickname',
  // 비밀번호 재설정 이메일 인증 완료 표시 (인증 시 저장, 비밀번호 변경 시 삭제)
  emailVerified: 'auth',
} as const;
