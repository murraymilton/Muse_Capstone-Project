import { useState } from "react";
import { currencyFormatter } from "../../Actions/stripe";
import { diffDays } from "../../Actions/hotel";
import { useHistory, Link } from "react-router-dom";
import OrderModal from "../modals/OrderModal";
import StarRatings from "react-star-ratings";
const BookingCard = ({ hotel, session, orderedBy, _id }) => {
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
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
                <StarRatings
                  rating={4}
                  starRatedColor="yellow"
                  starHoverColor="yellow"
                  starDimension="35px"
                  changeRating={(newRating, name) =>
                    console.log("newRating", newRating, "name", _id)
                  }
                  isSelectable={true}
                  numberOfStars={5}
                  name={_id}
                />
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
