import React from "react";
import Paper from "@material-ui/core/Paper";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import { IBlog } from "../../utils/TypeScript";

interface IProps {
	blog: IBlog;
}
const PreviewBlog: React.FC<IProps> = ({ blog }) => {
	return (
		<Paper
			elevation={0}
			style={{
				padding: "0 10px",
				border: "1px solid #ccc",
				margin: "8px 0",
			}}
		>
			<Row
				justify="space-between"
				style={{ minHeight: "150px" }}
				align="middle"
				gutter={[16, 16]}
			>
				<Col span={8}>
					{blog?.thumbnail && (
						<>
							{typeof blog?.thumbnail === "string" ? (
								<Link to={`/blog/${blog._id}`}>
									<img
										src={blog?.thumbnail}
										alt="thumbnail"
										style={{
											objectFit: "cover",
											width: "100%",
											height: "100%",
										}}
									/>
								</Link>
							) : (
								<img
									src={URL.createObjectURL(blog?.thumbnail)}
									alt="thumbnail"
									style={{
										objectFit: "cover",
										width: "100%",
										height: "100%",
									}}
								/>
							)}
						</>
					)}
				</Col>
				<Col span={16}>
					<h4 className="card-title">{blog.title}</h4>
					<p className="card-text">{blog.description}</p>
					<p className="card-text">
						<small className="text-muted">
							{blog?.title &&
								new Date(blog.createdAt).toLocaleString()}
						</small>
					</p>
				</Col>
			</Row>
		</Paper>
	);
};

export default PreviewBlog;
