import { useEffect, useState } from "react";
import { Comment } from "../../model";
import { CommentCard } from "./comment-card";
import * as commentAPI from "../../api/comment";
import { CommentType } from ".";

export function CommentList (prop: {id: number, type: CommentType}) {
    const { id, type } = prop;
    const [isFetched, setFetched] = useState(false);
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        if (isFetched === false) {
            commentAPI.fetch(id, type).then(result => {
                setComments(result);
                setFetched(true);
            });
        } else {
            return;
        }
    }, [isFetched, id, type]);


    return(
        <div>
            {comments.map(comment => <CommentCard key={comment.id} {...comment}/>)}
        </div>
    )
};