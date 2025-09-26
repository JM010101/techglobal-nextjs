'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Globe, Users, Award, Heart, Target, Lightbulb } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const About = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const values = [
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We constantly push the boundaries of technology to deliver cutting-edge solutions that drive business growth.'
    },
    {
      icon: Heart,
      title: 'Reliability',
      description: 'Our commitment to quality and timely delivery ensures your projects are completed to the highest standards.'
    },
    {
      icon: Globe,
      title: 'Global Collaboration',
      description: 'We bring together diverse perspectives from our international team to solve complex challenges.'
    },
    {
      icon: Target,
      title: 'Scalability',
      description: 'Our solutions are designed to grow with your business, ensuring long-term success and adaptability.'
    }
  ];

  const stats = [
    { number: '9', label: 'Global Experts', icon: Users },
    { number: '15+', label: 'Countries Served', icon: Globe },
    { number: '50+', label: 'Projects Delivered', icon: Award },
    { number: '100%', label: 'Client Satisfaction', icon: Heart }
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
            <h1 className="text-6xl lg:text-8xl xl:text-9xl font-bold mb-10" style={{ fontFamily: "'Space Grotesk', 'Orbitron', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontWeight: 900, letterSpacing: '-0.04em' }}>
              About <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">TechGlobal</span>
            </h1>
            <p className="text-3xl lg:text-4xl xl:text-5xl text-blue-100 leading-relaxed" style={{ fontFamily: "'Inter', 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontWeight: 600, letterSpacing: '-0.02em' }}>
              Led by Adam Wong from Hong Kong, we are a global team of passionate technologists 
              dedicated to delivering innovative solutions that transform businesses worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 mb-10 text-left" style={{ fontFamily: "'Space Grotesk', 'Orbitron', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontWeight: 900, letterSpacing: '-0.03em' }}>Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded by Adam Wong, a seasoned hiring manager, team leader, and full-stack developer 
                  from Hong Kong, TechGlobal Solutions emerged from a vision to bridge the gap between 
                  cutting-edge technology and global accessibility.
                </p>
                <p>
                  With extensive experience in tech architecture and team leadership, Adam assembled 
                  a group of passionate developers from different corners of the world with a shared 
                  mission: to deliver high-quality, scalable solutions that empower businesses to 
                  thrive in the digital age.
                </p>
                <p>
                  Today, under Adam&apos;s leadership, we continue to push the boundaries of what&apos;s possible, 
                  combining diverse perspectives and expertise to create solutions that not only 
                  meet today&apos;s needs but anticipate tomorrow&apos;s challenges.
                </p>
              </div>
            </motion.div>
            
            {isClient ? (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop&auto=format&q=85"
                  alt="Our Global Team"
                  width={1200}
                  height={800}
                  className="w-full h-96 object-cover rounded-3xl shadow-2xl border-4 border-white/20"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent rounded-2xl"></div>
              </motion.div>
            ) : (
              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop&auto=format&q=85"
                  alt="Our Global Team"
                  width={1200}
                  height={800}
                  className="w-full h-96 object-cover rounded-3xl shadow-2xl border-4 border-white/20"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent rounded-2xl"></div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-padding gradient-bg">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="section-header"
          >
            <h2 className="section-title">Our Values</h2>
            <p className="section-subtitle">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="card p-6 text-center hover-lift"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Members Introduction */}
      <section className="section-padding">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="section-header"
          >
            <h2 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 mb-8" style={{ fontFamily: "'Space Grotesk', 'Orbitron', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontWeight: 900, letterSpacing: '-0.03em' }}>Meet Our Global Team</h2>
            <p className="text-2xl lg:text-3xl xl:text-4xl text-slate-600 max-w-5xl mx-auto leading-relaxed" style={{ fontFamily: "'Inter', 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontWeight: 600, letterSpacing: '-0.02em' }}>
              Led by Adam Wong from Singapore, nine passionate experts from around the world, united by innovation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Adam Wong',
                role: 'Founder & Tech Architect',
                country: 'Hong Kong',
                flag: '🇭🇰',
                image: '/images/team/adam-wong.jpg',
                bio: 'Hiring manager, team leader, and full-stack developer with extensive experience in tech architecture. Leading global teams to deliver innovative solutions.',
                skills: ['Leadership', 'Full-Stack', 'Architecture', 'Team Building']
              },
              {
                name: 'Alex Chen',
                role: 'Backend Systems Architect',
                country: 'China',
                flag: '🇨🇳',
                image: '/images/team/backend-expert.png',
                bio: 'Senior backend engineer specializing in microservices architecture, database optimization, and scalable server infrastructure. Expert in building robust APIs and distributed systems.',
                skills: ['Node.js', 'Python', 'PostgreSQL', 'Docker']
              },
              {
                name: 'Dr. Sarah Chen',
                role: 'Chief AI Research Scientist',
                country: 'USA',
                flag: '🇺🇸',
                image: '/images/team/ai-expert.png',
                bio: 'Leading AI research scientist with 10+ years of experience in machine learning, deep learning, and artificial intelligence. Specializes in developing cutting-edge AI solutions for enterprise applications.',
                skills: ['Machine Learning', 'Deep Learning', 'Neural Networks', 'AI Research']
              },
              {
                name: 'Marco Rossi',
                role: 'Data Analytics Expert',
                country: 'Italy',
                flag: '🇮🇹',
                image: '/images/team/data-expert.png',
                bio: 'Data science specialist with expertise in big data analytics, business intelligence, and predictive modeling.',
                skills: ['Python', 'SQL', 'Tableau', 'Power BI']
              },
              {
                name: 'Priya Patel',
                role: 'Mobile App Expert',
                country: 'India',
                flag: '🇮🇳',
                image: '/images/team/mobile-app-expert.png',
                bio: 'Senior mobile app developer with 8+ years of experience in cross-platform and native mobile development. Specializes in creating high-performance mobile applications for iOS and Android platforms.',
                skills: ['React Native', 'Flutter', 'Swift', 'Kotlin']
              },
              {
                name: 'Yuki Tanaka',
                role: 'Game Designer & Developer',
                country: 'Japan',
                flag: '🇯🇵',
                image: '/images/team/game-designer.png',
                bio: 'Creative game designer and developer with expertise in Unity, Unreal Engine, and interactive storytelling. Specializes in creating immersive gaming experiences and game mechanics.',
                skills: ['Unity', 'Unreal Engine', 'C#', 'Game Design']
              }
            ].map((member, index) => (
              isClient ? (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="card p-8 text-center hover-lift group"
                >
                  <div className="relative mb-6">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={128}
                      height={128}
                      className="w-32 h-32 rounded-full mx-auto object-cover shadow-2xl group-hover:scale-110 transition-all duration-500 border-4 border-white/20"
                    />
                    <div className="absolute -bottom-2 -right-2 text-2xl">
                      {member.flag}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 mb-3" style={{ fontFamily: "'Orbitron', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontWeight: 700, letterSpacing: '0.02em' }}>
                    {member.name}
                  </h3>
                  
                  <div className="text-indigo-600 font-semibold mb-4 text-lg" style={{ fontFamily: "'Exo 2', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontWeight: 600 }}>
                    {member.role}
                  </div>
                  
                  <p className="text-slate-600 text-base leading-relaxed mb-6" style={{ fontFamily: "'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontWeight: 400, letterSpacing: '-0.01em' }}>
                    {member.bio}
                  </p>
                  
                  <div className="flex flex-wrap justify-center gap-3">
                    {member.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-sm font-semibold rounded-full border border-indigo-200/50"
                        style={{ fontFamily: "'Exo 2', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontWeight: 600 }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <div
                  key={member.name}
                  className="card p-8 text-center hover-lift group"
                >
                  <div className="relative mb-6">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={128}
                      height={128}
                      className="w-32 h-32 rounded-full mx-auto object-cover shadow-2xl group-hover:scale-110 transition-all duration-500 border-4 border-white/20"
                    />
                    <div className="absolute -bottom-2 -right-2 text-2xl">
                      {member.flag}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 mb-3" style={{ fontFamily: "'Orbitron', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontWeight: 700, letterSpacing: '0.02em' }}>
                    {member.name}
                  </h3>
                  
                  <div className="text-indigo-600 font-semibold mb-4 text-lg" style={{ fontFamily: "'Exo 2', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontWeight: 600 }}>
                    {member.role}
                  </div>
                  
                  <p className="text-slate-600 text-base leading-relaxed mb-6" style={{ fontFamily: "'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontWeight: 400, letterSpacing: '-0.01em' }}>
                    {member.bio}
                  </p>
                  
                  <div className="flex flex-wrap justify-center gap-3">
                    {member.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-sm font-semibold rounded-full border border-indigo-200/50"
                        style={{ fontFamily: "'Exo 2', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontWeight: 600 }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>

          {isClient ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center mt-12"
            >
              <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-3xl p-12 border border-white/50 shadow-2xl">
                <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Orbitron', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontWeight: 800, letterSpacing: '0.02em' }}>
                  Why Our Global Team Makes the Difference
                </h3>
                <p className="text-slate-600 leading-relaxed max-w-4xl mx-auto text-lg" style={{ fontFamily: "'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontWeight: 400, letterSpacing: '-0.01em' }}>
                  Our diverse team brings together unique perspectives, cultural insights, and specialized expertise from six different countries. 
                  This global collaboration enables us to create solutions that resonate with international audiences while maintaining the highest 
                  standards of quality and innovation. Each team member contributes their local market knowledge and technical expertise, 
                  resulting in truly world-class solutions.
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="text-center mt-12">
              <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-3xl p-12 border border-white/50 shadow-2xl">
                <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Orbitron', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontWeight: 800, letterSpacing: '0.02em' }}>
                  Why Our Global Team Makes the Difference
                </h3>
                <p className="text-slate-600 leading-relaxed max-w-4xl mx-auto text-lg" style={{ fontFamily: "'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontWeight: 400, letterSpacing: '-0.01em' }}>
                  Our diverse team brings together unique perspectives, cultural insights, and specialized expertise from six different countries. 
                  This global collaboration enables us to create solutions that resonate with international audiences while maintaining the highest 
                  standards of quality and innovation. Each team member contributes their local market knowledge and technical expertise, 
                  resulting in truly world-class solutions.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return isClient ? (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ) : (
                <div
                  key={stat.label}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="section-padding hero-gradient">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white max-w-4xl mx-auto"
          >
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-8" style={{ fontFamily: "'Orbitron', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontWeight: 800, letterSpacing: '0.02em' }}>
              Our Mission
            </h2>
            <p className="text-2xl lg:text-3xl text-blue-100 leading-relaxed" style={{ fontFamily: "'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontWeight: 400, letterSpacing: '-0.01em' }}>
              To deliver high-level web and software solutions worldwide, 
              empowering businesses to achieve their digital transformation 
              goals through innovation, reliability, and global collaboration.
            </p>
            <div className="mt-10">
              <span className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent" style={{ fontFamily: "'Orbitron', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontWeight: 800, letterSpacing: '0.02em' }}>
                &quot;Innovation Without Borders&quot;
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default About;
