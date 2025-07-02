import { useLocation } from 'react-router-dom';
import { Bottom, Wrapper } from './askFundi.styles';
import { Layout } from '../../style/layout';
import MarkdownEditor from '@uiw/react-markdown-editor';
import MainButton from '../../components/main-button/mainButton';

const AskFundiResult = () => {
  const location = useLocation();
  const response = location.state;
  return (
    <Layout>
      <Wrapper>
        <MarkdownEditor.Markdown source={response.message} />
      </Wrapper>
      <Bottom>
        <MainButton label="저장하기" width="w-[200px]" />
      </Bottom>
    </Layout>
  );
};

export default AskFundiResult;
