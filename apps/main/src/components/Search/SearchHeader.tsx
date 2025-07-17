import { MediumFont, SubTitle, Title } from "@repo/ui/styles";
import { Dropdown } from "@repo/ui/components";

type SearchHeaderProps = {
  isCategory: boolean;
  isSearch: boolean;
  queryValue?: string | null;
}

export const SearchHeader = ({ isCategory, isSearch, queryValue }: SearchHeaderProps) => {

  return (
    <div className="flex flex-col gap-7 my-7">
      {
        isCategory ? <Title>{queryValue}</Title> : <></>
      }
      {
        isSearch ? <Title>'{queryValue}'에 대한 검색 결과</Title> : <></>
      }
      <div className="flex flex-row gap-3">
        {
          isCategory || isSearch ? <Dropdown kind="status" usage="query" /> : <></>
        }
        <Dropdown kind="complete" usage="query" />
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row">
          <SubTitle className='text-main'>10000</SubTitle>
          <MediumFont>개의 오브젝트가 있습니다.</MediumFont>
        </div>
        {
          isCategory || isSearch ? <Dropdown kind="recommand" usage="query" /> : <></>
        }
      </div>
    </div>

  )
}
