import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { signOut } from "../api/auth";
import { RootState } from "../reducer";
import { AuthState } from "../reducer/auth";
import * as signIn from "./auth/sign-in";
import * as signUp from "./auth/sign-up";
import * as postForm from "./post/post-form";


export default function GND() {
  const {user, isAthenticated}: AuthState = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  const title = "인스타그램 클론 코딩";

  const strings = {
    "title": "인스타그램 클론 코딩",
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
        return title + " : " + strings.postForm
      case signIn.path:
        return title + " : " + strings.signIn
      case signUp.path:
        return title + " : " + strings.signUp
      default:
        return title;
    }
  }
  const logo = {
    id: -1,
    path: "/logo.png"
  };

  if (user.photo === undefined || user.photo.id === -1) {
    user.photo = {
      id: -1,
      path: "/default-profile.png"
    };
  }


  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {

  }, [isAthenticated, user, dispatch])

  const UserMenus = () => {
    if (isAthenticated) {
      return (
        <section className="tabs">
          {/* TODO: user compoenent path 상수화 */}
          <menu role="tablist">
            <button role="tab" aria-selected="true" aria-controls="rootA" onClick={() => {navigate("/")}}>{strings.feeds}</button>
            <button role="tab" onClick={() => {navigate(postForm.path)}}>{strings.postForm}</button>
            <button role="tab" onClick={() => {navigate("/user/"+user.id)}}>{strings.profile}</button>
            <button role="tab" onClick={() => {signOut(dispatch)}}>{strings.signOut}</button>
          </menu>

        </section>
      )
    } else {
      return (
        <section className="tabs">
          <menu role="tablist">
            <button role="tab" onClick={() => {navigate(signIn.path)}}>{strings.signIn}</button>
            <button role="tab" onClick={() => {navigate(signUp.path)}}>{strings.signUp}</button>
          </menu>
        </section>
      )
    }
  }

  return (
    <div>
      <div className="title-bar">
        <div className="title-bar-text" onClick={() => {navigate("/")}}>
          {Title(location.pathname)}
        </div>
      </div>
      <UserMenus/>
    </div>
  )
}