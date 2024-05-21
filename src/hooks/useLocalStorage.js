import { useCallback } from 'react';

const useLocalStorage = () => {
  const getItemLS = useCallback((key) => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item): '';
  }, [])
  const setItemLS = useCallback((key, newValue) => {
    window.localStorage.setItem(key, JSON.stringify(newValue));
  }, []);
  const removeItemLS = useCallback((key) => {
    window.localStorage.removeItem(key);
  }, []);
  return { getItemLS, setItemLS, removeItemLS };
};

export default useLocalStorage;






//
//  try {
//   if(type === 'get') {
//     const item = window.localStorage.getItem(key);
//     return item ? JSON.parse(item): '';
//   } else if (type === 'set') {
//     const setValue = useCallback((newValue) => {
//       window.localStorage.setItem(key, JSON.stringify(newValue));
//     }, []);
//     return { setValue };
//   } else {
//     const deleteValue = () => {
//       window.localStorage.removeItem(key);
//     }
//     return { deleteValue }
//   }
//  } catch (error) {
//   console.log(error);
//  }