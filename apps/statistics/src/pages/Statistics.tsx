import { StatisticsBody } from '../components/StatisticsBody';
import { StatisticsHeader } from '../components/StatisticsHeader';
import { Layout } from '@repo/ui/styles'

export const StatisticsPage = () => {
  return (
    <>
      <Layout>
        <div className='flex flex-col gap-10'>
          <StatisticsHeader />
          <StatisticsBody />
        </div>
      </Layout>
    </>
  );
};
