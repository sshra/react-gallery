import { useLocation } from 'react-router-dom';

export const useBuildItemLink = (id) => {
  const location = useLocation();
  let uri = `/item/${id}`;
  console.log(location.pathname);
  if (location.pathname.startsWith('/liked')) {
    uri = `/liked/item/${id}`;
  } else if (location.pathname.startsWith('/search')) {
    uri = `/search/item/${id}`;
  }
  return uri;
};
