import React from 'react';
import Link from "next/link";

interface Booking {
  id: number,
  service: string,
  doctor_name: string,
  start_time: string,
  end_time: string,
  date: string,
}
async function getAllBookings(): Promise<Booking[]> {
  const res = await fetch('http://host.docker.internal:5000/api/bookings', { cache: 'no-store', mode: 'no-cors' })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json() as Promise<Booking[]>;
}
const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
const BookingList: React.FC = async () => {

  let bookings = await getAllBookings();

  return (
    <div className="px-4 md:px-0">
      <div className="flex flex-col md:flex-row md:justify-between pb-4">
        <h1 className="text-lg md:text-xl lg:text-2xl">Current booking count: {bookings.length}</h1>
      </div>
      <ul className="flex flex-col pl-0 md:pl-1">
        {bookings.map((booking, index) => (
          <li
            key={index}
            className="border-b py-3 dark:border-gray-600 transform transition duration-300 hover:scale-105"
          >
            <Link href={`/booking/${booking.id}`} className="block dark:text-gray-300 text-sm md:text-base lg:text-lg">
              A booking on date {formatDate(booking.date)} starting at {booking.start_time}
            </Link>
          </li>
        ))}
      </ul>
    </div>

  );
};

export default BookingList;
