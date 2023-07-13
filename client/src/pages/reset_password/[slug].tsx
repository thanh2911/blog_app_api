import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { FormSubmit, IParams } from '../../utils/TypesScript'
import { useDispatch } from 'react-redux'
import { resetPassword } from '../../redux/actions/profileAction'

const ResetPassword = () => {

    const params : IParams = useParams()
    const token = params.slug;
    const dispatch = useDispatch<any>();

    const [password,setPassword] = useState('');
    const [cf_password, setCfPassword] = useState('');
    const [typePass, setTypePass] = useState(false);
    const [typeCfPass, setTypeCfPass] = useState(false);


    const handleSubmit = (e: FormSubmit) => {
        e.preventDefault();

        dispatch(resetPassword(password,cf_password,token as string))
    }

  return (
    <div className="auth_page">
        <form onSubmit={handleSubmit}>
            <h3> Reset Password</h3>
            <div className="form-group">
                <label htmlFor="password">Password</label>

                <div className="pass">
                    <input type={typePass ? "text" : "password"} 
                    className='form-control' 
                    id='password'
                    name='password' 
                    value={password} 
                    onChange={e => setPassword(e.target.value)}
                    />

                    <small onClick={() => setTypePass(!typePass)}>
                        {typePass ? 'Hide' : 'Show'}
                    </small>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="password">Confirm Password</label>

                <div className="pass">
                    <input type={typeCfPass ? "text" : "password"} 
                    className='form-control' 
                    id='cf_password'
                    name='cf_password' 
                    value={cf_password} 
                    onChange={e => setCfPassword(e.target.value)}
                    placeholder='Your confirm password'
                    />

                    <small onClick={() => setTypeCfPass(!typeCfPass)}>
                        {typeCfPass ? 'Hide' : 'Show'}
                    </small>
                </div>
            </div>

            <button type='submit' className='btn btn-primary'>
                Reset
            </button>
        </form>
    </div>
  )
}

export default ResetPassword