import React, { useState } from 'react';
import axios from 'axios';

interface EditAppointmentFormProps {
  id: number;
  date: string;
  service: string;
  doctor: string;
  startTime: string;
  endTime: string;
  onClose: () => void;
  onUpdate: () => void;
}

const EditAppointmentForm: React.FC<EditAppointmentFormProps> = ({
  id,
  date,
  service,
  doctor,
  startTime,
  endTime,
  onClose,
  onUpdate,
}) => {
  const [appointmentDate, setAppointmentDate] = useState(date.split('T')[0]); 
  const [appointmentService, setAppointmentService] = useState(service);
  const [appointmentDoctor, setAppointmentDoctor] = useState(doctor);
  const [appointmentStartTime, setAppointmentStartTime] = useState(startTime);
  const [appointmentEndTime, setAppointmentEndTime] = useState(endTime);

  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/bookings';

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const appointmentData = {
      date: appointmentDate,
      service: appointmentService,
      doctor: appointmentDoctor,
      startTime: appointmentStartTime,
      endTime: appointmentEndTime,
    };

    try {
      await axios.put(`${apiUrl}/${id}`, appointmentData);
      alert('Appointment updated successfully!');
      onUpdate(); 
      onClose(); 
    } catch (error) {
      console.error('Error updating appointment:', error);
      alert('Failed to update appointment. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-xl lg:w-5/12 bg-white shadow-lg rounded-lg opacity-90 p-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
        Edit Appointment
      </h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-4">
        <div>
          <label className="block text-gray-700">Date</label>
          <input
            type="date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            className="w-full px-4 py-2 mt-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700">Service</label>
          <select
            value={appointmentService}
            onChange={(e) => setAppointmentService(e.target.value)}
            className="w-full px-4 py-2 mt-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Consultation</option>
            <option>Checkup</option>
            <option>Surgery</option>
            <option>Therapy</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700">Doctor</label>
          <select
            value={appointmentDoctor}
            onChange={(e) => setAppointmentDoctor(e.target.value)}
            className="w-full px-4 py-2 mt-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Dr. John Doe</option>
            <option>Dr. Jane Smith</option>
            <option>Dr. Albert Brown</option>
            <option>Dr. Nancy White</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700">Start Time</label>
          <input
            type="time"
            value={appointmentStartTime}
            onChange={(e) => setAppointmentStartTime(e.target.value)}
            className="w-full px-4 py-2 mt-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700">End Time</label>
          <input
            type="time"
            value={appointmentEndTime}
            onChange={(e) => setAppointmentEndTime(e.target.value)}
            className="w-full px-4 py-2 mt-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="col-span-2 flex justify-between">
          <button
            type="submit"
            className="px-4 py-2 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update Appointment
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 font-bold text-white bg-gray-600 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAppointmentForm;
