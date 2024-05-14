import { useCallback } from 'react';

const useSessionStorage = () => {
  const getItem = useCallback((key) => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item): '';
  }, [])
  const setItem = useCallback((key, newValue) => {
    window.localStorage.setItem(key, JSON.stringify(newValue));
  }, []);
  const removeItem = useCallback((key) => {
    window.localStorage.setItem(key);
  }, []);
  return { getItem, setItem, removeItem };
};

export default useSessionStorage;