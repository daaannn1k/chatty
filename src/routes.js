import { Suspense, lazy } from 'react';

import { useRoutes } from 'react-router-dom';
import { AuthTabs, ForgotPassword, ResetPassword } from '@pages/auth';
import ProtectedRoute from '@pages/ProtectedRoute';
import Error from '@pages/error/Error';
import StreamsSkeleton from '@pages/social/streams/StreamsSkeleton';

const Social = lazy(() => import('@pages/social/Social'));
const Chat = lazy(() => import('@pages/chat/Chat'));
const Followers = lazy(() => import('@pages/followers/Followers'));
const Following = lazy(() => import('@pages/following/Following'));
const Notifications = lazy(() => import('@pages/notifications/Notifications'));
const Profile = lazy(() => import('@pages/profile/Profile'));
const Photos = lazy(() => import('@pages/photos/Photos'));
const People = lazy(() => import('@pages/people/People'));
const Streams = lazy(() => import('@pages/social/streams/Streams'));

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
      path: '/app/social',
      element: <ProtectedRoute element={<Social />} />,
      children: [
        {
          path: 'streams',
          element: (
            <Suspense fallback={ <StreamsSkeleton/> }>
              <Streams/>
            </Suspense>
          ),
        },
        {
          path: 'chat/messages',
          element: <Chat />
        },
        {
          path: 'people',
          element: <People />
        },
        {
          path: 'following',
          element: <Following />
        },
        {
          path: 'followers',
          element: <Followers />
        },
        {
          path: 'photos',
          element: <Photos />
        },
        {
          path: 'notifications',
          element: <Notifications />
        },
        {
          path: 'profile/:username',
          element: <Profile />
        },
      ]
    },
    {
      path: '*',
      element: <Error />
    }
  ]);

  return routes;
};

export default AppRouter;
