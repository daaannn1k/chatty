import { useCallback } from 'react';
import { notification } from 'antd';

const useToastAntd = () => {
  const [api, contextHolder] = notification.useNotification({
    stack: 3,
  });

  const openNotification = useCallback(({ message, description, duration }, type = 'success') => {
    if(type === 'success') { 
      api.success({ message, description, duration });
    } else if( type === 'error') {
      api.error({ message, description, duration });
    } else {
      api.warning({ message, description, duration });
    }
  }, [api])

  return { contextHolder, openNotification };
};

export default useToastAntd;