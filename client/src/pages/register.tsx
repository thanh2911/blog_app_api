import React, { useState }from 'react';
import RegisterForm from '../components/auth/RegisterForm';
import { Link } from 'react-router-dom';

const Register = () => {

  return (
    <div className="auth_page">
      <div className="auth_box" style={{margin: "0 200px"}}>
        <h3>Register</h3>

        <RegisterForm />

        <p>
          Already have an account ?

          <Link to={'/login'}>
            login Now
          </Link>
        </p>
      
      </div>
    </div>
  )
}

export default Register