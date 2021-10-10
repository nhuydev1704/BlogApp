import { Col, notification, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import DisplayBlog from '../../components/blog/DisplayBlog'
import Loading from '../../components/notification/Loading'
import { getAPI } from '../../utils/FetchData'
import { IBlog, IParams, RootStore } from '../../utils/TypeScript'
import { useSelector } from 'react-redux'

const BlogDetail = () => {
	const blog_id = useParams<IParams>().slug
	const [blog, setBlog] = useState<IBlog>()
	const [loading, setLoading] = useState(false)

	const { socket } = useSelector((state: RootStore) => state)

	useEffect(() => {
		const prevTitle = document.title;
		if (!blog_id) return;
		setLoading(true)

		getAPI(`blog/${blog_id}`)
			.then(res => {
				document.title = res.data.title
				setBlog(res.data)
				setLoading(false)

			})
			.catch(err => {
				notification['error']({
					message: "Blog Nguyễn Như Ý",
					description: err.response.msg,
				});
				setLoading(false)
			})

		return () => {
			setBlog(undefined);
			document.title = prevTitle;
		}
	}, [blog_id])

	// join room 
	useEffect(() => {
		if (!blog_id || !socket) return;
		socket.emit('joinRoom', blog_id)

		return () => {
			socket.emit('outRoom', blog_id)
		}
	}, [socket, blog_id])

	return (
		<Loading loadFull loadingProps={loading}>
			<Row justify="center" style={{ marginTop: "40px" }}>
				<Col span={16} style={{ overflow: 'hidden' }}>
					{
						blog && <DisplayBlog blog={blog} />
					}
				</Col>
			</Row>
		</Loading>
	)
}

export default BlogDetail