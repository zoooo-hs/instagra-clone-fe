import { useEffect, useState } from "react";
import { fetch } from "../../api/post";
import { Post } from "../../model";
import PostCard from "./post-card";

export default function PostList() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        if (posts.length === 0) {
            fetch().then(result => {
                setPosts(result);
            });
        } else {
            return;
        }
    }, [posts]);

    return(
        <ul>
            {posts?.map((post) => <li key={post.id}><PostCard {...post}/></li>)}            
        </ul>
    )
}