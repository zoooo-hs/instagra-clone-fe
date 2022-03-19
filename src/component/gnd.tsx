import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "../api/auth";
import { RootState } from "../reducer";
import { AuthState } from "../reducer/auth";

import * as postForm from "./post/post-form";
import * as signIn from "./auth/sign-in";
import * as signUp from "./auth/sign-up";

export default function GND() {
  const {user, isAthenticated}: AuthState = useSelector((state: RootState) => state.auth);
  const title = "인스타그램 클론 코딩";

  const strings = {
    "title": "인스타그램 클론 코딩",
    "profile": "내 정보",
    "signOut": "로그아웃",
    "signIn": "로그인",
    "signUp": "회원가입",
    "postForm": "새 글 작성"
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
        <div>
          <img className="profile-photo-small" src={user.photo.path} alt="" style={{"width": "48px", "height": "48px"}}/>
          {/* TODO: user compoenent path 상수화 */}
          <button onClick={() => {navigate("/user/"+user.id)}}>{strings.profile}</button>
          <button onClick={() => {signOut(dispatch)}}>{strings.signOut}</button>
          <button onClick={() => {navigate(postForm.path)}}>{strings.postForm}</button>
        </div>
      )
    } else {
      return (
        <div>
          <button onClick={() => {navigate(signIn.path)}}>{strings.signIn}</button>
          <button onClick={() => {navigate(signUp.path)}}>{strings.signUp}</button>
        </div>
      )
    }
  }

  return (
    <div>
      <div onClick={() => {navigate("/")}}>
        <img src={logo.path} alt="" style={{"width": "48px", "height": "48px"}}/>
        <h1>{title}</h1>
      </div>
      <UserMenus/>
    </div>
  )
}