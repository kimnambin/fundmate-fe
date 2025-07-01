import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Mypage from './Mypage'; // ✅ 여기 경로 중요

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Mypage /> {/* ✅ App → Mypage로 변경 */}
  </React.StrictMode>,
);
