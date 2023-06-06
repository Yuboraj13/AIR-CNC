import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Container from "../Shared/Container/Container";
import Card from "./Card/Card";
import Loader from "../Shared/Loader/Loader";
import { useSearchParams } from "react-router-dom";
import Heading from "../Heading/Heading";
import { getAllRooms } from "../../api/rooms";

const Rooms = () => {
  // question about useSearchParams
  const [params, setParams] = useSearchParams();
  console.log(params);
  const category = params.get("category");
  console.log(category);
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    setLoading(true);
    getAllRooms()
      .then((data) => {
        if (category) {
          const filtered = data.filter((room) => room.category === category);
          setRooms(filtered);
        } else {
          setRooms(data);
        }

        setLoading(false);
      })
      .catch((error) => console.log(error.message));
  }, [category]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Container>
      {rooms && rooms.length > 0 ? (
        <div className="pt-12 gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5">
          {rooms.map((room, index) => (
            <Card key={index} data={room} />
          ))}
        </div>
      ) : (
        <div className="min-h-[calc(100vh-300px)] flex items-center justify-center">
          <Heading
            title={"No Rooms Available In This Category!"}
            subtitle={"Please Select Other Categories"}
            center={true}
          />
        </div>
      )}
    </Container>
  );
};

export default Rooms;
