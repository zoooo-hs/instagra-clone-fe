import { Post } from "../../model";

function computeDescriptino(description: string) {
    const parts = description.split(/([@#][^ \n@#]+)/g)
    const result:any[] = []
    for (let i = 0; i < parts.length; i++) {
        if (i%2 === 0) {
            result.push(parts[i])
        }
        else {
            if (parts[i][0] === "#") {
                // hash tag
                result.push(<span className="hashtag" key={i}><a href={"/hash-tag/#"+parts[i]}>{parts[i]}</a></span>)
            } else {
                // mention user
                result.push(<span className="mention" key={i}><a href={"/user/@"+parts[i]}>{"@"+parts[i]}</a></span>)
            }
        }
    }
    return <p className="post-description">{result}</p>;
}

export default function PostCard(post:Post) {

    const {likeCount, liked, commentCount, description} = post;
    const heart = liked === true ? <i>💙</i> : <i>💔</i>
    const computedDescription = computeDescriptino(description);

    const imagList = post.photos.map((photo) => <li key={photo.id}>
        <img src={photo.path} alt="" className="post-img" width='128px' height='128px'/></li>)

    return(
      <div className="post-card">
        <ul className="image-list">
          {imagList}
        </ul>
        <span className="post-like-count">{likeCount}</span> likes {heart}
        {computedDescription}
        <span className="post-like-count">{commentCount}</span> comments
        
      </div>
    )
}