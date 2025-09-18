'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Portfolio from '@/components/sections/Portfolio';
import CTA from '@/components/sections/CTA';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';

const PortfolioPage = () => {
  const featuredProjects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with advanced features',
      image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      category: 'Web Development',
      link: '#'
    },
    {
      title: 'AI-Powered Chatbot',
      description: 'Intelligent customer service automation system',
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['Python', 'TensorFlow', 'OpenAI', 'FastAPI'],
      category: 'AI & ML',
      link: '#'
    },
    {
      title: 'Mobile Banking App',
      description: 'Secure and user-friendly mobile banking application',
      image: 'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['React Native', 'Node.js', 'PostgreSQL', 'AWS'],
      category: 'Mobile Development',
      link: '#'
    },
    {
      title: 'Blockchain Supply Chain',
      description: 'Transparent supply chain management system',
      image: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?w=800&h=600&fit=crop&auto=format&q=85',
      technologies: ['Ethereum', 'Solidity', 'Web3.js', 'React'],
      category: 'Blockchain',
      link: '#'
    }
  ];

  const categories = [
    { name: 'All Projects', count: 24, active: true },
    { name: 'Web Development', count: 8 },
    { name: 'Mobile Apps', count: 6 },
    { name: 'AI & ML', count: 4 },
    { name: 'Blockchain', count: 3 },
    { name: 'Cloud Solutions', count: 3 }
  ];

  return (
    <main className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="hero-gradient py-24 lg:py-32">
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
            <motion.a
              href="#portfolio"
              className="btn btn-primary bg-white text-blue-600 hover:bg-blue-50 inline-flex items-center justify-center group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              View Our Work
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Stats */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="text-4xl lg:text-5xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600 font-medium">Projects Completed</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-4xl lg:text-5xl font-bold text-blue-600 mb-2">15+</div>
              <div className="text-gray-600 font-medium">Countries Served</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl lg:text-5xl font-bold text-blue-600 mb-2">100%</div>
              <div className="text-gray-600 font-medium">Client Satisfaction</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-4xl lg:text-5xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600 font-medium">Support Available</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section-padding gradient-bg">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="section-header"
          >
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-subtitle">
              Some of our most successful and innovative projects
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="card overflow-hidden group hover-lift"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex space-x-2">
                        <a
                          href={project.link}
                          className="btn btn-primary bg-white text-blue-600 hover:bg-blue-50 text-sm px-4 py-2"
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          View Project
                        </a>
                        <button className="btn btn-outline border-white text-white hover:bg-white hover:text-blue-600 text-sm px-4 py-2">
                          <Github className="w-4 h-4 mr-1" />
                          Code
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Categories */}
      <section className="section-padding">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="section-header"
          >
            <h2 className="section-title">Browse by Category</h2>
            <p className="section-subtitle">
              Explore our projects organized by technology and industry
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category, index) => (
              <motion.button
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  category.active
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name} ({category.count})
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Full Portfolio */}
      <section id="portfolio" className="section-padding gradient-bg">
        <div className="container">
          <Portfolio />
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="section-padding">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="section-header"
          >
            <h2 className="section-title">What Our Clients Say</h2>
            <p className="section-subtitle">
              Testimonials from satisfied clients around the world
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                company: 'TechStart Inc.',
                content: 'TechGlobal Solutions delivered an exceptional e-commerce platform that exceeded our expectations. Their attention to detail and technical expertise is unmatched.',
                rating: 5
              },
              {
                name: 'Michael Chen',
                company: 'Global Finance',
                content: 'The AI chatbot they developed has revolutionized our customer service. Response times improved by 80% and customer satisfaction increased significantly.',
                rating: 5
              },
              {
                name: 'Emma Rodriguez',
                company: 'HealthTech Solutions',
                content: 'Working with TechGlobal was a game-changer for our mobile app. Their team understood our vision and brought it to life with cutting-edge technology.',
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="card p-6 text-center"
              >
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.company}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  );
};

export default PortfolioPage;
