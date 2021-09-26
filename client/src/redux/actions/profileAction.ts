import { IUserProfile } from '../../utils/TypeScript'
import { AUTH, IAuth } from '../types/authType'
import { IAuthType } from "../types/authType"
import { ALERT, IAlertType } from "../types/alertType"
import { Dispatch } from "redux"
import { notification } from 'antd';
import { checkImage, imageUpload } from '../../utils/imageUpload'
import { patchAPI } from '../../utils/FetchData'

export const updateUser = (avatar: File, name: string, auth: IAuth) =>
    async (dispatch: Dispatch<IAuthType | IAlertType>) => {
        if (!auth.access_token || !auth.user) return;
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
                    access_token: auth.access_token,
                    user: {
                        ...auth.user,
                        avatar: url ? url : auth.user.avatar,
                        name: name ? name : auth.user.name
                    }
                }
            })

            const res = await patchAPI('/user',
                { avatar: url ? url : auth.user.avatar, name: name ? name : auth.user.name },
                auth.access_token
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
            dispatch({ type: ALERT, payload: { loading: true } })

            const res = await patchAPI('reset_password', { password }, token)
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