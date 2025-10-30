
import React from 'react';
import { CURRICULUM } from '../../constants.ts';
import BackButton from '../common/BackButton.tsx';

interface SubjectSelectionScreenProps {
  grade: string;
  onSelectSubject: (subject: string) => void;
  onBack: () => void;
}

const SubjectIcon: React.FC<{ subject: string }> = ({ subject }) => {
  const icons: { [key: string]: React.ReactNode } = {
    'Math': (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M12 8h.01M15 8h.01M15 14h.01M18 17h.01M12 17h.01M15 17h.01" /></svg>
    ),
    'Science': (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 00.517 3.86l2.387.477a2 2 0 001.806-.547a2 2 0 00.547-1.806l-.477-2.387a6 6 0 00-.517-3.86l-.158-.318a6 6 0 00-.517-3.86l-2.387-.477z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.354 5.646a5 5 0 11-7.07 0 5 5 0 017.07 0z" /></svg>
    ),
    'Literature Arts': (
       <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v11.494m-9-5.747h18" /></svg>
    ),
  };
  return <>{icons[subject] || null}</>;
};

const SubjectSelectionScreen: React.FC<SubjectSelectionScreenProps> = ({ grade, onSelectSubject, onBack }) => {
  const subjects = Object.keys(CURRICULUM[grade] || {});
  
  const subjectColors: {[key: string]: string} = {
    'Math': 'from-blue-500 to-indigo-600',
    'Science': 'from-green-500 to-emerald-600',
    'Literature Arts': 'from-amber-500 to-orange-600',
  }

  return (
    <div>
      <BackButton onClick={onBack} text="Back to Grades" />
      <h2 className="text-3xl font-bold mb-2">Subjects for {grade}</h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">What would you like to practice today?</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subjects.map((subject) => (
          <button
            key={subject}
            onClick={() => onSelectSubject(subject)}
            className={`p-8 flex flex-col items-center justify-center text-white text-2xl font-bold rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 bg-gradient-to-br ${subjectColors[subject] || 'from-gray-500 to-gray-700'}`}
          >
            <SubjectIcon subject={subject} />
            {subject}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SubjectSelectionScreen;