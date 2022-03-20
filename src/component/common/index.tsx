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

export function Content(prop: {description: string}) {
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
    return <p className="post-description">{result}</p>;
}

export function SquareImage (prop: {src: string, size: string}) {
    return <img src={prop.src} alt="" className="post-img"/>
}

export function RoundImage (prop: {src: string, size: string}) {
    return <img src={prop.src} alt="" width={prop.size} height={prop.size} style={{"borderRadius": "50%", "padding": "5px"}}/>
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
            <Mention mention={"@"+name}/>
        </div>
    )
}

export interface ResourcePage {
    index: number,
    size?: number,
    lastPage: boolean
}