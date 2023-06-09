import { IUserLogin,IUserRegister } from "../../utils/TypesScript";
import { AUTH, IAuthType } from '../types/authType'
import { ALERT, IAlertType } from "../types/alertType";
import { postAPI } from "../../utils/FetchData";
import { Dispatch }from 'redux'
import { validRegister } from "../../utils/Valid";

export const login = (userLogin: IUserLogin) => 
async (dispatch: Dispatch <IAuthType | IAlertType>) => {
    try {
        dispatch({type: ALERT, payload: {loading: true}})
        const res = await postAPI('login', userLogin);
            // console.log(res.data);

        dispatch({
            type: AUTH,
            payload: {
                token: res.data.access_token,
                user: res.data.user,
                msg: res.data.msg
            }
        })
        
        dispatch({type: ALERT, payload: {success: 'Login success !'}})

    } catch (err:any) {
        dispatch({type: ALERT, payload: {errors: err.response.data.msg}})
        console.log(err.response.data.msg);
        
    }
    
}

export const register = (userRegister: IUserRegister) => 
async (dispatch: Dispatch <IAuthType | IAlertType>) => {
    
    try {

        const check = validRegister(userRegister);
        if(check.errLength > 0) {
            dispatch({
                type: ALERT, 
                payload: {errors: check.errMsg}})
        }
        else {
            dispatch({type: ALERT, payload: {loading: true}})
            const res = await postAPI('register', userRegister);
            // console.log(res.data);

            dispatch({type: ALERT, payload: {success: res.data.msg}})
        }
       
    } catch (err:any) {
        dispatch({type: ALERT, payload: {errors: err.response.data.msg}})
        console.log(err.response.data.msg);
        
    }
    
}