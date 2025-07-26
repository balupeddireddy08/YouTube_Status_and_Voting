import React from 'react';
import { motion } from 'framer-motion';
import { FaYoutube, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import UpcomingVideos from '../components/UpcomingVideos';
import VoteForm from '../components/VoteForm';
import profilePic from '../media/images/my_pic.png';

const Home = () => {
  // Function to scroll to a section
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4 text-center">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="mb-6 flex justify-center">
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-red-600 shadow-xl">
                <img 
                  src={profilePic} 
                  alt="Peddi Reddy Bala Gopal Reddy" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-800 dark:text-white transition-colors duration-300">
              YouTube Content Roadmap
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 transition-colors duration-300">
              Welcome to my content roadmap! This is where you can follow the progress of upcoming videos 
              and get a sneak peek at what I'm currently working on.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <motion.a
                href="https://www.youtube.com/@PEDDIREDDYBALAGOPALREDDY"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center">
                  <FaYoutube className="mr-2" size={20} />
                  Subscribe
                </div>
              </motion.a>

              <motion.button
                onClick={() => scrollToSection('upcoming-videos')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                See Upcoming Videos
              </motion.button>

              <motion.button
                onClick={() => scrollToSection('vote-form')}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Vote for Next Videos
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Videos Section */}
      <UpcomingVideos />

      {/* Vote Form Section */}
      <VoteForm />

      {/* Footer */}
      <footer className="py-12 px-4 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto">
          <div className="flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 transition-colors duration-300">
              Connect With Me
            </h2>
            
            <div className="flex space-x-6 mb-8">
              <motion.a 
                href="https://www.youtube.com/@PEDDIREDDYBALAGOPALREDDY"
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500 transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaYoutube size={28} />
              </motion.a>
              
              <motion.a 
                href="https://twitter.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-600 hover:text-blue-400 dark:text-gray-400 dark:hover:text-blue-300 transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTwitter size={28} />
              </motion.a>
              
              <motion.a 
                href="https://linkedin.com/in/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-600 hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-600 transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaLinkedin size={28} />
              </motion.a>
              
              <motion.a 
                href="https://github.com/balupeddireddy08" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaGithub size={28} />
              </motion.a>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">
              &copy; {new Date().getFullYear()} Peddi Reddy Bala Gopal Reddy. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home; 