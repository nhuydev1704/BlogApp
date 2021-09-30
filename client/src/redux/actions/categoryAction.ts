import { Dispatch } from 'redux'
import { ALERT, IAlertType } from '../types/alertType'
import {
    CREATE_CATEGORY,
    ICategoryType,
    DELETE_CATEGORY,
    UPDATE_CATEGORY,
    GET_CATEGORIES
} from '../types/categoryType'
import { notification } from 'antd';
import { ICategory } from '../../utils/TypeScript'

import { postAPI, getAPI, deleteAPI, patchAPI } from '../../utils/FetchData'

export const getCategory = () => async (dispatch: Dispatch <IAlertType | ICategoryType>) => {
    try {
    	const res = await getAPI('category')

    	dispatch({
    		type: GET_CATEGORIES,
    		payload: res.data.categories
    	})

    } catch (err: any) {
        notification['error']({
            message: "Blog Nguyễn Như Ý",
            description: err?.response?.data?.msg,
        });
    }
}

export const createCategory = (name: string, token: string) => async(dispatch: Dispatch<IAlertType | ICategoryType>) => {
	try {
		dispatch({ type: ALERT, payload: { loading: true }})

    	const res = await postAPI('category', {name}, token)
    	if(res.status === 200) {
    		notification['success']({
                message: "Blog Nguyễn Như Ý",
                description: res.data.msg,
            });
    	}

    	dispatch({
    		type: CREATE_CATEGORY,
    		payload: res.data.newCategory
    	})

    	 dispatch({ type: ALERT, payload: { loading: false }})

    } catch (err: any) {
    	 dispatch({ type: ALERT, payload: { loading: false }})
        notification['error']({
            message: "Blog Nguyễn Như Ý",
            description: err?.response?.data?.msg,
        });
    }
}

export const updateCategory = (data: ICategory, token: string) => async(dispatch: Dispatch<IAlertType | ICategoryType>) => {
	try {
		dispatch({ type: ALERT, payload: { loading: true }})

		dispatch({ type: UPDATE_CATEGORY, payload: data })

    	const res = await patchAPI(`category/${data._id}`,{name: data.name}, token)
    	if(res.status === 200) {
    		notification['success']({
                message: "Blog Nguyễn Như Ý",
                description: res.data.msg,
            });
    	}

    	 dispatch({ type: ALERT, payload: { loading: false }})

    } catch (err: any) {
    	 dispatch({ type: ALERT, payload: { loading: false }})
        notification['error']({
            message: "Blog Nguyễn Như Ý",
            description: err?.response?.data?.msg,
        });
    }
}

export const deleteCategory = (id: string, token: string) => async(dispatch: Dispatch<IAlertType | ICategoryType>) => {
	try {
		dispatch({ type: ALERT, payload: { loading: true }})

		dispatch({ type: DELETE_CATEGORY, payload: id })

    	const res = await deleteAPI(`category/${id}`, token)
    	if(res.status === 200) {
    		notification['success']({
                message: "Blog Nguyễn Như Ý",
                description: res.data.msg,
            });
    	}

    	 dispatch({ type: ALERT, payload: { loading: false }})

    } catch (err: any) {
    	 dispatch({ type: ALERT, payload: { loading: false }})
        notification['error']({
            message: "Blog Nguyễn Như Ý",
            description: err?.response?.data?.msg,
        });
    }
}