'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import AppointmentForm from '@/components/AppointmentForm';

const Hero: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  return (
    <div className={`relative min-h-screen  bg-opacity-75 bg-gradient-to-r from-blue-900 via-transparent to-blue-900 overflow-hidden`}>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="relative">
        <button
          className="absolute top-4 left-4 text-white text-2xl z-40"
          onClick={() => setIsSidebarOpen(true)}
        >
          &#9776;
        </button>

        <img
          src="https://aquinahealth.com/wp-content/uploads/2018/09/Pulse_91918.jpeg"
          className="absolute inset-0 object-cover w-full h-full opacity-70"
          alt="Doctor Background"
        />

        <div className="relative h-screen bg-opacity-75 bg-gradient-to-r from-blue-900 via-transparent to-blue-900">
          <div className="px-4 py-24 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-32">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="w-full max-w-xl mb-12 lg:mb-0 lg:pr-16 lg:w-6/12">
                <h1 className="text-4xl font-bold font-montserrat text-white leading-tight sm:text-5xl sm:leading-none mb-6">
                  Find Your Doctor & <br className="hidden md:block" />
                  Schedule an Appointment
                </h1>
                <p className="text-gray-200 font-montserrat mb-8">
                  Browse through thousands of doctors and book your appointment today.
                </p>

                <div className="flex space-x-4">
                  <button className="relative px-6 py-3 font-bold text-blue-800 bg-white rounded-lg group focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <span className="relative z-10 font-montserrat">Learn More</span>
                    <span className="ml-2 relative z-10">&rarr;</span>
                    <div className="absolute inset-0 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-in-out rounded-lg"></div>
                  </button>
                </div>
              </div>

              <AppointmentForm isAddForm={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
