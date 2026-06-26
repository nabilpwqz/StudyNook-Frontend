import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { roomsAPI } from "../utils/api";
import { RoomCard, LoadingSkeletonCard } from "../components/Cards";

const AMENITIES_OPTIONS = [
  "Whiteboard",
  "Projector",
  "Wi-Fi",
  "Power Outlets",
  "Quiet Zone",
  "Air Conditioning",
];

export default function Rooms() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  useEffect(() => {
    fetchRooms();
  }, [search, selectedAmenities]);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const params = {
        search: search || undefined,
        amenities: selectedAmenities.length > 0 ? selectedAmenities.join(",") : undefined,
      };

      const response = await roomsAPI.getAllRooms(params);
      if (response.data.success) {
        setRooms(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
      toast.error("Failed to load rooms");
    } finally {
      setLoading(false);
    }
  };

  const handleAmenityToggle = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <div className="bg-primary/10 py-8">
        <div className="container-max">
          <h1 className="text-4xl font-bold text-dark mb-2">Study Rooms</h1>
          <p className="text-gray-700">Discover and book the perfect study space</p>
        </div>
      </div>

      <div className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="card sticky top-24">
                <h3 className="text-lg font-semibold text-dark mb-4">Filters</h3>

                {/* Search */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-dark mb-2">
                    Search by Name
                  </label>
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search rooms..."
                    className="input-field"
                  />
                </div>

                {/* Amenities */}
                <div>
                  <label className="block text-sm font-medium text-dark mb-3">
                    Amenities
                  </label>
                  <div className="space-y-2">
                    {AMENITIES_OPTIONS.map((amenity) => (
                      <label key={amenity} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedAmenities.includes(amenity)}
                          onChange={() => handleAmenityToggle(amenity)}
                          className="w-4 h-4 rounded border-border"
                        />
                        <span className="text-dark">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Rooms Grid */}
            <div className="lg:col-span-3">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[1, 2, 3, 4].map((i) => (
                    <LoadingSkeletonCard key={i} />
                  ))}
                </div>
              ) : rooms.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                  <p className="text-xl text-gray-600">No rooms found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
