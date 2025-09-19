'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Laptop, 
  Smartphone, 
  Brain, 
  Cloud, 
  Shield, 
  BarChart3, 
  Link as LinkIcon, 
  Cpu, 
  Users, 
  Headphones,
  ArrowRight,
  Star
} from 'lucide-react';

interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  features: string[];
  category: string;
  pricing: string;
  isPopular?: boolean;
  technologies: string[];
}

const Services = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'Development', label: 'Development' },
    { id: 'AI & Machine Learning', label: 'AI & ML' },
    { id: 'Cloud & DevOps', label: 'Cloud & DevOps' },
    { id: 'Security', label: 'Security' },
    { id: 'Data & Analytics', label: 'Data & Analytics' },
    { id: 'Blockchain', label: 'Blockchain' },
    { id: 'IoT & Hardware', label: 'IoT & Hardware' },
    { id: 'Consulting', label: 'Consulting' },
    { id: 'Support & Maintenance', label: 'Support' },
  ];

  const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
    'Laptop': Laptop,
    'Smartphone': Smartphone,
    'Brain': Brain,
    'Cloud': Cloud,
    'Shield': Shield,
    'BarChart3': BarChart3,
    'Link': LinkIcon,
    'Cpu': Cpu,
    'Users': Users,
    'Headphones': Headphones,
  };

  const sampleServices: Service[] = [
    {
      id: '1',
      name: 'Full-Stack Web Development',
      description: 'Complete web applications with modern frameworks and cutting-edge technologies. From concept to deployment, we handle every aspect.',
      icon: 'Laptop',
      features: ['React, Vue.js, Angular Frontend', 'Node.js, Python, PHP Backend', 'MongoDB, PostgreSQL Databases', 'Responsive Mobile-First Design'],
      category: 'Development',
      pricing: 'Starting from $5,000',
      isPopular: true,
      technologies: ['React', 'Node.js', 'MongoDB', 'AWS']
    },
    {
      id: '2',
      name: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications that deliver exceptional user experiences across iOS and Android platforms.',
      icon: 'Smartphone',
      features: ['React Native & Flutter', 'Native iOS & Android', 'App Store Optimization', 'Push Notifications & Analytics'],
      category: 'Development',
      pricing: 'Starting from $8,000',
      technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin']
    },
    {
      id: '3',
      name: 'AI & Machine Learning Solutions',
      description: 'Intelligent automation and machine learning systems that transform your business processes and decision-making capabilities.',
      icon: 'Brain',
      features: ['Custom AI Models', 'Natural Language Processing', 'Computer Vision', 'Predictive Analytics'],
      category: 'AI & Machine Learning',
      pricing: 'Starting from $12,000',
      technologies: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI']
    },
    {
      id: '4',
      name: 'Cloud Computing Solutions',
      description: 'Scalable cloud infrastructure and migration services to optimize your business operations and reduce costs.',
      icon: 'Cloud',
      features: ['AWS, Azure, GCP', 'Cloud Migration', 'Auto-scaling', 'Cost Optimization'],
      category: 'Cloud & DevOps',
      pricing: 'Starting from $3,000',
      technologies: ['AWS', 'Docker', 'Kubernetes', 'Terraform']
    },
    {
      id: '5',
      name: 'Cybersecurity Solutions',
      description: 'Comprehensive security measures to protect your digital assets and ensure compliance with industry standards.',
      icon: 'Shield',
      features: ['Security Audits', 'Penetration Testing', 'Compliance Management', 'Incident Response'],
      category: 'Security',
      pricing: 'Starting from $4,000',
      technologies: ['Security Tools', 'Compliance', 'Monitoring', 'Response']
    },
    {
      id: '6',
      name: 'Big Data & Analytics',
      description: 'Data-driven insights and analytics solutions to help you make informed business decisions and drive growth.',
      icon: 'BarChart3',
      features: ['Data Warehousing', 'Business Intelligence', 'Real-time Analytics', 'Data Visualization'],
      category: 'Data & Analytics',
      pricing: 'Starting from $6,000',
      technologies: ['Python', 'SQL', 'Tableau', 'Power BI']
    }
  ];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services');
        const data = await response.json();
        if (data.success) {
          setServices(data.data);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
        // Fallback to sample data
        setServices(sampleServices);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [sampleServices]);

  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(service => service.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  if (loading) {
    return (
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Comprehensive Services</h2>
            <p className="section-subtitle">Cutting-edge technology solutions that transform your business and drive innovation</p>
          </div>
          <div className="flex justify-center">
            <div className="loading-spinner"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="section-padding bg-gray-50">
      <div className="container">
        <div className="section-header">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="section-title"
          >
            Our Comprehensive Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="section-subtitle"
          >
            Cutting-edge technology solutions that transform your business and drive innovation
          </motion.p>
        </div>

        {/* Service Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12 lg:mb-16"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg transform -translate-y-1'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600'
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredServices.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Laptop;
            return (
        <motion.div
          key={service.id || `service-${index}`}
          variants={itemVariants}
          className="service-card group relative hover:scale-105 transition-all duration-300"
        >
                {service.isPopular && (
                  <div className="absolute -top-3 left-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                )}
                
                <div className="flex items-center justify-between mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-blue-600">{service.category}</div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {service.name}
                </h3>

                <p className="text-gray-600 mb-4 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between mb-4">
                  <div className="text-lg font-bold text-blue-600">{service.pricing}</div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {service.technologies.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                  {service.technologies.length > 3 && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                      +{service.technologies.length - 3} more
                    </span>
                  )}
                </div>

                <Link
                  href={`/services#${service.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="btn btn-primary w-full justify-center group inline-flex items-center"
                >
                  Explore Service
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16 lg:mt-20"
        >
          <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-xl border border-gray-100">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              We specialize in creating tailored technology solutions that perfectly fit your unique business requirements.
            </p>
            <Link
              href="/contact"
              className="btn btn-primary inline-flex items-center group"
            >
              Discuss Your Project
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
