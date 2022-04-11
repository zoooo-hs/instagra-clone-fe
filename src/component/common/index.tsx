import {useDispatch} from "react-redux";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {Error, User} from "../../model";
import {clear} from "../../reducer/error";

export function HashTag(prop: {hashtag: string}) {
    const navigate = useNavigate()
    const {hashtag} = prop;
    if (hashtag[0] !== "#") {
        return <span>{hashtag}</span>
    }
    return <span className="hashtag bold-href" onClick={() => {navigate(`/hash-tag/${prop.hashtag.substring(1)}/post`)}}>{prop.hashtag}</span>
}

export function Mention(prop: {mention: string}) {
    const navigate = useNavigate()
    const {mention} = prop;
    let name = mention;
    if (mention[0] === "@") {
        name = mention.substring(1);
    }
    return <span className="mention bold-href" onClick={() => {navigate(`/name/${name}/user`)}}>{mention}</span>
}

export function Content(prop: {description: string, author: User}) {
    const parts = prop.description.split(/([@#][^ \n@#]+)/g)
    const result: any[] = []
    for (let i = 0; i < parts.length; i++) {
        if (i % 2 === 0) {
            result.push(parts[i])
        }
        else {
            if (parts[i][0] === "#") {
                // hash tag
                result.push(<HashTag key={i} hashtag={parts[i]} />)
            } else {
                // mention user
                result.push(<Mention key={i} mention={parts[i]} />)
            }
        }
    }
    return <p className="post-description"><Mention mention={prop.author.name}/> {result}</p>;
}

export function SquareImage(prop: {src: string, size: string}) {
    return <img src={prop.src} alt="" className="post-img" />
}

export function RoundImage(prop: {src: string, size: string}) {
    return <img src={prop.src} alt="" width={prop.size} height={prop.size} style={{"borderRadius": "50%"}} />
}


export function UserBrief(user: User) {

    let {photo, name} = user;

    if (photo === null || photo.id === -1) {
        photo = {
            id: -1,
            path: "/default-profile.png"
        };
    }

    return (
        <div className="user-brief">
            <RoundImage src={photo.path} size={"30px"} />
            <b>{name}</b>
        </div>
    )
}

export interface ResourcePage {
    index: number,
    size?: number,
    lastPage: boolean
}

function getTime(date: Date): string {
    /**
     *  < 1 min : 방금 전
     * 1min ~ 59min: x 분 전
     * 1h ~ 23h: x 시간 전
     * ~2일: 어제
     * 2일 ~ 365 : x 일 전
     * ~ : x 년 전
     */
    const now = new Date();
    let sub = (now.getTime() - date.getTime()) / 1000

    if (sub < 60) {
        return "방금";
    }
    sub /= 60
    if (sub < 60) {
        return `${Math.floor(sub)} 분`;
    }
    sub /= 60
    if (sub < 24) {
        return `${Math.floor(sub)} 시간`;
    }
    sub /= 24
    if (sub < 2) {
        return "어제";
    }
    if (sub < 366) {
        return `${Math.floor(sub)} 일`
    }
    sub /= 365
    return `${Math.floor(sub)} 년`
}

export function CreatedAt(prop: {date: Date}) {
    let {date} = prop;
    if ((typeof date) === (typeof "string")) {
        date = new Date(date);
    }
    if ((typeof date) !== (typeof new Date())) {
        return <i></i>
    }
    const content = getTime(date);
    return <div className="created_at">{content}</div>
}

export function ErrorBox({error}: {error: Error}) {
    const dispatch = useDispatch();
    function close() {
        dispatch(clear());
    }
    return (
        <div className="error-box">
            <div className="window">
                <div className="title-bar">
                    <div className="title-bar-text">
                        {`ERROR_${error.code}`}
                    </div>
                    <div className="title-bar-controls">
                        <button aria-label="Close" onClick={close}></button>
                    </div>
                </div>
                <div className='window-body'>
                    {`오류!: ${error.message}`}
                </div>
            </div>
        </div>
    )
}

export function UserResultEntity({user, navigate}: {user: User, navigate: NavigateFunction}) {
    return (
        <div className="user-brief" onClick={() => {navigate(`/name/${user.name}/user`)}}>
            <RoundImage src={user.photo.path} size={"30px"} />
            <b>{user.name}</b>
        </div>
    )
}
export function HashTagResultEntity({tag, count, navigate}: {tag: string, count: number, navigate: NavigateFunction}) {
    const tagWithoutHash = tag.substring(1);
    return (
        <div onClick={() => {navigate(`/hash-tag/${tagWithoutHash}/post`)}}>
            <b>{tag}</b> <i>{count}</i>
        </div>
    )
}
