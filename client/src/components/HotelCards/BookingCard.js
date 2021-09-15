import { useState } from "react";
import { currencyFormatter } from "../../Actions/stripe";
import { diffDays, updateRating } from "../../Actions/hotel";
import { useSelector } from "react-redux";
import OrderModal from "../modals/OrderModal";
import StarRatings from "react-star-ratings";
import RatingModal from "../modals/RatingModal";

const BookingCard = ({ hotel, session, orderedBy, _id }) => {
  const { auth } = useSelector((state) => ({ ...state }));
  const [showModal, setShowModal] = useState(false);

  const handleUpdateRating = (newRating) => {
    if (auth && auth.token) {
      updateRating(auth.token, { star: newRating }, hotel._id).then((res) => {
        console.log("hey==>>>", res);
      });
    }
  };

  const userHotelRating = hotel.ratings.find(
    (rating) => rating.postedBy.toString() === auth.user._id.toString()
  );

  console.log(
    "hotel==>>",
    "hotel",
    "auth==>>",
    "auth",
    "gg==>>>",
    userHotelRating
  );

  return (
    <>
      <div className="card mb-3">
        <div className="card__info mb-3">
          <div className="row no-gutters">
            <div className="col-md-4">
              {hotel.image && hotel.image.contentType ? (
                <img
                  src={`${process.env.REACT_APP_API}/hotel/image/${hotel._id}`}
                  alt="default hotel image"
                  className="card-image img img-fluid"
                />
              ) : (
                <img
                  src="https://source.unsplash.com/user/erondu/500x100.png?text=Muse+Connect"
                  alt="unsplash-random-img"
                  className="card-image img img-fluid"
                />
              )}
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h3 className="card-title">
                  {hotel.title}{" "}
                  <span className="float-right text-primary">
                    {currencyFormatter({
                      amount: hotel.price * 100,
                      currency: "usd",
                    })}
                  </span>
                  {""}
                </h3>
                {/* <p className="alert alert-info">{hotel.location}</p> */}
                {/* Using a substring function to minimize the amount of char on display */}
                <p className="card-text">{`${hotel.description.substring(
                  0,
                  200
                )}....`}</p>
                <p className="card-text">
                  <span className="float-rigth text-primary">
                    for {diffDays(hotel.from, hotel.to)}{" "}
                    {diffDays(hotel.from, hotel.to) <= 1 ? "day" : "days"}
                  </span>
                </p>
                <p className="card-text">{hotel.bed} bed</p>
                <p className="card-text">
                  Available from {new Date(hotel.from).toLocaleDateString()}
                </p>
                {/* <RatingModal> */}
                {/* <StarRatings
                  rating={userHotelRating.star}
                  name={_id}
                  starRatedColor="orange"
                  starHoverColor="orange"
                  starDimension="35px"
                  changeRating={handleUpdateRating}
                  isSelectable={true}
                  numberOfStars={5}
                  orderedBy={orderedBy}
                /> */}
                {/* </RatingModal> */}

                {showModal && (
                  <OrderModal
                    session={session}
                    orderedBy={orderedBy}
                    showModal={showModal}
                    setShowModal={setShowModal}
                  />
                )}
                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                  <button
                    onClick={() => setShowModal(!showModal)}
                    className="btn btn-dark"
                  >
                    Review Payment Information
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingCard;
