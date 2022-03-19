import { Post } from "../../model";
import { CommentIndicator } from "../comment";
import { Content, LikeIndicator, SquareImage, UserBrief } from "../common";


export default function PostCard(post:Post) {

    const {id, user, like_count, liked, comment_count, description} = post;

    const imagList = post.photos.map((photo) => <li key={photo.id} >
        <SquareImage src={photo.path} size={"128px"}/></li>)

    return(
      <div className="post-card">
        <UserBrief {...user}/>
        <div>
            <ul className="image-list">
                {imagList}
            </ul>
        </div>
        <Content description={description}/>
        <LikeIndicator type={"CommentLike"} id={id} liked={liked} count={like_count}/>
        <CommentIndicator count={comment_count} type={"PostComment"} id={id}/>
      </div>
    )
}