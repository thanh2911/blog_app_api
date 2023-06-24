import { Dispatch } from "redux"
import { ALERT, IAlertType } from "../types/alertType"
import { CREATE_CATEGORY, ICategoryType } from "../types/categoryType"
import { postAPI } from "../../utils/FetchData"
import { IBlog } from "../../utils/TypesScript"
import { ImgUploadFile } from "../../utils/ImageUpload"


export const createBlog = (blog: IBlog, token: string
    ) => async (dispatch: Dispatch<IAlertType | ICategoryType>) => {
        let url;
    try {
        dispatch({type: ALERT, payload: {loading: true}})

        if(typeof(blog.thumbnail) !== 'string') {
            const photo = await ImgUploadFile(blog.thumbnail)
            url = photo.url
        }else {
            url = blog.thumbnail
        }
        
        const newBlog = {...blog, thumbnail: url};

        const res = await postAPI('blog', newBlog, token)

        console.log({res});
        

        dispatch({type: ALERT, payload: {loading: false}})

    } catch (err: any) {
        dispatch({type: ALERT, payload: {errors: err.response.data.msg}})
        
    }
}