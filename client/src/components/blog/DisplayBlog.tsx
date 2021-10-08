import React from 'react'
import { IBlog } from '../../utils/TypeScript'
import {Row, Col} from 'antd'
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom'

interface IProps {
	blog: IBlog
}

const DisplayBlog: React.FC<IProps> = ({blog}) => {
	return (
		<div>
				<h2 style={{fontSize: '2rem', fontWeight: 700}}>{blog.title}</h2>
				<Row justify="space-between" style={{marginBottom: '20px'}}>
					<div style={{display: 'flex', alignItems: 'center'}}>
						{
							typeof(blog.user) !== 'string' && <Avatar
		                        alt="blog user"
		                        src={blog.user.avatar}
		                        sx={{ width: 55, height: 55 }}
		                    />
						}
						<div style={{marginLeft: "8px"}}>
						 	
							<h3 style={{fontWeight: 500}}>
								{
									typeof(blog.user) !== 'string' &&
									<Link to={`/profile/${blog.user._id}`}>
                                        {blog.user.name}
                                    </Link>
								}
							</h3>

							<h5 style={{color: '333'}}>
								{
									typeof(blog.user) !== 'string' &&
									`${new Date(blog.createdAt).toLocaleString()}`
								}
							</h5>
						</div>	
					</div>
					<div>
						chia se
					</div>
				</Row>
				<div dangerouslySetInnerHTML={{
					__html: blog.content
				}} />
				<h2 style={{fontSize: '2rem', fontWeight: 700}}>Bình luận</h2>
				
		</div>
	)
}

export default DisplayBlog