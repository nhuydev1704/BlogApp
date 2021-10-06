import { combineReducers } from 'redux'
import auth from './authReducer'
import alert from './alertReducer'
import category from './categoryReducer'
import homeBlogs from './homeBlogsReducer'
import blogByCategory from './blogByCategoryReducer'
import otherInfo from './otherInfoReducer'

export default combineReducers({
    auth,
    alert,
    category,
    homeBlogs,
    blogByCategory,
    otherInfo
})