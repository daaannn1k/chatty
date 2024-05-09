import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';

import './Login.scss';
import Input from '../../../components/input/Input';
import Button from '../../../components/button/Button';

const Login = () => {
  return (
      <div className="auth-inner">
        <div className="alerts alert-error" role="alert">
          Error message
         </div>
        <form className="auth-form">
          <div className="form-input-container">
            <Input 
              id='username'
              name='username'
              type='text'
              value='this is text'
              labelText='Username'
              placeholder='Enter username'
              handleChange={() => {}}
            />
            <Input 
              id='password'
              name='password'
              type='password'
              value='this is text'
              labelText='Password'
              placeholder='Enter password'
              handleChange={() => {}}
            />
            <label className="checkmark-container" htmlFor="checkbox">
              <Input 
                id='checkbox'
                name='checkbox'
                type='checkbox'
                value={false}
                handleChange={() => {}}
              />
                Keep me signed in
            </label>
          </div>
            <Button label={'SIGNIN'} className='button auth-button' disabled={true}/>
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