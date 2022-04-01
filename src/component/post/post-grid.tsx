import {useEffect, useState} from "react";
import * as postAPI from "../../api/post";
import {Post} from "../../model";
import {ResourcePage, SquareImage} from "../common";

function PostGridElement({post}: {post: Post}) {
    return (
            <div className="post-grid-element">
                <SquareImage src={post.photos[0].path} size="10px"/>
            </div>
           )
}

export default function PostGrid({name}: {name: string}) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState<ResourcePage>({index: 0, lastPage: false});

    const strings = {
        "loadMorePost": "게시글 더 불러오기",
        'lastPage': '...'
    }

    useEffect(() => {
        postAPI.fetch("USER", name, 0, 9).then(result => {
            setPage({index: 0, lastPage: false});
            setPosts(result);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name])

    useEffect(() => {
        if (page.index === 0) return;
        postAPI.fetch("USER", name, page.index, 9).then(result => {
            if (result.length === 0) {
                setPage({...page, lastPage: true});
            } else {
                setPosts(posts.concat(result));
            }
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page.index]);

    const loadMorePost = () => {
        setPage({...page, index: page.index+1})
    }

    return(
        <div>
            <div className="post-grid">
                {posts.map((post) => <PostGridElement key={post.id} post={post}/>)}            
            </div>
            {page.lastPage ? 
                <div className="load-more-page" onClick={loadMorePost}>{strings.lastPage}</div>
                :
                <div className="load-more-page" onClick={loadMorePost}>{strings.loadMorePost}</div>
            }
        </div>
    )
}
