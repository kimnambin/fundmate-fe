import { createGlobalStyle } from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    body {
        font-family: 'Pretendard';
        font-size: 16px;
    }

    .wmde-markdown ul,
    .wmde-markdown ol {
    margin-left: 1.25rem;
    padding-left: 1rem;
    list-style-type: disc;
    }
    .wmde-markdown ol {
    list-style-type: decimal;
    }

    .custom-scroll::-webkit-scrollbar {
    width: 6px;
    }
    .custom-scroll::-webkit-scrollbar-track {
    background: transparent;
    }
    .custom-scroll::-webkit-scrollbar-thumb {
    background-color: #999;
    border-radius: 6px;
    }
`;

export default GlobalStyle;
