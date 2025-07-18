import { css } from 'styled-components';

export const CustomScrollbar = css`
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #999;
    border-radius: 6px;
  }
`;
