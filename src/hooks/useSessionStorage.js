import { useCallback } from 'react';

const useSessionStorage = () => {
  const getItem = useCallback((key) => {
    const item = window.sessionStorage.getItem(key);
    return item ? JSON.parse(item): '';
  }, [])
  const setItem = useCallback((key, newValue) => {
    window.sessionStorage.setItem(key, JSON.stringify(newValue));
  }, []);
  const removeItem = useCallback((key) => {
    window.sessionStorage.setItem(key);
  }, []);
  return { getItem, setItem, removeItem };
};

export default useSessionStorage;