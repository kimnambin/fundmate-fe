import { StatisticsBody } from '../components/StatisticsBody';
import { StatisticsHeader } from '../components/StatisticsHeader';
import { Layout } from '@repo/ui/styles'
import { Loading } from '@repo/ui/components';
import { statisticsStore } from '../stores/StatisticsStore';

const StatisticsPage = () => {
  const isLoading = statisticsStore((state) => state.isLoading);
  const isSubmit = statisticsStore((state) => state.isSubmit);

  return (
    <Layout>
      <div className='flex flex-col gap-10'>
        <StatisticsHeader />
        {
          isLoading && (
            <Layout>
              <Loading />
            </Layout>
          )
        }
        {
          isSubmit && <StatisticsBody />
        }
      </div>
    </Layout>
  );
};

export default StatisticsPage;
