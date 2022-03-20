import { useState } from "react";
import { LikeType } from ".";
import * as likeAPI from "../../api/like"

// TODO: count 클릭 하면 like한 사람들 정보 나오는 component 추가
export function LikeIndicator (prop: {type: LikeType, id: number, liked: boolean, count: number, likedId: number}) {
    const {liked: initLiked, count, id, type, likedId: initLikedId} = prop;
    const [liked, setLiked] = useState(initLiked);
    const [likedId, setLikedId] = useState(initLikedId);
    const heart = liked ? <i>💛</i> : <i>🖤</i>

    const likeHandle = () => {
        if (liked) {
            // like 취소
            likeAPI.likeCancle(likedId).then(() => {
                setLiked(false);
            });
        } else {
            // like it
            likeAPI.likeIt(id, type).then((id) => {
                setLikedId(id);
                setLiked(true);
            });
        }
    }

    return (
        <div className="indicator-inline">
           <button className="" onClick={likeHandle}>Likes <b>{count}</b> {heart}</button>
        </div>
    )
}
