import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaInfoCircle, FaPlus } from 'react-icons/fa';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import EditAppointmentForm from '@/components/EditAppointmentForm';
import "../globals.css";
import AppointmentForm from '@/components/AppointmentForm';

interface Booking {
  id: number;
  service: string;
  doctor_name: string;
  start_time: string;
  end_time: string;
  date: string;
}

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/bookings';


const getBookings = async (): Promise<Booking[]> => {
  const res = await fetch(apiUrl, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-GB', options).format(date);
};

const BookingsList: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getBookings();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
    fetchBookings();
  }, []);

  const handleEdit = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: number) => {
    console.log('Delete booking with id:', id);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedBooking(null);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleUpdate = () => {
    const fetchBookings = async () => {
      try {
        const data = await getBookings();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
    fetchBookings();
  };

  return (
    <div className={`relative ${isSidebarOpen ? 'opacity-100' : ''}`}>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <button
        className="absolute top-4 left-4 text-white text-2xl z-40"
        onClick={() => setIsSidebarOpen(true)}
      >
        &#9776;
      </button>

      <div className="relative min-h-screen flex items-center justify-center">
        <img
          src="https://aquinahealth.com/wp-content/uploads/2018/09/Pulse_91918.jpeg"
          className="absolute inset-0 object-cover w-full h-full opacity-70"
          alt="Doctor Background"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-transparent to-blue-900 opacity-75"></div>

        <div className="relative bg-white bg-opacity-90 rounded-lg overflow-hidden max-w-4xl w-full">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <Link href="/" passHref>
                <button className="px-4 py-2 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  Back to Home
                </button>
              </Link>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-4 py-4 font-bold text-blue-500 bg-transparent rounded-full hover:bg-blue-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                <FaPlus />
              </button>
            </div>
            <h1 className="text-2xl font-bold mb-4 text-gray-900">Booking List</h1>
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
              <span className="block sm:inline">Here you can see all the appointments.</span>
            </div>
            <div className="overflow-x-auto">
              <div className="min-w-full bg-white">
                {bookings.map((booking) => (
                  <div key={booking.id} className="py-2 px-4 border-b flex justify-between items-center">
                    <span>A Booking on {formatDate(booking.date)} starting at {booking.start_time}</span>
                    <Link
                      href={`/bookings/${booking.id}`}
                      className="text-green-500 hover:text-green-700"
                    >
                      <FaInfoCircle />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {isEditModalOpen && selectedBooking && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div
                className="fixed inset-0 bg-black opacity-50"
                onClick={handleCloseEditModal}
              ></div>
              <EditAppointmentForm
                id={selectedBooking.id.toString()}
                date={selectedBooking.date}
                service={selectedBooking.service}
                doctor={selectedBooking.doctor_name}
                startTime={selectedBooking.start_time}
                endTime={selectedBooking.end_time}
                onClose={handleCloseEditModal}
                onUpdate={handleUpdate}
              />
            </div>
          )}

          {isAddModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div
                className="fixed inset-0 bg-black opacity-50"
                onClick={handleCloseAddModal}
              ></div>
              <AppointmentForm
                onClose={handleCloseAddModal}
                onUpdate={handleUpdate}
                isAddForm={true}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingsList;
