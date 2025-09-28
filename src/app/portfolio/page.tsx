'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CTA from '@/components/sections/CTA';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Eye, Filter, Grid, List } from 'lucide-react';
import Image from 'next/image';
import { useState, useMemo } from 'react';

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

const PortfolioPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const allProjects: Project[] = useMemo(() => [
    {
      id: '1',
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with advanced features including AI-powered recommendations, real-time inventory, and multi-payment integration.',
      imageUrl: 'https://img.freepik.com/free-photo/online-shopping-concept_23-2149074776.jpg',
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
      imageUrl: 'https://img.freepik.com/free-photo/business-analytics-data-visualization-concept_23-2149074778.jpg',
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
      imageUrl: 'https://img.freepik.com/free-photo/mobile-banking-app-concept_23-2149074779.jpg',
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
      imageUrl: 'https://img.freepik.com/free-photo/cloud-computing-technology-concept_23-2149074780.jpg',
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
      imageUrl: 'https://img.freepik.com/free-photo/blockchain-technology-concept_23-2149074781.jpg',
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
      imageUrl: 'https://img.freepik.com/free-photo/iot-smart-manufacturing-concept_23-2149074782.jpg',
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
      imageUrl: 'https://img.freepik.com/free-photo/digital-marketing-analytics-concept_23-2149074783.jpg',
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
      imageUrl: 'https://img.freepik.com/free-photo/healthcare-medical-technology-concept_23-2149074786.jpg',
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
      imageUrl: 'https://img.freepik.com/free-photo/smart-city-technology-concept_23-2149074787.jpg',
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
      imageUrl: 'https://img.freepik.com/free-photo/cryptocurrency-trading-platform-concept_23-2149074788.jpg',
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
      imageUrl: 'https://img.freepik.com/free-photo/fitness-tracking-mobile-app-concept_23-2149074789.jpg',
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
      imageUrl: 'https://img.freepik.com/free-photo/enterprise-resource-planning-system-concept_23-2149074790.jpg',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'Kubernetes'],
      category: 'Web Development',
      projectUrl: '#',
      client: 'Enterprise Solutions Inc.',
      featured: true
    }
  ], []);

  const categories = useMemo(() => {
    const categoryCounts = allProjects.reduce((acc, project) => {
      acc[project.category] = (acc[project.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return [
      { id: 'all', label: 'All Projects', count: allProjects.length },
      { id: 'Web Development', label: 'Web Development', count: categoryCounts['Web Development'] || 0 },
      { id: 'Mobile App', label: 'Mobile Apps', count: categoryCounts['Mobile App'] || 0 },
      { id: 'AI/ML', label: 'AI/ML', count: categoryCounts['AI/ML'] || 0 },
      { id: 'Cloud Solutions', label: 'Cloud Solutions', count: categoryCounts['Cloud Solutions'] || 0 },
      { id: 'Blockchain', label: 'Blockchain', count: categoryCounts['Blockchain'] || 0 },
    ];
  }, [allProjects]);

  const filteredProjects = activeCategory === 'all' 
    ? allProjects 
    : allProjects.filter(project => project.category === activeCategory);

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
              Our <span className="text-yellow-400">Portfolio</span>
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed mb-8">
              Discover our successful projects and innovative solutions 
              that have transformed businesses worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Portfolio Section with Sidebar */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:w-80 flex-shrink-0"
            >
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                <div className="flex items-center gap-3 mb-6">
                  <Filter className="w-6 h-6 text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-900">Filter Projects</h2>
                </div>
                
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-between group ${
                        activeCategory === category.id
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                      }`}
                    >
                      <span>{category.label}</span>
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        activeCategory === category.id
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600'
                      }`}>
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <Grid className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-700">View Mode</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        viewMode === 'grid'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <Grid className="w-4 h-4 mx-auto" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        viewMode === 'list'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <List className="w-4 h-4 mx-auto" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {activeCategory === 'all' ? 'All Projects' : categories.find(c => c.id === activeCategory)?.label}
                  </h2>
                  <p className="text-gray-600">
                    {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
                  </p>
                </div>
              </div>

              {/* Projects Grid/List */}
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
                    >
                      <div className="relative overflow-hidden">
                        <Image
                          src={project.imageUrl}
                          alt={project.title}
                          width={400}
                          height={240}
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
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                            {project.category}
                          </span>
                          <span className="text-sm text-gray-500">{project.client}</span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                          {project.title}
                        </h3>
                        
                        <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                          {project.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 3).map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                              +{project.technologies.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-80 flex-shrink-0 relative overflow-hidden">
                          <Image
                            src={project.imageUrl}
                            alt={project.title}
                            width={320}
                            height={200}
                            className="w-full h-48 md:h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          {project.featured && (
                            <div className="absolute top-4 left-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
                              Featured
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1 p-6">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                              {project.category}
                            </span>
                            <span className="text-sm text-gray-500">{project.client}</span>
                          </div>
                          
                          <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                            {project.title}
                          </h3>
                          
                          <p className="text-gray-600 mb-4 leading-relaxed">
                            {project.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.technologies.map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex space-x-3">
                            {project.projectUrl && (
                              <a
                                href={project.projectUrl}
                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                              >
                                <ExternalLink className="w-4 h-4 mr-2" />
                                View Project
                              </a>
                            )}
                            {project.githubUrl && (
                              <a
                                href={project.githubUrl}
                                className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-300"
                              >
                                <Github className="w-4 h-4 mr-2" />
                                View Code
                              </a>
                            )}
                            <button className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300">
                              <Eye className="w-4 h-4 mr-2" />
                              Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {filteredProjects.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Filter className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No projects found</h3>
                  <p className="text-gray-500">Try selecting a different category to see more projects.</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  );
};

export default PortfolioPage;
