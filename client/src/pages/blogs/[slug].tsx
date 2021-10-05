import React, {useState, useEffect} from 'react'
import { useParams, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import {Row} from 'antd'
import { RootStore, IParams, IBlog } from '../../utils/TypeScript'
import { getBlogsByCategory } from '../../redux/actions/homeBlogsAction'
import Loading from '../../components/notification/Loading'
import NotFound from '../../components/global/NotFound';
import CardBlog from '../../components/cardBlog/CardBlog'
import PaginationComponent from '../../components/pagination'

const BlogsCategory = () => {

	const {auth, category, blogByCategory} = useSelector((state: RootStore) => state)

	const dispatch = useDispatch()

	const { slug } = useParams<IParams>()

	const [ categoryId, setCategoryId ] = useState("")
	const [blogs, setBlogs] = useState<IBlog[]>()
	const [ total, setTotal ] = useState(0)
	const [loading, setLoading] = useState(false)

	const history = useHistory()
	const { search } = history.location

	useEffect(() => {
		const categoryItem = category.find(item => item.name === slug)
		if(categoryItem) setCategoryId(categoryItem._id)
	}, [slug, category])

	useEffect(() => {
		setLoading(true)
		if(!categoryId) return;

		if(blogByCategory.every(item => item.id !== categoryId)) {
			dispatch(getBlogsByCategory(categoryId, search))
		}else {
			const data = blogByCategory.find(item => item.id === categoryId)
			if(!data) return;
			setBlogs(data.blogs)
			setTotal(data.total)
			if(data.search) history.push(data.search)
		}
		setLoading(false)
	}, [categoryId, blogByCategory, dispatch , search, history])

	const handlePagination = (page: number) => {
		const searchPage = `?page=${page}`
		dispatch(getBlogsByCategory(categoryId, searchPage))
	}

	if(!blogs) return <Loading loadFull loadingProps={loading} />;
	return (
		<Loading loadFull loadingProps={loading}>
			<CardBlog blogs={blogs} />
			<Row justify="end" style={{marginTop: '20px'}}>
				{
					total > 1 &&
					<PaginationComponent total={total} callback={handlePagination} />
				}
			</Row>
		</Loading>
	)
}

export default BlogsCategory