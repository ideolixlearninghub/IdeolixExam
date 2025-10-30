
import React from 'react';
import BackButton from '../common/BackButton.tsx';

const LockIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute top-2 right-2 text-gray-400 dark:text-gray-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a4 4 0 100 8 4 4 0 000-8z" clipRule="evenodd" /></svg>;
const StarIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute top-2 right-2 text-yellow-300" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>;

interface LevelSelectionScreenProps {
  topic: string;
  completedLevel: number;
  onSelectLevel: (level: number) => void;
  onBack: () => void;
}

const LevelSelectionScreen: React.FC<LevelSelectionScreenProps> = ({ topic, completedLevel, onSelectLevel, onBack }) => {
  const levels = [1, 2, 3, 4, 5];

  return (
    <div>
      <BackButton onClick={onBack} text="Back to Topics"/>
      <h2 className="text-3xl font-bold mb-2">Topic: {topic}</h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">Select a level to begin practice. You must complete a level to unlock the next one.</p>
      <div className="flex flex-wrap justify-center gap-4">
        {levels.map((level) => {
          const isLocked = level > completedLevel + 1;
          const isCompleted = level <= completedLevel;
          
          return (
            <button
              key={level}
              onClick={() => onSelectLevel(level)}
              disabled={isLocked}
              className={`w-32 h-32 relative flex flex-col items-center justify-center rounded-lg shadow-lg font-bold text-xl transition-all duration-200
                ${isLocked 
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed' 
                  : isCompleted 
                  ? 'bg-brand-green text-white transform hover:scale-105'
                  : 'bg-brand-orange text-white transform hover:scale-105'
                }
              `}
            >
              {isLocked && <LockIcon />}
              {isCompleted && <StarIcon />}
              <span>Level {level}</span>
              <span className="text-xs mt-1 font-normal">
                {isCompleted ? '(Completed)' : isLocked ? '' : 'Start'}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LevelSelectionScreen;