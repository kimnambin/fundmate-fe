import { Dropdown } from "@repo/ui/components"

export const SearchHeader = () => {
  return (
    <div className="flex flex-col gap-7 my-7">
      <span className="text-2xl font-semibold">전체</span>
      <div className="flex flex-row gap-3">
        <Dropdown kind="status" />
        <Dropdown kind="complete" />
      </div>
      <div className="flex flex-row justify-between">
        <div>
          <span className="text-cyan-400 font-semibold">10000</span>
          <span>개의 오브젝트가 있습니다.</span>
        </div>
        <Dropdown kind="recommand" />
      </div>
    </div>

  )
}
