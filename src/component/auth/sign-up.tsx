import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { RedirectLocationState } from ".";
import * as AuthAPI from "../../api/auth";
import { store } from "../../reducer";
import { AuthState } from "../../reducer/auth";

export const path = "/sign-up"

export default function SignUp() {
    const {isAthenticated}: AuthState = store.getState().auth;
    const [values, setValues] = useState({email: "", name: "", password: ""});
    const [duplicated, setDuplicated] = useState({email: true, name: true});

    const navigate = useNavigate();
    const location = useLocation();
    const from = (location.state as RedirectLocationState)?.from?.pathname || "/";

    const strings = {
      email: "이메일",
      name: "이름",
      password: "비밀번호",
      signUp: "회원가입",
      submit: "제출",
      checkEmailDuplication: "이메일 중복 확인",
      checkNameDuplication: "이름 중복 확인"
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const {name, value} = event.target;
      setValues({...values, [name]: value});
    }

    const checkEmailDuplication = async(event: React.FormEvent) => {
      event.preventDefault();

      const result = await AuthAPI.checkEmailDuplication(values.email);
      setDuplicated({...duplicated, email: result})
    }

    const checkNameDuplication = async(event: React.FormEvent) => {
      event.preventDefault();

      const result = await AuthAPI.checkNameDuplication(values.email);
      setDuplicated({...duplicated, name: result})
    }

    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      
      AuthAPI.signUp(values.email, values.name, values.password).then(() => {
        navigate(from);
      });
    }
  
    if (isAthenticated) {
      return <Navigate to={from}/>
    } else {
      return(
        <div className="sign-up-form">
          <h2>{strings.signUp}</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">{strings.email}</label>
            <input type="text" id="email" name="email" value={values.email} onChange={handleChange} required/>
            <button onClick={checkEmailDuplication}>{strings.checkEmailDuplication}</button>

            <label htmlFor="name">{strings.name}</label>
            <input type="text" id="name" name="name" value={values.name} onChange={handleChange} required/>
            <button onClick={checkNameDuplication}>{strings.checkNameDuplication}</button>

            <label htmlFor="password">{strings.password}</label>
            <input type="password" id="password" name="password" value={values.password} onChange={handleChange} required/>

            <input type="submit" value={strings.submit} disabled={duplicated.email || duplicated.name}/>
          </form>
        </div>
      )
    }
}