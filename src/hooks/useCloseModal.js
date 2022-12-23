import { useLocation, useNavigate } from 'react-router-dom';

export const useCloseModal = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const closeModal = () => {
    if (location.pathname.includes('/liked/')) {
      navigate(`/liked`);
    } else if (location.pathname.includes('/search/')) {
      navigate(`/search`);
    } else {
      navigate(`/`);
    }
  };

  return closeModal;
};

export default useCloseModal;
