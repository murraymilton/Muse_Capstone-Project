import React, { useState } from "react";
import { Modal, Button } from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { StarOutlined } from "@ant-design/icons";

const RatingModal = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <div onClick={() => setModalVisible(true)}>
        <StarOutlined />
      </div>
    </>
  );
};
