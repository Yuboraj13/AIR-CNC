import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import RoomDetails from "../Pages/RoomDetails/RoomDetails";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../layouts/Dashboard";
import AddRoom from "../Pages/Dashboard/AddRoom";
import { getAllRooms } from "../api/rooms";
import MyBookings from "../Pages/Dashboard/MyBookings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/room/:id",
        element: (
          <PrivateRoute>
            <RoomDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) => getAllRooms(params.id),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/add-room",
        element: <AddRoom />,
      },
      {
        path: "/dashboard/mybooking",
        element: <MyBookings />
      },
    ],
  },
]);
