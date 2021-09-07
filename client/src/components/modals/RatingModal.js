import React, { useState } from "react";
import { Modal, Button } from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { StarOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

const RatingModal = ({ children }) => {
  const { auth } = useSelector((state) => ({ ...state }));
  const [modalVisible, setModalVisible] = useState(false);

  let history = useHistory();

  const handleModal = () => {
    if (auth && auth.token) {
      setModalVisible(true);
    } else {
      history.push("/login");
      return;
    }
  };

  return (
    <>
      <div onClick={handleModal}>
        <StarOutlined className="text-warning" />
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
        {children}
      </Modal>
    </>
  );
};
export default RatingModal;
