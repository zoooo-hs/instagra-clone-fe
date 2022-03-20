import { PhotoList } from ".";
import { Post } from "../../model";
import { CommentIndicator } from "../comment";
import { Content, UserBrief } from "../common";
import { LikeIndicator } from "../like/like-indicator";


export default function PostCard(post:Post) {

    const {id, user, like_count, liked, comment_count, description, liked_id} = post;

    return(
      <div className="post-card">
        <UserBrief {...user}/>
        <PhotoList photos={post.photos}/>
        <Content description={description}/>
        <LikeIndicator type={"PostLike"} id={id} liked={liked} count={like_count} likedId={liked_id}/>
        <CommentIndicator count={comment_count} type={"PostComment"} id={id}/>
      </div>
    )
}