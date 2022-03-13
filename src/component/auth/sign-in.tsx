import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { RedirectLocationState } from ".";
import { signIn } from "../../api/auth";
import { RootState } from "../../reducer";

import {didSignIn} from '../../reducer/auth';

export default function SignIn() {
    const auth = useSelector((state: RootState) => state.auth).email !== "";
    const [values, setValues] = useState({email: "", password: ""});

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const location = useLocation();
    const from = (location.state as RedirectLocationState)?.from?.pathname || "/";

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const {name, value} = event.target;
      setValues({...values, [name]: value});
    }

    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      signIn(values.email, values.password).then(user => {
        dispatch(didSignIn(user));
        navigate(from);
      });
    }

    if (auth) {
      return <Navigate to={from}/>
    } else {
      return (
        <div className="sing-in-form">
          <h2>Sign In</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" value={values.email} onChange={handleChange}/>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={values.password} onChange={handleChange}/>
            <input type="submit" value="Sign In" />
            <button onClick={() => navigate("/sign-up", {state: {path: from}, replace:true})}>Sign Up</button>
          </form>
        </div>
      )
    }
}