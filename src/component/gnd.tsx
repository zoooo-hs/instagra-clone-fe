import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "../api/auth";
import { RootState } from "../reducer";
import { didSignOut } from "../reducer/auth";

export default function GND() {
  const {user, isAthendticated} = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const naviate = useNavigate();

  useEffect(() => {}, [isAthendticated])

  const goToRoot = () => {
    naviate("/");
  }

  const logout = () => {
    signOut();
    dispatch(didSignOut());
    window.location.reload();
  }

  const logoutButton = <button onClick={logout}>sign out</button>

  const underTitle = () => {
    if (isAthendticated) {
      return <h2>{user.name}님 환영합니다. {logoutButton}</h2>
    } else {
      return <h2>환영합니다.</h2>
    }

  }

  return(
    <div>
      <h1 onClick={goToRoot}>Instagram Clone Project</h1>
      {underTitle()}
    </div>
  )
}