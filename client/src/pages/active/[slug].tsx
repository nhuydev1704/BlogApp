import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import { IParams } from '../../utils/TypeScript'
import { postAPI } from '../../utils/FetchData'
import { Result, Button } from 'antd'

const ActiveEmail = () => {
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")

    const { slug }: IParams = useParams()

    useEffect(() => {
        if (slug) {
            postAPI('active', { active_token: slug })
                .then(res => setSuccess(res.data.msg))
                .catch(err => setError(err?.response?.data?.msg))
        }
    }, [slug])

    return (
        <div style={{ display: 'flex', justifyContent: 'center', height: '70vh', alignItems: 'center' }}>
            <Card style={{ width: 400, height: 300, borderRadius: '10px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }} variant="outlined">
                {success && <Result
                    status="success"
                    title={success}
                    subTitle="Chúc mừng bạn đã xác thực tài khoản thành công!"
                    extra={
                        <Link to="/login">
                            <Button type="primary" key="console">
                                Đăng nhập
                            </Button>
                        </Link>
                    }
                />
                }

                {error && <Result
                    status="error"
                    title={error}
                    subTitle="Bạn kiểm tra lại thông tin nha."
                    extra={
                        <Link to="/register">
                            <Button type="primary" key="console">
                                Đăng ký lại
                            </Button>
                        </Link>
                    }
                />
                }
            </Card>
            <div style={{ position: 'fixed', top: 0, left: 0, bottom: 0, right: 0, background: '#ddd', zIndex: -1 }}></div>
        </div>
    )
}

export default ActiveEmail
