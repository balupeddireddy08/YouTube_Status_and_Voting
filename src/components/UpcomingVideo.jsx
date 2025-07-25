import React from 'react';
import { motion } from 'framer-motion';
import { FaYoutube } from 'react-icons/fa';

// Define the progress steps for videos
const PROGRESS_STEPS = [
  { id: 'resource', name: 'Resource Gathering', color: 'bg-blue-500' },
  { id: 'content', name: 'Developing Content', color: 'bg-indigo-500' },
  { id: 'recording', name: 'Video Recording', color: 'bg-purple-500' },
  { id: 'editing', name: 'Video Editing', color: 'bg-pink-500' },
  { id: 'finalizing', name: 'Finalizing Edits', color: 'bg-red-500' }
];

const UpcomingVideo = ({ video }) => {
  // Calculate overall progress percentage
  const progressPercentage = () => {
    const completedSteps = video.progress.filter(step => step.completed).length;
    const currentStepProgress = video.progress.find(step => !step.completed)?.percentage || 0;
    
    const completedPercentage = (completedSteps / PROGRESS_STEPS.length) * 100;
    const currentStepContribution = currentStepProgress / PROGRESS_STEPS.length;
    
    return completedPercentage + currentStepContribution;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg p-6 transition-colors duration-300"
    >
      <div className="flex items-start mb-4">
        <div className="flex-shrink-0 mr-4">
          {video.thumbnail ? (
            <img 
              src={video.thumbnail} 
              alt={video.title} 
              className="w-24 h-24 object-cover rounded-lg"
            />
          ) : (
            <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <FaYoutube className="text-red-600 text-4xl" />
            </div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">{video.title}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{video.description}</p>
          <div className="text-xs text-gray-500 dark:text-gray-500">
            Expected: {video.expectedReleaseDate}
          </div>
        </div>
      </div>

      {/* Overall progress bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Overall Progress</span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{Math.round(progressPercentage())}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div 
            className="bg-gradient-to-r from-red-500 to-blue-500 h-2.5 rounded-full transition-all duration-500" 
            style={{ width: `${progressPercentage()}%` }}
          ></div>
        </div>
      </div>

      {/* Individual steps progress */}
      <div className="space-y-3">
        {PROGRESS_STEPS.map((step, index) => {
          const videoStep = video.progress.find(s => s.id === step.id);
          const isCompleted = videoStep?.completed || false;
          const stepPercentage = videoStep?.percentage || 0;
          
          return (
            <div key={step.id} className="group">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${isCompleted ? step.color : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{step.name}</span>
                </div>
                {videoStep && (
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    {isCompleted ? 'Completed' : `${stepPercentage}%`}
                  </span>
                )}
              </div>
              {videoStep && !isCompleted && (
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                  <div 
                    className={`${step.color} h-1.5 rounded-full transition-all duration-500`} 
                    style={{ width: `${stepPercentage}%` }}
                  ></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default UpcomingVideo; 