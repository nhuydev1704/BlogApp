import { notification } from "antd";
import { IComment } from "../../utils/TypeScript";
import { postAPI, getAPI, patchAPI, deleteAPI } from "../../utils/FetchData";
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
	IUpdateCommentType,
	DELETE_COMMENT,
	DELETE_REPLY,
	IDeleteCommentType
} from "../types/commentType";
import { checkTokenExp } from '../../utils/checkTokenExp';

export const createComment =
	(data: IComment, token: string) =>
		async (dispatch: Dispatch<IAlertType | ICreateCommentType>) => {
			const result = await checkTokenExp(token, dispatch)
   			const access_token = result ? result : token
			try {
				await postAPI("comment", data, access_token);
				// dispatch({
				// 	type: CREATE_COMMENT,
				// 	payload: { ...res.data, user: data.user },
				// });
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
			const result = await checkTokenExp(token, dispatch)
   			const access_token = result ? result : token
			try {
				await postAPI("reply_comment", data, access_token);

				// dispatch({
				// 	type: REPLY_COMMENT,
				// 	payload: { ...res.data, user: data.user, reply_user: data.reply_user },
				// });
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
			const result = await checkTokenExp(token, dispatch)
   			const access_token = result ? result : token
			try {
				dispatch({
					type: data.comment_root ? UPDATE_REPLY : UPDATE_COMMENT,
					payload: data,
				});
				await patchAPI(`comment/${data._id}`, {
					data
				}, access_token);

			} catch (err: any) {
				dispatch({ type: ALERT, payload: { loading: false } });
				notification["error"]({
					message: "Blog Nguyễn Như Ý",
					description: err?.response?.data?.msg,
				});
			}
		};
export const deleteComment =
	(data: IComment, token: string) =>
		async (dispatch: Dispatch<IAlertType | IDeleteCommentType>) => {
			const result = await checkTokenExp(token, dispatch)
   			const access_token = result ? result : token
			try {
				dispatch({
					type: data.comment_root ? DELETE_REPLY : DELETE_COMMENT,
					payload: data,
				});
				await deleteAPI(`comment/${data._id}`, access_token);

			} catch (err: any) {
				dispatch({ type: ALERT, payload: { loading: false } });
				notification["error"]({
					message: "Blog Nguyễn Như Ý",
					description: err?.response?.data?.msg,
				});
			}
		};