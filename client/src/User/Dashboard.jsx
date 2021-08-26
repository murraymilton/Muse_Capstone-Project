import DashboardView from "../components/Navigation/DashboardView";
import PaymentNav from "../components/Navigation/PaymentNav";



const Dashboard = () => {
    return (
      <>
        <div className="container-fluid  p-5">
          <PaymentNav/>
        </div>
  
        <div className="container-fluid p-4">
          <DashboardView />
        </div>
  
        <div className="container">
          <p>Show All Venues and Locations</p>
        </div>
      </>
    );
  };
  
  export default Dashboard;
  