import { useSearchParams } from "react-router-dom";
import { CompleteDropdown } from "./CompleteDropdown"
import { RecommendDropdown } from "./RecommendDropdown"
import { StatusDropdown } from "./StatusDropdown"

export interface DropdownProps {
  query: string | unknown | null;
  onClick?: (v: string | number) => void;
}

type MainDropdownProps = {
  kind: 'status' | 'recommand' | 'complete';
  usage: 'query' | 'click';
  onClick?: (v: string | number) => void;
}

export const Dropdown = ({ kind, usage, onClick }: MainDropdownProps) => {
  const [searchParams] = useSearchParams();
  const queryKey = Array.from(searchParams.keys())[0]
  if (usage === 'query') {
    if (kind === 'status') return <StatusDropdown query={queryKey} />
    if (kind === 'recommand') return <RecommendDropdown query={queryKey} />
    if (kind === 'complete') return <CompleteDropdown query={queryKey} />
  } else if (usage === 'click') {
    if (kind === 'status') return <StatusDropdown query={null} onClick={onClick} />
    if (kind === 'recommand') return <RecommendDropdown query={null} onClick={onClick} />
    if (kind === 'complete') return <CompleteDropdown query={null} onClick={onClick} />
  }
  return null;
};
