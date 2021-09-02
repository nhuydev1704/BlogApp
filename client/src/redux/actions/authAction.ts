import { IUserLogin } from "../../utils/TypeScript"
import { postAPI } from "../../utils/FetchData"
import { AUTH, IAuthType } from "../types/authType"
import { Dispatch } from "redux"


export const login = (userLogin: IUserLogin) => async (dispatch: Dispatch<IAuthType>) => {
    try {
        const url = `login`
        const res = await postAPI(url, userLogin)

        dispatch({
            type: AUTH,
            payload: {
                token: res.data.access_token,
                user: res.data.user
            }
        })

    } catch (err: any) {
        console.log(err.response.data.msg);
    }
}