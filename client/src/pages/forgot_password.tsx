import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { forgotPassword } from '../redux/actions/authAction';
import { FormSubmit } from '../utils/TypesScript';

const ForgotPassword = () => {

    const [account,setAccount] = useState('')

    const dispatch = useDispatch<any>();

    const handleSubmit = (e: FormSubmit) => {
        e.preventDefault()
        dispatch(forgotPassword(account))
    }

  return (
    <div >
        <h2>Forgot Password</h2>

        <form className="form-group" onSubmit={handleSubmit}>
            <label htmlFor="account">Email</label>

            <div>
                <input type="text"  className='form-control' id='account'
                name='account' onChange={(e) => setAccount(e.target.value)}/>

                <button className='btn btn-primary' type='submit' >
                    <i>Send</i>
                </button>
            </div>
        </form>
    </div>
  )
}

export default ForgotPassword