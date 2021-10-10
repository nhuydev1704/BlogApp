import { notification } from 'antd'
import { Dispatch } from "redux"
import { deleteAPI, getAPI, postAPI, putAPI } from '../../utils/FetchData'
import { imageUpload } from '../../utils/imageUpload'
import { IBlog } from '../../utils/TypeScript'
import { ALERT, IAlertType } from '../types/alertType'
import {
	GET_BLOGS_BY_CATEGORY, GET_BLOGS_BY_USER, GET_HOME_BLOGS, IGetBlogsByCategoryType, IGetBlogsByUserType, IGetHomeBlogsType, DELETE_BLOG, CREATE_BLOG_USER_ID, ICreateBlogsByUserType, IdeleteBlogsByUserType
} from '../types/homeBlogsType'
import { checkTokenExp } from '../../utils/checkTokenExp';

export const createBlog = (dataBlog: IBlog, token: string) => async (dispatch: Dispatch<IAlertType | ICreateBlogsByUserType>) => {
	const result = await checkTokenExp(token, dispatch)
    const access_token = result ? result : token
	let url = '';
	try {
		dispatch({ type: ALERT, payload: { loading: true } })

		if (typeof (dataBlog.thumbnail) !== 'string') {
			const photo = await imageUpload(dataBlog.thumbnail)
			url = photo.url
		} else {
			url = dataBlog.thumbnail
		}

		const newBlog = { ...dataBlog, thumbnail: url }
		const res = await postAPI('blog', newBlog, access_token)
		if (res.status === 200) {
			notification['success']({
				message: "Blog Nguyễn Như Ý",
				description: res.data.msg,
			});
		}

		dispatch({
			type: CREATE_BLOG_USER_ID,
			payload: res.data
		})

		dispatch({ type: ALERT, payload: { loading: false } })
	} catch (err: any) {
		dispatch({ type: ALERT, payload: { loading: false } })
		notification['error']({
			message: "Blog Nguyễn Như Ý",
			description: err?.response?.data?.msg,
		});
	}
}

export const updateBlog = (dataBlog: IBlog, token: string) => async (dispatch: Dispatch<IAlertType>) => {
	const result = await checkTokenExp(token, dispatch)
    const access_token = result ? result : token
	let url = '';
	try {
		dispatch({ type: ALERT, payload: { loading: true } })

		if (typeof (dataBlog.thumbnail) !== 'string') {
			const photo = await imageUpload(dataBlog.thumbnail)
			url = photo.url
		} else {
			url = dataBlog.thumbnail
		}

		const newBlog = { ...dataBlog, thumbnail: url }
		const res = await putAPI(`blog/${newBlog._id}`, newBlog, access_token)
		if (res.status === 200) {
			notification['success']({
				message: "Blog Nguyễn Như Ý",
				description: res.data.msg,
			});
		}

		dispatch({ type: ALERT, payload: { loading: false } })
	} catch (err: any) {
		dispatch({ type: ALERT, payload: { loading: false } })
		notification['error']({
			message: "Blog Nguyễn Như Ý",
			description: err?.response?.data?.msg,
		});
	}
}

export const deleteBlog = (blog: IBlog, token: string) => async (dispatch: Dispatch<IAlertType | IdeleteBlogsByUserType>) => {
	const result = await checkTokenExp(token, dispatch)
    const access_token = result ? result : token
	try {
		dispatch({ type: ALERT, payload: { loading: true } })

		dispatch({ type: DELETE_BLOG, payload: blog })

		const res = await deleteAPI(`blog/${blog._id}`, access_token)
		if (res.status === 200) {
			notification['success']({
				message: "Blog Nguyễn Như Ý",
				description: res.data.msg,
			});
		}

		dispatch({ type: ALERT, payload: { loading: false } })

	} catch (err: any) {
		dispatch({ type: ALERT, payload: { loading: false } })
		notification['error']({
			message: "Blog Nguyễn Như Ý",
			description: err?.response?.data?.msg,
		});
	}
}

export const getHomeBlogs = () => async (dispatch: Dispatch<IAlertType | IGetHomeBlogsType>) => {
	try {
		dispatch({ type: ALERT, payload: { loading: true } })
		const res = await getAPI('home/blogs?limit=6')

		if (res.status === 200) {
			dispatch({ type: GET_HOME_BLOGS, payload: res.data })
		}

		dispatch({ type: ALERT, payload: { loading: false } })
	} catch (err: any) {
		dispatch({ type: ALERT, payload: { loading: false } })
		notification['error']({
			message: "Blog Nguyễn Như Ý",
			description: err?.response?.data?.msg,
		});
	}
}

export const getBlogsByCategory = (id: string, search: string) => async (dispatch: Dispatch<IAlertType | IGetBlogsByCategoryType>) => {
	try {
		let limit = 4;
		let pageValue = search ? search : `?page=${1}`
		dispatch({ type: ALERT, payload: { loading: true } })
		const res = await getAPI(`blogs/category/${id}${pageValue}&limit=${limit}`)

		if (res.status === 200) {
			dispatch({ type: GET_BLOGS_BY_CATEGORY, payload: { ...res.data, id, search } })
		}

		dispatch({ type: ALERT, payload: { loading: false } })
	} catch (err: any) {
		dispatch({ type: ALERT, payload: { loading: false } })
		notification['error']({
			message: "Blog Nguyễn Như Ý",
			description: err?.response?.data?.msg,
		});
	}
}

export const getBlogsByUser = (id: string, search: string) => async (dispatch: Dispatch<IAlertType | IGetBlogsByUserType>) => {
	try {
		let limit = 4;
		let pageValue = search ? search : `?page=${1}`
		dispatch({ type: ALERT, payload: { loading: true } })
		const res = await getAPI(`blogs/user/${id}${pageValue}&limit=${limit}`)

		if (res.status === 200) {
			dispatch({ type: GET_BLOGS_BY_USER, payload: { ...res.data, id, search } })
		}

		dispatch({ type: ALERT, payload: { loading: false } })
	} catch (err: any) {
		dispatch({ type: ALERT, payload: { loading: false } })
		notification['error']({
			message: "Blog Nguyễn Như Ý",
			description: err?.response?.data?.msg,
		});
	}
}