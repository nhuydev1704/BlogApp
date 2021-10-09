import React, { createElement, useState, useEffect } from "react";
import { Comment, Tooltip, Avatar } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
	DislikeOutlined,
	LikeOutlined,
	DislikeFilled,
	LikeFilled,
} from "@ant-design/icons";
import { IComment, RootStore, IBlog, IUser } from "../../utils/TypeScript";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import InputComment from "./InputComment";
import CommentItem from "./CommentItem";
import Button from '@mui/material/Button';
import "./style.css";

interface IProps {
	comment: IComment;
}

const Comments: React.FC<IProps> = ({ comment }) => {
	const [showReply, setShowReply] = useState<IComment[]>([]);
	const [nextReplyComment, setNextReplyComment] = useState(2);

	useEffect(() => {
		if (!comment.replyCM) return;
		setShowReply(comment.replyCM);
	}, [comment.replyCM]);
	return (
		<CommentItem
			comment={comment}
			showReply={showReply}
			setShowReply={setShowReply}
		>
			{showReply &&
				showReply.length > 0 &&
				showReply.slice(0, nextReplyComment).map((comment, index) => (
					<div key={index}>
						<CommentItem
							comment={comment}
							showReply={showReply}
							setShowReply={setShowReply}
						/>
					</div>
				))}
			<div>
				{showReply.length - nextReplyComment > 0 ? (
					<Button variant="text" onClick={() => setNextReplyComment(nextReplyComment + 2)}>
						<small>Tải thêm bình luận</small>
					</Button>
				) : showReply.length > 2 && (
					<Button variant="text" onClick={() => setNextReplyComment(2)}>
						<small>Ẩn bình luận</small>
					</Button>
				)}
			</div>
		</CommentItem>
	);
};

export default Comments;
