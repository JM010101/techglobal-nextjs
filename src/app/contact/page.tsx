'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage('Thank you! Your message has been sent successfully. We\'ll get back to you soon.');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          service: '',
          budget: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
        setSubmitMessage('Sorry, there was an error sending your message. Please try again.');
      }
    } catch {
      setSubmitStatus('error');
      setSubmitMessage('Sorry, there was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'adam.wong@techglobal.com',
      description: 'Send us an email anytime'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '+852 1234 5678',
      description: 'Mon-Fri from 9am to 6pm HKT'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: 'Hong Kong Headquarters',
      description: 'Serving clients worldwide'
    },
    {
      icon: Clock,
      title: 'Support Hours',
      details: '24/7 Available',
      description: 'Round-the-clock support'
    }
  ];

  const offices = [
    {
      city: 'Hong Kong',
      country: 'Hong Kong SAR',
      address: 'Central Plaza, 18 Harbour Road, Wan Chai, Hong Kong',
      phone: '+852 1234 5678',
      isHeadquarters: true
    },
    {
      city: 'New York',
      country: 'United States',
      address: '123 Tech Street, New York, NY 10001',
      phone: '+1 (212) 123-4567'
    },
    {
      city: 'London',
      country: 'United Kingdom',
      address: '456 Innovation Ave, London, UK',
      phone: '+44 20 7123 4567'
    },
    {
      city: 'Tokyo',
      country: 'Japan',
      address: '789 Digital Plaza, Tokyo, Japan',
      phone: '+81 3 1234 5678'
    }
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
              Get In <span className="text-yellow-400">Touch</span>
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed mb-8">
              Ready to start your next project? We&apos;re here to help you 
              bring your ideas to life with cutting-edge technology.
            </p>
            <motion.a
              href="#contact-form"
              className="btn btn-primary bg-white text-blue-600 hover:bg-blue-50 inline-flex items-center justify-center group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Start Your Project
              <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="section-padding">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="section-header"
          >
            <h2 className="section-title">Contact Information</h2>
            <p className="section-subtitle">
              Multiple ways to reach our global team
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="card p-6 text-center hover-lift"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {info.title}
                  </h3>
                  <p className="text-lg font-medium text-blue-600 mb-2">
                    {info.details}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {info.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section id="contact-form" className="section-padding gradient-bg">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Send us a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="form-input"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="form-input"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="company" className="form-label">
                    Company (Optional)
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="form-input"
                    placeholder="Your Company Name"
                    value={formData.company}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="service" className="form-label">
                    Service Interested In
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="form-input"
                    value={formData.service}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a service</option>
                    <option value="web-development">Web Development</option>
                    <option value="mobile-development">Mobile Development</option>
                    <option value="ai-ml">AI & Machine Learning</option>
                    <option value="cloud-devops">Cloud & DevOps</option>
                    <option value="blockchain">Blockchain</option>
                    <option value="cybersecurity">Cybersecurity</option>
                    <option value="consulting">Consulting</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="budget" className="form-label">
                    Project Budget
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    className="form-input"
                    value={formData.budget}
                    onChange={handleInputChange}
                  >
                    <option value="">Select budget range</option>
                    <option value="under-10k">Under $10,000</option>
                    <option value="10k-25k">$10,000 - $25,000</option>
                    <option value="25k-50k">$25,000 - $50,000</option>
                    <option value="50k-100k">$50,000 - $100,000</option>
                    <option value="over-100k">Over $100,000</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="form-label">
                    Project Description
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="form-textarea"
                    placeholder="Tell us about your project requirements, goals, and any specific features you need..."
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                
                {/* Status Message */}
                {submitMessage && (
                  <div className={`p-4 rounded-lg flex items-center ${
                    submitStatus === 'success' 
                      ? 'bg-green-100 text-green-800 border border-green-200' 
                      : 'bg-red-100 text-red-800 border border-red-200'
                  }`}>
                    {submitStatus === 'success' ? (
                      <CheckCircle className="w-5 h-5 mr-2" />
                    ) : (
                      <AlertCircle className="w-5 h-5 mr-2" />
                    )}
                    {submitMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed inline-flex items-center justify-center group"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Office Locations */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Our Global Offices
              </h3>
              <div className="space-y-6">
                {offices.map((office, index) => (
                  <motion.div
                    key={office.city}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className={`card p-6 ${office.isHeadquarters ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xl font-semibold text-gray-900">
                        {office.city}
                      </h4>
                      {office.isHeadquarters && (
                        <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                          HQ
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-3">{office.country}</p>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-start">
                        <MapPin className="w-4 h-4 mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
                        <span>{office.address}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0" />
                        <span>{office.phone}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Map Placeholder */}
              <div className="mt-8">
                <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MapPin className="w-12 h-12 mx-auto mb-2" />
                    <p>Interactive Map</p>
                    <p className="text-sm">Our global office locations</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="section-header"
          >
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">
              Quick answers to common questions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: 'How long does a typical project take?',
                answer: 'Project timelines vary based on complexity, but most web applications take 4-8 weeks, while mobile apps typically require 6-12 weeks.'
              },
              {
                question: 'Do you provide ongoing support?',
                answer: 'Yes, we offer 24/7 support and maintenance services to ensure your applications run smoothly and stay updated.'
              },
              {
                question: 'Can you work with our existing team?',
                answer: 'Absolutely! We excel at collaborating with in-house teams and can integrate seamlessly with your existing workflows.'
              },
              {
                question: 'What technologies do you specialize in?',
                answer: 'We work with modern technologies including React, Node.js, Python, AI/ML frameworks, cloud platforms, and blockchain technologies.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="card p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding hero-gradient">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white max-w-3xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Let&apos;s discuss your ideas and turn them into reality. 
              Our team is ready to help you achieve your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact-form"
                className="btn btn-primary bg-white text-blue-600 hover:bg-blue-50 inline-flex items-center justify-center group"
              >
                <MessageCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                Start a Conversation
              </a>
              <a
                href="tel:+85212345678"
                className="btn btn-outline border-white text-white hover:bg-white hover:text-blue-600 inline-flex items-center justify-center group"
              >
                <Phone className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                Call Us Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ContactPage;
