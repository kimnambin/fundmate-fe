import { StatisticsBody } from '../components/StatisticsBody';
import { StatisticsHeader } from '../components/StatisticsHeader';
import { Layout } from '@repo/ui/styles';
import { Loading } from '@repo/ui/components';
import { useEffect, useState } from 'react';
import { statisticsStore } from '../stores/StatisticsStore';

const StatisticsPage = () => {
  const isLoading = false;
  const [dataSelection, setDataSelection] = useState<any>();
  const isDataSubmitted = statisticsStore(())
  useEffect(() => {
    console.log(dataSelection);
  }, [dataSelection]);

  return (
    <Layout>
      <div className="flex flex-col gap-10">
        <StatisticsHeader setData={setDataSelection} />
        {isLoading && (
          <Layout>
            <Loading />
          </Layout>
        )}
        {isSubmit && <StatisticsBody />}
      </div>
    </Layout>
  );
};

export default StatisticsPage;
