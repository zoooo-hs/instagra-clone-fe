import {useEffect, useRef, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import * as postAPI from "../../api/post";
import {Post} from "../../model";
import {ResourcePage} from "../common";
import PostCard from "./post-card";
import queryString from "query-string";
import {POST_PAGE_SIZE} from ".";

export default function PostList({type}: {type: postAPI.PostListType}) {
    const params = useParams();
    const location = useLocation();
    const postRef = useRef<HTMLDivElement[]>([]);
    let {cursor, initPage} = queryString.parse(location.search, {parseNumbers: true});
    initPage = initPage !== null && typeof initPage === "number" ? initPage : 0;

    const keyword = params.keyword || "";
    const [title, setTitle] = useState("");
    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState<ResourcePage>({index: initPage, lastPage: false});



    const strings = {
        "loadMorePost": "게시글 더 불러오기",
        'lastPage': '...'
    }

    function ListHeader({type, title}: {type: postAPI.PostListType, title: string}) {
        switch (type) {
            case "HASH_TAG":
            case "USER":
                break
            case "ALL":
            default:
                return null;
        }
        return <h3 style={{"textAlign": "center"}}>{title}</h3>
    }

    useEffect(() => {
        postAPI.fetch(type, keyword, 0, (page.index + 1) * POST_PAGE_SIZE).then(result => {
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type, keyword])

    useEffect(() => {
        if (document.getElementsByClassName('post-card').length === 0) {
            return;
        }
        if (cursor === null || typeof cursor !== "number" || postRef.current.length < cursor || cursor === 0) {
            return;
        } else {
            postRef.current[cursor].scrollIntoView()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [posts, cursor])

    useEffect(() => {
        if (page.index === 0) return;
        postAPI.fetch(type, keyword, page.index, POST_PAGE_SIZE).then(result => {
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
            <ListHeader type={type} title={title} />
            {posts.map((post, index) => <div ref={(el: HTMLDivElement) => (postRef.current[index] = el)} key={post.id}><PostCard {...post} /></div>)}
            {page.lastPage ?
                <div className="load-more-page" onClick={loadMorePost}>{strings.lastPage}</div>
                :
                <div className="load-more-page" onClick={loadMorePost}>{strings.loadMorePost}</div>
            }
        </div>
    )
}
