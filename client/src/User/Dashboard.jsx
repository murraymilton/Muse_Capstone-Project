import DashboardView from "../components/DashboardView";

const Dashboard = () => {
    return (
      <>
        <div className="container-fluid  p-5">
          <h1>Dashboard</h1>
        </div>
  
        <div className="container-fluid p-4">
          <DashboardView />
        </div>
  
        <div className="container">
          <p>Show all bookings and a button to browse hotels</p>
        </div>
      </>
    );
  };
  
  export default Dashboard;
  