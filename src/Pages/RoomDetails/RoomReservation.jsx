import React from "react";
import Calendar from "./Calender";
import Button from "../../components/Categories/Button/Button";

const RoomReservation = ({roomData}) => {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">$ {roomData[0].price}</div>
        <div className="font-light text-neutral-600">night</div>
      </div>
      <hr />
      <Calendar />
      <hr />
      <div className="p-4">
        <Button label="Reserver" />
      </div>
      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
        <div>Total</div>
        <div>$ 300</div>
      </div>
    </div>
  );
};

export default RoomReservation;
