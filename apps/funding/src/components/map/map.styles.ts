import tw from 'tailwind-styled-components';
import styled from 'styled-components';

const MapWrapper = tw.div`
    relative
`;

export const Wrapper = styled(MapWrapper)`
  .svg-map {
    height: 300px !important;
  }

  .svg-map + div {
    display: none;
  }
`;
