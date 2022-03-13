import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom"
import { RootState } from "../reducer";

export const RequireAuth = ({component}: {component: JSX.Element}) => {
    const location = useLocation();
    const user = useSelector((state: RootState) => state.auth);

    function isAuthenticated(): boolean {
        return user.email !== "";
    }

    if (isAuthenticated()) {
        return component
    } else {
        return <Navigate to="/sign-in" state={{ from: location }} replace/>
    }
}