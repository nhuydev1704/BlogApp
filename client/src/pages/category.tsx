import React from 'react'
import { Row, Col } from 'antd'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';

const Category = () => {
    return (
        <Row justify="center" style={{ marginTop: '40px' }}>
            <Col span={12}>
                <Typography variant="h4" gutterBottom style={{ textAlign: 'center' }}>
                    Danh mục Blogs
                </Typography>
                <Row justify="center">
                    <Col span={24}>
                        <form noValidate autoComplete="off">
                            <Row
                                align="bottom"
                                justify="space-between"
                                gutter={[16, 16]}
                            >
                                <Col span={21}>
                                    <TextField style={{ width: '100%' }} id="standard-basic" label="Nhập tên danh mục" />
                                </Col>
                                <Col span={3}>
                                    <Button variant="contained" color="primary">
                                        Thêm
                                    </Button>
                                </Col>
                            </Row>
                        </form>
                        <Row justify="center" style={{ marginTop: '20px' }}>
                            <Col span={22}>
                                <Paper elevation={2}>
                                    <Row justify="space-between">
                                        heloo
                                        <Row>
                                            <div>
                                                <DeleteForeverTwoToneIcon />
                                            </div>
                                            <div>
                                                <EditTwoToneIcon />
                                            </div>
                                        </Row>

                                    </Row>
                                </Paper>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row >
    )
}

export default Category
