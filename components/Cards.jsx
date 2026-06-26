import React from "react";
import { motion } from "framer-motion";

export const Spinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.div
        className="relative w-16 h-16"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0 rounded-full border-4 border-border border-t-primary"></div>
      </motion.div>
    </div>
  );
};

export const RoomCard = ({ room, onClick }) => {
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="card overflow-hidden h-full flex flex-col"
      onClick={onClick}
    >
      {/* Image */}
      <div className="w-full h-48 overflow-hidden rounded-lg mb-4">
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-dark mb-1">{room.name}</h3>
        <p className="text-sm text-gray-600 mb-3">
          {truncateText(room.description, 100)}
        </p>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
          <div>
            <p className="text-gray-600">Floor</p>
            <p className="font-semibold text-dark">{room.floor}</p>
          </div>
          <div>
            <p className="text-gray-600">Capacity</p>
            <p className="font-semibold text-dark">{room.capacity} people</p>
          </div>
        </div>

        {/* Amenities */}
        {room.amenities.length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Amenities</p>
            <div className="flex flex-wrap gap-2">
              {room.amenities.slice(0, 3).map((amenity, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                >
                  {amenity}
                </span>
              ))}
              {room.amenities.length > 3 && (
                <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                  +{room.amenities.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Price & Button */}
        <div className="mt-auto pt-4 border-t border-border flex justify-between items-center">
          <span className="text-lg font-bold text-primary">
            ${room.hourlyRate}/hr
          </span>
          <button className="btn-primary px-4 py-2 text-sm">
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export const LoadingSkeletonCard = () => {
  return (
    <div className="card h-full animate-pulse">
      <div className="w-full h-48 bg-border rounded-lg mb-4"></div>
      <div className="h-6 bg-border rounded w-3/4 mb-3"></div>
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-border rounded w-full"></div>
        <div className="h-4 bg-border rounded w-4/5"></div>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="h-8 bg-border rounded"></div>
        <div className="h-8 bg-border rounded"></div>
      </div>
      <div className="h-10 bg-border rounded mt-auto"></div>
    </div>
  );
};
