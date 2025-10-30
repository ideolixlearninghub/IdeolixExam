
import { GoogleGenAI, Type } from "@google/genai";
import { Question } from '../types.ts';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const shuffle = <T,>(array: T[]): T[] => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
};

const questionsBatchSchema = {
    type: Type.OBJECT,
    properties: {
        questions: {
            type: Type.ARRAY,
            description: "An array of quiz questions.",
            items: {
                type: Type.OBJECT,
                properties: {
                    questionText: { type: Type.STRING, description: "The text of the question." },
                    correctAnswer: { type: Type.STRING, description: "The correct answer." },
                    options: {
                        type: Type.ARRAY,
                        description: "An array of 4 strings: 3 incorrect distractors and the correct answer.",
                        items: { type: Type.STRING }
                    },
                    questionType: { type: Type.STRING, description: "Should always be 'multiple-choice'." }
                },
                required: ['questionText', 'correctAnswer', 'options', 'questionType']
            }
        }
    },
    required: ['questions']
};

const generateBatch = async (grade: string, subject: string, topics: string[], count: number): Promise<Question[]> => {
    if (!topics || topics.length === 0) return [];
    
    const prompt = `You are an expert educator creating a batch of ${count} grade-appropriate, multiple-choice quiz questions for a learning app.
- Grade: ${grade}
- Subject: ${subject}
- Topics to cover: ${shuffle(topics).slice(0, 5).join(', ')}

Create a diverse set of questions covering the specified topics. Each question should be challenging but suitable for the student's grade level. For each question, ensure the incorrect options (distractors) are plausible and represent common misconceptions. Provide 4 options in total for each question.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: questionsBatchSchema,
            },
        });

        const jsonText = response.text.trim();
        const batchData = JSON.parse(jsonText);
        
        if (batchData.questions && batchData.questions.length > 0) {
            return batchData.questions.map((q: any) => {
                if (!q.options.includes(q.correctAnswer)) {
                    q.options.pop();
                    q.options.push(q.correctAnswer);
                }
                return { ...q, options: shuffle(q.options) };
            });
        }
        throw new Error("Invalid batch format received from AI.");

    } catch (error) {
        console.error("AI question batch generation failed:", error);
        const fallbackQuestions: Question[] = [];
        for (let i = 0; i < count; i++) {
            const topic = topics[i % topics.length] || 'the subject';
            fallbackQuestions.push({
                questionText: `This is a fallback question for "${topic}". Which of these is a number?`,
                correctAnswer: '3',
                options: shuffle(['A', 'B', 'C', '3']),
                questionType: 'multiple-choice'
            });
        }
        return fallbackQuestions;
    }
};
    
export const QuestionEngine = { 
    generateBatch 
};