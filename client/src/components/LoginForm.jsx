const LoginForm = ({
    handleSubmit, 
    email, 
    setEmail,
    password,
    setPassword}) =>(
    <form onSubmit={handleSubmit} className="mt-3">
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
    <button disabled={!email || !password} className="btn btn-primary">Submit</button>
  </form>
);

export default LoginForm;