import { useState } from "react";
import { CommentType } from ".";
import { CommentList } from "./comment-list";


export function CommentIndicator(prop: {count: number, type: CommentType, id: number}) {
    const {count, id, type} = prop;
    const [openComment, setOpenComment] = useState(false);

    // TODO: 답글 작성 form 컴포넌트 작성

    return (
        <div className="indicator-inline">
            <button onClick={() => {setOpenComment(!openComment)}}>{openComment ? "Close" : "Open"} comment {count}</button>
            {openComment ? <CommentList id={id} type={type}/> : ""}
        </div>
    )
}
