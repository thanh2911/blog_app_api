import { Dispatch } from 'redux';
import { ALERT ,IAlertType } from '../types/alertType';
import { getAPI, patchAPI, postAPI, deleteAPI} from '../../utils/FetchData';
import { CREATE_CATEGORY, GET_CATEGORIES, UPDATE_CATEGORY, DELETE_CATEGORY, ICategoryType } from '../types/categoryType';
import { ICategory } from '../../utils/TypesScript';

export const createCategory = (name: string, token: string
    ) => async (dispatch: Dispatch<IAlertType | ICategoryType>) => {
    try {
        dispatch({type: ALERT, payload: {loading: true}})
        
        const res = await postAPI('category', {name}, token)

        dispatch({
            type: CREATE_CATEGORY,
            payload: res.data.newCategory
        })
        

        dispatch({type: ALERT, payload: {loading: false}})

    } catch (err: any) {
        dispatch({type: ALERT, payload: {errors: err.response.data.msg}})
        
    }
}

export const getCategories = () => 
async (dispatch: Dispatch<IAlertType | ICategoryType>) => {
    try {
        dispatch({type: ALERT, payload: {loading: true}})
        
        const res = await getAPI('category')
        
        dispatch({
            type: GET_CATEGORIES,
            payload: res.data.categories   
        })
    
        dispatch({type: ALERT, payload: {loading: false}})

    } catch (err: any) {
        dispatch({type: ALERT, payload: {errors: err.response.data.msg}})
        
    }
}

export const updateCategory = (data: ICategory, token: string
    ) => async (dispatch: Dispatch<IAlertType | ICategoryType>) => {
    try {
        dispatch({type: ALERT, payload: {loading: true}})
        
        const res = await patchAPI(`category/${data._id}`,{
            name:data.name},token)

        dispatch({
            type: UPDATE_CATEGORY,
            payload: data
        })
        
        dispatch({type: ALERT, payload: {success: res.data.msg}})

    } catch (err: any) {
        dispatch({type: ALERT, payload: {errors: err.response.data.msg}})
        
    }
}

export const deleteCategory = (id: string, token: string
    ) => async (dispatch: Dispatch<IAlertType | ICategoryType>) => {
    try {
        dispatch({type: ALERT, payload: {loading: true}})
        
        const res = await deleteAPI(`category/${id}`,token) 

        dispatch({
            type: DELETE_CATEGORY,
            payload: id
        })
     
        dispatch({type: ALERT, payload: {success: res.data.msg}})

    } catch (err: any) {
        dispatch({type: ALERT, payload: {errors: err.response.data.msg}})
        
    }
}