import MarkdownEditor from '@uiw/react-markdown-editor';

interface Props {
  description: string;
}

const PDdetail = ({ description }: Props) => {
  return (
    <>
      <div data-color-mode="light">
        <MarkdownEditor.Markdown source={description} />
      </div>
    </>
  );
};

export default PDdetail;
