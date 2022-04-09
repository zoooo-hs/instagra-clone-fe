import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import * as followAPI from "../../api/follow";
import * as userAPI from "../../api/user";
import {Photo, User} from "../../model";
import {RootState} from "../../reducer";
import {RoundImage, UserResultEntity} from "../common";
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

    const [showFollowDetail, setShowFollowDetail] = useState<FollowListType>("none");

    useEffect(() => {
        if ((user === undefined && loading === true) || (user !== undefined && user.name !== name)) {
            setShowFollowDetail("none");
            userAPI.infoByName(name).then(result => {
                setUser(result);
                setLoading(false);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, name]);


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
        return <button onClick={followToggle}>{user.following ? "팔로잉" : "팔로우"}</button>
    }

    type FollowListType = "none" | "following" | "follower";
    function FollowList({type, userId, onClose}: {type: FollowListType, userId: number, onClose: () => void}) {
        const [users, setUsers] = useState<User[]>([]);
        const navigate = useNavigate();
        useEffect(() => {
            switch (type) {
                case "follower":
                    followAPI.findByFollowUserId(userId).then(result => {
                        setUsers(result);
                    });
                    break;
                case "following":
                    followAPI.findByUserId(userId).then(result => {
                        setUsers(result);
                    });
                    break;
                default:
                    setUsers([]);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [userId]);
        return (
            <div className="follow-list modal">
                <div className="window">
                    <div className="title-bar">
                        <div className="title-bar-text"> {type} </div>
                        <div className="title-bar-controls">
                            <button aria-label="Close" onClick={onClose}></button>
                        </div>
                    </div>
                    <div className="window-body">
                        {users.map((u, index) => <UserResultEntity key={index} user={u} navigate={navigate} />)}
                    </div>
                </div>

            </div>
        )
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
                                {showFollowDetail !== "none" ?
                                    <FollowList type={showFollowDetail} userId={user.id} onClose={() => {setShowFollowDetail("none")}} />
                                    : null}
                                <button disabled={user.follower_count === 0} onClick={() => {setShowFollowDetail("follower")}}>{`팔로워 ${user.follower_count}`}</button>
                                <button disabled={user.following_count === 0} onClick={() => {setShowFollowDetail("following")}}>{`팔로잉 ${user.following_count}`}</button>
                                {auth.user.id === user.id ?
                                    <button onClick={launchEditMode}>수정</button>
                                    :
                                    <FollowButton {...user} />
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
