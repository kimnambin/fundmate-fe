import { useSearchParams } from "react-router-dom";
import { CompleteDropdown } from "./CompleteDropdown"
import { RecommendDropdown } from "./RecommendDropdown"
import { StatusDropdown } from "./StatusDropdown"

export type DropdownProps = {
  query: string;
}

type kindOfDropdown = {
  kind: 'status' | 'recommand' | 'complete'
}

export const Dropdown = ({ kind }: kindOfDropdown) => {
  const [searchParams] = useSearchParams();
  const queryKey = Array.from(searchParams.keys())[0];
  if (kind === 'status') return <StatusDropdown query={queryKey} />
  if (kind === 'recommand') return <RecommendDropdown query={queryKey} />
  if (kind === 'complete') return <CompleteDropdown query={queryKey} />
  return null;
};
