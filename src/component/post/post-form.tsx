export default function PostForm() {
    return(
      <div className="post-form">
        <ul className="post-photo-previews">
          <li className="post-photo-preview">
            <img src="/logo512.png" alt=""  width='128px' height='128px'/>
            </li>
        </ul>
        <form>
          <input type="file" name="file" id="file" multiple={true}/>
          <label htmlFor="file">Photos</label>
          <input type="text" name="description" id="description" />
          <label htmlFor="description">Description</label>
          <input type="submit" value="Post" />
        </form>
      </div>
    )
}