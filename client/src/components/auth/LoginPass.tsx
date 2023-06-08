import React, { useState } from 'react';
import { InputChange,FormSubmit } from '../../utils/TypesScript'; 
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions/authAction';

const LoginPass = () => {

    const initialState = { account: '', password: ''};
    const [userLogin,setUserLogin] = useState(initialState);
    const {account, password} = userLogin;

    const [typePass, setTypePass] = useState(false);
    const dispatch = useDispatch<any>();

    const handleChangeInput = (e: InputChange) => {
        const {value, name} = e.target;
        setUserLogin({...userLogin, [name]: value}) ;
    }

    const handleSubmit = (e: FormSubmit) => {
        e.preventDefault();
        dispatch(login(userLogin))
    }

    // console.log(userLogin);
    

  return (
    <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="account">Email / Phone Number</label>
            <input type="text" className='form-control' id='account'
            name='account' value={account} onChange={handleChangeInput}
            />
        </div>

        <div className="form-group">
            <label htmlFor="password">Password</label>

            <div className="pass">
                <input type={typePass ? "text" : "password"} 
                className='form-control' 
                id='password'
                name='password' 
                value={password} 
                onChange={handleChangeInput}
                />

                <small onClick={() => setTypePass(!typePass)}>
                    {typePass ? 'Hide' : 'Show'}
                </small>
            </div>
        </div>

        <button type='submit' disabled={(account && password) ? false : true}>
            Login
        </button>
    </form>
  )
}

export default LoginPass