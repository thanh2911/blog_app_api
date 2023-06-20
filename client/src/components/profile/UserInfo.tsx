import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootStore, InputChange, IUserInfo, FormSubmit } from '../../utils/TypesScript';
import NotFound from '../global/NotFound';
import { updateUser, resetPassword } from '../../redux/actions/profileAction';

const UserInfo = () => {    
    const initState = {
        name: '', account: '', avatar: '' , password: '', cf_password: ''
    }
    const { auth } = useSelector((state: RootStore) => state);
    const dispatch = useDispatch<any>();

    const [user, setUser] = useState<IUserInfo>(initState);
    const [typePass, setTypePass] = useState(false);
    const [typeCfPass, setTypeCfPass] = useState(false);

    const { name, account, avatar, password, cf_password } = user ;

    const handleChangeInput = (e: InputChange) => {
        const { name, value} = e.target;
        setUser({...user, [name]: value})
    }

    const handleChangeFile = (e: InputChange) => {
        const target = e.target as HTMLInputElement;
        const files = target.files;
        // console.log(files);

        if(files) {
            const file = files[0];
            setUser({...user, avatar: file})
        }
        
    } 

    const handleSubmit = (e: FormSubmit) => {
        e.preventDefault();

        if(name || avatar) {
            dispatch(updateUser(avatar as File, name, auth))
        }

        if(password && auth.access_token){
            dispatch(resetPassword(password, cf_password, auth.access_token))
        }
    }

    if(!auth.user) return <NotFound />
    

  return (
    <form className="profile-info" onSubmit={handleSubmit}>
        <div className="info_avatar">
            <img src={ 
                avatar ? URL.createObjectURL(avatar as Blob | MediaSource):  
                auth.user?.avatar} alt="avatar" 
                style={{height:"200px", width:"200px"}}
            />

            <span>
                <i><b>O</b></i>
                <p>Change</p>
                <input type="file" accept='image/*'
                 name='file' id='file_up'
                 onChange={handleChangeFile}
                 />
            </span>
        </div>

        <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className='form-control' id='name'
            name='name' defaultValue={auth.user?.name}
            onChange={handleChangeInput} 
            />
        </div>

        <div className="form-group">
            <label htmlFor="account">Account</label>
            <input type="text" className='form-control' id='account'
            name='account' defaultValue={auth.user?.account}
            onChange={handleChangeInput} disabled = {true}
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

        <div className="form-group">
            <label htmlFor="password">Confirm Password</label>

            <div className="pass">
                <input type={typeCfPass ? "text" : "password"} 
                className='form-control' 
                id='cf_password'
                name='cf_password' 
                value={cf_password} 
                onChange={handleChangeInput}
                />

                <small onClick={() => setTypeCfPass(!typeCfPass)}>
                    {typeCfPass ? 'Hide' : 'Show'}
                </small>
            </div>
        </div>

        <button type='submit' className='btn-dark'>
            Update
        </button>
    </form>
  )
}

export default UserInfo