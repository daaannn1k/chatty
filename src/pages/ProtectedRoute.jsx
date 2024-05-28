import React, { useCallback, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { authService } from '@services/api/auth/auth.service';
import { addUser, getState } from '@redux/reducers/user/user.reducer';
import { Utils } from '@services/utils/utils.service';
import useLocalStorage from '@hooks/useLocalStorage';
import useSessionStorage from '@hooks/useSessionStorage';

const ProtectedRoute = ({ element }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { removeItemLS, setItemLS, getItemLS } = useLocalStorage();
  const { removeItemST, getItemST } = useSessionStorage();
  
  const { profile, token } = useSelector(state => getState(state));
  const keepLoggedIn = getItemLS('keepLoggedIn');
  const pageReload = getItemST('pageReload');

  const getCurrentUser = useCallback(async () => {
      try {
          const response = await authService.checkCurrentUser();

          // dispatch converstaion list
          dispatch(addUser({ token: response.data.token, profile: response.data.user }));
      } catch (error) {
        setTimeout(async () => {
          Utils.clearStore({ dispatch, removeStorageUsername: removeItemLS, removeSessionPageReload: removeItemST, setLoggedIn: setItemLS });
          await authService.signOut();
        }, 1000);
        navigate('/');
      }
  }, [dispatch, removeItemLS, removeItemST, setItemLS, navigate ]);

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser])
 
  if(keepLoggedIn || (!!profile && !!token) || pageReload) {
    return <>{element}</>
  } else {
    return <><Navigate to={'/'}/></>
  }
};

ProtectedRoute.propTypes = {
  element: PropTypes.node.isRequired
}

export default ProtectedRoute;