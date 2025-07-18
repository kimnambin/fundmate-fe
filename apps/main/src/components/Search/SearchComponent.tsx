import { VerticalCard } from '@repo/ui/components';
import { SearchContainer } from '../../styles/Search/SearchContainer.style';
import { SearchHeader } from './SearchHeader';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { commonApiInstance } from '@repo/ui/hooks';
import type { ProductType } from '../../types/ProductType';
import { GiNothingToSay } from 'react-icons/gi';
import { Title } from '@repo/ui/styles';

export const SearchComponent = () => {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState<ProductType[]>();
  const queryKey = Array.from(searchParams.keys());
  const isCategory = queryKey.includes('category');
  const isSearch = queryKey.includes('query');
  const location = useLocation();
  const menuName = location.state?.menuName;

  let queryValue: any;
  if (isCategory) {
    queryValue = searchParams.get('category');
  } else if (isSearch) {
    queryValue = searchParams.get('query');
  }

  const getSearchData = async () => {
    setData(undefined);
    let pathname: string;
    if (isCategory) {
      if (queryValue === '0') {
        pathname = `/api/projects`;
      } else {
        pathname = `/api/projects/${queryValue}`;
      }
    } else if (isSearch) {
      pathname = `/api/projects/search?query=${queryValue}`;
    } else {
      pathname = `/api/projects/${queryKey[0]}`;
    }
    await commonApiInstance
      .get(pathname)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getSearchData();
    console.log(data);
  }, [searchParams]);

  return (
    <>
      <SearchHeader
        isCategory={isCategory}
        isSearch={isSearch}
        queryValue={isCategory ? menuName : queryValue}
        length={data?.length ?? 0}
      />
      <SearchContainer>
        {data?.length ? (
          data.map((item) => (
            <div key={item.image_url}>
              <VerticalCard
                id={item.project_id}
                title={item.title}
                description={item.short_description}
              />
            </div>
          ))
        ) : (
          <div className="w-full min-h-[500px] flex flex-col items-center justify-center col-span-5 gap-7 opacity-20">
            <GiNothingToSay className="text-[70px]" />
            <Title>진행 중인 프로젝트가 없어요</Title>
          </div>
        )}
      </SearchContainer>
    </>
  );
};
