import React,{ useState, useEffect } from 'react'
import {get} from 'lodash'
import Pagination from '@mui/material/Pagination';
import {useHistory} from 'react-router-dom'

const PaginationComponent = (props: any) => {
	const total = get(props, 'total', 0)
	const [ page, setPage ] = useState(1)
	const history = useHistory()

	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		history.push(`?page=${value}`)
	    if(props.callback) {
	    	props.callback(value)
	    }
	};

	useEffect(() => {
		const numPage = history.location.search.slice(6) || 1
	    setPage(Number(numPage));
	}, [history.location.search])

	return (
		<Pagination showLastButton showFirstButton  count={total} page={page} onChange={handleChange} />
	)
}

export default PaginationComponent
