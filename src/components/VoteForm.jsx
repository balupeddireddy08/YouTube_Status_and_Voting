import React from 'react';
import { motion } from 'framer-motion';

const VoteForm = () => {
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
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors duration-300">
            Help me decide what content to create next by voting on topics you're most interested in!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-xl p-4 md:p-6 mx-auto max-w-3xl"
        >
          <div className="relative aspect-auto w-full overflow-hidden rounded-lg">
            <iframe 
              src="https://docs.google.com/forms/d/e/1FAIpQLSdN8HTSY2D5_xkSirAwpEdhjBFpm6s4VCqU8g18qf1wZNZ6lw/viewform?embedded=true" 
              width="100%" 
              height="2400" 
              frameBorder="0" 
              marginHeight="0" 
              marginWidth="0"
              className="mx-auto"
              title="Vote for Next Videos"
            >
              Loading…
            </iframe>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VoteForm; 