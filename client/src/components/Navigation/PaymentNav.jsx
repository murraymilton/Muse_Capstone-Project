import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, Avatar, Badge } from "antd";
import moment from "moment";
import {Bar} from 'react-chartjs-2'




import {
  getAccountBalance,
  currencyFormatter,
  payoutSetting,
} from "../../Actions/stripe";
import { SettingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";



//  Will destruct the state of the image to capture the badge propertie only
const { Meta } = Card;
const { Ribbon } = Badge;




const PaymentNav = () => {
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
    <div className="d-flex justify-content-around">
      <Card>
        <Meta
          avatar={<Avatar>{user.firstname[0]}</Avatar>}
          title={user.firstname}
          description={`Joined ${moment(user.createdAt).fromNow()}`}
        />
      </Card>
      {auth &&
        auth.user &&
        auth.user.stripe_seller &&
        auth.user.stripe_seller.charges_enabled && (
          <>
            <Ribbon text="Balance " color="blue">
              <Card className="bg-light pt-1">
                {balance &&
                  balance.pending &&
                  balance.pending.map((bp, i) => (
                    <span key={i} className="lead">
                      {currencyFormatter(bp)}
                    </span>
                  ))}
              </Card>
            </Ribbon>
            <Ribbon text="Payouts" color="blue">
              <Card onClick={handlePayoutSettings} className="bg-light pointer">
                <SettingOutlined className="h5 pt-2" />
              </Card>
            </Ribbon>
          </>
        )}
    </div>
  );
};

export default PaymentNav;
