import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

import '@pages/auth/forgot-password/ForgotPassword.scss';
import backgroundImage from '@assets/images/background.jpg';
import Button from '@components/button/Button';
import Input from '@components/input/Input'
import { authService } from '@services/api/auth/auth.service';

const ForgotPassword = () => {
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);
	const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [alertType, setAlertType] = useState('');
	const [response, setResponse] = useState('');

	const handleForgotPassword = async (event) => {
		setLoading(true);
		event.preventDefault();

		try {
			const result = await authService.forgotPassword(email);
			setEmail('');
			setLoading(false);
			setHasError(false);
			setErrorMessage('');
			setResponse(result?.data?.message);
			setAlertType('alert-success')
		} catch (error) {
			setLoading(false);
      setHasError(true);
			setResponse('');
      setAlertType('alert-error');
      setErrorMessage(error?.response?.data.messsage);
		}
	}

  return (
    <div className="container-wrapper" style={{ backgroundImage: `url("${backgroundImage}")`}}>
	    <div className="container-wrapper-auth">
		    <div className="tabs forgot-password-tabs-page">
			    <div className="tabs-auth">
				    <ul className="tab-group">
					    <li className="tab">
						    <div className="login forgot-password">Forgot Password</div>
					    </li>
				    </ul>
				    <div className="tab-item">
					    <div className="auth-inner">
								{(hasError && errorMessage) ?
          				(<div className={`alerts ${alertType}`} role="alert">
            				{errorMessage}
          				</div>) : 
									(<div className={`alerts ${alertType}`} role="alert">
										{response}
									</div>)
       					}
						    <form className="forgot-password-form" onSubmit={handleForgotPassword}>
							    <div className="form-input-container">
								    <Input 
									    id='email'
									    name='email'
									    type='email'
									    value={email}
									    labelText='Email'
									    placeholder='Enter your email'
									    handleChange={(event) => {setEmail(event.target.value)}}
											style={{ border: `${hasError ? '1px solid #fa9b8a' : ''}` }}
								    />
						      </div>
									<Button 
              			label={loading ? 'FORGOT PASSWORD IN PROGRESS...' : 'FORGOT PASSWORD'} 
              			className='button auth-button' 
              			disabled={!email}
            			/>
							    <Link to={'/'}>
								    <span className="forgot-password-redirect">
								    <FaArrowLeft className='arrow-left'/> Back to SignIn
								    </span>
							    </Link>
					      </form>
			        </div>
				    </div>
			    </div>
		    </div>
	    </div>
    </div>
  );
};

export default ForgotPassword;