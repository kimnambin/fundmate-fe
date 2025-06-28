import { Dropdown } from "@repo/ui/components"

type SearchHeaderProps = {
  isCategory: boolean;
  menuName?: string | null;
}

export const SearchHeader = ({ isCategory, menuName }: SearchHeaderProps) => {

  return (
    <div className="flex flex-col gap-7 my-7">
      {
        isCategory ? <span className="text-2xl font-semibold">{menuName}</span> : <></>
      }
      <div className="flex flex-row gap-3">
        {
          isCategory ? <Dropdown kind="status" /> : <></>
        }
        <Dropdown kind="complete" />
      </div>
      <div className="flex flex-row justify-between">
        <div>
          <span className="text-cyan-400 font-semibold">10000</span>
          <span>개의 오브젝트가 있습니다.</span>
        </div>
        {
          isCategory ? <Dropdown kind="recommand" /> : <></>
        }
      </div>
    </div>

  )
}
