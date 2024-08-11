'use client';

import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../globals.css';
import EditAppointmentForm from '../../components/EditAppointmentForm';

interface Booking {
  id: string;
  service: string;
  doctor_name: string;
  start_time: string;
  end_time: string;
  date: string;
}

const BookingDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [booking, setBooking] = useState<Booking | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      fetchBooking(id as string);
    }
  }, [id]);

  const fetchBooking = async (id: string) => {
    try {
      const res = await fetch(`http://host.docker.internal:5000/api/bookings/${id}`);
      if (res.ok) {
        const bookingData = await res.json();
        setBooking(bookingData);
      } else {
        setError('Booking not found');
      }
    } catch (error) {
      setError('Failed to fetch booking');
    }
  };

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this booking?')) {
      try {
        await fetch(`http://host.docker.internal:5000/api/bookings/${booking?.id}`, {
          method: 'DELETE',
        });
        alert('Booking deleted successfully!');
        window.location.href = '/BookingList'; 
      } catch (error) {
        alert('Failed to delete booking.');
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdate = () => {
    fetchBooking(id as string); 
    handleCloseModal();
  };

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  if (!booking) {
    return <div className="text-center">Loading...</div>;
  }

  const calendarDate = new Date(booking.date);

  return (
    <div className="relative min-h-screen flex flex-col bg-gray-100">
      <div className="absolute inset-0">
        <img
          src="https://aquinahealth.com/wp-content/uploads/2018/09/Pulse_91918.jpeg"
          className="absolute inset-0 object-cover w-full h-full opacity-70"
          alt="Doctor Background"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-transparent to-blue-900 opacity-50"></div>
      </div>

      <div className="relative flex flex-1">
        <div className="w-1/4 p-4 border-r border-gray-300 bg-white bg-opacity-80">
          <Link href="/BookingList" passHref>
            <button className="flex items-center text-blue-600 hover:text-blue-800 mb-6">
              <FaArrowLeft className="mr-2 text-xl" />
              Back to Bookings List
            </button>
          </Link>
          <div className="p-4 bg-blue-50 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">{booking.doctor_name}</h2>
            <div className="mb-2">
              <strong>Service:</strong> {booking.service}
            </div>
            <div className="mb-2">
              <strong>Duration:</strong> 1 hour
            </div>
            <div className="mb-2">
              <strong>Meeting:</strong> Google Meet
            </div>
            <div className="mb-2">
              <strong>Timezone:</strong> (GMT+2:00) - Europe/Berlin
            </div>
          </div>
        </div>

        <div className="w-2/4 p-8 flex flex-col items-center justify-center relative bg-white bg-opacity-90 rounded-lg shadow-md">
          <Calendar
            value={calendarDate}
            tileClassName={({ date, view }) => 
              view === 'month' && date.toDateString() === calendarDate.toDateString() ? 'bg-blue-100 text-blue-600' : null
            }
            className="react-calendar-custom w-[600px] h-[400px]" 
          />
        </div>

        <div className="w-1/4 p-4 border-l border-gray-300 bg-white bg-opacity-80 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-4">{new Date(booking.date).toDateString()}</h2>
            <p className="text-blue-600 text-lg font-semibold mb-4">
              This Booking is with <strong>{booking.doctor_name}</strong> For <strong>{booking.service}</strong> and it ends on <strong>{booking.end_time}</strong>.
            </p>
          </div>
          <div className="flex space-x-2 mt-4">
            <button
              onClick={handleEdit}
              className="px-4 py-2 flex items-center text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              <FaEdit className="mr-2" /> Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 flex items-center text-white bg-red-600 rounded-lg hover:bg-red-700"
            >
              <FaTrashAlt className="mr-2" /> Delete
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && booking && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <EditAppointmentForm
            date={booking.date}
            service={booking.service}
            doctor={booking.doctor_name}
            startTime={booking.start_time}
            endTime={booking.end_time}
            id={booking.id}
            onClose={handleCloseModal}
            onUpdate={handleUpdate}
          />
        </div>
      )}
    </div>
  );
};

export default BookingDetail;
