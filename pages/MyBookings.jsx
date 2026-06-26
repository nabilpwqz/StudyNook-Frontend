import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { bookingsAPI } from "../utils/api";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { Spinner, LoadingSkeletonCard } from "../components/Cards";

function MyBookingsContent() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await bookingsAPI.getUserBookings();
      if (response.data.success) {
        setBookings(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to load your bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      await bookingsAPI.cancelBooking(bookingId);
      toast.success("Booking cancelled successfully");
      fetchBookings();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to cancel booking");
    }
  };

  const canCancelBooking = (booking) => {
    const bookingDate = new Date(booking.date);
    const today = new Date();
    return booking.status === "confirmed" && bookingDate >= today;
  };

  return (
    <div className="min-h-screen bg-secondary">
      <div className="bg-primary/10 py-8 mb-8">
        <div className="container-max">
          <h1 className="text-4xl font-bold text-dark">My Bookings</h1>
          <p className="text-gray-700">View and manage your room reservations</p>
        </div>
      </div>

      <section className="section-padding">
        <div className="container-max">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="card h-24 animate-pulse bg-border"></div>
              ))}
            </div>
          ) : bookings.length > 0 ? (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking._id} className="card">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    {/* Room Info */}
                    <div>
                      <p className="text-sm text-gray-600">Room</p>
                      <p className="font-semibold text-dark">{booking.room.name}</p>
                    </div>

                    {/* Date & Time */}
                    <div>
                      <p className="text-sm text-gray-600">Date & Time</p>
                      <p className="font-semibold text-dark">
                        {new Date(booking.date).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-700">
                        {booking.startTime} - {booking.endTime}
                      </p>
                    </div>

                    {/* Cost & Status */}
                    <div>
                      <div className="mb-2">
                        <p className="text-sm text-gray-600">Total Cost</p>
                        <p className="font-semibold text-primary text-lg">${booking.totalCost}</p>
                      </div>
                      <div>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                            booking.status === "confirmed"
                              ? "bg-success/10 text-success"
                              : "bg-error/10 text-error"
                          }`}
                        >
                          {booking.status === "confirmed" ? "Confirmed" : "Cancelled"}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end">
                      {canCancelBooking(booking) && (
                        <button
                          onClick={() => handleCancelBooking(booking._id)}
                          className="px-4 py-2 bg-error/10 text-error rounded-lg hover:bg-error/20 transition-colors font-semibold"
                        >
                          Cancel Booking
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Special Note */}
                  {booking.specialNote && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-sm text-gray-600">Special Note:</p>
                      <p className="text-dark">{booking.specialNote}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="card text-center py-12">
              <p className="text-xl text-gray-600 mb-4">You haven't booked any rooms yet.</p>
              <a href="/rooms" className="btn-primary">
                Browse Rooms
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function MyBookings() {
  return (
    <ProtectedRoute>
      <MyBookingsContent />
    </ProtectedRoute>
  );
}
