import { useState } from "react";
import * as SearchAPI from "../../api/search";
import { HashTag, User } from "../../model";
import { RoundImage } from "../common";


function UserResultEntity(prop: {user: User}) {
    const {user} = prop;
    return (
        <div className="user-brief">
            <RoundImage src={user.photo.path} size={"30px"}/>
            <b>{user.name}</b>
        </div>  
    )
}
function HashTagResultEntity(prop: {tag: string, count: number}) {
    const {tag, count} = prop;
    return (
        <div>
            <b>{tag}</b> <i>{count}</i>
        </div>
    )
}

interface SearchFormValue {
    searchKey: SearchAPI.SearchType,
    keyword: string
}

export function Search() {
    const [values, setValues] = useState<SearchFormValue>({searchKey: "HASH_TAG", keyword: ""});

    const [hashTagResults, setHashTagResults] = useState<HashTag[]>([]);
    const [userResults, setUserResults] = useState<User[]>([]);

    const setter = {
        HASH_TAG: setHashTagResults,
        NAME: setUserResults
    }

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
        const {name, value} = event.target;
        setValues({...values, [name]: value});

        if (value === "") {
            setter[values.searchKey]([])
            return;
        }

        if (name === "keyword") {
            if (values.searchKey === "HASH_TAG") {
                SearchAPI.hashTagSearch(value, values.searchKey).then((result: HashTag[]) => {
                    setHashTagResults(result);
                });
            } else {
                SearchAPI.userSearch(value, values.searchKey).then((result: User[]) => {
                    setUserResults(result);
                });
            }
        }
    }


    return (
        <div>
            <section className="field-row">
                <select name={"searchKey"} onChange={handleChange} >
                    <option value={"NAME"}>사용자</option>
                    <option selected value={"HASH_TAG"}>해쉬태그</option>
                </select>
                <input type="text" name="keyword" id="" placeholder="검색 키워드" onChange={handleChange}/>
            </section>
            <section className="field-row-stack search-result-list">
            {
                values.searchKey === "HASH_TAG" ?
                    hashTagResults.map((hashTagResult, index) => <HashTagResultEntity key={index} tag={hashTagResult.tag} count={hashTagResult.count}/>)
                    :
                    userResults.map((userResult, index) => <UserResultEntity key={index} user={userResult}/>)
            }
            </section>
        </div>
    )
}