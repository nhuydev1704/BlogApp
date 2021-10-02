import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import { Col, Popconfirm, Row } from 'antd';
import { get } from 'lodash';

const ListCategory = (props: any) => {
    const dataCategories = get(props, 'dataCategories', []);
    return (
        <Col span={24}>
            {
                dataCategories && dataCategories.length > 0 &&
                dataCategories.map((item: any) => {
                    return <Paper
                        key={item._id!}
                        elevation={0}
                        style={{ padding: '0 10px', border: '1px solid #ccc', margin: '8px 0' }}
                    >
                        <Row justify="space-between" align="middle">
                            {item.name}
                            <Row>
                                <Popconfirm
                                    placement="bottom"
                                    title="Bạn chắc chứ?"
                                    onConfirm={() => props.onConfirm(item._id!)}
                                    onCancel={() => console.log('')}
                                    okText="Đồng ý"
                                    cancelText="Hủy"
                                >
                                    <Tooltip title="Xóa" placement="top">
                                        <IconButton color="secondary">
                                            <DeleteForeverTwoToneIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Popconfirm>
                                <Tooltip title="Sửa" placement="top">
                                    <IconButton onClick={() => props.onEdit(item.name!, item?._id!)} color="primary">
                                        <EditTwoToneIcon />
                                    </IconButton>
                                </Tooltip>
                            </Row>
                        </Row>
                    </Paper>
                })
            }
        </Col>
    )
}

export default ListCategory