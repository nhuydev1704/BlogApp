import { IUser } from '../../utils/TypeScript'
import {
    GET_BLOGS_BY_USER,
    IBlogsByUser,
    IBlogUserType,
    CREATE_BLOG_USER_ID,
    DELETE_BLOG
} from '../types/homeBlogsType'


const blogByUserReducer = (state: IBlogsByUser[] = [], action: IBlogUserType): IBlogsByUser[] => {
    switch (action.type) {
        case GET_BLOGS_BY_USER:
            if (state.every(item => item.id !== action.payload.id)) {
                return [...state, action.payload]
            } else {
                return state.map(item => (
                    item.id === action.payload.id
                        ? action.payload
                        : item
                ))
            }

        case CREATE_BLOG_USER_ID:
            return state.map(item => (
                item.id === (action.payload.user as IUser)._id
                    ? {
                        ...item,
                        blogs: [action.payload, ...item.blogs]
                    }
                    : item
            ))

        case DELETE_BLOG:
            return state.map(item => (
                item.id === (action.payload.user as IUser)._id
                    ? {
                        ...item,
                        blogs: item.blogs.filter(blog => (
                            blog._id !== action.payload._id
                        ))
                    }
                    : item
            ))

        default:
            return state
    }
}


export default blogByUserReducer;