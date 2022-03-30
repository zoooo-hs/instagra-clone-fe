import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as postAPI from "../../api/post";
import { Post } from "../../model";
import { ResourcePage } from "../common";
import PostCard from "./post-card";

export default function PostList({type}: {type: postAPI.PostListType}) {
    const params = useParams();
    const keyword = params.keyword || "";
    const [isFetched, setFetched] = useState(false);
    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState<ResourcePage>({index: 0, lastPage: false});

    const strings = {
        "loadMorePost": "게시글 더 불러오기",
        'lastPage': '...'
    }

    useEffect(() => {
        if (isFetched === false) {
            postAPI.fetch(type, keyword, page.index).then(result => {
                if (result.length === 0) {
                    setPage({...page, lastPage: true});
                } else {
                    setPage({...page, index: page.index + 1});
                    setPosts(posts.concat(result));
                }
                setFetched(true);
            });
        } else {
            return;
        }
    // fetch 유무로만 useEffect
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFetched]);

    const loadMorePost = () => {
        setFetched(false);
    }

    return(
        <div>
            {posts.map((post) => <PostCard key={post.id} {...post}/>)}            
            {page.lastPage ? 
                <div className="load-more-page" onClick={loadMorePost}>{strings.lastPage}</div>
                :
                <div className="load-more-page" onClick={loadMorePost}>{strings.loadMorePost}</div>
            }
        </div>
    )
}