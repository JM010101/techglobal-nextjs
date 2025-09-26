'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { 
  Code, 
  Smartphone, 
  Brain, 
  Cloud, 
  Shield, 
  BarChart3, 
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react';

const ServicesPage = () => {
  const services = [
    {
      id: 1,
      title: 'Web Development',
      description: 'Modern, responsive web applications built with cutting-edge technologies',
      icon: Code,
      features: ['React & Next.js', 'Node.js Backend', 'Database Design', 'API Development'],
      price: 'From $5,000',
      popular: true,
      color: 'blue'
    },
    {
      id: 2,
      title: 'Mobile Development',
      description: 'Native and cross-platform mobile apps for iOS and Android',
      icon: Smartphone,
      features: ['React Native', 'Flutter', 'Native Development', 'App Store Optimization'],
      price: 'From $8,000',
      popular: false,
      color: 'green'
    },
    {
      id: 3,
      title: 'AI & Machine Learning',
      description: 'Intelligent solutions powered by artificial intelligence',
      icon: Brain,
      features: ['Custom AI Models', 'Natural Language Processing', 'Computer Vision', 'Predictive Analytics'],
      price: 'From $12,000',
      popular: false,
      color: 'purple'
    },
    {
      id: 4,
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and migration services',
      icon: Cloud,
      features: ['AWS & Azure', 'Cloud Migration', 'DevOps', 'Containerization'],
      price: 'From $6,000',
      popular: false,
      color: 'indigo'
    },
    {
      id: 5,
      title: 'Cybersecurity',
      description: 'Comprehensive security solutions to protect your business',
      icon: Shield,
      features: ['Security Audits', 'Penetration Testing', 'Data Encryption', 'Compliance'],
      price: 'From $7,000',
      popular: false,
      color: 'red'
    },
    {
      id: 6,
      title: 'Data Analytics',
      description: 'Transform your data into actionable business insights',
      icon: BarChart3,
      features: ['Business Intelligence', 'Data Visualization', 'Predictive Analytics', 'Real-time Dashboards'],
      price: 'From $9,000',
      popular: false,
      color: 'orange'
    }
  ];

  const processSteps = [
    {
      number: '01',
      title: 'Discovery',
      description: 'We analyze your requirements and create a detailed project plan'
    },
    {
      number: '02',
      title: 'Design',
      description: 'Our team designs the solution architecture and user experience'
    },
    {
      number: '03',
      title: 'Development',
      description: 'We build your solution using the latest technologies and best practices'
    },
    {
      number: '04',
      title: 'Deployment',
      description: 'We deploy your solution and provide ongoing support and maintenance'
    }
  ];

  const stats = [
    { number: '50+', label: 'Projects Completed' },
    { number: '15+', label: 'Countries Served' },
    { number: '100%', label: 'Client Satisfaction' },
    { number: '24/7', label: 'Support Available' }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      purple: 'from-purple-500 to-purple-600',
      indigo: 'from-indigo-500 to-indigo-600',
      red: 'from-red-500 to-red-600',
      orange: 'from-orange-500 to-orange-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white max-w-4xl mx-auto"
          >
            <h1 className="text-5xl lg:text-7xl font-bold mb-6" style={{ fontFamily: "'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontWeight: 900, letterSpacing: '-0.02em' }}>
              Our <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Services</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
              Comprehensive technology solutions that drive innovation and transform your business
            </p>
            <motion.a
              href="#services"
              className="inline-flex items-center px-8 py-4 bg-white text-slate-900 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Explore Services
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontWeight: 800 }}>
              What We Offer
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cutting-edge technology solutions tailored to your business needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  {service.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                        <Star className="w-4 h-4 mr-1" />
                        Most Popular
                      </div>
                    </div>
                  )}
                  
                  <div className="text-center">
                    <div className={`w-16 h-16 bg-gradient-to-br ${getColorClasses(service.color)} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-gray-700">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-900 mb-4">{service.price}</div>
                      <button className="w-full bg-slate-900 text-white py-3 px-6 rounded-xl font-semibold hover:bg-slate-800 transition-colors duration-300">
                        Get Started
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontWeight: 800 }}>
              Our Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A proven methodology that ensures successful project delivery
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl font-bold text-white">{step.number}</span>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-blue-500 to-transparent transform translate-x-4"></div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
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

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 to-blue-900">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6" style={{ fontFamily: "'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontWeight: 800 }}>
              Why Choose Us
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Trusted by businesses worldwide for our expertise and commitment to excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontWeight: 900 }}>
                  {stat.number}
                </div>
                <div className="text-lg text-gray-300 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontWeight: 800 }}>
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Let&apos;s discuss your project and create something amazing together. Our team is ready to help you achieve your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-all duration-300 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Project
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.a>
              <motion.a
                href="/portfolio"
                className="inline-flex items-center px-8 py-4 border-2 border-slate-900 text-slate-900 rounded-xl font-semibold hover:bg-slate-900 hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Our Work
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ServicesPage;
