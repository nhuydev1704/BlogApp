import {
    GET_BLOGS_BY_CATEGORY,
    IBlogsByCategory,
    IGetBlogsByCategoryType
} from '../types/homeBlogsType'


const blogByCategoryReducer = (state: IBlogsByCategory[] = [], action: IGetBlogsByCategoryType): IBlogsByCategory[] => {
    switch (action.type) {
        case GET_BLOGS_BY_CATEGORY:
            if(state.every(item => item.id !== action.payload.id)){
                return [...state, action.payload]
            }else {
                console.log('action2', action, 'state', state)
                return state.map(blog => (
                        blog.id === action.payload.id
                        ? action.payload 
                        : blog
                    ))
            }
        default:
            return state
    }
}


export default blogByCategoryReducer;