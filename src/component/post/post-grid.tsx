import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {POST_PAGE_SIZE} from ".";
import * as postAPI from "../../api/post";
import {Post} from "../../model";
import {ResourcePage} from "../common";

function PostGridElement({post}: {post: Post}) {
    return (
        <div className="post-grid-element">
            <img src={post.photos[0].path} alt="" className="post-img" />
        </div>
    )
}

export default function PostGrid({name}: {name: string}) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState<ResourcePage>({index: 0, lastPage: false});

    const navigate = useNavigate();

    const strings = {
        "loadMorePost": "게시글 더 불러오기",
        'lastPage': '...'
    }

    useEffect(() => {
        postAPI.fetch("USER", name, 0, POST_PAGE_SIZE).then(result => {
            setPage({index: 0, lastPage: false});
            setPosts(result);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name])

    useEffect(() => {
        if (page.index === 0) return;
        postAPI.fetch("USER", name, page.index, POST_PAGE_SIZE).then(result => {
            if (result.length === 0) {
                setPage({...page, lastPage: true});
            } else {
                setPosts(posts.concat(result));
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page.index]);

    const loadMorePost = () => {
        setPage({...page, index: page.index + 1})
    }

    return (
        <div>
            <div className="post-grid">
                {posts.map((post, index) => <div onClick={() => {navigate(`/name/${name}/user/post?cursor=${index}&initPage=${page.index}`)}}><PostGridElement key={index} post={post} /></div>)}
            </div>
            {page.lastPage ?
                <div className="load-more-page" onClick={loadMorePost}>{strings.lastPage}</div>
                :
                <div className="load-more-page" onClick={loadMorePost}>{strings.loadMorePost}</div>
            }
        </div>
    )
}
