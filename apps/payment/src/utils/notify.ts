/**
 * UI 알림 유틸리티.
 * alert() 직접 호출 대신 이 함수를 사용한다.
 * 추후 react-toastify 등 라이브러리로 교체할 때 이 파일만 수정하면 된다.
 */
export const notify = {
  success: (message: string) => {
    // TODO: replace with toast library (e.g. react-toastify)
    window.alert(message);
  },
  error: (message: string) => {
    window.alert(message);
  },
  info: (message: string) => {
    window.alert(message);
  },
};
