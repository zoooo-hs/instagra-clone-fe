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
      "photos": "사진",
      "description": "설명"
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
      PostAPI.post({...values, files: values.files}).then(() => navigate("/"));
    }
    
    const disableSubmit = () => {
      return values.description === "" || values.files.length === 0;
    }

    return(
      <div className="post-form">
        <PhotoList photos={values.previewPhotos} handleClick={deleteFile}/>
        <form onSubmit={handleSubmit}>
          <input type="file" name="files" multiple={true} onChange={handleChange}/>
          <label htmlFor="files">{strings.photos}</label>
          <input type="text" name="description" onChange={handleChange} required/>
          <label htmlFor="description">{strings.description}</label>
          <input type="submit" value="Post" disabled={disableSubmit()}/>
        </form>
      </div>
    )
}