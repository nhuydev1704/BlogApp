import { UploadOutlined } from "@ant-design/icons";
import { TextField } from "@material-ui/core";
import { Button, Col, Input, Row, Select, Upload } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { IBlog, RootStore } from "../../utils/TypeScript";
const { TextArea } = Input;
const { Option } = Select;

interface IProps {
	blog: IBlog;
	setBlog: (blog: IBlog) => void;
}

const FormCreateBlog: React.FC<IProps> = ({ blog, setBlog }) => {
	const { category } = useSelector((state: RootStore) => state);

	const handleChangeInput = (e: any) => {
		const { value, name } = e.target;
		setBlog({ ...blog, [name]: value });
	};

	const handleChangeSelect = (value: string) => {
		setBlog({ ...blog, category: value });
	};

	const propsUpload = {
		name: "file",
		action: "",
		maxCount: 1,
		multiple: false,
		onChange(info: any) {
			if (info.file.status !== "uploading") {
				const fileList = [...info.fileList].slice(-1);
				setBlog({ ...blog, thumbnail: fileList[0]?.originFileObj });
			}
		},
	};

	return (
		<Row gutter={[16, 16]}>
			<Col span={24}>
				<TextField
					size="small"
					variant="outlined"
					fullWidth
					label="Nhập tiêu đề"
					value={blog.title}
					name="title"
					id="fullWidth"
					onChange={handleChangeInput}
				/>
			</Col>

			<Col span={24}>
				<Upload
					style={{ width: "100%" }}
					{...propsUpload}
					accept="image/*"
					beforeUpload={() => false}
				>
					<Button style={{ width: "100%" }} icon={<UploadOutlined />}>
						Chọn ảnh bìa
					</Button>
				</Upload>
			</Col>

			<Col span={24}>
				<TextArea
					onChange={handleChangeInput}
					value={blog.description}
					name="description"
					placeholder="Nhập mô tả"
					showCount
					maxLength={200}
				/>
			</Col>

			<Col span={24}>
				<Select
					showSearch
					value={blog.category}
					style={{ width: "100%" }}
					placeholder="Chọn danh mục"
					optionFilterProp="children"
					onChange={handleChangeSelect}
					filterOption={(input, option) =>
						option?.children
							.toLowerCase()
							.indexOf(input?.toLowerCase()) >= 0
					}
					filterSort={(optionA, optionB) =>
						optionA?.children
							.toLowerCase()
							.localeCompare(optionB?.children.toLowerCase())
					}
				>
					<Option value="">Không chọn</Option>
					{category &&
						category.length > 0 &&
						category.map((item) => (
							<Option key={item._id} value={item._id}>
								{item.name}
							</Option>
						))}
				</Select>
			</Col>
		</Row>
	);
};

export default FormCreateBlog;
