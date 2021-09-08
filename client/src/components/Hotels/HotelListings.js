import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SmallCard from "../HotelCards/SmallCard";
import { allHotels } from "../../Actions/hotel";
import Search from "../Forms/Search";

const HotelListings = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    loadAllhotels();
  }, []);

  const loadAllhotels = async () => {
    let {data} = await allHotels();
    data = data.map(hotel => {
      const userRating = hotel.ratings.find(rating => rating.postedBy.toString() === auth.user._id.toString());
      if (userRating) hotel.userRating = userRating;
      return hotel;
    })
    setHotels(data);
  };

  console.log("hotels==>>", hotels, "auth==>>", auth);
  return (
    <>
      <div className="container-fluid  p-5 text-center">
        <h1>Lodging Listings</h1>
      </div>
      <br />
      <div className="col">
        <Search />
      </div>
      <div className="container-fluid">
        <br />
        {/* <pre>{JSON.stringify(hotels, null, 4)}</pre> */}
        {hotels.map((h) => (
          <SmallCard key={h._id} h={h} />
        ))}
      </div>
    </>
  );
};
export default HotelListings;
