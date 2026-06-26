import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { roomsAPI } from "../utils/api";
import { ProtectedRoute } from "../components/ProtectedRoute";

const AMENITIES_OPTIONS = [
  "Whiteboard",
  "Projector",
  "Wi-Fi",
  "Power Outlets",
  "Quiet Zone",
  "Air Conditioning",
];

function AddRoomContent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    floor: "",
    capacity: "",
    hourlyRate: "",
    amenities: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAmenityToggle = (amenity) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.image || !formData.floor || !formData.capacity || !formData.hourlyRate) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      await roomsAPI.createRoom(formData);
      toast.success("Room added successfully!");
      navigate("/my-listings");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add room");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary">
      <div className="bg-primary/10 py-8 mb-8">
        <div className="container-max">
          <h1 className="text-4xl font-bold text-dark">Add New Room</h1>
          <p className="text-gray-700">List your study room and start earning</p>
        </div>
      </div>

      <section className="section-padding">
        <div className="container-max max-w-2xl">
          <form onSubmit={handleSubmit} className="card space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-dark mb-2">Room Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Quiet Study Room"
                className="input-field"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-dark mb-2">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your room..."
                className="input-field"
                rows="4"
                required
              />
            </div>

            {/* Image */}
            <div>
              <label className="block text-sm font-medium text-dark mb-2">Image URL *</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="input-field"
                required
              />
              {formData.image && (
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg mt-4"
                />
              )}
            </div>

            {/* Floor */}
            <div>
              <label className="block text-sm font-medium text-dark mb-2">Floor *</label>
              <input
                type="text"
                name="floor"
                value={formData.floor}
                onChange={handleChange}
                placeholder="e.g., 3rd Floor"
                className="input-field"
                required
              />
            </div>

            {/* Capacity */}
            <div>
              <label className="block text-sm font-medium text-dark mb-2">Capacity (Number of People) *</label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                placeholder="e.g., 4"
                className="input-field"
                required
              />
            </div>

            {/* Hourly Rate */}
            <div>
              <label className="block text-sm font-medium text-dark mb-2">Hourly Rate ($) *</label>
              <input
                type="number"
                step="0.01"
                name="hourlyRate"
                value={formData.hourlyRate}
                onChange={handleChange}
                placeholder="e.g., 5.00"
                className="input-field"
                required
              />
            </div>

            {/* Amenities */}
            <div>
              <label className="block text-sm font-medium text-dark mb-3">Amenities</label>
              <div className="grid grid-cols-2 gap-3">
                {AMENITIES_OPTIONS.map((amenity) => (
                  <label key={amenity} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.amenities.includes(amenity)}
                      onChange={() => handleAmenityToggle(amenity)}
                      className="w-4 h-4 rounded border-border"
                    />
                    <span className="text-dark">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary flex-1 disabled:opacity-50"
              >
                {loading ? "Adding Room..." : "Add Room"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/my-listings")}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default function AddRoom() {
  return (
    <ProtectedRoute>
      <AddRoomContent />
    </ProtectedRoute>
  );
}
