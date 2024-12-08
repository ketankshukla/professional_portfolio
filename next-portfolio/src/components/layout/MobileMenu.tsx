'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { Transition } from '@headlessui/react';

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  navLinks: Array<{ href: string; label: string; }>;
}

const MobileMenu = ({ isOpen, setIsOpen, navLinks }: MobileMenuProps) => {
  return (
    <Transition
      show={isOpen}
      as={Fragment}
      enter="transition ease-out duration-200"
      enterFrom="opacity-0 translate-y-1"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in duration-150"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-1"
    >
      <div className="absolute top-16 inset-x-0 transform origin-top md:hidden">
        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y divide-gray-100">
          <div className="py-2 px-4">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-blue-600 hover:bg-gray-50"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default MobileMenu;
