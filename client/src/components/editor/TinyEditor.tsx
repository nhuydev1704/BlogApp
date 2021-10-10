import { Editor } from '@tinymce/tinymce-react';
import { notification } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import 'tinymce/tinymce'
import 'tinymce/icons/default';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/code';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/help';
import 'tinymce/plugins/hr';
import 'tinymce/plugins/image';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/media';
import 'tinymce/plugins/nonbreaking';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/spellchecker';
import 'tinymce/plugins/table';
import 'tinymce/plugins/template';
import 'tinymce/plugins/wordcount';
import 'tinymce/skins/content/default/content.min.css';
import 'tinymce/skins/ui/oxide/content.min.css';
import 'tinymce/skins/ui/oxide/skin.min.css';
import 'tinymce/themes/silver';

import { ALERT } from '../../redux/types/alertType';
import { checkImage, imageUpload } from '../../utils/imageUpload';


interface IProps {
    body: string,
    setBody: (value: string) => void
}

const TinyEditor: React.FC<IProps> = ({ body, setBody }) => {


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
                    default_link_target: '_blank',
                    height: 500,
                    menubar: true,
                    statubar: true,
                    plugins: [
                        "advlist autolink link image lists charmap print preview hr anchor pagebreak",
                        "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
                        "save table contextmenu directionality emoticons template codesample fullscreen"
                    ],
                    toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons | codesample fullscreen",
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    paste_data_images: true,
                    file_browser_callback_types: 'image',
                    file_picker_callback: async function (callback, value, meta) {
                        if (meta?.filetype === 'image') {
                            let input: any = document.getElementById('my-file-upload');
                            input.click();
                            input.onchange = async () => {
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