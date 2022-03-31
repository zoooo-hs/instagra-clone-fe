import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as postAPI from "../../api/post";
import { Post } from "../../model";
import { ResourcePage } from "../common";
import PostCard from "./post-card";

export default function PostList({type}: {type: postAPI.PostListType}) {
    const params = useParams();
    const keyword = params.keyword || "";
    const [title, setTitle] = useState("");
    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState<ResourcePage>({index: 0, lastPage: false});

    const strings = {
        "loadMorePost": "게시글 더 불러오기",
        'lastPage': '...'
    }

    function ListHeader ({type, title}: {type: postAPI.PostListType, title: string}) {
        switch (type) {
            case "HASH_TAG":
            case "USER":
                break
            case "ALL":
            default:
                return null;
        }
        return <h3 style={{"textAlign":"center"}}>{title}</h3>
    }

    useEffect(() => {
        postAPI.fetch(type, keyword, 0).then(result => {
            setPage({index: 0, lastPage: false});
            setPosts(result);
        });

        switch (type) {
            case "USER":
                setTitle(`@${keyword}`);
                break
            case "HASH_TAG":
                setTitle(`#${keyword}`);
                break
            default:
                setTitle("");
                break
        }
    }, [type, keyword])

    useEffect(() => {
        if (page.index === 0) return;
        postAPI.fetch(type, keyword, page.index).then(result => {
            if (result.length === 0) {
                setPage({...page, lastPage: true});
            } else {
                setPosts(posts.concat(result));
            }
        });
    // fetch 유무로만 useEffect
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page.index]);

    const loadMorePost = () => {
        setPage({...page, index: page.index+1})
    }

    return(
        <div>
            <ListHeader type={type} title={title}/>
            {posts.map((post) => <PostCard key={post.id} {...post}/>)}            
            {page.lastPage ? 
                <div className="load-more-page" onClick={loadMorePost}>{strings.lastPage}</div>
                :
                <div className="load-more-page" onClick={loadMorePost}>{strings.loadMorePost}</div>
            }
        </div>
    )
}
