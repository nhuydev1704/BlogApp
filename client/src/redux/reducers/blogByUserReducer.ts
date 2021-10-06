import {
    GET_BLOGS_BY_USER,
    IBlogsByUser,
    IGetBlogsByUserType
} from '../types/homeBlogsType'


const blogByUserReducer = (state: IBlogsByUser[] = [], action: IGetBlogsByUserType): IBlogsByUser[] => {
    switch (action.type) {
        case GET_BLOGS_BY_USER:
            if(state.every(item => item.id !== action.payload.id)){
                return [...state, action.payload]
            }else {
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


export default blogByUserReducer;