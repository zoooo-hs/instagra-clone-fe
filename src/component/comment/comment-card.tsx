import {useState} from "react";
import {useNavigate} from "react-router-dom";
import * as commentAPI from "../../api/comment";
import {Comment} from "../../model";
import {store} from "../../reducer";
import {Content, CreatedAt} from "../common";
import {LikeCount, LikeIndicator} from "../like/like-indicator";
import {CommentForm} from "./comment-form";

export const CommentCard = (prop: {comment: Comment, callback: () => void}) => {
    const {content: initContent, user: author, like_count, liked: iLiked, id,
        //  comment_count, 
        liked_id,
        created_at
    } = prop.comment;
    const {callback} = prop;

    const navigate = useNavigate();
    const user = store.getState().auth.user;

    const [liked, setLiked] = useState(iLiked);
    const [likeId, setLikeId] = useState(liked_id);
    const [likeCount, setLikeCount] = useState(like_count);

    const [openEdit, setOpenEdit] = useState(false);
    const [content, setContent] = useState(initContent);

    function likeHandler(liked: boolean, likeId?: number) {
        setLiked(liked);
        if (likeId !== undefined) {
            setLikeId(likeId);
        }
        if (liked) {
            setLikeCount(likeCount + 1)
        } else {
            setLikeCount(likeCount - 1)
        }
    }

    function editComment(comment?: Comment) {
        if (comment) {
            setContent(comment.content);
        }
        // TODO: (수정됨) 정보 제공  고민
        setOpenEdit(false);
    }

    function deleteComment() {
        // TODO: delete comfirm modal component
        commentAPI.deleteById(id).then(() => {
            callback();
        });
    }

    return (
        <div className="comment-card">
            <img className="round-img img-25px" src={author.photo.path} onClick={() => {navigate(`/name/${author.name}/user`)}} alt="" />
            <div className="comment-content">
                {openEdit ?
                    <CommentForm id={id} type={"PostComment"} callback={editComment} editOption={{commentId: id, originContent: content}} />
                    :
                    <Content description={content} author={author} />
                }
                <div className="comment-indicators">
                    <CreatedAt date={created_at} />
                    <LikeCount like_count={likeCount} />
                    {user.id === author.id ?
                        <div className="edit-delete-buttons">
                            <i className="fa-solid fa-pen" onClick={() => {setOpenEdit(!openEdit)}}></i>
                            <i className="fa-solid fa-trash-can" onClick={deleteComment}></i>
                        </div>
                        :
                        null
                    }
                </div>
            </div>
            <LikeIndicator type="CommentLike" liked={liked} id={id} likeId={likeId} callback={likeHandler} />
        </div>
    )
};
