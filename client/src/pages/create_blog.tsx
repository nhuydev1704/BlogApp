import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, notification, Row } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import FormCreateBlog from '../components/blog/FormCreateBlog'
import PreviewBlog from '../components/blog/PreviewBlog'
import ReactEditor from '../components/editor/ReactEditor'
import Loading from '../components/notification/Loading'
import { createBlog } from '../redux/actions/homeBlogsAction'
import { IBlog, RootStore } from '../utils/TypeScript'
import { validCreateBlog } from '../utils/Valid'

const initState = {
	user: '',
	title: '',
	content: '',
	description: '',
	thumbnail: '',
	category: '',
	createdAt: new Date().toISOString()
}

const CreateBlog = () => {
	const [blog, setBlog] = useState<IBlog>(initState);
	const [body, setBody] = useState("")
	const [text, setText] = useState("")

	const divRef = useRef<HTMLDivElement>(null)

	const { auth } = useSelector((state: RootStore) => state)
	const dispatch = useDispatch();

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

		dispatch(createBlog(newData, auth?.access_token))
	}

	// if(!auth.access_token) return <NotFound />
	return (
		<div style={{ margin: '40px 0' }}>
			<Loading loadFull>
				<Row gutter={[16, 16]}>
					<Col span={12}>
						<h3>Tạo blog</h3>
						<FormCreateBlog blog={blog} setBlog={setBlog} />
					</Col>
					<Col span={12}>
						<h3>Xem trước</h3>
						<PreviewBlog blog={blog} />
					</Col>
					<Col span={24}>
						<ReactEditor setBody={setBody} />
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
							Tạo Bài Đăng
						</Button>
					</Col>
				</Row>
			</Loading>
		</div>
	)
}

export default CreateBlog;