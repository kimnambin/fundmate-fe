import { css } from 'styled-components';

export const MarkdownStyles = css`
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
