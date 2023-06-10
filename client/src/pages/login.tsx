import React, { useState,useEffect }from 'react';
import LoginPass from '../components/auth/LoginPass';
import LoginSMS from '../components/auth/LoginSMS';
import { Link, useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootStore } from '../utils/TypesScript';

const Login = () => {

  const [sms, setSms] = useState(false);
  const navigate = useNavigate();
  const { auth } =  useSelector((state: RootStore) => state);

  useEffect(() => {
    if(auth.access_token) navigate('/');
  },[auth.access_token,navigate])
  

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