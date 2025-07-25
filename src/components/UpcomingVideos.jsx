import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaYoutube, FaPlus, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import UpcomingVideo from './UpcomingVideo';
import { videoService } from '../services/videoService';

const UpcomingVideos = () => {
  const [videos, setVideos] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load videos when component mounts
    const loadVideos = () => {
      try {
        const allVideos = videoService.getAllVideos();
        setVideos(allVideos);
      } catch (error) {
        console.error('Error loading videos:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadVideos();
  }, []);

  // Calculate overall progress for a video
  const calculateProgress = (video) => {
    const completedSteps = video.progress.filter(step => step.completed).length;
    const currentStepProgress = video.progress.find(step => !step.completed)?.percentage || 0;
    
    const completedPercentage = (completedSteps / 5) * 100; // 5 is the total number of steps
    const currentStepContribution = currentStepProgress / 5;
    
    return completedPercentage + currentStepContribution;
  };

  // Sort videos by progress
  const sortVideos = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    
    const sortedVideos = [...videos].sort((a, b) => {
      const progressA = calculateProgress(a);
      const progressB = calculateProgress(b);
      
      return newSortOrder === 'asc' 
        ? progressA - progressB 
        : progressB - progressA;
    });
    
    setVideos(sortedVideos);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section id="upcoming-videos" className="py-20 px-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-2">
            <FaYoutube className="text-red-600 text-4xl mr-3" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white">
              Upcoming Videos
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors duration-300">
            Track the progress of videos I'm currently working on and see what's coming next.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          </div>
        ) : (
          <>
            {videos.length > 0 ? (
              <>
                <div className="flex justify-end mb-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={sortVideos}
                    className="flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg transition-colors"
                  >
                    Sort by Progress
                    {sortOrder === 'asc' ? (
                      <FaSortAmountUp className="ml-2" />
                    ) : (
                      <FaSortAmountDown className="ml-2" />
                    )}
                  </motion.button>
                </div>

                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  variants={container}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                >
                  {videos.map((video) => (
                    <UpcomingVideo key={video.id} video={video} />
                  ))}
                </motion.div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400 mb-6">No upcoming videos at the moment.</p>
              </div>
            )}
          </>
        )}

        <div className="flex justify-center mt-12">
          <motion.a
            href="https://www.youtube.com/@PEDDIREDDYBALAGOPALREDDY"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaYoutube className="mr-2" size={20} />
            Check out my YouTube channel
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default UpcomingVideos; 