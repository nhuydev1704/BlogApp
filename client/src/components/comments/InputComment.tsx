import React, { useState, useRef } from "react";
import ReactEditor from "../editor/ReactEditor";
import {Button, Row} from 'antd'

interface IProps {
	callback: (body: string) => void
}

const InputComment: React.FC<IProps> = ({callback}) => {
	const [body, setBody] = useState("");
	const divRef = useRef<HTMLDivElement>(null)

	const handleSubmit = () => {
		const div = divRef.current;
		const text = (div?.innerText as string)
		if(!text.trim()) return;

		callback(body)
		console.log(body)

		setBody('')

	}

	return (
		<div>
			<ReactEditor body={body} setBody={setBody} />
			<div
				 ref={divRef}
				 dangerouslySetInnerHTML={{
				 	__html: body
				 }}
				 style={{display: 'none'}}
			 />
			 <Row justify="end" style={{marginTop: '6px'}}>
			 	<Button
			 		type="primary"
			 		onClick={handleSubmit}
			 	>
			 		Bình luận
			 	</Button>
			 </Row>
		</div>
	);
};

export default InputComment;
