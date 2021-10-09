import { notification } from "antd";
import { IComment } from "../../utils/TypeScript";
import { postAPI, getAPI } from "../../utils/FetchData";
import { Dispatch } from "redux";
import { IAlertType, ALERT } from "../types/alertType";
import {
	CREATE_COMMENT,
	ICreateCommentType,
	GET_COMMENT,
	IGetCommentType,
	REPLY_COMMENT,
	IReplyCommentType,
	UPDATE_COMMENT,
	UPDATE_REPLY,
	IUpdateCommentType
} from "../types/commentType";

export const createComment =
	(data: IComment, token: string) =>
	async (dispatch: Dispatch<IAlertType | ICreateCommentType>) => {
		try {
			const res = await postAPI("comment", data, token);
			dispatch({
				type: CREATE_COMMENT,
				payload: { ...res.data, user: data.user },
			});
		} catch (err: any) {
			dispatch({ type: ALERT, payload: { loading: false } });
			notification["error"]({
				message: "Blog Nguyễn Như Ý",
				description: err?.response?.data?.msg,
			});
		}
	};

export const getComments =
	(id: string, num: number) => async (dispatch: Dispatch<IAlertType | IGetCommentType>) => {
		try {
			let limit = 4
			const res = await getAPI(`comment/blog/${id}?page=${num}&${limit}`);

			dispatch({
				type: GET_COMMENT,
				payload: {
					data: res.data.comments,
					total: res.data.total
				}
			})

		} catch (err: any) {
			dispatch({ type: ALERT, payload: { loading: false } });
			notification["error"]({
				message: "Blog Nguyễn Như Ý",
				description: err?.response?.data?.msg,
			});
		}
	};
export const replyComment =
	(data: IComment, token: string) =>
	async (dispatch: Dispatch<IAlertType | IReplyCommentType>) => {
		try {
			const res = await postAPI("reply_comment", data, token);

			dispatch({
				type: REPLY_COMMENT,
				payload: { ...res.data, user: data.user, reply_user: data.reply_user },
			});
		} catch (err: any) {
			dispatch({ type: ALERT, payload: { loading: false } });
			notification["error"]({
				message: "Blog Nguyễn Như Ý",
				description: err?.response?.data?.msg,
			});
		}
	};

export const updateComment = 
	(data: IComment, token: string) =>
	async (dispatch: Dispatch<IAlertType | IUpdateCommentType>) => {
		try {
			dispatch({
				type: data.comment_root ? UPDATE_REPLY :  UPDATE_COMMENT,
				payload: data,
			});
			// const res = await postAPI("reply_comment", data, token);

		} catch (err: any) {
			dispatch({ type: ALERT, payload: { loading: false } });
			notification["error"]({
				message: "Blog Nguyễn Như Ý",
				description: err?.response?.data?.msg,
			});
		}
	};