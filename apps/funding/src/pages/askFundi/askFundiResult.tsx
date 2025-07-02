import { useLocation } from 'react-router-dom';
import { Bottom, Wrapper } from './askFundi.styles';
import { Layout } from '../../style/layout';
import MarkdownEditor from '@uiw/react-markdown-editor';
import MainButton from '../../components/main-button/mainButton';
import { useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';

const AskFundiResult = () => {
  const location = useLocation();
  const response = location.state;

  const [isCapture, setIsCapture] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const handleSavePDF = async () => {
    if (!ref.current) return;

    setIsCapture(true);

    const opt = {
      margin: 1,
      filename: 'FundiResult.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: {
        mode: ['avoid-all'],
      },
    };

    await html2pdf().set(opt).from(ref.current).save();
    setIsCapture(false);
  };

  return (
    <Layout>
      <Wrapper ref={ref} isCapture={isCapture}>
        <MarkdownEditor.Markdown source={response.message} />
      </Wrapper>
      <Bottom>
        <MainButton
          label="저장하기"
          width="w-[200px]"
          onClick={handleSavePDF}
        />
      </Bottom>
    </Layout>
  );
};

export default AskFundiResult;
