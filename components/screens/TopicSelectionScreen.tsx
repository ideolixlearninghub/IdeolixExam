
import React from 'react';
import BackButton from '../common/BackButton.tsx';
import ProgressBar from '../common/ProgressBar.tsx';

interface TopicSelectionScreenProps {
  grade: string;
  subject: string;
  progress: { [topic: string]: number };
  allTopics: string[];
  onSelectTopic: (topic: string) => void;
  onStartAssessment: () => void;
  onBack: () => void;
}

const TopicSelectionScreen: React.FC<TopicSelectionScreenProps> = ({ grade, subject, progress, allTopics, onSelectTopic, onStartAssessment, onBack }) => {
  const canTakeAssessment = allTopics.length > 0 && allTopics.every(topic => (progress[topic] || 0) >= 5);

  return (
    <div>
      <BackButton onClick={onBack} text={`Back to Subjects`}/>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold">{subject} Topics</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">Select a topic to practice or take an assessment.</p>
        </div>
        <button
          onClick={onStartAssessment}
          disabled={!canTakeAssessment}
          className="w-full md:w-auto px-6 py-3 font-bold text-white bg-brand-green rounded-lg shadow-md transition-all duration-200 enabled:hover:bg-opacity-90 disabled:bg-gray-400 disabled:cursor-not-allowed transform enabled:hover:scale-105"
        >
          {canTakeAssessment ? 'Start Assessment' : 'Master All Topics to Unlock'}
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allTopics.map((topic) => {
          const completedLevel = progress[topic] || 0;
          const isMastered = completedLevel >= 5;

          return (
            <div
              key={topic}
              onClick={() => onSelectTopic(topic)}
              className="bg-white dark:bg-brand-dark-secondary p-6 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer relative"
            >
              {isMastered && (
                 <div className="absolute top-3 right-3 flex items-center bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                   Mastered
                 </div>
              )}
              <h3 className="text-xl font-bold mb-2 pr-16">{topic}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Level {completedLevel} / 5 completed</p>
              <ProgressBar current={completedLevel} total={5} />
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default TopicSelectionScreen;