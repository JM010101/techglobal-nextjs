'use client';

import { motion } from 'framer-motion';
import { Globe, Users, Award, Zap, Lightbulb, Shield, TrendingUp, Handshake } from 'lucide-react';
import Image from 'next/image';

const About = () => {
  const stats = [
    { icon: Users, value: '9', label: 'Global Experts', description: 'From 9 different countries' },
    { icon: Award, value: '50+', label: 'Projects Delivered', description: 'Across 15+ countries' },
    { icon: Globe, value: '15+', label: 'Countries Served', description: 'Worldwide presence' },
    { icon: Zap, value: '100%', label: 'Client Satisfaction', description: 'Proven track record' },
  ];

  const values = [
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We push boundaries with cutting-edge solutions and embrace new technologies to stay ahead of the curve.',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: Shield,
      title: 'Reliability',
      description: 'We deliver consistent, high-quality results that our clients can depend on, every single time.',
      color: 'from-green-400 to-blue-500'
    },
    {
      icon: Globe,
      title: 'Cross-Cultural Collaboration',
      description: 'We leverage diverse perspectives and cultural insights to create better solutions for global markets.',
      color: 'from-purple-400 to-pink-500'
    },
    {
      icon: TrendingUp,
      title: 'Scalability',
      description: 'We build solutions that grow with your business, ensuring long-term success and adaptability.',
      color: 'from-blue-400 to-indigo-500'
    }
  ];

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

  return (
    <section id="about" className="section-padding bg-white">
      <div className="container">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-6">
              Small Team,{' '}
              <span className="gradient-text">Global Impact</span>
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed">
              Founded on the principle that great technology knows no borders, TechGlobal Solutions brings together nine passionate experts from different corners of the world.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Each team member brings unique cultural perspectives and technical expertise, creating a powerhouse of innovation and reliability.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-semibold"
                  >
                    {i}
                  </div>
                ))}
              </div>
              <div>
                <div className="font-semibold text-gray-900">Global Team</div>
                <div className="text-sm text-gray-600">6 countries, 1 mission</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <Image
              src="https://media.gettyimages.com/id/1206800967/photo/diverse-group-of-professionals-working-together-in-modern-office.jpg"
              alt="Our Global Team"
              width={600}
              height={500}
              className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-2xl"
              suppressHydrationWarning
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent rounded-2xl"></div>
            
            {/* Floating Stats */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-xl"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">50+</div>
                <div className="text-sm text-gray-600">Projects Delivered</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="absolute -top-6 -right-6 bg-white rounded-xl p-6 shadow-xl"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">100%</div>
                <div className="text-sm text-gray-600">Client Satisfaction</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="text-center p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-gray-700 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.description}</div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Mission & Values */}
        <div className="text-center mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6"
          >
            Our Mission & Values
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
          >
            To deliver high-level web and software solutions worldwide, leveraging our global expertise and diverse perspectives to create innovative technology that transforms businesses and drives growth.
          </motion.p>
        </div>

        {/* Values Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                variants={itemVariants}
                className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                  <Icon className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h4>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 lg:p-12 text-white">
            <h3 className="text-2xl lg:text-3xl font-bold mb-6">
              Why Choose TechGlobal Solutions?
            </h3>
            <p className="text-lg lg:text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Unlike large agencies, you&apos;ll work directly with our experts. No middlemen, no communication gaps - just direct access to the talent.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Handshake className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Personal Touch</h4>
                <p className="text-blue-100 text-sm">Direct access to our experts</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold mb-2">24/7 Global Coverage</h4>
                <p className="text-blue-100 text-sm">Round-the-clock support</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Rapid Delivery</h4>
                <p className="text-blue-100 text-sm">Faster decision-making</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
