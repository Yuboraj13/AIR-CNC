import React from "react";
import Heading from "../../components/Heading/Heading";

const Header = ({ roomData }) => {
  console.log(roomData)
  return (
    <>
      <Heading
        title={roomData[0].title}
        subtitle={roomData[0].subtitle}
      />
      <div className="w-full md:h-[60vh] overflow-hidden rounded-xl">
        <img
          className="object-cover w-full"
          src={roomData[0].image}
          alt="header image"
        />
      </div>
    </>
  );
};

export default Header;
