import { IUserLogin } from "../../utils/TypesScript";
import { AUTH, IAuthType } from '../types/authType'
import { ALERT, IAlertType } from "../types/alertType";
import { postAPI } from "../../utils/FetchData";
import { Dispatch }from 'redux'

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
                user: res.data.user
            }
        })
        
        dispatch({type: ALERT, payload: {success: 'Login success !'}})

    } catch (err:any) {
        dispatch({type: ALERT, payload: {errors: err.response.data.msg}})
        console.log(err.response.data.msg);
        
    }
    
}