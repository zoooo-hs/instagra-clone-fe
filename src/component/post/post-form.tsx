import heic2any from "heic2any";
import { useState } from "react";
import { PhotoList } from ".";
import * as PostAPI from "../../api/post";
import { Photo } from "../../model";

export const path = "/post-form";

interface PostFormState {
  files: File[],
  previewPhotos: Photo[],
  description: string
}

export default function PostForm(prop: {onClose: ()=>void}) {
    const [values, setValues] = useState<PostFormState>({files: [], previewPhotos: [], description: ""});

    const [loading, setLoading] = useState(false);

    const strings = {
      "photos": "사진 추가",
      "description": "설명",
      "submit": "제출",
    }

    const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const {name, value} = event.target;
      setValues({...values, [name]: value});
    }

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const {name, value, files} = event.target;
      if (files !== null && files?.length > 0) {
        let tempFiles: File[] = []
        let tempPreviews: Photo[] = []
        setLoading(true);
        for (let i = 0; i < files.length; i++) {
          const ext = files[i].name.split(".").pop()?.toLocaleLowerCase();
          if (ext === "heic" || ext === "heif") {
            let originalFile: File = files[i]
            await heic2any({blob: files[i], quality: 0.5, toType: "image/jpeg"}).then((convertedBlob) => {
              const newFile = new File([(convertedBlob as Blob)], originalFile.name.replaceAll(/\.[^.]*$/gi, ".jpg"), {type: "image/jpeg"})
              tempFiles.push(newFile);
              tempPreviews.push({"id": -1, "path": URL.createObjectURL(newFile)});
            })
          } else {
            tempFiles.push(files[i]);
            tempPreviews.push({"id": -1, "path": URL.createObjectURL(files[i])});
          }
        }
        setLoading(false);

        setValues({...values, 'previewPhotos': values.previewPhotos.concat(tempPreviews),[name]: values.files.concat(tempFiles)});
      } else {
        setValues({...values, [name]: value});
      }
      event.target.value = "";
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
        prop.onClose()
      });
    }
    
    return(
      <div className="post-form">
        <div className="window">
          <div className="title-bar">
            <div className="title-bar-text">
              새 글 작성
            </div>
            <div className="title-bar-controls">
              <button aria-label="Close" onClick={prop.onClose}></button>
            </div>
          </div>
        <div className="window-body">
          <PhotoList loading={loading} photos={values.previewPhotos} handleClick={deleteFile}/>
          <form onSubmit={handleSubmit}>
            <div className="field-row-stacked post-input">
              <input id="post-form-input-files" type="file" name="files" multiple={true} onChange={handleChange}/>
              <button onClick={(event) => {
                event.preventDefault();
                document.getElementById('post-form-input-files')?.click()}
              } >{strings.photos}</button>
              <label htmlFor="description">{strings.description}</label>
              <textarea name="description" onChange={handleTextAreaChange} required/>
              <button disabled={loading || values.description === "" || values.files.length === 0}>{strings.submit}</button>
            </div>
          </form>
          </div>
        </div>
      </div>
    )
}