
const RegisterForm = ({
    handleSubmit, 
    firstname, 
    setFirstname, 
    lastname, 
    setLastname,
    username,
    setUserName,
    email, 
    setEmail,
    password,
    setPassword,
    role,
    setRole}) =>(
    <form onSubmit={handleSubmit} className="mt-3">
   <div className="form-group mb-3">
      <label className="my-1 mr-2">User Role</label>
      <select
        type="User Role"
        className="form-control"
        placeholder="User Role"
        value={role}
        onChange={(event) => setRole(event.target.value)}
      >
      <option selected>Choose</option>
      <option value="1">Buyer</option>
      <option value="2">Seller</option>
      </select>
    </div>
    <div className="form-group mb-3">
      <label className="form-label">First Name</label>
      <input
        type="text"
        className="form-control"
        placeholder="Enter Name"
        value={firstname}
        onChange={(event) => setFirstname(event.target.value)}
      />
    </div>
    <div className="form-group mb-3">
      <label className="form-label">Last Name</label>
      <input
        type="text"
        className="form-control"
        placeholder="Enter Name"
        value={lastname}
        onChange={(event) => setLastname(event.target.value)}
      />
    </div>
    <div className="form-group mb-3">
      <label className="form-label">Username</label>
      <input
        type="text"
        className="form-control"
        placeholder="Enter username"
        value={username}
        onChange={(event) => setUserName(event.target.value)}
      />
    </div>
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
    
    <button  disabled={!username || !email || !password} className="btn btn-primary">Submit</button>
  </form>
);

export default RegisterForm;

// disabled={!firstname|| lastname|| !username || !email || !password}