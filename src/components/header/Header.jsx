import { useEffect, useState, useRef, useCallback } from 'react';
import logo from '@assets/images/logo.svg';
import { FaCaretDown, FaCaretUp, FaRegBell, FaRegEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import '@components/header/Header.scss';
import MessageSidebar from '@components/message-sidebar/MessageSidebar';
import Dropdown from '@components/dropdown/Dropdown';
import Avatar from '@components/avatar/Avatar';
import useDetectOutsideClick from '@hooks/useDetectOutsideClick';
import useLocalStorage from '@hooks/useLocalStorage';
import useSessionStorage from '@hooks/useSessionStorage';
import NotificationPreview from '@components/dialog/NotificationPreview';
import { Utils } from '@services/utils/utils.service';
import { ProfileUtils } from '@services/utils/profile-utils.service';
import { getState } from '@redux/reducers/user/user.reducer';
import { authService } from '@services/api/auth/auth.service';
import HeaderSkeleton from '@components/header/HeaderSkeleton';
import { clearNotification } from '@redux/reducers/notifications/notification.reducer';
import { notificationService } from '@services/api/notifications/notification.service';
import { NotificationUtils } from '@services/utils/notifications-service.utils';
import { socketService } from '@services/socket/socket.service';

const Header = () => {
  const [environment, setEnvironment] = useState('');
  const [settings, setSettings] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [notificationDialogContent, setNotificationDialogContent] = useState({
    post: '',
    imageUrl: '',
    comment: '',
    reaction: '',
    senderName: '',
  });
  const messageRef = useRef(null);
  const letterRef = useRef(null);
  const notificationRef = useRef(null);
  const settingsRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profile = useSelector(state => getState(state).profile);

  const { removeItemLS: removeStorageUsername, setItemLS: setLoggedIn, getItemLS: getUserNameLS } = useLocalStorage();
  const { removeItemST: removeSessionPageReload } = useSessionStorage();
  const {isActive: isMessageActive, setIsActive: setIsMessageActive} = useDetectOutsideClick(messageRef, false, letterRef);
  const {isActive: isNotificationActive, setIsActive: setIsNotificationActive} = useDetectOutsideClick(notificationRef, false);
  const {isActive: isSettingsActive, setIsActive: setIsSettingsActive} = useDetectOutsideClick(settingsRef, false);

  const usernameLS = getUserNameLS('username');
  
  const openChatPage = () => {};

  const onLogout = async () => {
    try {
      Utils.clearStore({ dispatch, removeStorageUsername, removeSessionPageReload, setLoggedIn })
      await authService.signOut();
      navigate('/');
    } catch (error) {
      Utils.dispatchNotification(error.response.data.message, 'error', dispatch);
    }
  };

  const onNavigate = () => {
    ProfileUtils.navigateToProfile({ username: profile?.username, id: profile?._id, uId: profile?.uId}, navigate);
  };

  const getNotifications = useCallback(async () => {
    try {
      const response = await notificationService.getUserNotifications();
      const mappedNotifications = NotificationUtils.mapNotificationDropdownItems(response?.data?.notifications, setNotificationCount);
      setNotifications(mappedNotifications);
      socketService?.socket.emit('setup', { userId: usernameLS})
    } catch (error) {
      Utils.dispatchNotification(error.response?.data ? error.response.data?.messsage : 'Server error! Please try later!', 'error', dispatch);
    }
  }, [dispatch, usernameLS]);

  const onMarkAsRead = async (notification) => {
    console.log(notification)
    try {
      await NotificationUtils.markMessageAsRead(notification._id, notification, setNotificationDialogContent);
    } catch (error) {
      Utils.dispatchNotification(error.response?.data ? error.response.data?.messsage : 'Server error! Please try later!', 'error', dispatch);
    }
  };

  const onDeleteNotification = async  (notificationId) => {
    try {
      const response = await notificationService.deleteNotification(notificationId);
      Utils.dispatchNotification(response?.data?.message, 'success', dispatch);
    } catch (error) {
      Utils.dispatchNotification(error.response?.data ? error.response.data?.messsage : 'Server error! Please try later!', 'error', dispatch);
    }
  }

  useEffect(() => {
    dispatch(clearNotification());
  }, [dispatch])
  
  useEffect(() => {
    setEnvironment(Utils.appEnvironment());
  }, []);

  useEffect(() => {
    Utils.mapSettingsDropdownItems(setSettings);
    getNotifications();
  }, [getNotifications]);

  useEffect(() => {
    NotificationUtils.socketIONotification(profile, notifications, setNotifications, 'header', setNotificationCount)
  }, [notifications, profile]);

  return (
    <>
      {!profile ? (<HeaderSkeleton/>) : (
        <div className="header-nav-wrapper" data-testid="header-wrapper">
        {
        isMessageActive && (
          <div ref={messageRef}>
            <MessageSidebar 
              profile={profile}
              messageCount={0}
              messageNotifications={[]}
              openChatPage={openChatPage}
            />
          </div>
        )
        }
        {
          notificationDialogContent?.senderName && (
            <NotificationPreview 
              title='Your post'
              post={notificationDialogContent.post}
              imgUrl={notificationDialogContent.imageUrl}
              comment={notificationDialogContent.comment}
              reaction={notificationDialogContent.reaction}
              senderName={notificationDialogContent.senderName}
              secondButtonText='Close'
              secondBtnHandler={() => {
                setNotificationDialogContent({
                  post: '',
                  imageUrl: '',
                  comment: '',
                  reaction: '',
                  senderName: '',
                })
              }}
            />
           )
        }
        <div className="header-navbar">
          <div className="header-image" data-testid="header-image" onClick={() => navigate('/app/social/streams')}>
            <img src={logo} className="img-fluid" alt="" />
            <div className="app-name">
            Chatty
            {environment && (
              <span className="environment">
              {environment}
            </span>
            )}
          </div>
        </div>
        <div className="header-menu-toggle">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
          <ul className="header-nav">
            <li className="header-nav-item active-item" onClick={() => setIsNotificationActive(true)}>
              <span className="header-list-name">
                <FaRegBell className="header-list-icon" />
                {notificationCount > 0 && (<span className="bg-danger-dots dots" data-testid="notification-dots"></span>)}
              </span>
              {isNotificationActive && (
               <ul className="dropdown-ul" ref={notificationRef}>
                  <li className="dropdown-li">
                    <Dropdown 
                      height={300}
                      style={{
                        right: '250px',
                        top: '20px'
                      }}
                      data={notifications}
                      notificationCount={notificationCount}
                      title='Notifications'
                      onMarkAsRead={onMarkAsRead}
                      onDeleteNotification={onDeleteNotification}
                    />
                  </li>
                </ul>
              )}
              &nbsp;
            </li>
            <li className="header-nav-item active-item" ref={letterRef} onClick={() => {
              setIsMessageActive(true);
              }}>
            <span className="header-list-name">
              <FaRegEnvelope className="header-list-icon" />
              <span className="bg-danger-dots dots" data-testid="messages-dots"></span>
            </span>
            &nbsp;
          </li>
          <li className="header-nav-item" onClick={() => setIsSettingsActive(!isSettingsActive)}>
            <span className="header-list-name profile-image">
              <Avatar 
                name={profile?.username}
                bgColor={profile?.avatarColor}
                textColor='#ffffff'
                size={40}
                avatarSrc={profile?.profilePicture}
              />
            </span>
            <span className="header-list-name profile-name">
              {profile?.username}
              {!isSettingsActive ? (
                <FaCaretDown className="header-list-icon caret" />
              ) : (
                <FaCaretUp className="header-list-icon caret" />
              )}
            </span>
            {isSettingsActive && (
              <ul className="dropdown-ul" ref={settingsRef}>
                <li className="dropdown-li">
                 <Dropdown 
                    height={300}
                    style={{
                      right: '150px',
                      top: '40px'
                    }}
                    data={settings}
                    notificationCount={0}
                    title='Settings'
                    onLogout={onLogout}
                    onNavigate={onNavigate}
                 />
                </li>
              </ul>
            )}
          </li>
          </ul>
        </div>
      </div>
      )}
    </>
  );
};
export default Header;