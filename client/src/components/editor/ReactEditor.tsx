import React, { useEffect, useRef, useCallback } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { checkImage, imageUpload } from '../../utils/imageUpload';
import { useDispatch } from 'react-redux';
import { ALERT } from '../../redux/types/alertType';
import {notification} from 'antd'

interface IProps {
  setBody: (value: string) => void
}

const ReactEditor: React.FC<IProps> = ({setBody}) => {
	const quillRef = useRef<ReactQuill>(null)
	const dispatch = useDispatch();

	const modules = {
		toolbar: { container }
	}

	// custom image
	const handleChangeImage = useCallback(() => {
		const input = document.createElement('input')
		input.type = 'file'
		input.accept = "image/*"
		input.click()

		input.onchange = async () => {
			const files = input.files
			if(!files) return notification['error']({
					            message: "Blog Nguyễn Như Ý",
					            description: "Tập tin không tồn tại!",
					        });
			const file = files[0]
			const check = checkImage(file)
			if(check) return notification['error']({
					            message: "Blog Nguyễn Như Ý",
					            description: check,
					        });
			dispatch({ type: ALERT, payload: { loading: true } });
			const photo = await imageUpload(file);

			const quill = quillRef.current;
			const range = quill?.getEditor().getSelection()?.index;
			if(range !== undefined){
				quill?.getEditor().insertEmbed(range, 'image', `${photo.url}`)
			}

			dispatch({ type: ALERT, payload: { loading: true } });
		}
	}, [dispatch])

	useEffect(() => {
		const quill = quillRef.current;
		if(!quill) return;

		let toolbar = quill.getEditor().getModule('toolbar');
		toolbar.addHandler('image', handleChangeImage)
	}, [handleChangeImage])


	return (
		<div>

			<ReactQuill 
				theme="snow"
		        modules={modules}
		        placeholder="Viết nội dung..."
		        onChange={e => setBody(e)}
		        ref={quillRef}
	        />
		</div>
	)
}

let container = [
	[{ 'font': [] }],
	[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
	[{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown

	['bold', 'italic', 'underline', 'strike'],        // toggled buttons
	['blockquote', 'code-block'],
	[{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
	[{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript

	[{ 'list': 'ordered'}, { 'list': 'bullet' }],
	[{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
	[{ 'direction': 'rtl' }],                         // text direction
	[{ 'align': [] }],

	['clean', 'link', 'image','video']    
]

export default ReactEditor