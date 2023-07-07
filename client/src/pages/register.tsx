import React, { useState }from 'react';
import { useLocation } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';
import { Link } from 'react-router-dom';

const Register = () => {

  const location = useLocation()
  return (
    <div className="auth_page">
      <div className="auth_box" style={{margin: "0 200px"}}>
        <h3>Register</h3>

        <RegisterForm />

        <p>
          Already have an account ?

          <Link to={`/login${location.search}`}>
            login Now
          </Link>
        </p>
      
      </div>
    </div>
  )
}

export default Register