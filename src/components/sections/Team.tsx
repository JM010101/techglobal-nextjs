'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Github, Twitter, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface TeamMember {
  id?: string;
  _id?: string;
  name: string;
  role: string;
  country: string;
  flag: string;
  imageUrl: string;
  bio: string;
  skills: string[];
  experience: string;
  education: string;
  socialLinks: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    portfolio?: string;
  };
}

const Team = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  const sampleTeamMembers: TeamMember[] = useMemo(() => [
    {
      id: '1',
      name: 'Adam Wong',
      role: 'Full-Stack Developer',
      country: 'Hong Kong',
      flag: '🇭🇰',
      imageUrl: '/images/team/adam-wong.jpg',
      bio: 'Expert in React, Node.js, and cloud architecture with 8+ years of experience building scalable web applications.',
      skills: ['React', 'Node.js', 'AWS', 'MongoDB'],
      experience: '8+ years',
      education: 'Computer Science, University of Hong Kong',
      socialLinks: {
        linkedin: '#',
        github: '#',
        portfolio: '#'
      }
    },
    {
      id: '2',
      name: 'Chen Wei',
      role: 'Backend Development Lead',
      country: 'China',
      flag: '🇨🇳',
      imageUrl: '/images/team/backend-expert.png',
      bio: 'Backend architecture specialist with expertise in microservices, API development, and system optimization.',
      skills: ['Node.js', 'Python', 'Docker', 'Kubernetes'],
      experience: '9+ years',
      education: 'Computer Engineering, Tsinghua University',
      socialLinks: {
        linkedin: '#',
        github: '#'
      }
    },
    {
      id: '3',
      name: 'Sakura Nakamura',
      role: 'AI Research Scientist',
      country: 'Japan',
      flag: '🇯🇵',
      imageUrl: '/images/team/claude%20expert.png',
      bio: 'AI research scientist focused on advanced machine learning algorithms and natural language processing innovations.',
      skills: ['Deep Learning', 'NLP', 'Computer Vision', 'Research'],
      experience: '7+ years',
      education: 'AI Research, University of Tokyo',
      socialLinks: {
        linkedin: '#',
        github: '#',
        portfolio: '#'
      }
    },
    {
      id: '4',
      name: 'Yuki Tanaka',
      role: 'Data Analytics Expert',
      country: 'Japan',
      flag: '🇯🇵',
      imageUrl: '/images/team/data-expert.png',
      bio: 'Data science specialist with expertise in big data analytics, business intelligence, and predictive modeling.',
      skills: ['Python', 'SQL', 'Tableau', 'Power BI'],
      experience: '7+ years',
      education: 'Data Science, University of Tokyo',
      socialLinks: {
        linkedin: '#',
        github: '#'
      }
    },
    {
      id: '5',
      name: 'Priya Sharma',
      role: 'Database Manager',
      country: 'India',
      flag: '🇮🇳',
      imageUrl: '/images/team/database%20manager.png',
      bio: 'Database architecture expert specializing in data modeling, performance optimization, and data security.',
      skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Data Modeling'],
      experience: '8+ years',
      education: 'Computer Science, IIT Delhi',
      socialLinks: {
        linkedin: '#',
        github: '#'
      }
    },
    {
      id: '6',
      name: 'Marcus Tan',
      role: 'Mobile App Specialist',
      country: 'Singapore',
      flag: '🇸🇬',
      imageUrl: '/images/team/mobile-app-expert.png',
      bio: 'Mobile development expert with deep knowledge of React Native, Flutter, and native iOS/Android development.',
      skills: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
      experience: '6+ years',
      education: 'Computer Engineering, National University of Singapore',
      socialLinks: {
        linkedin: '#',
        github: '#',
        portfolio: '#'
      }
    },
    {
      id: '7',
      name: 'Li Mei',
      role: 'AI Solutions Architect',
      country: 'China',
      flag: '🇨🇳',
      imageUrl: '/images/team/ai-expert.png',
      bio: 'Leading AI expert specializing in machine learning, natural language processing, and intelligent automation systems.',
      skills: ['Python', 'TensorFlow', 'OpenAI', 'MLOps'],
      experience: '10+ years',
      education: 'AI/ML, Peking University',
      socialLinks: {
        linkedin: '#',
        github: '#',
        twitter: '#'
      }
    },
    {
      id: '8',
      name: 'Aria Lim',
      role: 'Game Designer',
      country: 'Singapore',
      flag: '🇸🇬',
      imageUrl: '/images/team/game-designer.png',
      bio: 'Creative game designer with expertise in game mechanics, user experience design, and interactive storytelling.',
      skills: ['Unity', 'Game Design', '3D Modeling', 'User Research'],
      experience: '6+ years',
      education: 'Game Design, Nanyang Technological University',
      socialLinks: {
        linkedin: '#',
        portfolio: '#',
        twitter: '#'
      }
    },
    {
      id: '9',
      name: 'Ahmed Al-Rashid',
      role: 'Web Designer',
      country: 'UAE',
      flag: '🇦🇪',
      imageUrl: '/images/team/Web%20designer.png',
      bio: 'Creative web designer with a focus on user experience, interface design, and creating beautiful, functional digital products.',
      skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping'],
      experience: '5+ years',
      education: 'Design, American University of Sharjah',
      socialLinks: {
        linkedin: '#',
        portfolio: '#',
        twitter: '#'
      }
    }
  ], []);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch('/api/team');
        if (!response.ok) {
          throw new Error('API response not ok');
        }
        const data = await response.json();
        if (data.success && data.data && data.data.length > 0) {
          setTeamMembers(data.data);
        } else {
          setTeamMembers(sampleTeamMembers);
        }
      } catch (error) {
        console.error('Error fetching team members:', error);
        // Fallback to sample data
        setTeamMembers(sampleTeamMembers);
      } finally {
        setLoading(false);
      }
    };

    // Use sample team members immediately
    setTeamMembers(sampleTeamMembers);
    setLoading(false);
    
    // Optionally try to fetch from API in background
    fetchTeamMembers();
  }, [sampleTeamMembers]);

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
      <section id="team" className="section-padding bg-gray-50">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Meet Our Global Team</h2>
            <p className="section-subtitle">Nine experts from different countries, united by passion for technology and innovation</p>
          </div>
          <div className="flex justify-center">
            <div className="loading-spinner"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="team" className="section-padding bg-gray-50">
      <div className="container">
        <div className="section-header">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 mb-6"
            style={{ fontFamily: "'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontWeight: 800, letterSpacing: '-0.03em' }}
          >
            Meet Our Global Team
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl lg:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed"
            style={{ fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontWeight: 400, letterSpacing: '-0.01em' }}
          >
            Nine experts from different countries, united by passion for technology and innovation
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id || member._id || `team-member-${index}`}
              variants={itemVariants}
              className="team-card group"
            >
              <div className="relative mb-6">
                <div className="w-48 h-96 mx-auto rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl group-hover:scale-110 transition-all duration-500">
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    width={192}
                    height={384}
                    className="w-full h-full object-contain object-center"
                    unoptimized
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg text-lg">
                  {member.flag}
                </div>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-3" style={{ fontFamily: "'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontWeight: 700, letterSpacing: '-0.02em' }}>{member.name}</h3>
              <p className="text-indigo-600 font-semibold mb-2 text-lg" style={{ fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontWeight: 600 }}>{member.role}</p>
              <p className="text-slate-600 text-base mb-4" style={{ fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontWeight: 400 }}>{member.country}</p>
              
              <p className="text-slate-600 text-base leading-relaxed mb-6" style={{ fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontWeight: 400, letterSpacing: '-0.01em' }}>
                {member.bio}
              </p>

              <div className="mb-4">
                <div className="flex flex-wrap gap-3 justify-center">
                  {member.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-sm font-semibold rounded-full border border-indigo-200/50"
                      style={{ fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontWeight: 600 }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-center text-sm text-gray-500 mb-4">
                <div className="mb-1">
                  <span className="font-medium">Experience:</span> {member.experience}
                </div>
                <div>
                  <span className="font-medium">Education:</span> {member.education}
                </div>
              </div>

              <div className="flex justify-center space-x-3">
                {member.socialLinks.linkedin && (
                  <a
                    href={member.socialLinks.linkedin}
                    className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white hover:bg-blue-700 transition-colors duration-300"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {member.socialLinks.github && (
                  <a
                    href={member.socialLinks.github}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-white hover:bg-gray-900 transition-colors duration-300"
                    aria-label="GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {member.socialLinks.twitter && (
                  <a
                    href={member.socialLinks.twitter}
                    className="w-10 h-10 bg-blue-400 rounded-lg flex items-center justify-center text-white hover:bg-blue-500 transition-colors duration-300"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
                {member.socialLinks.portfolio && (
                  <a
                    href={member.socialLinks.portfolio}
                    className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center text-white hover:bg-purple-700 transition-colors duration-300"
                    aria-label="Portfolio"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Team Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-xl">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8">
              Our Global Advantage
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">9</div>
                <div className="text-lg font-semibold text-gray-900 mb-1">Countries</div>
                <div className="text-gray-600">Diverse perspectives</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">24/7</div>
                <div className="text-lg font-semibold text-gray-900 mb-1">Coverage</div>
                <div className="text-gray-600">Round-the-clock support</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">50+</div>
                <div className="text-lg font-semibold text-gray-900 mb-1">Technologies</div>
                <div className="text-gray-600">Cutting-edge expertise</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Team;
