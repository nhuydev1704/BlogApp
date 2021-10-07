import React from 'react'
import { IBlog } from '../../utils/TypeScript'

interface IProps {
	blog: IBlog
}

const DisplayBlog: React.FC<IProps> = ({blog}) => {
	return (
		<div>
			<h2>{blog.title}</h2>
			<div>
				<small>
					{
						typeof(blog.user) !== 'string' &&
						`Người tạo: ${blog.user.name}`
					}
				</small>

				<small>
					{
						typeof(blog.user) !== 'string' &&
						`Ngày tạo: ${new Date(blog.createdAt).toLocaleString()}`
					}
				</small>
			</div>
			<div dangerouslySetInnerHTML={{
				__html: blog.content
			}} />
		</div>
	)
}

export default DisplayBlog