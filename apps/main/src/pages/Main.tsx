import { Footer } from '@repo/ui/components';
import { MainContainer } from '../components/mainPage/MainContainer';
import { Layout } from '@repo/ui/styles';
import { SwiperComponents } from '../components/mainPage/SwiperComponent';

export const Main = () => {
  return (
    <>
      <Layout>
        <MainContainer />
      </Layout>
      <div className="flex flex-col gap-10">
        <SwiperComponents componentId={1} componentName="최근 본 프로젝트" />
        <SwiperComponents componentId={2} componentName="마감 임박 프로젝트" />
        <SwiperComponents componentId={3} componentName="신규 프로젝트" />
      </div>
      <Footer />
    </>
  );
};
