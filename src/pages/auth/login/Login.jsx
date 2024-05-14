import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";

import '@pages/auth/login/Login.scss';
import Button from '@components/button/Button';
import Input from '@components/input/Input'
import { authService } from '@services/api/auth/auth.service';
import useLocalStorage from '@hooks/useLocalStorage';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [user, setUser] = useState('');

  const { setItem } = useLocalStorage();
  const navigate = useNavigate();

  const loginUser = async (event) => {
    setLoading(true);
    event.preventDefault();

    try {
      const result = await authService.signIn({username, password});
      setItem('username', result?.data?.user?.username);
      setItem('keepLoggedIn', keepLoggedIn);
      setHasError(false);
      setAlertType('alert-success');
      setUser(result.data.user);
    } catch (error) {
      setLoading(false);
      setHasError(true);
      setAlertType('alert-error');
      setErrorMessage(error?.response?.data.messsage);
    }
  }

  useEffect(() => {
    if(loading && !user) return;
    if(user) {
      setLoading(false);
      navigate('/app/social/streams');
    } 
  }, [loading, user, navigate])

  return (
      <div className="auth-inner">
        {hasError && errorMessage &&
          <div className={`alerts ${alertType}`} role="alert">
            {errorMessage}
          </div>
        }
        <form className="auth-form" onSubmit={loginUser}>
          <div className="form-input-container">
            <Input 
              id='username'
              name='username'
              type='text'
              value={username}
              labelText='Username'
              placeholder='Enter username'
              handleChange={(event) => {setUsername(event.target.value)}}
              style={{ border: `${hasError ? '1px solid #fa9b8a' : ''}` }}
            />
            <Input 
              id='password'
              name='password'
              type='password'
              value={password}
              labelText='Password'
              placeholder='Enter password'
              handleChange={(event) => {setPassword(event.target.value)}}
              style={{ border: `${hasError ? '1px solid #fa9b8a' : ''}` }}
            />
            <label className="checkmark-container" htmlFor="checkbox">
              <Input 
                id='checkbox'
                name='checkbox'
                type='checkbox'
                value={keepLoggedIn}
                handleChange={() => {setKeepLoggedIn(!keepLoggedIn)}}
              />
                Keep me signed in
            </label>
          </div>
            <Button 
              label={loading ? 'SIGNIN IN PROGRESS...' : 'SIGNIN'} 
              className='button auth-button' 
              disabled={!username || !password}
            />
            <Link to={'/forgot-password'}>
              <span className="forgot-password">
                Forgot password? <FaArrowRight className='arrow-right'/>
              </span>
          </Link>
        </form>
    </div>
  );
};

export default Login;