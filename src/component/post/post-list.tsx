import { useEffect, useState } from "react";
import { fetch } from "../../api/post";
import { Post } from "../../model";
import PostCard from "./post-card";

export default function PostList() {
    const [isFetched, setFetched] = useState(false);
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        if (isFetched === false) {
            fetch().then(result => {
                setPosts(result);
                setFetched(true);
            });
        } else {
            return;
        }
    }, [posts, isFetched]);

    return(
        <ul>
            {posts.map((post) => <li key={post.id}><PostCard {...post}/></li>)}            
        </ul>
    )
}