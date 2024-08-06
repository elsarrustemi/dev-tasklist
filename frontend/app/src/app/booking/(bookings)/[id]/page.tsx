import Link from 'next/link';

interface BookingDetails {
  id: number,
  doctor_name: string;
  service: string;
  start_time: string;
  end_time: string;
}

async function getBookingDetails(id: string): Promise<BookingDetails> {
  const res = await fetch(`http://host.docker.internal:5000/api/booking/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await res.json();
  return data as BookingDetails;
}

const BookingDetailsComponent = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const booking = await getBookingDetails(id);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 md:px-0">
      <div className="w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto p-4 md:p-8 shadow-md rounded-lg border-t-2 border-gray-500 bg-gray-100 dark:text-white">
        <p className="text-sm md:text-base lg:text-lg">
          This booking is with {booking.doctor_name} for {booking.service} and it ends on {booking.end_time}
        </p>
        <div className="py-5 md:py-7">
          <Link href="/" className="block text-center text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm md:text-base lg:text-lg w-full sm:w-auto px-5 py-2.5 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
            Back to Home
          </Link>
        </div>
      </div>
    </div>

  );
}

export default BookingDetailsComponent;
