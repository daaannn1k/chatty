import React, { useEffect, useState } from 'react';

import '@pages/auth/auth-tabs/AuthTabs.scss';
import backgroundImage from '@assets/images/background.jpg';
import { Login, Register } from '@pages/auth/index';
import useLocalStorage from '@hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';
import { Utils } from '@services/utils/utils.service';


const AuthTabs = () => {
  const [type, setType] = useState('Sign In');
  const [environment, setEnvironment] = useState('');
  const { getItemLS } = useLocalStorage();
  const keepLoggedIn = getItemLS('keepLoggedIn');
  const navigate = useNavigate();
  
  useEffect(() => {
    const env = Utils.appEnvironment();
    setEnvironment(env);

    if(keepLoggedIn) {
      navigate('/app/social/streams');
    }
  }, [keepLoggedIn, navigate]);

  return (
    <>
      <div className="container-wrapper" style={{ backgroundImage: `url("${backgroundImage}")` }}>
        <div className="environment">{environment}</div>
        <div className="container-wrapper-auth">
          <div className="tabs">
            <div className="tabs-auth">
              <ul className="tab-group">
                <li className={type === 'Sign In' ? "tab active" : 'tab'} onClick={() => setType('Sign In')}>
                  <button className="login">Sign In</button>
                </li>
                <li className={type === 'Sign Up' ? "tab active" : 'tab'}>
                  <button className="signup" onClick={() => setType('Sign Up')}>Sign Up</button>
                </li>
              </ul>
              {type === 'Sign In' && <div className="tab-item"><Login /></div>}
              {type === 'Sign Up' && <div className="tab-item"><Register/></div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthTabs;
