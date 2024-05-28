import React, { useState, useEffect, useCallback } from 'react';
import { FaCircle, FaRegCircle, FaRegTrashAlt } from 'react-icons/fa';

import '@pages/notifications/Notifications.scss';
import Avatar from '@components/avatar/Avatar';
import { notificationService } from '@services/api/notifications/notification.service';
import { useDispatch, useSelector } from 'react-redux';
import { Utils } from '@services/utils/utils.service';
import { NotificationUtils } from '@services/utils/notifications-service.utils';
import { getState } from '@redux/reducers/user/user.reducer';
import NotificationPreview from '@components/dialog/NotificationPreview';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [notificationDialogContent, setNotificationDialogContent] = useState({
    post: '',
    imageUrl: '',
    comment: '',
    reaction: '',
    senderName: '',
  });
  const [ loading, setLoading ] = useState(true);
  const dispatch = useDispatch();

  const { profile } = useSelector(state => getState(state));

  const getNotifications = useCallback(async () => {
    try {
      const response = await notificationService.getUserNotifications();
      setNotifications(response.data.notifications);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Utils.dispatchNotification(error.response?.data ? error.response.data?.messsage : 'Server error! Please try later!', 'error', dispatch);
    }
  }, [dispatch]);

  const markAsRead = async (notification) => {
    try {
      await NotificationUtils.markMessageAsRead(notification._id, notification, setNotificationDialogContent);
    } catch (error) {
      Utils.dispatchNotification(error.response?.data ? error.response.data?.messsage : 'Server error! Please try later!', 'error', dispatch);
    }
  };

  const handleDeleteNotification = async (event, notification) => {
    event.stopPropagation();
    try {
      const response = await notificationService.deleteNotification(notification?._id);
      Utils.dispatchNotification(response?.data?.message, 'success', dispatch);
    } catch (error) {
      console.log(error);
      Utils.dispatchNotification(error.response?.data ? error.response.data?.messsage : 'Server error! Please try later!', 'error', dispatch);
    }
  }

  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  useEffect(() => {
    NotificationUtils.socketIONotification(profile, notifications, setNotifications, 'notificationPage')
  }, [notifications, profile]);

  return (
    <>
     {notificationDialogContent?.senderName && (
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
     )}
      <div className="notifications-container">
        <div className="notifications">Notifications</div>
        {notifications.length > 0 && (
          <div className="notifications-box">
            {notifications.map((notification, index) => (
              <div className="notification-box" data-testid="notification-box" key={index} onClick={() => markAsRead(notification)}>
                <div className="notification-box-sub-card">
                  <div className="notification-box-sub-card-media">
                    <div className="notification-box-sub-card-media-image-icon">
                      <Avatar 
                        name={notification?.userFrom?.username} 
                        bgColor={notification?.userFrom?.avatarColor} 
                        textColor="#ffffff" 
                        size={40} 
                        avatarSrc={notification?.userFrom?.profilePicture}/>
                    </div>
                    <div className="notification-box-sub-card-media-body">
                      <h6 className="title">
                        {notification?.message}
                        <small data-testid="subtitle" className="subtitle" onClick={(event) => handleDeleteNotification(event, notification)}>
                          <FaRegTrashAlt className="trash"/>
                        </small>
                      </h6>
                      <div className="subtitle-body">
                        <small className="subtitle">
                          {!notification?.read ?
                            <FaCircle className="icon"/> :
                            <FaRegCircle className="icon"/>
                          }
                        </small>
                        <p className="subtext">1 hr ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {loading && !notifications.length && <div className="notifications-box"></div>}
        {!loading && !notifications.length && (
          <h3 className="empty-page" data-testid="empty-page">
            You have no notification
          </h3>
        )}
      </div>
    </>
  );
};

export default Notifications;