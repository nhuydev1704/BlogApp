import { TextField } from '@material-ui/core'
import React from 'react'

const FormForgotPassword = (props: any) => {
    return (
        <>
            <TextField 
            {...props.register("account")} 
            className={props.classes.input} 
            id="standard-search1" 
            label="Email / Số điện thoại" 
            type="search" />
        </>
    )
}

export default FormForgotPassword
