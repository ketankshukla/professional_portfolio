'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { 
  SiPython, 
  SiReact, 
  SiDjango, 
  SiNextdotjs,
  SiTailwindcss, 
  SiTypescript,
  SiPostgresql,
  SiMongodb,
  SiFastapi,
  SiDocker,
  SiAmazonaws,
  SiRedis
} from 'react-icons/si';

interface TechIcon {
  icon: React.ComponentType;
  color: string;
}

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  const techIcons: TechIcon[] = [
    { icon: SiPython, color: '#3776AB' },       // Python Blue
    { icon: SiReact, color: '#61DAFB' },        // React Blue
    { icon: SiDjango, color: '#092E20' },       // Django Green
    { icon: SiNextdotjs, color: '#000000' },    // Next.js Black
    { icon: SiTailwindcss, color: '#06B6D4' },  // Tailwind Blue
    { icon: SiTypescript, color: '#3178C6' },   // TypeScript Blue
    { icon: SiPostgresql, color: '#336791' },   // PostgreSQL Blue
    { icon: SiMongodb, color: '#47A248' },      // MongoDB Green
    { icon: SiFastapi, color: '#009688' },      // FastAPI Teal
    { icon: SiDocker, color: '#2496ED' },       // Docker Blue
    { icon: SiAmazonaws, color: '#FF9900' },    // AWS Orange
    { icon: SiRedis, color: '#DC382D' }         // Redis Red
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

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

  return (
    <div id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,0.7),rgba(17,24,39,1))]"></div>
        <div className="grid grid-cols-8 gap-4 transform rotate-12 scale-150 opacity-20">
          {[...Array(64)].map((_, i) => (
            <motion.div
              key={i}
              className="h-32 bg-blue-500/20 rounded-lg"
              initial={{ opacity: 0.1 }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col md:flex-row items-center gap-12"
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
            <span className="block">Hi, I'm</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Ketan Shukla
            </span>
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-8"
            variants={itemVariants}
          >
            Crafting Digital Experiences with
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              {" "}Python & AI
            </span>
          </motion.p>
          <motion.div 
            className="flex flex-wrap gap-6 justify-center md:justify-start"
            variants={itemVariants}
          >
            <a 
              href="#projects" 
              className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300"
            >
              View Projects
            </a>
            <div className="flex gap-6">
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

        {/* Profile image with tech elements */}
        <motion.div 
          className="relative flex-1 w-full max-w-md"
          variants={itemVariants}
        >
          <div className="relative w-72 h-72 mx-auto">
            {/* Rotating circles */}
            <div className="absolute inset-0 rounded-full border-2 border-blue-500/30 animate-[spin_10s_linear_infinite]"></div>
            <div className="absolute inset-0 rounded-full border-2 border-purple-500/30 animate-[spin_15s_linear_infinite_reverse]"></div>
            
            {/* Tech icons floating around */}
            {techIcons.map((tech, index) => {
              const angle = (index / techIcons.length) * Math.PI * 2;
              const radius = 160; // Increased radius for wider orbit
              const IconComponent = tech.icon;
              
              return (
                <motion.div
                  key={index}
                  className="absolute"
                  initial={{ scale: 0 }}
                  animate={{
                    scale: [1, 1.3, 1],
                    x: [Math.cos(angle) * radius * 0.8, Math.cos(angle) * radius * 1.1, Math.cos(angle) * radius * 0.8],
                    y: [Math.sin(angle) * radius * 0.8, Math.sin(angle) * radius * 1.1, Math.sin(angle) * radius * 0.8],
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.3,
                    times: [0, 0.5, 1]
                  }}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  {IconComponent && (
                    <IconComponent 
                      className="text-5xl hover:scale-125 transition-transform duration-300" 
                      style={{ 
                        color: tech.color,
                        filter: 'drop-shadow(0 0 12px rgba(255,255,255,0.4))'
                      }} 
                    />
                  )}
                </motion.div>
              );
            })}

            {/* Profile image */}
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-blue-500/30 shadow-lg shadow-blue-500/20">
              <Image
                src="/images/profile/profile.jpg"
                alt="Ketan Shukla"
                fill
                className="object-cover rounded-full"
                priority
              />
            </div>

            {/* Glowing effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl -z-10"></div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
