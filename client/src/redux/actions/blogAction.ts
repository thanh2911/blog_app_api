import { Dispatch } from "redux"
import { ALERT, IAlertType } from "../types/alertType"
import { CREATE_CATEGORY, ICategoryType } from "../types/categoryType"
import { getAPI, postAPI } from "../../utils/FetchData"
import { IBlog } from "../../utils/TypesScript"
import { ImgUploadFile } from "../../utils/ImageUpload"
import { 
    GET_HOME_BLOGS,
    IGetBlogsCategoryType,
    GET_BLOGS_CATEGORY_ID, 
    IGetHomeBlogsType 
} from "../types/blogType"


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

export const getHomeBlogs = () => 
async (dispatch: Dispatch<IAlertType| IGetHomeBlogsType >) => {
    try {
        dispatch({type: ALERT, payload: {loading: true}})

        const res = await getAPI('home/blogs');

        dispatch({
            type: GET_HOME_BLOGS, 
            payload: res.data
        })
        

        dispatch({type: ALERT, payload: {loading: false}})

    } catch (err: any) {
        dispatch({type: ALERT, payload: {errors: err.response.data.msg}})
        
    }
}

export const getBlogsByCategoryId = (id: string) => 
async (dispatch: Dispatch<IAlertType | IGetBlogsCategoryType>) => {
    try {
        dispatch({type: ALERT, payload: {loading: true}})

        const res = await getAPI(`blogs/${id}`);

        dispatch({
            type: GET_BLOGS_CATEGORY_ID,
            payload: {...res.data, id}
        })

        console.log({res});
        
        

        dispatch({type: ALERT, payload: {loading: false}})

    } catch (err: any) {
        dispatch({type: ALERT, payload: {errors: err.response.data.msg}})
        
    }
}