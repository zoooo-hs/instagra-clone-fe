import { useState } from "react";
import { Post } from "../../model";
import { PostCommentList } from "../comment/post-comment-list";

// TODO: 각 컴포넌트 재사용 가능한 것 분리

function HashTag(prop:{hashtag: string}) {
    const {hashtag} = prop;
    if (hashtag[0] !== "#") {
        return <span>{hashtag}</span>
    }
    return <span className="hashtag"><a href={"/hash-tag/"+prop.hashtag.substring(1)}>{prop.hashtag}</a></span>
}

function Mention(prop:{mention: string}) {
    const {mention} = prop;
    if (mention[0] !== "@") {
        return <span>{mention}</span>
    }
    return <span className="mention"><a href={"/user/"+mention.substring(1)}>{mention}</a></span>
}

function Content(prop: {description: string}) {
    const parts = prop.description.split(/([@#][^ \n@#]+)/g)
    const result:any[] = []
    for (let i = 0; i < parts.length; i++) {
        if (i%2 === 0) {
            result.push(parts[i])
        }
        else {
            if (parts[i][0] === "#") {
                // hash tag
                result.push(<HashTag key={i} hashtag={parts[i]}/>)
            } else {
                // mention user
                result.push(<Mention key={i} mention={parts[i]}/>)
            }
        }
    }
    return <p className="post-description">{result}</p>;
}

type LikeType = "CommentLike" | "PostLike";

// TODO: count 클릭 하면 like한 사람들 정보 나오는 component 추가
function LikeIndicator (prop: {type: LikeType, id: number, liked: boolean, count: number}) {
    const {liked, count} = prop;
    const heart = liked ? <i>💛</i> : <i>🖤</i>

    return (
        <div>
           <b>{count}</b><button>{heart}</button>
        </div>
    )
}

function SquareImage (prop: {src: string, size: string}) {
    return <img src={prop.src} alt="" className="post-img" width={prop.size} height={prop.size} />
}

type CommentType = "PostComment" | "CommentCommentLike";

function CommentIndicator(prop: {comment_count: number, type: CommentType, id: number}) {
    const {comment_count, id} = prop;
    const [openComment, setOpenComment] = useState(false);

    return (
        <div>
            <button onClick={() => {setOpenComment(!openComment)}}>{openComment ? "Close" : "Open"} comment {comment_count}</button>
            {openComment ? <PostCommentList postId={id}/> : ""}
        </div>
    )
}

export default function PostCard(post:Post) {

    const {id, user, like_count, liked, comment_count, description} = post;

    if (user.photo === undefined || user.photo.id === -1) {
        user.photo = {
          id: -1,
          path: "/default-profile.png"
        };
    }

    const imagList = post.photos.map((photo) => <li key={photo.id} >
        <SquareImage src={photo.path} size={"128px"}/></li>)

    return(
      <div className="post-card">
        <div>
            <SquareImage src={user.photo.path} size={"48px"}/>
            <Mention mention={"@"+user.name}/>
        </div>
        <div>
            <ul className="image-list">
                {imagList}
            </ul>
        </div>
        <Content description={description}/>
        <LikeIndicator type={"CommentLike"} id={id} liked={liked} count={like_count}/>
        <CommentIndicator comment_count={comment_count} type={"PostComment"} id={id}/>
      </div>
    )
}