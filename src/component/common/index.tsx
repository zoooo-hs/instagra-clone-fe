import { User } from "../../model";

export function HashTag(prop:{hashtag: string}) {
    const {hashtag} = prop;
    if (hashtag[0] !== "#") {
        return <span>{hashtag}</span>
    }
    return <span className="hashtag"><a className="bold-href" href={"/hash-tag/"+prop.hashtag.substring(1)}>{prop.hashtag}</a></span>
}

export function Mention(prop:{mention: string}) {
    const {mention} = prop;
    if (mention[0] !== "@") {
        return <span>{mention}</span>
    }
    return <span className="mention"><a className="bold-href" href={"/user/"+mention.substring(1)}>{mention}</a></span>
}

export function Content(prop: {description: string, author: User}) {
    const parts = prop.description.split(/([@#][^ \n@#]+)/g)
    const result:any[] = []
    for (let i = 0; i < parts.length; i++) {
        if (i%2 === 0) {
            result.push(parts[i])
        }
        else {
            if (parts[i][0] === "#") {
                // hash tag
                result.push(<HashTag key={i} hashtag={parts[i]}/>)
            } else {
                // mention user
                result.push(<Mention key={i} mention={parts[i]}/>)
            }
        }
    }
    return <p className="post-description"><b>{prop.author.name}</b> {result}</p>;
}

export function SquareImage (prop: {src: string, size: string}) {
    return <img src={prop.src} alt="" className="post-img"/>
}

export function RoundImage (prop: {src: string, size: string}) {
    return <img src={prop.src} alt="" width={prop.size} height={prop.size} style={{"borderRadius": "50%"}}/>
}


export function UserBrief (user: User) {

    let {photo, name} = user;

    if (photo === null || photo.id === -1) {
        photo = {
          id: -1,
          path: "/default-profile.png"
        };
    }

    return (
        <div className="user-brief">
            <RoundImage src={photo.path} size={"30px"}/>
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