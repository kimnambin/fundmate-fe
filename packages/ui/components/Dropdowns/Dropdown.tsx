import { CompleteDropdown } from "./CompleteDropdown"
import { RecommendDropdown } from "./RecommendDropdown"
import { StatusDropdown } from "./StatusDropdown"

type kindOfDropdown = {
  kind: 'status' | 'recommand' | 'complete'
}

export const Dropdown = ({ kind }: kindOfDropdown) => {
  if (kind === 'status') return <StatusDropdown />
  if (kind === 'recommand') return <RecommendDropdown />
  if (kind === 'complete') return <CompleteDropdown />
};
