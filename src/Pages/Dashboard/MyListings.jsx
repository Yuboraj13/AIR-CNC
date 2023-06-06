import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import RoomDataRow from "../../components/Dashboard/RoomDataRow";
import EmptyState from "../../components/Shared/EmptyState/EmptyState";
import { useAxiosSecure } from "../../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const MyListings = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  // const [myListing, setMyListing] = useState([]);

  // // get request using axios

  // axiosSecure.get("/rooms");

  // const fetchListing = () => {
  //   axiosSecure(`/rooms/${user.email}`)
  //     .then((data) => {
  //       setMyListing(data.data);
  //     })
  //     .catch((error) => console.log(error));
  // };

  // console.log(myListing);

  // useEffect(() => {
  //   fetchListing();
  // }, [user]);

  const { data: myListing = [], refetch } = useQuery({
    queryKey: ["rooms", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/rooms/${user.email}`);
      return res.data;
    },
  });

  return (
    <>
      {myListing && Array.isArray(myListing) && myListing.length > 0 ? (
        <div className="container mx-auto px-4 sm:px-8">
          <div className="py-8">
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Location
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        From
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        To add
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Delete
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Update
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {myListing.map((listing) => (
                      <RoomDataRow
                        key={listing._id}
                        listing={listing}
                        refetch={refetch}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <EmptyState
          message={"You did not add any room yet!"}
          address={"/dashboard/add-room"}
          label={"Add Room"}
        />
      )}
    </>
  );
};

export default MyListings;
