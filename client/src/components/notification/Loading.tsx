import { Spin } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../../utils/TypeScript';
import {get} from 'lodash'

const Loading = (props: any) => {
    const loadFull = get(props, 'loadFull', '')

    const { alert } = useSelector((state: RootStore) => state)
    return (
        <Spin 
            className={loadFull && 'settingSpin'}
            spinning={alert.loading || false} 
            tip="Vui lòng chờ..."
        >
            {props.children}
        </Spin>
    )
}

export default Loading
