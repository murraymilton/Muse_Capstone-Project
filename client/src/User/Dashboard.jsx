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
            <div className="d-grid gap-2">
              <Link to="/searchevents" className="btn btn-primary">Search Events</Link>
              <Link to="/hotel-listings" className="btn btn-primary">Search Lodging</Link>
              <Link to="/chat" className="btn btn-primary">Chat With Event Manager or Lodging Providers</Link>
            </div>
          </div>
        </div>
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
  