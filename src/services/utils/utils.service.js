import { floor, random } from 'lodash';
import { avatarColors } from '@services/utils/static-data';
import { addUser, clearUser } from '@redux/reducers/user/user.reducer';
import { addNotification, clearNotification } from '@redux/reducers/notifications/notification.reducer';
import { clearSuggestions } from '@redux/reducers/suggestions/suggestions.reducer';

export class Utils {
  static avatarColor() {
    return avatarColors[floor(random(0.9) * avatarColors.length)]
  }

  static generateAvatar(text, backgroundColor, forgroundColor = 'white') {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = 200;
    canvas.height = 200;
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.font = 'normal 80px sans-serif';
    context.fillStyle = forgroundColor;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, canvas.width / 2, canvas.height / 2);
    return canvas.toDataURL('image/png');
  }

  static dispatchUser(result, pageReload, dispatch, setUser) {
    pageReload('pageReload', true);
    dispatch(addUser({ token: result.data.token, profile: result.data.user }));
    setUser(result.data.user);
  }

  static clearStore({ dispatch, removeStorageUsername, removeSessionPageReload, setLoggedIn }) {
    dispatch(clearSuggestions());
    dispatch(clearUser());
    dispatch(clearNotification());
    removeStorageUsername('username');
    removeSessionPageReload('pageReload');
    setLoggedIn('keepLoggedIn', false);
  }

  static dispatchNotification(message, type, dispatch) {
    dispatch(addNotification({ message, type }));
  }

  static dispatchClearNotification(dispatch) {
    dispatch(clearNotification());
  }

  static appEnvironment() {
    const env = process.env.REACT_APP_ENVIRONMENT ;
    if(env === 'development') {
      return 'DEV';
    } else if (env=== 'staging') {
      return 'STG';
    } else {
      return '';
    };
  };

  static generateString(stringLength) {
    let randomString = '';
    const symbols = ['a', 'b', 'c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  
    for(let i = 0; i < stringLength; i++) {
      const randomIdx = Math.floor(Math.random() * symbols.length);
      randomString += symbols[randomIdx];
    }
  
    return randomString;
  }

  static mapSettingsDropdownItems(setSettings) {
    const items = [];
    const item = {
      topText: 'My Profile',
      subText: 'View personal profile'
    };
    items.push(item);
    setSettings(items);
    return items;
  }

  static appImageUrl(version, id) {
    if(typeof version === 'string' && typeof id === 'string') {
      version = version.replace(/['"]+/g, '')
      id = id.replace(/['"]+/g, '')
    }

    return `https://res.cloudinary.com/diwokovnd/image/upload/v${version}/${id}`;
  }
};