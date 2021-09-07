import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { stripeSuccessRequest } from "../Actions/stripe";
import { LoadingOutlined } from "@ant-design/icons";

const StripeSuccess = ({ match, history }) => {
  const {
    auth: { token },
  } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    console.log("Send token to:", match.params.hotelId);
    stripeSuccessRequest(token, match.params.hotelId).then((res) => {
      if (res.data.success) {
        history.push("/dashboard");
        console.log("stripe:", res.data);
      } else {
        history.push("/stripe/cancel");
      }
    });
  }, [match.params.hotelId]);

  return (
    <div className="container">
      <div className="d-flex justify-content-center p-5">
        <LoadingOutlined className="display-1 text-success p-5" />
      </div>
    </div>
  );
};

export default StripeSuccess;
