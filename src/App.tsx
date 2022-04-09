import {Route, Routes} from 'react-router-dom';
import './App.css';
import SignIn, * as signIn from './component/auth/sign-in';
import SignUp from './component/auth/sign-up';
import PostForm from './component/post/post-form';
import PostList from './component/post/post-list';
import {RequireAuth} from './component/RequireAuth';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {signOut} from "./api/auth";
import {RootState} from "./reducer";
import {AuthState} from "./reducer/auth";
import * as signUp from "./component/auth/sign-up";
import * as postForm from "./component/post/post-form";
import {Search} from './component/search/search';
import UserInfo from './component/user/user-info';
import * as errorState from './reducer/error';
import {ErrorBox} from './component/common';
import {setAxios} from './api';

function App() {
    const {user, isAthenticated}: AuthState = useSelector((state: RootState) => state.auth);
    const {error}: errorState.ErrorState = useSelector((state: RootState) => state.error);
    const [openForm, setOpenForm] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    setAxios(dispatch, navigate);


    const strings = {
        "title": "Instagram",
        "feeds": "피드",
        "profile": "내 정보",
        "signOut": "로그아웃",
        "signIn": "로그인",
        "signUp": "회원가입",
        "postForm": "새 글 작성"
    }

    function Title(path: string) {
        switch (path) {
            case postForm.path:
                return strings.title + " : " + strings.postForm
            case signIn.path:
                return strings.title + " : " + strings.signIn
            case signUp.path:
                return strings.title + " : " + strings.signUp
            default:
                return strings.title;
        }
    }

    const openPostForm = () => {
        setOpenForm(!openForm);
    }
    const onPostFormClose = () => {
        setOpenForm(false);
        window.location.reload();
    }

    useEffect(() => {
        console.log("render");
    }, [isAthenticated, user, dispatch, openForm])

    const TitleBarControl = () => {
        if (isAthenticated) {
            return (
                <div className="title-bar-controls">
                    <button onClick={() => {navigate("/search")}}><i className="fa-solid fa-search"></i></button>
                    <button onClick={openPostForm}><i className="fa-solid fa-plus"></i></button>
                    <button aria-label="Close" onClick={() => {signOut(dispatch)}}></button>
                </div>
            )
        }
        else {
            return null;
        }
    }

    const Menus = () => {
        if (isAthenticated) {
            return (
                null
            )
        } else {
            return (
                <menu role="tablist">
                    <button role="tab" aria-selected={location.pathname === signIn.path} aria-controls="ic-tab-sign-in" onClick={() => {navigate(signIn.path)}}>{strings.signIn}</button>
                    <button role="tab" aria-selected={location.pathname === signUp.path} aria-controls="ic-tab-sign-out" onClick={() => {navigate(signUp.path)}}>{strings.signUp}</button>
                </menu>
            )
        }
    }

    return (
        <div className="window-background">
            <div className="window">
                <div className="title-bar">
                    <div className="title-bar-text" onClick={() => {navigate("/")}}>
                        {Title(location.pathname)}
                    </div>
                    <TitleBarControl />
                </div>
                <div className='window-body'>
                    {error === undefined ? null :
                        <ErrorBox error={error} />
                    }
                    {openForm ?
                        <PostForm onClose={onPostFormClose} />
                        :
                        null
                    }
                    <Menus />
                    <Routes>
                        <Route path={signIn.path} element={<SignIn />} />
                        <Route path="sign-up" element={<SignUp />} />
                        <Route path="/search" element={
                            <RequireAuth component={<Search />} />
                        } />
                        <Route path="/hash-tag/:keyword/post" element={
                            <RequireAuth component={<PostList type='HASH_TAG' />} />
                        } />
                        <Route path="/name/:keyword/user/post" element={
                            <RequireAuth component={<PostList type='USER' />} />
                        } />
                        <Route path="/name/:name/user" element={
                            <RequireAuth component={<UserInfo />} />
                        } />
                        <Route path="/" element={
                            <RequireAuth component={<PostList type='ALL' />} />
                        } />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;
