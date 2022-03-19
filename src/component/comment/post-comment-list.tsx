import { useEffect, useState } from "react";
import { Comment } from "../../model";
import { CommentCard } from "./comment-card";
import * as commentAPI from "../../api/comment";

export const PostCommentList = (prop: {postId: number}) => {
    const { postId } = prop;
    const [isFetched, setFetched] = useState(false);
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        if (isFetched === false) {
            commentAPI.fetch(postId, commentAPI.POST_COMMENT).then(result => {
                setComments(result);
                setFetched(true);
            });
        } else {
            return;
        }
    }, [isFetched, postId]);


    return(
        <ul>
            {comments.map(comment => <li key={comment.id}><CommentCard {...comment}/></li>)}
        </ul>
    )
};