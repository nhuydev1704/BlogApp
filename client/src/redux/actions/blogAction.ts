import { IBlog } from '../../utils/TypeScript'
import { Dispatch } from "redux"
import { ALERT, IAlertType } from '../types/alertType'
import { notification } from 'antd'
import { checkImage, imageUpload } from '../../utils/imageUpload'
import { postAPI, getAPI, deleteAPI, patchAPI } from '../../utils/FetchData'

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