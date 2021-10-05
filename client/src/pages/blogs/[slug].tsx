import React, {useState, useEffect} from 'react'
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import {Row} from 'antd'
import { RootStore, IParams, IBlog } from '../../utils/TypeScript'
import { getBlogsByCategory } from '../../redux/actions/homeBlogsAction'
import Loading from '../../components/notification/Loading'
import NotFound from '../../components/global/NotFound';
import CardBlog from '../../components/cardBlog/CardBlog'
const BlogsCategory = () => {

	const {auth, category, blogByCategory} = useSelector((state: RootStore) => state)

	const dispatch = useDispatch()

	const { slug } = useParams<IParams>()

	const [ categoryId, setCategoryId ] = useState("")
	const [blogs, setBlogs] = useState<IBlog[]>()
	const [ total, setTotal ] = useState(0)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const categoryItem = category.find(item => item.name === slug)
		if(categoryItem) setCategoryId(categoryItem._id)
	}, [slug, category, dispatch])

	useEffect(() => {
		setLoading(true)
		if(!categoryId) return;

		if(blogByCategory.every(item => item.id !== categoryId)) {
			dispatch(getBlogsByCategory(categoryId))
		}else {
			const data = blogByCategory.find(item => item.id === categoryId)
			if(!data) return;
			setBlogs(data.blogs)
			setTotal(data.total)
		}
		setLoading(false)
	}, [categoryId, blogByCategory])

	if(!blogs) return <NotFound />;
	return (
		<Loading loadFull loadingProps={loading}>
			<CardBlog blogs={blogs} />
		</Loading>
	)
}

export default BlogsCategory