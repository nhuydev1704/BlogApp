import { IBlog } from '../../utils/TypeScript'

export const GET_HOME_BLOGS = 'GET_HOME_BLOGS'
export const GET_BLOGS_BY_CATEGORY = 'GET_BLOGS_BY_CATEGORY'

export interface IHomeBlogs {
    _id: string,
    name: string,
    count: number,
    blogs: IBlog[]
}

export interface IGetHomeBlogsType {
    type: typeof GET_HOME_BLOGS
    payload: IHomeBlogs[]
}

export interface IBlogsByCategory {
    id: string
    blogs: IBlog[]
    total: number
    search: string
}

export interface IGetBlogsByCategoryType {
    type: typeof GET_BLOGS_BY_CATEGORY
    payload: IBlogsByCategory
}