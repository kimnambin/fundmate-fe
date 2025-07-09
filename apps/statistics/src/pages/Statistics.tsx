import { StatisticsBody } from '../components/StatisticsBody';
import { StatisticsHeader } from '../components/StatisticsHeader';
import { Layout } from '@repo/ui/styles'
import { Loading, Modal } from '@repo/ui/components';
import { statisticsStore } from '../stores/StatisticsStore';

const StatisticsPage = () => {
  const isLoading = statisticsStore((state) => state.isLoading);
  const isSubmit = statisticsStore((state) => state.isSubmit);

  if (isLoading) {
    return (
      <Layout>
        <Modal isOpen={isLoading}>
          <Loading />
        </Modal>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className='flex flex-col gap-10'>
        <StatisticsHeader />
        {
          isSubmit && <StatisticsBody />
        }
      </div>
    </Layout>
  );
};

export default StatisticsPage;
