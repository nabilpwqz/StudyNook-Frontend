import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Server_URL } from '../../utils/config';
import { showErrorToast, showSuccessToast } from '../../utils/toasthelper';
import Spinner from '../../components/Spinner';

import useDocumentTitle from '../../utils/useDocumentTitle';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${Server_URL}bookings/my`, { withCredentials: true });
      setBookings(res.data.bookings || []);
    } catch (err) {
      console.error(err);
      showErrorToast('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  useDocumentTitle('My Bookings');

  const cancelBooking = async (id) => {
    if (!window.confirm('Cancel this booking?')) return;
    try {
      await axios.patch(`${Server_URL}bookings/${id}/cancel`, {}, { withCredentials: true });
      showSuccessToast('Booking cancelled');
      fetchBookings();
    } catch (err) {
      console.error(err);
      showErrorToast(err.response?.data?.message || 'Failed to cancel booking');
    }
  };

  if (loading) return <Spinner />;

  if (!bookings || bookings.length === 0) return <p>You have no bookings yet.</p>;

  return (
    <div className="container mt-4">
      <h2>My Bookings</h2>
      <div className="list-group">
        {bookings.map(b => (
          <div key={b._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h5>{b.roomId?.title || 'Room'}</h5>
              <p className="mb-0">{new Date(b.startTime).toLocaleString()} → {new Date(b.endTime).toLocaleString()}</p>
              <small className="text-muted">Status: {b.status}</small>
            </div>
            <div>
              {b.status === 'Active' && (
                <button className="btn btn-sm btn-danger" onClick={() => cancelBooking(b._id)}>Cancel</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

