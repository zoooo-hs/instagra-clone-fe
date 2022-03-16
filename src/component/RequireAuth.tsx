import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { refresh } from "../api/auth";
import { RootState } from "../reducer";
import { didSignIn } from "../reducer/auth";

export const RequireAuth = ({component}: {component: JSX.Element}) => {
    const location = useLocation();

    let { isAthendticated } = useSelector((state: RootState) => state.auth);
    const [isLoading, setLoading] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
      if (isAthendticated) {
        setLoading(false);
      } else {
        setLoading(true);
        refresh().then(result => {
          dispatch(didSignIn(result));
          setLoading(false);
        }).catch(() => {
          setLoading(false);
        })
      }
    }, [isLoading, isAthendticated, dispatch]);

    if (isLoading) {
      // TODO: loading component만들기
        return <div>loading ...</div>
    }
    if (isAthendticated) {
        return component
    } else {
        return <Navigate to="/sign-in" state={{ from: location }} replace/>
    }
}