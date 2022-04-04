import {useState} from "react";
import {CommentType} from ".";
import * as commentAPI from "../../api/comment";
import {Comment} from "../../model";

export function CommentForm(prop: {id: number, type: CommentType, callback: (comment?: Comment) => void, editOption?: {commentId: number, originContent: string}}) {
    const {id, type, callback, editOption} = prop;
    const [values, setValues] = useState({content: editOption ? editOption.originContent : ""});

    const strings = {
        "title": "댓글 작성",
        "content": "내용",
        "submit": editOption ? "댓글 수정" : "댓글 작성",
        "cancle": "수정 취소"
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setValues({...values, [name]: value});
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (editOption === undefined) {
            return commentAPI.post(id, values.content, type).then(() => {
                setValues({content: ""});
                callback();
            });
        }

        if (editOption.originContent === values.content) {
            cancleEdit();
            return;
        }
        commentAPI.patch(editOption.commentId, values.content).then(patchedComment => {
            setValues({content: ""})
            callback(patchedComment);
        });
    }

    const cancleEdit = () => {
        callback(undefined);
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="field-row">
                    <input type="text" name="content" value={values.content} onChange={handleChange} required autoFocus />
                    <button type="submit">{strings.submit}</button>
                    {editOption ?
                        <button onClick={cancleEdit}>{strings.cancle}</button>
                        : null
                    }
                </div>
            </form>
        </div>
    )
}
