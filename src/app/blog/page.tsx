'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CTA from '@/components/sections/CTA';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Tag, Filter, Grid, List, Clock, Eye, Heart, Plus, X, Save, Image as ImageIcon, Type, Hash } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useMemo } from 'react';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  featuredImage: {
    url: string;
    alt: string;
  };
  author: {
    name: string;
    avatar: string;
    title: string;
  };
  publishedAt: string;
  readingTime: number;
  views: number;
  likes: number;
  isFeatured: boolean;
}

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [blogForm, setBlogForm] = useState({
    title: '',
    excerpt: '',
    category: '',
    content: '',
    tags: '',
    featuredImage: '',
    authorName: '',
    authorTitle: ''
  });
  const [userBlogs, setUserBlogs] = useState<BlogPost[]>([]);

  const allBlogPosts: BlogPost[] = useMemo(() => [
    {
      id: '1',
      title: 'Building Cross-Cultural Development Teams',
      slug: 'building-cross-cultural-development-teams',
      excerpt: 'How diverse, global teams create better software solutions and drive innovation in the tech industry.',
      category: 'Business',
      featuredImage: {
        url: 'https://img.freepik.com/free-photo/diverse-team-professionals-working-together-modern-office_23-2149211061.jpg',
        alt: 'Cross-Cultural Development Teams'
      },
      author: {
        name: 'Marco Rossi',
        avatar: 'https://img.freepik.com/free-photo/portrait-young-businessman_23-2149074779.jpg',
        title: 'Data Analytics Expert'
      },
      publishedAt: '2024-12-10',
      readingTime: 6,
      views: 1250,
      likes: 45,
      isFeatured: true
    },
    {
      id: '2',
      title: 'The Future of AI in Web Development',
      slug: 'future-ai-web-development',
      excerpt: 'Exploring how artificial intelligence is revolutionizing the way we build and maintain web applications.',
      category: 'AI & Machine Learning',
      featuredImage: {
        url: 'https://img.freepik.com/free-photo/ai-web-development-concept_23-2149074825.jpg',
        alt: 'AI in Web Development'
      },
      author: {
        name: 'Dr. Sarah Chen',
        avatar: 'https://img.freepik.com/free-photo/portrait-young-businesswoman_23-2149074778.jpg',
        title: 'AI Solutions Architect'
      },
      publishedAt: '2024-12-15',
      readingTime: 5,
      views: 2100,
      likes: 78,
      isFeatured: true
    },
    {
      id: '3',
      title: 'Building Scalable Cloud Infrastructure',
      slug: 'scalable-cloud-infrastructure',
      excerpt: 'Best practices for designing and implementing cloud solutions that can grow with your business.',
      category: 'Cloud & DevOps',
      featuredImage: {
        url: 'https://img.freepik.com/free-photo/cloud-solutions-concept_23-2149074826.jpg',
        alt: 'Cloud Infrastructure'
      },
      author: {
        name: 'Michael Rodriguez',
        avatar: 'https://img.freepik.com/free-photo/portrait-young-businessman_23-2149074780.jpg',
        title: 'Enterprise Systems Lead'
      },
      publishedAt: '2024-12-12',
      readingTime: 7,
      views: 1800,
      likes: 65,
      isFeatured: true
    },
    {
      id: '4',
      title: 'Mobile-First Design Principles',
      slug: 'mobile-first-design-principles',
      excerpt: 'Why mobile-first design is crucial for modern web applications and how to implement it effectively.',
      category: 'Web Development',
      featuredImage: {
        url: 'https://img.freepik.com/free-photo/mobile-first-design-concept_23-2149074827.jpg',
        alt: 'Mobile-First Design'
      },
      author: {
        name: 'Emma Johnson',
        avatar: 'https://img.freepik.com/free-photo/portrait-young-businesswoman_23-2149074781.jpg',
        title: 'UX/UI Designer'
      },
      publishedAt: '2024-12-10',
      readingTime: 4,
      views: 1500,
      likes: 52,
      isFeatured: false
    },
    {
      id: '5',
      title: 'Blockchain Technology in Enterprise',
      slug: 'blockchain-technology-enterprise',
      excerpt: 'How blockchain is transforming enterprise applications and creating new opportunities for businesses.',
      category: 'Blockchain',
      featuredImage: {
        url: 'https://img.freepik.com/free-photo/blockchain-technology-concept_23-2149074781.jpg',
        alt: 'Blockchain Technology'
      },
      author: {
        name: 'Alex Chen',
        avatar: 'https://img.freepik.com/free-photo/portrait-young-businessman_23-2149074782.jpg',
        title: 'Full-Stack Developer'
      },
      publishedAt: '2024-12-08',
      readingTime: 6,
      views: 1200,
      likes: 38,
      isFeatured: false
    },
    {
      id: '6',
      title: 'Cybersecurity Best Practices for Developers',
      slug: 'cybersecurity-best-practices-developers',
      excerpt: 'Essential security practices every developer should implement to protect applications and user data.',
      category: 'Cybersecurity',
      featuredImage: {
        url: 'https://img.freepik.com/free-photo/cybersecurity-concept-digital-security_23-2149074836.jpg',
        alt: 'Cybersecurity'
      },
      author: {
        name: 'Priya Patel',
        avatar: 'https://img.freepik.com/free-photo/portrait-young-businesswoman_23-2149074783.jpg',
        title: 'Security Specialist'
      },
      publishedAt: '2024-12-05',
      readingTime: 8,
      views: 1900,
      likes: 71,
      isFeatured: true
    },
    {
      id: '7',
      title: 'Big Data Strategies for Small Businesses',
      slug: 'big-data-strategies-small-businesses',
      excerpt: 'Practical approaches to leveraging data analytics for business growth, even with limited resources.',
      category: 'Data Analytics',
      featuredImage: {
        url: 'https://img.freepik.com/free-photo/big-data-analytics-concept_23-2149074778.jpg',
        alt: 'Big Data Strategies'
      },
      author: {
        name: 'Marco Rossi',
        avatar: 'https://img.freepik.com/free-photo/portrait-young-businessman_23-2149074784.jpg',
        title: 'Data Analytics Expert'
      },
      publishedAt: '2024-12-05',
      readingTime: 8,
      views: 980,
      likes: 32,
      isFeatured: false
    },
    {
      id: '8',
      title: 'The Rise of Edge Computing in IoT',
      slug: 'rise-edge-computing-iot',
      excerpt: 'Exploring how edge computing is revolutionizing IoT applications and enabling real-time processing at the source.',
      category: 'Technology Trends',
      featuredImage: {
        url: 'https://img.freepik.com/free-photo/edge-computing-iot-concept_23-2149074829.jpg',
        alt: 'Edge Computing in IoT'
      },
      author: {
        name: 'Hans Mueller',
        avatar: 'https://img.freepik.com/free-photo/portrait-young-businessman_23-2149074785.jpg',
        title: 'Enterprise Systems Lead'
      },
      publishedAt: '2024-12-01',
      readingTime: 7,
      views: 750,
      likes: 28,
      isFeatured: false
    },
    {
      id: '9',
      title: 'Progressive Web Apps: The Future of Mobile',
      slug: 'progressive-web-apps-future-mobile',
      excerpt: 'How PWAs are bridging the gap between web and native mobile applications with enhanced user experiences.',
      category: 'Mobile Development',
      featuredImage: {
        url: 'https://img.freepik.com/free-photo/progressive-web-apps-concept_23-2149074830.jpg',
        alt: 'Progressive Web Apps'
      },
      author: {
        name: 'Yuki Tanaka',
        avatar: 'https://img.freepik.com/free-photo/portrait-young-businesswoman_23-2149074781.jpg',
        title: 'Mobile App Specialist'
      },
      publishedAt: '2024-11-28',
      readingTime: 6,
      views: 1100,
      likes: 41,
      isFeatured: false
    },
    {
      id: '10',
      title: 'Microservices Architecture Patterns',
      slug: 'microservices-architecture-patterns',
      excerpt: 'Best practices for designing and implementing microservices that scale with your business needs.',
      category: 'Cloud & DevOps',
      featuredImage: {
        url: 'https://img.freepik.com/free-photo/microservices-platform-concept_23-2149074834.jpg',
        alt: 'Microservices Architecture'
      },
      author: {
        name: 'Michael Rodriguez',
        avatar: 'https://img.freepik.com/free-photo/portrait-young-businessman_23-2149074780.jpg',
        title: 'Enterprise Systems Lead'
      },
      publishedAt: '2024-11-25',
      readingTime: 9,
      views: 1350,
      likes: 56,
      isFeatured: true
    }
  ], []);

  const categories = useMemo(() => {
    const allPosts = [...allBlogPosts, ...userBlogs];
    const categoryCounts = allPosts.reduce((acc, post) => {
      acc[post.category] = (acc[post.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return [
      { id: 'all', label: 'All Posts', count: allPosts.length },
      { id: 'my-blogs', label: 'My Blogs', count: userBlogs.length },
      { id: 'Web Development', label: 'Web Development', count: categoryCounts['Web Development'] || 0 },
      { id: 'AI & Machine Learning', label: 'AI & Machine Learning', count: categoryCounts['AI & Machine Learning'] || 0 },
      { id: 'Cloud & DevOps', label: 'Cloud & DevOps', count: categoryCounts['Cloud & DevOps'] || 0 },
      { id: 'Mobile Development', label: 'Mobile Development', count: categoryCounts['Mobile Development'] || 0 },
      { id: 'Blockchain', label: 'Blockchain', count: categoryCounts['Blockchain'] || 0 },
      { id: 'Cybersecurity', label: 'Cybersecurity', count: categoryCounts['Cybersecurity'] || 0 },
      { id: 'Business', label: 'Business', count: categoryCounts['Business'] || 0 },
      { id: 'Data Analytics', label: 'Data Analytics', count: categoryCounts['Data Analytics'] || 0 },
      { id: 'Technology Trends', label: 'Technology Trends', count: categoryCounts['Technology Trends'] || 0 },
    ];
  }, [allBlogPosts, userBlogs]);

  const tags = [
    'React', 'Node.js', 'Python', 'AI', 'Machine Learning', 'Cloud', 'AWS', 
    'Docker', 'Kubernetes', 'Blockchain', 'Security', 'Mobile', 'Web Design'
  ];

  const filteredPosts = useMemo(() => {
    const allPosts = [...allBlogPosts, ...userBlogs];
    
    if (activeCategory === 'all') {
      return allPosts;
    } else if (activeCategory === 'my-blogs') {
      return userBlogs;
    } else {
      return allPosts.filter(post => post.category === activeCategory);
    }
  }, [activeCategory, allBlogPosts, userBlogs]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const isValidImageUrl = (url: string) => {
    if (!url) return false;
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const handleWriteBlog = () => {
    setIsWriteModalOpen(true);
  };

  const handleCloseWriteModal = () => {
    setIsWriteModalOpen(false);
    setIsSubmitted(false);
    setBlogForm({
      title: '',
      excerpt: '',
      category: '',
      content: '',
      tags: '',
      featuredImage: '',
      authorName: '',
      authorTitle: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setBlogForm({
      ...blogForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create new blog post
      const newBlog: BlogPost = {
        id: `user-${Date.now()}`,
        title: blogForm.title,
        slug: blogForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        excerpt: blogForm.excerpt,
        category: blogForm.category,
        featuredImage: {
          url: isValidImageUrl(blogForm.featuredImage) 
            ? blogForm.featuredImage 
            : 'https://img.freepik.com/free-photo/blog-writing-concept_23-2149074779.jpg',
          alt: blogForm.title
        },
        author: {
          name: blogForm.authorName,
          avatar: 'https://img.freepik.com/free-photo/portrait-young-businessman_23-2149074779.jpg',
          title: blogForm.authorTitle || 'Blog Author'
        },
        publishedAt: new Date().toISOString().split('T')[0],
        readingTime: Math.ceil(blogForm.content.split(' ').length / 200),
        views: 0,
        likes: 0,
        isFeatured: false
      };
      
      // Add to user blogs
      setUserBlogs(prev => [newBlog, ...prev]);
      
      // Switch to "My Blogs" category to show the new blog
      setActiveCategory('my-blogs');
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting blog:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="hero-gradient py-16 lg:py-24">
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
            <motion.button
              onClick={handleWriteBlog}
              className="inline-flex items-center px-8 py-4 bg-yellow-400 text-gray-900 rounded-xl font-semibold hover:bg-yellow-300 transition-all duration-300 group shadow-lg hover:shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
              Write New Blog Post
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Main Blog Section with Sidebar */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:w-80 flex-shrink-0"
            >
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                <div className="flex items-center gap-3 mb-6">
                  <Filter className="w-6 h-6 text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-900">Filter Articles</h2>
                </div>
                
                {/* Categories */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-between group ${
                          activeCategory === category.id
                            ? category.id === 'my-blogs' 
                              ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg'
                              : 'bg-blue-600 text-white shadow-lg'
                            : category.id === 'my-blogs'
                              ? 'bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 hover:from-purple-100 hover:to-purple-200 hover:text-purple-800'
                              : 'bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                        }`}
                      >
                        <span>{category.label}</span>
                        <span className={`text-sm px-2 py-1 rounded-full ${
                          activeCategory === category.id
                            ? category.id === 'my-blogs'
                              ? 'bg-purple-500 text-white'
                              : 'bg-blue-500 text-white'
                            : category.id === 'my-blogs'
                              ? 'bg-purple-200 text-purple-600 group-hover:bg-purple-300 group-hover:text-purple-700'
                              : 'bg-gray-200 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600'
                        }`}>
                          {category.count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Popular Tags */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Popular Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.slice(0, 8).map((tag, index) => (
                      <motion.button
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: index * 0.05 }}
                        className="flex items-center bg-gray-100 text-gray-700 hover:bg-blue-600 hover:text-white px-3 py-2 rounded-full text-sm font-medium transition-all duration-300"
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* View Mode */}
                <div className="pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <Grid className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-700">View Mode</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        viewMode === 'grid'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <Grid className="w-4 h-4 mx-auto" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        viewMode === 'list'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <List className="w-4 h-4 mx-auto" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {activeCategory === 'all' ? 'All Articles' : categories.find(c => c.id === activeCategory)?.label}
                  </h2>
                  <p className="text-gray-600">
                    {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
                  </p>
                </div>
              </div>

              {/* Articles Grid/List */}
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredPosts.map((post, index) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
                    >
                      <div className="relative overflow-hidden">
                        <Image
                          src={post.featuredImage.url}
                          alt={post.featuredImage.alt}
                          width={400}
                          height={240}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://img.freepik.com/free-photo/blog-writing-concept_23-2149074779.jpg';
                          }}
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                            {post.category}
                          </span>
                        </div>
                        {post.isFeatured && (
                          <div className="absolute top-4 right-4">
                            <span className="px-3 py-1 bg-yellow-400 text-yellow-900 text-sm font-medium rounded-full">
                              Featured
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>{formatDate(post.publishedAt)}</span>
                          <Clock className="w-4 h-4 ml-4 mr-2" />
                          <span>{post.readingTime} min read</span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                          {post.title}
                        </h3>
                        
                        <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <Image
                              src={post.author.avatar}
                              alt={post.author.name}
                              width={32}
                              height={32}
                              className="w-8 h-8 rounded-full mr-3"
                            />
                            <div>
                              <div className="text-sm font-medium text-gray-900">{post.author.name}</div>
                              <div className="text-xs text-gray-500">{post.author.title}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Eye className="w-4 h-4 mr-1" />
                              <span>{post.views.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center">
                              <Heart className="w-4 h-4 mr-1" />
                              <span>{post.likes}</span>
                            </div>
                          </div>
                        </div>
                        
                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors duration-300 group"
                        >
                          Read More
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                      </div>
                    </motion.article>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredPosts.map((post, index) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-80 flex-shrink-0 relative overflow-hidden">
                          <Image
                            src={post.featuredImage.url}
                            alt={post.featuredImage.alt}
                            width={320}
                            height={200}
                            className="w-full h-48 md:h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://img.freepik.com/free-photo/blog-writing-concept_23-2149074779.jpg';
                            }}
                          />
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                              {post.category}
                            </span>
                          </div>
                          {post.isFeatured && (
                            <div className="absolute top-4 right-4">
                              <span className="px-3 py-1 bg-yellow-400 text-yellow-900 text-sm font-medium rounded-full">
                                Featured
                              </span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1 p-6">
                          <div className="flex items-center text-sm text-gray-500 mb-3">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>{formatDate(post.publishedAt)}</span>
                            <Clock className="w-4 h-4 ml-4 mr-2" />
                            <span>{post.readingTime} min read</span>
                          </div>
                          
                          <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                            {post.title}
                          </h3>
                          
                          <p className="text-gray-600 mb-4 leading-relaxed">
                            {post.excerpt}
                          </p>
                          
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                              <Image
                                src={post.author.avatar}
                                alt={post.author.name}
                                width={40}
                                height={40}
                                className="w-10 h-10 rounded-full mr-3"
                              />
                              <div>
                                <div className="font-medium text-gray-900">{post.author.name}</div>
                                <div className="text-sm text-gray-500">{post.author.title}</div>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center">
                                <Eye className="w-4 h-4 mr-1" />
                                <span>{post.views.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center">
                                <Heart className="w-4 h-4 mr-1" />
                                <span>{post.likes}</span>
                              </div>
                            </div>
                          </div>
                          
                          <Link
                            href={`/blog/${post.slug}`}
                            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 group"
                          >
                            Read Article
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                          </Link>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              )}

              {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Filter className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No articles found</h3>
                  <p className="text-gray-500">Try selecting a different category to see more articles.</p>
                </div>
              )}
            </motion.div>
          </div>
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

      {/* Write Blog Modal */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 lg:p-8">
              {/* Modal Header */}
              <div className="flex items-start justify-between mb-8">
                <div className="flex-1 pr-4">
                  <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-3">
                    Write New Blog Post
                  </h3>
                  <p className="text-gray-600 text-base lg:text-lg leading-relaxed">
                    Share your insights and expertise with our community
                  </p>
                </div>
                <button
                  onClick={handleCloseWriteModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 flex-shrink-0"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleSubmitBlog} className="space-y-8">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-800">
                        Blog Title *
                      </label>
                      <div className="relative">
                        <Type className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="title"
                          value={blogForm.title}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
                          placeholder="Enter your blog title"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-800">
                        Category *
                      </label>
                      <select
                        name="category"
                        value={blogForm.category}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900"
                      >
                        <option value="">Select a category</option>
                        <option value="Web Development">Web Development</option>
                        <option value="AI & Machine Learning">AI & Machine Learning</option>
                        <option value="Cloud & DevOps">Cloud & DevOps</option>
                        <option value="Mobile Development">Mobile Development</option>
                        <option value="Blockchain">Blockchain</option>
                        <option value="Cybersecurity">Cybersecurity</option>
                        <option value="Business">Business</option>
                        <option value="Data Analytics">Data Analytics</option>
                        <option value="Technology Trends">Technology Trends</option>
                      </select>
                    </div>
                  </div>

                  {/* Author Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-800">
                        Author Name *
                      </label>
                      <input
                        type="text"
                        name="authorName"
                        value={blogForm.authorName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
                        placeholder="Enter your name"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-800">
                        Author Title
                      </label>
                      <input
                        type="text"
                        name="authorTitle"
                        value={blogForm.authorTitle}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
                        placeholder="e.g., Senior Developer, Tech Lead"
                      />
                    </div>
                  </div>

               {/* Featured Image */}
               <div className="space-y-2">
                 <label className="block text-sm font-semibold text-gray-800">
                   Featured Image URL
                 </label>
                 <div className="relative">
                   <ImageIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                   <input
                     type="url"
                     name="featuredImage"
                     value={blogForm.featuredImage}
                     onChange={handleInputChange}
                     className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
                     placeholder="https://example.com/image.jpg (optional)"
                   />
                 </div>
                 <p className="text-sm text-gray-500">
                   Leave empty to use a default blog image. Make sure the URL is valid and accessible.
                 </p>
               </div>

                  {/* Excerpt */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-800">
                      Blog Excerpt *
                    </label>
                    <textarea
                      name="excerpt"
                      value={blogForm.excerpt}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500 resize-none"
                      placeholder="Write a brief summary of your blog post..."
                    />
                  </div>

                  {/* Tags */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-800">
                      Tags
                    </label>
                    <div className="relative">
                      <Hash className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="tags"
                        value={blogForm.tags}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
                        placeholder="react, javascript, web-development (comma separated)"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-800">
                      Blog Content *
                    </label>
                    <textarea
                      name="content"
                      value={blogForm.content}
                      onChange={handleInputChange}
                      required
                      rows={12}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500 resize-none"
                      placeholder="Write your blog content here. You can use markdown formatting..."
                    />
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-8 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                          Publishing...
                        </>
                      ) : (
                        <>
                          <Save className="w-5 h-5 mr-3" />
                          Publish Blog Post
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleCloseWriteModal}
                      className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Save className="w-10 h-10 text-green-600" />
                  </div>
                  <h4 className="text-2xl font-semibold text-slate-900 mb-3">
                    Blog Post Published Successfully!
                  </h4>
                  <p className="text-gray-600 mb-8 text-lg">
                    Your blog post has been added to your personal blog collection. 
                    You can view it in the &ldquo;My Blogs&rdquo; section.
                  </p>
                  <button
                    onClick={handleCloseWriteModal}
                    className="bg-blue-600 text-white py-3 px-8 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-300"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
};

export default BlogPage;
