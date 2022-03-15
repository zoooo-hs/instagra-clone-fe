import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetch } from "../../api/post";
import { RootState } from "../../reducer";
import { didFetchPost, PostListState } from "../../reducer/post";
import PostCard from "./post-card";

export default function PostList() {
    const postList: PostListState = useSelector((state: RootState) => state.posts);
    const dispatch = useDispatch();

    useEffect(() => {
        if (postList.isFetched === false) {
            fetch().then(result => {
                dispatch(didFetchPost(result));
            });
        } else {
            return;
        }
    }, [postList, dispatch]);

    return(
        <ul>
            {postList.posts.map((post) => <li key={post.id}><PostCard {...post}/></li>)}            
        </ul>
    )
}