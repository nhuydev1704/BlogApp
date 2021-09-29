import React, { useState, useEffect} from 'react'
import { Row, Col } from 'antd'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { Popconfirm } from 'antd';
import ListCategory from '../components/category/ListCategory'
import { SubmitHandler, useForm } from "react-hook-form";
import { getAPI } from '../utils/FetchData';
import { ICategory } from '../utils/TypeScript'

type Inputs = {
    name: string,
};

const Category = () => {
    const [dataCategories, setDataCategories] = useState([]);
    const [nameCategory, setNameCategory] = useState('');
    const [dataEdit, setDataEdit] = useState<ICategory | null>(null);
    const { register, handleSubmit, reset, setValue } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = data => {
        console.log(data)
    }

    useEffect(()=> {
        const getCategories = async () => {
            const res = await getAPI('category');
            setDataCategories(res.data.categories)
        }

        getCategories();
    },[])

    const onConfirm = (id:string) => {
        
    }

    const onEdit = async (name:string) => {
        setNameCategory(name)
        setValue("name", name)
        console.log(name)
    }

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
                                    <TextField 
                                    {...register("name")} 
                                    style={{ width: '100%' }} 
                                    id="standard-basic" 
                                    label="Nhập tên danh mục"
                                    value={nameCategory}
                                    onChange={e => setNameCategory(e.target.value)}
                                    />
                                </Col>
                                <Col span={3}>
                                    <Button onClick={handleSubmit(onSubmit)} variant="contained" color="primary">
                                        Thêm
                                    </Button>
                                </Col>
                            </Row>
                        </form>
                        <Row justify="center" style={{ marginTop: '20px' }}>
                            <ListCategory
                             dataCategories={dataCategories} 
                             onConfirm={onConfirm}
                             onEdit={onEdit}
                             />
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row >
    )
}

export default Category
