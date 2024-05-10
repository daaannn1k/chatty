import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import './ResetPassword.scss';
import backgroundImage from '../../../assets/images/background.jpg';
import Button from '../../../components/button/Button'
import Input from '../../../components/input/Input'
import { FaArrowLeft } from 'react-icons/fa';
import { authService } from '../../../services/api/auth/auth.service';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [searchParams] = useSearchParams();
 
	const handleResetPassword = async (event) => {
		setLoading(true);
		event.preventDefault();

		try {
      const body = { password, confirmPassword };
			const result = await authService.resetPassword(body, searchParams.get('token'));
			setPassword('');
      setConfirmPassword('');
			setLoading(false);
			setResponseMessage(result?.data?.message);
			setAlertType('alert-success')
		} catch (error) {
			setLoading(false);
      setResponseMessage(error?.data?.message);
      setAlertType('alert-error');
      setResponseMessage(error?.response?.data.messsage);
		}
	}

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
                  {responseMessage && (
                    <div className={`alerts ${alertType}`} role="alert">
                      {responseMessage}
                  </div>
                  )}
                  <form className="reset-password-form" onSubmit={handleResetPassword}>
                    <div className="form-input-container">
                      <Input 
									      id='password'
									      name='password'
									      type='password'
									      value={password}
                        labelText='password'
									      placeholder='Enter your password'
									      handleChange={(event) => {setPassword(event.target.value)}}
								      />
                      <Input 
                        id="cpassword" 
                        name="cpassword" 
                        type="password" 
                        value={confirmPassword} 
                        labelText="Confirm Password" 
                        placeholder="Confirm Password" 
                        handleChange={(event)=> {setConfirmPassword(event.target.value)}}
                      />
                    </div>
                    <Button 
              			  label={loading ? 'RESET PASSWORD IN PROGRESS...' : 'RESET PASSWORD'} 
              			  className='button auth-button' 
              			  disabled={!password || !confirmPassword}
            			  />
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