import React from 'react'
import { Col, Image, Row, Tooltip, Divider, Button } from 'antd'
import {get} from 'lodash'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Card from '@mui/material/Card';

const CardBlog = (props: any) => {
	const blogs = get(props, 'blogs', [])

	return (
		<Row gutter={[16, 16]} style={{ marginTop: '10px' }}>
			{
                blogs && blogs.length > 0 && blogs.map(item => (
                    <Col xl={6} md={12} xs={24} lg={12} key={item._id}>
                        <Card style={{
                            padding: '16px',
                            border: '1px solid rgb(0 0 0 / 6%)',
                            borderBottom: 'none',
                            borderRadius: '10px',
                            background: 'rgb(245 245 245)'
                        }}>
                            <h3>
                                <Tooltip placement="top" title={item.title}>
                                    <Link
                                        to={`/blog/${item._id}`}
                                    >
                                        {item.title.slice(0, 26)}...
                                        {
                                            typeof (item.thumbnail) === 'string' &&
                                            <img
                                                src={`${item.thumbnail}`}
                                                className="style_img-homeblogs"
                                                alt="thumbnail"
                                            />
                                        }
                                    </Link>
                                </Tooltip>
                            </h3>
                            {
                                typeof (item.user) !== 'string' &&
                                <Row
                                    gutter={[0, 16]}
                                    style={{ marginTop: '4px' }}
                                >
                                    <Col span={14}>
                                        <Link to={`/profile/${item.user._id}`}>
                                            Tạo bởi: {item?.user?.name!}
                                        </Link>
                                    </Col>
                                    <Col
                                        span={10}
                                        style={{
                                            textAlign: 'right',
                                            color: '#aaa',
                                            fontSize: '.9rem'
                                        }}>
                                        {
                                            moment(item?.createdAt).format("YYYY-MM-DD hh:mm:ss")
                                        }
                                    </Col>
                                </Row>
                            }
                            <span
                                style={{
                                    fontSize: '1rem'
                                }}>
                                {item.description.slice(0, 120)}...
                            </span>
                        </Card>
                    </Col>
                ))
            }
		</Row>
	)
}

export default CardBlog