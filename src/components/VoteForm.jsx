import React from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';

const VoteForm = () => {
  const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdN8HTSY2D5_xkSirAwpEdhjBFpm6s4VCqU8g18qf1wZNZ6lw/viewform";

  return (
    <section id="vote-form" className="py-20 px-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white">
            Vote for My Next Videos
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8 transition-colors duration-300">
            Help me decide what content to create next by voting on topics you're most interested in!
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <motion.a
              href={googleFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Open Voting Form <FaExternalLinkAlt className="ml-2" size={16} />
            </motion.a>
          </motion.div>
          
          <div className="mt-10 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Note: The voting form will open in a new tab. This ensures the best compatibility 
              across all devices and browsers.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VoteForm; 