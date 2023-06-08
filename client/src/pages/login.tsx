import React, { useState }from 'react';
import LoginPass from '../components/auth/LoginPass';
import LoginSMS from '../components/auth/LoginSMS';
import { Link } from 'react-router-dom';

const Login = () => {

  const [sms, setSms] = useState(false);

  return (
    <div className="auth_page">
      <div className="auth_box" style={{margin: "0 200px"}}>
        <h3>Login</h3>
        {
          sms ? <LoginSMS /> : <LoginPass />
        }

        <small>
          <span>
            <Link to={'forgot_password'} >
              Forgot Password
            </Link>
          </span>

          <span onClick={() => setSms(!sms)}>
            {sms ? "Sign in with password" : "Sign in with sms"} 
          </span>
        </small>

        <p>
          You don't have an account ?

          <Link to={'/register'}>
            Register Now
          </Link>
        </p>
      
      </div>
    </div>
  )
}

export default Login