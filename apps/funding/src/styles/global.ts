import { createGlobalStyle } from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    body {
        font-family: 'Pretendard';
        font-size: 14px;
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
`;

export default GlobalStyle;
