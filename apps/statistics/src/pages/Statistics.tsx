import { Header } from '@repo/ui/components';
import { StatisticsBody } from '../components/StatisticsBody';
import { StatisticsHeader } from '../components/StatisticsHeader';
import { Layout } from '../styles/Layout.style';

export const StatisticsPage = () => {
  return (
    <>
      <Header />
      <Layout>
        <StatisticsHeader />
        <StatisticsBody />
      </Layout>
    </>
  );
};
