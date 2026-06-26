import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { roomsAPI } from "../utils/api";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { RoomCard, LoadingSkeletonCard, Spinner } from "../components/Cards";

function MyListingsContent() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await roomsAPI.getUserRooms();
      if (response.data.success) {
        setRooms(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
      toast.error("Failed to load your listings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary">
      <div className="bg-primary/10 py-8 mb-8">
        <div className="container-max flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-dark">My Listings</h1>
            <p className="text-gray-700">Manage your study rooms</p>
          </div>
          <button
            onClick={() => navigate("/add-room")}
            className="btn-primary"
          >
            + Add New Room
          </button>
        </div>
      </div>

      <section className="section-padding">
        <div className="container-max">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <LoadingSkeletonCard key={i} />
              ))}
            </div>
          ) : rooms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rooms.map((room) => (
                <div
                  key={room._id}
                  onClick={() => navigate(`/rooms/${room._id}`)}
                  className="cursor-pointer"
                >
                  <RoomCard room={room} />
                </div>
              ))}
            </div>
          ) : (
            <div className="card text-center py-12">
              <p className="text-xl text-gray-600 mb-4">You haven't listed any rooms yet.</p>
              <button
                onClick={() => navigate("/add-room")}
                className="btn-primary"
              >
                Add Your First Room
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function MyListings() {
  return (
    <ProtectedRoute>
      <MyListingsContent />
    </ProtectedRoute>
  );
}
