import React from 'react'

import './ForgotPassword.scss';
import backgroundImage from '../../../assets/images/background.jpg';
import Button from '../../../components/button/Button'
import Input from '../../../components/input/Input'
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
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
						    <div className="alerts alert-error" role="alert">
						      Error message
						    </div>
						    <form className="forgot-password-form">
							    <div className="form-input-container">
								    <Input 
									    id='email'
									    name='email'
									    type='email'
									    value='email'
									    labelText='Email'
									    placeholder='Enter your email'
									    handleChange={() => {}}
								    />
						      </div>
							    <Button label={'FORGOT PASSWORD'} className='button auth-button' disabled={true}/>
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