import { IBlog } from '../../utils/TypeScript'
import { Dispatch } from "redux"
import { ALERT, IAlertType } from '../types/alertType'
import { notification } from 'antd'
import { checkImage, imageUpload } from '../../utils/imageUpload'
import { postAPI, getAPI, deleteAPI, patchAPI } from '../../utils/FetchData'
import {
	GET_HOME_BLOGS,
	IGetHomeBlogsType,
	GET_BLOGS_BY_CATEGORY,
	IGetBlogsByCategoryType
} from '../types/homeBlogsType'

export const createBlog = (dataBlog: IBlog, token: string) => async (dispatch: Dispatch<IAlertType>) => {
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
		const res = await postAPI('blog', newBlog, token)
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

export const getBlogsByCategory = (id: string, search: string) =>  async (dispatch: Dispatch <IAlertType | IGetBlogsByCategoryType>) => {
	try {
		let limit = 8;
		let pageValue = search ? search : `?page=${1}`
		dispatch({ type: ALERT, payload: { loading: true } })
		const res = await getAPI(`blogs/${id}${pageValue}&limit=${limit}`)

		if (res.status === 200) {
			dispatch({ type: GET_BLOGS_BY_CATEGORY, payload: {...res.data, id, search} })
		}

		dispatch({ type: ALERT, payload: { loading: false } })
	}catch(err: any) {
		dispatch({ type: ALERT, payload: { loading: false } })
		notification['error']({
			message: "Blog Nguyễn Như Ý",
			description: err?.response?.data?.msg,
		});
	}
}