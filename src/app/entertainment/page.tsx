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
  Sparkles,
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
    image: 'https://img.freepik.com/free-photo/business-people-working-together-office_23-2149211061.jpg',
    difficulty: 'Medium',
    category: 'Strategy'
  },
        {
          id: 'networking-puzzle',
          title: 'Sakura AI Assistant',
          description: 'Chat with Sakura Nakamura, our AI Research Scientist, about romance, lifestyle, psychology, and personal growth. Get expert advice on relationships, wellness, and life challenges.',
          icon: Users,
          image: 'https://img.freepik.com/free-photo/beautiful-woman-using-laptop_23-2149211061.jpg',
          difficulty: 'Easy',
          category: 'AI Chat'
        },
  {
    id: 'career-path',
    title: 'Career Path Adventure',
    description: 'Navigate through different career opportunities. Make decisions that shape your professional journey and unlock achievements.',
    icon: Trophy,
    image: 'https://img.freepik.com/free-photo/professional-man-working-office_23-2149211061.jpg',
    difficulty: 'Easy',
    category: 'Career'
  },
  {
    id: 'project-management',
    title: 'Project Management Challenge',
    description: 'Lead teams and deliver projects on time. Manage resources, timelines, and stakeholder expectations in this strategic game.',
    icon: Timer,
    image: 'https://img.freepik.com/free-photo/team-meeting-office_23-2149211061.jpg',
    difficulty: 'Hard',
    category: 'Management'
  },
  {
    id: 'skill-builder',
    title: 'Skill Development Quest',
    description: 'Level up your professional skills through interactive challenges. Master new technologies and advance your expertise.',
    icon: Brain,
    image: 'https://img.freepik.com/free-photo/learning-education-concept_23-2149211061.jpg',
    difficulty: 'Medium',
    category: 'Learning'
  },
  {
    id: 'startup-simulator',
    title: 'Startup Simulator',
    description: 'Launch and grow your startup from idea to IPO. Handle funding rounds, product development, and market competition.',
    icon: Star,
    image: 'https://img.freepik.com/free-photo/startup-entrepreneur-concept_23-2149211061.jpg',
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

// Roblox Game Component
const RobloxGame = ({ onClose, onScoreUpdate }: { onClose: () => void; onScoreUpdate: (score: number) => void }) => {
  const [avatar, setAvatar] = useState({
    hair: 'blonde',
    shirt: 'blue',
    pants: 'jeans',
    accessories: 'none'
  });
  const [coins, setCoins] = useState(0);
  const [position, setPosition] = useState({ x: 200, y: 200 });
  const [gameStarted, setGameStarted] = useState(false);

  const avatarParts = {
    hair: [
      { id: 'blonde', color: '#FFD700', name: 'Blonde' },
      { id: 'brown', color: '#8B4513', name: 'Brown' },
      { id: 'black', color: '#000000', name: 'Black' },
      { id: 'red', color: '#FF0000', name: 'Red' }
    ],
    shirt: [
      { id: 'blue', color: '#2196F3', name: 'Blue Shirt' },
      { id: 'red', color: '#F44336', name: 'Red Shirt' },
      { id: 'green', color: '#4CAF50', name: 'Green Shirt' },
      { id: 'yellow', color: '#FFEB3B', name: 'Yellow Shirt' }
    ],
    pants: [
      { id: 'jeans', color: '#3F51B5', name: 'Jeans' },
      { id: 'black', color: '#212121', name: 'Black Pants' },
      { id: 'white', color: '#FFFFFF', name: 'White Pants' },
      { id: 'gray', color: '#9E9E9E', name: 'Gray Pants' }
    ]
  };

  const collectCoin = () => {
    setCoins(prev => {
      const newCoins = prev + 1;
      onScoreUpdate(newCoins);
      return newCoins;
    });
  };

  const startGame = () => {
    setGameStarted(true);
    setPosition({ x: 200, y: 200 });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 max-w-4xl w-full"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Roblox World</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex gap-6">
          <div className="flex-1">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Coins: {coins}</h3>
              {!gameStarted && (
                <button onClick={startGame} className="btn btn-primary mt-2">
                  Start Adventure
                </button>
              )}
            </div>
            
            <div className="relative w-full h-96 bg-gradient-to-b from-green-300 to-blue-300 rounded-lg border-2 border-gray-300">
              {/* Avatar */}
              <div
                className="absolute w-12 h-12 bg-pink-300 rounded-full border-2 border-pink-500 cursor-pointer"
                style={{ left: position.x, top: position.y }}
                onClick={collectCoin}
              >
                {/* Hair */}
                <div
                  className="absolute w-8 h-8 rounded-full border-2"
                  style={{ 
                    backgroundColor: avatarParts.hair.find(h => h.id === avatar.hair)?.color,
                    top: -4,
                    left: 2
                  }}
                />
                {/* Shirt */}
                <div
                  className="absolute w-10 h-6 rounded border"
                  style={{ 
                    backgroundColor: avatarParts.shirt.find(s => s.id === avatar.shirt)?.color,
                    top: 8,
                    left: 1
                  }}
                />
                {/* Pants */}
                <div
                  className="absolute w-8 h-4 rounded border"
                  style={{ 
                    backgroundColor: avatarParts.pants.find(p => p.id === avatar.pants)?.color,
                    top: 14,
                    left: 2
                  }}
                />
              </div>
              
              {/* Coins */}
              {gameStarted && (
                <div
                  className="absolute w-6 h-6 bg-yellow-400 rounded-full border-2 border-yellow-600 cursor-pointer animate-pulse"
                  style={{ left: 300, top: 150 }}
                  onClick={collectCoin}
                >
                  <div className="text-xs text-center mt-1">$</div>
                </div>
              )}
            </div>
            
            <p className="text-sm text-gray-600 mt-2">
              Click on your avatar to collect coins and customize your look!
            </p>
          </div>

          <div className="w-48">
            <h3 className="text-lg font-semibold mb-4">Customize Avatar</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Hair</h4>
                <div className="grid grid-cols-2 gap-2">
                  {avatarParts.hair.map(hair => (
                    <button
                      key={hair.id}
                      onClick={() => setAvatar(prev => ({ ...prev, hair: hair.id }))}
                      className={`p-2 rounded border-2 ${
                        avatar.hair === hair.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      <div
                        className="w-4 h-4 rounded-full mx-auto mb-1"
                        style={{ backgroundColor: hair.color }}
                      />
                      <span className="text-xs">{hair.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Shirt</h4>
                <div className="grid grid-cols-2 gap-2">
                  {avatarParts.shirt.map(shirt => (
                    <button
                      key={shirt.id}
                      onClick={() => setAvatar(prev => ({ ...prev, shirt: shirt.id }))}
                      className={`p-2 rounded border-2 ${
                        avatar.shirt === shirt.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      <div
                        className="w-4 h-4 rounded mx-auto mb-1"
                        style={{ backgroundColor: shirt.color }}
                      />
                      <span className="text-xs">{shirt.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Pants</h4>
                <div className="grid grid-cols-2 gap-2">
                  {avatarParts.pants.map(pants => (
                    <button
                      key={pants.id}
                      onClick={() => setAvatar(prev => ({ ...prev, pants: pants.id }))}
                      className={`p-2 rounded border-2 ${
                        avatar.pants === pants.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      <div
                        className="w-4 h-4 rounded mx-auto mb-1"
                        style={{ backgroundColor: pants.color }}
                      />
                      <span className="text-xs">{pants.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Mario Kart Game Component
const MarioKartGame = ({ onClose, onScoreUpdate }: { onClose: () => void; onScoreUpdate: (score: number) => void }) => {
  const [player, setPlayer] = useState({ x: 200, y: 300 });
  const [speed, setSpeed] = useState(0);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [powerUps, setPowerUps] = useState<Array<{x: number, y: number, type: string}>>([]);

  useEffect(() => {
    if (!gameStarted) return;

    const gameLoop = setInterval(() => {
      setPlayer(prev => ({ ...prev, x: Math.max(50, Math.min(350, prev.x + speed)) }));
      
      setPowerUps(prev => {
        const newPowerUps = prev.map(pu => ({ ...pu, y: pu.y + 3 }));
        const filteredPowerUps = newPowerUps.filter(pu => pu.y < 400);
        
        if (Math.random() < 0.01) {
          filteredPowerUps.push({
            x: Math.random() * 300 + 50,
            y: -20,
            type: Math.random() < 0.5 ? 'mushroom' : 'star'
          });
        }
        
        return filteredPowerUps;
      });
    }, 50);

    return () => clearInterval(gameLoop);
  }, [gameStarted, speed]);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (!gameStarted) return;
    
    switch (e.key) {
      case 'ArrowLeft':
        setSpeed(prev => Math.max(-5, prev - 1));
        break;
      case 'ArrowRight':
        setSpeed(prev => Math.min(5, prev + 1));
        break;
    }
  }, [gameStarted]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameStarted, handleKeyPress]);

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setSpeed(0);
  };

  const collectPowerUp = (index: number) => {
    setPowerUps(prev => prev.filter((_, i) => i !== index));
    setScore(prev => {
      const newScore = prev + 10;
      onScoreUpdate(newScore);
      return newScore;
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 max-w-2xl w-full"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Mario Kart Racing</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-4">
          <div className="text-xl font-bold">Score: {score}</div>
          {!gameStarted && (
            <button onClick={startGame} className="btn btn-primary mt-2">
              Start Race
            </button>
          )}
        </div>

        <div className="relative w-full h-96 bg-gradient-to-b from-green-400 to-green-600 rounded-lg overflow-hidden">
          {/* Road */}
          <div className="absolute inset-0 bg-gray-600 opacity-50"></div>
          
          {/* Player Car */}
          <div
            className="absolute w-8 h-12 bg-red-500 rounded border-2 border-red-700"
            style={{ left: player.x, top: player.y }}
          >
            <div className="w-2 h-2 bg-yellow-300 rounded-full absolute top-1 left-1"></div>
            <div className="w-2 h-2 bg-yellow-300 rounded-full absolute top-1 right-1"></div>
          </div>
          
          {/* Power-ups */}
          {powerUps.map((powerUp, index) => (
            <div
              key={index}
              className="absolute w-6 h-6 cursor-pointer"
              style={{ left: powerUp.x, top: powerUp.y }}
              onClick={() => collectPowerUp(index)}
            >
              {powerUp.type === 'mushroom' ? (
                <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white">
                  <div className="w-2 h-2 bg-white rounded-full absolute top-1 left-2"></div>
                </div>
              ) : (
                <div className="w-6 h-6 bg-yellow-400 rounded-full border-2 border-yellow-600">
                  <div className="text-xs text-center mt-1">★</div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center text-sm text-gray-600 mb-4">
          Use left/right arrow keys to steer and collect power-ups!
        </div>
      </motion.div>
    </div>
  );
};

// The Sims Game Component
const SimsGame = ({ onClose, onScoreUpdate }: { onClose: () => void; onScoreUpdate: (score: number) => void }) => {
  const [sim, setSim] = useState({
    name: 'Alex',
    happiness: 50,
    energy: 50,
    hunger: 50,
    social: 50
  });
  const [score, setScore] = useState(0);
  const [currentAction, setCurrentAction] = useState('idle');

  const actions = [
    { id: 'eat', name: 'Eat', icon: '🍎', effect: { hunger: 20, energy: -5, happiness: 0, social: 0 } },
    { id: 'sleep', name: 'Sleep', icon: '😴', effect: { energy: 30, hunger: -10, happiness: 0, social: 0 } },
    { id: 'play', name: 'Play', icon: '🎮', effect: { happiness: 25, energy: -15, hunger: 0, social: 0 } },
    { id: 'socialize', name: 'Socialize', icon: '👥', effect: { social: 20, happiness: 15, hunger: 0, energy: 0 } }
  ];

  const performAction = (action: typeof actions[0]) => {
    setCurrentAction(action.id);
    setSim(prev => ({
      ...prev,
      hunger: Math.max(0, Math.min(100, prev.hunger + action.effect.hunger)),
      energy: Math.max(0, Math.min(100, prev.energy + action.effect.energy)),
      happiness: Math.max(0, Math.min(100, prev.happiness + (action.effect.happiness || 0))),
      social: Math.max(0, Math.min(100, prev.social + (action.effect.social || 0)))
    }));
    
    setScore(prev => {
      const newScore = prev + 10;
      onScoreUpdate(newScore);
      return newScore;
    });

    setTimeout(() => setCurrentAction('idle'), 1000);
  };

  const getMoodColor = () => {
    const avg = (sim.happiness + sim.energy + sim.hunger + sim.social) / 4;
    if (avg > 75) return 'text-green-500';
    if (avg > 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 max-w-2xl w-full"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">The Sims Life</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-4">
          <div className="text-xl font-bold">Score: {score}</div>
        </div>

        <div className="flex gap-6">
          <div className="flex-1">
            <div className="bg-blue-100 rounded-lg p-6 mb-4">
              <h3 className="text-lg font-semibold mb-4">{sim.name} the Sim</h3>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Happiness</span>
                    <span className={getMoodColor()}>{sim.happiness}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: `${sim.happiness}%` }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Energy</span>
                    <span className={getMoodColor()}>{sim.energy}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${sim.energy}%` }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Hunger</span>
                    <span className={getMoodColor()}>{sim.hunger}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${sim.hunger}%` }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Social</span>
                    <span className={getMoodColor()}>{sim.social}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${sim.social}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-48">
            <h3 className="text-lg font-semibold mb-4">Actions</h3>
            <div className="space-y-2">
              {actions.map(action => (
                <button
                  key={action.id}
                  onClick={() => performAction(action)}
                  disabled={currentAction === action.id}
                  className={`w-full p-3 rounded-lg border-2 transition-all ${
                    currentAction === action.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{action.icon}</span>
                    <span className="font-medium">{action.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Love Nikki Game Component
const LoveNikkiGame = ({ onClose, onScoreUpdate }: { onClose: () => void; onScoreUpdate: (score: number) => void }) => {
  const [outfit, setOutfit] = useState({
    dress: 'none',
    hair: 'none',
    shoes: 'none',
    accessories: 'none'
  });
  const [score, setScore] = useState(0);
  const [style, setStyle] = useState(0);

  const clothingItems = {
    dress: [
      { id: 'none', name: 'None', color: 'transparent', style: 0 },
      { id: 'elegant', name: 'Elegant Dress', color: '#E91E63', style: 20 },
      { id: 'casual', name: 'Casual Dress', color: '#4CAF50', style: 15 },
      { id: 'party', name: 'Party Dress', color: '#9C27B0', style: 25 }
    ],
    hair: [
      { id: 'none', name: 'None', color: 'transparent', style: 0 },
      { id: 'long', name: 'Long Hair', color: '#8B4513', style: 15 },
      { id: 'short', name: 'Short Hair', color: '#FFD700', style: 10 },
      { id: 'curly', name: 'Curly Hair', color: '#FF5722', style: 20 }
    ],
    shoes: [
      { id: 'none', name: 'None', color: 'transparent', style: 0 },
      { id: 'heels', name: 'High Heels', color: '#000000', style: 15 },
      { id: 'sneakers', name: 'Sneakers', color: '#FFFFFF', style: 10 },
      { id: 'boots', name: 'Boots', color: '#795548', style: 12 }
    ],
    accessories: [
      { id: 'none', name: 'None', color: 'transparent', style: 0 },
      { id: 'necklace', name: 'Necklace', color: '#FFD700', style: 18 },
      { id: 'earrings', name: 'Earrings', color: '#E91E63', style: 12 },
      { id: 'bracelet', name: 'Bracelet', color: '#2196F3', style: 8 }
    ]
  };

  const updateOutfit = (category: keyof typeof outfit, itemId: string) => {
    setOutfit(prev => ({ ...prev, [category]: itemId }));
    
    const newStyle = Object.entries(clothingItems).reduce((total, [categoryKey, category]) => {
      const selectedItem = category.find(item => item.id === outfit[categoryKey as keyof typeof outfit]);
      return total + (selectedItem?.style || 0);
    }, 0);
    
    setStyle(newStyle);
    setScore(prev => {
      const newScore = prev + 5;
      onScoreUpdate(newScore);
      return newScore;
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 max-w-4xl w-full"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Love Nikki Fashion</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-4">
          <div className="text-xl font-bold">Style Score: {style}</div>
          <div className="text-lg">Total Score: {score}</div>
        </div>

        <div className="flex gap-6">
          <div className="flex-1">
            <div className="bg-pink-100 rounded-lg p-6 mb-4">
              <h3 className="text-lg font-semibold mb-4">Your Character</h3>
              
              <div className="relative w-32 h-48 mx-auto bg-gray-200 rounded-lg border-2 border-gray-300">
                {/* Character Base */}
                <div className="absolute inset-0 bg-pink-200 rounded-lg"></div>
                
                {/* Dress */}
                {outfit.dress !== 'none' && (
                  <div
                    className="absolute bottom-0 left-2 right-2 h-24 rounded-t-lg border"
                    style={{ backgroundColor: clothingItems.dress.find(d => d.id === outfit.dress)?.color }}
                  />
                )}
                
                {/* Hair */}
                {outfit.hair !== 'none' && (
                  <div
                    className="absolute top-0 left-4 right-4 h-16 rounded-t-lg border"
                    style={{ backgroundColor: clothingItems.hair.find(h => h.id === outfit.hair)?.color }}
                  />
                )}
                
                {/* Shoes */}
                {outfit.shoes !== 'none' && (
                  <div
                    className="absolute bottom-0 left-6 right-6 h-4 rounded border"
                    style={{ backgroundColor: clothingItems.shoes.find(s => s.id === outfit.shoes)?.color }}
                  />
                )}
                
                {/* Accessories */}
                {outfit.accessories !== 'none' && (
                  <div
                    className="absolute top-8 left-8 right-8 h-2 rounded border"
                    style={{ backgroundColor: clothingItems.accessories.find(a => a.id === outfit.accessories)?.color }}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="w-48">
            <h3 className="text-lg font-semibold mb-4">Wardrobe</h3>
            
            {Object.entries(clothingItems).map(([category, items]) => (
              <div key={category} className="mb-4">
                <h4 className="font-medium mb-2 capitalize">{category}</h4>
                <div className="space-y-1">
                  {items.map(item => (
                    <button
                      key={item.id}
                      onClick={() => updateOutfit(category as keyof typeof outfit, item.id)}
                      className={`w-full p-2 rounded border-2 text-sm ${
                        outfit[category as keyof typeof outfit] === item.id 
                          ? 'border-pink-500 bg-pink-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded border"
                          style={{ backgroundColor: item.color }}
                        />
                        <span>{item.name}</span>
                        {item.style > 0 && <span className="text-xs text-gray-500">+{item.style}</span>}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
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

  const categories = ['all', 'Sandbox', 'Fashion', 'Social', 'Racing', 'Simulation'];

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
        return <RobloxGame {...gameProps} />;
      case 'project-management':
        return <MarioKartGame {...gameProps} />;
      case 'skill-builder':
        return <SimsGame {...gameProps} />;
      case 'startup-simulator':
        return <LoveNikkiGame {...gameProps} />;
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-100">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-6">
              Entertainment Hub
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover the most popular and engaging games of 2025. From creative sandboxes to fashion shows, 
              there&apos;s something for everyone to enjoy!
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {[
                { icon: Gamepad2, text: '6 Amazing Games' },
                { icon: Users, text: 'Multiplayer Fun' },
                { icon: Trophy, text: 'Leaderboards' },
                { icon: Sparkles, text: 'Professional Quality' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/20 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3"
                >
                  <item.icon className="w-6 h-6" />
                  <span className="font-medium">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Game Categories */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Game Categories</h2>
            <p className="text-xl text-gray-600">Filter games by your preferred genre</p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilterCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  filterCategory === category
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {category === 'all' ? 'All Games' : category}
              </button>
            ))}
          </div>

          {/* Games Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredGames.map((game, index) => {
              const Icon = game.icon;
              return (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                        <Image
                          src={game.image}
                          alt={game.title}
                          width={400}
                          height={192}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://img.freepik.com/free-photo/gaming-concept_23-2149074800.jpg';
                          }}
                        />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                      <Icon className="w-8 h-8 text-white" />
                      <span className={`
                        px-3 py-1 rounded-full text-xs font-medium
                        ${game.difficulty === 'Easy' ? 'bg-green-500' : ''}
                        ${game.difficulty === 'Medium' ? 'bg-yellow-500' : ''}
                        ${game.difficulty === 'Hard' ? 'bg-red-500' : ''}
                        text-white
                      `}>
                        {game.difficulty}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-3">{game.title}</h3>
                    <p className="text-gray-600 mb-6">{game.description}</p>
                     <button
                       onClick={() => openGame(game.id)}
                       className="btn btn-primary w-full group"
                     >
                      <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                      Play Now
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
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
