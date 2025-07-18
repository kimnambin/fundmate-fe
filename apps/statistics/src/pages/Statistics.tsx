import { StatisticsBody } from '../components/StatisticsBody';
import { StatisticsHeader } from '../components/StatisticsHeader';
import { Layout } from '@repo/ui/styles';
import { Loading } from '@repo/ui/components';
import { useEffect, useState } from 'react';
import { statisticsStore } from '../stores/StatisticsStore';
import { loadingStore } from '@repo/ui/loadingStore';
import { tempData } from '../data/tempData';

const StatisticsPage = () => {
  const isLoading = loadingStore((state) => state.isLoading);
  const [dataSelection, setDataSelection] = useState<any>();
  const isDataSubmitted = statisticsStore((state) => state.isDataSubmitted);
  useEffect(() => {
    console.log(dataSelection);
    console.log(isLoading);
  }, [dataSelection, isLoading]);
  const testData = tempData;
  console.log(testData);

  return (
    <Layout>
      <div className="flex flex-col gap-10">
        <StatisticsHeader setData={setDataSelection} />
        {isLoading && (
          <Layout>
            <Loading />
          </Layout>
        )}
        {isDataSubmitted && !isLoading && (
          <StatisticsBody rawData={dataSelection} />
        )}
      </div>
    </Layout>
  );
};

export default StatisticsPage;
