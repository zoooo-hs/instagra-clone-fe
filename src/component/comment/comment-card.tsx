import { Comment } from "../../model";

export const CommentCard = (comment: Comment) => {

    const {content, user, like_count, liked} = comment;

    // TODO: like component 만들기
    const heart = liked === true ? <i>💙</i> : <i>💔</i>

    return (
        <div>
            <div>
                {/* <img src={user.photo.path} alt="" width='48px' height='48px' /> */}
                <span>{user.name}</span>
            </div>
            <p>{content}</p>
            <button>{heart} <span className="post-like-count">{like_count}</span></button>
        </div>
    )
};