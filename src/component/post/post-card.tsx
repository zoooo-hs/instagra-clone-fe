import {MouseEventHandler, useState} from "react";
import {useNavigate} from "react-router-dom";
import {PhotoList} from ".";
import {Post} from "../../model";
import {CommentList} from "../comment/comment-list";
import {Content, CreatedAt} from "../common";
import {LikeCount, LikeIndicator} from "../like/like-indicator";


export default function PostCard(post: Post) {

    const {id, user, like_count, liked: iLiked, comment_count, description, liked_id, created_at} = post;

    const [liked, setLiked] = useState(iLiked);
    const [likeId, setLikeId] = useState(liked_id);
    const [likeCount, setLikeCount] = useState(like_count);
    const [openComment, setOpenComment] = useState(false);

    const navigate = useNavigate();

    function CommentCount(prop: {commentCount: number, onClick: MouseEventHandler}) {
        const {commentCount, onClick} = prop;
        if (commentCount > 0) {
            return (
                <div onClick={onClick}>
                    댓글 {commentCount}개 모두 보기
                </div>
            )
        } else {
            return <div></div>;
        }

    }

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

    function toggleComment() {
        setOpenComment(!openComment);
    }


    return (
        <div className="post-card">
            <div className="user-brief" onClick={() => {navigate(`/name/${user.name}/user`)}}>
                <img className="round-img img-30px" src={user.photo.path} alt="" />
                <b>{user.name}</b>
            </div>
            <PhotoList photos={post.photos} />
            <div className="like-comment-indicators">
                <LikeIndicator id={id} likeId={likeId} type={"PostLike"} liked={liked} callback={likeHandler} /> <i onClick={toggleComment} className="fa-regular fa-comment"></i>
            </div>
            <LikeCount like_count={likeCount} />
            <Content description={description} author={user} />
            <CommentCount onClick={toggleComment} commentCount={comment_count} />
            {openComment ? <CommentList id={id} type={"PostComment"} /> : <div></div>}
            <CreatedAt date={created_at} />
        </div>
    )
}
