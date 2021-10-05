import {
    GET_BLOGS_BY_CATEGORY,
    IBlogsByCategory,
    IGetBlogsByCategoryType
} from '../types/homeBlogsType'


const blogByCategoryReducer = (state: IBlogsByCategory[] = [], action: IGetBlogsByCategoryType): IBlogsByCategory[] => {
    switch (action.type) {
        case GET_BLOGS_BY_CATEGORY:
            return [...state, action.payload]
        default:
            return state
    }
}


export default blogByCategoryReducer;