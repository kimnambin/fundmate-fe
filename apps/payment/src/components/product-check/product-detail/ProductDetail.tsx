import {
  Header,
  Wrapper,
  Text,
  Topic,
  Title,
  Main,
  Box,
  Line,
  DescText,
  Blank,
} from '../../styles/product-detail/prdouctstyle';
import PDBox from './PDBox';

const ProductDetail = () => {
  return (
    <Wrapper>
      <Header>
        <Text ishas="true">프로젝트 계획</Text>
        <Text>후기</Text>
      </Header>
      <Topic>
        <Line />
        <Title>프로젝트 소개</Title>
      </Topic>
      <Main>
        <Box>
          <DescText>여기에 프로젝트 소개가 담길 예정</DescText>
        </Box>
        <PDBox />
      </Main>
      <Blank></Blank>
    </Wrapper>
  );
};

export default ProductDetail;
