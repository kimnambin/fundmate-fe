import { StatisticsBody } from '../components/StatisticsBody';
import { StatisticsHeader } from '../components/StatisticsHeader';
import { Layout } from '@repo/ui/Layout'

export const StatisticsPage = () => {
  return (
    <>
      <Layout className='my-[70px]'>
        <StatisticsHeader />
        <StatisticsBody />
      </Layout>
    </>
  );
};
