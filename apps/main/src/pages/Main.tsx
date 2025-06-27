import { Header } from '@repo/ui/components';
import { Footer } from '@repo/ui/components';
import { MainContainer } from '../components/mainPage/MainContainer';
import { Layout } from '../styles/Layout.style';

export const Main = () => {
  return (
    <>
      <Header />
      <Layout>
        <MainContainer />
      </Layout>
      <Footer />
    </>
  );
};
