import { DescText } from '../styles/product-detail/prdouctstyle.style';
import MarkdownEditor from '@uiw/react-markdown-editor';

interface Props {
  description: string;
}

const PDdetail = ({ description }: Props) => {
  return (
    <>
      <DescText>
        <div data-color-mode="light">
          <MarkdownEditor.Markdown source={description} />
        </div>
      </DescText>
    </>
  );
};

export default PDdetail;
