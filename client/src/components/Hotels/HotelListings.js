import { useState, useEffect } from "react";
import SmallCard from "../HotelCards/SmallCard";
import { allHotels } from "../../Actions/hotel";
import Search from "../Forms/Search";

const HotelListings = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    loadAllhotels();
  }, []);

  const loadAllhotels = async () => {
    let res = await allHotels();
    setHotels(res.data);
  };
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
