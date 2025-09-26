'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Globe, Users, Award, Heart, Target, Lightbulb, Star, Trophy, Code, Database, Smartphone, Palette, Brain, Gamepad2 } from 'lucide-react';
import Image from 'next/image';

const About = () => {

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
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <Image
                src="https://media.gettyimages.com/id/1206800967/photo/diverse-group-of-professionals-working-together-in-modern-office.jpg"
                alt="Our Global Team"
                width={1200}
                height={800}
                className="w-full h-96 object-cover rounded-3xl shadow-2xl border-4 border-white/20"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent rounded-2xl"></div>
            </motion.div>
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

      {/* Leadership Spotlight */}
      <section className="section-padding bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 mb-8" style={{ fontFamily: "'Space Grotesk', 'Orbitron', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontWeight: 900, letterSpacing: '-0.03em' }}>
              Leadership Excellence
            </h2>
            <p className="text-2xl lg:text-3xl text-slate-600 max-w-4xl mx-auto leading-relaxed" style={{ fontFamily: "'Inter', 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontWeight: 600, letterSpacing: '-0.02em' }}>
              Meet our visionary leader who brings together the world's finest talent
            </p>
          </motion.div>

          {/* Adam Wong - Leadership Spotlight */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-6xl mx-auto"
          >
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative h-[700px] lg:h-full">
                  <Image
                    src="/images/team/adam-wong.jpg"
                    alt="Adam Wong - Founder & CEO"
                    width={600}
                    height={900}
                    className="w-full h-full object-contain object-center"
                    unoptimized
                  />
                  <div className="absolute bottom-6 left-6 text-white bg-black/50 rounded-lg px-4 py-3">
                    <div className="text-4xl mb-2">🇭🇰</div>
                    <div className="text-sm font-medium opacity-90">Hong Kong</div>
                  </div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="mb-6">
                    <h3 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Space Grotesk', 'Orbitron', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontWeight: 900 }}>
                      Adam Wong
                    </h3>
                    <p className="text-2xl text-blue-600 font-semibold mb-6">Founder & Chief Technology Officer</p>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Career Highlights</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>8+ years in full-stack development and team leadership</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>Former Senior Developer at leading Hong Kong tech companies</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>Expert in React, Node.js, AWS, and cloud architecture</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>Led development of 50+ successful projects across 15+ countries</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Core Expertise</h4>
                      <div className="flex flex-wrap gap-2">
                        {['React', 'Node.js', 'AWS', 'MongoDB', 'Team Leadership', 'Architecture Design'].map((skill, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm rounded-full font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Vision</h4>
                      <p className="text-gray-600 leading-relaxed">
                        "I believe technology should bridge cultures and connect people. Our global team represents 
                        the future of development - diverse, innovative, and united by a passion for excellence."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Expert Team Showcase */}
      <section className="section-padding">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 mb-8" style={{ fontFamily: "'Space Grotesk', 'Orbitron', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontWeight: 900, letterSpacing: '-0.03em' }}>
              Our Expert Team
            </h2>
            <p className="text-2xl lg:text-3xl text-slate-600 max-w-4xl mx-auto leading-relaxed" style={{ fontFamily: "'Inter', 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontWeight: 600, letterSpacing: '-0.02em' }}>
              World-class professionals from 9 countries, each bringing unique expertise and cultural perspectives
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {[
              {
                name: 'Chen Wei',
                role: 'Backend Development Lead',
                country: 'China',
                flag: '🇨🇳',
                image: '/images/team/backend-expert.png',
                experience: '6+ years',
                education: 'Computer Science, Tsinghua University',
                career: 'Specialized in microservices architecture and system optimization. Led backend development for major e-commerce platforms serving millions of users.',
                achievements: ['Scaled systems to handle 10M+ daily users', 'Reduced API response time by 60%', 'Mentored 15+ junior developers'],
                skills: ['Node.js', 'Python', 'Docker', 'Kubernetes', 'Microservices', 'System Design'],
                icon: Code
              },
              {
                name: 'Sakura Nakamura',
                role: 'AI Research Scientist',
                country: 'Japan',
                flag: '🇯🇵',
                image: '/images/team/claude%20expert.png',
                experience: '7+ years',
                education: 'PhD in Machine Learning, University of Tokyo',
                career: 'Leading AI researcher with focus on natural language processing and computer vision. Published 20+ papers in top-tier conferences.',
                achievements: ['Developed award-winning NLP algorithms', 'Led AI projects for Fortune 500 companies', 'Patent holder in machine learning'],
                skills: ['Deep Learning', 'NLP', 'Computer Vision', 'Research', 'TensorFlow', 'PyTorch'],
                icon: Brain
              },
              {
                name: 'Yuki Tanaka',
                role: 'Data Analytics Expert',
                country: 'Japan',
                flag: '🇯🇵',
                image: '/images/team/data-expert.png',
                experience: '5+ years',
                education: 'Statistics & Data Science, Waseda University',
                career: 'Data science specialist transforming raw data into actionable business insights. Expert in predictive modeling and business intelligence.',
                achievements: ['Increased client ROI by 40% through data insights', 'Built real-time analytics dashboards', 'Certified in advanced analytics'],
                skills: ['Python', 'SQL', 'Tableau', 'Power BI', 'Machine Learning', 'Statistics'],
                icon: Database
              },
              {
                name: 'Priya Sharma',
                role: 'Database Manager',
                country: 'India',
                flag: '🇮🇳',
                image: '/images/team/database%20manager.png',
                experience: '8+ years',
                education: 'Information Technology, IIT Delhi',
                career: 'Database architecture expert with deep knowledge of data modeling, performance optimization, and data security across multiple platforms.',
                achievements: ['Optimized database performance by 70%', 'Designed scalable data architectures', 'Led data migration for 50+ projects'],
                skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Data Modeling', 'Performance Tuning', 'Data Security'],
                icon: Database
              },
              {
                name: 'Marcus Tan',
                role: 'Mobile App Specialist',
                country: 'Singapore',
                flag: '🇸🇬',
                image: '/images/team/mobile-app-expert.png',
                experience: '6+ years',
                education: 'Computer Engineering, National University of Singapore',
                career: 'Mobile development expert with comprehensive knowledge of cross-platform and native development. Created apps with millions of downloads.',
                achievements: ['Developed apps with 5M+ downloads', 'Led mobile teams of 10+ developers', 'Expert in both iOS and Android'],
                skills: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Mobile UX', 'App Store Optimization'],
                icon: Smartphone
              },
              {
                name: 'Li Mei',
                role: 'AI Solutions Architect',
                country: 'China',
                flag: '🇨🇳',
                image: '/images/team/ai-expert.png',
                experience: '9+ years',
                education: 'Artificial Intelligence, Peking University',
                career: 'Leading AI expert specializing in machine learning solutions for enterprise clients. Expert in MLOps and AI system deployment.',
                achievements: ['Deployed AI solutions for 100+ enterprises', 'Reduced model training time by 50%', 'AI strategy consultant for major corporations'],
                skills: ['Python', 'TensorFlow', 'OpenAI', 'MLOps', 'AI Strategy', 'Enterprise AI'],
                icon: Brain
              },
              {
                name: 'Aria Lim',
                role: 'Game Designer',
                country: 'Singapore',
                flag: '🇸🇬',
                image: '/images/team/game-designer.png',
                experience: '5+ years',
                education: 'Game Design, Nanyang Technological University',
                career: 'Creative game designer with expertise in game mechanics, user experience design, and interactive storytelling. Passionate about creating engaging user experiences.',
                achievements: ['Designed award-winning mobile games', 'Led UX research for gaming platforms', 'Published game design methodologies'],
                skills: ['Unity', 'Game Design', '3D Modeling', 'User Research', 'Interactive Design', 'Game Analytics'],
                icon: Gamepad2
              },
              {
                name: 'Ahmed Al-Rashid',
                role: 'Web Designer',
                country: 'UAE',
                flag: '🇦🇪',
                image: '/images/team/Web%20designer.png',
                experience: '7+ years',
                education: 'Digital Design, American University of Dubai',
                career: 'Creative web designer with expertise in user experience design, responsive layouts, and modern web technologies. Focused on creating beautiful, functional interfaces.',
                achievements: ['Designed websites for 200+ clients', 'Improved user engagement by 45%', 'Led design teams for major brands'],
                skills: ['UI/UX Design', 'Figma', 'CSS', 'JavaScript', 'Responsive Design', 'Brand Identity'],
                icon: Palette
              }
            ].map((member, index) => {
              const IconComponent = member.icon;
              return (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="relative h-[600px]">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={400}
                      height={700}
                      className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-300"
                      unoptimized
                    />
                    <div className="absolute bottom-6 left-4 text-white bg-black/50 rounded-lg px-3 py-2">
                      <div className="text-3xl mb-1">{member.flag}</div>
                      <div className="text-sm font-medium opacity-90">{member.country}</div>
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-sm font-semibold text-gray-800">{member.experience}</span>
                    </div>
                    <div className="absolute top-4 left-4 bg-blue-600/90 backdrop-blur-sm rounded-full p-2">
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">{member.name}</h3>
                      <p className="text-lg text-blue-600 font-semibold mb-2">{member.role}</p>
                      <p className="text-sm text-gray-500 mb-3">{member.education}</p>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Career Focus</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{member.career}</p>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Achievements</h4>
                      <ul className="space-y-1">
                        {member.achievements.map((achievement, achievementIndex) => (
                          <li key={achievementIndex} className="flex items-start text-sm text-gray-600">
                            <Star className="w-3 h-3 text-yellow-500 mt-1 mr-2 flex-shrink-0" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Expertise</h4>
                      <div className="flex flex-wrap gap-1">
                        {member.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding gradient-bg">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">Our Impact</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Numbers that reflect our commitment to excellence and global reach
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-lg font-semibold text-blue-200">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">Why Choose Our Global Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our diverse team brings together unique perspectives, cultural insights, and specialized expertise from 9 different countries
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="card p-8 text-center hover-lift"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Global Perspective</h3>
              <p className="text-gray-600 leading-relaxed">
                Our team spans 9 countries, bringing diverse cultural insights and local market knowledge to every project.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="card p-8 text-center hover-lift"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Proven Excellence</h3>
              <p className="text-gray-600 leading-relaxed">
                With 50+ successful projects and 100% client satisfaction, we deliver results that exceed expectations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="card p-8 text-center hover-lift"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Innovation First</h3>
              <p className="text-gray-600 leading-relaxed">
                We stay ahead of technology trends, implementing cutting-edge solutions that give you a competitive advantage.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default About;