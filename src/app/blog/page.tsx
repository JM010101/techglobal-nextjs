'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Blog from '@/components/sections/Blog';
import CTA from '@/components/sections/CTA';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import Image from 'next/image';

const BlogPage = () => {
  const featuredPosts = [
    {
      title: 'The Future of AI in Web Development',
      excerpt: 'Exploring how artificial intelligence is revolutionizing the way we build and maintain web applications.',
      image: 'https://img.freepik.com/free-photo/ai-web-development-concept_23-2149074825.jpg',
      author: 'Dr. Sarah Chen',
      date: '2024-01-15',
      category: 'AI & Machine Learning',
      readTime: '5 min read',
      slug: 'future-ai-web-development'
    },
    {
      title: 'Building Scalable Cloud Infrastructure',
      excerpt: 'Best practices for designing and implementing cloud solutions that can grow with your business.',
      image: 'https://img.freepik.com/free-photo/cloud-solutions-concept_23-2149074826.jpg',
      author: 'Michael Rodriguez',
      date: '2024-01-12',
      category: 'Cloud & DevOps',
      readTime: '7 min read',
      slug: 'scalable-cloud-infrastructure'
    },
    {
      title: 'Mobile-First Design Principles',
      excerpt: 'Why mobile-first design is crucial for modern web applications and how to implement it effectively.',
      image: 'https://img.freepik.com/free-photo/mobile-first-design-concept_23-2149074827.jpg',
      author: 'Emma Johnson',
      date: '2024-01-10',
      category: 'Web Development',
      readTime: '4 min read',
      slug: 'mobile-first-design-principles'
    }
  ];

  const categories = [
    { name: 'All Posts', count: 24, active: true },
    { name: 'Web Development', count: 8 },
    { name: 'AI & Machine Learning', count: 6 },
    { name: 'Cloud & DevOps', count: 4 },
    { name: 'Mobile Development', count: 3 },
    { name: 'Blockchain', count: 2 },
    { name: 'Cybersecurity', count: 1 }
  ];

  const tags = [
    'React', 'Node.js', 'Python', 'AI', 'Machine Learning', 'Cloud', 'AWS', 
    'Docker', 'Kubernetes', 'Blockchain', 'Security', 'Mobile', 'Web Design'
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
              Blog & <span className="text-yellow-400">Insights</span>
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed mb-8">
              Stay updated with the latest technology trends, insights, 
              and best practices from our expert team.
            </p>
            <motion.a
              href="#blog"
              className="btn btn-primary bg-white text-blue-600 hover:bg-blue-50 inline-flex items-center justify-center group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Read Our Articles
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="section-padding">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="section-header"
          >
            <h2 className="section-title">Featured Articles</h2>
            <p className="section-subtitle">
              Our most popular and insightful articles
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="card overflow-hidden group hover-lift"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={400}
                    height={192}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                    <a
                      href={`/blog/${post.slug}`}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center group"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Categories & Tags */}
      <section className="section-padding gradient-bg">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Categories */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Categories</h3>
              <div className="space-y-3">
                {categories.map((category, index) => (
                  <motion.button
                    key={category.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className={`w-full flex items-center justify-between p-4 rounded-lg transition-all duration-300 ${
                      category.active
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
                    }`}
                  >
                    <span className="font-medium">{category.name}</span>
                    <span className="text-sm opacity-75">({category.count})</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <motion.button
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.05 }}
                    className="flex items-center bg-white text-gray-700 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* All Blog Posts */}
      <section id="blog" className="section-padding">
        <div className="container">
          <Blog />
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="section-padding hero-gradient">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white max-w-2xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Stay Updated
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Subscribe to our newsletter and never miss the latest insights, 
              tutorials, and industry updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button className="btn btn-primary bg-yellow-400 text-gray-900 hover:bg-yellow-300 px-8 py-3 font-semibold">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-blue-200 mt-4">
              No spam, unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  );
};

export default BlogPage;
