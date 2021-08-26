import DashboardView from "../components/Navigation/DashboardView";

const DashboardSeller = () => {
  return (
    <>
      <div className="container-fluid  p-5">
        <h1>Seller View</h1>
      </div>

      <div className="container-fluid p-4">
        <DashboardView />
      </div>

      <div className="container">
        <p>All Your Events and Schedules</p>
      </div>
    </>
  );
};

export default DashboardSeller;