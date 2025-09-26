'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, Globe, Users, Award, Zap, X } from 'lucide-react';
import Image from 'next/image';

const Hero = () => {
  const [currentText, setCurrentText] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  
  const rotatingTexts = [
    'Web Development',
    'AI Solutions',
    'Cloud Computing',
    'Blockchain',
    'Mobile Apps',
    'IoT Solutions'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % rotatingTexts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [rotatingTexts.length]);

  const stats = [
    { icon: Globe, value: '15+', label: 'Countries Served' },
    { icon: Users, value: '9', label: 'Global Experts' },
    { icon: Award, value: '50+', label: 'Projects Delivered' },
    { icon: Zap, value: '100%', label: 'Client Satisfaction' },
  ];

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden">
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
          <source src="https://cdn.coverr.co/videos/coverr-coding-on-laptop-4621/1080p.mp4" type="video/mp4" />
        </video>
        
        {/* Video Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-900/70 to-indigo-900/80"></div>
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Background Elements (keeping for additional effects) */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -100, rotateY: -90 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ 
              duration: 1.2, 
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
            className="text-white"
          >
            <motion.h1
              initial={{ opacity: 0, y: 50, scale: 0.8, rotateX: -45 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              transition={{ 
                duration: 1.0, 
                delay: 0.3,
                type: "spring",
                stiffness: 120,
                damping: 12
              }}
              whileHover={{ 
                scale: 1.05, 
                textShadow: "0px 0px 20px rgba(255,255,255,0.8)",
                transition: { duration: 0.3 }
              }}
        className="text-6xl lg:text-8xl xl:text-9xl font-bold leading-tight mb-8"
        style={{ fontFamily: "'Space Grotesk', 'Orbitron', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontWeight: 900, letterSpacing: '-0.04em' }}
            >
              Innovation
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">Without Borders</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30, x: -50 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ 
                duration: 0.9, 
                delay: 0.6,
                type: "spring",
                stiffness: 80
              }}
              whileHover={{
                scale: 1.02,
                color: "#fbbf24",
                transition: { duration: 0.2 }
              }}
        className="text-3xl lg:text-4xl xl:text-5xl text-blue-100 mb-12 leading-relaxed"
        style={{ fontFamily: "'Inter', 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontWeight: 600, letterSpacing: '-0.02em' }}
            >
              Led by Adam Wong from Hong Kong, delivering high-level web and software solutions worldwide with our global team of experts.
            </motion.p>

            {/* Rotating Text */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotateZ: -180 }}
              animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
              transition={{ 
                duration: 1.0, 
                delay: 0.8,
                type: "spring",
                stiffness: 150,
                damping: 10
              }}
              className="mb-8"
            >
              <p className="text-lg text-blue-200 mb-2">We specialize in:</p>
              <div className="h-8 flex items-center">
                <motion.span
                  key={currentText}
                  initial={{ opacity: 0, y: 30, scale: 0.7, rotateX: 90 }}
                  animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                  exit={{ opacity: 0, y: -30, scale: 0.7, rotateX: -90 }}
                  transition={{ 
                    duration: 0.6,
                    type: "spring",
                    stiffness: 200,
                    damping: 15
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotateZ: 2,
                    textShadow: "0px 0px 15px rgba(251, 191, 36, 0.8)"
                  }}
                  className="text-2xl font-semibold text-yellow-400"
                >
                  {rotatingTexts[currentText]}
                </motion.span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 1.0, 
                delay: 1.0,
                type: "spring",
                stiffness: 100,
                damping: 12
              }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  href="/contact"
                  className="btn btn-primary bg-white text-blue-600 hover:bg-blue-50 inline-flex items-center justify-center group"
                >
                  Start Your Project
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                  </motion.div>
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  rotateY: -5,
                  borderColor: "#fbbf24",
                  boxShadow: "0 0 30px rgba(251, 191, 36, 0.5)"
                }}
                whileTap={{ scale: 0.95, rotateZ: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <button 
                  onClick={() => setIsVideoModalOpen(true)}
                  className="btn btn-outline border-white text-white hover:bg-white hover:text-blue-600 inline-flex items-center justify-center group"
                >
                  <motion.div
                    animate={{ rotateZ: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Play className="w-5 h-5 mr-2 group-hover:scale-125 transition-transform duration-300" />
                  </motion.div>
                  Watch Our Story
                </button>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 1.0, 
                delay: 1.2,
                type: "spring",
                stiffness: 80
              }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.5, rotateY: 180 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: 1.4 + index * 0.15,
                      type: "spring",
                      stiffness: 150,
                      damping: 10
                    }}
                    whileHover={{
                      scale: 1.1,
                      rotateZ: 5,
                      y: -10,
                      boxShadow: "0 15px 30px rgba(255,255,255,0.2)"
                    }}
                    whileTap={{ scale: 0.95 }}
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
          </motion.div>

          {/* Right Content - Hero Video */}
          <motion.div
            initial={{ opacity: 0, x: 100, rotateY: 90, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
            transition={{ 
              duration: 1.3, 
              delay: 0.5,
              type: "spring",
              stiffness: 80,
              damping: 15
            }}
            whileHover={{
              scale: 1.02,
              rotateY: -2,
              transition: { duration: 0.3 }
            }}
            className="relative"
          >
            <div className="relative">
              {/* Main Hero Video */}
              <div className="relative z-10">
                <div className="relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
                  <video
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  >
                    <source src="https://assets.mixkit.co/videos/preview/mixkit-team-of-developers-working-together-4622-large.mp4" type="video/mp4" />
                    <source src="https://cdn.coverr.co/videos/coverr-modern-office-teamwork-2847/1080p.mp4" type="video/mp4" />
                    {/* Fallback image */}
                    <Image
                      src="https://media.gettyimages.com/id/1206800967/photo/diverse-group-of-professionals-working-together-in-modern-office.jpg"
                      alt="Professional Team Collaboration"
                      width={1200}
                      height={800}
                      className="w-full h-full object-cover"
                      suppressHydrationWarning
                    />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent"></div>
                  
                  {/* Video Overlay content */}
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <div className="glass-effect rounded-xl p-4">
                      <h3 className="text-lg font-semibold mb-2">Global IT Freelancing</h3>
                      <p className="text-sm opacity-90">Innovation without borders</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <motion.div
                initial={{ opacity: 0, y: -50, x: -50, scale: 0, rotateZ: -45 }}
                animate={{ 
                  opacity: 1, 
                  y: [0, -10, 0], 
                  x: 0, 
                  scale: 1, 
                  rotateZ: [0, 2, 0, -2, 0] 
                }}
                transition={{ 
                  opacity: { duration: 1.2, delay: 1.8 },
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  x: { duration: 1.2, delay: 1.8, type: "spring", stiffness: 120 },
                  scale: { duration: 1.2, delay: 1.8, type: "spring", stiffness: 120 },
                  rotateZ: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                whileHover={{
                  scale: 1.1,
                  rotateZ: 5,
                  y: -10,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                }}
                className="absolute -top-6 -left-6 glass-effect rounded-xl p-4 z-20"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                    <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Live Project</div>
                    <div className="text-xs text-white/80">E-commerce Platform</div>
                  </div>
                </div>
              </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 50, x: 50, scale: 0, rotateZ: 45 }}
                  animate={{ 
                    opacity: 1, 
                    y: [0, 10, 0], 
                    x: 0, 
                    scale: 1, 
                    rotateZ: [0, -3, 0, 3, 0] 
                  }}
                  transition={{ 
                    opacity: { duration: 1.2, delay: 2.2 },
                    y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                    x: { duration: 1.2, delay: 2.2, type: "spring", stiffness: 100 },
                    scale: { duration: 1.2, delay: 2.2, type: "spring", stiffness: 100 },
                    rotateZ: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                  }}
                  whileHover={{
                    scale: 1.15,
                    rotateZ: -8,
                    y: 15,
                    boxShadow: "0 25px 50px rgba(59, 130, 246, 0.4)"
                  }}
                  className="absolute -bottom-6 -right-6 glass-effect rounded-xl p-4 z-20"
                >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center">
                    <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Team Online</div>
                    <div className="text-xs text-white/80">9 experts available</div>
                  </div>
                </div>
              </motion.div>

              {/* Background Decoration */}
              <motion.div 
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -z-10 top-10 right-10 w-32 h-32 bg-yellow-400 rounded-full"
              />
              <motion.div 
                animate={{
                  scale: [1, 0.8, 1.1, 1],
                  rotate: [0, -90, -180, -360],
                  opacity: [0.2, 0.5, 0.3, 0.2],
                  x: [0, 10, -10, 0],
                  y: [0, -5, 5, 0]
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute -z-10 bottom-10 left-10 w-24 h-24 bg-pink-400 rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-white rounded-full mt-2"
          />
        </div>
      </motion.div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
            onClick={() => setIsVideoModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full flex items-center justify-center text-white transition-all duration-300"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Video Content - Alternative Sources */}
              <div className="relative w-full h-full">
                {/* Primary: Direct Video from Mixkit and Coverr */}
                <video
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src="https://assets.mixkit.co/videos/preview/mixkit-programmer-working-on-a-laptop-at-night-1280-large.mp4" type="video/mp4" />
                  <source src="https://cdn.coverr.co/videos/coverr-coding-on-laptop-4621/1080p.mp4" type="video/mp4" />
                  <source src="https://assets.mixkit.co/videos/preview/mixkit-team-of-developers-working-together-4622-large.mp4" type="video/mp4" />
                  
                  {/* Fallback to Wistia if direct video fails */}
                  <iframe
                    className="w-full h-full"
                    src="https://fast.wistia.net/embed/iframe/29b0fbf547?autoplay=1&muted=1"
                    title="Technology and Innovation - TechGlobal Solutions"
                    frameBorder="0"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                  />
                </video>
              </div>
              
              {/* Video Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
              
              {/* Video Info Overlay */}
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-bold mb-2">Global IT Freelancing Revolution</h3>
                <p className="text-sm opacity-90">Discover how we&apos;re transforming businesses worldwide</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;
