import { useCallback } from 'react';

const useSessionStorage = () => {
  const getItemST = useCallback((key) => {
    const item = window.sessionStorage.getItem(key);
    return item ? JSON.parse(item): '';
  }, [])
  const setItemST = useCallback((key, newValue) => {
    window.sessionStorage.setItem(key, JSON.stringify(newValue));
  }, []);
  const removeItemST = useCallback((key) => {
    window.sessionStorage.removeItem(key);
  }, []);
  return { getItemST, setItemST, removeItemST };
};

export default useSessionStorage;