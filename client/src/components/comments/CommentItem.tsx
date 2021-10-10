import { DeleteFilled, DislikeFilled, DislikeOutlined, EditFilled, LikeFilled, LikeOutlined } from "@ant-design/icons";
import Skeleton from "@mui/material/Skeleton";
import { Avatar, Comment, Divider, Space, Tooltip } from "antd";
import moment from "moment";
import React, { createElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { replyComment, updateComment, deleteComment } from "../../redux/actions/commentAction";
import { IComment, RootStore } from "../../utils/TypeScript";
import InputComment from "./InputComment";
import "./style.css";

interface IProps {
	comment: IComment;
	showReply: IComment[];
	setShowReply: (showReply: IComment[]) => void;
}

const CommentItem: React.FC<IProps> = ({
	children,
	comment,
	showReply,
	setShowReply,
}) => {
	const [likes, setLikes] = useState(0);
	const [dislikes, setDislikes] = useState(0);
	const [action, setAction] = useState<any>();

	const [edit, setEdit] = useState<IComment>();

	const [reply, setReply] = useState(false);

	const { auth } = useSelector((state: RootStore) => state);
	const dispatch = useDispatch();

	const like = () => {
		setLikes(1);
		setDislikes(0);
		setAction("liked");
	};

	const dislike = () => {
		setLikes(0);
		setDislikes(1);
		setAction("disliked");
	};

	const handleReplyComment = (body: string) => {
		if (!auth.user || !auth.access_token) return;

		const data = {
			content: body,
			user: auth.user,
			blog_id: comment.blog_id,
			blog_user_id: comment.blog_user_id,
			replyCM: [],
			reply_user: comment.user,
			comment_root: comment.comment_root || comment._id,
			createdAt: new Date().toISOString(),
		};
		setShowReply([data, ...showReply]);
		dispatch(replyComment(data, auth.access_token));
		setReply(false);
	};

	const handleUpdate = (body: string) => {
		if (!auth.user || !auth.access_token || !edit) return;

		if (body === edit.content) {
			return setEdit(undefined)
		}
		const newComment = { ...edit, content: body }
		dispatch(updateComment(newComment, auth.access_token))

		setEdit(undefined)
	}

	const handleDelete = (comment: IComment) => {
		if (!auth.user || !auth.access_token) return;
		dispatch(deleteComment(comment, auth.access_token))
	}

	const menuUpdate = (comment: IComment) => {
		return (
			<Space style={{ cursor: "pointer" }}>
				<Tooltip title="Sửa">
					<EditFilled onClick={() => setEdit(comment)} />
				</Tooltip>
				<Tooltip title="Xóa">
					<DeleteFilled onClick={() => handleDelete(comment)} />
				</Tooltip>
			</Space>
		);
	};

	const actions: any = [
		<Tooltip key="comment-basic-like" title="Like">
			<span onClick={like}>
				{createElement(action === "liked" ? LikeFilled : LikeOutlined)}
				<span className="comment-action">{likes}</span>
			</span>
		</Tooltip>,
		<Tooltip key="comment-basic-dislike" title="Dislike">
			<span onClick={dislike}>
				{React.createElement(
					action === "disliked" ? DislikeFilled : DislikeOutlined
				)}
				<span className="comment-action">{dislikes}</span>
			</span>
		</Tooltip>,
		<span key="comment-basic-reply-to" onClick={() => setReply(!reply)}>
			{reply ? "Đóng" : "Trả lời"}
		</span>,
		comment.blog_user_id === auth.user?._id ? (
			comment.user && comment.user._id! === auth.user._id ? (
				menuUpdate(comment)
			) : (
				<Tooltip title="Xóa">
					<DeleteFilled onClick={() => handleDelete(comment)} />
				</Tooltip>
			)
		) : (
			comment.user &&
			comment.user._id === auth.user?._id &&
			menuUpdate(comment)
		),
	];

	return comment.user ? (
		<div>
			{edit ? (
				<Space>
					<Space direction="vertical">
						<Avatar
							src={comment.user.avatar}
							alt={comment.user.avatar}
						/>
						<Link
							style={{ fontWeight: 500, color: "#333" }}
							to={"/profile/" + comment.user._id}
						>
							<small>{comment.user.name}</small>
						</Link>
					</Space>
					<InputComment
						callback={handleUpdate}
						edit={edit}
						setEdit={setEdit}
					/>
				</Space>
			) : (
				<Comment
					actions={
						!comment._id ? (
							<Skeleton
								animation="wave"
								height={10}
								width="40%"
							/>
						) : (
							actions
						)
					}
					author={
						!comment._id ? (
							<Skeleton
								animation="wave"
								height={10}
								width="80%"
								style={{ marginBottom: 6 }}
							/>
						) : (
							<Link
								style={{ fontWeight: 500, color: "#333" }}
								to={"/profile/" + comment.user._id}
							>
								{comment.user.name}
							</Link>
						)
					}
					avatar={
						!comment._id ? (
							<Skeleton
								animation="wave"
								variant="circular"
								width={40}
								height={40}
							/>
						) : (
							<Avatar
								src={comment.user.avatar}
								alt={comment.user.avatar}
							/>
						)
					}
					content={
						!comment._id ? (
							<Skeleton
								animation="wave"
								height={10}
								width="40%"
							/>
						) : (
							<div
								dangerouslySetInnerHTML={{
									__html: comment.content,
								}}
							/>
						)
					}
					datetime={
						<Tooltip
							title={moment(comment.createdAt).format(
								"YYYY-MM-DD HH:mm:ss"
							)}
						>
							<span>{moment(comment.createdAt).fromNow()}</span>
						</Tooltip>
					}
				>
					{reply && <InputComment callback={handleReplyComment} />}
					{children}
				</Comment>
			)}

			<Divider style={{ margin: "10px 0" }} />
		</div>
	) : (
		<></>
	);
};

export default CommentItem;
