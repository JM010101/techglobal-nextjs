'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Services from '@/components/sections/Services';
import CTA from '@/components/sections/CTA';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';

const ServicesPage = () => {
  const serviceCategories = [
    {
      title: 'Development',
      description: 'Full-stack web and mobile application development',
      services: ['Web Development', 'Mobile Apps', 'API Development', 'Database Design']
    },
    {
      title: 'AI & Machine Learning',
      description: 'Intelligent solutions powered by artificial intelligence',
      services: ['AI Chatbots', 'Machine Learning', 'NLP', 'Computer Vision']
    },
    {
      title: 'Cloud & DevOps',
      description: 'Scalable cloud infrastructure and deployment solutions',
      services: ['Cloud Migration', 'DevOps', 'Containerization', 'CI/CD']
    },
    {
      title: 'Security',
      description: 'Comprehensive cybersecurity and data protection',
      services: ['Security Audits', 'Penetration Testing', 'Data Encryption', 'Compliance']
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Discovery & Planning',
      description: 'We understand your requirements and create a detailed project roadmap.'
    },
    {
      step: '02',
      title: 'Design & Development',
      description: 'Our team designs and develops your solution using cutting-edge technologies.'
    },
    {
      step: '03',
      title: 'Testing & Quality Assurance',
      description: 'Rigorous testing ensures your solution meets the highest quality standards.'
    },
    {
      step: '04',
      title: 'Deployment & Support',
      description: 'We deploy your solution and provide ongoing support and maintenance.'
    }
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
              Our <span className="text-yellow-400">Services</span>
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed mb-8">
              Comprehensive IT solutions tailored to your business needs. 
              From concept to deployment, we've got you covered.
            </p>
            <motion.a
              href="#services"
              className="btn btn-primary bg-white text-blue-600 hover:bg-blue-50 inline-flex items-center justify-center group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Explore Our Services
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="section-padding">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="section-header"
          >
            <h2 className="section-title">Service Categories</h2>
            <p className="section-subtitle">
              We offer a wide range of IT services to meet your business needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {serviceCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="card p-8 hover-lift"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {category.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {category.description}
                </p>
                <div className="space-y-3">
                  {category.services.map((service, serviceIndex) => (
                    <div key={serviceIndex} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{service}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Services */}
      <section id="services" className="section-padding gradient-bg">
        <div className="container">
          <Services />
        </div>
      </section>

      {/* Our Process */}
      <section className="section-padding">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="section-header"
          >
            <h2 className="section-title">Our Process</h2>
            <p className="section-subtitle">
              A proven methodology that ensures successful project delivery
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding hero-gradient">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white max-w-4xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Why Choose TechGlobal Solutions?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-2">6</div>
                <div className="text-blue-100">Global Experts</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-2">24/7</div>
                <div className="text-blue-100">Support Available</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-2">100%</div>
                <div className="text-blue-100">Client Satisfaction</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  );
};

export default ServicesPage;
