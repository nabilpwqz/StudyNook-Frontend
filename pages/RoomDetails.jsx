import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { roomsAPI, bookingsAPI } from "../utils/api";
import { useAuth } from "../contexts/AuthContext";
import { Spinner } from "../components/Cards";

const HOUR_OPTIONS = [
  "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00",
  "18:00", "19:00", "20:00",
];

export default function RoomDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [bookingData, setBookingData] = useState({
    date: "",
    startTime: "",
    endTime: "",
    specialNote: "",
  });

  useEffect(() => {
    fetchRoom();
  }, [id]);

  const fetchRoom = async () => {
    try {
      const response = await roomsAPI.getRoomById(id);
      if (response.data.success) {
        setRoom(response.data.data);
        if (user && response.data.data.owner._id === user.id) {
          setIsOwner(true);
        }
      }
    } catch (error) {
      toast.error("Failed to load room details");
      navigate("/rooms");
    } finally {
      setLoading(false);
    }
  };

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateCost = () => {
    if (!bookingData.startTime || !bookingData.endTime || !room) return 0;
    const startHour = parseInt(bookingData.startTime.split(":")[0]);
    const endHour = parseInt(bookingData.endTime.split(":")[0]);
    const hours = endHour - startHour;
    return Math.max(0, hours * room.hourlyRate);
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (!bookingData.date || !bookingData.startTime || !bookingData.endTime) {
      toast.error("Please fill all required fields");
      return;
    }

    const startHour = parseInt(bookingData.startTime.split(":")[0]);
    const endHour = parseInt(bookingData.endTime.split(":")[0]);

    if (endHour <= startHour) {
      toast.error("End time must be after start time");
      return;
    }

    try {
      await bookingsAPI.createBooking({
        roomId: id,
        date: bookingData.date,
        startTime: bookingData.startTime,
        endTime: bookingData.endTime,
        specialNote: bookingData.specialNote,
      });
      toast.success("Room booked successfully!");
      setShowBooking(false);
      setBookingData({
        date: "",
        startTime: "",
        endTime: "",
        specialNote: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to book room");
    }
  };

  if (loading) return <Spinner />;

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Room not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <div className="bg-primary/10 py-8">
        <div className="container-max">
          <button
            onClick={() => navigate("/rooms")}
            className="text-primary hover:text-dark mb-4"
          >
            ← Back to Rooms
          </button>
          <h1 className="text-4xl font-bold text-dark">{room.name}</h1>
        </div>
      </div>

      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Image */}
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={room.image}
                alt={room.name}
                className="w-full h-96 object-cover rounded-lg mb-8"
              />

              {/* Description */}
              <div className="card mb-8">
                <h2 className="text-2xl font-bold text-dark mb-4">Description</h2>
                <p className="text-gray-700 leading-relaxed">{room.description}</p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="card text-center">
                  <p className="text-gray-600 text-sm">Floor</p>
                  <p className="text-2xl font-bold text-primary">{room.floor}</p>
                </div>
                <div className="card text-center">
                  <p className="text-gray-600 text-sm">Capacity</p>
                  <p className="text-2xl font-bold text-primary">{room.capacity}</p>
                </div>
                <div className="card text-center">
                  <p className="text-gray-600 text-sm">Hourly Rate</p>
                  <p className="text-2xl font-bold text-primary">${room.hourlyRate}</p>
                </div>
                <div className="card text-center">
                  <p className="text-gray-600 text-sm">Bookings</p>
                  <p className="text-2xl font-bold text-primary">{room.bookingCount}</p>
                </div>
              </div>

              {/* Amenities */}
              {room.amenities.length > 0 && (
                <div className="card mb-8">
                  <h3 className="text-xl font-bold text-dark mb-4">Amenities</h3>
                  <div className="flex flex-wrap gap-3">
                    {room.amenities.map((amenity, idx) => (
                      <span
                        key={idx}
                        className="bg-primary/10 text-primary px-4 py-2 rounded-full font-semibold"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Booking Card */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card sticky top-24"
              >
                <div className="mb-6">
                  <p className="text-4xl font-bold text-primary mb-2">${room.hourlyRate}</p>
                  <p className="text-gray-600">per hour</p>
                </div>

                {!showBooking && (
                  <button
                    onClick={() => {
                      if (!isAuthenticated) {
                        navigate("/login");
                      } else {
                        setShowBooking(true);
                      }
                    }}
                    className="btn-primary w-full mb-4"
                  >
                    {isAuthenticated ? "Book Now" : "Login to Book"}
                  </button>
                )}

                {isOwner && (
                  <div className="space-y-2">
                    <button
                      onClick={() => navigate(`/edit-room/${id}`)}
                      className="btn-secondary w-full"
                    >
                      Edit Room
                    </button>
                    <button className="btn-secondary w-full text-error border-error">
                      Delete Room
                    </button>
                  </div>
                )}

                {/* Booking Form */}
                {showBooking && (
                  <form onSubmit={handleBooking} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-dark mb-2">Date</label>
                      <input
                        type="date"
                        name="date"
                        value={bookingData.date}
                        onChange={handleBookingChange}
                        min={new Date().toISOString().split("T")[0]}
                        className="input-field"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-dark mb-2">
                        Start Time
                      </label>
                      <select
                        name="startTime"
                        value={bookingData.startTime}
                        onChange={handleBookingChange}
                        className="input-field"
                        required
                      >
                        <option value="">Select start time</option>
                        {HOUR_OPTIONS.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-dark mb-2">
                        End Time
                      </label>
                      <select
                        name="endTime"
                        value={bookingData.endTime}
                        onChange={handleBookingChange}
                        className="input-field"
                        required
                      >
                        <option value="">Select end time</option>
                        {HOUR_OPTIONS.filter((time) => {
                          if (!bookingData.startTime) return true;
                          return parseInt(time.split(":")[0]) > parseInt(bookingData.startTime.split(":")[0]);
                        }).map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-dark mb-2">
                        Special Note (Optional)
                      </label>
                      <textarea
                        name="specialNote"
                        value={bookingData.specialNote}
                        onChange={handleBookingChange}
                        placeholder="Any special requirements..."
                        className="input-field"
                        rows="3"
                      />
                    </div>

                    {bookingData.startTime && bookingData.endTime && (
                      <div className="bg-primary/10 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Total Cost:</p>
                        <p className="text-2xl font-bold text-primary">
                          ${calculateCost()}
                        </p>
                      </div>
                    )}

                    <button type="submit" className="btn-primary w-full">
                      Confirm Booking
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowBooking(false)}
                      className="btn-secondary w-full"
                    >
                      Cancel
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
