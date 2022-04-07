import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Navigate, useParams} from "react-router-dom";
import * as userAPI from "../../api/user";
import * as followAPI from "../../api/follow";
import {Photo, User} from "../../model";
import {RootState} from "../../reducer";
import {RoundImage} from "../common";
import PostGrid from "../post/post-grid";


export default function UserInfo() {
    const params = useParams();
    const name = params.name || "";

    const auth = useSelector((state: RootState) => state.auth);

    const [user, setUser] = useState<User>();
    const [loading, setLoading] = useState(true);

    const [editMode, setEditMode] = useState(false);
    const [profileValue, setProfileValue] = useState<User>();
    const [profilePhotoFile, setProfilePhotoFile] = useState<File>();

    useEffect(() => {
        if (user === undefined && loading === true) {
            userAPI.infoByName(name).then(result => {
                setUser(result);
                setLoading(false);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, user]);


    function launchEditMode() {
        setProfileValue(user);
        setEditMode(true);
    }

    async function editProfile() {
        if (profileValue !== undefined && user !== undefined) {
            setLoading(true);
            if (user.bio !== profileValue.bio)
                await userAPI.updateBio(profileValue);
            if (profilePhotoFile !== undefined)
                await userAPI.updateProfilePhoto(profileValue, profilePhotoFile);
            setUser(undefined);
        }
        setProfileValue(undefined);
        setProfilePhotoFile(undefined);
        setEditMode(false)
    }

    function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        if (profileValue === undefined) return;
        const {name, value} = event.target;
        setProfileValue({...profileValue, [name]: value});
    }

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (profileValue === undefined) return;
        const {files} = event.target;
        if (files !== null && files?.length === 1) {
            const photo: Photo = {id: -122, path: URL.createObjectURL(files[0])}
            setProfilePhotoFile(files[0]);
            setProfileValue({...profileValue, photo});
        }
    }

    function FollowButton(user: User) {
        async function followToggle() {
            setLoading(true);
            if (user.following) {
                await followAPI.unfollow(user.id)
            } else {
                await followAPI.follow(user.id)
            }
            setUser(undefined);
        }
        return <button onClick={followToggle}>{user.following? "팔로잉" : "팔로우" }</button>
    }

    if (loading) {
        return (<div>loading</div>)
    }
    if (user === undefined) {
        return <Navigate to={"/"} />
    } else {
        return (
            <div>
                {editMode && profileValue !== undefined ?
                    <div>
                        <div className="user-info-profile" >
                            <img
                                onClick={() => {document.getElementById('profile-form-input-files')?.click()}}
                                src={profileValue.photo.path} alt="" width="50px" height="50px" style={{"borderRadius": "50%"}} />
                            <b>{user.name}</b>
                        </div>
                        <div className="user-info-bio">
                            <input id="profile-form-input-files" type="file" onChange={handleFileChange} />
                            <textarea name="bio" rows={4} value={profileValue.bio} onChange={handleChange} />
                            <div>
                                <button onClick={editProfile}>수정</button>
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        <div className="user-info-profile">
                            <RoundImage src={user.photo.path} size="50px" />
                            <b>{user.name}</b>
                        </div>
                        <div className="user-info-bio">
                            <pre>
                                {user.bio}
                            </pre>
                            <div>
                                <button>{`팔로워 ${user.follower_count}`}</button>
                                <button>{`팔로잉 ${user.following_count}`}</button>
                                {auth.user.id === user.id ?
                                    <button onClick={launchEditMode}>수정</button>
                                    :
                                    <FollowButton {...user}/>
                                }
                            </div>
                        </div>
                    </div>
                }
                <PostGrid name={user.name} />
            </div>
        )
    }
}
