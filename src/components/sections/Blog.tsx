'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Clock, Eye, Heart, ArrowRight } from 'lucide-react';

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

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const sampleBlogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Building Cross-Cultural Development Teams',
      slug: 'building-cross-cultural-development-teams',
      excerpt: 'How diverse, global teams create better software solutions and drive innovation in the tech industry.',
      category: 'Business',
      featuredImage: {
        url: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&fit=crop&auto=format',
        alt: 'Cross-Cultural Development Teams'
      },
      author: {
        name: 'Marco Rossi',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face&auto=format',
        title: 'Data Analytics Expert'
      },
      publishedAt: '2024-12-10',
      readingTime: 6,
      views: 1250,
      likes: 45,
      isFeatured: true
    },
    {
      id: '7',
      title: 'The Future of AI in Web Development',
      slug: 'future-ai-web-development',
      excerpt: 'Exploring how artificial intelligence is revolutionizing the way we build and maintain web applications.',
      category: 'AI & Machine Learning',
      featuredImage: {
        url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop&auto=format',
        alt: 'AI in Web Development'
      },
      author: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=50&h=50&fit=crop&crop=face&auto=format',
        title: 'AI Solutions Architect'
      },
      publishedAt: '2024-12-15',
      readingTime: 5,
      views: 2100,
      likes: 78,
      isFeatured: true
    },
    {
      id: '8',
      title: 'Building Scalable Cloud Infrastructure',
      slug: 'scalable-cloud-infrastructure',
      excerpt: 'Best practices for designing and implementing cloud solutions that can grow with your business.',
      category: 'Cloud & DevOps',
      featuredImage: {
        url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop&auto=format',
        alt: 'Cloud Infrastructure'
      },
      author: {
        name: 'Hans Mueller',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face&auto=format',
        title: 'Enterprise Systems Lead'
      },
      publishedAt: '2024-12-12',
      readingTime: 7,
      views: 1800,
      likes: 65,
      isFeatured: true
    },
    {
      id: '9',
      title: 'Mobile-First Design Principles',
      slug: 'mobile-first-design-principles',
      excerpt: 'Why mobile-first design is crucial for modern web applications and how to implement it effectively.',
      category: 'Web Development',
      featuredImage: {
        url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop&auto=format',
        alt: 'Mobile-First Design'
      },
      author: {
        name: 'Yuki Tanaka',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face&auto=format',
        title: 'UX/UI Designer'
      },
      publishedAt: '2024-12-10',
      readingTime: 4,
      views: 1500,
      likes: 52,
      isFeatured: false
    },
    {
      id: '10',
      title: 'Blockchain Technology in Enterprise',
      slug: 'blockchain-technology-enterprise',
      excerpt: 'How blockchain is transforming enterprise applications and creating new opportunities for businesses.',
      category: 'Blockchain',
      featuredImage: {
        url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop&auto=format',
        alt: 'Blockchain Technology'
      },
      author: {
        name: 'Alex Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face&auto=format',
        title: 'Full-Stack Developer'
      },
      publishedAt: '2024-12-08',
      readingTime: 6,
      views: 1200,
      likes: 38,
      isFeatured: false
    },
    {
      id: '11',
      title: 'Cybersecurity Best Practices for Developers',
      slug: 'cybersecurity-best-practices-developers',
      excerpt: 'Essential security practices every developer should implement to protect applications and user data.',
      category: 'Security',
      featuredImage: {
        url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop&auto=format',
        alt: 'Cybersecurity'
      },
      author: {
        name: 'Priya Patel',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face&auto=format',
        title: 'Mobile App Specialist'
      },
      publishedAt: '2024-12-05',
      readingTime: 8,
      views: 1900,
      likes: 71,
      isFeatured: true
    },
    {
      id: '2',
      title: 'Big Data Strategies for Small Businesses',
      slug: 'big-data-strategies-small-businesses',
      excerpt: 'Practical approaches to leveraging data analytics for business growth, even with limited resources.',
      category: 'Data Analytics',
      featuredImage: {
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
        alt: 'Big Data Strategies'
      },
      author: {
        name: 'Marco Rossi',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
        title: 'Data Analytics Expert'
      },
      publishedAt: '2024-12-05',
      readingTime: 8,
      views: 980,
      likes: 32,
      isFeatured: false
    },
    {
      id: '3',
      title: 'The Rise of Edge Computing in IoT',
      slug: 'rise-edge-computing-iot',
      excerpt: 'Exploring how edge computing is revolutionizing IoT applications and enabling real-time processing at the source.',
      category: 'Technology Trends',
      featuredImage: {
        url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop',
        alt: 'Edge Computing in IoT'
      },
      author: {
        name: 'Hans Mueller',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face',
        title: 'Enterprise Systems Lead'
      },
      publishedAt: '2024-12-01',
      readingTime: 7,
      views: 750,
      likes: 28,
      isFeatured: false
    }
  ];

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('/api/blog?limit=6');
        const data = await response.json();
        if (data.success) {
          setBlogPosts(data.data);
        } else {
          setBlogPosts(sampleBlogPosts);
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        setBlogPosts(sampleBlogPosts);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []); // Removed sampleBlogPosts from dependency array

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <section id="blog" className="section-padding bg-white">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Latest Insights</h2>
            <p className="section-subtitle">Stay updated with the latest trends and insights in technology</p>
          </div>
          <div className="flex justify-center">
            <div className="loading-spinner"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="section-padding bg-white">
      <div className="container">
        <div className="section-header">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="section-title"
          >
            Latest Insights
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="section-subtitle"
          >
            Stay updated with the latest trends and insights in technology
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="blog-card group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.featuredImage.url}
                  alt={post.featuredImage.alt}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
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
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-8 h-8 rounded-full mr-3"
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{post.author.name}</div>
                      <div className="text-xs text-gray-500">{post.author.title}</div>
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
                  className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors duration-300 group"
                >
                  Read More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/blog"
            className="btn btn-primary inline-flex items-center group"
          >
            View All Articles
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
