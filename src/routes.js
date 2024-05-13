import { useRoutes } from 'react-router-dom';
import { AuthTabs, ForgotPassword, ResetPassword } from '@pages/auth';
import Streams from '@pages/social/streams/Streams';

const AppRouter = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <AuthTabs/>,
    },
    {
      path: '/forgot-password',
      element: <ForgotPassword />
    },
    {
      path: '/reset-password',
      element: <ResetPassword />
    },
    {
      path: '/app/social/streams',
      element: <Streams />
    }
  ]);

  return routes;
};

export default AppRouter;
