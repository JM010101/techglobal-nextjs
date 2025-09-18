'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Calendar, Clock, Eye, Heart, ArrowLeft, Share2, User } from 'lucide-react';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
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

const BlogPostPage = () => {
  const params = useParams();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        // For now, we'll use sample data since we don't have a backend API for individual posts
        const sampleBlogPosts: BlogPost[] = [
          {
            id: '1',
            title: 'Building Cross-Cultural Development Teams',
            slug: 'building-cross-cultural-development-teams',
            excerpt: 'How diverse, global teams create better software solutions and drive innovation in the tech industry.',
            content: `
              <p>In today's interconnected world, building cross-cultural development teams has become not just a trend, but a necessity for companies looking to create innovative software solutions. At TechGlobal Solutions, we've seen firsthand how diverse teams bring unique perspectives that lead to breakthrough innovations.</p>
              
              <h2>The Power of Diversity in Tech</h2>
              <p>Diverse teams bring together different cultural backgrounds, experiences, and problem-solving approaches. This diversity becomes a powerful asset when tackling complex technical challenges that require creative thinking and innovative solutions.</p>
              
              <h3>Key Benefits of Cross-Cultural Teams:</h3>
              <ul>
                <li><strong>Enhanced Creativity:</strong> Different cultural perspectives lead to more innovative solutions</li>
                <li><strong>Better Problem Solving:</strong> Varied approaches to challenges result in more robust solutions</li>
                <li><strong>Global Market Understanding:</strong> Teams with international experience better understand global user needs</li>
                <li><strong>Improved Communication:</strong> Working across cultures enhances communication skills</li>
              </ul>
              
              <h2>Best Practices for Managing Global Teams</h2>
              <p>Successfully managing cross-cultural development teams requires intentional strategies and cultural sensitivity. Here are some proven approaches:</p>
              
              <h3>1. Establish Clear Communication Protocols</h3>
              <p>Set up regular check-ins, use collaborative tools, and ensure everyone understands project goals and expectations. Consider time zone differences when scheduling meetings.</p>
              
              <h3>2. Foster Cultural Awareness</h3>
              <p>Encourage team members to share their cultural backgrounds and working styles. This understanding helps prevent misunderstandings and builds stronger relationships.</p>
              
              <h3>3. Leverage Technology for Collaboration</h3>
              <p>Use modern collaboration tools like Slack, Microsoft Teams, or Discord to maintain constant communication. Video calls help build personal connections despite physical distance.</p>
              
              <h2>Real-World Success Stories</h2>
              <p>Our global team at TechGlobal Solutions has successfully delivered projects for clients across six continents. By combining the technical expertise of our developers in China, the design sensibilities of our team in Italy, and the business acumen of our US-based members, we've created solutions that truly resonate with global audiences.</p>
              
              <h2>Conclusion</h2>
              <p>Building cross-cultural development teams is an investment in innovation and global competitiveness. While it requires effort and cultural sensitivity, the benefits far outweigh the challenges. Companies that embrace diversity in their development teams position themselves for success in the global marketplace.</p>
            `,
            category: 'Business',
            featuredImage: {
              url: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=400&fit=crop&auto=format',
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
            content: `
              <p>Artificial Intelligence is transforming every aspect of web development, from code generation to user experience optimization. As we look toward the future, AI promises to revolutionize how we build, deploy, and maintain web applications.</p>
              
              <h2>AI-Powered Development Tools</h2>
              <p>Modern development environments are increasingly incorporating AI to assist developers in writing better code faster. Tools like GitHub Copilot and ChatGPT are becoming essential parts of the developer toolkit.</p>
              
              <h3>Key AI Development Tools:</h3>
              <ul>
                <li><strong>Code Generation:</strong> AI can generate boilerplate code and suggest implementations</li>
                <li><strong>Bug Detection:</strong> Machine learning algorithms can identify potential issues before they become problems</li>
                <li><strong>Performance Optimization:</strong> AI can analyze code and suggest optimizations</li>
                <li><strong>Testing Automation:</strong> AI can generate comprehensive test cases</li>
              </ul>
              
              <h2>Personalized User Experiences</h2>
              <p>AI enables web applications to provide highly personalized experiences by analyzing user behavior and preferences. This leads to increased engagement and conversion rates.</p>
              
              <h2>The Future is Bright</h2>
              <p>As AI technology continues to evolve, we can expect even more innovative applications in web development. The key is to embrace these tools while maintaining the human creativity and problem-solving skills that make great developers.</p>
            `,
            category: 'AI & Machine Learning',
            featuredImage: {
              url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop&auto=format',
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
            id: '9',
            title: 'Mobile-First Design Principles',
            slug: 'mobile-first-design-principles',
            excerpt: 'Why mobile-first design is crucial for modern web applications and how to implement it effectively.',
            content: `
              <p>Mobile-first design is no longer just a best practice—it's a necessity. With over 60% of web traffic coming from mobile devices, designing for mobile first ensures your application works seamlessly across all devices.</p>
              
              <h2>Why Mobile-First Matters</h2>
              <p>Mobile-first design forces you to focus on the most important content and functionality, leading to cleaner, more efficient designs that work well on all devices.</p>
              
              <h3>Key Principles:</h3>
              <ul>
                <li><strong>Content Priority:</strong> Start with essential content and progressively enhance</li>
                <li><strong>Touch-Friendly Design:</strong> Ensure buttons and links are easily tappable</li>
                <li><strong>Performance First:</strong> Optimize for slower connections and limited processing power</li>
                <li><strong>Progressive Enhancement:</strong> Build up from a solid mobile foundation</li>
              </ul>
              
              <h2>Implementation Strategies</h2>
              <p>Start with a mobile wireframe and gradually add features for larger screens. Use responsive design techniques and test on real devices to ensure optimal performance.</p>
            `,
            category: 'Web Development',
            featuredImage: {
              url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop&auto=format',
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
            id: '8',
            title: 'Building Scalable Cloud Infrastructure',
            slug: 'scalable-cloud-infrastructure',
            excerpt: 'Best practices for designing and implementing cloud solutions that can grow with your business.',
            content: `
              <p>Cloud infrastructure has become the backbone of modern businesses, enabling scalability, flexibility, and cost-effectiveness. Building a scalable cloud infrastructure requires careful planning and implementation of best practices.</p>
              
              <h2>Key Components of Scalable Cloud Infrastructure</h2>
              <p>A well-designed cloud infrastructure includes multiple layers of services that work together to provide reliability, security, and performance.</p>
              
              <h3>Essential Components:</h3>
              <ul>
                <li><strong>Load Balancers:</strong> Distribute traffic across multiple servers</li>
                <li><strong>Auto Scaling Groups:</strong> Automatically adjust resources based on demand</li>
                <li><strong>Content Delivery Networks:</strong> Cache content closer to users</li>
                <li><strong>Database Clustering:</strong> Ensure data availability and performance</li>
              </ul>
              
              <h2>Best Practices for Cloud Scalability</h2>
              <p>Implementing these practices will help you build a robust, scalable cloud infrastructure that can handle growth and traffic spikes.</p>
              
              <h3>1. Design for Failure</h3>
              <p>Assume that components will fail and design your system to handle these failures gracefully. Use redundancy and failover mechanisms.</p>
              
              <h3>2. Implement Monitoring and Alerting</h3>
              <p>Set up comprehensive monitoring to track performance metrics and receive alerts when issues occur.</p>
              
              <h3>3. Use Infrastructure as Code</h3>
              <p>Define your infrastructure using code to ensure consistency and enable version control.</p>
            `,
            category: 'Cloud & DevOps',
            featuredImage: {
              url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop&auto=format',
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
            id: '10',
            title: 'Blockchain Technology in Enterprise',
            slug: 'blockchain-technology-enterprise',
            excerpt: 'How blockchain is transforming enterprise applications and creating new opportunities for businesses.',
            content: `
              <p>Blockchain technology is revolutionizing enterprise applications by providing transparency, security, and decentralization. Businesses are discovering new ways to leverage blockchain for improved efficiency and trust.</p>
              
              <h2>Enterprise Blockchain Applications</h2>
              <p>From supply chain management to financial services, blockchain is finding applications across various industries.</p>
              
              <h3>Key Use Cases:</h3>
              <ul>
                <li><strong>Supply Chain Transparency:</strong> Track products from origin to consumer</li>
                <li><strong>Smart Contracts:</strong> Automate business processes and agreements</li>
                <li><strong>Digital Identity:</strong> Secure and verifiable identity management</li>
                <li><strong>Cross-Border Payments:</strong> Faster and cheaper international transactions</li>
              </ul>
              
              <h2>Benefits for Enterprises</h2>
              <p>Blockchain technology offers several advantages for enterprise applications, including increased security, reduced costs, and improved efficiency.</p>
              
              <h3>1. Enhanced Security</h3>
              <p>Blockchain's cryptographic security and decentralized nature make it extremely difficult to tamper with data.</p>
              
              <h3>2. Cost Reduction</h3>
              <p>By eliminating intermediaries and automating processes, blockchain can significantly reduce operational costs.</p>
              
              <h3>3. Improved Transparency</h3>
              <p>All transactions are recorded on a public ledger, providing complete transparency and auditability.</p>
            `,
            category: 'Blockchain',
            featuredImage: {
              url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop&auto=format',
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
            content: `
              <p>Cybersecurity is a critical concern for developers in today's digital landscape. Implementing proper security practices from the beginning of development is essential to protect applications and user data.</p>
              
              <h2>Fundamental Security Principles</h2>
              <p>Understanding and implementing these core security principles will help you build more secure applications.</p>
              
              <h3>Key Security Practices:</h3>
              <ul>
                <li><strong>Input Validation:</strong> Always validate and sanitize user input</li>
                <li><strong>Authentication & Authorization:</strong> Implement strong user authentication</li>
                <li><strong>Data Encryption:</strong> Encrypt sensitive data in transit and at rest</li>
                <li><strong>Regular Updates:</strong> Keep dependencies and frameworks updated</li>
              </ul>
              
              <h2>Common Security Vulnerabilities</h2>
              <p>Being aware of common vulnerabilities helps developers avoid security pitfalls in their applications.</p>
              
              <h3>1. SQL Injection</h3>
              <p>Use parameterized queries and prepared statements to prevent SQL injection attacks.</p>
              
              <h3>2. Cross-Site Scripting (XSS)</h3>
              <p>Sanitize user input and use Content Security Policy headers to prevent XSS attacks.</p>
              
              <h3>3. Cross-Site Request Forgery (CSRF)</h3>
              <p>Implement CSRF tokens to protect against unauthorized actions.</p>
              
              <h2>Security Testing</h2>
              <p>Regular security testing helps identify vulnerabilities before they can be exploited by attackers.</p>
            `,
            category: 'Security',
            featuredImage: {
              url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop&auto=format',
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
            content: `
              <p>Big data isn't just for large corporations. Small businesses can leverage data analytics to make informed decisions, improve customer experiences, and drive growth, even with limited resources.</p>
              
              <h2>Getting Started with Data Analytics</h2>
              <p>Small businesses can begin their data journey with simple tools and gradually scale up as they grow.</p>
              
              <h3>Initial Steps:</h3>
              <ul>
                <li><strong>Define Goals:</strong> Identify what you want to achieve with data</li>
                <li><strong>Collect Data:</strong> Start with customer interactions and sales data</li>
                <li><strong>Choose Tools:</strong> Use affordable analytics platforms</li>
                <li><strong>Analyze Patterns:</strong> Look for trends and insights</li>
              </ul>
              
              <h2>Cost-Effective Data Tools</h2>
              <p>Many powerful data analytics tools are available at affordable prices for small businesses.</p>
              
              <h3>Recommended Tools:</h3>
              <ul>
                <li><strong>Google Analytics:</strong> Free web analytics</li>
                <li><strong>Tableau Public:</strong> Free data visualization</li>
                <li><strong>Microsoft Power BI:</strong> Affordable business intelligence</li>
                <li><strong>Excel:</strong> Basic data analysis capabilities</li>
              </ul>
              
              <h2>Success Stories</h2>
              <p>Many small businesses have successfully used data analytics to improve their operations and increase revenue.</p>
            `,
            category: 'Data Analytics',
            featuredImage: {
              url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop&auto=format',
              alt: 'Big Data Strategies'
            },
            author: {
              name: 'Marco Rossi',
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face&auto=format',
              title: 'Data Analytics Expert'
            },
            publishedAt: '2024-12-05',
            readingTime: 8,
            views: 980,
            likes: 32,
            isFeatured: false
          }
        ];

        const post = sampleBlogPosts.find(p => p.slug === params.slug);
        if (post) {
          setBlogPost(post);
          // Set related posts (exclude current post)
          setRelatedPosts(sampleBlogPosts.filter(p => p.id !== post.id && p.category === post.category).slice(0, 3));
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      fetchBlogPost();
    }
  }, [params.slug]);

  if (loading) {
    return (
      <main className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading article...</p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!blogPost) {
    return (
      <main className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Article Not Found</h1>
            <p className="text-gray-600 mb-8">The article you're looking for doesn't exist.</p>
            <Link href="/blog" className="btn-primary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Article Header */}
      <section className="hero-gradient py-16 lg:py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <Link href="/blog" className="inline-flex items-center text-blue-200 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
            
            <div className="mb-4">
              <span className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                {blogPost.category}
              </span>
            </div>
            
            <h1 className="text-3xl lg:text-5xl font-bold mb-6 max-w-4xl mx-auto">
              {blogPost.title}
            </h1>
            
            <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
              {blogPost.excerpt}
            </p>
            
            <div className="flex items-center justify-center space-x-6 text-blue-200">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                <span>{blogPost.author.name}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{new Date(blogPost.publishedAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>{blogPost.readingTime} min read</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Featured Image */}
            <div className="aspect-video overflow-hidden">
              <img
                src={blogPost.featuredImage.url}
                alt={blogPost.featuredImage.alt}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Article Body */}
            <div className="p-8 lg:p-12">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: blogPost.content }}
              />
              
              {/* Article Footer */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={blogPost.author.avatar}
                      alt={blogPost.author.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{blogPost.author.name}</h4>
                      <p className="text-gray-600">{blogPost.author.title}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                      <Heart className="w-5 h-5" />
                      <span>{blogPost.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                      <Share2 className="w-5 h-5" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold text-center mb-12">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={post.featuredImage.url}
                          alt={post.featuredImage.alt}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-blue-600">{post.category}</span>
                          <span className="text-sm text-gray-500">{post.readingTime} min read</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-4">{post.excerpt}</p>
                        <div className="flex items-center">
                          <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="w-8 h-8 rounded-full mr-3"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
                            <p className="text-xs text-gray-500">{new Date(post.publishedAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
};

export default BlogPostPage;
