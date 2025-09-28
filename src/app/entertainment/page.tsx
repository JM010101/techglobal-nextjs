'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  Gamepad2, 
  Star, 
  Timer, 
  Brain, 
  Play, 
  Trophy, 
  Users, 
  Target,
  X,
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

interface Game {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  image: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
}

const games: Game[] = [
  {
    id: 'business-strategy',
    title: 'Business Strategy Simulator',
    description: 'Build and manage your own company empire. Make strategic decisions, manage resources, and lead your business to success.',
    icon: Target,
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop&auto=format&q=80',
    difficulty: 'Medium',
    category: 'Strategy'
  },
  {
    id: 'networking-puzzle',
    title: 'Sakura AI Assistant',
    description: 'Chat with Sakura Nakamura, our AI Research Scientist, about romance, lifestyle, psychology, and personal growth. Get expert advice on relationships, wellness, and life challenges.',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=800&h=600&fit=crop&auto=format&q=80',
    difficulty: 'Easy',
    category: 'AI Chat'
  },
  {
    id: 'career-path',
    title: 'Career Path Adventure',
    description: 'Navigate through different career opportunities. Make decisions that shape your professional journey and unlock achievements.',
    icon: Trophy,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&auto=format&q=80',
    difficulty: 'Easy',
    category: 'Career'
  },
  {
    id: 'project-management',
    title: 'Project Management Challenge',
    description: 'Lead teams and deliver projects on time. Manage resources, timelines, and stakeholder expectations in this strategic game.',
    icon: Timer,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&auto=format&q=80',
    difficulty: 'Hard',
    category: 'Management'
  },
  {
    id: 'skill-builder',
    title: 'Skill Development Quest',
    description: 'Level up your professional skills through interactive challenges. Master new technologies and advance your expertise.',
    icon: Brain,
    image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=600&fit=crop&auto=format&q=80',
    difficulty: 'Medium',
    category: 'Learning'
  },
  {
    id: 'startup-simulator',
    title: 'Startup Simulator',
    description: 'Launch and grow your startup from idea to IPO. Handle funding rounds, product development, and market competition.',
    icon: Star,
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop&auto=format&q=80',
    difficulty: 'Hard',
    category: 'Entrepreneurship'
  }
];

