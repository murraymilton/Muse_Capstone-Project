import DashboardView from "../components/Navigation/DashboardView";
import PaymentNav from "../components/Navigation/PaymentNav";
import {Link} from 'react-router-dom';
import { userHotelBookings } from "../Actions/hotel";
import { useSelector } from "react-redux";
import {useState, useEffect} from "react"
import BookingCard from "../components/HotelCards/BookingCard";

const Dashboard = () => {
  const {
    auth: { token },
  } = useSelector((state) => ({ ...state }));
  const [booking, setBooking] = useState([]);

  useEffect(() => {
    loadUserBookings();
  }, []);

  const loadUserBookings = async () => {
    const res = await userHotelBookings(token);
    console.log(res);
    setBooking(res.data);
  };
  
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
            <div id="dash22"className="text-center">
            <div id="btnbtn"className="d-grid gap-2">
              <Link to="/searchevents" className="btn btn-dark">Find A Location</Link>
              <Link to="/venuefinder" className="btn btn-dark">Search Venues</Link>
              <Link to="/hotel-listings" className="btn btn-dark">Search Lodging</Link>
              <Link to="/chat" className="btn btn-dark">Chat With Event Manager or Lodging Providers</Link>
            </div>
            </div>
          </div>
        </div>
        {/* Making revisons to booking section for users info */}
        <div className="row">
        {booking.map((b) => (
          <BookingCard
            key={b._id}
            hotel={b.hotel}
            session={b.session}
            orderedBy={b.orderedBy}
          />
        ))}
      </div>
      </>
    );
  };
  
  export default Dashboard;
  