import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { refresh } from "../api/auth";
import { User } from "../model";
import { RootState } from "../reducer";
import { didSignIn } from "../reducer/auth";

export const RequireAuth = ({component}: {component: JSX.Element}) => {
    const location = useLocation();
    const user: User = useSelector((state: RootState) => state.auth);
    const [isLoading, setLoading] = useState(true);
    const dispatch = useDispatch();
  
    useEffect(() => {
      if (user.email === "") {
        setLoading(true);
        refresh().then(result => {
          dispatch(didSignIn(result));
          setLoading(false);
        }).catch(() => {
          setLoading(false);
        })
      } else {
          setLoading(false);
      }
    }, [user, isLoading, dispatch]);

    function isAuthenticated(): boolean {
        return user.email !== "";
    }

    if (isLoading) {
        return <div>loading ...</div>
    }
    if (isAuthenticated()) {
        return component
    } else {
        return <Navigate to="/sign-in" state={{ from: location }} replace/>
    }
}