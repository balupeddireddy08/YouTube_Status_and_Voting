import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaYoutube, FaBars, FaTimes, FaVoteYea } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to handle anchor link clicks
  const scrollToSection = (id) => {
    // Close mobile menu if open
    if (isOpen) setIsOpen(false);
    
    // Navigate to home page first if not there
    if (location.pathname !== '/') {
      // Wait for navigation to complete
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Already on home page, just scroll
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'py-2 bg-white bg-opacity-90 dark:bg-gray-900 dark:bg-opacity-90 shadow-md backdrop-blur-md' 
        : 'py-4 bg-transparent'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center text-gray-900 dark:text-white transition-colors"
        >
          <FaYoutube className="text-red-600 text-3xl mr-2" />
          <span className="font-bold text-xl">Content Roadmap</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            to="/"
            className={`transition-colors ${
              location.pathname === '/' 
                ? 'text-gray-900 dark:text-white font-medium' 
                : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
            }`}
          >
            Home
          </Link>
          <button 
            onClick={() => scrollToSection('upcoming-videos')}
            className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
          >
            Upcoming Videos
          </button>
          <button 
            onClick={() => scrollToSection('vote-form')}
            className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors flex items-center"
          >
            <FaVoteYea className="mr-1" size={14} />
            Vote
          </button>
          <a 
            href="https://www.youtube.com/@PEDDIREDDYBALAGOPALREDDY/videos"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
          >
            Latest Videos
          </a>
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <ThemeToggle />
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="ml-4 text-gray-700 dark:text-gray-300 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white dark:bg-gray-900 shadow-lg"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link 
              to="/"
              className={`transition-colors ${
                location.pathname === '/' 
                  ? 'text-gray-900 dark:text-white font-medium' 
                  : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <button 
              onClick={() => scrollToSection('upcoming-videos')}
              className="text-left text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white py-2 transition-colors"
            >
              Upcoming Videos
            </button>
            <button 
              onClick={() => scrollToSection('vote-form')}
              className="text-left text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white py-2 transition-colors flex items-center"
            >
              <FaVoteYea className="mr-2" size={14} />
              Vote for Next Videos
            </button>
            <a 
              href="https://www.youtube.com/@PEDDIREDDYBALAGOPALREDDY/videos"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white py-2 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Latest Videos
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar; 