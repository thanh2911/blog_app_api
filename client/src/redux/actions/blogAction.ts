import { Dispatch } from "redux"
import { ALERT, IAlertType } from "../types/alertType"
import { CREATE_CATEGORY, ICategoryType } from "../types/categoryType"
import { deleteAPI, getAPI, postAPI, putAPI } from "../../utils/FetchData"
import { IBlog } from "../../utils/TypesScript"
import { ImgUploadFile } from "../../utils/ImageUpload"
import { 
    GET_HOME_BLOGS,
    IGetBlogsCategoryType,
    GET_BLOGS_CATEGORY_ID, 
    IGetHomeBlogsType,
    GET_BLOGS_USER_ID,
    IGetBlogsUserType, 
    ICreateBlogsUserType,
    CREATE_BLOGS_USER_ID,
    DELETE_BLOGS_USER_ID,
    IDeleteBlogsUserType
} from "../types/blogType"


export const createBlog = (blog: IBlog, token: string
    ) => async (dispatch: Dispatch<IAlertType | ICreateBlogsUserType>) => {
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

        dispatch({
            type: CREATE_BLOGS_USER_ID,
            payload: res.data.blog,
            user: res.data.user
        })
        

        dispatch({type: ALERT, payload: {success: res.data.msg}})

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

export const getBlogsByCategoryId = (id: string, search: string) => 
async (dispatch: Dispatch<IAlertType | IGetBlogsCategoryType>) => {

    console.log({search});
    try {
        dispatch({type: ALERT, payload: {loading: true}})

        const res = await getAPI(`blogs/category/${id}${search}`);

        dispatch({
            type: GET_BLOGS_CATEGORY_ID,
            payload: {...res.data, id, search}
        })

        console.log({res});
        
        

        dispatch({type: ALERT, payload: {loading: false}})

    } catch (err: any) {
        dispatch({type: ALERT, payload: {errors: err.response.data.msg}})
        
    }
}

export const getBlogsByUserId = (id: string, search?: string) => 
async (dispatch: Dispatch<IAlertType | IGetBlogsUserType>) => {

    let value = search ? search : `?page=${1}`

    try {
        dispatch({type: ALERT, payload: {loading: true}})

        const res = await getAPI(`blogs/user/${id}${value}`);

        dispatch({
            type: "GET_BLOGS_USER_ID",
            payload: {...res.data, id, search}
        })

        dispatch({type: ALERT, payload: {loading: false}})

    } catch (err: any) {
        dispatch({type: ALERT, payload: {errors: err.response.data.msg}})
        
    }
}

export const updateBlog = (blog: IBlog, token: string
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

        const res = await putAPI(`blog/${newBlog._id}`, newBlog, token)

        console.log({res});
        

        dispatch({type: ALERT, payload: {success: res.data.msg}})

    } catch (err: any) {
        dispatch({type: ALERT, payload: {errors: err.response.data.msg}})
        
    }
}

export const deleteBlog = (blog: IBlog, token: string
    ) => async (dispatch: Dispatch<IAlertType | IDeleteBlogsUserType>) => {
    try {
        dispatch({type: ALERT, payload: {loading: true}})

        const res = await deleteAPI(`blog/${blog._id}`, token);

        console.log({res});
        
       
        dispatch({
            type: DELETE_BLOGS_USER_ID,
            payload: blog
        })

        dispatch({type: ALERT, payload: {success: res.data.msg}})

    } catch (err: any) {
        dispatch({type: ALERT, payload: {errors: err.response.data.msg}})
        
    }
}