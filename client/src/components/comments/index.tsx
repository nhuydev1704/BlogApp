import React, { createElement, useState } from "react";
import { Comment, Tooltip, Avatar } from "antd";
import moment from "moment";
import {
	DislikeOutlined,
	LikeOutlined,
	DislikeFilled,
	LikeFilled,
} from "@ant-design/icons";
import { IComment } from "../../utils/TypeScript";
import { Link } from "react-router-dom";
import "./style.css";

interface IProps {
	comment: IComment;
}

const Comments: React.FC<IProps> = ({ comment }) => {
	const [likes, setLikes] = useState(0);
	const [dislikes, setDislikes] = useState(0);
	const [action, setAction] = useState<any>();

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

	const actions = [
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
		<span key="comment-basic-reply-to">Reply to</span>,
	];

	return comment.user ? (
		<Comment
			actions={actions}
			author={
				<Link to={`/profile/${comment.user._id}`}>
					{comment.user.name}
				</Link>
			}
			avatar={
				<Avatar
					src={comment.user.avatar}
					alt={`${comment.user.avatar}`}
				/>
			}
			content={
				<div
					dangerouslySetInnerHTML={{
						__html: comment.content,
					}}
				/>
			}
			datetime={
				<Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
					<span>{moment().fromNow()}</span>
				</Tooltip>
			}
		/>
	) : (
		<></>
	);
};

export default Comments;
