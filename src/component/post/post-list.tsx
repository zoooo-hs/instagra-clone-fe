import { useEffect, useState } from "react";
import * as postAPI from "../../api/post";
import { Post } from "../../model";
import PostCard from "./post-card";

export default function PostList() {
    const [isFetched, setFetched] = useState(false);
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        if (isFetched === false) {
            postAPI.fetch().then(result => {
                setPosts(result);
                setFetched(true);
            });
        } else {
            return;
        }
    }, [isFetched]);

    return(
        <ul>
            {posts.map((post) => <li key={post.id}><PostCard {...post}/></li>)}            
        </ul>
    )
}