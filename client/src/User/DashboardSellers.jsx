import { useState, useEffect } from "react";
import DashboardView from "../components/Navigation/DashboardView";
import PaymentNav from "../components/Navigation/PaymentNav";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {ProfileOutlined } from "@ant-design/icons"
import {createConnectAccount} from "../Actions/stripe"
import { sellerHotels, deleteHotel } from "../Actions/hotel";
import {toast} from "react-toastify"
import SmallCard from "../components/HotelCards/SmallCard";


const DashboardSeller = () => {
  const {auth} = useSelector((state) => ({...state}));
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    loadSellersHotels()
  }, [])

  const loadSellersHotels = async () => {
    let {data} = await sellerHotels(auth.token)
    setHotels(data)
  }

  const handleClick = async () => {
    setLoading(true);
    try {
      let res = await createConnectAccount(auth.token);
      console.log(res); 
      window.location.href = res.data;
    } catch (err) {
      console.log(err);
      toast.error("Registration Could Not Be Completed, Try again.");
      setLoading(false);
    }
  };

  const handleHotelDelete = async (hotelId) => {
    if (!window.confirm("Would you like to proceed, with the deletion of this propertie?")) return;
    deleteHotel(auth.token, hotelId).then((res) => {
      toast.success("Hotel Deleted");
      loadSellersHotels();
    });
  };


  const connected = () =>  (
    <div className="container-fluid bg-primary">
          <div className="row">
            <div className="col-md-10">
              <h2>Current Inventory</h2>
            </div>
            <div className="col md 2">
              <Link to="/hotels/new" className="btn btn-">Add Listings</Link>
            </div>
          </div>

          <div className="row">
        {hotels.map((h) => (
          <SmallCard
            key={h._id}
            h={h}
            showViewMoreButton={false}
            seller={true}
            handleHotelDelete={handleHotelDelete}
          />
        ))}
      </div>
    </div>
  );

const notConnected = () => (
  <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 offset-md-3 text-center">
              <ProfileOutlined  className="h1"/>
              <h4>Register To Add Events/ Hotels</h4>
              <p className="lead">To Complete your registration as an Event Manager or Property Seller. Click the the register button to complete the process for payout and earnings</p>
              <button disabled={loading}onClick={handleClick} className="btn btn-primary mb-3"
            >
              {loading ? "Processing..." : "Register"}
            </button>
            <p className="text-muted"><small>As part of the registration process. You will be redirected to complete the full process</small></p>
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

      {auth &&
      auth.user &&
      auth.user.stripe_seller &&
      auth.user.stripe_seller.charges_enabled
        ? connected()
        : notConnected()}

      {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}
    </>
  );
};

export default DashboardSeller;
