import { currencyFormatter } from "../../Actions/stripe";

const SmallCard = ({ h }) => (
  <>
    <div className="card mb-3">
      <div className="card__info mb-3">
        <div className="row no-gutters">
          <div className="col-md-4">
            <img
              src="https://source.unsplash.com/user/erondu/200x100.png?text=Muse+Connect"
              alt="unsplash-random-img"
              className="card-image img img-fluid"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h3 className="card-title">
                {h.title}{" "}
                <span className="float-right text-primary">
                  {currencyFormatter({
                    amount: h.price,
                    currency: "usd",
                  })}
                </span>
                {""}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default SmallCard;
