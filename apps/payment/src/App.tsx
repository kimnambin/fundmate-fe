import tw from 'tailwind-styled-components';
import ProductPage from './pages/ProductPage';
import { Header } from '@repo/ui/Header';

function App() {
  return (
    <>
      <Header />
      <Container>
        <ProductPage />
      </Container>
    </>
  );
}

const Container = tw.div`
    flex
    items-center
    justify-center
    h-full
    w-full
    px-[120px]
`;
// w는 실제로 값이 어떨지 봐야 할 듯
//  w-[80%]
// mx-auto

export default App;
