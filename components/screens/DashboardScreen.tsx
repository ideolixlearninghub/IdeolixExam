
import React from 'react';
import { Student } from '../../types';
import { GRADES, ASSESSMENT_QUESTION_COUNT, ASSESSMENT_PASS_PERCENTAGE } from '../../constants';

interface DashboardScreenProps {
  student: Student;
  onSelectGrade: (grade: string) => void;
}

const AssessmentHistory: React.FC<{ assessments: Student['assessments'] }> = ({ assessments }) => {
  if (assessments.length === 0) {
    return (
      <div className="mt-12 text-center p-6 bg-white dark:bg-brand-dark-secondary rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-2">Assessment History</h3>
        <p className="text-gray-500 dark:text-gray-400">You haven't completed any assessments yet. Keep practicing!</p>
      </div>
    );
  }

  return (
    <div className="mt-12 bg-white dark:bg-brand-dark-secondary rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold mb-4">Assessment History</h3>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {assessments.slice().reverse().map((assessment, index) => (
          <div key={index} className="flex justify-between items-center p-4 bg-brand-light-secondary dark:bg-gray-700 rounded-lg">
            <div>
              <p className="font-bold text-gray-800 dark:text-gray-100">{assessment.subject} - {assessment.grade}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(assessment.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-brand-green">{assessment.score} / {ASSESSMENT_QUESTION_COUNT}</p>
              <p className={`font-semibold ${assessment.score / ASSESSMENT_QUESTION_COUNT >= ASSESSMENT_PASS_PERCENTAGE ? 'text-green-500' : 'text-orange-500'}`}>
                {((assessment.score / ASSESSMENT_QUESTION_COUNT) * 100).toFixed(0)}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


const DashboardScreen: React.FC<DashboardScreenProps> = ({ student, onSelectGrade }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-2">Welcome back, {student.name}!</h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">Choose a grade to continue your learning journey.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {GRADES.map((grade) => (
          <button
            key={grade}
            onClick={() => onSelectGrade(grade)}
            className="p-4 bg-white dark:bg-brand-dark-secondary rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center font-semibold text-brand-dark dark:text-brand-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange"
          >
            {grade}
          </button>
        ))}
      </div>
       <AssessmentHistory assessments={student.assessments} />
    </div>
  );
};

export default DashboardScreen;
