import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as postAPI from "../../api/post";
import * as userAPI from "../../api/user";
import { Post } from "../../model";
import { ResourcePage } from "../common";
import PostCard from "./post-card";

export default function PostList({type}: {type: postAPI.PostListType}) {
    const params = useParams();
    const keyword = params.keyword || "";
    const [title, setTitle] = useState("");
    const [isFetched, setFetched] = useState(false);
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
        if (isFetched === false) {
            postAPI.fetch(type, keyword, page.index).then(result => {
                if (result.length === 0) {
                    setPage({...page, lastPage: true});
                } else {
                    setPage({...page, index: page.index + 1});
                    setPosts(posts.concat(result));
                }
                switch (type) {
                    case "USER":
                        // TODO: user 정보를 땨로 받아오는 방법 찾아보기 아니면 user name으로 게시글 리스트 조회하기
                        userAPI.info(parseInt(keyword)).then(user => {
                            setTitle(`@${user.name}`);
                        });
                        break
                    case "HASH_TAG":
                        setTitle(`#${keyword}`);
                        break
                    default:
                        setTitle("");
                        break
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