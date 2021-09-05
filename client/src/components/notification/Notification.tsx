import React from 'react'
import { RootStore } from '../../utils/TypeScript'
import { useSelector } from 'react-redux';

const Notification = () => {
    const { alert } = useSelector((state: RootStore) => state)
    let variant: any = "";

    if (alert.success && alert.success !== "") {
        variant = "success"
        // enqueueSnackbar(alert.success, { variant })
    } else if (alert.errors && alert.errors !== "") {
        variant = "error"

        // enqueueSnackbar(alert.errors, { variant })
    }
    return (
        <>
        </>
    );
}

export default Notification
