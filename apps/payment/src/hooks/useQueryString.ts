import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useQueryString = (value: string) => {
  const nav = useNavigate();
  const key = 'title';

  useEffect(() => {
    const params = new URLSearchParams();
    params.set(key, value);

    nav(`?${params.toString()}`);
  }, [value, nav]);
};

export default useQueryString;
