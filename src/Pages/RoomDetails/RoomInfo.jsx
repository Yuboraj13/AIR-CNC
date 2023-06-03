import React from "react";

const RoomInfo = ({roomData}) => {
  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div
          className="
            text-xl 
            font-semibold 
            flex 
            flex-row 
            items-center
            gap-2
          "
        >
          <div>{roomData[0].host.name}</div>

          <img
            className="rounded-full"
            height="30"
            width="30"
            alt="Avatar"
            src={roomData[0].host.image}
          />
        </div>
        <div
          className="
            flex 
            flex-row 
            items-center 
            gap-4 
            font-light
            text-neutral-500
          "
        >
          <div>{roomData[0].guest} guest</div>
          <div>{roomData[0].bedrooms} rooms</div>
          <div>{roomData[0].bathrooms} bathrooms</div>
        </div>
      </div>

      <hr />
      <div
        className="
      text-lg font-light text-neutral-500"
      >
        {roomData[0].description}
      </div>
      <hr />
    </div>
  );
};

export default RoomInfo;
