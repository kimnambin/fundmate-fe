import { StatisticsBody } from '../components/StatisticsBody';
import { StatisticsHeader } from '../components/StatisticsHeader';
import { Layout } from '@repo/ui/styles';
import { useState } from 'react';

const StatisticsPage = () => {
  const [dataSelection, setDataSelection] = useState<any>();

  return (
    <Layout>
      <div className="flex flex-col gap-10">
        <StatisticsHeader setData={setDataSelection} />
        {!!dataSelection && <StatisticsBody rawData={dataSelection} />}
      </div>
    </Layout>
  );
};

export default StatisticsPage;
