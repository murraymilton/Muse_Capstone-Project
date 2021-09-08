import React, { useState } from "react";
import { Modal, Button } from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { StarOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { updateRating } from "../../Actions/hotel";

const RatingModal = ({ hotel }) => {
  const { auth } = useSelector((state) => ({ ...state }));
  const [modalVisible, setModalVisible] = useState(false);
  const [stars, setStars] = useState(hotel.userRating?.star || 0);

  let history = useHistory();

  const handleModal = () => {
    if (auth && auth.token) {
      setModalVisible(true);
    } else {
      history.push("/login");
      return;
    }
  };

  console.log("user rating==>>", hotel);

  const handleUpdateRating = (newRating) => {
    if (auth && auth.token) {
      updateRating(auth.token, { star: newRating }, hotel._id).then((res) => {
        setStars(newRating);
        console.log("hey==>>>", res);
      });
    }
  };

  return (
    <>
      <div onClick={handleModal}>
        {[...Array(stars).keys()].map(() => (
          <StarOutlined className="text-warning" />
        ))}
        <br /> {auth ? "Leave Your Rating" : "Login to add your rating"}
      </div>
      <Modal
        title="Rate your experience"
        centered
        visible={modalVisible}
        onOk={() => {
          setModalVisible(false);
          toast.success("Thanks for your rating");
        }}
        onCancel={() => {
          setModalVisible(false);
        }}
      >
        <StarRatings
          rating={stars}
          starRatedColor="orange"
          starHoverColor="orange"
          starDimension="35px"
          changeRating={handleUpdateRating}
          isSelectable={true}
          numberOfStars={5}
          // orderedBy={orderedBy}
        />
      </Modal>
    </>
  );
};
export default RatingModal;
