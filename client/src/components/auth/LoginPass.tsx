import { TextField } from '@material-ui/core'
import React from 'react'

const LoginPass = (props: any) => {
    return (
        <>
            <TextField {...props.register("account")} className={props.classes.input} id="standard-search1" label="Email hoặc số điện thoại" type="search" />
            <TextField
                id="standard-password-input"
                label="Mật khẩu"
                type="password"
                autoComplete="current-password"
                {...props.register("password")}
            />
        </>
    )
}

export default LoginPass
