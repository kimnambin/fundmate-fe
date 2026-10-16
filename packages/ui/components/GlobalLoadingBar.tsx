import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { loadingStore } from '../stores/loadingStore';

// 짧은 요청에서 바가 깜빡이지 않도록 이 시간(ms) 이상 걸릴 때만 보여준다.
const SHOW_DELAY = 150;

const slide = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(350%); }
`;

const Track = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  overflow: hidden;
  z-index: 9999;
  pointer-events: none;
`;

const Bar = styled.div`
  width: 30%;
  height: 100%;
  background: #5fbdff;
  animation: ${slide} 1.1s ease-in-out infinite;
`;

/** API 요청이 진행되는 동안 화면 상단에 표시되는 로딩 바. */
export const GlobalLoadingBar = () => {
  const isLoading = loadingStore((s) => s.isLoading);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setVisible(false);
      return;
    }
    const timer = setTimeout(() => setVisible(true), SHOW_DELAY);
    return () => clearTimeout(timer);
  }, [isLoading]);

  if (!visible) return null;

  return (
    <Track role="progressbar" aria-busy="true" aria-label="로딩 중">
      <Bar />
    </Track>
  );
};
