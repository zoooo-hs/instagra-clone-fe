import { Comment } from "../../model";
import { Content, LikeIndicator, UserBrief } from "../common";
import { CommentIndicator } from "./comment-indicator";

export const CommentCard = (comment: Comment) => {
    const {content, user, like_count, liked, id, comment_count} = comment;
    return (
        <div>
            <UserBrief {...user}/>
            <Content description={content}/>
            <LikeIndicator type="CommentLike" liked={liked} id={id} count={like_count}/>
            <CommentIndicator count={comment_count} type={"CommentComment"} id={id}/>
        </div>
    )
};