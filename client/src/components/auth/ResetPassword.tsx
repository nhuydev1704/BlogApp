import { TextField } from '@material-ui/core'
import React from 'react'

const ResetPassword = (props: any) => {
    return (
        <>
            <TextField
                id="standard-password-input1"
                label="Mật khẩu mới"
                type="password"
                autoComplete="current-password"
                {...props.register("password")}
            />
            <TextField
                id="standard-password-input2"
                label="Xác nhận mật khẩu mới"
                type="password"
                autoComplete="current-password"
                {...props.register("cfpassword")}
            />
        </>
    )
}

export default ResetPassword
