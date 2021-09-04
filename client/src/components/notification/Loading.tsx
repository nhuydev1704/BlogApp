import { Spin } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../../utils/TypeScript';

const Loading = (props: any) => {
    const { alert } = useSelector((state: RootStore) => state)
    return (
        <Spin spinning={alert.loading || false} tip="Vui lòng chờ...">
            {props.children}
        </Spin>
    )
}

export default Loading
