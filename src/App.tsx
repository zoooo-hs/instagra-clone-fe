import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignIn, * as signIn from './component/auth/sign-in';
import SignUp from './component/auth/sign-up';
import PostForm from './component/post/post-form';
import PostList from './component/post/post-list';
import { RequireAuth } from './component/RequireAuth';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { signOut } from "./api/auth";
import { RootState } from "./reducer";
import { AuthState } from "./reducer/auth";
import * as signUp from "./component/auth/sign-up";
import * as postForm from "./component/post/post-form";

function App() {
  const {user, isAthenticated}: AuthState = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  useEffect(() => {

  }, [isAthenticated, user, dispatch])

  const Menus = () => {
    if (isAthenticated) {
      return (
        <menu role="tablist">
          <button role="tab" aria-selected={location.pathname==="/"} aria-controls="ic-tab-feeds" onClick={() => {navigate("/")}}>{strings.feeds}</button>
          <button role="tab" aria-selected={location.pathname===postForm.path} aria-controls="ic-tab-post-form" onClick={() => {navigate(postForm.path)}}>{strings.postForm}</button>
          <button role="tab" aria-selected={location.pathname.startsWith("/user/")} aria-controls="ic-tab-user-info" onClick={() => {navigate("/user/"+user.id)}}>{strings.profile}</button>
          <button role="tab" onClick={() => {signOut(dispatch)}}>{strings.signOut}</button>
        </menu>
      )
    } else {
      return (
        <menu role="tablist">
          <button role="tab" aria-selected={location.pathname===signIn.path} aria-controls="ic-tab-sign-in" onClick={() => {navigate(signIn.path)}}>{strings.signIn}</button>
          <button role="tab" aria-selected={location.pathname===signUp.path} aria-controls="ic-tab-sign-out" onClick={() => {navigate(signUp.path)}}>{strings.signUp}</button>
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
        </div>
        <div className='window-body'>
          <section className="tabs">
            <Menus/>
            <Routes>
              <Route path={signIn.path} element={<SignIn/>} />
              <Route path="sign-up" element={<SignUp/>} />
              <Route path="/post-form" element={
                <RequireAuth component={<PostForm />}/>
              } />
              <Route path="/" element={
                <RequireAuth component={<PostList />}/>
              } />
            </Routes>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;