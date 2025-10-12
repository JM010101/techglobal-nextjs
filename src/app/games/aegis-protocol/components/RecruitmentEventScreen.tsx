'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { ArrowLeft, User, Brain, MessageCircle, CheckCircle, XCircle, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import recruitmentEventsData from '@/lib/data/recruitmentEvents.json';

const RecruitmentEventScreen = () => {
  const { 
    setCurrentScreen, 
    addCredits, 
    baseFacilities,
    completedMissions 
  } = useGameStore();
  
  const [currentEvent, setCurrentEvent] = useState<any>(null);
  const [currentPhase, setCurrentPhase] = useState<'intro' | 'interview' | 'personality' | 'result'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [personalityTraits, setPersonalityTraits] = useState<Record<string, number>>({});
  const [interviewScore, setInterviewScore] = useState(0);
  const [personalityScore, setPersonalityScore] = useState(0);
  const [finalResult, setFinalResult] = useState<'success' | 'failure' | null>(null);

  useEffect(() => {
    // Find an available recruitment event
    const availableEvents = recruitmentEventsData.filter(event => {
      const baseLevel = Math.max(...Object.values(baseFacilities));
      return baseLevel >= event.requirements.baseLevel && 
             completedMissions.length >= event.requirements.completedMissions;
    });
    
    if (availableEvents.length > 0) {
      const randomEvent = availableEvents[Math.floor(Math.random() * availableEvents.length)];
      setCurrentEvent(randomEvent);
    }
  }, [baseFacilities, completedMissions]);

  const handleInterviewAnswer = (questionId: string, answer: any) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: answer }));
    
    // Calculate personality impact
    const impact = answer.personalityImpact || {};
    setPersonalityTraits(prev => {
      const newTraits = { ...prev };
      Object.entries(impact).forEach(([trait, value]) => {
        newTraits[trait] = (newTraits[trait] || 0) + value;
      });
      return newTraits;
    });
    
    // Move to next question or phase
    if (currentQuestion < currentEvent.interviewQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setCurrentPhase('personality');
      setCurrentQuestion(0);
    }
  };

  const handlePersonalityAnswer = (questionId: string, answer: any) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: answer }));
    
    // Update personality traits based on answer
    const traits = answer.traits || [];
    setPersonalityTraits(prev => {
      const newTraits = { ...prev };
      traits.forEach((trait: string) => {
        newTraits[trait] = (newTraits[trait] || 0) + 1;
      });
      return newTraits;
    });
    
    // Move to next question or result
    if (currentQuestion < currentEvent.personalityTest.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      calculateResults();
    }
  };

  const calculateResults = () => {
    // Calculate interview score based on personality alignment
    const candidatePersonality = currentEvent.candidate.personality;
    let interviewScore = 0;
    
    Object.entries(personalityTraits).forEach(([trait, value]) => {
      const candidateValue = candidatePersonality[trait] || 5;
      const alignment = Math.abs(value - candidateValue);
      interviewScore += Math.max(0, 10 - alignment);
    });
    
    setInterviewScore(interviewScore);
    
    // Calculate personality score based on trait distribution
    const totalTraits = Object.values(personalityTraits).reduce((sum, val) => sum + val, 0);
    const personalityScore = Math.min(100, (totalTraits / 3) * 10);
    setPersonalityScore(personalityScore);
    
    // Determine final result
    const totalScore = (interviewScore + personalityScore) / 2;
    const success = totalScore >= 60;
    
    setFinalResult(success ? 'success' : 'failure');
    setCurrentPhase('result');
    
    // Apply rewards
    if (success) {
      addCredits(currentEvent.rewards.success.credits);
      // Add hero to owned heroes (simplified)
      console.log('Hero recruited:', currentEvent.candidate.name);
    } else {
      addCredits(currentEvent.rewards.failure.credits);
    }
  };

  const startInterview = () => {
    setCurrentPhase('interview');
    setCurrentQuestion(0);
  };


  const resetEvent = () => {
    setCurrentEvent(null);
    setCurrentPhase('intro');
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setPersonalityTraits({});
    setInterviewScore(0);
    setPersonalityScore(0);
    setFinalResult(null);
  };

  if (!currentEvent) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-sm border-b border-blue-500/30">
          <button
            onClick={() => setCurrentScreen('home')}
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-bold">Back</span>
          </button>
          <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            RECRUITMENT EVENTS
          </h1>
          <div className="w-20"></div>
        </div>
        
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">No Recruitment Events Available</h2>
            <p className="text-gray-400 mb-6">
              Complete more missions and upgrade your base to unlock recruitment events.
            </p>
            <button
              onClick={() => setCurrentScreen('home')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            >
              Return to Base
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-sm border-b border-blue-500/30">
        <button
          onClick={() => setCurrentScreen('home')}
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-bold">Back</span>
        </button>
        <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          RECRUITMENT EVENT
        </h1>
        <div className="w-20"></div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <AnimatePresence mode="wait">
          {currentPhase === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 rounded-3xl p-8 border border-blue-500/30">
                <div className="text-center mb-8">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 mx-auto mb-4 flex items-center justify-center">
                    <User className="w-12 h-12 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">{currentEvent.name}</h2>
                  <p className="text-gray-400 text-lg">{currentEvent.description}</p>
                </div>
                
                <div className="bg-gray-900/50 rounded-2xl p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">Candidate Profile</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400">Name:</p>
                      <p className="text-white font-bold">{currentEvent.candidate.name}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Codename:</p>
                      <p className="text-white font-bold">{currentEvent.candidate.codename}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Role:</p>
                      <p className="text-white font-bold">{currentEvent.candidate.role}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Rarity:</p>
                      <p className="text-white font-bold">{currentEvent.candidate.rarity}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-gray-400">Background:</p>
                    <p className="text-white">{currentEvent.candidate.background}</p>
                  </div>
                  <div className="mt-4">
                    <p className="text-gray-400">Motivation:</p>
                    <p className="text-white">{currentEvent.candidate.motivation}</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <button
                    onClick={startInterview}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                  >
                    Begin Interview Process
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {currentPhase === 'interview' && (
            <motion.div
              key="interview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 rounded-3xl p-8 border border-blue-500/30">
                <div className="flex items-center gap-4 mb-6">
                  <MessageCircle className="w-8 h-8 text-blue-400" />
                  <h2 className="text-2xl font-bold text-white">Interview Phase</h2>
                  <div className="ml-auto bg-blue-900/50 rounded-xl px-4 py-2">
                    <span className="text-blue-200 font-bold">
                      Question {currentQuestion + 1} of {currentEvent.interviewQuestions.length}
                    </span>
                  </div>
                </div>
                
                <div className="bg-gray-900/50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4">
                    {currentEvent.interviewQuestions[currentQuestion].question}
                  </h3>
                  
                  <div className="space-y-3">
                    {currentEvent.interviewQuestions[currentQuestion].options.map((option: any, index: number) => (
                      <button
                        key={index}
                        onClick={() => handleInterviewAnswer(
                          currentEvent.interviewQuestions[currentQuestion].id,
                          option
                        )}
                        className="w-full bg-gray-800/50 text-white p-4 rounded-xl hover:bg-gray-700/50 transition-all duration-300 text-left"
                      >
                        <p className="font-semibold">{option.text}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentPhase === 'personality' && (
            <motion.div
              key="personality"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 rounded-3xl p-8 border border-purple-500/30">
                <div className="flex items-center gap-4 mb-6">
                  <Brain className="w-8 h-8 text-purple-400" />
                  <h2 className="text-2xl font-bold text-white">Personality Assessment</h2>
                  <div className="ml-auto bg-purple-900/50 rounded-xl px-4 py-2">
                    <span className="text-purple-200 font-bold">
                      Question {currentQuestion + 1} of {currentEvent.personalityTest.questions.length}
                    </span>
                  </div>
                </div>
                
                <div className="bg-gray-900/50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4">
                    {currentEvent.personalityTest.questions[currentQuestion].question}
                  </h3>
                  
                  <div className="space-y-3">
                    {currentEvent.personalityTest.questions[currentQuestion].options.map((option: any, index: number) => (
                      <button
                        key={index}
                        onClick={() => handlePersonalityAnswer(
                          currentEvent.personalityTest.questions[currentQuestion].id,
                          option
                        )}
                        className="w-full bg-gray-800/50 text-white p-4 rounded-xl hover:bg-gray-700/50 transition-all duration-300 text-left"
                      >
                        <p className="font-semibold">{option.text}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentPhase === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 rounded-3xl p-8 border border-green-500/30">
                <div className="text-center mb-8">
                  <div className={`w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center ${
                    finalResult === 'success' 
                      ? 'bg-gradient-to-br from-green-600 to-blue-600' 
                      : 'bg-gradient-to-br from-red-600 to-orange-600'
                  }`}>
                    {finalResult === 'success' ? (
                      <CheckCircle className="w-12 h-12 text-white" />
                    ) : (
                      <XCircle className="w-12 h-12 text-white" />
                    )}
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {finalResult === 'success' ? 'Recruitment Successful!' : 'Recruitment Failed'}
                  </h2>
                  <p className="text-gray-400 text-lg">
                    {finalResult === 'success' 
                      ? `${currentEvent.candidate.name} has joined your team!`
                      : `${currentEvent.candidate.name} decided not to join.`
                    }
                  </p>
                </div>
                
                <div className="bg-gray-900/50 rounded-2xl p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">Assessment Results</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-gray-400">Interview Score</p>
                      <p className="text-2xl font-bold text-blue-400">{interviewScore.toFixed(0)}/100</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-400">Personality Score</p>
                      <p className="text-2xl font-bold text-purple-400">{personalityScore.toFixed(0)}/100</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-900/50 rounded-2xl p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">Rewards</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-400" />
                      <span className="text-white font-bold">
                        +{finalResult === 'success' ? currentEvent.rewards.success.credits : currentEvent.rewards.failure.credits} Credits
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <button
                    onClick={resetEvent}
                    className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:to-blue-700 transition-all duration-300"
                  >
                    {finalResult === 'success' ? 'Continue' : 'Try Again Later'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RecruitmentEventScreen;
