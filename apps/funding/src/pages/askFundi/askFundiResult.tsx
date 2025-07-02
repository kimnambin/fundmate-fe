import { useLocation } from 'react-router-dom';
import { Wrapper } from './askFundi.styles';
import { Layout } from '../../style/layout';

const AskFundiResult = () => {
  const location = useLocation();
  const response = location.state;
  return (
    <Layout>
      <Wrapper>{response.message}</Wrapper>
    </Layout>
  );
};
export default AskFundiResult;
