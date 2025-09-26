'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  Code, 
  Globe, 
  Heart, 
  Upload,
  Search,
  Filter,
  Star,
  CheckCircle,
  ArrowRight,
  X,
  Award,
  Laptop,
  Plane
} from 'lucide-react';
import Image from 'next/image';

interface JobPosition {
  id: string;
  title: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  experience: 'Entry' | 'Mid' | 'Senior';
  salary: string;
  skills: string[];
  description: string;
  requirements: string[];
  benefits: string[];
  posted: string;
}

const CareersPage = () => {
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null);
  const [filterLocation, setFilterLocation] = useState('all');
  const [filterExperience, setFilterExperience] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const jobPositions: JobPosition[] = [
    {
      id: '1',
      title: 'Senior Full-Stack Developer',
      location: 'Remote (Global)',
      type: 'Full-time',
      experience: 'Senior',
      salary: '$80,000 - $120,000',
      skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'MongoDB'],
      description: 'Join our team as a Senior Full-Stack Developer and help build cutting-edge web applications for clients worldwide.',
      requirements: [
        '5+ years of full-stack development experience',
        'Expert knowledge of React and Node.js',
        'Experience with cloud platforms (AWS, Azure, or GCP)',
        'Strong problem-solving and communication skills',
        'Experience working in remote teams'
      ],
      benefits: [
        'Competitive salary with performance bonuses',
        'Flexible working hours across time zones',
        'Health insurance coverage',
        '$2000 annual learning budget',
        'Top-tier equipment provided'
      ],
      posted: '2 days ago'
    },
    {
      id: '2',
      title: 'AI/ML Engineer',
      location: 'Remote (US/EU)',
      type: 'Full-time',
      experience: 'Mid',
      salary: '$70,000 - $100,000',
      skills: ['Python', 'TensorFlow', 'PyTorch', 'Docker', 'Kubernetes'],
      description: 'Work on exciting AI and machine learning projects, developing intelligent solutions for our global client base.',
      requirements: [
        '3+ years of ML/AI development experience',
        'Strong background in Python and ML frameworks',
        'Experience with MLOps and model deployment',
        'PhD or Masters in Computer Science/AI preferred',
        'Experience with cloud ML services'
      ],
      benefits: [
        'Work on cutting-edge AI projects',
        'Conference attendance budget',
        'Research time allocation',
        'Collaborative global team environment',
        'Stock options available'
      ],
      posted: '1 week ago'
    },
    {
      id: '3',
      title: 'Mobile App Developer (React Native)',
      location: 'Remote (Global)',
      type: 'Full-time',
      experience: 'Mid',
      salary: '$60,000 - $90,000',
      skills: ['React Native', 'JavaScript', 'iOS', 'Android', 'Firebase'],
      description: 'Create beautiful, performant mobile applications for iOS and Android using React Native.',
      requirements: [
        '3+ years of React Native development',
        'Published apps on App Store and Google Play',
        'Understanding of native iOS/Android development',
        'Experience with app store deployment processes',
        'Strong UI/UX implementation skills'
      ],
      benefits: [
        'Work on diverse mobile projects',
        'Latest mobile devices provided for testing',
        'Flexible schedule',
        'Professional development opportunities',
        'Team building retreats'
      ],
      posted: '3 days ago'
    },
    {
      id: '4',
      title: 'DevOps Engineer',
      location: 'Remote (Global)',
      type: 'Full-time',
      experience: 'Senior',
      salary: '$75,000 - $110,000',
      skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD'],
      description: 'Build and maintain scalable infrastructure and deployment pipelines for our global development team.',
      requirements: [
        '4+ years of DevOps/Infrastructure experience',
        'Expert knowledge of AWS or similar cloud platforms',
        'Experience with containerization and orchestration',
        'Infrastructure as Code (Terraform, CloudFormation)',
        'Strong automation and scripting skills'
      ],
      benefits: [
        'Work with latest cloud technologies',
        'High impact on team productivity',
        'Certification reimbursement',
        'Flexible working arrangements',
        'Competitive compensation package'
      ],
      posted: '5 days ago'
    },
    {
      id: '5',
      title: 'Frontend Developer (React)',
      location: 'Remote (Global)',
      type: 'Full-time',
      experience: 'Entry',
      salary: '$45,000 - $65,000',
      skills: ['React', 'JavaScript', 'CSS', 'HTML', 'Git'],
      description: 'Start your career with us as a Frontend Developer, creating stunning user interfaces for web applications.',
      requirements: [
        '1-2 years of React development experience',
        'Strong knowledge of HTML, CSS, and JavaScript',
        'Understanding of responsive design principles',
        'Experience with version control (Git)',
        'Passion for learning and growth'
      ],
      benefits: [
        'Mentorship from senior developers',
        'Career growth opportunities',
        'Learning and development budget',
        'Flexible schedule for work-life balance',
        'International team collaboration'
      ],
      posted: '1 day ago'
    },
    {
      id: '6',
      title: 'UI/UX Designer',
      location: 'Remote (Global)',
      type: 'Full-time',
      experience: 'Mid',
      salary: '$55,000 - $80,000',
      skills: ['Figma', 'Adobe Creative Suite', 'Prototyping', 'User Research', 'Design Systems'],
      description: 'Design beautiful and intuitive user experiences for web and mobile applications across various industries.',
      requirements: [
        '3+ years of UI/UX design experience',
        'Proficiency in Figma and design tools',
        'Strong portfolio showcasing design process',
        'Experience with user research and testing',
        'Understanding of design systems and accessibility'
      ],
      benefits: [
        'Creative freedom on diverse projects',
        'Latest design tools and software licenses',
        'Design conference attendance',
        'Collaborative design process',
        'Remote-first culture'
      ],
      posted: '4 days ago'
    }
  ];

  const benefits = [
    {
      icon: Globe,
      title: 'Remote-First Culture',
      description: 'Work from anywhere in the world with flexible hours that suit your lifestyle.'
    },
    {
      icon: DollarSign,
      title: 'Competitive Compensation',
      description: 'Market-leading salaries with performance bonuses and equity options.'
    },
    {
      icon: Laptop,
      title: 'Top-Tier Equipment',
      description: 'Latest MacBook Pro, monitors, and any tools you need to do your best work.'
    },
    {
      icon: Award,
      title: 'Learning Budget',
      description: '$2000 annual budget for courses, conferences, and professional development.'
    },
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Comprehensive health insurance and wellness stipend for gym memberships.'
    },
    {
      icon: Plane,
      title: 'Team Retreats',
      description: 'Annual company retreats and team building events in exciting locations.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Senior Full-Stack Developer',
      location: 'Singapore',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face&auto=format&q=85',
      quote: 'Working at TechGlobal has been incredible. The remote-first culture allows me to balance work and family while working on challenging projects with amazing people from around the world.'
    },
    {
      name: 'Marcus Johnson',
      role: 'AI/ML Engineer',
      location: 'London, UK',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      quote: 'The learning opportunities here are endless. I\'ve grown more in 2 years at TechGlobal than in my previous 5 years combined. The team truly invests in your professional development.'
    },
    {
      name: 'Elena Rodriguez',
      role: 'UI/UX Designer',
      location: 'Barcelona, Spain',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face&auto=format&q=85',
      quote: 'The creative freedom and collaborative environment at TechGlobal is unmatched. Every project is a new adventure, and the team always supports innovative design solutions.'
    }
  ];

  const filteredJobs = jobPositions.filter(job => {
    const matchesLocation = filterLocation === 'all' || job.location.toLowerCase().includes(filterLocation.toLowerCase());
    const matchesExperience = filterExperience === 'all' || job.experience.toLowerCase() === filterExperience.toLowerCase();
    const matchesSearch = searchTerm === '' || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesLocation && matchesExperience && matchesSearch;
  });

  return (
    <main className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full z-0">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-programmer-working-on-a-laptop-at-night-1280-large.mp4" type="video/mp4" />
            <source src="https://assets.mixkit.co/videos/preview/mixkit-young-woman-working-on-a-laptop-in-an-office-4623-large.mp4" type="video/mp4" />
            <source src="https://assets.mixkit.co/videos/preview/mixkit-team-of-developers-working-together-4622-large.mp4" type="video/mp4" />
          </video>
          
          {/* Video Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-purple-900/80 to-indigo-900/90"></div>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="container relative z-20 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.0, type: "spring", stiffness: 100 }}
            className="text-5xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-8"
            style={{ fontFamily: "'Orbitron', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
          >
            Join Our <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">Global Team</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="text-2xl lg:text-3xl text-blue-100 mb-12 leading-relaxed max-w-4xl mx-auto"
            style={{ fontFamily: "'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
          >
            Build the future of technology with talented developers from around the world. Remote-first, innovation-focused, globally connected.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.6 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {[
              { icon: Users, value: '50+', label: 'Team Members' },
              { icon: Globe, value: '15+', label: 'Countries' },
              { icon: Code, value: '200+', label: 'Projects Delivered' },
              { icon: Star, value: '4.9/5', label: 'Employee Rating' }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5, rotateY: 180 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.8 + index * 0.1,
                    type: "spring",
                    stiffness: 150
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotateZ: 5,
                    y: -10
                  }}
                  className="text-center cursor-pointer"
                >
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-blue-200">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 1.0 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotateY: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="#open-positions"
                className="btn btn-primary bg-white text-blue-600 hover:bg-blue-50 inline-flex items-center justify-center group"
              >
                View Open Positions
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05, rotateY: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="#apply-now"
                className="btn btn-outline border-white text-white hover:bg-white hover:text-blue-600 inline-flex items-center justify-center group"
              >
                Submit Your Resume
                <Upload className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform duration-300" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Work With Us Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2 className="section-title">Why Work With TechGlobal?</h2>
            <p className="section-subtitle">
              Join a company that values innovation, diversity, and work-life balance while building cutting-edge solutions for clients worldwide.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 5,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                  }}
                  className="card p-8 text-center hover-lift"
                >
                  <motion.div
                    whileHover={{ rotateZ: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6"
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">{benefit.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section id="open-positions" className="section-padding gradient-bg">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2 className="section-title text-white">Open Positions</h2>
            <p className="section-subtitle text-blue-100">
              Discover exciting opportunities to grow your career with our global team of innovators.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-12 glass-effect rounded-2xl p-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search positions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <select
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Locations</option>
                <option value="remote">Remote</option>
                <option value="us">US</option>
                <option value="eu">Europe</option>
                <option value="global">Global</option>
              </select>

              <select
                value={filterExperience}
                onChange={(e) => setFilterExperience(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Levels</option>
                <option value="entry">Entry Level</option>
                <option value="mid">Mid Level</option>
                <option value="senior">Senior Level</option>
              </select>

              <div className="text-white font-medium flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                {filteredJobs.length} positions found
              </div>
            </div>
          </motion.div>

          {/* Job Listings */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.02,
                  rotateY: 2,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.2)"
                }}
                className="card p-8 hover-lift cursor-pointer"
                onClick={() => setSelectedJob(job)}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{job.title}</h3>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                    {job.type}
                  </span>
                </div>

                <div className="flex items-center text-slate-600 mb-4 space-x-4">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{job.location}</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    <span className="text-sm">{job.salary}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span className="text-sm">{job.posted}</span>
                  </div>
                </div>

                <p className="text-slate-600 mb-4 line-clamp-2">{job.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {job.skills.slice(0, 4).map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                  {job.skills.length > 4 && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                      +{job.skills.length - 4} more
                    </span>
                  )}
                </div>

                <div className="flex space-x-3">
                  <button className="flex-1 btn btn-primary">
                    Quick Apply
                  </button>
                  <button className="btn btn-outline">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Details Modal */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
            onClick={() => setSelectedJob(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">{selectedJob.title}</h2>
                    <div className="flex items-center text-slate-600 space-x-4">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{selectedJob.location}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-1" />
                        <span>{selectedJob.salary}</span>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                        {selectedJob.type}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">Job Description</h3>
                    <p className="text-slate-600 leading-relaxed">{selectedJob.description}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">Requirements</h3>
                    <ul className="space-y-2">
                      {selectedJob.requirements.map((req, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-600">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">Skills Required</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">Benefits</h3>
                    <ul className="space-y-2">
                      {selectedJob.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <Star className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-600">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex space-x-4 pt-6 border-t">
                    <button className="flex-1 btn btn-primary">
                      Apply for This Position
                    </button>
                    <button 
                      onClick={() => setSelectedJob(null)}
                      className="btn btn-outline"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Employee Testimonials */}
      <section className="section-padding bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2 className="section-title">What Our Team Says</h2>
            <p className="section-subtitle">
              Hear from our global team members about their experience working at TechGlobal Solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
                className="testimonial-card"
              >
                <div className="flex items-center mb-6">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{testimonial.name}</h3>
                    <p className="text-slate-600 text-sm">{testimonial.role}</p>
                    <p className="text-slate-500 text-sm">{testimonial.location}</p>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed italic">&quot;{testimonial.quote}&quot;</p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="section-padding gradient-bg">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2 className="section-title text-white">Our Hiring Process</h2>
            <p className="section-subtitle text-blue-100">
              A transparent, efficient process designed to find the best fit for both you and our team.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Application',
                description: 'Submit your resume and portfolio through our online form.',
                icon: Upload
              },
              {
                step: '02',
                title: 'Initial Review',
                description: 'Our team reviews your application within 3-5 business days.',
                icon: Search
              },
              {
                step: '03',
                title: 'Technical Interview',
                description: 'Video call with our technical team to discuss your experience.',
                icon: Code
              },
              {
                step: '04',
                title: 'Final Decision',
                description: 'We make our decision and extend an offer within 1 week.',
                icon: CheckCircle
              }
            ].map((process, index) => {
              const Icon = process.icon;
              return (
                <motion.div
                  key={process.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="text-center"
                >
                  <motion.div
                    whileHover={{ rotateZ: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-20 h-20 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
                  >
                    <Icon className="w-10 h-10 text-white" />
                  </motion.div>
                  <div className="text-4xl font-bold text-yellow-400 mb-2">{process.step}</div>
                  <h3 className="text-xl font-semibold text-white mb-4">{process.title}</h3>
                  <p className="text-blue-100 leading-relaxed">{process.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply-now" className="section-padding bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2 className="section-title">Ready to Join Us?</h2>
            <p className="section-subtitle">
              Submit your application and take the first step towards an exciting career with TechGlobal Solutions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="card p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Position of Interest *
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a position</option>
                    {jobPositions.map((job) => (
                      <option key={job.id} value={job.title}>
                        {job.title}
                      </option>
                    ))}
                    <option value="other">Other / General Application</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Portfolio/LinkedIn URL
                  </label>
                  <input
                    type="url"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://your-portfolio.com or https://linkedin.com/in/yourname"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Resume *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">
                      <span className="text-blue-600 font-medium cursor-pointer hover:underline">
                        Click to upload
                      </span> or drag and drop
                    </p>
                    <p className="text-sm text-gray-500">PDF, DOC, or DOCX (max. 5MB)</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Cover Letter
                  </label>
                  <textarea
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us why you're excited to join TechGlobal Solutions and what makes you a great fit for this role..."
                  />
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="privacy-policy"
                    required
                    className="mt-1 mr-3"
                  />
                  <label htmlFor="privacy-policy" className="text-sm text-slate-600">
                    I agree to the processing of my personal data according to the{' '}
                    <a href="#" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </a>{' '}
                    and consent to being contacted regarding my application.
                  </label>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="text-center"
                >
                  <button
                    type="submit"
                    className="btn btn-primary px-12 py-4 text-lg"
                  >
                    Submit Application
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default CareersPage;