// Business Strategy Simulator Game Component
const BusinessStrategyGame = ({ onClose, onScoreUpdate }: { onClose: () => void; onScoreUpdate: (score: number) => void }) => {
  const [companyValue, setCompanyValue] = useState(1000000);
  const [revenue, setRevenue] = useState(0);
  const [employees, setEmployees] = useState(10);
  const [marketShare, setMarketShare] = useState(5);
  const [currentQuarter, setCurrentQuarter] = useState(1);
  const [decisions, setDecisions] = useState<string[]>([]);
  const [gameStarted, setGameStarted] = useState(false);

  const businessDecisions = useMemo(() => [
    {
      id: 'hire_marketing',
      title: 'Hire Marketing Team',
      cost: 50000,
      effect: { revenue: 20000, employees: 3, marketShare: 2 },
      description: 'Expand marketing to reach more customers'
    },
    {
      id: 'product_development',
      title: 'Product Development',
      cost: 100000,
      effect: { revenue: 50000, employees: 5, marketShare: 5 },
      description: 'Invest in new product features'
    },
    {
      id: 'sales_expansion',
      title: 'Sales Team Expansion',
      cost: 75000,
      effect: { revenue: 40000, employees: 4, marketShare: 3 },
      description: 'Hire more sales representatives'
    },
    {
      id: 'technology_upgrade',
      title: 'Technology Upgrade',
      cost: 150000,
      effect: { revenue: 30000, employees: 2, marketShare: 4 },
      description: 'Upgrade company technology infrastructure'
    },
    {
      id: 'market_research',
      title: 'Market Research',
      cost: 25000,
      effect: { revenue: 15000, employees: 1, marketShare: 3 },
      description: 'Study market trends and customer needs'
    }
  ], []);

  const makeDecision = (decisionId: string) => {
    const decision = businessDecisions.find(d => d.id === decisionId);
    if (!decision || companyValue < decision.cost) return;

    setCompanyValue(prev => prev - decision.cost);
    setRevenue(prev => prev + decision.effect.revenue);
    setEmployees(prev => prev + decision.effect.employees);
    setMarketShare(prev => Math.min(100, prev + decision.effect.marketShare));
    setDecisions(prev => [...prev, decision.title]);
    
    onScoreUpdate(companyValue - decision.cost);
  };

  const nextQuarter = () => {
    const quarterlyRevenue = revenue * 0.25;
    const growthFactor = 1 + (marketShare / 100);
    
    setCompanyValue(prev => prev + quarterlyRevenue * growthFactor);
    setCurrentQuarter(prev => prev + 1);
    
    // Random market events
    if (Math.random() < 0.3) {
      const event = Math.random();
      if (event < 0.5) {
        setRevenue(prev => prev * 1.1); // Market boom
      } else {
        setRevenue(prev => prev * 0.9); // Market downturn
      }
    }
  };

  const startGame = () => {
    setGameStarted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Business Strategy Simulator</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        {!gameStarted ? (
          <div className="text-center py-12">
            <h3 className="text-2xl font-bold mb-4">Welcome to Business Strategy Simulator</h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Build and manage your company empire. Make strategic decisions, manage resources, 
              and lead your business to success. Start with $1M and grow your company value!
            </p>
            <button onClick={startGame} className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Start Your Company
              </button>
            </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Company Stats */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Company Overview</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-600">Company Value</div>
                    <div className="text-2xl font-bold text-green-600">${companyValue.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Quarterly Revenue</div>
                    <div className="text-xl font-semibold">${revenue.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Employees</div>
                    <div className="text-xl font-semibold">{employees}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Market Share</div>
                    <div className="text-xl font-semibold">{marketShare}%</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Current Quarter</div>
                    <div className="text-xl font-semibold">Q{currentQuarter}</div>
                  </div>
                </div>
                <button 
                  onClick={nextQuarter}
                  className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Next Quarter
                </button>
              </div>
          </div>

            {/* Business Decisions */}
            <div className="lg:col-span-2">
              <h3 className="text-xl font-bold mb-4">Strategic Decisions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {businessDecisions.map(decision => (
                  <div key={decision.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h4 className="font-semibold mb-2">{decision.title}</h4>
                    <p className="text-sm text-gray-600 mb-3">{decision.description}</p>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-medium">Cost: ${decision.cost.toLocaleString()}</span>
                      <span className="text-sm text-green-600">+${decision.effect.revenue.toLocaleString()} revenue</span>
                    </div>
                <button
                      onClick={() => makeDecision(decision.id)}
                      disabled={companyValue < decision.cost}
                      className={`w-full py-2 rounded-lg font-medium transition-colors ${
                        companyValue >= decision.cost
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {companyValue >= decision.cost ? 'Invest' : 'Insufficient Funds'}
                </button>
                  </div>
              ))}
            </div>
          </div>
        </div>
        )}

        {/* Recent Decisions */}
        {decisions.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Recent Decisions</h3>
            <div className="flex flex-wrap gap-2">
              {decisions.slice(-5).map((decision, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {decision}
                </span>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

// Sakura AI Assistant Game Component
const ClaudeExpertChatbot = ({ onClose, onScoreUpdate }: { onClose: () => void; onScoreUpdate: (score: number) => void }) => {
  const [messages, setMessages] = useState<Array<{id: string, text: string, isUser: boolean, timestamp: Date}>>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationScore, setConversationScore] = useState(0);
  const [currentTopic, setCurrentTopic] = useState('general');
  const [gameStarted, setGameStarted] = useState(false);

  const conversationTopics = useMemo(() => [
    { id: 'romance', name: 'Romance & Relationships', icon: '💕', description: 'Love, dating, and relationship advice' },
    { id: 'lifestyle', name: 'Lifestyle & Wellness', icon: '🌟', description: 'Health, habits, and personal growth' },
    { id: 'psychology', name: 'Psychology & Mind', icon: '🧠', description: 'Mental health, emotions, and behavior' },
    { id: 'career', name: 'Career & Success', icon: '💼', description: 'Professional development and goals' },
    { id: 'social', name: 'Social & Communication', icon: '👥', description: 'Social skills and interactions' },
    { id: 'general', name: 'General Chat', icon: '💬', description: 'Casual conversation and advice' }
  ], []);

  const claudeResponses = useMemo(() => ({
    romance: [
      "Love is a beautiful journey that requires patience and understanding. What specific aspect of romance would you like to explore?",
      "Relationships are built on trust, communication, and mutual respect. Tell me about your current situation.",
      "Dating can be challenging, but remember that the right person will appreciate you for who you are. What's on your mind?",
      "Romantic connections often start with genuine friendship. How are you feeling about your love life lately?",
      "Every relationship teaches us something valuable. What would you like to discuss about romance?"
    ],
    lifestyle: [
      "A balanced lifestyle is key to happiness and fulfillment. What area of your life would you like to improve?",
      "Small daily habits can create significant positive changes. What lifestyle changes are you considering?",
      "Wellness encompasses physical, mental, and emotional health. How are you taking care of yourself?",
      "Life is about finding what brings you joy and purpose. What makes you feel most alive?",
      "Personal growth is a continuous journey. What would you like to work on in your life?"
    ],
    psychology: [
      "Understanding our emotions and thoughts is the first step toward mental wellness. How are you feeling today?",
      "Our minds are incredibly powerful tools. What psychological aspect would you like to explore?",
      "Mental health is just as important as physical health. What's on your mind lately?",
      "Emotions are valid and temporary. What emotional challenge are you facing?",
      "Self-awareness is the foundation of personal growth. What would you like to understand better about yourself?"
    ],
    career: [
      "Career success comes from passion, persistence, and continuous learning. What are your professional goals?",
      "Every career path has its challenges and rewards. What aspect of your work life concerns you?",
      "Professional growth requires stepping out of your comfort zone. What opportunities are you considering?",
      "Work-life balance is crucial for long-term success. How are you managing your career and personal life?",
      "Success is defined differently by everyone. What does career success mean to you?"
    ],
    social: [
      "Social connections are essential for our well-being. How are your relationships with others?",
      "Communication is an art that can be learned and improved. What social situation challenges you?",
      "Building meaningful relationships takes time and effort. What would you like to improve in your social life?",
      "Social anxiety is common and manageable. What social situations make you feel uncomfortable?",
      "Friendship and community provide support and joy. How are you nurturing your social connections?"
    ],
    general: [
      "I'm here to listen and help with whatever's on your mind. What would you like to talk about?",
      "Sometimes it helps to share our thoughts with someone who understands. What's bothering you today?",
      "Life can be complex, but talking through our concerns often brings clarity. What's on your mind?",
      "I'm Sakura, your AI companion for thoughtful conversations. How can I assist you today?",
      "Every conversation is an opportunity for growth and understanding. What would you like to explore?"
    ]
  }), []);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      // Call the AI API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text.trim(),
          topic: currentTopic
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      
      const claudeMessage = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, claudeMessage]);
      setIsTyping(false);
      
      // Update conversation score
      const newScore = conversationScore + 10;
      setConversationScore(newScore);
      onScoreUpdate(newScore);

    } catch (error) {
      console.error('Error sending message:', error);
      
      // Fallback to local responses if API fails
      const responses = claudeResponses[currentTopic as keyof typeof claudeResponses];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const claudeMessage = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, claudeMessage]);
      setIsTyping(false);
      
      // Update conversation score
      const newScore = conversationScore + 10;
      setConversationScore(newScore);
      onScoreUpdate(newScore);
    }
  };

  const startConversation = () => {
    setGameStarted(true);
    setMessages([{
      id: '1',
      text: "Hello! I'm Sakura Nakamura, your AI Research Scientist and life coach. I'm here to help with romance, lifestyle, psychology, and any other topics you'd like to discuss. What's on your mind today?",
      isUser: false,
      timestamp: new Date()
    }]);
  };

  const changeTopic = (topicId: string) => {
    setCurrentTopic(topicId);
    const topic = conversationTopics.find(t => t.id === topicId);
    if (topic) {
      const topicMessage = {
        id: Date.now().toString(),
        text: `Let's talk about ${topic.name.toLowerCase()}. ${topic.description}. What would you like to know?`,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, topicMessage]);
    }
  };








  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] flex flex-col relative overflow-hidden"
        style={{
          backgroundImage: 'url(/images/team/claude expert.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Background overlay with opacity */}
        <div className="absolute inset-0 bg-white opacity-50 z-0"></div>
        {/* Content with higher z-index */}
        <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-200">
              <Image
                src="/images/team/claude expert.png"
                alt="Sakura Nakamura"
                width={48}
                height={48}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Sakura AI Assistant</h2>
              <p className="text-sm text-gray-600">AI Research Scientist & Life Coach</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        {!gameStarted ? (
          <div className="text-center py-12 flex-1 flex flex-col justify-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-4 border-blue-200">
              <Image
                src="/images/team/claude expert.png"
                alt="Sakura Nakamura"
                width={96}
                height={96}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
            <h3 className="text-3xl font-bold mb-4">Chat with Sakura Nakamura</h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
              Hi! I&apos;m Sakura, your AI Research Scientist and life coach. I specialize in romance, lifestyle, psychology, and personal growth. 
              Whether you need relationship advice, want to discuss your goals, or just need someone to talk to, I&apos;m here to help!
            </p>
            <button 
              onClick={startConversation} 
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 text-lg"
            >
              Start Conversation 💬
            </button>
          </div>
        ) : (
          <div className="flex-1 flex flex-col">
            {/* Topic Selector */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-3">Choose a topic:</h3>
              <div className="flex flex-wrap gap-2">
                {conversationTopics.map(topic => (
                  <button
                    key={topic.id}
                    onClick={() => changeTopic(topic.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      currentTopic === topic.id
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {topic.icon} {topic.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 bg-gray-50 rounded-lg p-4 mb-4 overflow-y-auto max-h-96">
              <div className="space-y-4">
                {messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.isUser
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-800 border'
                      }`}
                    >
                      {!message.isUser && (
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-6 h-6 rounded-full overflow-hidden">
                            <Image
                              src="/images/team/claude expert.png"
                              alt="Sakura"
                              width={24}
                              height={24}
                              className="w-full h-full object-cover"
                              unoptimized
                            />
                          </div>
                          <span className="text-xs font-medium text-gray-500">Sakura</span>
                        </div>
                      )}
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white text-gray-800 border px-4 py-2 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full overflow-hidden">
                          <Image
                            src="/images/team/claude expert.png"
                            alt="Sakura"
                            width={24}
                            height={24}
                            className="w-full h-full object-cover"
                            unoptimized
                          />
                        </div>
                        <span className="text-xs font-medium text-gray-500">Sakura is typing...</span>
                      </div>
                      <div className="flex gap-1 mt-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Message Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputText)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled={isTyping}
              />
              <button
                onClick={() => sendMessage(inputText)}
                disabled={!inputText.trim() || isTyping}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Send
              </button>
            </div>

            {/* Conversation Score */}
            <div className="mt-4 text-center">
              <div className="text-sm text-gray-600">
                Conversation Score: <span className="font-bold text-purple-600">{conversationScore}</span>
              </div>
            </div>
          </div>
        )}
        </div>
      </motion.div>
    </div>
  );
};





// Career Path Adventure - Real Game Component
const SimpleCareerGame = ({ onClose, onScoreUpdate }: { onClose: () => void; onScoreUpdate: (score: number) => void }) => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [currentTask, setCurrentTask] = useState(0);
  const [tasks, setTasks] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState(false);

  const careerTasks = [
    "Complete project proposal",
    "Review team performance",
    "Attend client meeting",
    "Update project timeline",
    "Train new employee",
    "Present quarterly results",
    "Negotiate budget",
    "Launch new feature",
    "Resolve team conflict",
    "Plan team building"
  ];

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setLevel(1);
    setTimeLeft(30);
    setCurrentTask(0);
    setGameOver(false);
    generateNewTask();
  };

  const generateNewTask = () => {
    const shuffled = [...careerTasks].sort(() => Math.random() - 0.5);
    setTasks(shuffled.slice(0, 3));
  };

  const completeTask = (taskIndex: number) => {
    if (taskIndex === 0) {
      setScore(prev => {
        const newScore = prev + 10;
        // Use setTimeout to defer the score update to avoid render issues
        setTimeout(() => onScoreUpdate(newScore), 0);
        setLevel(Math.floor(newScore / 50) + 1);
        return newScore;
      });
      setCurrentTask(prev => prev + 1);
      generateNewTask();
    }
  };

  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [gameStarted, timeLeft, gameOver]);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 max-w-4xl w-full"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Career Path Adventure</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        {!gameStarted ? (
          <div className="text-center py-12">
            <h3 className="text-2xl font-bold mb-4">Start Your Career Journey</h3>
            <p className="text-gray-600 mb-8">Complete tasks quickly to advance your career! You have 30 seconds to complete as many tasks as possible.</p>
            <button onClick={startGame} className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Start Career Journey
            </button>
          </div>
        ) : gameOver ? (
          <div className="text-center py-12">
            <h3 className="text-2xl font-bold mb-4">Career Journey Complete!</h3>
            <p className="text-xl text-gray-600 mb-4">Final Score: {score}</p>
            <p className="text-lg text-gray-600 mb-6">Level {level} Professional</p>
            <button onClick={startGame} className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Play Again
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">Level {level} Professional</h3>
                <p className="text-2xl font-bold text-blue-600">Score: {score}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-red-600">Time: {timeLeft}s</p>
                <p className="text-sm text-gray-600">Tasks: {currentTask}</p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold mb-4">Complete this task:</h4>
              <div className="text-center">
                <p className="text-xl font-bold text-gray-800 mb-6">{tasks[0]}</p>
                <button 
                  onClick={() => completeTask(0)}
                  className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Complete Task (+10 points)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h5 className="font-semibold text-blue-800">Next Tasks:</h5>
                <ul className="text-sm text-blue-700 mt-2">
                  <li>• {tasks[1]}</li>
                  <li>• {tasks[2]}</li>
                </ul>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4">
                <h5 className="font-semibold text-yellow-800">Tips:</h5>
                <ul className="text-sm text-yellow-700 mt-2">
                  <li>• Complete tasks quickly</li>
                  <li>• Each task gives 10 points</li>
                  <li>• Level up every 50 points</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

// Project Management Challenge - Real Game Component
const SimpleProjectGame = ({ onClose, onScoreUpdate }: { onClose: () => void; onScoreUpdate: (score: number) => void }) => {
  const [score, setScore] = useState(0);
  const [projects, setProjects] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentProject, setCurrentProject] = useState<{name: string; difficulty: string; reward: number; team: number; budget: number} | null>(null);
  const [teamMembers, setTeamMembers] = useState(3);
  const [budget, setBudget] = useState(10000);
  const [deadline, setDeadline] = useState(30);
  const [gameOver, setGameOver] = useState(false);

  const projectTypes = [
    { name: "Website Redesign", difficulty: "Easy", time: 15, budget: 5000, team: 2, reward: 20 },
    { name: "Mobile App", difficulty: "Medium", time: 25, budget: 8000, team: 4, reward: 35 },
    { name: "AI Integration", difficulty: "Hard", time: 40, budget: 15000, team: 6, reward: 60 },
    { name: "Database Migration", difficulty: "Medium", time: 20, budget: 6000, team: 3, reward: 30 },
    { name: "Cloud Migration", difficulty: "Hard", time: 35, budget: 12000, team: 5, reward: 50 }
  ];

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setProjects(0);
    setTeamMembers(3);
    setBudget(10000);
    setDeadline(30);
    setGameOver(false);
    startNewProject();
  };

  const startNewProject = () => {
    const randomProject = projectTypes[Math.floor(Math.random() * projectTypes.length)];
    setCurrentProject(randomProject);
    setDeadline(randomProject.time);
  };

  const makeDecision = (decision: string) => {
    if (!currentProject) return;

    let points = 0;
    let newBudget = budget;
    let newTeam = teamMembers;

    switch (decision) {
      case 'hire':
        if (budget >= 2000) {
          newBudget -= 2000;
          newTeam += 1;
          points = 5;
        }
        break;
      case 'overtime':
        if (budget >= 1000) {
          newBudget -= 1000;
          setDeadline(prev => Math.max(1, prev - 5));
          points = 10;
        }
        break;
      case 'outsource':
        if (budget >= 3000) {
          newBudget -= 3000;
          setDeadline(prev => Math.max(1, prev - 10));
          points = 15;
        }
        break;
      case 'complete':
        if (teamMembers >= currentProject.team && budget >= currentProject.budget) {
          points = currentProject.reward;
          setProjects(prev => prev + 1);
          startNewProject();
        }
        break;
    }

    setBudget(newBudget);
    setTeamMembers(newTeam);
    
    if (points > 0) {
      setScore(prev => {
        const newScore = prev + points;
        // Use setTimeout to defer the score update to avoid render issues
        setTimeout(() => onScoreUpdate(newScore), 0);
        return newScore;
      });
    }

    // Check game over conditions
    if (newBudget <= 0 || deadline <= 0) {
      setGameOver(true);
    }
  };

  useEffect(() => {
    if (gameStarted && deadline > 0 && !gameOver) {
      const timer = setTimeout(() => setDeadline(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (deadline === 0) {
      setGameOver(true);
    }
  }, [gameStarted, deadline, gameOver]);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 max-w-4xl w-full"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Project Management Challenge</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        {!gameStarted ? (
          <div className="text-center py-12">
            <h3 className="text-2xl font-bold mb-4">Lead Projects to Success</h3>
            <p className="text-gray-600 mb-8">Manage your team, budget, and deadlines to complete projects successfully!</p>
            <button onClick={startGame} className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              Start Managing
            </button>
          </div>
        ) : gameOver ? (
          <div className="text-center py-12">
            <h3 className="text-2xl font-bold mb-4">Game Over!</h3>
            <p className="text-xl text-gray-600 mb-4">Final Score: {score}</p>
            <p className="text-lg text-gray-600 mb-6">Projects Completed: {projects}</p>
            <button onClick={startGame} className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              Play Again
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <h4 className="font-bold text-blue-800">Score</h4>
                <p className="text-2xl font-bold text-blue-600">{score}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <h4 className="font-bold text-green-800">Projects</h4>
                <p className="text-2xl font-bold text-green-600">{projects}</p>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4 text-center">
                <h4 className="font-bold text-yellow-800">Budget</h4>
                <p className="text-2xl font-bold text-yellow-600">${budget}</p>
              </div>
              <div className="bg-red-50 rounded-lg p-4 text-center">
                <h4 className="font-bold text-red-800">Deadline</h4>
                <p className="text-2xl font-bold text-red-600">{deadline}d</p>
              </div>
            </div>

            {currentProject && (
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Current Project: {currentProject.name}</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p><strong>Difficulty:</strong> {currentProject.difficulty}</p>
                    <p><strong>Required Team:</strong> {currentProject.team} members</p>
                  </div>
                  <div>
                    <p><strong>Required Budget:</strong> ${currentProject.budget}</p>
                    <p><strong>Reward:</strong> {currentProject.reward} points</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Make a decision:</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => makeDecision('hire')}
                      disabled={budget < 2000}
                      className="p-3 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="font-medium">Hire Team Member</div>
                      <div className="text-sm text-gray-600">Cost: $2000, +1 team member</div>
                    </button>
                    <button 
                      onClick={() => makeDecision('overtime')}
                      disabled={budget < 1000}
                      className="p-3 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="font-medium">Pay Overtime</div>
                      <div className="text-sm text-gray-600">Cost: $1000, -5 days</div>
                    </button>
                    <button 
                      onClick={() => makeDecision('outsource')}
                      disabled={budget < 3000}
                      className="p-3 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="font-medium">Outsource Work</div>
                      <div className="text-sm text-gray-600">Cost: $3000, -10 days</div>
                    </button>
                    <button 
                      onClick={() => makeDecision('complete')}
                      disabled={teamMembers < currentProject.team || budget < currentProject.budget}
                      className="p-3 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="font-medium">Complete Project</div>
                      <div className="text-sm text-gray-600">+{currentProject.reward} points</div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-blue-50 rounded-lg p-4">
              <h5 className="font-semibold text-blue-800 mb-2">Current Team: {teamMembers} members</h5>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (teamMembers / 10) * 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

// Skill Development Quest - Real Game Component
const SimpleSkillGame = ({ onClose, onScoreUpdate }: { onClose: () => void; onScoreUpdate: (score: number) => void }) => {
  const [score, setScore] = useState(0);
  const [skills, setSkills] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentSkill, setCurrentSkill] = useState<{name: string; difficulty: string; reward: number; energy: number; color: string} | null>(null);
  const [progress, setProgress] = useState(0);
  const [energy, setEnergy] = useState(100);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  const skillTypes = [
    { name: "React.js", difficulty: "Medium", time: 20, energy: 30, reward: 25, color: "bg-blue-500" },
    { name: "Python", difficulty: "Easy", time: 15, energy: 20, reward: 20, color: "bg-green-500" },
    { name: "AI/ML", difficulty: "Hard", time: 30, energy: 50, reward: 40, color: "bg-purple-500" },
    { name: "Communication", difficulty: "Easy", time: 10, energy: 15, reward: 15, color: "bg-yellow-500" },
    { name: "Leadership", difficulty: "Medium", time: 25, energy: 35, reward: 30, color: "bg-red-500" },
    { name: "DevOps", difficulty: "Hard", time: 35, energy: 45, reward: 45, color: "bg-indigo-500" }
  ];

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setSkills(0);
    setProgress(0);
    setEnergy(100);
    setGameOver(false);
    setTimeLeft(60);
    selectNewSkill();
  };

  const selectNewSkill = () => {
    const randomSkill = skillTypes[Math.floor(Math.random() * skillTypes.length)];
    setCurrentSkill(randomSkill);
    setProgress(0);
  };

  const study = () => {
    if (!currentSkill || energy < currentSkill.energy) return;

    setProgress(prev => {
      const newProgress = prev + 10;
      if (newProgress >= 100) {
        // Skill completed
        setScore(prev => {
          const newScore = prev + currentSkill.reward;
          // Use setTimeout to defer the score update to avoid render issues
          setTimeout(() => onScoreUpdate(newScore), 0);
          return newScore;
        });
        setSkills(prev => prev + 1);
        selectNewSkill();
        return 0;
      }
      return newProgress;
    });

    setEnergy(prev => Math.max(0, prev - currentSkill.energy));
  };

  const rest = () => {
    setEnergy(prev => Math.min(100, prev + 20));
  };

  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [gameStarted, timeLeft, gameOver]);

  useEffect(() => {
    if (energy <= 0) {
      setGameOver(true);
    }
  }, [energy]);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 max-w-4xl w-full"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Skill Development Quest</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        {!gameStarted ? (
          <div className="text-center py-12">
            <h3 className="text-2xl font-bold mb-4">Level Up Your Skills</h3>
            <p className="text-gray-600 mb-8">Study different skills, manage your energy, and complete as many skills as possible in 60 seconds!</p>
            <button onClick={startGame} className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
              Start Learning
            </button>
          </div>
        ) : gameOver ? (
          <div className="text-center py-12">
            <h3 className="text-2xl font-bold mb-4">Learning Session Complete!</h3>
            <p className="text-xl text-gray-600 mb-4">Final Score: {score}</p>
            <p className="text-lg text-gray-600 mb-6">Skills Mastered: {skills}</p>
            <button onClick={startGame} className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
              Study Again
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <h4 className="font-bold text-purple-800">Score</h4>
                <p className="text-2xl font-bold text-purple-600">{score}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <h4 className="font-bold text-green-800">Skills</h4>
                <p className="text-2xl font-bold text-green-600">{skills}</p>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4 text-center">
                <h4 className="font-bold text-yellow-800">Energy</h4>
                <p className="text-2xl font-bold text-yellow-600">{energy}%</p>
              </div>
              <div className="bg-red-50 rounded-lg p-4 text-center">
                <h4 className="font-bold text-red-800">Time</h4>
                <p className="text-2xl font-bold text-red-600">{timeLeft}s</p>
              </div>
            </div>

            {currentSkill && (
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-full ${currentSkill.color} flex items-center justify-center text-white font-bold text-lg`}>
                    {currentSkill.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Learning: {currentSkill.name}</h3>
                    <p className="text-gray-600">Difficulty: {currentSkill.difficulty}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm font-medium">{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`${currentSkill.color} h-3 rounded-full transition-all duration-300`}
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={study}
                    disabled={energy < currentSkill.energy}
                    className="p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="font-medium">Study Hard</div>
                    <div className="text-sm text-gray-600">Energy: -{currentSkill.energy}%</div>
                    <div className="text-sm text-gray-600">Progress: +10%</div>
                  </button>
                  <button 
                    onClick={rest}
                    disabled={energy >= 100}
                    className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="font-medium">Take a Break</div>
                    <div className="text-sm text-gray-600">Energy: +20%</div>
                    <div className="text-sm text-gray-600">No progress</div>
                  </button>
                </div>
              </div>
            )}

            <div className="bg-blue-50 rounded-lg p-4">
              <h5 className="font-semibold text-blue-800 mb-2">Energy Level</h5>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${energy}%` }}
                ></div>
              </div>
              <p className="text-sm text-blue-700 mt-2">
                {energy > 70 ? "You're energized and ready to learn!" : 
                 energy > 30 ? "Getting tired, consider taking a break." : 
                 "Very tired! Rest to continue learning."}
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

// Startup Simulator - Real Game Component
const SimpleStartupGame = ({ onClose, onScoreUpdate }: { onClose: () => void; onScoreUpdate: (score: number) => void }) => {
  const [score, setScore] = useState(0);
  const [funding, setFunding] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [users, setUsers] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(45);

  const startupPhases = [
    { name: "Idea Stage", funding: 0, revenue: 0, users: 0, actions: [
      { name: "Validate Idea", cost: 0, revenue: 0, users: 10, funding: 0, points: 15 },
      { name: "Create MVP", cost: 5000, revenue: 0, users: 50, funding: 0, points: 25 },
      { name: "Get First Users", cost: 2000, revenue: 100, users: 100, funding: 0, points: 20 }
    ]},
    { name: "Seed Stage", funding: 50000, revenue: 1000, users: 200, actions: [
      { name: "Hire Team", cost: 10000, revenue: 0, users: 0, funding: 0, points: 20 },
      { name: "Improve Product", cost: 8000, revenue: 500, users: 150, funding: 0, points: 25 },
      { name: "Marketing Campaign", cost: 5000, revenue: 200, users: 300, funding: 0, points: 18 }
    ]},
    { name: "Series A", funding: 200000, revenue: 5000, users: 1000, actions: [
      { name: "Scale Operations", cost: 20000, revenue: 1000, users: 500, funding: 0, points: 30 },
      { name: "Expand Team", cost: 15000, revenue: 0, users: 0, funding: 0, points: 25 },
      { name: "New Features", cost: 12000, revenue: 800, users: 400, funding: 0, points: 28 }
    ]},
    { name: "Growth Stage", funding: 500000, revenue: 15000, users: 5000, actions: [
      { name: "International Expansion", cost: 30000, revenue: 2000, users: 1000, funding: 0, points: 40 },
      { name: "Acquisition", cost: 50000, revenue: 3000, users: 2000, funding: 0, points: 50 },
      { name: "IPO Preparation", cost: 40000, revenue: 1500, users: 500, funding: 0, points: 60 }
    ]}
  ];

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setFunding(0);
    setRevenue(0);
    setUsers(0);
    setCurrentPhase(0);
    setGameOver(false);
    setTimeLeft(45);
  };

  const executeAction = (action: {cost: number; revenue: number; users: number; name: string; points: number}) => {
    if (funding < action.cost) return;

    setFunding(prev => prev - action.cost);
    setRevenue(prev => prev + action.revenue);
    setUsers(prev => prev + action.users);
    setScore(prev => {
      const newScore = prev + action.points;
      // Use setTimeout to defer the score update to avoid render issues
      setTimeout(() => onScoreUpdate(newScore), 0);
      return newScore;
    });

    // Check if ready for next phase
    const currentPhaseData = startupPhases[currentPhase];
    if (revenue >= currentPhaseData.revenue && users >= currentPhaseData.users && currentPhase < startupPhases.length - 1) {
      setCurrentPhase(prev => prev + 1);
      const nextPhase = startupPhases[currentPhase + 1];
      setFunding(prev => prev + nextPhase.funding);
    }
  };

  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [gameStarted, timeLeft, gameOver]);

  const currentPhaseData = startupPhases[currentPhase];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 max-w-4xl w-full"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Startup Simulator</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        {!gameStarted ? (
          <div className="text-center py-12">
            <h3 className="text-2xl font-bold mb-4">Launch Your Startup</h3>
            <p className="text-gray-600 mb-8">Build your startup from idea to IPO! Manage funding, revenue, and users to grow your company in 45 seconds!</p>
            <button onClick={startGame} className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors">
              Start Startup
            </button>
          </div>
        ) : gameOver ? (
          <div className="text-center py-12">
            <h3 className="text-2xl font-bold mb-4">Startup Journey Complete!</h3>
            <p className="text-xl text-gray-600 mb-4">Final Score: {score}</p>
            <p className="text-lg text-gray-600 mb-2">Final Funding: ${funding.toLocaleString()}</p>
            <p className="text-lg text-gray-600 mb-2">Final Revenue: ${revenue.toLocaleString()}</p>
            <p className="text-lg text-gray-600 mb-6">Total Users: {users.toLocaleString()}</p>
            <button onClick={startGame} className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors">
              Start New Startup
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-orange-50 rounded-lg p-4 text-center">
                <h4 className="font-bold text-orange-800">Score</h4>
                <p className="text-2xl font-bold text-orange-600">{score}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <h4 className="font-bold text-green-800">Funding</h4>
                <p className="text-2xl font-bold text-green-600">${funding.toLocaleString()}</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <h4 className="font-bold text-blue-800">Revenue</h4>
                <p className="text-2xl font-bold text-blue-600">${revenue.toLocaleString()}</p>
              </div>
              <div className="bg-red-50 rounded-lg p-4 text-center">
                <h4 className="font-bold text-red-800">Time</h4>
                <p className="text-2xl font-bold text-red-600">{timeLeft}s</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Current Phase: {currentPhaseData.name}</h3>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Users: {users.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Phase {currentPhase + 1} of {startupPhases.length}</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Phase Progress</span>
                  <span className="text-sm font-medium">
                    {Math.min(100, Math.floor((revenue / currentPhaseData.revenue) * 50 + (users / currentPhaseData.users) * 50))}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-orange-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, Math.floor((revenue / currentPhaseData.revenue) * 50 + (users / currentPhaseData.users) * 50))}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Available Actions:</h4>
                {currentPhaseData.actions.map((action, index) => (
                  <button 
                    key={index}
                    onClick={() => executeAction(action)}
                    disabled={funding < action.cost}
                    className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-left"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{action.name}</div>
                        <div className="text-sm text-gray-600">
                          Cost: ${action.cost.toLocaleString()} | 
                          Revenue: +${action.revenue.toLocaleString()} | 
                          Users: +{action.users.toLocaleString()}
                        </div>
                      </div>
                      <div className="text-orange-600 font-bold">+{action.points} pts</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h5 className="font-semibold text-blue-800 mb-2">Next Phase Requirements:</h5>
              {currentPhase < startupPhases.length - 1 ? (
                <div className="text-sm text-blue-700">
                  <p>• Revenue: ${startupPhases[currentPhase + 1].revenue.toLocaleString()}</p>
                  <p>• Users: {startupPhases[currentPhase + 1].users.toLocaleString()}</p>
                  <p>• Funding Bonus: ${startupPhases[currentPhase + 1].funding.toLocaleString()}</p>
                </div>
              ) : (
                <p className="text-sm text-blue-700">🎉 You&apos;ve reached the final phase! Keep growing your startup!</p>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

const EntertainmentPage = () => {
  const [filterCategory, setFilterCategory] = useState('all');
  const [leaderboard, setLeaderboard] = useState<{[key: string]: number}>({});
  const [isClient, setIsClient] = useState(false);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  useEffect(() => {
    // Mark as client-side and load leaderboard from localStorage
    setIsClient(true);
    const savedLeaderboard = localStorage.getItem('gameLeaderboard');
    if (savedLeaderboard) {
      setLeaderboard(JSON.parse(savedLeaderboard));
    }
  }, []);

  const categories = ['all', 'Strategy', 'AI Chat', 'Career', 'Management', 'Learning', 'Entrepreneurship'];

  const filteredGames = filterCategory === 'all' 
    ? games 
    : games.filter(game => game.category === filterCategory);

  const updateLeaderboard = useCallback((gameId: string, score: number) => {
    if (!isClient) return;
    
    setLeaderboard(prev => {
      const newLeaderboard = { ...prev, [gameId]: Math.max(prev[gameId] || 0, score) };
      localStorage.setItem('gameLeaderboard', JSON.stringify(newLeaderboard));
      return newLeaderboard;
    });
  }, [isClient]);

  // Memoized score update functions

  const openGame = (gameId: string) => {
    setSelectedGame(gameId);
  };

  const closeGame = () => {
    setSelectedGame(null);
  };

  const renderGame = () => {
    if (!selectedGame) return null;

    const gameProps = { 
      onClose: closeGame, 
      onScoreUpdate: (score: number) => updateLeaderboard(selectedGame, score) 
    };

    switch (selectedGame) {
      case 'business-strategy':
        return <BusinessStrategyGame {...gameProps} />;
      case 'networking-puzzle':
        return <ClaudeExpertChatbot {...gameProps} />;
      case 'career-path':
        return <SimpleCareerGame {...gameProps} />;
      case 'project-management':
        return <SimpleProjectGame {...gameProps} />;
      case 'skill-builder':
        return <SimpleSkillGame {...gameProps} />;
      case 'startup-simulator':
        return <SimpleStartupGame {...gameProps} />;
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="hero-gradient py-16 lg:py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white max-w-4xl mx-auto"
          >
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Professional <span className="text-yellow-400">Games</span>
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed mb-8">
              Play engaging LinkedIn-style games that combine fun with professional development. 
              Build skills, make connections, and advance your career through interactive gameplay.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <section className="py-12">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Gamepad2 className="w-6 h-6 mr-3 text-blue-600" />
                  Game Categories
                </h3>
                
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setFilterCategory(category)}
                      className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                        filterCategory === category
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {category === 'all' ? 'All Games' : category}
                      <span className="float-right text-sm opacity-75">
                        {category === 'all' ? games.length : games.filter(g => g.category === category).length}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Leaderboard Preview */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                    Top Scores
                  </h4>
                  <div className="space-y-2">
                    {games.slice(0, 3).map((game) => (
                      <div key={game.id} className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 truncate">{game.title}</span>
                        <span className="font-semibold text-blue-600">
                          {isClient ? (leaderboard[game.id] || 0) : 0}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {filterCategory === 'all' ? 'All Games' : filterCategory} Games
                </h2>
                <p className="text-gray-600">
                  {filteredGames.length} {filteredGames.length === 1 ? 'game' : 'games'} available
                </p>
              </div>

              {filteredGames.length === 0 ? (
                <div className="text-center py-12">
                  <Gamepad2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No games found</h3>
                  <p className="text-gray-600">Try selecting a different category.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredGames.map((game, index) => {
                    const Icon = game.icon;
                    return (
                      <motion.div
                        key={game.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                      >
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={game.image}
                            alt={game.title}
                            width={400}
                            height={192}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://img.freepik.com/free-photo/gaming-concept_23-2149074800.jpg';
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                          <div className="absolute bottom-4 left-4 flex items-center gap-2">
                            <Icon className="w-6 h-6 text-white" />
                            <span className={`
                              px-2 py-1 rounded-full text-xs font-medium
                              ${game.difficulty === 'Easy' ? 'bg-green-500' : ''}
                              ${game.difficulty === 'Medium' ? 'bg-yellow-500' : ''}
                              ${game.difficulty === 'Hard' ? 'bg-red-500' : ''}
                              text-white
                            `}>
                              {game.difficulty}
                            </span>
                          </div>
                          <div className="absolute top-4 right-4">
                            <span className="bg-white/90 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                              {game.category}
                            </span>
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold mb-3 text-gray-900">{game.title}</h3>
                          <p className="text-gray-600 mb-4 text-sm leading-relaxed">{game.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-500">
                              High Score: <span className="font-semibold text-blue-600">
                                {isClient ? (leaderboard[game.id] || 0) : 0}
                              </span>
                            </div>
                            <button
                              onClick={() => openGame(game.id)}
                              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                            >
                              <Play className="w-4 h-4" />
                              Play
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Leaderboard Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Leaderboard</h2>
            <p className="text-xl text-gray-600">Track your progress across all games</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
          >
            {games.map((game, index) => {
              const Icon = game.icon;
              return (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Icon className="w-8 h-8 mx-auto mb-3 text-purple-600" />
                <h3 className="font-semibold text-sm mb-2">{game.title}</h3>
                <div className="text-2xl font-bold text-purple-600">
                  {isClient ? (leaderboard[game.id] || 0) : 0}
                </div>
                 <div className="text-xs text-gray-500 mt-1">
                     {game.id === 'minecraft' ? 'blocks' :
                      game.id === 'fashion-tetris' ? 'lines' :
                      game.id === 'roblox' ? 'coins' :
                      game.id === 'mario-kart' ? 'points' :
                      game.id === 'sims' ? 'happiness' :
                      game.id === 'love-nikki' ? 'style' : 'score'}
                 </div>
              </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Our Games?</h2>
            <p className="text-xl text-gray-600">Professional quality entertainment at your fingertips</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { icon: Target, text: 'Professional Quality' },
              { icon: Users, text: 'Multiplayer Ready' },
              { icon: Timer, text: 'Quick Sessions' },
              { icon: Trophy, text: 'Track Progress' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/20 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3"
              >
                <item.icon className="w-6 h-6" />
                <span className="font-medium">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
      
      {/* Game Modal */}
      {renderGame()}
    </main>
  );
};

export default EntertainmentPage;
