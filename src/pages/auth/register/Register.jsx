import React, { useEffect, useState } from 'react'

import './Register.scss';
import Input from '../../../components/input/Input';
import Button from '../../../components/button/Button';
import { Utils } from '../../../services/api/utils/utils.service';
import { authService } from '../../../services/api/auth/auth.service';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [hasError, setHasError] = useState(false);
  const [user, setUser] = useState('');

  const registerUser = async (event) => {
    setLoading(true);
    event.preventDefault();

    try {
      const avatarColor = Utils.avatarColor();
      const avatarImage = Utils.generateAvatar(username.charAt(0).toUpperCase(), avatarColor);
      const result = await authService.signUp({ username, password, email, avatarColor, avatarImage });
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
      console.log('Navigate to streams page');
      setLoading(false);
    } 
  }, [loading, user])

  return (
      <div className="auth-inner">
        {hasError && errorMessage &&
          <div className={`alerts ${alertType}`} role="alert">
            {errorMessage}
          </div>
        }
        <form className="auth-form" onSubmit={registerUser}>
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
            <Input 
              id='email'
              name='email'
              type='email'
              value={email}
              labelText='Email'
              placeholder='Enter email'
              handleChange={(event) => {setEmail(event.target.value)}}
              style={{ border: `${hasError ? '1px solid #fa9b8a' : ''}` }}
            />
          </div>
            <Button label={loading ? 'SIGNUP IN PROGRESS...' : 'SIGNUP'} className='button auth-button' disabled={!username || !password || !email}/>
        </form>
    </div>
  );
};

export default Register;