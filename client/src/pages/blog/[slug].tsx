import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { RootStore,IParams, IBlog } from '../../utils/TypeScript'
import { useDispatch, useSelector } from 'react-redux'
import {getAPI} from '../../utils/FetchData'
import Loading from '../../components/notification/Loading'
import DisplayBlog from '../../components/blog/DisplayBlog'
import {notification, Row, Col} from 'antd'

const BlogDetail = () => {
	const blog_id = useParams<IParams>().slug
	const [blog, setBlog] = useState<IBlog>()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	const {} = useSelector((state: RootStore) => state)
	const dispatch = useDispatch()


	useEffect(() => {
		const prevTitle = document.title;
		if(!blog_id) return;
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

	return (
		<Loading loadFull loadingProps={loading}>
		<Row justify="center" style={{marginTop: "40px"}}>
			<Col span={16} style={{overflow: 'hidden'}}>
				{
					blog && <DisplayBlog blog={blog} />
				}
			</Col>
		</Row>
		</Loading>
	)
}

export default BlogDetail