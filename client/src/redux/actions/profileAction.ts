import { IAuth, AUTH, IAuthType } from "../types/authType";
import { Dispatch } from "redux";
import { IAlertType, ALERT } from "../types/alertType";
import { checkImage, ImgUploadFile } from "../../utils/ImageUpload";
import { patchAPI } from "../../utils/FetchData";

export const  updateUser = 
(avatar: File , name: string, auth: IAuth
) => async (dispatch: Dispatch<IAlertType | IAuthType>) =>  {
    if(!auth.access_token || !auth.user) return;

    let url = '';
    try {
        dispatch({type: ALERT, payload: { loading: true}})

        if(avatar) {
            const check = checkImage(avatar);
            if(check) {
                return dispatch({type: ALERT,payload: {errors: check}})
            }

            const photo = await ImgUploadFile(avatar);
            url = photo.url;
            
        }

        const res = await patchAPI('user', {
            avatar: url ? url : auth.user.avatar,
            name: name ? name : auth.user.name
        }, auth.access_token)
        
        dispatch({
            type: AUTH,
            payload: {
                access_token: auth.access_token,
                user: {
                    ...auth.user,
                    avatar: url ? url : auth.user.avatar,
                    name: name ? name : auth.user.name
                }
            }
        })

        dispatch({type: ALERT, payload: { success: res.data.msg}})

        
    } catch (err: any) {
        dispatch({type: ALERT, payload: { errors: err.response.data.msg}})
    }
    
}