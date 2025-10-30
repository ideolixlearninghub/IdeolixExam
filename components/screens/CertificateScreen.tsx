
import React from 'react';
import { CertificateData } from '../../types.ts';
import { ASSESSMENT_QUESTION_COUNT } from '../../constants.ts';
import BackButton from '../common/BackButton.tsx';

interface CertificateScreenProps {
    data: CertificateData;
    onBack: () => void;
}

const CertificateScreen: React.FC<CertificateScreenProps> = ({ data, onBack }) => {
    const { name, grade, subject, score } = data;
    const percentage = ((score / ASSESSMENT_QUESTION_COUNT) * 100).toFixed(0);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div>
            <style>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    #certificate-wrapper, #certificate-wrapper * {
                        visibility: visible;
                    }
                    #certificate-wrapper {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 100%;
                    }
                    .no-print {
                        display: none;
                    }
                }
            `}</style>
            <div className="no-print">
                <BackButton onClick={onBack} text="Back to Topics" />
            </div>
            <div id="certificate-wrapper">
                <div className="bg-white dark:bg-brand-dark-secondary p-8 rounded-lg shadow-2xl border-4 border-brand-orange max-w-4xl mx-auto">
                    <div className="text-center border-b-2 border-gray-300 pb-4">
                        <img src="https://raw.githubusercontent.com/ideolixlearninghub/ideolix-web/main/ideolix%20LOGO.jpg" alt="Ideolix Logo" className="w-20 h-20 mx-auto rounded-full mb-4" />
                        <h1 className="text-4xl font-extrabold text-brand-dark dark:text-brand-light">Certificate of Achievement</h1>
                        <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">Proudly Presented To</p>
                    </div>
                    <div className="text-center my-10">
                        <h2 className="text-5xl font-bold text-brand-orange tracking-wider">{name}</h2>
                    </div>
                    <div className="text-center text-xl text-brand-dark dark:text-brand-light space-y-2">
                        <p>For successfully demonstrating mastery in</p>
                        <p className="font-bold text-2xl">{grade} {subject}</p>
                    </div>
                    <div className="text-center my-8">
                        <p className="text-lg">with a score of</p>
                        <p className="text-4xl font-bold text-brand-green">{percentage}%</p>
                        <p className="text-sm text-gray-500">({score} / {ASSESSMENT_QUESTION_COUNT} correct)</p>
                    </div>
                    <div className="text-center text-lg text-gray-600 dark:text-gray-300 mt-6 italic">
                        <p>"Congratulations on your hard work and dedication! Your commitment to learning is truly inspiring. Keep reaching for the stars!"</p>
                    </div>
                    <div className="mt-12 flex justify-between items-end">
                        <div>
                            <p className="border-t-2 border-gray-400 pt-1 px-4 text-sm font-semibold">Date</p>
                            <p className="px-4 text-sm">{new Date().toLocaleDateString()}</p>
                        </div>
                        <div className="text-center">
                             <h3 className="font-bold text-lg">Ideolix Learning Hub</h3>
                             <p className="text-sm">An Ideolix Platform</p>
                        </div>
                    </div>
                </div>
            </div>
             <div className="text-center mt-8 no-print">
                <button onClick={handlePrint} className="px-8 py-3 font-bold text-white bg-brand-green rounded-lg shadow-md hover:bg-opacity-90 transition-transform transform hover:scale-105 mr-4">
                    Print Certificate
                </button>
                <button onClick={onBack} className="px-8 py-3 font-bold text-white bg-brand-orange rounded-lg shadow-md hover:bg-opacity-90 transition-transform transform hover:scale-105">
                    Back to Topics
                </button>
            </div>
        </div>
    );
};

export default CertificateScreen;