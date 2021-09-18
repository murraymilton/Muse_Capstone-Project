import './LoginForm.css'

const LoginForm = ({
    handleSubmit, 
    email, 
    setEmail,
    password,
    setPassword}) =>(
 <body className="text-center">
    <form  onSubmit={handleSubmit} className=" form-signin">
      
    <div className="form-group mb-3">
      <label className="form-label">Email</label>
      <input
        type="email"
        className="form-control"
        placeholder="Enter email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
    </div>

    <div className="form-group mb-3">
      <label className="form-label">Password</label>
      <input
        type="password"
        className="form-control"
        placeholder="Enter password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
    </div>
    <button disabled={!email || !password} className="btn btn-lg btn-dark btn-block">Submit</button>
  </form>
</body>
);

export default LoginForm;