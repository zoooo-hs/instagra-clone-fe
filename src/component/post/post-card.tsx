import { useState } from "react";
import { Post } from "../../model";
import { PostCommentList } from "../comment/post-comment-list";

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

    const {id, user, like_count, liked, comment_count, description} = post;

    const [openComment, setOpenComment] = useState(false);

    const heart = liked === true ? <i>💙</i> : <i>💔</i>
    const computedDescription = computeDescriptino(description);

    const imagList = post.photos.map((photo) => <li key={photo.id} >
        <img src={photo.path} alt="" className="post-img" width='128px' height='128px' /></li>)

    return(
      <div className="post-card">
        <div>
            <span>글쓴이</span>
            {/* 프로필 사진 불러오면 img src 바꾸기 */}
            <img src={post.photos[0].path} alt="" width='48px' height='48px' />
            <span><a href={"@"+user.name}>{"@"+user.name}</a></span>
        </div>
        <div>
            <ul className="image-list">
                {imagList}
            </ul>
        </div>
        <div>
            <button>{heart} <span className="post-like-count">{like_count}</span></button>
        </div>
        {computedDescription}
        <span className="post-like-count">{comment_count}</span> <button onClick={() => {setOpenComment(!openComment)}}>{openComment ? "Close" : "Open"} comment</button>

        {openComment ? <PostCommentList postId={id}/> : ""}
        
      </div>
    )
}