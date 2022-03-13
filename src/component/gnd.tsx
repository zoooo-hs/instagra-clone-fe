import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../reducer";
import { signOut } from "../reducer/auth";

export default function GND() {
  let auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const naviate = useNavigate();

  const goToRoot = () => {
    naviate("/");
  }

  const logout = () => {
    dispatch(signOut())
    goToRoot();
  }

  const logoutButton = <button onClick={logout}>sign out</button>

  const underTitle = () => {
    if (auth.email === "") {
      // not authenticated
      return <h2>환영합니다.</h2>
    } else {
      return <h2>{auth.name}님 환영합니다. {logoutButton}</h2>
    }

  }

  return(
    <div>
      <h1 onClick={goToRoot}>Instagram Clone Project</h1>
      {underTitle()}
    </div>
  )
}