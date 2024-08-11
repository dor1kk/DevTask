import React, { useEffect, useState } from 'react';
import { FaHome, FaUser, FaConciergeBell, FaFileAlt } from 'react-icons/fa';
import Link from 'next/link';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [activeLink, setActiveLink] = useState<string>('');

  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/') {
      setActiveLink('Home');
    } else if (path === '/about') {
      setActiveLink('About');
    } else if (path === '/services') {
      setActiveLink('Services');
    } else if (path === '/BookingList') {
      setActiveLink('BookingList');
    }
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-64 h-full bg-white transition-transform transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } z-50 shadow-lg`}
    >
      <button
        className="absolute top-4 right-4 text-xl text-gray-800"
        onClick={onClose}
      >
        &times;
      </button>
      <nav className="mt-12">
        <ul className="text-blue-900">
          <Link href="/" passHref>
            <li
              className={`px-4 mx-4 py-2 my-4 text-lg flex items-center rounded-lg cursor-pointer ${
                activeLink === 'Home' ? 'bg-blue-400 text-white' : 'hover:bg-blue-200'
              }`}
              onClick={() => setActiveLink('Home')}
            >
              <FaHome className="mr-2" />
              Home
            </li>
          </Link>

        

          <Link href="/BookingList" passHref>
            <li
              className={`px-4 py-2 mx-4 my-4 text-lg flex items-center rounded-lg cursor-pointer ${
                activeLink === 'BookingList' ? 'bg-blue-400 text-white' : 'hover:bg-blue-200'
              }`}
              onClick={() => setActiveLink('BookingList')}
            >
              <FaFileAlt className="mr-2" />
              Bookings
            </li>
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
