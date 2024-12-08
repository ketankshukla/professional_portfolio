'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      {/* Main content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col md:flex-row items-center gap-4"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        {/* Text content */}
        <motion.div 
          className="flex-1 text-center md:text-left"
          variants={itemVariants}
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            variants={itemVariants}
          >
            Hi, I&apos;m <span className="text-blue-500">Ketan Shukla</span>
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 mb-8"
            variants={itemVariants}
          >
            Full Stack Python and React Developer
          </motion.p>
          <motion.div 
            className="flex flex-col items-center md:items-start gap-6"
            variants={itemVariants}
          >
            <div className="flex items-center gap-4">
              <a 
                href="#projects" 
                className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300"
              >
                View Projects
              </a>
              <a 
                href="https://github.com/ketankshukla"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-12 h-12 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors duration-300"
              >
                <FaGithub className="w-7 h-7 text-white group-hover:text-blue-400 transition-colors duration-300" />
              </a>
              <a 
                href="https://www.linkedin.com/in/ketankshukla"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-12 h-12 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors duration-300"
              >
                <FaLinkedin className="w-7 h-7 text-white group-hover:text-blue-400 transition-colors duration-300" />
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Profile image */}
        <motion.div 
          className="relative flex-1 w-full max-w-md"
          variants={itemVariants}
        >
          <div className="relative w-72 h-72 mx-auto">
            <div className="absolute inset-0 rounded-full border-2 border-blue-500/30 animate-[spin_10s_linear_infinite]"></div>
            <div className="absolute inset-0 rounded-full border-2 border-purple-500/30 animate-[spin_15s_linear_infinite_reverse]"></div>
            
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-blue-500/30 shadow-lg shadow-blue-500/20 z-20">
              <Image
                src="/images/profile/profile.jpg"
                alt="Ketan Shukla"
                fill
                className="object-cover rounded-full"
                priority
              />
            </div>

            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl -z-10"></div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
