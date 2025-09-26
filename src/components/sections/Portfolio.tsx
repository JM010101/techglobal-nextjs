'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Eye } from 'lucide-react';
import Image from 'next/image';

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  category: string;
  projectUrl?: string;
  githubUrl?: string;
  client: string;
  featured: boolean;
}

interface PortfolioProps {
  limit?: number;
}

const Portfolio = ({ limit }: PortfolioProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'Web Development', label: 'Web Development' },
    { id: 'Mobile App', label: 'Mobile Apps' },
    { id: 'AI/ML', label: 'AI/ML' },
    { id: 'Cloud Solutions', label: 'Cloud Solutions' },
    { id: 'Blockchain', label: 'Blockchain' },
  ];

  const sampleProjects: Project[] = [
    {
      id: '1',
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with advanced features including AI-powered recommendations, real-time inventory, and multi-payment integration.',
      imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      category: 'Web Development',
      projectUrl: '#',
      githubUrl: '#',
      client: 'TechStart Inc.',
      featured: true
    },
    {
      id: '2',
      title: 'AI-Powered Analytics Dashboard',
      description: 'Intelligent business analytics platform with machine learning insights, predictive modeling, and real-time data visualization.',
      imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['Python', 'TensorFlow', 'React', 'D3.js'],
      category: 'AI/ML',
      projectUrl: '#',
      client: 'DataCorp',
      featured: true
    },
    {
      id: '3',
      title: 'Mobile Banking App',
      description: 'Secure mobile banking application with biometric authentication, real-time transactions, and comprehensive financial management tools.',
      imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['React Native', 'Node.js', 'PostgreSQL', 'AWS'],
      category: 'Mobile App',
      projectUrl: '#',
      client: 'FinanceFlow',
      featured: false
    },
    {
      id: '4',
      title: 'Cloud Infrastructure Migration',
      description: 'Complete cloud migration solution with automated deployment, monitoring, and scaling capabilities for enterprise applications.',
      imageUrl: 'https://picsum.photos/800/600?random=1',
      technologies: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
      category: 'Cloud Solutions',
      projectUrl: '#',
      client: 'CloudTech Solutions',
      featured: true
    },
    {
      id: '5',
      title: 'Blockchain DeFi Platform',
      description: 'Decentralized finance platform with smart contracts, yield farming, and cross-chain compatibility for modern DeFi applications.',
      imageUrl: 'https://images.pexels.com/photos/6801649/pexels-photo-6801649.jpeg?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['Solidity', 'Web3.js', 'React', 'Ethereum'],
      category: 'Blockchain',
      projectUrl: '#',
      client: 'Blockchain Ventures',
      featured: true
    },
    {
      id: '6',
      title: 'IoT Manufacturing System',
      description: 'Smart manufacturing solution with real-time monitoring, predictive maintenance, and automated quality control systems.',
      imageUrl: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['IoT', 'Python', 'React', 'Machine Learning'],
      category: 'AI/ML',
      projectUrl: '#',
      client: 'IoT Innovations',
      featured: false
    },
    {
      id: '7',
      title: 'Digital Marketing Dashboard',
      description: 'Comprehensive marketing analytics platform with campaign management, ROI tracking, and automated reporting features.',
      imageUrl: 'https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['React', 'Node.js', 'MongoDB', 'Chart.js'],
      category: 'Web Development',
      projectUrl: '#',
      client: 'Digital Marketing Pro',
      featured: false
    },
    {
      id: '8',
      title: 'Health Monitoring App',
      description: 'Mobile health application with wearable device integration, health tracking, and telemedicine capabilities.',
      imageUrl: 'https://images.pexels.com/photos/4386432/pexels-photo-4386432.jpeg?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['React Native', 'Node.js', 'PostgreSQL', 'WebRTC'],
      category: 'Mobile App',
      projectUrl: '#',
      client: 'HealthTech Innovations',
      featured: true
    },
    {
      id: '9',
      title: 'Smart City Management System',
      description: 'Comprehensive smart city platform integrating traffic management, energy monitoring, and citizen services with real-time data analytics.',
      imageUrl: 'https://images.pexels.com/photos/1181672/pexels-photo-1181672.jpeg?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['IoT', 'Python', 'React', 'Machine Learning', 'AWS'],
      category: 'AI/ML',
      projectUrl: '#',
      client: 'SmartCity Solutions',
      featured: true
    },
    {
      id: '10',
      title: 'Cryptocurrency Trading Platform',
      description: 'Advanced cryptocurrency trading platform with real-time market data, automated trading bots, and comprehensive portfolio management.',
      imageUrl: 'https://images.pexels.com/photos/6801650/pexels-photo-6801650.jpeg?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['React', 'Node.js', 'WebSocket', 'Blockchain', 'Redis'],
      category: 'Blockchain',
      projectUrl: '#',
      client: 'CryptoTrader Pro',
      featured: false
    },
    {
      id: '11',
      title: 'Fitness Tracking Mobile App',
      description: 'Comprehensive fitness tracking application with workout plans, nutrition tracking, social features, and wearable device integration.',
      imageUrl: 'https://images.pexels.com/photos/4386433/pexels-photo-4386433.jpeg?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['React Native', 'Node.js', 'MongoDB', 'Firebase'],
      category: 'Mobile App',
      projectUrl: '#',
      client: 'FitLife Technologies',
      featured: false
    },
    {
      id: '12',
      title: 'Enterprise Resource Planning System',
      description: 'Comprehensive ERP solution with modules for HR, finance, inventory, and project management with advanced reporting and analytics.',
      imageUrl: 'https://images.pexels.com/photos/270409/pexels-photo-270409.jpeg?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'Kubernetes'],
      category: 'Web Development',
      projectUrl: '#',
      client: 'Enterprise Solutions Inc.',
      featured: true
    },
    {
      id: '13',
      title: 'Multi-Cloud Management Platform',
      description: 'Unified cloud management platform supporting AWS, Azure, and GCP with cost optimization, security monitoring, and automated scaling.',
      imageUrl: 'https://images.pexels.com/photos/6801651/pexels-photo-6801651.jpeg?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['AWS', 'Azure', 'GCP', 'Terraform', 'Kubernetes'],
      category: 'Cloud Solutions',
      projectUrl: '#',
      client: 'CloudMaster Corp',
      featured: false
    },
    {
      id: '14',
      title: 'AI Chatbot for Customer Service',
      description: 'Intelligent customer service chatbot with natural language processing, sentiment analysis, and seamless human handoff capabilities.',
      imageUrl: 'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['Python', 'TensorFlow', 'NLP', 'React', 'WebSocket'],
      category: 'AI/ML',
      projectUrl: '#',
      client: 'CustomerCare Plus',
      featured: true
    },
    {
      id: '15',
      title: 'NFT Marketplace Platform',
      description: 'Decentralized NFT marketplace with minting, trading, and auction features built on blockchain technology with secure wallet integration.',
      imageUrl: 'https://images.pexels.com/photos/6801652/pexels-photo-6801652.jpeg?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['Solidity', 'Web3.js', 'React', 'IPFS', 'Ethereum'],
      category: 'Blockchain',
      projectUrl: '#',
      client: 'ArtChain Marketplace',
      featured: false
    },
    {
      id: '16',
      title: 'Food Delivery Mobile App',
      description: 'Complete food delivery platform with restaurant management, real-time tracking, payment processing, and customer review system.',
      imageUrl: 'https://images.pexels.com/photos/4386434/pexels-photo-4386434.jpeg?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['React Native', 'Node.js', 'MongoDB', 'Stripe', 'Google Maps'],
      category: 'Mobile App',
      projectUrl: '#',
      client: 'FoodieExpress',
      featured: true
    },
    {
      id: '17',
      title: 'Social Media Analytics Platform',
      description: 'Advanced social media monitoring and analytics platform with sentiment analysis, influencer tracking, and campaign performance metrics.',
      imageUrl: 'https://images.pexels.com/photos/270410/pexels-photo-270410.jpeg?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['React', 'Node.js', 'Python', 'MongoDB', 'Redis'],
      category: 'Web Development',
      projectUrl: '#',
      client: 'SocialMetrics Pro',
      featured: false
    },
    {
      id: '18',
      title: 'Smart Home IoT System',
      description: 'Comprehensive smart home automation system with voice control, energy monitoring, and security features.',
      imageUrl: 'https://images.pexels.com/photos/3861970/pexels-photo-3861970.jpeg?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['IoT', 'React Native', 'Node.js', 'MQTT', 'AWS'],
      category: 'AI/ML',
      projectUrl: '#',
      client: 'SmartHome Solutions',
      featured: true
    },
    {
      id: '19',
      title: 'Supply Chain Management System',
      description: 'End-to-end supply chain visibility platform with real-time tracking, inventory optimization, and predictive analytics.',
      imageUrl: 'https://images.pexels.com/photos/6801653/pexels-photo-6801653.jpeg?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'Kubernetes'],
      category: 'Web Development',
      projectUrl: '#',
      client: 'SupplyChain Pro',
      featured: false
    },
    {
      id: '20',
      title: 'Virtual Reality Training Platform',
      description: 'Immersive VR training platform for corporate education with interactive simulations and progress tracking.',
      imageUrl: 'https://images.pexels.com/photos/1181674/pexels-photo-1181674.jpeg?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['Unity', 'C#', 'WebXR', 'React', 'Node.js'],
      category: 'AI/ML',
      projectUrl: '#',
      client: 'VR Training Solutions',
      featured: true
    },
    {
      id: '21',
      title: 'Real Estate Management Platform',
      description: 'Comprehensive real estate platform with property listings, virtual tours, and transaction management.',
      imageUrl: 'https://images.pexels.com/photos/270411/pexels-photo-270411.jpeg?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Stripe'],
      category: 'Web Development',
      projectUrl: '#',
      client: 'RealEstate Pro',
      featured: false
    },
    {
      id: '22',
      title: 'Gaming Mobile App',
      description: 'Multiplayer mobile gaming platform with real-time gameplay, social features, and tournament management.',
      imageUrl: 'https://images.pexels.com/photos/4386435/pexels-photo-4386435.jpeg?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['Unity', 'C#', 'Photon', 'React Native', 'Node.js'],
      category: 'Mobile App',
      projectUrl: '#',
      client: 'GameStudio Inc',
      featured: true
    },
    {
      id: '23',
      title: 'Edge Computing Platform',
      description: 'Distributed edge computing platform with real-time data processing and low-latency applications.',
      imageUrl: 'https://images.pexels.com/photos/6801654/pexels-photo-6801654.jpeg?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['Kubernetes', 'Docker', 'Go', 'React', 'AWS'],
      category: 'Cloud Solutions',
      projectUrl: '#',
      client: 'EdgeTech Solutions',
      featured: false
    },
    {
      id: '24',
      title: 'Computer Vision System',
      description: 'Advanced computer vision platform for object detection, facial recognition, and automated quality control.',
      imageUrl: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['Python', 'OpenCV', 'TensorFlow', 'React', 'Docker'],
      category: 'AI/ML',
      projectUrl: '#',
      client: 'VisionTech Corp',
      featured: true
    },
    {
      id: '25',
      title: 'Decentralized Identity Platform',
      description: 'Blockchain-based identity verification system with privacy protection and cross-platform compatibility.',
      imageUrl: 'https://images.pexels.com/photos/6801655/pexels-photo-6801655.jpeg?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['Solidity', 'Web3.js', 'React', 'IPFS', 'Ethereum'],
      category: 'Blockchain',
      projectUrl: '#',
      client: 'IdentityChain',
      featured: false
    },
    {
      id: '26',
      title: 'Learning Management System',
      description: 'Comprehensive LMS with course creation, student tracking, and interactive learning modules.',
      imageUrl: 'https://images.pexels.com/photos/270412/pexels-photo-270412.jpeg?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['React', 'Node.js', 'MongoDB', 'AWS', 'WebRTC'],
      category: 'Web Development',
      projectUrl: '#',
      client: 'EduTech Solutions',
      featured: true
    },
    {
      id: '27',
      title: 'Fitness Wearable App',
      description: 'Advanced fitness tracking app with wearable integration, health insights, and personalized coaching.',
      imageUrl: 'https://images.pexels.com/photos/4386436/pexels-photo-4386436.jpeg?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['React Native', 'Node.js', 'MongoDB', 'Bluetooth', 'AI'],
      category: 'Mobile App',
      projectUrl: '#',
      client: 'FitWear Technologies',
      featured: false
    },
    {
      id: '28',
      title: 'Microservices Architecture Platform',
      description: 'Scalable microservices platform with service discovery, load balancing, and monitoring.',
      imageUrl: 'https://images.pexels.com/photos/6801656/pexels-photo-6801656.jpeg?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['Docker', 'Kubernetes', 'Go', 'React', 'Prometheus'],
      category: 'Cloud Solutions',
      projectUrl: '#',
      client: 'MicroTech Corp',
      featured: true
    },
    {
      id: '29',
      title: 'Natural Language Processing API',
      description: 'Advanced NLP API with sentiment analysis, text classification, and language translation.',
      imageUrl: 'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['Python', 'TensorFlow', 'FastAPI', 'React', 'Docker'],
      category: 'AI/ML',
      projectUrl: '#',
      client: 'NLP Solutions',
      featured: false
    },
    {
      id: '30',
      title: 'Smart Contract Audit Platform',
      description: 'Automated smart contract security auditing platform with vulnerability detection and compliance checking.',
      imageUrl: 'https://images.pexels.com/photos/6801657/pexels-photo-6801657.jpeg?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['Solidity', 'Python', 'React', 'Web3.js', 'Ethereum'],
      category: 'Blockchain',
      projectUrl: '#',
      client: 'AuditChain',
      featured: true
    },
    {
      id: '31',
      title: 'Content Management System',
      description: 'Headless CMS with multi-channel publishing, content versioning, and workflow management.',
      imageUrl: 'https://images.pexels.com/photos/270413/pexels-photo-270413.jpeg?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'GraphQL', 'AWS'],
      category: 'Web Development',
      projectUrl: '#',
      client: 'ContentPro',
      featured: false
    },
    {
      id: '32',
      title: 'Augmented Reality Shopping App',
      description: 'AR-powered shopping app with virtual try-on, product visualization, and immersive shopping experience.',
      imageUrl: 'https://images.pexels.com/photos/4386437/pexels-photo-4386437.jpeg?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['Unity', 'ARCore', 'React Native', 'Node.js', 'AWS'],
      category: 'Mobile App',
      projectUrl: '#',
      client: 'AR Shopping Solutions',
      featured: true
    },
    {
      id: '33',
      title: 'Serverless Computing Platform',
      description: 'Event-driven serverless platform with auto-scaling, cost optimization, and performance monitoring.',
      imageUrl: 'https://images.pexels.com/photos/6801658/pexels-photo-6801658.jpeg?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['AWS Lambda', 'Azure Functions', 'React', 'Docker', 'Kubernetes'],
      category: 'Cloud Solutions',
      projectUrl: '#',
      client: 'ServerlessTech',
      featured: false
    },
    {
      id: '34',
      title: 'Recommendation Engine',
      description: 'AI-powered recommendation system with collaborative filtering and content-based algorithms.',
      imageUrl: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['Python', 'TensorFlow', 'React', 'Redis', 'Docker'],
      category: 'AI/ML',
      projectUrl: '#',
      client: 'RecommendAI',
      featured: true
    },
    {
      id: '35',
      title: 'Cross-Chain Bridge Protocol',
      description: 'Decentralized bridge protocol enabling seamless asset transfers between different blockchain networks.',
      imageUrl: 'https://images.pexels.com/photos/6801659/pexels-photo-6801659.jpeg?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['Solidity', 'Web3.js', 'React', 'Multi-chain', 'Ethereum'],
      category: 'Blockchain',
      projectUrl: '#',
      client: 'BridgeProtocol',
      featured: false
    },
    {
      id: '36',
      title: 'Event Management Platform',
      description: 'Comprehensive event management system with ticketing, registration, and live streaming capabilities.',
      imageUrl: 'https://images.pexels.com/photos/270414/pexels-photo-270414.jpeg?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'WebRTC'],
      category: 'Web Development',
      projectUrl: '#',
      client: 'EventPro Solutions',
      featured: true
    },
    {
      id: '37',
      title: 'Meditation & Wellness App',
      description: 'Comprehensive wellness app with guided meditation, sleep tracking, and mindfulness exercises.',
      imageUrl: 'https://images.pexels.com/photos/4386438/pexels-photo-4386438.jpeg?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['React Native', 'Node.js', 'MongoDB', 'Audio Processing', 'AI'],
      category: 'Mobile App',
      projectUrl: '#',
      client: 'WellnessTech',
      featured: false
    },
    {
      id: '38',
      title: 'Container Orchestration Platform',
      description: 'Advanced container orchestration with automated deployment, scaling, and service mesh integration.',
      imageUrl: 'https://images.pexels.com/photos/6801660/pexels-photo-6801660.jpeg?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['Kubernetes', 'Docker', 'Istio', 'React', 'Prometheus'],
      category: 'Cloud Solutions',
      projectUrl: '#',
      client: 'ContainerTech',
      featured: true
    },
    {
      id: '39',
      title: 'Predictive Analytics Platform',
      description: 'Advanced predictive analytics platform with time series forecasting and anomaly detection.',
      imageUrl: 'https://images.pexels.com/photos/1181678/pexels-photo-1181678.jpeg?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['Python', 'TensorFlow', 'React', 'PostgreSQL', 'Docker'],
      category: 'AI/ML',
      projectUrl: '#',
      client: 'PredictAI',
      featured: false
    },
    {
      id: '40',
      title: 'Decentralized Storage Network',
      description: 'Distributed storage network with encryption, redundancy, and peer-to-peer file sharing.',
      imageUrl: 'https://images.pexels.com/photos/6801661/pexels-photo-6801661.jpeg?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['IPFS', 'Web3.js', 'React', 'Node.js', 'Blockchain'],
      category: 'Blockchain',
      projectUrl: '#',
      client: 'StorageChain',
      featured: true
    },
    {
      id: '41',
      title: 'Customer Relationship Management',
      description: 'Comprehensive CRM platform with lead management, sales tracking, and customer analytics.',
      imageUrl: 'https://images.pexels.com/photos/270415/pexels-photo-270415.jpeg?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Stripe'],
      category: 'Web Development',
      projectUrl: '#',
      client: 'CRM Solutions',
      featured: false
    },
    {
      id: '42',
      title: 'Language Learning Mobile App',
      description: 'Interactive language learning app with speech recognition, gamification, and personalized lessons.',
      imageUrl: 'https://images.pexels.com/photos/4386439/pexels-photo-4386439.jpeg?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['React Native', 'Node.js', 'MongoDB', 'Speech API', 'AI'],
      category: 'Mobile App',
      projectUrl: '#',
      client: 'LinguaTech',
      featured: true
    },
    {
      id: '43',
      title: 'DevOps Automation Platform',
      description: 'Comprehensive DevOps platform with CI/CD pipelines, infrastructure as code, and monitoring.',
      imageUrl: 'https://images.pexels.com/photos/6801662/pexels-photo-6801662.jpeg?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['Jenkins', 'Terraform', 'Docker', 'Kubernetes', 'React'],
      category: 'Cloud Solutions',
      projectUrl: '#',
      client: 'DevOps Pro',
      featured: false
    },
    {
      id: '44',
      title: 'Fraud Detection System',
      description: 'AI-powered fraud detection system with real-time monitoring and risk assessment.',
      imageUrl: 'https://images.pexels.com/photos/1181679/pexels-photo-1181679.jpeg?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['Python', 'TensorFlow', 'React', 'Redis', 'Docker'],
      category: 'AI/ML',
      projectUrl: '#',
      client: 'FraudGuard',
      featured: true
    },
    {
      id: '45',
      title: 'Tokenization Platform',
      description: 'Asset tokenization platform enabling fractional ownership of real-world assets.',
      imageUrl: 'https://images.pexels.com/photos/6801663/pexels-photo-6801663.jpeg?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['Solidity', 'Web3.js', 'React', 'IPFS', 'Ethereum'],
      category: 'Blockchain',
      projectUrl: '#',
      client: 'TokenizePro',
      featured: false
    },
    {
      id: '46',
      title: 'Project Management Tool',
      description: 'Advanced project management platform with task tracking, team collaboration, and resource planning.',
      imageUrl: 'https://images.pexels.com/photos/270416/pexels-photo-270416.jpeg?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'WebSocket', 'AWS'],
      category: 'Web Development',
      projectUrl: '#',
      client: 'ProjectPro',
      featured: true
    },
    {
      id: '47',
      title: 'Music Streaming Mobile App',
      description: 'High-quality music streaming app with offline playback, social features, and AI recommendations.',
      imageUrl: 'https://images.pexels.com/photos/4386440/pexels-photo-4386440.jpeg?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['React Native', 'Node.js', 'MongoDB', 'Audio Streaming', 'AI'],
      category: 'Mobile App',
      projectUrl: '#',
      client: 'MusicStream Pro',
      featured: false
    },
    {
      id: '48',
      title: 'Hybrid Cloud Management',
      description: 'Unified hybrid cloud management platform with seamless workload migration and cost optimization.',
      imageUrl: 'https://images.pexels.com/photos/6801664/pexels-photo-6801664.jpeg?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['AWS', 'Azure', 'GCP', 'Terraform', 'Kubernetes'],
      category: 'Cloud Solutions',
      projectUrl: '#',
      client: 'HybridCloud Solutions',
      featured: true
    },
    {
      id: '49',
      title: 'Autonomous Vehicle System',
      description: 'AI-powered autonomous vehicle control system with computer vision and sensor fusion.',
      imageUrl: 'https://images.pexels.com/photos/1181680/pexels-photo-1181680.jpeg?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['Python', 'TensorFlow', 'OpenCV', 'ROS', 'Docker'],
      category: 'AI/ML',
      projectUrl: '#',
      client: 'AutoDrive Technologies',
      featured: false
    },
    {
      id: '50',
      title: 'Decentralized Exchange',
      description: 'Non-custodial DEX with automated market making and cross-chain trading capabilities.',
      imageUrl: 'https://images.pexels.com/photos/6801665/pexels-photo-6801665.jpeg?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['Solidity', 'Web3.js', 'React', 'Uniswap', 'Ethereum'],
      category: 'Blockchain',
      projectUrl: '#',
      client: 'DEX Protocol',
      featured: true
    },
    {
      id: '51',
      title: 'Video Conferencing Platform',
      description: 'Enterprise-grade video conferencing platform with screen sharing, recording, and collaboration tools.',
      imageUrl: 'https://images.pexels.com/photos/270417/pexels-photo-270417.jpeg?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['React', 'Node.js', 'WebRTC', 'PostgreSQL', 'AWS'],
      category: 'Web Development',
      projectUrl: '#',
      client: 'VideoMeet Pro',
      featured: false
    },
    {
      id: '52',
      title: 'Travel Planning Mobile App',
      description: 'Comprehensive travel planning app with itinerary management, booking integration, and local recommendations.',
      imageUrl: 'https://images.pexels.com/photos/4386441/pexels-photo-4386441.jpeg?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['React Native', 'Node.js', 'MongoDB', 'Maps API', 'AI'],
      category: 'Mobile App',
      projectUrl: '#',
      client: 'TravelTech Solutions',
      featured: true
    },
    {
      id: '53',
      title: 'Data Lake Management Platform',
      description: 'Comprehensive data lake platform with ETL pipelines, data governance, and analytics capabilities.',
      imageUrl: 'https://images.pexels.com/photos/6801666/pexels-photo-6801666.jpeg?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['Apache Spark', 'Hadoop', 'React', 'Docker', 'Kubernetes'],
      category: 'Cloud Solutions',
      projectUrl: '#',
      client: 'DataLake Pro',
      featured: false
    },
    {
      id: '54',
      title: 'Medical Diagnosis AI System',
      description: 'AI-powered medical diagnosis system with image analysis and symptom assessment capabilities.',
      imageUrl: 'https://images.pexels.com/photos/1181681/pexels-photo-1181681.jpeg?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['Python', 'TensorFlow', 'OpenCV', 'React', 'Docker'],
      category: 'AI/ML',
      projectUrl: '#',
      client: 'MedAI Solutions',
      featured: true
    },
    {
      id: '55',
      title: 'Governance Token Platform',
      description: 'Decentralized governance platform with voting mechanisms and proposal management.',
      imageUrl: 'https://images.pexels.com/photos/6801667/pexels-photo-6801667.jpeg?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['Solidity', 'Web3.js', 'React', 'IPFS', 'Ethereum'],
      category: 'Blockchain',
      projectUrl: '#',
      client: 'GovernanceDAO',
      featured: false
    },
    {
      id: '56',
      title: 'E-Learning Marketplace',
      description: 'Comprehensive e-learning marketplace with course creation, student management, and payment processing.',
      imageUrl: 'https://images.pexels.com/photos/270418/pexels-photo-270418.jpeg?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS'],
      category: 'Web Development',
      projectUrl: '#',
      client: 'EduMarket Pro',
      featured: true
    }
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        if (data.success && data.data && data.data.length > 0) {
          setProjects(data.data);
        } else {
          setProjects(sampleProjects);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjects(sampleProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []); // Removed sampleProjects from dependency array

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  // Apply limit if specified (for landing page)
  const displayProjects = limit ? filteredProjects.slice(0, limit) : filteredProjects;

  if (loading) {
    return (
      <section id="portfolio" className="section-padding bg-white">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Portfolio</h2>
            <p className="section-subtitle">Showcasing our successful projects and innovative solutions</p>
          </div>
          <div className="flex justify-center">
            <div className="loading-spinner"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="section-padding bg-white">
      <div className="container">
        <div className="section-header">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="section-title"
          >
            Our Portfolio
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="section-subtitle"
          >
            Showcasing our successful projects and innovative solutions
          </motion.p>
        </div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {displayProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="project-card group"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  width={400}
                  height={192}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 flex space-x-2">
                    {project.projectUrl && (
                      <a
                        href={project.projectUrl}
                        className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-gray-900 hover:bg-blue-600 hover:text-white transition-colors duration-300"
                        aria-label="View Project"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-gray-900 hover:bg-gray-800 hover:text-white transition-colors duration-300"
                        aria-label="View Code"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    <button className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-gray-900 hover:bg-green-600 hover:text-white transition-colors duration-300">
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                {project.featured && (
                  <div className="absolute top-4 left-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-600">{project.category}</span>
                  <span className="text-sm text-gray-500">{project.client}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
