import { combineReducers } from 'redux';
import auth from './authReducer';
import alert from './alertReducer';
import categories from './categoryReducer';
import homeBlogs from './homeBlogsReducer';
import blogsCategory from './blogsCategoryReducer';
import blogsUser from './blogsUserReducer';

import otherInfo from './otherInfoReducer';
import comments from './commentReducer';




export default combineReducers({
    auth,
    alert,
    categories,
    homeBlogs,
    blogsCategory,
    blogsUser,
    otherInfo,
    comments
})
