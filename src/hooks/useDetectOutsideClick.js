import { useEffect, useState } from 'react';

const useDetectOutsideClick = (ref, initialState, optionalRef) => {
  const [isActive, setIsActive] = useState(initialState);

  useEffect(() => {
    const onClick = (event) => {
        if(
          ref.current !== null && 
          optionalRef?.current !== null  && 
          (ref.current.contains(event.target) || optionalRef?.current.contains(event.target))
          ){
          setIsActive(true);
        } else {
          setIsActive(!isActive);
        }
    };

    if(isActive) {
      window.addEventListener('mousedown', onClick);
    }

    return () => {
      window.removeEventListener('mousedown', onClick);
    } 
  }, [isActive, ref, optionalRef]);

  return { isActive, setIsActive };
}

export default useDetectOutsideClick;