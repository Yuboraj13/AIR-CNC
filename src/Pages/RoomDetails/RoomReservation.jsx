import React, { useContext, useState } from "react";
import Calendar from "./Calender";
import Button from "../../components/Categories/Button/Button";
import { AuthContext } from "../../providers/AuthProvider";
import BookingModal from "../../components/Modal/BookingModal";
import { formatDistance } from "date-fns";
import { addBooking, updateStatus } from "../../api/bookings";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const RoomReservation = ({ roomData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // total price calculation
  const totalPrice =
    parseFloat(
      formatDistance(
        new Date(roomData[0].to),
        new Date(roomData[0].from)
      ).split(" ")[0]
    ) * roomData[0].price;

  const [value, setValue] = useState({
    startDate: new Date(roomData[0].from),
    endDate: new Date(roomData[0].to),
    key: "selection",
  });

  const { user, role } = useContext(AuthContext);
  const [bookingInfo, setBookingInfo] = useState({
    guest: { name: user.displayName, email: user.email, image: user.photoURL },
    host: roomData[0].host.email,
    location: roomData[0].location,
    price: totalPrice,
    to: value.endDate,
    from: value.startDate,
    title: roomData[0].title,
    roomId: roomData[0]._id,
    image: roomData[0].image,
  });

  const handleSelect = (ranges) => {
    setValue({ ...value });
  };

  const modalHandler = () => {
    addBooking(bookingInfo)
      .then((data) => {
        console.log(data);
        updateStatus(roomData[0]._id, true)
          .then((data) => {
            console.log(data);
            toast.success("Booking Successful!");
            navigate("/dashboard/mybooking");
            closeModal();
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">$ {roomData[0].price}</div>
        <div className="font-light text-neutral-600">night</div>
      </div>
      <hr />
      <Calendar handleSelect={handleSelect} value={value} />
      <hr />
      <div className="p-4">
        <Button
          onClick={() => setIsOpen(true)}
          disabled={roomData[0].host.email === user.email || roomData[0].booked}
          label="Reserver"
        />
      </div>
      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>

      <BookingModal
        modalHandler={modalHandler}
        bookingInfo={bookingInfo}
        isOpen={isOpen}
        closeModal={closeModal}
      />
    </div>
  );
};

export default RoomReservation;
