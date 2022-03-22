import { LikeType } from ".";
import * as likeAPI from "../../api/like";

export function LikeIndicator (prop: {id: number, likeId: number, type: LikeType, liked: boolean, callback: (liked: boolean, likeId?: number)=>void}) {
    const {id, type, likeId, liked, callback} = prop;

    function dislike() {
      likeAPI.likeCancle(likeId).then(() => {
        callback(false);
    });
    }

    function like() {
      likeAPI.likeIt(id, type).then((likeId) => {
        callback(true, likeId);
    });
    }

    if (liked) {
      return (
        <div className="like-indicator">
            <i onClick={dislike} className="fa-solid fa-heart"></i>
        </div>
      )
    } else {
      return (
        <div className="like-indicator">
            <i onClick={like} className="fa-regular fa-heart"></i>
        </div>
      )
    }
  }
  export function LikeCount (prop: {like_count: number}) {
    const {like_count} = prop;
    if (like_count > 0) {
      return (
        <div>
          좋아요 {like_count}개
        </div>
      )
    } else {
      return <div></div>;
    }
  }