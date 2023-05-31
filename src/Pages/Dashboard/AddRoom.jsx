import React from 'react';
import AddRoomForm from '../../components/Forms/AddRoomForm';

const AddRoom = () => {
    // handle form submit 
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const location = form.location.value;
        const title = form.title.value;
        const location = form.location.value;
        const location = form.location.value;
        const location = form.location.value;
        const location = form.location.value;
        const location = form.location.value;
        const location = form.location.value;
        const location = form.location.value;
        const location = form.location.value;
    } 
    return <AddRoomForm handleSubmit={handleSubmit} />
};

export default AddRoom;