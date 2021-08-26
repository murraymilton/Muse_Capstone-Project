import DashboardView from "../components/DashboardView";

const DashboardSeller = () => {
  return (
    <>
      <div className="container-fluid  p-5">
        <h1>Dashboard</h1>
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

export default DashboardSeller;