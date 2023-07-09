import { Dispatch } from 'redux';
import { ALERT ,IAlertType } from '../types/alertType';
import { getAPI, patchAPI, postAPI, deleteAPI} from '../../utils/FetchData';
import { CREATE_COMMENT,GET_COMMENTS,ICreateCommentType,IGetCommentType, IReplyCommentType, REPLY_COMMENT } from '../types/commentType';
import { IComment } from '../../utils/TypesScript';

export const createComment = (data: IComment, token: string
    ) => async (dispatch: Dispatch<IAlertType | ICreateCommentType>) => {
    try {
        dispatch({type: ALERT, payload: {loading: true}})
        
        const res = await postAPI('comment',data,token)    ;
        console.log({res});

        dispatch({
            type: CREATE_COMMENT,
            payload: {...res.data, user: data.user}
        })
            

        dispatch({type: ALERT, payload: {loading: false}})

    } catch (err: any) {
        dispatch({type: ALERT, payload: {errors: err.response.data.msg}})
        
    }
}

export const getComments = (id: string
    ) => async (dispatch: Dispatch<IAlertType | IGetCommentType>) => {
    try {
        
        let limit = 6;

        const res = await getAPI(`comments/blog/${id}?limit=${limit}`);

        dispatch({
            type: GET_COMMENTS,
            payload: {
                data: res.data.comments,
                total: res.data.total
            }
        })
        console.log({res})
        
    } catch (err: any) {
        dispatch({type: ALERT, payload: {errors: err.response.data.msg}})
        
    }
}

export const replyComments = (data: IComment, token: string
    ) => async (dispatch: Dispatch<IAlertType | IReplyCommentType >) => {
    try {
        dispatch({type: ALERT, payload: {loading: true}})
        
        const res = await postAPI('reply_comment',data,token)    ;
        console.log({res});

        dispatch({
            type: REPLY_COMMENT,
            payload: {
                ...res.data, 
                user: data.user,
                reply_user: data.reply_user
            }
        })
            

        dispatch({type: ALERT, payload: {loading: false}})

    } catch (err: any) {
        dispatch({type: ALERT, payload: {errors: err.response.data.msg}})
        
    }
}