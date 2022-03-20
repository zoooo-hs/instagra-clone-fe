import { useState } from "react";
import { PhotoList } from ".";
import { Post } from "../../model";
import { CommentIndicator } from "../comment";
import { CommentList } from "../comment/comment-list";
import { Content, UserBrief } from "../common";
import { LikeIndicator } from "../like/like-indicator";


export default function PostCard(post:Post) {

    const {id, user, like_count, liked, comment_count, description, liked_id} = post;
    const [openComment, setOpenComment] = useState(false);

    return(
      <div className="post-card">
        <UserBrief {...user}/>
        <PhotoList photos={post.photos}/>
        <Content description={description}/>
        <LikeIndicator type={"PostLike"} id={id} liked={liked} count={like_count} likedId={liked_id}/>
        <div className="indicator-inline">
            <button onClick={() => {setOpenComment(!openComment)}}>{openComment ? "Close" : "Open"} comment {comment_count}</button>
        </div>
        {openComment ? <CommentList id={id} type={"PostComment"}/> : ""}
      </div>
    )
}