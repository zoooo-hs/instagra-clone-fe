import { useState } from "react";
import { CommentType } from ".";
import * as commentAPI from "../../api/comment";

export function CommentForm(prop: {id: number, type: CommentType, callback: () => void}) {
    const {id, type, callback} = prop;
    const [values, setValues] = useState({content: ""})

    const strings = {
        "title": "댓글 작성",
        "content": "내용",
        "submit": "댓글 작성"
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const {name, value} = event.target;
      setValues({...values, [name]: value});
    }

    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      commentAPI.post(id, values.content, type).then(() => {
        setValues({content: ""})
        callback()
      })
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
              <div className="field-row">
                <input type="text" name="content" value={values.content} onChange={handleChange} required/>
                <button type="submit">{strings.submit}</button>
              </div>
            </form>
        </div>
    )
}