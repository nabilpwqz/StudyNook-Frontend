import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { roomsAPI } from "../utils/api";
import { RoomCard, LoadingSkeletonCard } from "../components/Cards";

export default function Home() {
  const navigate = useNavigate();
  const [latestRooms, setLatestRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestRooms = async () => {
      try {
        const response = await roomsAPI.getLatestRooms();
        if (response.data.success) {
          setLatestRooms(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
        toast.error("Failed to load rooms");
      } finally {
        setLoading(false);
      }
    };

    fetchLatestRooms();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-20 md:py-32">
        <div className="container-max text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-dark mb-4"
          >
            Find Your Perfect Study Room
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto"
          >
            Browse and book quiet, private study rooms in your library. List your own room and earn extra income.
          </motion.p>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            onClick={() => navigate("/rooms")}
            className="btn-primary text-lg"
          >
            Explore Rooms
          </motion.button>
        </div>
      </section>

      {/* Latest Rooms Section */}
      <section className="section-padding">
        <div className="container-max">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-bold text-dark mb-12 text-center"
          >
            Available Study Rooms
          </motion.h2>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <LoadingSkeletonCard key={i} />
              ))}
            </div>
          ) : latestRooms.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {latestRooms.map((room) => (
                <motion.div
                  key={room._id}
                  variants={itemVariants}
                  onClick={() => navigate(`/rooms/${room._id}`)}
                  className="cursor-pointer"
                >
                  <RoomCard room={room} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No rooms available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-secondary">
        <div className="container-max">
          <h2 className="text-3xl font-bold text-dark mb-12 text-center">Why Choose StudyNook?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Easy Booking", desc: "Browse, search and book in minutes" },
              { title: "Safe & Secure", desc: "Protected transactions and verified listings" },
              { title: "Quality Rooms", desc: "Only the best study spaces available" },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="card text-center"
              >
                <h3 className="text-2xl font-bold text-primary mb-4">{feature.title}</h3>
                <p className="text-gray-700">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
