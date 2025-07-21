import { useState } from 'react';
import {
  Header,
  Wrapper,
  Text,
  Topic,
  Title,
  Main,
  Box,
  Line,
  Blank,
} from '../styles/product-detail/prdouctstyle.style';
import PDBox from './PDRight';
import PDdetail from './PDdetail';
import PDReview from './PDReview';

export interface User {
  image_url: number;
  nickname: string;
  content: string | null;
}

export interface Option {
  title: string;
  description: string;
  price: number;
}

export interface ProductDetailProps {
  user: User;
  options: Option[];
  selectedOption?: number;
  setSelectedOption?: (index: number) => void;
  description: string;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  user,
  options,
  description,
}) => {
  const [currentPage, setCurrentPage] = useState<boolean>(true);
  const projectTitle = ['프로젝트 소개', '프로젝트 후기'];
  const [selectedOption, setSelectedOption] = useState(0);

  return (
    <Wrapper>
      <Header>
        {projectTitle.map((title, idx) => (
          <Text
            key={title}
            className="cursor-pointer"
            $ishas={currentPage === (idx === 0)}
            onClick={() => setCurrentPage(idx === 0)}
          >
            {title}
          </Text>
        ))}
      </Header>
      <Topic>
        <Line />
        <Title>{currentPage ? projectTitle[0] : projectTitle[1]}</Title>
      </Topic>
      <Main>
        <Box>
          {currentPage ? <PDdetail description={description} /> : <PDReview />}
        </Box>
        <PDBox
          user={user}
          options={options}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      </Main>
      <Blank></Blank>
    </Wrapper>
  );
};

export default ProductDetail;
