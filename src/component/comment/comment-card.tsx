import { Comment } from "../../model";
import { Content, UserBrief } from "../common";
import { LikeIndicator } from "../like/like-indicator";
import { CommentIndicator } from "./comment-indicator";

export const CommentCard = (comment: Comment) => {
    const {content, user, like_count, liked, id, comment_count, liked_id} = comment;
    return (
        <div>
            <UserBrief {...user}/>
            <Content description={content}/>
            <LikeIndicator type="CommentLike" liked={liked} id={id} count={like_count} likedId={liked_id}/>
            <CommentIndicator count={comment_count} type={"CommentComment"} id={id}/>
        </div>
    )
};