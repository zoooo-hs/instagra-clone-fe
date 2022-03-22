import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PhotoList } from ".";
import * as PostAPI from "../../api/post";
import { Photo } from "../../model";

export const path = "/post-form";

interface PostFormState {
  files: File[],
  previewPhotos: Photo[],
  description: string
}

export default function PostForm() {
    const [values, setValues] = useState<PostFormState>({files: [], previewPhotos: [], description: ""});
    const navigate = useNavigate();

    const strings = {
      "photos": "사진 추가",
      "description": "설명",
      "submit": "제출",
    }

    const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const {name, value} = event.target;
      setValues({...values, [name]: value});
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const {name, value, files} = event.target;
      if (files !== null && files?.length > 0) {
        let tempFiles: File[] = []
        let tempPreviews: Photo[] = []
        for (let i = 0; i < files.length; i++) {
          tempFiles.push(files[i]);
          tempPreviews.push({"id": -1, "path": URL.createObjectURL(files[i])});
        }

        setValues({...values, 'previewPhotos': values.previewPhotos.concat(tempPreviews),[name]: values.files.concat(tempFiles)});
      } else {
        setValues({...values, [name]: value});
      }
    }

    const deleteFile = (index: number) => {
      const {files, previewPhotos} = values;

      let tempFiles: File[] = files.filter((_, fileIndex) => fileIndex !== index);
      let tempPreviews: Photo[] = previewPhotos.filter((_, fileIndex) => fileIndex !== index);
      setValues({...values, 'previewPhotos': tempPreviews,'files': tempFiles});
    }

    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      if (values.files === null) {
        return;
      }
      const {description, files} = values;
      const data = {
        description,
        files
      }
      setValues({files: [], previewPhotos: [], description: ""});
      PostAPI.post(data).then(() => {
        navigate("/")
      });
    }
    
    const disableSubmit = () => {
      return values.description === "" || values.files.length === 0;
    }

    return(
      <article role="tabpanel" id="ic-tab-post-form">
        <div className="post-form">
          <PhotoList photos={values.previewPhotos} handleClick={deleteFile}/>
          <form onSubmit={handleSubmit}>
            <div className="field-row-stacked post-input">
              <input id="post-form-input-files" type="file" name="files" multiple={true} onChange={handleChange}/>
              <button onClick={() => {document.getElementById('post-form-input-files')?.click()}} >{strings.photos}</button>
              <label htmlFor="description">{strings.description}</label>
              <textarea name="description" onChange={handleTextAreaChange} required/>
              <button type="submit" disabled={disableSubmit()}>{strings.submit}</button>
            </div>
          </form>
        </div>
      </article>
    )
}