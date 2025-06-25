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
`;

export default GlobalStyle;
