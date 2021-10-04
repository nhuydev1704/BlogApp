import React, { useRef, useState } from 'react';
import 'tinymce/tinymce';
import 'tinymce/icons/default';
import 'tinymce/themes/silver';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/table';
import 'tinymce/skins/ui/oxide/skin.min.css';
import 'tinymce/skins/ui/oxide/content.min.css';
import 'tinymce/skins/content/default/content.min.css';
import { Editor } from '@tinymce/tinymce-react';
import { notification } from 'antd'
import { checkImage, imageUpload } from '../../utils/imageUpload';
import { useDispatch } from 'react-redux'
import { ALERT } from '../../redux/types/alertType';

interface IProps {
    body: string,
    setBody: (value: string) => void
}

const TinyEditor: React.FC<IProps> = ({ body, setBody }) => {
    // const editorRef = useRef<any>(null);
    const dispatch = useDispatch()
    const handleEditorChange = (content: any, editor: any) => {
        setBody(content);
    }

    return (
        <>
            <input id="my-file-upload" accept='image/*' type="file" name="my-file-upload" style={{ display: "none" }} />
            <Editor
                // onInit={(evt: any, editor: any) => editorRef.current = editor}
                init={{
                    height: 500,
                    menubar: true,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar: 'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    paste_data_images: true,
                    file_browser_callback_types: 'image',
                    file_picker_callback: async function (callback, value, meta) {
                        console.log(meta)
                        if (meta?.filetype == 'image') {
                            let input: any = document.getElementById('my-file-upload');
                            input.click();
                            input.onchange = async () => {
                                console.log('hehehe')
                                dispatch({ type: ALERT, payload: { loading: true } });
                                var file = input.files[0];
                                const check = await checkImage(file)
                                if (check !== '' && check) {
                                    notification['error']({
                                        message: "Blog Nguyễn Như Ý",
                                        description: check,
                                    });
                                    dispatch({ type: ALERT, payload: { loading: false } });
                                    return;
                                }
                                const photo = await imageUpload(file);
                                console.log(photo)
                                if (photo.url) {
                                    callback(photo.url!, {
                                        alt: file.name
                                    });
                                }
                                dispatch({ type: ALERT, payload: { loading: false } });
                            };
                        }
                    },
                }}
                value={body}
                onEditorChange={handleEditorChange}
                apiKey="hjuz02bsvcykwi6ruki9xpuarsd6l8txzaouzknog6xef2w5"
                scriptLoading={{ async: true }}
            />
        </>
    );
}

export default TinyEditor;