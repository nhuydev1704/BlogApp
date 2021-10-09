import {notification} from 'antd'
import { IComment } from "../../utils/TypeScript";
import { postAPI } from "../../utils/FetchData";
import { Dispatch } from "redux";
import { IAlertType, ALERT } from "../types/alertType";
import {ICreateCommentType, CREATE_COMMENT} from '../types/commentType'

export const createComment =
	(data: IComment, token: string) =>
	async (dispatch: Dispatch<IAlertType | ICreateCommentType>) => {
		try {
			const res = await postAPI('comment', data, token)
			dispatch({type: CREATE_COMMENT, payload: {...res.data, user: data.user}})
		} catch (err: any) {
			dispatch({ type: ALERT, payload: { loading: false } });
			notification["error"]({
				message: "Blog Nguyễn Như Ý",
				description: err?.response?.data?.msg,
			});
		}
	};
