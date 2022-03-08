export default function SignIn() {
    return(
      <div className="sing-in-form">
        <h2>Sign In</h2>
        <form>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
          <input type="submit" value="Login" />
        </form>
      </div>
    )
}