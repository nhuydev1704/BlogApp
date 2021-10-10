import { notification } from 'antd'
import { Dispatch } from "redux"
import { getAPI, patchAPI } from '../../utils/FetchData'
import { checkImage, imageUpload } from '../../utils/imageUpload'
import { ALERT, IAlertType } from "../types/alertType"
import { AUTH, IAuth, IAuthType } from '../types/authType'
import {
    GET_OTHER_INFO,
    IGetOtherInfoType
} from '../types/profileType'
import { checkTokenExp } from '../../utils/checkTokenExp';

export const updateUser = (avatar: File, name: string, auth: IAuth) =>
    async (dispatch: Dispatch<IAuthType | IAlertType>) => {
        if (!auth.access_token || !auth.user) return;

        const result = await checkTokenExp(auth.access_token, dispatch)
        const access_token = result ? result : auth.access_token

        let url = '';
        try {
            dispatch({ type: ALERT, payload: { loading: true } })
            if (avatar) {
                const check = checkImage(avatar)
                if (check) {
                    dispatch({ type: ALERT, payload: { loading: false } })
                    return notification['error']({
                        message: "Blog Nguyễn Như Ý",
                        description: check,
                    });
                }

                const photo = await imageUpload(avatar)
                url = photo.url
            }

            dispatch({
                type: AUTH,
                payload: {
                    access_token: access_token,
                    user: {
                        ...auth.user,
                        avatar: url ? url : auth.user.avatar,
                        name: name ? name : auth.user.name
                    }
                }
            })

            const res = await patchAPI('/user',
                { avatar: url ? url : auth.user.avatar, name: name ? name : auth.user.name },
                access_token
            )
            if (res.status === 200) {
                notification['success']({
                    message: "Blog Nguyễn Như Ý",
                    description: res.data.msg,
                });
            }

            dispatch({ type: ALERT, payload: { loading: false } })

        } catch (err: any) {
            dispatch({ type: ALERT, payload: { loading: false } })
            notification['error']({
                message: "Blog Nguyễn Như Ý",
                description: err?.response?.data?.msg,
            });
        }
    }

export const resetPassword = (password: string, token: string) =>
    async (dispatch: Dispatch<IAuthType | IAlertType>) => {
        try {
            const result = await checkTokenExp(token, dispatch)
            const access_token = result ? result : token
            dispatch({ type: ALERT, payload: { loading: true } })

            const res = await patchAPI('reset_password', { password }, access_token)
            if (res.status === 200) {
                notification['success']({
                    message: "Blog Nguyễn Như Ý",
                    description: res.data.msg,
                });
            }

            dispatch({ type: ALERT, payload: { loading: false } })

        } catch (err: any) {
            dispatch({ type: ALERT, payload: { loading: false } })
            notification['error']({
                message: "Blog Nguyễn Như Ý",
                description: err?.response?.data?.msg,
            });
        }
    }

export const getOtherUser = (id: string) =>
    async (dispatch: Dispatch<IGetOtherInfoType | IAlertType>) => {
        try {
            dispatch({ type: ALERT, payload: { loading: true } })

            const res = await getAPI(`user/${id}`)

            if (res.status === 200) {
                dispatch({
                    type: GET_OTHER_INFO,
                    payload: res.data
                })
            }

            dispatch({ type: ALERT, payload: { loading: false } })

        } catch (err: any) {
            dispatch({ type: ALERT, payload: { loading: false } })
            notification['error']({
                message: "Blog Nguyễn Như Ý",
                description: err?.response?.data?.msg,
            });
        }
    }