import { IUserLogin,IUserRegister } from "../../utils/TypesScript";
import { AUTH, IAuthType } from '../types/authType'
import { ALERT, IAlertType } from "../types/alertType";
import { postAPI, getAPI } from "../../utils/FetchData";
import { Dispatch }from 'redux'
import { validRegister } from "../../utils/Valid";

export const login = (userLogin: IUserLogin) => 
async (dispatch: Dispatch <IAuthType | IAlertType>) => {
    try {
        dispatch({type: ALERT, payload: {loading: true}})
        const res = await postAPI('login', userLogin);
            // console.log(res.data);
        localStorage.setItem("logged","true")
        dispatch({
            type: AUTH,
            payload: {
                msg: res.data.msg,
                access_token: res.data.access_token,
                user: res.data.user
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

export const refreshToken = () => 
async (dispatch: Dispatch <IAuthType | IAlertType>) => {

    const logged = localStorage.getItem("logged");
    console.log(logged);
    if(logged !== 'true') return;
    try {
        dispatch({type: ALERT, payload: {loading: true}})
        const res = await getAPI('refresh_token');
        console.log(res);

        dispatch({
            type: AUTH,
            payload: res.data
        })

        dispatch({type: ALERT, payload: {loading: false}})
   
        
       
    } catch (err:any) {
        dispatch({type: ALERT, payload: {errors: err.response.data.msg}})
        
    }
    
}

export const logout = () => 
async (dispatch: Dispatch <IAuthType | IAlertType>) => {

    try {
        localStorage.removeItem("logged");
        await getAPI('logout');
        window.location.href = '/'
       
    } catch (err:any) {
        dispatch({type: ALERT, payload: {errors: err.response.data.msg}})
        
    }
    
}