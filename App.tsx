
import React, { useState, useEffect, useCallback } from 'react';
import { Student, View, CertificateData } from './types.ts';
import { CURRICULUM } from './constants.ts';

import Logo from './components/common/Logo.tsx';
import LoginScreen from './components/screens/LoginScreen.tsx';
import DashboardScreen from './components/screens/DashboardScreen.tsx';
import SubjectSelectionScreen from './components/screens/SubjectSelectionScreen.tsx';
import TopicSelectionScreen from './components/screens/TopicSelectionScreen.tsx';
import LevelSelectionScreen from './components/screens/LevelSelectionScreen.tsx';
import PracticeScreen from './components/screens/PracticeScreen.tsx';
import AssessmentScreen from './components/screens/AssessmentScreen.tsx';
import CertificateScreen from './components/screens/CertificateScreen.tsx';

const App: React.FC = () => {
  const [student, setStudent] = useState<Student | null>(null);
  const [view, setView] = useState<View>('login');
  const [currentGrade, setCurrentGrade] = useState<string | null>(null);
  const [currentSubject, setCurrentSubject] = useState<string | null>(null);
  const [currentTopic, setCurrentTopic] = useState<string | null>(null);
  const [currentLevel, setCurrentLevel] = useState<number | null>(null);
  const [certificateData, setCertificateData] = useState<CertificateData | null>(null);

  useEffect(() => {
    try {
      const savedStudent = localStorage.getItem('ideolix-student');
      if (savedStudent) {
        setStudent(JSON.parse(savedStudent));
        setView('dashboard');
      }
    } catch (error) {
      console.error("Failed to parse student data from localStorage", error);
      localStorage.removeItem('ideolix-student');
    }
  }, []);

  const updateStudent = useCallback((newStudentData: Partial<Student>) => {
    setStudent(prev => {
      if (!prev) return null;
      const updatedStudent = { ...prev, ...newStudentData };
      localStorage.setItem('ideolix-student', JSON.stringify(updatedStudent));
      return updatedStudent;
    });
  }, []);

  const handleLogin = (name: string, grade: string) => {
    const newStudent: Student = {
      name,
      grade,
      progress: {},
      assessments: [],
    };
    localStorage.setItem('ideolix-student', JSON.stringify(newStudent));
    setStudent(newStudent);
    setView('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('ideolix-student');
    setStudent(null);
    setCurrentGrade(null);
    setCurrentSubject(null);
    setCurrentTopic(null);
    setCurrentLevel(null);
    setView('login');
  };
  
  const handleUpdateProgress = (grade: string, subject: string, topic: string, newLevel: number) => {
    if (!student) return;

    const newProgress = JSON.parse(JSON.stringify(student.progress));
    if (!newProgress[grade]) newProgress[grade] = {};
    if (!newProgress[grade][subject]) newProgress[grade][subject] = {};
    
    const currentCompletedLevel = newProgress[grade][subject][topic] || 0;
    if (newLevel > currentCompletedLevel) {
      newProgress[grade][subject][topic] = newLevel;
      updateStudent({ progress: newProgress });
    }
  };

  const handleSaveAssessment = (score: number) => {
    if (!student || !currentGrade || !currentSubject) return;
    const newAssessment = {
        grade: currentGrade,
        subject: currentSubject,
        score,
        date: new Date().toISOString(),
    };
    const newAssessments = [...student.assessments, newAssessment];
    updateStudent({ assessments: newAssessments });
  };

  const renderView = () => {
    if (!student) return <LoginScreen onLogin={handleLogin} />;

    switch (view) {
      case 'dashboard':
        return <DashboardScreen 
          student={student}
          onSelectGrade={(grade) => { setCurrentGrade(grade); setView('subject_selection'); }} 
        />;
      case 'subject_selection':
        if (!currentGrade) return null;
        return <SubjectSelectionScreen 
          grade={currentGrade} 
          onSelectSubject={(subject) => { setCurrentSubject(subject); setView('topic_selection'); }}
          onBack={() => { setCurrentGrade(null); setView('dashboard'); }}
        />;
      case 'topic_selection':
        if (!currentGrade || !currentSubject) return null;
        const allTopics = CURRICULUM[currentGrade]?.[currentSubject] || [];
        return <TopicSelectionScreen 
          grade={currentGrade}
          subject={currentSubject}
          progress={student.progress?.[currentGrade]?.[currentSubject] || {}}
          allTopics={allTopics}
          onSelectTopic={(topic) => { setCurrentTopic(topic); setView('level_selection'); }}
          onStartAssessment={() => setView('assessment')}
          onBack={() => { setCurrentSubject(null); setView('subject_selection'); }}
        />;
      case 'level_selection':
        if (!currentGrade || !currentSubject || !currentTopic) return null;
        return <LevelSelectionScreen 
          topic={currentTopic}
          completedLevel={student.progress?.[currentGrade]?.[currentSubject]?.[currentTopic] || 0}
          onSelectLevel={(level) => { setCurrentLevel(level); setView('practice'); }}
          onBack={() => { setCurrentTopic(null); setView('topic_selection'); }}
        />;
      case 'practice':
        if (!currentGrade || !currentSubject || !currentTopic || !currentLevel) return null;
        return <PracticeScreen 
          grade={currentGrade}
          subject={currentSubject}
          topic={currentTopic}
          level={currentLevel}
          onComplete={(newLevel) => {
            handleUpdateProgress(currentGrade, currentSubject, currentTopic, newLevel);
            setView('level_selection');
          }}
          onBack={() => { setCurrentLevel(null); setView('level_selection'); }}
        />;
      case 'assessment':
        if (!currentGrade || !currentSubject) return null;
        return <AssessmentScreen
          grade={currentGrade}
          subject={currentSubject}
          onPass={(score) => {
             handleSaveAssessment(score);
             setCertificateData({ 
                 name: student.name, 
                 grade: currentGrade, 
                 subject: currentSubject, 
                 score 
             });
             setView('certificate');
          }}
          onBack={() => setView('topic_selection')}
        />;
      case 'certificate':
        if (!certificateData) return null;
        return <CertificateScreen 
            data={certificateData}
            onBack={() => {
                setCertificateData(null);
                setView('topic_selection');
            }}
        />;
      default:
        return <LoginScreen onLogin={handleLogin} />;
    }
  };

  return (
    <div className="min-h-screen font-sans p-4 sm:p-6 lg:p-8">
       <header className="max-w-7xl mx-auto mb-8 flex justify-between items-center">
        <Logo />
        {student && (
           <div className="flex items-center gap-4">
             <span className="font-semibold hidden sm:inline">Welcome, {student.name}!</span>
            <button
              onClick={handleLogout}
              className="bg-brand-orange text-white font-bold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Logout
            </button>
          </div>
        )}
      </header>
      <main className="max-w-7xl mx-auto">
        {renderView()}
      </main>
    </div>
  );
};

export default App;