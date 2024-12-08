'use client';

import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Navigation Links */}
          <div>
            <h3 className="text-teal-400 font-semibold mb-4">Ketan Shukla</h3>
            <p className="text-gray-300 mb-4">Full Stack Python and React Developer</p>
            <ul className="space-y-2">
              <li>
                <Link href="/#home" className="text-gray-300 hover:text-teal-400">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#projects" className="text-gray-300 hover:text-teal-400">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/#blog" className="text-gray-300 hover:text-teal-400">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-teal-400 font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/ketankshukla"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-teal-400"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/ketankshukla"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-teal-400"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-teal-400 font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">
                <a href="mailto:ketankshukla@gmail.com" className="hover:text-teal-400">
                  ketankshukla@gmail.com
                </a>
              </li>
              <li className="text-gray-300">Location: San Diego, CA</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400">
            &copy; {currentYear} Ketan Shukla. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
