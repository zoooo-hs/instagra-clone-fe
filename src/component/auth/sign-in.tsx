import React, { useEffect, useState } from "react";
import { signIn } from "../../api/auth";
import { User } from "../../model";

function emptyUser(): User {
  return {email: "", name: "", id: -1, bio:"", photo: {id:-1, path:""}};
}

export default function SignIn() {
  
    const [values, setValues] = useState({email: "", password: ""});
    const [user, setUser] = useState<User>(emptyUser());
    const [isAuthenticated, setAuthenticated] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const {name, value} = event.target;
      setValues({...values, [name]: value});
    }

    useEffect(() => {}, [isAuthenticated])

    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      const signInedUser = await signIn(values.email, values.password);
      setUser({...signInedUser});
      setAuthenticated(true);
    }

    const handleLogout = () => {
      setUser(emptyUser());
      setAuthenticated(false);
    }

    if (!isAuthenticated) {
      return (
      <div className="sing-in-form">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" value={values.email} onChange={handleChange}/>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={values.password} onChange={handleChange}/>
          <input type="submit" value="Login" />
        </form>
      </div>
      )
    } else {
      return (<div><h1>hello {user.name}</h1><button onClick={handleLogout}>logout</button></div>)
    }
}