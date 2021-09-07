import { Modal } from "antd";
import "./OrderModal.css";

const OrderModal = ({ session, orderedBy, showModal, setShowModal }) => {
  return (
    <Modal
      visible={showModal}
      title="User Payment History"
      onCancel={() => setShowModal(!showModal)}
    >
      <p>User Transaction ID: {session.payment_intent}</p>
      <p>User Payment Status: {session.payment_status}</p>
      <p>
        Amount total: {session.currency.toUpperCase()}{" "}
        {session.amount_total / 100}
      </p>
      <p>User Customer Id: {session.customer}</p>
      <p>Customer: {orderedBy.firstname}</p>
    </Modal>
  );
};
export default OrderModal;
