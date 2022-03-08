export default function SignUp() {
    return(
      <div className="sign-up-form">
        <h2>Sign Up</h2>
        <form>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" />
          <label htmlFor="name">Name</label>
          <input type="text" id="name" />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
}