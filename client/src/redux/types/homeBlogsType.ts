import { IBlog } from '../../utils/TypeScript'

export const GET_HOME_BLOGS = 'GET_HOME_BLOGS'
export const GET_BLOGS_BY_CATEGORY = 'GET_BLOGS_BY_CATEGORY'
export const GET_BLOGS_BY_USER = 'GET_BLOGS_BY_USER'
export const CREATE_BLOG_USER_ID = 'CREATE_BLOG_USER_ID'
export const DELETE_BLOG = "DELETE_BLOG"

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

export interface IBlogsByUser {
    id: string
    blogs: IBlog[]
    total: number
    search: string
}

export interface IGetBlogsByUserType {
    type: typeof GET_BLOGS_BY_USER
    payload: IBlogsByCategory
}

export interface ICreateBlogsByUserType {
    type: typeof CREATE_BLOG_USER_ID
    payload: IBlog
}

export interface IdeleteBlogsByUserType {
    type: typeof DELETE_BLOG
    payload: IBlog
}

export type IBlogUserType =
    | IGetBlogsByUserType
    | ICreateBlogsByUserType
    | IdeleteBlogsByUserType