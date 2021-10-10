import { IBlog } from './TypeScript'


export const validCreateBlog = ({
	title, content, description, thumbnail, category
}: IBlog) => {
	const err: string[] = []

	if (title.trim().length < 10) {
		err.push("Tiều đề từ 10 kí tự trở lên.")
	} else if (title.trim().length > 50) {
		err.push("Tiều đề tối thiểu 50 kí tự.")
	}

	if (content.trim().length < 2000) {
		err.push("Bài viết phải lớn hơn 2000 từ.")
	}

	if (description.trim().length < 50) {
		err.push("Mô tả từ 10 kí tự trở lên.")
	} else if (description.trim().length > 200) {
		err.push("Mô tả tối thiểu 200 kí tự.")
	}

	if (!thumbnail) {
		err.push("Hình ảnh không được bỏ trống.")
	}

	if (!category) {
		err.push("Danh mục chưa chọn.")
	}

	return {
		errMsg: err,
		errLength: err.length
	}
}

export const shallowEqual = (onject1: any, object2: any) => {
	const keys1 = Object.keys(onject1)
	const keys2 = Object.keys(object2)

	if (keys1.length !== keys2.length) {
		return false;
	}

	for (let key of keys1) {
		if (onject1[key] !== object2[key]) {
			return false
		}
	}

	return true;
}