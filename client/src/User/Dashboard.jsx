import DashboardView from "../components/Navigation/DashboardView";
import PaymentNav from "../components/Navigation/PaymentNav";
import {Link} from 'react-router-dom';


const Dashboard = () => {
  
    return (
      <>
        <div className="container-fluid  p-5">
          <PaymentNav/>
        </div>
  
        <div className="container-fluid p-4">
          <DashboardView />
        </div>
  
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-10">
              <h2>Your Events</h2>
            </div>
            <div className="col md 2">
              <Link to="/" className="btn btn-primary">Search Events</Link>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default Dashboard;
  