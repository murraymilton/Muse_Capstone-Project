import { useState } from "react";
import DashboardView from "../components/Navigation/DashboardView";
import PaymentNav from "../components/Navigation/PaymentNav";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {HomeOutlined} from "@ant-design/icons"
import accountCreate from "../Actions/paymentAuth";
import {toast} from "react-toastify"


const DashboardSeller = () => {
  const {auth} = useSelector((state) => ({...state}));
  const [loading, setLoading] = useState(false);


  const handleclick = async () => {
    setLoading(true);
    try{
      let res = await accountCreate(auth.token)
      console.log(res)
    }catch(error){
      console.log(error)
      toast.error("There was a problem creating your accountL Try again later");
      setLoading(false);
    }
  };

  const connected = () =>  (
    <div className="container-fluid">
          <div className="row">
            <div className="col-md-10">
              <h2>Your Events</h2>
            </div>
            <div className="col md 2">
              <Link to="/venues/new" className="btn btn-primary">Add Venues/Events</Link>
            </div>
          </div>
        </div>
  )

const notConnected = () => (
  <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 offset-md-3 text-center">
              <HomeOutlined className="h1"/>
              <h4>Add Payment Method To Post Your Events and Venues</h4>
              <p className="lead">MERN parterns with stripe to transfer</p>
              <button disabled={loading} onClick={handleclick}className="btn btn-primary mb-3">{loading ? "Loading...." : "Process Balances"} Setup Payment Information</button>
              <p className="text-muted"><small>You will be redirected upon completion of registration</small></p>
            </div>
          </div>
        </div>
)

  return (
    <>
      <div className="container-fluid  p-5">
       <PaymentNav/>
      </div>

      <div className="container-fluid p-4">
        <DashboardView />
      </div>
      {auth && auth.user && auth.user.stripe_seller && 
      auth.user.stripe_seller.charges_enabled ? connected() : notConnected()}

      <pre>{JSON.stringify(auth,null, 4)}</pre>
    </>
  );
};

export default DashboardSeller;