import { Suspense, lazy } from 'react';

import { useRoutes } from 'react-router-dom';
import { AuthTabs, ForgotPassword, ResetPassword } from '@pages/auth';
import ProtectedRoute from '@pages/ProtectedRoute';
import Error from '@pages/error/Error';
import StreamsSkeleton from '@pages/social/streams/StreamsSkeleton';
import NotificationSkeleton from '@pages/notifications/NotificationSkeleton';

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
          element:  
            <Suspense fallback={ <StreamsSkeleton/> }>
              <Chat/>
            </Suspense>
        },
        {
          path: 'people',
          element: 
            <Suspense fallback={ <StreamsSkeleton/> }>
              <People/>
            </Suspense>
        },
        {
          path: 'following',
          element: 
            <Suspense fallback={ <StreamsSkeleton/> }>
              <Following/>
            </Suspense>
        },
        {
          path: 'followers',
          element: 
            <Suspense fallback={ <StreamsSkeleton/> }>
              <Followers/>
            </Suspense>
        },
        {
          path: 'photos',
          element: 
            <Suspense fallback={ <StreamsSkeleton/> }>
              <Photos/>
            </Suspense>
        },
        {
          path: 'notifications',
          element: 
            <Suspense fallback={ <NotificationSkeleton /> }>
              <Notifications/>
            </Suspense>
        },
        {
          path: 'profile/:username',
          element: 
            <Suspense fallback={ <StreamsSkeleton/> }>
              <Profile />
            </Suspense>
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
