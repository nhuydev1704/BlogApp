import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IBlog, RootStore, IUser, IComment } from "../../utils/TypeScript";
import { Row, Col } from "antd";
import Avatar from "@mui/material/Avatar";
import Comments from "../comments";
import InputComment from "../comments/InputComment";
import { createComment } from "../../redux/actions/commentAction";

interface IProps {
	blog: IBlog;
}

const DisplayBlog: React.FC<IProps> = ({ blog }) => {
	const { auth, comments } = useSelector((state: RootStore) => state);
	const dispatch = useDispatch();

	const [showComments, setShowComments] = useState<IComment[]>([]);

	const handleComment = (body: string) => {
		if (!auth.user || !auth.access_token) return;

		const data = {
			content: body,
			user: auth.user,
			blog_id: blog._id as string,
			blog_user_id: (blog.user as IUser)._id,
			createdAt: new Date().toISOString(),
		};

		setShowComments([data, ...showComments]);
		dispatch(createComment(data, auth.access_token));
	};

	useEffect(() => {
		if(comments.data.length === 0) return;
		setShowComments(comments.data)
	}, [comments.data])

	return (
		<div style={{ marginBottom: "20px" }}>
			<h2 style={{ fontSize: "2rem", fontWeight: 700 }}>{blog.title}</h2>
			<Row justify="space-between" style={{ marginBottom: "20px" }}>
				<div style={{ display: "flex", alignItems: "center" }}>
					{typeof blog.user !== "string" && (
						<Avatar
							alt="blog user"
							src={blog.user.avatar}
							sx={{ width: 55, height: 55 }}
						/>
					)}
					<div style={{ marginLeft: "8px" }}>
						<h3 style={{ fontWeight: 500 }}>
							{typeof blog.user !== "string" && (
								<Link to={`/profile/${blog.user._id}`}>
									{blog.user.name}
								</Link>
							)}
						</h3>

						<h5 style={{ color: "333" }}>
							{typeof blog.user !== "string" &&
								`${new Date(blog.createdAt).toLocaleString()}`}
						</h5>
					</div>
				</div>
				<div>chia se</div>
			</Row>
			<div
				dangerouslySetInnerHTML={{
					__html: blog.content,
				}}
			/>
			<h2 style={{ fontSize: "2rem", fontWeight: 700 }}>Bình luận</h2>
			{auth.user ? (
				<InputComment callback={handleComment} />
			) : (
				<h3>
					<Link to={`/login?blog/${blog._id}`}>{`Đăng nhập `}</Link>
					để bình luận
				</h3>
			)}
			{showComments?.map((comment, index) => (
				<Comments key={index} comment={comment} />
			))}
		</div>
	);
};

export default DisplayBlog;
