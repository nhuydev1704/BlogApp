import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface IProps {
	body: string
	setBody: (value: string) => void;
}

const ReactEditor: React.FC<IProps> = ({ body, setBody }) => {
	const modules = {
		toolbar: { container },
	};

	return (
		<div>
			<ReactQuill
				theme="snow"
				modules={modules}
				placeholder="Viết nội dung..."
				onChange={(e) => setBody(e)}
				value={body}
			/>
		</div>
	);
};

let container = [
	[{ font: [] }],
	["bold", "italic", "underline", "strike"], // toggled buttons
	["blockquote", "code-block", "link"],
	[{ color: [] }, { background: [] }], // dropdown with defaults from theme
	[{ script: "sub" }, { script: "super" }], // superscript/subscript
];

export default ReactEditor;
