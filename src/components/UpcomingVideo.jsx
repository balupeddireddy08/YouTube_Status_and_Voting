import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaYoutube, FaAngleDown, FaAngleUp } from 'react-icons/fa';

// Define the progress steps for videos
const PROGRESS_STEPS = [
  { id: 'researching', name: 'Research & Planning', color: 'bg-blue-500' },
  { id: 'content', name: 'Content Development', color: 'bg-cyan-500' },
  { id: 'scripting', name: 'Script Writing', color: 'bg-teal-500' },
  { id: 'recording', name: 'Video Recording', color: 'bg-green-500' },
  { id: 'editing', name: 'Video Editing', color: 'bg-yellow-500' },
  { id: 'thumbnail', name: 'Thumbnail Creation', color: 'bg-orange-500' },
  { id: 'publishing', name: 'Publishing & Promotion', color: 'bg-red-500' }
];

const UpcomingVideo = ({ video }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Calculate overall progress percentage
  const progressPercentage = () => {
    const totalSteps = PROGRESS_STEPS.length;
    const completedSteps = video.progress.filter(step => step.completed).length;
    const currentStepProgress = video.progress.find(step => !step.completed)?.percentage || 0;
    
    const completedPercentage = (completedSteps / totalSteps) * 100;
    const currentStepContribution = currentStepProgress / totalSteps;
    
    return completedPercentage + currentStepContribution;
  };
  
  // Get the current step name
  const getCurrentStep = () => {
    const currentStep = video.progress.find(step => !step.completed);
    if (!currentStep) return 'Ready to publish';
    
    const stepInfo = PROGRESS_STEPS.find(s => s.id === currentStep.id);
    return stepInfo ? stepInfo.name : 'In progress';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-colors duration-300"
    >
      <div className="p-6 pb-4">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            {video.thumbnail ? (
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="w-20 h-20 object-cover rounded-lg"
              />
            ) : (
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-blue-500 dark:from-red-700 dark:to-blue-900 rounded-lg flex items-center justify-center">
                <FaYoutube className="text-white text-3xl" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">{video.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 line-clamp-2">{video.description}</p>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="px-6 pb-4">
        <div className="flex justify-between items-center mb-1">
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Current: {getCurrentStep()}</span>
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{Math.round(progressPercentage())}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
          <div 
            className="bg-gradient-to-r from-red-500 to-blue-500 h-2.5 rounded-full transition-all duration-500" 
            style={{ width: `${progressPercentage()}%` }}
          ></div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div>Expected: {video.expectedReleaseDate}</div>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            {isExpanded ? 'Hide details' : 'Show details'} 
            {isExpanded ? <FaAngleUp className="ml-1" /> : <FaAngleDown className="ml-1" />}
          </button>
        </div>
      </div>

      {/* Individual steps progress */}
      {isExpanded && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="px-6 pb-6 border-t border-gray-200 dark:border-gray-700 pt-4"
        >
          <div className="space-y-3">
            {PROGRESS_STEPS.map((step) => {
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
      )}
    </motion.div>
  );
};

export default UpcomingVideo; 