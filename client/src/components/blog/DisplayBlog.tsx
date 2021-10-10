import Avatar from "@mui/material/Avatar";
import { Row, Skeleton } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { createComment, getComments } from "../../redux/actions/commentAction";
import { IBlog, IComment, IUser, RootStore } from "../../utils/TypeScript";
import Comments from "../comments";
import InputComment from "../comments/InputComment";
import PaginationComponent from '../pagination';

interface IProps {
	blog: IBlog;
}

const DisplayBlog: React.FC<IProps> = ({ blog }) => {
	const { auth, comments } = useSelector((state: RootStore) => state);
	const dispatch = useDispatch();
	const history = useHistory()

	const [showComments, setShowComments] = useState<IComment[]>([]);
	const [loading, setLoading] = useState(false)

	const handleComment = (body: string) => {
		if (!auth.user || !auth.access_token) return;

		const data = {
			content: body,
			user: auth.user,
			blog_id: blog._id as string,
			blog_user_id: (blog.user as IUser)._id,
			replyCM: [],
			createdAt: new Date().toISOString(),
		};

		setShowComments([data, ...showComments]);
		dispatch(createComment(data, auth.access_token));
	};

	useEffect(() => {
		setShowComments(comments.data)
	}, [comments.data])

	const getComment = useCallback(
		async (id: string, num = 1) => {
			setLoading(true)
			await dispatch(getComments(id, num))
			setLoading(false)
		},

		[dispatch]
	)

	useEffect(() => {
		if (!blog._id) return;
		setLoading(true)
		const numPage = history.location.search.slice(6) || 1
		getComment(blog._id, numPage);
		setLoading(false)
	}, [blog._id, getComment, history])

	const handlePagination = async (page: number) => {
		if (!blog._id) return;
		setLoading(true)
		await dispatch(getComments(blog._id, page))
		setLoading(false)
	}

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
			{
				loading ?
					<Skeleton avatar paragraph={{ rows: 4 }} />
					: showComments?.map((comment, index) => (
						<Comments key={index} comment={comment} />
					))
			}
			<Row justify="end" style={{ marginTop: '20px' }}>
				{
					comments.total > 1 &&
					<PaginationComponent total={comments.total} callback={handlePagination} />
				}
			</Row>
		</div>
	);
};

export default DisplayBlog;
