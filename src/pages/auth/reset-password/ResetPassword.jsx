import React from 'react';

import './ResetPassword.scss';
import backgroundImage from '../../../assets/images/background.jpg';
import Button from '../../../components/button/Button'
import Input from '../../../components/input/Input'
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
  return (
    <div className="container-wrapper" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="container-wrapper-auth">
        <div className="tabs reset-password-tabs">
          <div className="tabs-auth">
            <ul className="tab-group">
              <li className="tab">
                <div className="login reset-password">Reset Password</div>
              </li>
            </ul>
              <div className="tab-item">
                <div className="auth-inner">
                  <div className="alerts alert-error" role="alert">
                    Error message
                  </div>
                  <form className="reset-password-form">
                    <div className="form-input-container">
                      <Input 
									      id='password'
									      name='password'
									      type='password'
									      value='password'
                        labelText='password'
									      placeholder='Enter your password'
									      handleChange={() => {}}
								      />
                      <Input 
                        id="cpassword" 
                        name="cpassword" 
                        type="password" 
                        value={"confirmPassword"} 
                        labelText="Confirm Password" 
                        placeholder="Confirm Password" 
                        handleChange={()=> {}}
                      />
                    </div>
                    <Button label={'RESET PASSWORD'} className='button auth-button' disabled={true}/>
                    <Link to={'/'}>
                      <span className="login">
                        <FaArrowLeft className="arrow-left"/> Back to Login
                      </span>
                    </Link>
                  </form>
                </div>
              </div>
            </div>
          </div>
       </div>
    </div>
  )
}

export default ResetPassword