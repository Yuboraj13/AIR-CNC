import React, { useContext, useState } from "react";
import AddRoomForm from "../../components/Forms/AddRoomForm";
import { imageUpload } from "../../api/utils";
import { AuthContext } from "../../providers/AuthProvider";
import { addRoom } from "../../api/rooms";

const AddRoom = () => {
  const { user } = useContext(AuthContext);
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [loading, setLoading] = useState(false);
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");
  // handle form submit
  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    const form = event.target;
    const location = form.location.value;
    const title = form.title.value;
    const from = dates.startDate;
    const to = dates.endDate;
    const price = form.price.value;
    const guest = form.total_guest.value;
    const bedrooms = form.bedrooms.value;
    const bathrooms = form.bathrooms.value;
    const description = form.description.value;
    const category = form.category.value;
    const image = form.image.files[0];

    // upload image
    imageUpload(image)
      .then((data) => {
        const roomData = {
          image: data.data.display_url,
          location,
          title,
          from,
          to,
          price: parseFloat(price),
          guest,
          bathrooms,
          bedrooms,
          description,
          category,
          host: {
            name: user?.displayName,
            image: user?.photoURL,
            email: user?.email,
          },
        };
        console.log(roomData);
        // post room data to server
        addRoom(roomData)
          .then((data) => console.log(data))  
          .catch((error) => console.log(error.message));
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  };

  const handleImageChange = (image) => {
    setUploadButtonText(image.name);
  };

  const handleDates = (ranges) => {
    setDates(ranges.selection);
  };

  return (
    <AddRoomForm
      handleSubmit={handleSubmit}
      uploadButtonText={uploadButtonText}
      handleImageChange={handleImageChange}
      loading={loading}
      dates={dates}
      handleDates={handleDates}
    />
  );
};

export default AddRoom;
