import { Link } from "react-router-dom";

const DashboardView = () => {
    
    return(

        <ul class="nav nav-pills">
  <li class="nav-item">
    <Link className={`nav-link`}to="/dashboard/performances">Your Performances</Link>
  </li>
  <li class="nav-item">
    <Link className={`nav-link`} to="/dashboard/seller">Your Venues</Link>
  </li>
  <li class="nav-item">
    <Link className={`nav-link`} to="/dashboard/message">Chat</Link>
  </li>
  
</ul>
    )
}
export default DashboardView