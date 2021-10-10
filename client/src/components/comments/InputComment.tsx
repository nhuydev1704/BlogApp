import { Button, Row } from 'antd';
import React, { useEffect, useRef, useState } from "react";
import { IComment } from '../../utils/TypeScript';
import ReactEditor from "../editor/ReactEditor";

interface IProps {
	callback: (body: string) => void
	edit?: IComment
	setEdit?: (edit?: IComment) => void
}

const InputComment: React.FC<IProps> = ({ callback, edit, setEdit }) => {
	const [body, setBody] = useState("");
	const divRef = useRef<HTMLDivElement>(null)

	const handleSubmit = () => {
		const div = divRef.current;
		const text = (div?.innerText as string)
		if (!text.trim()) {
			if (setEdit) return setEdit(undefined)
			return;
		}

		callback(body)
		setBody('')

	}

	useEffect(() => {
		if (edit) setBody(edit.content)
	}, [edit])

	return (
		<div style={{ marginTop: '6px' }}>
			<ReactEditor body={body} setBody={setBody} />
			<div
				ref={divRef}
				dangerouslySetInnerHTML={{
					__html: body
				}}
				style={{ display: 'none' }}
			/>
			<Row justify="end" style={{ marginTop: '6px' }}>
				<Button
					type="primary"
					onClick={handleSubmit}
				>
					{edit ? 'Cập nhật' : 'Bình luận'}
				</Button>
			</Row>
		</div>
	);
};

export default InputComment;
