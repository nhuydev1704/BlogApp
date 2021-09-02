import { TextField } from '@material-ui/core'
import React from 'react'

const LoginSms = (props: any) => {
    return (
        <>
            <TextField
                id="standard-password-input"
                label="Số điện thoại"
                type="search"
                autoComplete="current-password"
                {...props.register("account")}
            />
        </>
    )
}

export default LoginSms
