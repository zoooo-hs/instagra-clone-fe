import React, { useState } from "react"

export default function SignIn() {
  
    const [values, setValues] = useState({email: "", password: ""});

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const {name, value} = event.target;
      setValues({...values, [name]: value});
    }

    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      // sign-in api call
    }

    return(
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
}