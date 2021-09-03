const SmallCard = ({ h }) => {
  <>
    <div className="card">
      <div className="card__info">
        <div className="card mb-3">
          <div className="row no-gutters">
            <div className="col-md-4">
              <img
                src="https://source.unsplash.com/user/erondu/900x500.png?text=Muse+Connect"
                alt="default pic Hotel"
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h3 className="card-title">
                  {h.title}
                  <span className="float-right">$0.00</span>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>;
};

export default SmallCard;
