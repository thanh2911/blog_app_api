import React, { useState } from 'react';
import { InputChange,FormSubmit } from '../../utils/TypesScript'; 
import { useDispatch } from 'react-redux';
import { register } from '../../redux/actions/authAction';

const RegisterForm = () => {

    const initialState = { name:'', account: '', password: '',cf_password: ''};
    const [userRegister,setUserRegister] = useState(initialState);
    const {name,account, password,cf_password} = userRegister;

    const [typePass, setTypePass] = useState(false);
    const [typeCfPass, setTypeCfPass] = useState(false);

    const dispatch = useDispatch<any>();

    const handleChangeInput = (e: InputChange) => {
        const {value, name} = e.target;
        setUserRegister({...userRegister, [name]: value}) ;
    }

    const handleSubmit = (e: FormSubmit) => {
        e.preventDefault();
        dispatch(register(userRegister))
    }

    // console.log(userRegister);
    

  return (
    <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className='form-control' id='name'
            name='name' value={name} onChange={handleChangeInput}
            placeholder='Your name is up to 20 chars'
            />
        </div>
        <div className="form-group">
            <label htmlFor="account">Email / Phone Number</label>
            <input type="text" className='form-control' id='account'
            name='account' value={account} onChange={handleChangeInput}
            placeholder='Example@gmail.com / +840912980444'   
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
                placeholder='Password must be at least 6 chars '
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
                onChange={handleChangeInput}
                placeholder='Your confirm password'
                />

                <small onClick={() => setTypeCfPass(!typeCfPass)}>
                    {typeCfPass ? 'Hide' : 'Show'}
                </small>
            </div>
        </div>

        <button type='submit'>
            Register
        </button>
    </form>
  )
}

export default RegisterForm