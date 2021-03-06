import React, {useState} from "react";
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import {RedirectLocationState} from ".";
import * as AuthAPI from "../../api/auth";
import {store} from "../../reducer";
import {AuthState} from '../../reducer/auth';
import * as signUp from "./sign-up";

export const path = "/sign-in";

export default function SignIn() {
    const {isAthenticated}: AuthState = store.getState().auth;
    const [values, setValues] = useState({email: "", password: ""});

    const navigate = useNavigate();
    const location = useLocation();
    const from = (location.state as RedirectLocationState)?.from?.pathname || "/";

    const strings = {
        email: "이메일",
        password: "비밀번호",
        signUp: "회원가입",
        signIn: "로그인",
        submit: "제출"
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setValues({...values, [name]: value});
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        AuthAPI.signIn(store.dispatch, values.email, values.password).then(() => {
            navigate(from);
        });
    }

    if (isAthenticated) {
        return <Navigate to={from} />
    } else {
        return (
            <article role="tabpanel" id="ic-tab-sign-in">
                <div className="sign-in-form">
                    <form onSubmit={handleSubmit}>
                        <div className="field-row-stacked auth-input">
                            <label htmlFor="email">{strings.email}</label>
                            <input type="email" name="email" value={values.email} onChange={handleChange} required />
                            <label htmlFor="password">{strings.password}</label>
                            <input type="password" name="password" value={values.password} onChange={handleChange} required />
                        </div>
                        <section className="field-row">
                            <button type="submit">{strings.submit}</button>
                            <button onClick={() => navigate(signUp.path, {state: {path: from}, replace: true})}>{strings.signUp}</button>
                        </section>
                    </form>
                </div>
            </article>
        )
    }
}
