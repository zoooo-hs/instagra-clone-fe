import { Post } from "../../model"
import PostCard from "./post-card"

interface PostListProps {
    posts: Post[]
}

export default function PostList(prop: PostListProps) {

    const { posts } = prop

    const postList = posts.map((post) => <li key={post.id}><PostCard {...post}/></li>)

    return(
        <ul>
            {postList}            
        </ul>
    )
}