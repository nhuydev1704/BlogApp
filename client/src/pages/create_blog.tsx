import { Button, Col, notification, Row } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FormCreateBlog from '../components/blog/FormCreateBlog'
import PreviewBlog from '../components/blog/PreviewBlog'
import TinyEditor from '../components/editor/TinyEditor'
import Loading from '../components/notification/Loading'
import { createBlog, updateBlog } from '../redux/actions/homeBlogsAction'
import { IBlog, RootStore, IUser } from '../utils/TypeScript'
import { validCreateBlog, shallowEqual } from '../utils/Valid'
import { getAPI } from '../utils/FetchData'
import NotFound from '../components/global/NotFound'

const initState = {
	user: '',
	title: '',
	content: '',
	description: '',
	thumbnail: '',
	category: '',
	createdAt: new Date().toISOString()
}

interface IProps {
	id?: string
}

const CreateBlog: React.FC<IProps> = ({ id }) => {
	const [blog, setBlog] = useState<IBlog>(initState);
	const [body, setBody] = useState("")
	const [text, setText] = useState("")
	const [loading, setLoading] = useState(false)

	const divRef = useRef<HTMLDivElement>(null)

	const { auth } = useSelector((state: RootStore) => state)
	const dispatch = useDispatch();
	const [oldData, setOldData] = useState<IBlog>(initState);

	useEffect(() => {
		if (!id) return;
		setLoading(true)
		getAPI(`blog/${id}`)
			.then(res => {
				setBlog(res.data)
				setBody(res.data.content)
				setOldData(res.data)
				setLoading(false)
			})
			.catch(err => {
				setLoading(false)
				console.log(err)
			})

		const initData = {
			user: '',
			title: '',
			content: '',
			description: '',
			thumbnail: '',
			category: '',
			createdAt: new Date().toISOString()
		}

		return () => {
			setBlog(initData)
			setBody('')
			setOldData(initData)
		}
	}, [id])

	useEffect(() => {
		const div = divRef.current;
		if (!div) return;
		const text = (div?.innerText as string)
		setText(text)
	}, [body])

	const handleSubmitCreateBlog = async () => {
		if (!auth.access_token) return;
		const check = validCreateBlog({ ...blog, content: text });
		if (check.errLength !== 0) {
			notification['error'](
				{
					message: "Blog Nguyễn Như Ý",
					description:
						<div>
							{check?.errMsg.map((item, idx) => {
								return <div key={idx}>
									{item}
								</div>
							})}
						</div>
				});
			return;
		}

		let newData = { ...blog, content: body }

		if (id) {
			const result = shallowEqual(oldData, newData)
			if (!result) {
				if ((blog.user as IUser)._id !== auth.user?._id)
					return notification['warning'](
						{
							message: "Blog Nguyễn Như Ý",
							description: "Bạn không phải tác giả bài viết."
						});
				dispatch(updateBlog(newData, auth?.access_token))
			} else {
				notification['warning'](
					{
						message: "Blog Nguyễn Như Ý",
						description: "Nội dung cập nhật chưa được thay đổi."
					});
			}
		} else {
			dispatch(createBlog(newData, auth?.access_token))
		}
	}

	if (!auth.user) return <NotFound />
	return (
		<div style={{ margin: '40px 0' }}>
			<Loading loadFull loadingProps={loading}>
				<Row gutter={[16, 16]}>
					<Col span={12}>
						<h3>Thông tin bài đăng</h3>
						<FormCreateBlog blog={blog} setBlog={setBlog} />
					</Col>
					<Col span={12}>
						<h3>Xem trước</h3>
						<PreviewBlog blog={blog} />
					</Col>
					<Col span={24}>
						{/* <ReactEditor setBody={setBody} /> */}
						<TinyEditor body={body} setBody={setBody} />
						<small>
							{
								`Số từ: 
									${text.length
								}
								`
							}
						</small>
						<div ref={divRef} dangerouslySetInnerHTML={{
							__html: body
						}} style={{ display: 'none' }} />
					</Col>
					<Col span={24} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
						<Button type="primary" onClick={handleSubmitCreateBlog}>
							{id ? 'Sửa bài đăng' : 'Tạo Bài Đăng'}
						</Button>
					</Col>
				</Row>
			</Loading>
		</div>
	)
}

export default CreateBlog;