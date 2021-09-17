import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, Avatar, Badge } from "antd";
import moment from "moment";
import GridItem from "../Grid/GridItem"
import GridContainer from "../Grid/GridContainer"
import Store from "@material-ui/icons/Store"
import Language from "@material-ui/icons/Language"
import Icon from "@material-ui/core/Icon"
import{makeStyles} from "@material-ui/core/styles"
import DateRange from "@material-ui/icons/DateRange"
import Update from "@material-ui/icons/Update"
import CardIcon from "../Cards/CardIcon";
import Cards from "../Cards/Cards";
import CardHeader from "../Cards/CardHeader";
import CardFooter from "../Cards/CardFooter";
import CardAvatar from "../Cards/CardAvatar";
import CardBody from "../Cards/CardBody";
import styles from "../Cards/dashboardStyle"



import {
  getAccountBalance,
  currencyFormatter,
  payoutSetting,
} from "../../Actions/stripe";
import { SettingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const useStyles = makeStyles(styles);


//  Will destruct the state of the image to capture the badge propertie only
const { Meta } = Card;
const { Ribbon } = Badge;




const PaymentNav = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const { auth } = useSelector((state) => ({ ...state }));
  const { user, token } = auth;






  useEffect(() => {
    getAccountBalance(auth.token).then((res) => {
      // console.log(res);
      setBalance(res.data);
    });
  }, []);
  
  const handlePayoutSettings = async () => {
    setLoading(true);
    try {
      const res = await payoutSetting(token);
      // console.log("Return link for users payout process:", res);
      window.location.href = res.data.url;
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast("Unable to access settings. Try again");
    }
  };

  return (
    <div className="d-flex ">
      <GridContainer>
      <GridItem xs={12} sm={6} md={6} lg={3} >
      <Cards profile className="bg-light pt-1">
      <CardAvatar profile Avatar={<Avatar>{user.firstname[0]}</Avatar>}>
            <a href="#eric" onClick={(e) => e.preventDefault()}>
              <CardIcon >
              <img src="https://images.unsplash.com/photo-1627161684458-a62da52b51c3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1373&q=80.png" alt="photo User Eric" />
              </CardIcon>
            </a>
          </CardAvatar>
        <CardBody  stats icon >
          <CardFooter testimonial>
            <h4 className={classes.cardTitle}>{user.firstname}</h4>
            <h6 className={classes.cardCategory} description={`Joined `}></h6>
          
          </CardFooter>
        <Meta
          
          description={`Joined ${moment(user.createdAt).fromNow()}`}
        />
        
        </CardBody>
      </Cards>
      </GridItem>
      </GridContainer>
      {auth &&
        auth.user &&
        auth.user.stripe_seller &&
        auth.user.stripe_seller.charges_enabled && (
          <>
          
          <GridItem xs={12} sm={6} md={6} lg={3} >
            {/* <Ribbon text="Balance " color="blue"> */}
              <Cards className="bg-light pt-1">
                <CardHeader color="" stats icon>
                  <CardIcon color="success">
                    <Store/>
                  </CardIcon>
                <h3 className={classes.cardTitle}>{balance &&
                  balance.pending &&
                  balance.pending.map((bp, i) => (
                    <span key={i} className="lead">
                      {currencyFormatter(bp)}
                    </span>
                  ))}</h3>
                  <p className={classes.cardCategory}>Revenue</p>
                  </CardHeader>
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <DateRange/>
                      Last 24 Hours
                    </div>
                  </CardFooter>
              </Cards>
            {/* </Ribbon> */}
            </GridItem>
            
            <GridItem xs={12} sm={6} md={6} lg={3}>
            {/* <Ribbon text="Payouts" color="blue"> */}
              <Cards onClick={handlePayoutSettings} className="bg-light pt-1">
                <CardHeader color="info" stats icon>
                  <CardIcon color="info">
                <Language color="info" />
                </CardIcon>
                <p className={classes.cardCategory}>Withdraw Funds</p>
                <h5 className={classes.cardTitle}>Click-Here</h5>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    <Update />
                    Funds Withdraw
                  </div>
                </CardFooter>
              </Cards>
            {/* </Ribbon> */}
            </GridItem>
          </>
        )}
    </div>
  );
};

export default PaymentNav;
