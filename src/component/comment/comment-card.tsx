import { useState } from "react";
import { Comment } from "../../model";
import { Content, CreatedAt, RoundImage } from "../common";
import { LikeCount, LikeIndicator } from "../like/like-indicator";

export const CommentCard = (comment: Comment) => {
    const {content, user, like_count, liked: iLiked, id,
        //  comment_count, 
        liked_id,
        created_at
    } = comment;

    const [liked, setLiked] = useState(iLiked);
    const [likeId, setLikeId] = useState(liked_id);
    const [likeCount, setLikeCount] = useState(like_count);

    function likeHandler (liked: boolean, likeId?: number) {
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
    return (
        <div className="comment-card">
            <RoundImage src={user.photo.path} size={"25px"}/>
            <div className="comment-content">
              <Content description={content} author={user}/>
              <div className="comment-indicators">
                  <CreatedAt date={created_at}/>
                  <LikeCount like_count={likeCount}/> 
              </div>
            </div>
            <LikeIndicator type="CommentLike" liked={liked} id={id} likeId={likeId} callback={likeHandler}/>
        </div>
    )
};