import { currencyFormatter } from "../../Actions/stripe";
import { diffDays } from "../../Actions/hotel";
import { useHistory, Link } from "react-router-dom";
import { Button } from "antd";
import StarRatings from "react-star-ratings";

const SmallCard = ({
  h,
  handleHotelDelete = (d) => d,
  seller = false,
  showViewMoreButton = true,
}) => {
  const history = useHistory();
  return (
    <>
      <div className="card mb-3">
        <div className="card__info mb-3">
          <div className="row no-gutters">
            <div className="col-md-4">
              {h.image && h.image.contentType ? (
                <img
                  src={`${process.env.REACT_APP_API}/hotel/image/${h._id}`}
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
                  {h.title}{" "}
                  <span className="float-right text-primary">
                    {currencyFormatter({
                      amount: h.price * 100,
                      currency: "usd",
                    })}
                  </span>
                  {""}
                </h3>
                {/* <p className="alert alert-info">{h.location}</p> */}
                {/* Using a substring function to minimize the amount of char on display */}
                <p className="card-text">{`${h.description.substring(
                  0,
                  200
                )}....`}</p>
                <p className="card-text">
                  <span className="float-rigth text-primary">
                    for {diffDays(h.from, h.to)}{" "}
                    {diffDays(h.from, h.to) <= 1 ? "day" : "days"}
                  </span>
                </p>
                <p className="card-text">{h.bed} bed</p>
                <p className="card-text">
                  Available from {new Date(h.from).toLocaleDateString()}
                </p>
                {/* Creating all controls to be inherited from the parent class */}
                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                  {showViewMoreButton && (
                    <button
                      onClick={() => history.push(`/hotel/${h._id}`)}
                      className="btn btn-primary"
                    >
                      Show more
                    </button>
                  )}
                  {seller && (
                    <>
                      <Link to={`/hotel/edit/${h._id}`}>
                        <button
                          type="button"
                          size="large"
                          className="btn btn-warning btn-lg"
                        >
                          Edit{" "}
                        </button>
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleHotelDelete(h._id)}
                        className="btn btn-danger btn-lg"
                      >
                        Delete{" "}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SmallCard;
