import { IUserLogin, IUserRegister } from "../../utils/TypeScript"
import { postAPI } from "../../utils/FetchData"
import { AUTH, IAuthType } from "../types/authType"
import { ALERT, IAlertType } from "../types/alertType"
import { Dispatch } from "redux"
import { notification } from 'antd';


export const login = (userLogin: IUserLogin) => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    try {
        dispatch({
            type: ALERT,
            payload: { loading: true }
        })
        const url = `login`
        const res = await postAPI(url, userLogin)
        if (res.status === 200) {
            notification['success']({
                message: "Blog Nguyễn Như Ý",
                description: res.data.msg,
            });
        }

        dispatch({
            type: ALERT,
            payload: { loading: false }
        })

        dispatch({
            type: AUTH,
            payload: {
                token: res.data.access_token,
                user: res.data.user
            }
        })

    } catch (err: any) {
        dispatch({
            type: ALERT,
            payload: { loading: false }
        })
        notification['error']({
            message: "Blog Nguyễn Như Ý",
            description: err?.response?.data?.msg,
        });
    }
}

export const registerUser = (userRegister: IUserRegister) => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    try {
        dispatch({
            type: ALERT,
            payload: { loading: true }
        })

        const url = `register`
        const res = await postAPI(url, userRegister)
        if (res.status === 200) {
            notification['success']({
                message: "Blog Nguyễn Như Ý",
                description: res.data.msg,
            });
        }

        dispatch({
            type: ALERT,
            payload: { loading: false }
        })

    } catch (err: any) {
        dispatch({
            type: ALERT,
            payload: { loading: false }
        })
        notification['error']({
            message: "Blog Nguyễn Như Ý",
            description: err?.response?.data?.msg
                ? typeof err?.response?.data?.msg !== 'string' ? err?.response?.data?.msg[0] : err?.response?.data?.msg : '',
        });
    }
}