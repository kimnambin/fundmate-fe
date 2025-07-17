import { StatisticsBody } from '../components/StatisticsBody';
import { StatisticsHeader } from '../components/StatisticsHeader';
import { Layout } from '@repo/ui/styles';
import { Loading } from '@repo/ui/components';
import { useEffect, useState } from 'react';
import { statisticsStore } from '../stores/StatisticsStore';

const StatisticsPage = () => {
  const isLoading = false;
  const [dataSelection, setDataSelection] = useState<any>();
  const isDataSubmitted = statisticsStore((state) => state.isDataSubmitted);
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
        {isDataSubmitted && <StatisticsBody rawData={dataSelection} />}
      </div>
    </Layout>
  );
};

export default StatisticsPage;
