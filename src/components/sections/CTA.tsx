'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Phone, Mail, MessageCircle, Users } from 'lucide-react';

const CTA = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-6"
          >
            Ready to Transform Your Business?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl lg:text-2xl text-blue-100 mb-8 leading-relaxed"
          >
            Let's discuss your project and see how our global team of experts can help you achieve your goals with cutting-edge technology solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <Link
              href="/contact"
              className="btn bg-white text-blue-600 hover:bg-blue-50 inline-flex items-center justify-center group px-8 py-4 text-lg"
            >
              Start Your Project
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              href="/portfolio"
              className="btn border-2 border-white text-white hover:bg-white hover:text-blue-600 inline-flex items-center justify-center group px-8 py-4 text-lg"
            >
              View Our Work
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>

          {/* Join Our Team CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-blue-100 mb-4 text-lg">Are you a talented developer looking for your next opportunity?</p>
            <Link
              href="/careers"
              className="btn bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600 inline-flex items-center justify-center group px-8 py-4 text-lg"
            >
              <Users className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
              Join Our Global Team
            </Link>
          </motion.div>

          {/* Contact Options */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Call Us</h3>
              <p className="text-blue-100 mb-2">(707) 469-3436</p>
              <p className="text-sm text-blue-200">24/7 Global Support</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Email Us</h3>
              <p className="text-blue-100 mb-2">jackblack900105@gmail.com</p>
              <p className="text-sm text-blue-200">Quick Response Guaranteed</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
              <p className="text-blue-100 mb-2">Available 24/7</p>
              <p className="text-sm text-blue-200">Instant Support</p>
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 pt-8 border-t border-white border-opacity-20"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-yellow-400 mb-1">100%</div>
                <div className="text-sm text-blue-200">Client Satisfaction</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400 mb-1">50+</div>
                <div className="text-sm text-blue-200">Projects Delivered</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400 mb-1">15+</div>
                <div className="text-sm text-blue-200">Countries Served</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-pink-400 mb-1">6</div>
                <div className="text-sm text-blue-200">Global Experts</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
