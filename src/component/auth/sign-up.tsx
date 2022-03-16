import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { RedirectLocationState } from ".";
import { emailDuplicationCheck, nameDuplicationCheck, signUp } from "../../api/auth";
import { store } from "../../reducer";
import { AuthState } from "../../reducer/auth";

export default function SignUp() {
    const {isAthendticated}: AuthState = store.getState().auth;
    const [values, setValues] = useState({email: "", name: "", password: ""});
    const [duplicated, setDuplicated] = useState({email: true, name: true});

    const navigate = useNavigate();

    const location = useLocation();
    const from = (location.state as RedirectLocationState)?.from?.pathname || "/";

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const {name, value} = event.target;
      setValues({...values, [name]: value});
    }

    const checkEmailDuplication = async(event: React.FormEvent) => {
      event.preventDefault();

      const result = await emailDuplicationCheck(values.email);
      setDuplicated({...duplicated, email: result})
    }

    const checkNameDuplication = async(event: React.FormEvent) => {
      event.preventDefault();

      const result = await nameDuplicationCheck(values.email);
      setDuplicated({...duplicated, name: result})
    }

    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      signUp(values.email, values.name, values.password).then(result => {
        navigate(from);
      });
    }
  
    if (isAthendticated) {
      return <Navigate to={from}/>
    } else {
      return(
        <div className="sign-up-form">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" value={values.email} onChange={handleChange}/>
            <button onClick={checkEmailDuplication}>이메일 중복확인</button>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={values.name} onChange={handleChange}/>
            <button onClick={checkNameDuplication}>이름 중복확인</button>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={values.password} onChange={handleChange}/>
            <input type="submit" value="Submit" disabled={duplicated.email || duplicated.name}/>
          </form>
        </div>
      )
    }
}