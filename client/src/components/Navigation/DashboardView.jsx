import { Link } from "react-router-dom";

const DashboardView = () => {
  const active = window.location.pathname;
  //   console.log(active);
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <Link
          className={`nav-link ${active === "/dashboard" && "active"}`}
          to="/dashboard"
        >
          Your Gigs/Performances
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className={`nav-link ${active === "/dashboard/seller" && "active"}`}
          to="/dashboard/seller"
        >
          Your Venues/Events
        </Link>
      </li>
    </ul>
  );
};

export default DashboardView;
