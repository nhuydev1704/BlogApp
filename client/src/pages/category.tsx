import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Col, Row } from 'antd';
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import ListCategory from '../components/category/ListCategory';
import NotFound from '../components/global/NotFound';
import Loading from '../components/notification/Loading';
import { createCategory, deleteCategory, updateCategory } from '../redux/actions/categoryAction';
import { RootStore } from '../utils/TypeScript';

type Inputs = {
    name: string,
    id: string
};

const Category = () => {
    const [nameCategory, setNameCategory] = useState('');
    const [idCategory, setIdCategory] = useState('')
    const [isEdit, setIsEdit] = useState(false)
    const { register, handleSubmit, reset, setValue } = useForm<Inputs>();

    const { auth, category } = useSelector((state: RootStore) => state);
    const dispatch = useDispatch();

    const onSubmit: SubmitHandler<Inputs> = data => {
        if (!auth.access_token || !data.name) {
            setIsEdit(false);
            setNameCategory('')
            reset()
            return
        };
        if (idCategory) {
            dispatch(updateCategory({ _id: idCategory, name: data.name }, auth.access_token))
            setIdCategory('')
            reset()
            setIsEdit(false)
        } else {
            dispatch(createCategory(data.name, auth.access_token))
            reset()
        }
        setNameCategory('')
    }
    const onConfirm = (id: string) => {
        if (!auth.access_token || !id) return;
        dispatch(deleteCategory(id, auth.access_token))
    }

    const onEdit = async (name: string, id: string) => {
        setIdCategory(id)
        setNameCategory(name)
        setIsEdit(true)
        setValue("name", name)
    }

    const handleBlur = () => {
        setIsEdit(false);
        reset()
    }

    if (auth.user?.role !== 'admin') return <NotFound />
    return (
        <Loading>
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
                                        <TextField
                                            {...register("name")}
                                            style={{ width: '100%' }}
                                            id="standard-basic"
                                            label="Nhập tên danh mục"
                                            value={nameCategory}
                                            onBlur={handleBlur}
                                            onChange={e => setNameCategory(e.target.value)}
                                        />
                                    </Col>
                                    <Col span={3}>
                                        <Button onClick={handleSubmit(onSubmit)} variant="contained" color="primary">
                                            {isEdit ? 'Sửa' : 'Thêm'}
                                        </Button>
                                    </Col>
                                </Row>
                            </form>
                            <Row justify="center" style={{ marginTop: '20px' }}>
                                <ListCategory
                                    dataCategories={category}
                                    onConfirm={onConfirm}
                                    onEdit={onEdit}
                                />
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Loading>
    )
}

export default Category
