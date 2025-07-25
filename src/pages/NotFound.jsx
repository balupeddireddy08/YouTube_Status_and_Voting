import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 flex justify-center">
            <div className="w-24 h-24 rounded-full bg-yellow-500 flex items-center justify-center">
              <FaExclamationTriangle className="text-white text-4xl" />
            </div>
          </div>

          <h1 className="text-6xl font-bold mb-4 text-gray-800 dark:text-white">404</h1>
          <h2 className="text-2xl font-semibold mb-6 text-gray-700 dark:text-gray-300">Page Not Found</h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FaHome className="mr-2" />
            Go Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound; 