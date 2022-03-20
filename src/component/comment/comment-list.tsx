import { useEffect, useState } from "react";
import { Comment } from "../../model";
import { CommentCard } from "./comment-card";
import * as commentAPI from "../../api/comment";
import { CommentType } from ".";
import { ResourcePage } from "../common";
import { CommentForm } from "./comment-form";

export function CommentList (prop: {id: number, type: CommentType}) {
    const { id, type } = prop;
    const [isFetched, setFetched] = useState(false);
    const [comments, setComments] = useState<Comment[]>([]);
    const [page, setPage] = useState<ResourcePage>({index: 0, lastPage: false});

    const strings = {
        'loadMoreComment': '댓글 더 불러오기'
    }

    useEffect(() => {
        if (isFetched === false) {
            commentAPI.fetch(id, type, page.index).then(result => {
                if (result.length === 0) {
                    setPage({...page, lastPage: true});
                } else {
                    setPage({...page, index: page.index + 1});
                    setComments(comments.concat(result));
                }
                setFetched(true);
            });
        } else {
            return;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFetched]);

    const loadMoreComment = () => {
        setFetched(false);
    }

    const onPostComment = () => {
        setPage({index: 0, lastPage: false});
        setComments([]);
        setFetched(false);
    }

    return(
        <div>
            <CommentForm id={id} type={type} callback={onPostComment}/>
            {comments.map(comment => <CommentCard key={comment.id} {...comment}/>)}
            <button disabled={page.lastPage} onClick={loadMoreComment}>{strings.loadMoreComment}</button>
        </div>
    )
};