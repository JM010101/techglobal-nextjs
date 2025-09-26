'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import Image from 'next/image';

interface Testimonial {
  id: string;
  author: string;
  company: string;
  position: string;
  quote: string;
  imageUrl: string;
  rating: number;
  project?: string;
}

const Testimonials = () => {
  const testimonials: Testimonial[] = [
    {
      id: '1',
      author: 'Sarah Mitchell',
      company: 'TechStart Inc.',
      position: 'Satisfied Client',
      quote: 'TechGlobal Solutions transformed our business with their innovative approach. Their global team brought fresh perspectives that we never would have considered locally.',
      imageUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=200&h=200&fit=crop&crop=face&auto=format&q=85',
      rating: 5,
      project: 'E-Commerce Platform'
    },
    {
      id: '2',
      author: 'Michael Chen',
      company: 'DataCorp',
      position: 'Happy Customer',
      quote: 'The AI solutions they delivered exceeded our expectations. Their expertise in machine learning and data analytics helped us make data-driven decisions that increased our revenue by 40%.',
      imageUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=200&h=200&fit=crop&crop=face&auto=format&q=85',
      rating: 5,
      project: 'AI Analytics Dashboard'
    },
    {
      id: '3',
      author: 'Emily Rodriguez',
      company: 'FinanceFlow',
      position: 'Valued Client',
      quote: 'Working with TechGlobal was a game-changer. Their mobile app development expertise and attention to security gave us the confidence to launch our banking app successfully.',
      imageUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=200&h=200&fit=crop&crop=face&auto=format&q=85',
      rating: 5,
      project: 'Mobile Banking App'
    },
    {
      id: '4',
      author: 'David Thompson',
      company: 'CloudTech Solutions',
      position: 'Trusted Partner',
      quote: 'Their cloud migration strategy saved us thousands of dollars in infrastructure costs. The 24/7 support from their global team ensures our systems run smoothly around the clock.',
      imageUrl: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?w=200&h=200&fit=crop&crop=face&auto=format&q=85',
      rating: 5,
      project: 'Cloud Infrastructure'
    },
    {
      id: '5',
      author: 'Lisa Wang',
      company: 'Blockchain Ventures',
      position: 'Loyal Client',
      quote: 'TechGlobal\'s blockchain expertise helped us launch our DeFi platform ahead of schedule. Their innovative approach and global perspective gave us a competitive edge.',
      imageUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=200&h=200&fit=crop&crop=face&auto=format&q=85',
      rating: 5,
      project: 'DeFi Platform'
    },
    {
      id: '6',
      author: 'James Wilson',
      company: 'IoT Innovations',
      position: 'Pleased Customer',
      quote: 'Their IoT solutions revolutionized our manufacturing process. The real-time monitoring and predictive maintenance features have reduced downtime by 60%.',
      imageUrl: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?w=200&h=200&fit=crop&crop=face&auto=format&q=85',
      rating: 5,
      project: 'IoT Manufacturing System'
    },
    {
      id: '7',
      author: 'Anna Kowalski',
      company: 'Digital Marketing Pro',
      position: 'Delighted Client',
      quote: 'TechGlobal\'s digital marketing solutions transformed our online presence. Their data-driven approach increased our conversion rates by 150% in just 3 months.',
      imageUrl: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?w=200&h=200&fit=crop&crop=face&auto=format&q=85',
      rating: 5,
      project: 'Digital Marketing Campaign'
    },
    {
      id: '8',
      author: 'Roberto Silva',
      company: 'E-Commerce Solutions',
      position: 'Impressed Client',
      quote: 'Their e-commerce platform development exceeded all our expectations. The seamless user experience and robust payment integration helped us scale to 10x our previous sales.',
      imageUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=200&h=200&fit=crop&crop=face&auto=format&q=85',
      rating: 5,
      project: 'E-Commerce Platform'
    },
    {
      id: '9',
      author: 'Jennifer Lee',
      company: 'HealthTech Innovations',
      position: 'Grateful Client',
      quote: 'The mobile health app they developed for us has been downloaded over 1 million times. Their attention to user experience and security made all the difference.',
      imageUrl: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?w=200&h=200&fit=crop&crop=face&auto=format&q=85',
      rating: 5,
      project: 'Health Monitoring App'
    },
    {
      id: '10',
      author: 'Ahmed Hassan',
      company: 'FinTech Solutions',
      position: 'Satisfied Customer',
      quote: 'Their blockchain integration for our financial platform was flawless. The security and transparency features they implemented gave our users complete confidence.',
      imageUrl: 'https://images.pexels.com/photos/1040882/pexels-photo-1040882.jpeg?w=200&h=200&fit=crop&crop=face&auto=format&q=85',
      rating: 5,
      project: 'Blockchain Payment System'
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
    <section id="testimonials" className="section-padding bg-gray-50">
      <div className="container">
        <div className="section-header">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="section-title"
          >
            What Our Clients Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="section-subtitle"
          >
            Don&apos;t just take our word for it - hear from our satisfied clients around the world
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className="testimonial-card group"
            >
              <div className="relative">
                <Quote className="w-8 h-8 text-blue-600 mb-4 opacity-20" />
                <p className="text-gray-700 leading-relaxed mb-6 italic">
                  &quot;{testimonial.quote}&quot;
                </p>
                
                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4 flex-shrink-0">
                  <Image
                    src={testimonial.imageUrl}
                    alt={testimonial.author}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                    suppressHydrationWarning
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.author}</h4>
                  <p className="text-sm text-blue-600 font-medium">{testimonial.position}</p>
                  <p className="text-sm text-gray-600">{testimonial.company}</p>
                  {testimonial.project && (
                    <p className="text-xs text-gray-500 mt-1">Project: {testimonial.project}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-xl">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8">
              Trusted by Companies Worldwide
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
                <div className="text-lg font-semibold text-gray-900 mb-1">Client Satisfaction</div>
                <div className="text-gray-600">Based on 50+ projects</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">40%</div>
                <div className="text-lg font-semibold text-gray-900 mb-1">Average Revenue Increase</div>
                <div className="text-gray-600">For our clients</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">60%</div>
                <div className="text-lg font-semibold text-gray-900 mb-1">Reduction in Downtime</div>
                <div className="text-gray-600">Through our solutions</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
                <div className="text-lg font-semibold text-gray-900 mb-1">Global Support</div>
                <div className="text-gray-600">Round-the-clock assistance</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
