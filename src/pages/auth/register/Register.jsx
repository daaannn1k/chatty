import React from 'react'

import './Register.scss';
import Input from '../../../components/input/Input';
import Button from '../../../components/button/Button';

const Register = () => {
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
            <Input 
              id='email'
              name='email'
              type='email'
              value='this is text'
              labelText='Email'
              placeholder='Enter email'
              handleChange={() => {}}
            />
          </div>
            <Button label={'SIGNUP'} className='button auth-button' disabled={true}/>
        </form>
    </div>
  );
};

export default Register;