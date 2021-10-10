import { Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from "react-router-dom"
import CardBlog from '../../components/cardBlog/CardBlog'
import Loading from '../../components/notification/Loading'
import PaginationComponent from '../../components/pagination'
import { getBlogsByCategory } from '../../redux/actions/homeBlogsAction'
import { IBlog, IParams, RootStore } from '../../utils/TypeScript'

const BlogsCategory = () => {

	const { category, blogByCategory } = useSelector((state: RootStore) => state)

	const dispatch = useDispatch()

	const { slug } = useParams<IParams>()

	const [categoryId, setCategoryId] = useState("")
	const [blogs, setBlogs] = useState<IBlog[]>()
	const [total, setTotal] = useState(0)
	const [loading, setLoading] = useState(false)

	const history = useHistory()
	const { search } = history.location

	useEffect(() => {
		const categoryItem = category.find(item => item.name === slug)
		if (categoryItem) setCategoryId(categoryItem._id)
	}, [slug, category])

	useEffect(() => {
		setLoading(true)
		if (!categoryId) return;

		if (blogByCategory.every(item => item.id !== categoryId)) {
			dispatch(getBlogsByCategory(categoryId, search))
		} else {
			const data = blogByCategory.find(item => item.id === categoryId)
			if (!data) return;
			setBlogs(data.blogs)
			setTotal(data.total)
			if (data.search) history.push(data.search)
		}
		setLoading(false)
	}, [categoryId, blogByCategory, dispatch, search, history])

	const handlePagination = async (page: number) => {
		const search = `?page=${page}`
		await dispatch(getBlogsByCategory(categoryId, search))
	}

	if (!blogs) return <Loading loadFull loadingProps={loading} />;
	return (
		<Loading loadFull loadingProps={loading}>
			<CardBlog blogs={blogs} />
			<Row justify="end" style={{ marginTop: '20px' }}>
				{
					total > 1 &&
					<PaginationComponent total={total} callback={handlePagination} />
				}
			</Row>
		</Loading>
	)
}

export default BlogsCategory