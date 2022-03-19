import { PhotoList } from ".";
import { Post } from "../../model";
import { CommentIndicator } from "../comment";
import { Content, LikeIndicator, UserBrief } from "../common";


export default function PostCard(post:Post) {

    const {id, user, like_count, liked, comment_count, description} = post;

    return(
      <div className="post-card">
        <UserBrief {...user}/>
        <PhotoList photos={post.photos}/>
        <Content description={description}/>
        <LikeIndicator type={"CommentLike"} id={id} liked={liked} count={like_count}/>
        <CommentIndicator count={comment_count} type={"PostComment"} id={id}/>
      </div>
    )
}