import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useDocumentTitle from '../utils/useDocumentTitle';

export default function NotFound() {
  useDocumentTitle('Page not found');
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-bold text-dark mb-4">Page Not Found</h2>
        <p className="text-lg text-gray-700 mb-8 max-w-md">
          Sorry, the page you're looking for doesn't exist. Let's get you back on track.
        </p>
        <Link to="/" className="btn-primary text-lg">
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
