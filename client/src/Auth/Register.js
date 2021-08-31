import { useState } from "react";
import RegisterForm from "../components/Forms/RegisterForm";
import axios from "axios";
import { toast } from "react-toastify";
import { register } from "../Actions/auth";

const Register = ({ history }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.table({ firstname, lastname, username, email, password }); used for fetching troublshooting
    try {
      const res = await register({
        firstname,
        lastname,
        username,
        email,
        password,
        role,
      });
      console.log("REGISTER USER ===> ", res);
      toast.success("Register success. Please login.");
      history.push("/login");
    } catch (err) {
      console.log(err);
      if (err.response.status === 400) toast.error(err.response.data);
    }
  };

  return (
    <>
      <div className="container-fluid bg-purple p-5 text-center">
        <h1>Register For Account</h1>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <RegisterForm
              handleSubmit={handleSubmit}
              firstname={firstname}
              setFirstname={setFirstname}
              lastname={lastname}
              setLastname={setLastname}
              username={username}
              setUserName={setUserName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              role={role}
              setRole={setRole}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
