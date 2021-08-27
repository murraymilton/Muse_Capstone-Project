import DashboardView from "../components/Navigation/DashboardView";
import PaymentNav from "../components/Navigation/PaymentNav";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {HomeOutlined} from "@ant-design/icons"

const DashboardSeller = () => {
  const {auth} = useSelector((state) => ({...state}));


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
              <button className="btn btn-primary mb-3"> Setup Payment Information</button>
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