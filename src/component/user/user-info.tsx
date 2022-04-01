import {useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import {User} from "../../model";
import {RoundImage} from "../common";
import PostGrid from "../post/post-grid";

import * as userAPI from "../../api/user";

export default function UserInfo() {
    const params = useParams();
    const name = params.name || "";
    const [user, setUser] = useState<User>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
            if (user === undefined && loading === true) {
                userAPI.infoByName(name).then(result => {
                        setUser(result);
                        setLoading(false);
                });
            }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading]);

    if (loading) {
        return (<div>loading</div>)
    }
    if (user === undefined) {
        return <Navigate to={"/"}/>
    } else {
        return (
                <div>
                    <div className="user-info-profile">
                        <RoundImage src={user.photo.path} size="20px" />
                        <b>{user.name}</b>
                    </div>
                    <div className="user-info-bio">
                        {user.bio}
                    </div>
                    <PostGrid name={user.name} />
                </div>
               )
    }
}
