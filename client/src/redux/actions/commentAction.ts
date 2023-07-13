import { Dispatch } from 'redux';
import { ALERT ,IAlertType } from '../types/alertType';
import { getAPI, patchAPI, postAPI, deleteAPI} from '../../utils/FetchData';
import { CREATE_COMMENT,DELETE_COMMENT,DELETE_REPLY,GET_COMMENTS,ICreateCommentType,IDeleteCommentType,IGetCommentType, IReplyCommentType, IUpdateCommentType, REPLY_COMMENT, UPDATE_COMMENT, UPDATE_REPLY } from '../types/commentType';
import { IComment } from '../../utils/TypesScript';
import { checkTokenExp } from '../../utils/checkTonkenExp';

export const createComment = (data: IComment, token: string
    ) => async (dispatch: Dispatch<IAlertType | ICreateCommentType>) => {
        const result = await checkTokenExp(token,dispatch);
        const access_token = result ? result : token
  
    try {
        dispatch({type: ALERT, payload: {loading: true}})
        
        const res = await postAPI('comment',data,access_token)    ;
        // console.log({res});

        // dispatch({
        //     type: CREATE_COMMENT,
        //     payload: {...res.data, user: data.user}
        // })
            

        dispatch({type: ALERT, payload: {success: res.data.msg}})

    } catch (err: any) {
        dispatch({type: ALERT, payload: {errors: err.response.data.msg}})
        
    }
}

export const getComments = (id: string, num: number
    ) => async (dispatch: Dispatch<IAlertType | IGetCommentType>) => {
    try {
        
        // let limit = 2;

        const res = await getAPI(`comments/blog/${id}?page=${num}`);

        dispatch({
            type: GET_COMMENTS,
            payload: {
                data: res.data.comments,
                total: res.data.total
            }
        })
        // console.log({res})
        
    } catch (err: any) {
        dispatch({type: ALERT, payload: {errors: err.response.data.msg}})
        
    }
}

export const replyComments = (data: IComment, token: string
    ) => async (dispatch: Dispatch<IAlertType | IReplyCommentType >) => {
        const result = await checkTokenExp(token,dispatch);
        const access_token = result ? result : token
    
    try {
        dispatch({type: ALERT, payload: {loading: true}})
        
        const res = await postAPI('reply_comment',data,access_token)    ;
        // console.log({res});

        // dispatch({
        //     type: REPLY_COMMENT,
        //     payload: {
        //         ...res.data, 
        //         user: data.user,
        //         reply_user: data.reply_user
        //     }
        // })
            

        dispatch({type: ALERT, payload: {success: res.data.msg}})

    } catch (err: any) {
        dispatch({type: ALERT, payload: {errors: err.response.data.msg}})
        
    }
}

export const updateComment = (data: IComment, token: string
    ) => async (dispatch: Dispatch<IAlertType | IUpdateCommentType>) => {
        const result = await checkTokenExp(token,dispatch);
        const access_token = result ? result : token
    try {
        dispatch({type: ALERT, payload: {loading: true}})        
        
        const res = await patchAPI(`comment/${data._id}`,{
            data
        },access_token)
        // console.log({res});

        // dispatch({
        //     type: data.comment_root ? UPDATE_REPLY : UPDATE_COMMENT,
        //     payload: data
        // })
            

        dispatch({type: ALERT, payload: {success: res.data.msg}})

    } catch (err: any) {
        dispatch({type: ALERT, payload: {errors: err.response.data.msg}})
        
    }
}

export const deleteComment = (data: IComment, token: string
    ) => async (dispatch: Dispatch<IAlertType | IDeleteCommentType>) => {
        const result = await checkTokenExp(token,dispatch);
        const access_token = result ? result : token
    try {
        dispatch({type: ALERT, payload: {loading: true}})     
        
        console.log(data);
        
        
        const res = await deleteAPI(`comment/${data._id}`,access_token)
        // console.log({res});

        // dispatch({
        //     type: data.comment_root ? DELETE_REPLY : DELETE_COMMENT,
        //     payload: data
        // })
            

        dispatch({type: ALERT, payload: {success: res.data.msg}})

    } catch (err: any) {
        dispatch({type: ALERT, payload: {errors: err.response.data.msg}})
        
    }
}