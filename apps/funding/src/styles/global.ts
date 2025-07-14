import { createGlobalStyle } from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import { CustomScrollbar, MarkdownStyles } from '@repo/ui/styles';

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    body {
        font-family: 'Pretendard';
        font-size: 14px;
    }

        ${MarkdownStyles}

    .custom-scroll {
        ${CustomScrollbar}
    }
`;

export default GlobalStyle;
