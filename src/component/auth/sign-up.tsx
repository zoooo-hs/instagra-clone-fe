import { useState } from "react";

export default function SignUp() {

    const [values, setValues] = useState({email: "", name: "", password: ""});

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const {name, value} = event.target;
      setValues({...values, [name]: value});
    }

    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      // sign-up api call
    }
  
    return(
      <div className="sign-up-form">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" value={values.email} onChange={handleChange}/>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={values.name} onChange={handleChange}/>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={values.password} onChange={handleChange}/>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
}