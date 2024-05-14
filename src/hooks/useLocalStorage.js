import { useCallback } from 'react';

const useLocalStorage = () => {
  const getItem = useCallback((key) => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item): '';
  }, [])
  const setItem = useCallback((key, newValue) => {
    console.log('SET ITEM CALLED');
    window.localStorage.setItem(key, JSON.stringify(newValue));
  }, []);
  const removeItem = useCallback((key) => {
    window.localStorage.setItem(key);
  }, []);
  return { getItem, setItem, removeItem };
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