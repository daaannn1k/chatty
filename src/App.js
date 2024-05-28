import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

import '@root/App.scss';
import AppRouter from '@root/routes';
import Toast from '@components/toast/Toast';
import { socketService } from '@services/socket/socket.service';
import { notificationsState } from '@redux/reducers/notifications/notification.reducer';

const App = () => {
  const notifications = useSelector(state => notificationsState(state)).list;

  useEffect(() => {
    socketService.setSocketConnection();
  }, []);

  return (
    <>
      {notifications && notifications.length > 0 && (
        <Toast position='top-right' toastList={notifications} autoDelete={false} />
      )}
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </>
  );
};

export default App;
